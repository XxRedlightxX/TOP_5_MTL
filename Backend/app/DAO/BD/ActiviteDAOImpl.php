<?php

namespace App\DAO\BD;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\Saison;
use App\Models\Type;
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

    public function getAllCategories() {
        return Type::all();
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

        return Activite::whereHas('saison', function ($query) 
        use ($nomSaison) {
            $query->where('statut', $nomSaison);
        })->get();  
    }


    public function getUpcomingActivityByRecent() {
        return Activite::whereDate('date_debut', '>=', now())
        ->orderBy('date_debut', 'asc')
        ->take(12) 
        ->get();
    }

    public function getActivityByType(string $activiteType) {
        return Activite::whereHas('type', function ($query) 
        use ($activiteType) {
            $query->where('nom', '=', $activiteType);
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

    public function getEventAverageRating($eventId)
    {
        $activityRating= Avis::where('activite_id', $eventId)->avg('etoiles');
        $activity = Activite::findOrFail($eventId);

        $activity->nombre_likes=$activityRating;
        $activity->update();

        return $activity;
    }

   public function getActivitiesMostLiked() {
        return Activite::orderByDesc('nombre_likes')->take(4)->get();
    }

    public function getFilteredActivities(array $filters)
    {
        $query = Activite::query();

        if (!empty($filters['daytime'])) {
            $query->where('statut_journee', $filters['daytime']);
        }

        if (!empty($filters['title'])) {
            $query->where('titre', 'LIKE', "%{$filters['title']}%");
        }

        if (!empty($filters['season'])) {
            $query->whereHas('saison', function ($q) use ($filters) {
                $q->where('statut', $filters['season']);
            });
        }

        if (!empty($filters['type'])) {
            $query->whereHas('type', function ($q) use ($filters) {
                $q->where('nom', $filters['type']);
            });
        }

        return $query->get();
    }


    public function getActivityFromSeason(string $seasonName) {
        return Saison::where('statut', $seasonName)->first();
    }

    public function getActivityFromCategoryType(string $typeName) {
        return Type::where('nom', $typeName)->first();
    }


    /**
     * @inheritDoc
     */
    public function getDaysandNightsActivities( $activitiesData)
    {
        $collection = collect($activitiesData);

        return [
            'days' => $collection
                ->where('statut_journee', 'jour')
                ->values(),

            'nights' => $collection
                ->where('statut_journee', 'nuit')
                ->values(),
        ];
    }

}