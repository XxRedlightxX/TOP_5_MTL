<?php

namespace App\DAO\BD;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\User;
use Carbon\Carbon;


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

    public function addActivity(int $userId, array $activityData) {
        
        $user = User::findOrFail($userId);

        $activityData['utilisateur_id'] = $user->id;

        $activity =$this->save($activityData);

        return $activity;
    
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

    public function getUpcomingActivityByRecent() {
          return Activite::whereDate('date', '>=', now())
        ->orderBy('date', 'asc')
        ->take(6) 
        ->get();
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

    public function addCommentToActivity(int $userId, int $activityId, string $contenu, int $nbEtoiles) {
        $userExist = User::findOrFail($userId);
        $actvityExist = Activite::findOrFail($activityId);

        return Avis::create([
            "utilisateur_id" => $userExist->id,
            "activite_id" => $actvityExist->id,
            "contenu" => $contenu,
            "etoiles" => $nbEtoiles,
            "date" => now()
        ]);


    }

   public function updateActivityByUser(int $activityId, array $activityData) {
        $activite = Activite::findOrFail($activityId);

        $activite->update($activityData); 

        return $activite;
   }



}