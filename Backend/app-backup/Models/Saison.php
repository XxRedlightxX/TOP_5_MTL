<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Saison extends Model
{
     protected $table = 'saison';

    protected $fillable = ['statut'];

    public function activites()
    {
        return $this->hasMany(Activite::class);
    }
}
