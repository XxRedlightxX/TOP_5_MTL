<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;


class UserDAOImpl implements UserDAO {
    

    /**
     * @inheritDoc
     */
    public function getByEmail(string $email) {
        
        return User::where('email', 'like', '%' . $email . '%')->get();
    }

    /**
     * @inheritDoc
     */
    public function save(array $userData): User
    {
        return User::firstOrCreate($userData);
    }
    /**
     * @inheritDoc
     */
    public function update(int $userid, array $data): ?User {
        $user = User::find($userid);
        if (!$user) return null;

        $user->update($data);
        return $user;
    }

    /**
     * @inheritDoc
     */
    public function delete(int $id): bool
    {
        return User::findOrFail($id)->forceDelete();
        
    }

    /**
     * @inheritDoc
     */
    public function getAll() {

        return User::all();
    }

    /**
     * @inheritDoc
     */
    public function getById(int $id) {
        return User::findOrFail($id);

    }

     public function addActivity(int $userId, array $activityData) {
        
        $user = User::findOrFail($userId);

        $activityData['utilisateur_id'] = $user->id;

        $activity = Activite::create($activityData);

        return $activity;
        

     }
}