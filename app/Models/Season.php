<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Season extends Model
{
    //
    protected $fillable = ['id', 'name', 'start_date', 'end_date', 'league_id'];

    public function leagues(): BelongsTo
    {
        return $this->belongsTo(League::class, 'league_id', 'id');

    }

    // public function teams(): BelongsToMany
    // {

    // }
}
