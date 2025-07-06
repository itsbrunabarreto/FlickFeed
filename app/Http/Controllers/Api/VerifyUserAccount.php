<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VerifyUserAccount extends Controller
{
    public function verifyUserAccount(Request $request)
    {
        $user = User::where('email_verification_token', $request->token)->first();

        if ($user) {
            $user->email_verification_token = null; // limpar token
            $user->ativo = true;
            $user->email_verified_at = Carbon::now();
            $user->save();

            User::sendEmailUserActivated($user);

            return response()->json(['message' => 'Conta verificada com sucesso!'], 200);
        } else {
            return response()->json(['message' => 'Token inválido ou usuário não encontrado.'], 404);
        }
    }
}
