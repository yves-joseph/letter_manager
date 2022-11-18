<?php

namespace App\Http\Resources\Letter;

use App\Http\Enumerations\Activated;
use App\Http\Enumerations\LetterType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

/**
 * @property string $subject
 * @property string $sender_full_name
 * @property string $recipient_full_name
 * @property Carbon $receive_at
 * @property string $email
 * @property LetterType $type
 * @property int $user_id
 * @property int $id
 */
class LetterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {

        $action["show"] = route('letters.show', ['letter' => $this->id]);

        if ($this->user_id === Auth::id() || Gate::allows('granted', 'ROLE_LETTERS_SUPERVISOR')){
            $action["edit"] = route('letters.edit', ['letter' => $this->id]);
            $action["delete"] = route('letters.destroy', ['letter' => $this->id]);
        }
        return [
            $this->sender_full_name,
            $this->recipient_full_name,
            $this->subject,
            tr_html($this->type === LetterType::Send ? "<span class='icon-folder-upload' style='color: #018601;'></span>Envoyer" : "<span class='icon-folder-download' style='color: #ffc107;'></span>Réceptionner"),
            $this->receive_at->format("d/m/Y"),
            $action
        ];
    }
}
