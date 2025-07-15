<?php

namespace App\Http\Controllers;

use App\Service\LikeService;
use Illuminate\Http\Request;

class LikeController extends Controller
{
     protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }


    public function AddtoActivitybyUserId(int $userId, int $activityId) {
        try {
            $this->likeService->AddLikeToActivitybyUser($userId, $activityId );

            return response()->json(['message' => 'Activité likée avec succès']);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

}
