<?php

namespace App\Models\Enum;

use Illuminate\Database\Eloquent\Model;

enum EnumMode :string
{
     case JOUR = 'jour';
    case NUIT = 'nuit';
   
}
