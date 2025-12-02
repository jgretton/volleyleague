<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeagueRequest;
use App\Models\League;
use App\Models\Season;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LeagueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $leagues = League::query()->orderBy('name')->with('seasons')->get(['name', 'gender', 'id']);

        return Inertia::render('leagues/index', [
            'leagues' => $leagues,
        ]);
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
    public function store(StoreLeagueRequest $request)
    {
        //
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $season_end_year = substr($validated['end_date'], -2);
            $season_name = $validated['start_date'].'/'.$season_end_year;

            $league = League::create([
                'id' => Str::uuid(),
                'name' => $validated['name'],
                'gender' => $validated['gender'],
            ]);

            $season = Season::create([
                'name' => $season_name,
                'start_date' => (int) $validated['start_date'],
                'end_date' => (int) $validated['end_date'],
                'league_id' => $league->id,
            ]);
            DB::commit();

            return redirect()->route('leagues')->with('success', 'League created successfully');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Failed to create league, please try again. If this error continues please contact support '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(League $league)
    {
        //
        return Inertia::render('leagues/[id]/index', [
            'league' => $league,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(League $league)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, League $league)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(League $league)
    {
        //
    }
}
