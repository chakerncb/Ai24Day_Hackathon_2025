<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class recognition_log extends Model
{
    //

    protected $table = 'recognition_logs';

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'place',
        'confidence',
        'timestamp',
        'created_at',
    ];
}
