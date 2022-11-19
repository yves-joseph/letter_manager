<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;

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
        $action = [];
        if (Gate::allows('granted', 'ROLE_SERVICES_SHOW')) {
            $action["show"] = route('services.show', ['service' => $this->id]);
        }

        if (Gate::allows('granted', 'ROLE_SERVICES_EDIT')) {
            $action["edit"] = route('services.edit', ['service' => $this->id]);
        }
        if (Gate::allows('granted', 'ROLE_SERVICES_DESTROY')) {
            $action["delete"] = route('services.destroy', ['service' => $this->id]);
        }

        return [
            $this->name,
            tr_html("<strong>{$this->users->count()}</strong>"),
            $action
        ];
    }
}
