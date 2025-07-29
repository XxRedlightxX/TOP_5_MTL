<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    const NOT_ALLOWED = "You dont own this activity";

    const NOT_ALLOWED_USER_TYPE_MESSAGE = "You're not organizor";
    const NOT_ALLOWED_CODE = 403;
    const USER_TYPE= "organisateur";
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->type_utilisateur=='organisateur'
            ? Response::allow()
            : Response::deny( $user->type_utilisateur);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model):  Response
    {
           return $user->id== $model->id || $user->type_utilisateur=="admin"
            ? Response::allow()
            : Response::deny( "Not Allowed her");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model):  Response
    {
        return $user->id== $model->id
            ? Response::allow()
            : Response::deny( "Not Allowed ");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
