<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{

      protected $table = 'type';
    protected $fillable = ['nom'];

    public function activites()
    {
        return $this->belongsToMany(Activite::class, 'typeactivite', 'type_id', 'activite_id');
    }
}
