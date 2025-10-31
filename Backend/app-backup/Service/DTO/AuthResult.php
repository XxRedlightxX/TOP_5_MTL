<?php

namespace App\Service\DTO;

use App\Models\User;

class AuthResult
{
    public bool $success;
    public ?User $user;
    public string $message;

    public ?string $token;

    public function __construct(bool $success, ?User $user = null, string $message = '', ?string $token = null)
    {
        $this->success = $success;
        $this->user = $user;
        $this->message = $message;
        $this->token = $token;
    }
}
