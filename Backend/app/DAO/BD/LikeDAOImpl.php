<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\LikeDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\Like;
use App\Models\User;

class LikeDAOImpl implements LikeDAO {
    

    /**
     * @inheritDoc
     */
    public function AddLikeToActivity(int $userId, int $activityId) {
        $activity = Activite::findOrFail($activityId);

        Like::create([
        'utilisateur_id' => $userId,
        'activite_id' => $activityId,
    ]);


    }

    public function deleteLikeToActivity(int $userId, int $activityId) {
        Like::where('utilisateur_id', $userId)
        ->where('activite_id', $activityId)
        ->delete();
    }

    public function getLikesByUserId(int $userId) {
        $user=User::findOrFail($userId);

        return $user->activites()->with('likes')->get();
    }

    /**
     * @inheritDoc
     */
    public function userHasLikedActivity(int $userId, int $activityId): bool
    {
        $user = User::findOrFail($userId);

        return $user->likes()
            ->where('activite_id', $activityId)
            ->exists();
    }

    public function incrementLikes(int $activityId): void
    {
        Activite::where('id', $activityId)->increment('nombre_likes');
    }

    /**
     * @inheritDoc
     */
    public function decrementLikes(int $activityId) {

         Activite::where('id', $activityId)->decrement('nombre_likes');
    }
}