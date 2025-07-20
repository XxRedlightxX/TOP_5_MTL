<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $table = 'avis';

    public $timestamps = false;

    protected $fillable = ['date', 'contenu', 'User_id', 'activite_id'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}
