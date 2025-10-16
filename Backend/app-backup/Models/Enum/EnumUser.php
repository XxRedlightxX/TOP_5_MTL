<?php

namespace App\Models\Enum;

use Illuminate\Database\Eloquent\Model;

enum EnumUser :string
{
    case ORG = 'organisateur';
    case PART = 'particulier';
   
}
