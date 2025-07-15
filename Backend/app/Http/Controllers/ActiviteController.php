<?php

namespace App\Http\Controllers;

use App\Service\ActiviteService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class ActiviteController extends Controller
{
    protected $userService;

    public function __construct(ActiviteService $userService)
    {
        $this->userService = $userService;
    }

   public function getActivityByDayTime(Request $request)
{
    try {
        $validated = $request->validate([
            'daytime' => 'required|string', // correction : 'saison' doit être une string ici, pas une règle 'saison' à moins qu’elle n’existe en tant que règle personnalisée
        ]);

        $activiteSaison = $this->userService->getActivitiesByDaytime($validated['daytime']);

        return response()->json($activiteSaison);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Erreur de validation',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Une erreur est survenue lors de la récupération des activités.',
            'error' => $e->getMessage(),
        ], 500);
    }
}




}
