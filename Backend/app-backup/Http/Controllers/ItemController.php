<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Policies\ActivityPolicy;
use App\Service\ActiviteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ItemController extends Controller
{

        /**
     * Update the given blog post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */

    /**
     * Display a listing of the resource.
     */

     protected $userService;

    public function __construct(ActiviteService $userService)
    {
        $this->userService = $userService;
         $this->middleware('auth:sanctum');
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Activite $activite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activite $activite)
    {
        //
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activite $activite)
    {
         dd([
        'user' => get_class($request->user()),
        'model' => get_class($activite),
        'policy' => Gate::getPolicyFor($activite),
         ]);
        $this->authorize('update', $activite);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activite $activite)
    {
        //
    }
}
