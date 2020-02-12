<?php

namespace BristolSU\Module\Template\Http\Controllers;

class AdminPageController extends Controller
{
    
    public function index()
    {
        $this->authorize('admin.view-page');
        
        return view('template::admin');
    }
    
}