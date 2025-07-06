<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    // Passo 1: Solicitar link para recuperação - gera token e envia e-mail
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Email inválido ou não cadastrado',
                'errors' => $validator->errors(),
            ], 422);
        }

        $token = Str::random(60);
        $email = $request->email;

        // Salvar token na tabela password_resets (criada por migration padrão Laravel)
        DB::table('password_resets')->updateOrInsert(
            ['email' => $email],
            [
                'token' => Hash::make($token), // pode usar plain token para envio, mas guarde hash
                'created_at' => Carbon::now(),
            ]
        );

        // Montar link para envio por e-mail (frontend deve ter rota para resetar)
        $resetLink = url('/reset-password?token=' . $token . '&email=' . urlencode($email));

        // Enviar e-mail - você deve criar a view emails.password_reset
        Mail::send('emails.password_reset', ['resetLink' => $resetLink], function($message) use ($email) {
            $message->to($email)
                ->subject('Link para redefinição de senha');
        });

        return response()->json([
            'message' => 'Link para redefinição de senha enviado ao e-mail',
        ]);
    }

    // Passo 2: Resetar a senha usando token
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro na validação dos dados',
                'errors' => $validator->errors(),
            ], 422);
        }

        $record = DB::table('password_resets')->where('email', $request->email)->first();

        if (!$record) {
            return response()->json(['message' => 'Token inválido ou expirado'], 400);
        }

        // Verificar token (token salvo em hash)
        if (!Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'Token inválido'], 400);
        }

        // Verificar expiração (exemplo 60 minutos)
        if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            return response()->json(['message' => 'Token expirado'], 400);
        }

        // Atualizar senha do usuário
        $user = User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        // Deletar token da tabela password_resets para segurança
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Senha redefinida com sucesso']);
    }
}
