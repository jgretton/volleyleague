<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Club extends Model
{
    //
    protected $fillable = ['id', 'name', 'venue', 'contact_name', 'contact_number', 'contact_email'];

    protected $keyType = 'string';
    public $incrementing = false;

    public function teams(): HasMany 
    {
        return $this->hasMany(Team::class, 'club_id', 'id');
    }

}
