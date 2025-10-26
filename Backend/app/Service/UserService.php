<?php

namespace App\Service;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Service\DTO\AuthResult;

class UserService {

    private $daoUser;

    public function __construct(UserDAO $daoUser) {
        $this->daoUser = $daoUser;
    }

    public function getUserList() {
        return $this->daoUser->getAll();
    }

    public function creatUser(  $user) {
        $existUserEmail=$this->daoUser->getByEmail($user['email']);
        $existUsername=$this->daoUser->getByUsername($user['username']);

        if ($existUserEmail->isNotEmpty() ) {
            throw new Exception("There is already a user with email: {$user['email']}");
        }
        if ($existUsername->isNotEmpty() ) {
            throw new Exception("There is already a user with username: {$user['username']}");
        }
        return $this->daoUser->save($user);
    }

    public function deleteUser(int $userId){
        $this->daoUser->delete($userId);
    }

     public function getUserByUsername(string $username){
       return  $this->daoUser->getUserBysearchUsername($username);
    }
    public function getUserEmailandPassword(string $userEmail, $userPassword) {
       $user = $this->daoUser->checkEmailAndPasswordExist($userEmail, $userPassword);
        
        if ($user) {
            $token = $user->createToken($user->username)->plainTextToken;
            return new AuthResult(true, $user, 'Login succ.', $token);
        }

        return new AuthResult(false, null, 'Invalid credentials.', null);
    }



     public function searchUserbyEmail(string $userEmail){
       return  $this->daoUser->getByEmail($userEmail);
    }

    public function updateUser(int $userId, array $userData): ?User
    {
    // Check if email exists for other users
    $existingUserWithEmail = $this->daoUser->getByEmail($userData['email']);
    if ($existingUserWithEmail->isNotEmpty() && $existingUserWithEmail->first()->id != $userId) {
        throw new Exception("There is already a user with email: {$userData['email']}");
    }
    
    // Check if username exists for other users
    $existingUserWithUsername = $this->daoUser->getByUsername($userData['username']);
    if ($existingUserWithUsername->isNotEmpty() && $existingUserWithUsername->first()->id != $userId) {
        throw new Exception("There is already a user with username: {$userData['username']}");
    }

    return $this->daoUser->update($userId, $userData);
}
    
    public function createActivityUser(int $userId, $activity): Activite {
        return $this->daoUser->addActivity($userId, $activity);
    }
    
    
    


}