<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class League extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'name', 'gender'];

    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class, 'league_id', 'id');
    }
}
