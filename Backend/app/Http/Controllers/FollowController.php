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
    }
    public function follow(Request $request, $followedId)
    {
        $request->validate([
            'follower_id' => 'required|exists:Utilisateur,id',
        ]);
      $result = $this->followService->follow($request->follower_id, $followedId);
       
        try {
            return match ($result) {
            'followed' => response()->json(['message' => 'Vous avez follow', 'followed_username' =>  $user = User::findOrFail($request->follower_id)], 200),
            'user_not_found' => response()->json(['message' => 'Déjà liké'], 409),
            'same_user' => response()->json(['message' => 'Utilisateur non trouvé'], 404)};
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

     public function unfollow(Request $request, $followedId)
    {
        $request->validate([
            'follower_id' => 'required|exists:Utilisateur,id',
        ]);

        $this->followService->unfollow($request->follower_id, $followedId);
        return response()->json(['message' => 'Unfollowed successfully.']);
    }

    public function followers($userId)
    {
        return response()->json($this->followService->getFollowers($userId));
    }

    public function followings($userId)
    {
        return response()->json($this->followService->getFollowings($userId));
    }
}
