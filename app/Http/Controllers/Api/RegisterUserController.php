<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterUserController extends Controller
{
    public function signup(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:8|confirmed',
        ]);

        if($validator->fails()){
            response()->json([
                'message'=>'Erro nos dados informados pelo usuário',
                'erros'=>$validator->errors(),
            ]);
        }

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        if($user){
            User::sendVerificationEmail($user);
            return response()->json([
                'message'=>'verifique seu endereço de email',
                'token'=>$token
            ]);
        }else{
            return response()->json([
                'message'=>'Erro no cadastro do usuário, erro no servidor, tente novamente mais tarde.',
                'status'=>'500',
            ]);
        }
    }
}