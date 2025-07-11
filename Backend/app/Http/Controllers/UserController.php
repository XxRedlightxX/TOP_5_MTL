<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\UserService;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $userService;

      public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getUserList()
    {
        try {
            $users = $this->userService->getUserList();
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function addUser(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'password' => 'required|string|max:255'
            ]);

            $user = $this->userService->creatUser($validated);
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

   public function deleteUser(int $userId)
    {
        try {
            $this->userService->deleteUser($userId);
            return response()->noContent(); 
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
