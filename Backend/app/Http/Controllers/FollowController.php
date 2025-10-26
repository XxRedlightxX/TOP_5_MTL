<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\FollowService;
use App\Service\UserService;
use Illuminate\Http\Request;

use Illuminate\Validation\ValidationException;

class FollowController extends Controller 
{

    protected $followService;
    protected $userService;

    public function __construct(FollowService $followService, UserService $userService)
    {
        $this->followService = $followService;
        $this->middleware('auth:sanctum');
    }
    public function addFollowAUser(Request $request)
{
    $request->validate([
        'follower_id' => 'required|exists:Utilisateur,id',
    ]);

    $user = $request->user();
    $targetId = $request->follower_id;

    try {
        $result = $this->followService->follow($user->id, $targetId);

        $targetUser =$this->userService->findById($targetId);

        return match ($result) {
            'followed' => response()->json([
                'message' => 'Vous avez follow',
                'followed_username' => $targetUser->username,
                'is_followed' => true,
            ], 200),

            'user_unfollow' => response()->json([
                'message' => 'Unfollowed successfully.',
                'followed_username' => $targetUser->username,
                'is_followed' => false,
            ], 200),

            'same_user' => response()->json(['message' => 'Impossible de se follow soi-même'], 400),
            'user_not_found' => response()->json(['message' => 'Utilisateur introuvable'], 404),

            default => response()->json(['message' => 'Unexpected error'], 500),
        };
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


     public function deleteFollow(Request $request, $followedId)
    {
        $user =  $request->user();
        $this->followService->unfollow($user->id, $followedId);
        return response()->json(['message' => 'Unfollowed successfully.']);
    }

    public function getfollowers(Request $request)
    {
        $user = $request->user();
        return response()->json($this->followService->getFollowers($user->id));
    }

    public function getfollowings(Request $request)
    {   
        $user = $request->user();
        return response()->json($this->followService->getFollowings( $user->id));
    }

    
}
