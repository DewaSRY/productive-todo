<?php

namespace App\Models\todo;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;

use App\data\Priority;

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
        if($isCompleted !== null){
            return $query->where("is_completed", $isCompleted );
        }
        return $query;
    }

    public function scopePriority( 
        EloquentBuilder | QueryBuilder $query, ?string $priority
    ):EloquentBuilder | QueryBuilder
    {
        if($priority !== null && in_array($priority,array_keys(Priority::$data))){
            return $query->where("priority", $priority );
        }

        return $query;
    }
    public function scopeSearchName(
        EloquentBuilder|QueryBuilder $query, ?string $name
    ):EloquentBuilder|QueryBuilder{
        if($name !== null){
            return $query->where("title", "like", '%' . $name . '%' )
                    ->orWhere("description", "like", '%' . $name . '%' )
                    ->orWhere("priority", "like", '%' . $name . '%' );
        }

        return $query;
    }
    
}
