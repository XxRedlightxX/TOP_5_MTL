<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\FollowService;
use App\Service\UserService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller 
{


    protected $userService;
    protected $followService;

    public function __construct(UserService $userService, FollowService $followService)
    {
        $this->userService = $userService;
        $this->followService = $followService;
        $this->middleware('auth:sanctum');

      
    }
    public function getUserList(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);
            $users = $this->userService->getUserList($perPage , $page);
            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

     public function getUserBySearchUser(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required'
        ]);
        $authUser=$request->user();

        $users = $this->userService->getUserByUsername($validated['username']);

         $users->transform(function ($user) use ($authUser) {
            $user->is_followed = $authUser
            ? $this->followService->isFollowing($authUser, $user)
            : false;
        return $user;
    });

        return response()->json(['data' => $users], 200);
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
                'username' =>  'required|string|max:255',
                'num_tel' =>  'required|string|max:255',
                'email' => 'nullable|string|max:255',
                'description' => 'nullable|string|max:255',
                'type_utilisateur' => 'nullable|in:organisateur,particulier', 
                'password' => 'nullable|string|max:255'
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

        public function modifyByIdUser(int $userId, Request $request) {
        try {
            $validatedInputUser = $request->validate([
                'name' =>  'required|string|max:255',
                'username' =>  'required|string|max:255',
                'num_tel' =>  'required|string|max:255',
                'email' => 'nullable|string|max:255',
                'description' => 'nullable|string|max:255',
                'type_utilisateur' => 'nullable|in:organisateur,particulier', 
                'password' => 'nullable|string|max:255'
            ]);
            $user2 = User::findOrFail($userId);
            $currentUser = $request->user();

            //$this->authorize('update', $user2,  $currentUser);

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
    try {
        // Validate the incoming request
        $validated = $request->validate([
            'image_data' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Store the uploaded file
        $path = $request->file('image_data')->store('avatars', 'public');
        
        // Update user profile picture
        $user = $request->user();
        $user->image_data = $path;
        $user->update();

        return response()->json([
            'success' => true,
            'message' => 'Profile picture updated successfully',
            'avatar_url' => url('storage/'.$path),
            'path' => $path // Optional: for debugging
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
        
    } catch (\Exception $e) {
        // Handle all other exceptions
        return response()->json([
            'success' => false,
            'message' => 'Failed to update profile picture',
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);
    }
}

  public function updateProfileByidPicture(Request $request, int $userId)
{
    try {
        // Validate the incoming request
        $validated = $request->validate([
            'image_data' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Store the uploaded file
        $path = $request->file('image_data')->store('avatars', 'public');
        
        // Update user profile picture
         $user2 = User::findOrFail($userId);
        
         $user2->image_data = $path;
        $user2->update();

        return response()->json([
            'success' => true,
            'message' => 'Profile picture updated successfully',
            'avatar_url' => url('storage/'.$path),
            'path' => $path // Optional: for debugging
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
        
    } catch (\Exception $e) {
        // Handle all other exceptions
        return response()->json([
            'success' => false,
            'message' => 'Failed to update profile picture',
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);
    }
}

}
