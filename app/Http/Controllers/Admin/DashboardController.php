<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Enumerations\LetterType;
use App\Http\Resources\Letter\ResumeLetterResource;
use App\Models\Letter;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class DashboardController extends Controller
{
    protected string $basePath = 'admin.page.dashboard.';

    public function index(): Factory|View|Application
    {
        $_readOrNotRead['read'] = 0;
        $_readOrNotRead['not_read'] = 0;
        $_readOrNotRead['send'] = 0;
        $_readOrNotRead['receive'] = 0;
        if (Gate::denies('granted', 'ROLE_LETTERS_SUPERVISOR')) {
            $condition = ['user_id', '=', Auth::id()];
            $__data = Letter::query()->where([$condition])->latest()->get();
        } else {
            $__data = Letter::query()->latest()->get();
        }
        foreach ($__data as $item) {
            if ($item->user_id === Auth::id()) {
                if ($item->type === LetterType::Send) {
                    $_readOrNotRead['send'] += 1;
                } else {
                    $_readOrNotRead['receive'] += 1;
                }
                if ($item->pivot->is_read ?? false) {
                    $_readOrNotRead['read'] += 1;
                } else {
                    $_readOrNotRead['not_read'] += 1;
                }
            }
        }
        return view($this->basePath . __FUNCTION__, [
            'state' => $this->letterStatisticData($_readOrNotRead),
            'columns' => $this->tableHeader(),
            'data' => (ResumeLetterResource::collection($__data->take(5)))->toJson()
        ]);
    }


    private function letterStatisticData(array $readOrNotRead): ?array
    {

        $state['labels'][] = "Lettre lus";
        $state['values'][] = $readOrNotRead['read'];

        $state['labels'][] = "Lettre non lus";
        $state['values'][] = $readOrNotRead['not_read'];

        $state['labels'][] = "Lettre reçu";
        $state['values'][] = $readOrNotRead['receive'];

        $state['labels'][] = "Lettre envoyé";
        $state['values'][] = $readOrNotRead['send'];

        if ($readOrNotRead['read'] === 0 && $readOrNotRead['not_read'] === 0 && $readOrNotRead['receive'] === 0 && $readOrNotRead['send'] === 0) {
            return null;
        }

        return $state;
    }

    private static function tableHeader(): array
    {
        return [
            [
                "name" => "Expéditeur"
            ],
            [
                "name" => "Objet"
            ]
        ];
    }
}
