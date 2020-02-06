<?php

namespace BristolSU\Module\Template\Http\Controllers;

class ParticipantPageController extends Controller
{

    public function index()
    {
        $this->authorize('view-page');
        
        return view('template::participant');
    }
    
}