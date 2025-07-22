<?php

namespace App\Http\Controllers;

use App\Service\UserService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

     protected $userService;

      public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function register(Request $request) {
        
         $validated =$request->validate([
             'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'password' => 'required|confirmed|max:255',
        ]);

        $user = $this->userService->creatUser($validated);

        $token = $user->createToken($request->name);

        return [
            'user'=> $user,
            'token' =>$token->plainTextToken
        ];

        
    }

     public function login(Request $request) {
         $validated =$request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $result = $this->userService->getUserEmailandPassword(
            $validated['email'],
            $validated['password']);

        if ($result->success) {
        return response()->json([
            'user' => $result->user,
            'token' => $result->token,
            'message' => $result->message,
        ]);
    }

    return response()->json([
        'error' => $result->message,
    ], 401);
       
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out'
        ];
    }

}
