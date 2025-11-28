<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClubRequest;
use App\Models\Club;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $clubs = Club::query()->orderBy('name')->withCount('teams')->get(['name','id','contact_name', 'contact_email']);
        return Inertia::render('clubs/index',[
            'clubs' => $clubs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
         return Inertia::render('clubs/create/index',[]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClubRequest $request)
    {
        $club = Club::create([
            'id'=> Str::uuid(),
            'name' => $request->name,
            'venue' => $request->venue,
            'contact_name' => $request->contact_name,
            'contact_email' => $request->contact_email,
            'contact_number' => $request->contact_number,

        ]);

        return redirect()->route('clubs')->with('success', 'Club created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Club $club)
    
    {
        return Inertia::render('clubs/[id]/index', [
            'club' => $club,
            'teams' => $club->teams
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
          return Inertia::render('clubs/[id]/edit/index', [
            'club' => $club,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClubRequest $request, Club $club)
    {
        //
        try{
            $club->update($request->validated());
            return redirect()->route('clubs.show', $club->id)->with('success', 'Club updated successfully');
        }
        catch(\Exception $e)
        {
            return redirect()->back()->with('error', 'Failed to update Club, try again.');
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {
        //
          try{
            $club->delete();
        return redirect()->route('clubs')->with('success', 'Club deleted successfully');
        }
                catch(\Exception $e)
        {
            return redirect()->back()->with('error', 'Failed to delete team, please try again. If this error continues please contact support' );
        }
    }
}
