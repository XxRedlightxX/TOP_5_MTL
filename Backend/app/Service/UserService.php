<?php

namespace App\Service;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class UserService {

    private $daoUser;

    public function __construct(UserDAO $daoUser) {
        $this->daoUser = $daoUser;
    }

    public function getUserList() {
        return $this->daoUser->getAll();
    }

    public function creatUser(  $user) {
        return $this->daoUser->save($user);
    }

    public function deleteUser(int $userId){
        $this->daoUser->delete($userId);
    }

     public function searchUserbyEmail(string $userEmail){
       return  $this->daoUser->getByEmail($userEmail);
    }

    public function updateUser(int $userId, $user): ?User{
        return $this->daoUser->update($userId, $user);
    }
    
    public function createActivityUser(int $userId, $activity): Activite {
        return $this->daoUser->addActivity($userId, $activity);
    }
    
    
    


}