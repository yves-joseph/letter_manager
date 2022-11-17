<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

/**
 * @property string $name
 * @property Collection $users
 * @property int $id
 */
class ServiceTrashResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            $this->name,
            [
                "show" => route('services.restore', ['service' => $this->id])
            ]
        ];
    }
}
