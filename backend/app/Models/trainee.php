<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class trainee extends Model
{
    protected $table = 'coach';
    protected $primaryKey = 'id_trainer';

    protected $fillable = [
        'id_trainer',
        'full_name',
        'phone_number',
        'age',
        'session_numbers',
        'start_membership',
        'end_membership',
        'id_reception',
    ];

    public $timestamps = false;
}
