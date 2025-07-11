<?php

namespace App\Service;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
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

  public function deleteUser(int $userId)
{
    /*$user = $this->daoUser->getById($userId);
    
    if (!$user) {
        throw new ModelNotFoundException("User not found {$userId}");
    }*/

    $this->daoUser->delete($userId);

}
    
    
    


}