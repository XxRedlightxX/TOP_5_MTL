<?php

namespace App\Exceptions;

use Exception;

class UserConflictException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'exception' => 'UserConflictException'
        ], 409);
    }
}
