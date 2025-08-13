<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\UserService;


use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller 
{


    protected $userService;

      public function __construct(UserService $userService)
    {
        $this->userService = $userService;
         $this->middleware('auth:sanctum');

      
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

    public function getUserByEmail(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email'
        ]);

        $user = $this->userService->searchUserbyEmail($validated['email']);

        return response()->json(['data' => $user], 200);
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

    public function modifyUser(int $userId, Request $request) {
        try {
            $validatedInputUser = $request->validate([
                'name' =>  'required|string|max:255',
                'email' => 'required|string|max:255',
                'type_utilisateur' => 'required|in:organisateur,particulier', 
                'password' => 'required|string|max:255'
            ]);
            $user2 = User::findOrFail($userId);
            $currentUser = $request->user();

            $this->authorize('update', $user2,  $currentUser);

            $userValidated = $this->userService->updateUser( $user2->id, $validatedInputUser);
            return response()->json($userValidated, 202);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }
    

   public function deleteUser(int $userId, Request $request)
    {
        try {
            $user2 = User::findOrFail($userId);
            $currentUser = $request->user();

            $this->authorize('delete', $user2,  $currentUser);
            $this->userService->deleteUser($userId);
            return response()->noContent(); 
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }





    public function index(User $user) {
        try {
            $workoutSessions = $user->activites()->with('avis')->get();
            return response()->json( $workoutSessions, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'image_data' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $path = $request->file('image_data')->store('avatars', 'public');

        $user = $request->user();
        $user->image_data = $path; 
        $user->save();

        return response()->json([
            'message' => 'Profile picture updated successfully',
            'avatar_url' => url('storage/'.$path)
        ]);
    }

}
