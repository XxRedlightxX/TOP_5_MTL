<?php

namespace App\Service;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use Exception;
use Illuminate\Validation\ValidationException;

class ActiviteService {

    private $activiteDAO;

    public function __construct(ActiviteDAO $activiteDAO) {
        $this->activiteDAO = $activiteDAO;
    }

    public function getActivitiesList() {
        return $this->activiteDAO->getAll();
    }

    public function updateActiviy(int $activityId, $activity) {
        return $this->activiteDAO->update($activityId, $activity);
    }

    public function deleteActivity(int $activityId) {
      
        
        $this->activiteDAO->delete($activityId);
    }


    public function createActivite($titre, array $activiteData) {
        $activiteTitre =Activite::where('titre',$titre )->exists();
        
        if ($activiteData['titre'] === $activiteTitre) {
            throw ValidationException::withMessages([
            'name' => ['An activity with this name already exists.'],
        ]);
        }
        return $this->activiteDAO->save($activiteData);
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
        return $this->activiteDAO->getActivityByName($activiteTypeName);
    }


}