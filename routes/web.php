<?php

use App\Http\Controllers\ClubController;
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

        Route::get('clubs', [ClubController::class, 'index'])->name('clubs');
        Route::get('clubs/create', [ClubController::class, 'create'])->name('clubs.create');
        Route::post('clubs/create', [ClubController::class, 'store'])->name('clubs.store');



});


require __DIR__.'/settings.php';
