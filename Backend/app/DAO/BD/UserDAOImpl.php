<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\User;
use App\Services\DTO\AuthResult;
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
        return User::create($userData);
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

    /**
     * @inheritDoc
     */
    public function isFollowing(User $follower, User $followed): bool {

        return $follower->followings()->where('followed_id', $followed->id)->exists();
    }

    /**
     * @inheritDoc
     */
    public function follow(User $follower, User $followed):void {
         
        $follower->followings()->syncWithoutDetaching([$followed->id]);
    }

    /**
     * @inheritDoc
     */
    public function getFollowers(User $user) {
          return $user->followings;
    }

    /**
     * @inheritDoc
     */
    public function getFollowings(User $user) {
         return $user->followings;
    }

    /**
     * @inheritDoc
     */
    public function unfollow(User $follower, User $followed): void {

         $follower->followings()->detach($followed->id);
    }

    /**
     * @inheritDoc
     */
    public function findById(int $userid) {
        return User::findOrFail($userid);
    }

    /**
     * @inheritDoc
     */
    public function checkEmailAndPasswordExist(string $userEmail, $userPassword) {
         $user = User::where('email', $userEmail)->first();

        if ($user && Hash::check($userPassword, $user->password)) {
            return $user;
        }

        return null;

       

    }
}