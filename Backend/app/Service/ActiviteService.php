<?php

namespace App\Service;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class ActiviteService {

    private $activiteDAO;

    public function __construct(ActiviteDAO $activiteDAO) {
        $this->activiteDAO = $activiteDAO;
    }

    public function getActivitiesList(int $perPage, int $page) {
        return $this->activiteDAO->getAll($perPage, $page);
    }

    public function updateActiviy(int $activityId, $activity) {
        return $this->activiteDAO->update($activityId, $activity);
    }

    public function deleteActivity(int $activityId) {
      
        
        $this->activiteDAO->delete($activityId);
    }


    public function createActivite($titre, int $userId, array $activiteData) {
        $activiteTitre =Activite::where('titre',$titre )->exists();
        
        if ($activiteData['titre'] == $activiteTitre) {
            throw ValidationException::withMessages([
            'titre' => ['An activity with this name already exists.'],
        ]);
        }
        return $this->activiteDAO->addActivity($userId,$activiteData);
    }

      public function updateUserActivity( int $activityId, array $data): ?Activite
    {
        
        $activity = Activite::findOrFail($activityId);
        

        return $this->activiteDAO->updateActivitybyUser( $activityId, $data);
    }
    public function addCommentToActivityFromUser(int $userId, int $activityId, string $contenu, int $nbEtoiles ) {
   
        return  $this->activiteDAO->addCommentToActivity( $userId, $activityId,$contenu , $nbEtoiles);
    }

    public function findActivityById(int $activityId):?Activite {
        return $this->activiteDAO->getById($activityId);
    }

     public function getActivitiesByName(string $seasonName)
    {
        return $this->activiteDAO->getActivityByName($seasonName);
    }

    public function getActivitiesBySeason(string $seasonName)
    {
        return $this->activiteDAO-> getActivityBySeason($seasonName);
    }

    public function getActivitiesByType(string $activiteTypeName)
    {
        return $this->activiteDAO->getActivityByType($activiteTypeName);
    }

    public function getActivitiesByDaytime(string $activiteTypeName)
    {
        return $this->activiteDAO->getActivityByDayOrNight($activiteTypeName);
    }

    public function getActivitiesByUpcoming()
    {
        return $this->activiteDAO->getUpcomingActivityByRecent();
    }

    public function getEventAvgEtoiles($activityId) {
        
        return $this->activiteDAO->getEventAverageRating($activityId);
    }

    public function getActivitiesMostLiked() {
        return $this->activiteDAO->getActivitiesMostLiked();
    }

     public function getActivitiesFiltered(array $filters)
    {
        return $this->activiteDAO->getFilteredActivities($filters);
    }

    public function getAllCategoriesActivities() {
        return $this->activiteDAO->getAllCategories();
    }

    public function getActivityFromSeason(string $aSeason) {
        return $this->activiteDAO->getActivityFromSeason($aSeason);
    }

    public function getActivityFromCategory(string $aTypeCategory) {
        return $this->activiteDAO->getActivityFromCategoryType($aTypeCategory);
    }

    /*public function getDaysandNightsActivities($aListActivitiesData) {
        return $this->activiteDAO->getDaysandNightsActivities($aListActivitiesData);
    }*/

    public function getNewestActivitiesbyCreationDate() {
        return $this->activiteDAO->getNewestActivitiesbyCreationDate();
    }

 

}