<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Inertia\Inertia;
use Inertia\Response; 

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        return Inertia::render('Chats/Index', [
            'messages' => Message::with('user:id,username')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
   
}
