<?php

namespace App\DAO\BD;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\User;

class ActiviteDAOImpl implements ActiviteDAO {

    /**
     * @inheritDoc
     */
    public function delete(int $id) {
        return Activite::findOrFail($id)->Delete();
    }

    /**
     * @inheritDoc
     */
    public function getAll() {
        return Activite::all();
    }

    /**
     * @inheritDoc
     */
    public function getById(int $id) {
        return Activite::findOrFail($id);
    }

    /**
     * @inheritDoc
     */
    public function save(array $activiteData) {

        return Activite::create($activiteData);
    }

    /**
     * @inheritDoc
     */
    public function update(int $idActivite, array $data): ?Activite {
        $activiteExist = Activite::find($idActivite);
        if (!$activiteExist) return null;

       $activiteExist->update($data);
        return $activiteExist;

    }

    /**
     * @inheritDoc
     */
    public function getActivityBySeason(string $nomSaison) {

        return  Activite::whereHas('saison', function ($query) 
        use ($nomSaison) {
            $query->where('statut', $nomSaison);
        })->get();

        
    }

    public function getActivityByType(string $activiteType) {
        return Activite::whereHas('types', function ($query) 
        use ($activiteType) {
            $query->where('nom', 'LIKE', "%{$activiteType}%");
        })->get();
    }

     public function getActivityByDayOrNight(string $activiteyDaytime) {
        return Activite::where('statut_journee', $activiteyDaytime)->get();
     }

    /**
     * @inheritDoc
     */
    public function getActivityByName(string $activityName) {
         return Activite::where('titre','LIKE' ,"%{$activityName}%")->get();
    }

    public function addCommentToActivity(int $userId, int $activityId, string $contenu) {
        $userExist = User::findOrFail($userId);
        $actvityExist = Activite::findOrFail($activityId);

        return Avis::create([
            "utilisateur_id" => $userExist->id,
            "activite_id" => $actvityExist->id,
            "contenu" => $contenu,
            "date" => now()
        ]);


    }


}