<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;
use App\Models\Activite;

interface ActiviteDAO extends InterfaceDAO {

    public function getActivityBySeason(string $seasonName);

     public function addActivity(int $userId, array $activityData);
    public function getAllCategories();

    public function getActivityByName(string $actvityName);

    public function getActivityByType(string $activityType);

    public function getUpcomingActivityByRecent();

    public function getEventAverageRating($activityId);
    public function getActivitiesMostLiked();
    public function getActivityByDayOrNight(string $activiteyDaytime);

    public function addCommentToActivity(int $userId, int $activityId, string $contenu, int $nbEtoiles);

    public function updateActivitybyUser(int $activityId, array $activityData);

    public function getFilteredActivities(array $filters);



}