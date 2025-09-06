<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{

      protected $table = 'type';
    protected $fillable = ['nom', 'image_data'];

    public function activites()
    {
        return $this->hasMany(Activite::class, 'type');
    }
}
