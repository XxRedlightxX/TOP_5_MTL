<?php

namespace App\Exceptions;

use Exception;

class UserConflictException extends Exception
{
   protected $field;

    // Add $field to the constructor (defaulting to 'email')
    public function __construct($message, $field = 'email')
    {
        parent::__construct($message);
        $this->field = $field;
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'errors' => [
                // Use the variable $this->field instead of the hardcoded "email"
                $this->field => [
                    $this->getMessage()
                ]
            ],
            'exception' => 'UserConflictException'
        ], 409);
    }

}
