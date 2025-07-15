<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;
use App\Models\Activite;

interface ActiviteDAO extends InterfaceDAO {

    public function getActivityBySeason(string $seasonName);

    public function getActivityByType(string $activityType);

    public function getActivityByDayOrNight(string $activiteyDaytime);

}