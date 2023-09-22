<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function index() {

    }

    public function store(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,gif,svg|max:2048',
        ]);

        $imageName = time().'.'.$request->image->extension();

        $request->image->move(public_path('images'), $imageName);
    }
}
