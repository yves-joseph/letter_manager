<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

class DashboardController extends Controller
{
    protected string $basePath = 'admin.page.dashboard.';

    public function index(): Factory|View|Application
    {
        return view($this->basePath . __FUNCTION__);
    }

}
