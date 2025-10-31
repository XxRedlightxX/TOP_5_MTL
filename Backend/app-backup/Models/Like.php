<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';

    protected $fillable = ['utilisateur_id', 'activite_id'];

    public function utilisateur()
    {
        return $this->belongsTo(User::class);
    }

    public function activites()
    {
        return $this->belongsTo(Activite::class, "activite_id");
    }
}
