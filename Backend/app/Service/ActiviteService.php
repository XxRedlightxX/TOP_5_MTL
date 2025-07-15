<?php

namespace App\Service;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use Illuminate\Validation\ValidationException;

class ActiviteService {

    private $activiteDAO;

    public function __construct(ActiviteDAO $activiteDAO) {
        $this->activiteDAO = $activiteDAO;
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

    public function deleteActivite(int $activiteId){
        $this->activiteDAO->delete( $activiteId);
    }

    public function updateActivite(int $activiteId):?Activite{
        return $this->activiteDAO->delete( $activiteId);
    }

    public function findActivityById(int $activityId):?Activite {
        return $this->activiteDAO->getById($activityId);
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


}