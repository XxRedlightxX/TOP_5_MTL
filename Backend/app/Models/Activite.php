<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    protected $table = 'activite';

     protected $fillable = [
        'titre', 'description', 'date_debut', 'date_fin', 'latitude', 'longitude', 'lieu',
        'nombre_likes', 'statut_journee', 'image_data', 
        'utilisateur_id', 'saison_id', 'type_id'
    ];

    public function User()
    {
        return $this->belongsTo(User::class , "utilisateur_id");
    }

    public function saison()
    {
        return $this->belongsTo(Saison::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function favoris()
    {
        return $this->belongsToMany(User::class, 'favori', 'activite_id', 'User_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

}
