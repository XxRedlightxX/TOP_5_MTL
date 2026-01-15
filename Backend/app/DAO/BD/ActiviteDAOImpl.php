<?php

namespace App\DAO\BD;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\Saison;
use App\Models\Type;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
//

class ActiviteDAOImpl implements ActiviteDAO
{

    private const CACHE_TTL = 600;

    /**
     * @inheritDoc
     */
    public function delete(int $id) {
        Cache::tags('activities')->flush();
        return Activite::findOrFail($id)->Delete();
    }

    /**
     * @inheritDoc
     */
    public function getAll(int $perPage = 9, int $page = 1)
    {
        $cacheKey = 'activities:paginate:' . md5(json_encode([
            'page' => $page,
            'perPage' => $perPage,
            'order' => 'date_debut',
        ]));

        logger(
            Cache::tags('activities')->has($cacheKey)
                ? 'CACHE HIT'
                : 'CACHE MISS'
        );

        return Cache::tags('activities')->remember(
        $cacheKey,
        self::CACHE_TTL,
        function () use ($perPage, $page) {

            $paginatedData = Activite::orderBy('date_debut')
                ->paginate($perPage, ['*'], 'page', $page);

            $countJour = Activite::where('statut_journee', 'jour')->count();
            $countNuit = Activite::where('statut_journee', 'nuit')->count();

            return [
                'data' => $paginatedData->items(),
                'pagination' => [
                    'current_page' => $paginatedData->currentPage(),
                    'last_page' => $paginatedData->lastPage(),
                    'per_page' => $paginatedData->perPage(),
                    'total' => $paginatedData->total(),
                ],
                'nbPagination' => [
                    'jour' => ceil($countJour / $perPage),
                    'nuit' => ceil($countNuit / $perPage),
                ]
            ];
        });

    }

     public function getActivitiesPaginationLenght(array $filters, int $perPage = 9, int $page = 1 ) {
          $cacheKey = 'activities:pagination:' . md5(json_encode(array_merge(
        $filters,
        ['per_page' => $perPage, 'page' => $page]
    )));

    return Cache::remember(
        $cacheKey,
        self::CACHE_TTL,
        function () use ($filters, $perPage, $page) {
            $query = Activite::query();

            // Appliquer les filtres
            if (!empty($filters['daytime'])) {
                $query->where('statut_journee', $filters['daytime']);
            }

            if (!empty($filters['title'])) {
                $query->where('titre', 'LIKE', "%{$filters['title']}%");
            }

            if (!empty($filters['season'])) {
                $query->whereHas('saison', fn ($q) =>
                    $q->where('statut', $filters['season'])
                );
            }

            if (!empty($filters['type'])) {
                $query->whereHas('type', fn ($q) =>
                    $q->where('nom', $filters['type'])
                );
            }

            // Paginer les résultats
            $paginatedData = $query->paginate($perPage, ['*'], 'page', $page);
            
            // Calculer les nombres de pages pour jour et nuit
            // BASÉ SUR LES FILTRES APPLIQUÉS
            
            // 1. Pour les événements de jour (statut_journee = 'jour')
            $queryJour = clone $query;
            $countJour = $queryJour->where('statut_journee', 'jour')->count();
            
            // 2. Pour les événements de nuit (statut_journee = 'nuit')
            $queryNuit = clone $query;
            $countNuit = $queryNuit->where('statut_journee', 'nuit')->count();
            
            // 3. Calculer le nombre de pages
            $pagesJour = ceil($countJour / $perPage);
            $pagesNuit = ceil($countNuit / $perPage);

            return [
                'nbPagination' => [
                    'jour' => [$pagesJour],
                    'nuit' => [$pagesNuit]
                ]
            ];
        

     });
    }
    public function getAllCategories() {
        return Cache::remember(
            'categories:all',
            self::CACHE_TTL,
            fn () => Type::all()
        );
    }

    /**
     * @inheritDoc
     */
    public function getById(int $id) {
        return Cache::remember(
        "activities:id:$id",
        self::CACHE_TTL,
        fn () => Activite::findOrFail($id)
    );
    }

    /**
     * @inheritDoc
     */
    public function save(array $activiteData) {
        Cache::tags('activities')->flush();
        return Activite::create($activiteData);
    }

    /**
     * @inheritDoc
     */
    public function update(int $idActivite, array $data): ?Activite {
        Cache::tags('activities')->flush();
        $activiteExist = Activite::find($idActivite);
        if (!$activiteExist)
            return null;

        $activiteExist->update($data);
        return $activiteExist;

    }

    public function addActivity(int $userId, array $activityData) {
        Cache::tags('activities')->flush();
        $user = User::findOrFail($userId);

        $activityData['utilisateur_id'] = $user->id;

        $activity = $this->save($activityData);

        return $activity;

    }

    /**
     * @inheritDoc
     */
    public function getActivityBySeason(string $nomSaison)
    {

       return Cache::remember(
        "activities:season:$nomSaison",
        self::CACHE_TTL,
        fn () =>
            Activite::whereHas('saison', fn ($q) =>
                $q->where('statut', $nomSaison)
            )->get()
    );
    }


