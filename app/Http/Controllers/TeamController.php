<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamsRequest;
use App\Models\Team;
use App\Models\Club;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TeamController extends Controller
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
    public function store(StoreTeamsRequest $request, Club $club)
    {
        //
        try{
        $team = Team::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'gender' => $request->gender,
            'club_id' => $club->id,
        ]);
        return redirect()->route('clubs.show', $club->id)->with('success', 'Team created successfully');
        }
                catch(\Exception $e)
        {
            return redirect()->back()->with('error', 'Failed to create team, please try again. If this error continues please contact support' );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTeamsRequest $request, Team $team)
    {
        //]
        try{
            $team->update($request->validated());
            return redirect()->route('clubs.show', $team->club_id)->with('success', 'Team updated successfully');
        }
        catch(\Exception $e)
        {
            return redirect()->back()->with('error', 'Failed to update team, try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
         try{
            $clubId = $team->club_id;
            $team->delete();
        return redirect()->route('clubs.show', $clubId)->with('success', 'Team deleted successfully');
        }
                catch(\Exception $e)
        {
            return redirect()->back()->with('error', 'Failed to delete team, please try again. If this error continues please contact support' );
        }

    }
}
