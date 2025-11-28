<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Team extends Model
{
    //
    protected $fillable = ['id','name', 'gender', 'club_id'];
     protected $keyType = 'string';
    public $incrementing = false;

    public function club(): BelongsTo 
    {
        return $this->belongsTo(Club::class);
    }
}
