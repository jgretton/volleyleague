<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTeamToSeasonRequest;
use App\Models\Season;
use Illuminate\Http\Request;

class SeasonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
    public function show(Season $season)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Season $season)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Season $season)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Season $season)
    {
        //
    }

    public function addTeam(AddTeamToSeasonRequest $request, Season $season)
    {
        //
        $validated = $request->validated();
        try {
            $season->teams()->attach($validated['team_ids']);

            return redirect()->back()->with('success', 'Success, the league has been updated.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add teans to the league, try again.');
        }

    }
}
