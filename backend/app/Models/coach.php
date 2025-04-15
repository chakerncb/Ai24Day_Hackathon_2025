<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class coach extends Model
{
    protected $table = 'coach';
    protected $primaryKey = 'id_coach';
    protected $fillable = [
        'id_coach',
        'full_name',
        'phone_number',
        'age',
        'gender',
        'email_address'
        ];
}
