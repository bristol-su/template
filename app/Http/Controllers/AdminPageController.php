<?php

namespace BristolSU\Module\Template\Http\Controllers;


use BristolSU\Support\Permissions\Contracts\PermissionStore;

class AdminPageController extends Controller
{
    
    public function index()
    {
        $this->authorize('admin.view-page');
        
        return view('template::admin');
    }
    
}