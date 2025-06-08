<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request) {

        $email = $request->email;
        $password = $request->password;

        $user = User::where('email', $email)->first();

        if(!$user){
            return response()->json([
                'message'=>'E-mail não encontrado',
            ]);
        }

        if(!Hash::check($password, $user->password)){
            return response()->json([
                'message'=>'Senha do usuário inválida',
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'=> $user,
            'access_token' => $token,
        ]);

    }

    public function logout(Request $request){
        $email = $request->email;

        $user = User::where('email', $email)->first();

        $user->tokens()->delete();

        
    }
}
