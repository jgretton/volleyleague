<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

        //Clubs
        Route::get('clubs', [ClubController::class, 'index'])->name('clubs');
        Route::get('clubs/create', [ClubController::class, 'create'])->name('clubs.create');
        Route::post('clubs/create', [ClubController::class, 'store'])->name('clubs.store');
        Route::get('clubs/{club}', [ClubController::class, 'show'])->name('clubs.show');

        Route::get('clubs/{club}/edit', [ClubController::class, 'edit'])->name('clubs.edit');
        Route::put('clubs/{club}', [ClubController::class, 'update'])->name('clubs.update');
        Route::delete('clubs/{club}', [ClubController::class, 'destroy'])->name('clubs.destroy');


        // Teams
        Route::post('clubs/{club}', [TeamController::class, 'store'])->name('teams.store');
        Route::put('teams/{team}', [TeamController::class, 'update'])->name('teams.update');
        Route::delete('teams/{team}', [TeamController::class, 'destroy'])->name('teams.delete');

});


require __DIR__.'/settings.php';
