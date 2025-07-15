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
        $validated = $request->validate([
            'daytime' => 'required|string', 
        ]);
        $activiteSaison = $this->userService->getActivitiesByDaytime($validated['daytime']);
        return response()->json($activiteSaison);
    }

    public function getActivitybyType(Request $request) {
        $validated =$request->validate([
            'type' => 'required|string', 
        ]);

        $activiteType = $this->userService->getActivitiesByType($validated['type']);
        return response()->json(  $activiteType);

    }
    
    public function getActivityBySeason(Request $request) {
        $validated =$request->validate([
            'season' => 'required|string', 
        ]);

        $activiteSaison = $this->userService->getActivitiesBySeason($validated['season']);
        return response()->json($activiteSaison);
    }






}
