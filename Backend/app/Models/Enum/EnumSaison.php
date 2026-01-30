<?php

namespace App\Models\Enum;

use Illuminate\Database\Eloquent\Model;

enum EnumSaison :string
{
     case ETE = 'ete';
    case HIVER = 'hiver';
    case AUTOMNE = 'automne';
    case PRINTEMPS = 'printemps';
}
