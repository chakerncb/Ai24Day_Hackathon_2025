<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class users_log extends Model
{
    //

    protected $table = 'users-log';

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'time',
        'place',
    ];
}
