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
                'password' => 'required|string|max:255'
            ]);

            $userValidated = $this->userService->updateUser($userId, $validatedInputUser);
            return response()->json($userValidated, 202);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
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


    public function addActivityUser(Request $request, int $userId)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'lieu' => 'required|string|max:255',
            'statut_journee' => 'required|in:JOUR,NUIT', 
            'saison_id' => 'required|exists:saison,id',
            'image_data' => 'nullable'
        ]);

        
        $activity = $this->userService->createActivityUser($userId, $validated);

        return response()->json([
            'message' => 'Activity created successfully',
            'data' => $activity
        ], 201);
    }


    public function index(User $user) {
        try {
            $workoutSessions = $user->activites()->with('avis')->get();
            return response()->json( $workoutSessions, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
