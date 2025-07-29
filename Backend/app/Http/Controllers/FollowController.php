<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\FollowService;
use Illuminate\Http\Request;

use Illuminate\Validation\ValidationException;

class FollowController extends Controller 
{

    protected $followService;

    public function __construct(FollowService $followService)
    {
        $this->followService = $followService;
        $this->middleware('auth:sanctum');
    }
    public function addFollowAUser(Request $request)
    {
        $request->validate([
            'follower_id' => 'required|exists:Utilisateur,id',
        ]);
        $user =  $request->user();
        $result = $this->followService->follow($user->id,$request->follower_id);
        
    
        try {
            return match ($result) {
            'followed' => response()->json(['message' => 'Vous avez follow', 'followed_username' =>  $user = User::findOrFail($request->follower_id)], 200),
            'user_not_found' => response()->json(['message' => 'Déjà liké'], 409),
            'same_user' => response()->json(['message' => 'Utilisateur non trouvé'], 404)};
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
