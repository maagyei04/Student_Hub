import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from '@/Components/Post';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import LikeButton from '@/Components/LikeButton';
import CommentButton from '@/Components/CommentButton';
import ShareButton from '@/Components/ShareButton';
import { useForm, Head } from '@inertiajs/react';


export default function Index({ auth, posts, image }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        images: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('post.store'), { onSuccess: () => reset() });
    };
 
    function Uploadimage() {
        <div>
            <input
            type='file'
            onChange={e => setData('images', e.target.value)}
            value={data.images}

            >
            
            </input>
        </div>
       
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 style={{fontWeight: 'bolder', fontSize: '20px'}}>Recent Feeds</h1>
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What do you need help with ?
                        The answer is a post away!"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                        
                    ></textarea>
                    <button
                        style={{backgroundColor:'black', borderRadius:'10px 10px', padding: '10px', margin: '10px', color: 'white'}}
                        type='button'
                        onClick={Uploadimage()}
                    >
                        Add Image
                    </button>
                    <InputError message={errors.message} className="mt-2" />
                   
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>

                    

                </form>

                <div className="mt-6">
                    {posts.map(posts =>
                    <div className="bg-white shadow-sm chirp_style">
                            <Post key={posts.id} posts={posts} />

                            <ul className='box-bottom'>
                                <li>
                                    <LikeButton />
                                </li>
                                <li>
                                    <CommentButton />
                                </li>
                                <li>
                                    <ShareButton />
                                </li>

                            </ul>
                    </div>
                    
                    )}
                </div>


            </div>
        </AuthenticatedLayout>
    );
}