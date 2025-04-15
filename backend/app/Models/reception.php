<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class reception extends Model
{
    //
    protected $table = 'reception';

    protected $primaryKey = 'id_reception';

    protected $fillable = [
        'full_name',
        'phone_number',
        'password',
        'age',
        'gender',
        'email_address'
        ];
}
