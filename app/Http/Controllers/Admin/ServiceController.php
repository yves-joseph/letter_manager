<?php
/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Enumerations\Notice;
use App\Http\Requests\Service\ServiceStoreRequest;
use App\Http\Requests\Service\ServiceUpdateRequest;
use App\Http\Resources\Service\ServiceResource;
use App\Http\Resources\Service\ServiceTrashResource;
use App\Models\Service;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/**
 * @var
 */
class ServiceController extends Controller
{

    protected string $basePath = 'admin.page.services.';

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_SERVICES_MENU');
        return view($this->basePath . __FUNCTION__, [
            'data' => (ServiceResource::collection(Service::query()->latest()->get()))->toJson(),
            'header' => json_encode(self::tableHeader()),
            'type' => __FUNCTION__
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function trash(): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_SERVICES_TRASH');
        return view($this->basePath . 'index', [
            'data' => (ServiceTrashResource::collection(Service::onlyTrashed()->get()))->toJson(),
            'header' => json_encode(self::tableHeader()),
            'type' => __FUNCTION__
        ]);
    }

    /**
     * @param int $service
     * @return RedirectResponse
     */
    public function restore(int $service): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_SERVICES_TRASH');
        if (Service::withTrashed()->find($service)->restore()) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  Application|Factory|View
     */
    public function create(): View|Factory|Application
    {
        Gate::authorize('granted', 'ROLE_SERVICES_CREATE');
        return view($this->basePath . __FUNCTION__);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param ServiceStoreRequest $request
     * @return RedirectResponse
     */
    public function store(ServiceStoreRequest $request): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_SERVICES_CREATE');
        if (Service::query()->create($request->validated())) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        return $this->redirectStore($request, 'services');
    }

    /**
     * Display the specified resource.
     *
     * @param Service $service
     * @return Application|Factory|View
     */
    public function show(Service $service): View|Factory|Application
    {
        Gate::authorize('granted', 'ROLE_SERVICES_SHOW');
        return view($this->basePath . __FUNCTION__, [
            'service' => $service
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Service $service
     * @return Application|Factory|View
     */
    public function edit(Service $service): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_SERVICES_EDIT');
        return view($this->basePath . __FUNCTION__, [
            'service' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ServiceUpdateRequest $request
     * @param Service $service
     * @return RedirectResponse
     */
    public function update(ServiceUpdateRequest $request, Service $service): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_SERVICES_EDIT');

        if ($service->update($request->validated())) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param int $service
     * @return RedirectResponse
     */
    public function destroy(Request $request, int $service): RedirectResponse
    {

        Gate::authorize('granted', 'ROLE_SERVICES_DESTROY');

        if ($isTrash = $request->query->get('type', 'trash') === 'trash') $action = 'delete'; else $action = 'forceDelete';

        $__user = User::withTrashed()->findOrFail($service);

        if ($__user->$action()) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        if (!$isTrash) return redirect()->back();

        return $this->redirectDestroy('services');
    }


    private static function tableHeader(): array
    {
        return [
            [
                "name" => "service"
            ]
        ];
    }
}
