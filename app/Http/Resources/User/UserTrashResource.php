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
class UserTrashResource extends JsonResource
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
                'state' => $this->activated->value
            ]),
            [
                "show" => route('users.restore', ['user' => $this->id])
            ]
        ];
    }
}
