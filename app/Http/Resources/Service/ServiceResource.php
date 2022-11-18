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
class ServiceResource extends JsonResource
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
            tr_html("<strong>{$this->users->count()}</strong>"),
            [
                "show" => route('services.show', ['service' => $this->id]),
                "edit" => route('services.edit', ['service' => $this->id]),
                "delete" => route('services.destroy', ['service' => $this->id])
            ]
        ];
    }
}
