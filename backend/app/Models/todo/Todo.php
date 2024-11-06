<?php

namespace App\Models\todo;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Todo extends Model
{
    use HasFactory;
    
    protected $table = 'todos'; // Replace 'your_table_name' with the actual name of your table

    protected $fillable= ['title','is_completed',"description","priority", 'user_id'];


  
}
