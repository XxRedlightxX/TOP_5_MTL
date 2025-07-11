<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;


class UserDAOImpl implements UserDAO {
    

    /**
     * @inheritDoc
     */
    public function getByEmail(string $email) {
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
    public function update(int $userid, array $data): User|null {
        return null;
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
}