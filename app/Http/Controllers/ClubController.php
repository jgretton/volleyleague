<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClubRequest;
use App\Models\Club;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $clubs = Club::query()->orderBy('name')->get(['name','id','contact_name', 'contact_email']);
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Club $club)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {
        //
    }
}
