<?php

namespace App\Http\Resources\user;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResources extends JsonResource
{
    private string $accessToken;

    public function __construct($model, string $accessToken)
    {
        // Pass the model to the parent constructor
        parent::__construct($model);
        $this->accessToken = $accessToken;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->accessToken,
            'data' => [
                "id"=> $this->id,
                "name"=> $this->name,
                "email"=> $this->email,
                "created_at"=> $this->created_at,
                "updated_at"=> $this->updated_at,
            ],
        ];
    }
}
