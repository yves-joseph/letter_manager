<?php

namespace App\Http\Resources\User;

use App\Http\Enumerations\Activated;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property string $firstname
 * @property object image
 * @property string $lastname
 * @property string $email
 * @property Activated $activated
 * @property int $id
 */
class UserResource extends JsonResource
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
            tr_img([
                'src' => $this->image_path ?? 'user',
                'alt' => `{$this->firstname} {$this->lastname}`,
                'width' => '28'
            ]),
            $this->firstname,
            $this->lastname,
            $this->email,
            tr_b([
                'state' => $this->activated->value,
                'url' => route('users.account_status', ['user' => $this->id])
            ]),
            [
                "show" => route('users.show', ['user' => $this->id]),
                "edit" => route('users.edit', ['user' => $this->id]),
                "delete" => route('users.destroy', ['user' => $this->id])
            ]
        ];
    }
}