    public function getUpcomingActivityByRecent() {
       return Cache::tags('activities')->remember(
        'activities:upcoming',
        300, // 5 min (time-sensitive)
        function () {
            return [
                'days' => Activite::whereDate('date_debut', '>=', now())
                    ->where('statut_journee', 'jour')
                    ->orderBy('date_debut')
                    ->take(12)
                    ->get(),

                'nights' => Activite::whereDate('date_debut', '>=', now())
                    ->where('statut_journee', 'nuit')
                    ->orderBy('date_debut')
                    ->take(12)
                    ->get(),
            ];
        }
    );

    }

    public function getActivityByType(string $activiteType) {
        return Cache::remember(
            "activities:type:$activiteType",
            self::CACHE_TTL,
            fn () =>
                Activite::whereHas('type', fn ($q) =>
                    $q->where('nom', $activiteType)
                )->get()
        );
    }

    public function getActivityByDayOrNight(string $activiteyDaytime)
    {
        return Activite::where('statut_journee', $activiteyDaytime)->get();
    }

    /**
     * @inheritDoc
     */
    public function getActivityByName(string $activityName)
    {
        return Activite::where('titre', 'LIKE', "%{$activityName}%")->get();
    }

    public function addCommentToActivity(int $userId, int $activityId, string $contenu, int $nbEtoiles)
    {
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



    public function updateActivityByUser(int $activityId, array $activityData)
    {
        $activite = Activite::findOrFail($activityId);

        $activite->update($activityData);

        return $activite;
    }

    public function getEventAverageRating($eventId)
    {
        $activityRating = Avis::where('activite_id', $eventId)->avg('etoiles');
        $activity = Activite::findOrFail($eventId);

        $activity->nombre_likes = $activityRating;
        $activity->update();

        return $activity;
    }

    public function getActivitiesMostLiked()
    {

        return Cache::tags('activities')->remember(
        'activities:most_liked',
        600, // 10 minutes TTL
        function () {
            $days = Activite::where('statut_journee', 'jour')
                ->orderByDesc('nombre_likes')
                ->take(4)
                ->get();

            $nights = Activite::where('statut_journee', 'nuit')
                ->orderByDesc('nombre_likes')
                ->take(4)
                ->get();

            return [
                'days' => $days,
                'nights' => $nights,
            ];
        }
    );
    }

    public function getFilteredActivities(array $filters, $perPage = 9, $page = 1)
{
    // Créer une clé de cache unique incluant tous les paramètres
    $cacheKey = 'activities:filter:' . md5(json_encode(array_merge(
        $filters,
        ['per_page' => $perPage, 'page' => $page]
    )));

    return Cache::remember(
        $cacheKey,
        self::CACHE_TTL,
        function () use ($filters, $perPage, $page) {
            $query = Activite::query();

            // Appliquer les filtres
            if (!empty($filters['daytime'])) {
                $query->where('statut_journee', $filters['daytime']);
            }

            if (!empty($filters['title'])) {
                $query->where('titre', 'LIKE', "%{$filters['title']}%");
            }

            if (!empty($filters['season'])) {
                $query->whereHas('saison', fn ($q) =>
                    $q->where('statut', $filters['season'])
                );
            }

            if (!empty($filters['type'])) {
                $query->whereHas('type', fn ($q) =>
                    $q->where('nom', $filters['type'])
                );
            }

            // Paginer les résultats
            $paginatedData = $query->paginate($perPage, ['*'], 'page', $page);
            
            // Calculer les nombres de pages pour jour et nuit
            // BASÉ SUR LES FILTRES APPLIQUÉS
            
            // 1. Pour les événements de jour (statut_journee = 'jour')
            $queryJour = clone $query;
            $countJour = $queryJour->where('statut_journee', 'jour')->count();
            
            // 2. Pour les événements de nuit (statut_journee = 'nuit')
            $queryNuit = clone $query;
            $countNuit = $queryNuit->where('statut_journee', 'nuit')->count();
            
            // 3. Calculer le nombre de pages
            $pagesJour = ceil($countJour / $perPage);
            $pagesNuit = ceil($countNuit / $perPage);

            return [
                'data' => $paginatedData,
                'nbPagination' => [
                    'jour' => [$pagesJour],
                    'nuit' => [$pagesNuit]
                ]
            ];
        }
    );
}

    public function getActivityFromSeason(string $seasonName)
    {
        return Saison::where('statut', $seasonName)->first();
    }

    public function getActivityFromCategoryType(string $typeName)
    {
        return Type::where('nom', $typeName)->first();
    }





    /**
     * @inheritDoc
     */
    public function getNewestActivitiesbyCreationDate() {
        return Cache::tags('activities')->remember(
        'activities:newest_by_creation',
        SELF::CACHE_TTL, // 10 minutes TTL
        function () {
            $daysNewestActivities = Activite::where('statut_journee', 'jour')
                ->orderBy('created_at')
                ->take(6)
                ->get();

            $nightsNewestActivities = Activite::where('statut_journee', 'nuit') // corrected 'nuit'
                ->orderBy('created_at')
                ->take(6)
                ->get();

            return [
                'days' => $daysNewestActivities,
                'nights' => $nightsNewestActivities,
            ];
        }
    );
    }
}