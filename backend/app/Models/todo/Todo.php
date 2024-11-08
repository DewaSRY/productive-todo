<?php

namespace App\Models\todo;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;

class Todo extends Model
{
    use HasFactory;
    
    protected $table = 'todos'; 

    protected $fillable= ['title','is_completed',"description","priority", 'user_id'];

    public function scopeDateRangeFilter(
        EloquentBuilder | QueryBuilder $query, $from = null, $to = null
        ) : EloquentBuilder | QueryBuilder
    {
        if ($from && !$to) {
           return $query->where('created_at', '>=', $from);
        } elseif (!$from && $to) {
            return $query->where('created_at', '<=', $to);
        } elseif ($from && $to) {
            return $query->whereBetween('created_at', [$from, $to]);
        }
        return $query;
    }

    public function scopeIsCompleted( 
        EloquentBuilder | QueryBuilder $query, ?bool $isCompleted
    ):EloquentBuilder | QueryBuilder
    {
        if($isCompleted != null){
            return $query->where("is_completed", $isCompleted);
        }
        return $query;
    }

  
}
