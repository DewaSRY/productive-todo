<?php

namespace App\Http\Resources\todo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "created_at"=> $this->created_at,
            "updated_at"=> $this->updated_at,
            "title"=> $this->title,
            "is_completed" => $this->is_completed == 1 ? true : false,
            "description"=> $this->description,
            "priority"=> $this->priority,
            "user_id"=> $this->user_id

        ];
    }
}


