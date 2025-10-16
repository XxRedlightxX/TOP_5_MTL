<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\FavoriteDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\Conversation;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class FavoriteDAOImpl implements FavoriteDAO {

    

    /**
     * @inheritDoc
     */
    public function addActivityToFavorite(int $userId, int $activityId) {
         $user =User::findOrFail($userId);
        $activity = Activite::findOrFail($activityId);

        $user->favoris()->attach( $activity->id);
    }

     public function getFavoriteActivities(int $userId, int $activityId) {
       

     }

    /**
     * @inheritDoc
     */
    public function delete(int $id) {
    }

    /**
     * @inheritDoc
     */
    public function getAll() {
    }

    /**
     * @inheritDoc
     */
    public function getById(int $id) {
    }

    /**
     * @inheritDoc
     */
    public function save(array $entity) {
    }

    /**
     * @inheritDoc
     */
    public function update(int $id, array $data) {
    }

    /**
     * @inheritDoc
     */
    public function deleteActivityToFavorite(int $userId, int $activityId) {
        $user =User::findOrFail($userId);
        $activity = Activite::findOrFail($activityId);
        $user->favoris()->detach( $activity->id);

    }
}