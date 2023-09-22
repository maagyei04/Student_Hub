<?php

namespace App\Http\Controllers;

use App\Models\Post;
use File;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response; 
use Illuminate\Http\RedirectResponse;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,username')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'images' => 'required',
        ]);

        $fileModel = new File;

        if($request->file()) {
            $fileName = time().'_'.$request->file->getClientOriginalName();
            $filepath =$request->file('images');
        }
 
        $request->user()->post()->create($validated);
 
        return redirect(route('post.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $this->authorize('update', $post);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $post->update($validated);
 
        return redirect(route('post.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);
 
        $post->delete();
 
        return redirect(route('post.index'));
    }
}
