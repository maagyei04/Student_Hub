import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '../../images/logo.png';
import KNUSTLogo from '../../images/knust.jpeg';
import UGLogo from '../../images/UG.png';
import CULogo from '../../images/CU.png';

import { useForm, usePage } from '@inertiajs/react';

dayjs.extend(relativeTime);

export default function Post({ posts }) {

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);
 

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: posts.message,
        institution: auth.user.institution,
        
    });
    
    const submit = (e) => {
        e.preventDefault();
        patch(route('post.update', posts.id), { onSuccess: () => setEditing(false) });
    };

     function renderSchoolImage() {

        const CU = "University Of Central";
        const KNUST = "Kwame Nkrumah University Of Science And Technology";
        const UG = "University Of Ghana";
        
        if(CU == data.institution) {
            return (
                    <div>
                        <img src={CULogo} class="h-8 w-8" alt="User's School Logo" />
                    
                    </div>
                    );
        }else if(KNUST == data.institution){
            return (
                <div>
                    <img src={KNUSTLogo} class="h-8 w-8" alt="User's School Logo" />
                </div>
                );
        }else if(UG == data.institution) {
            return (
                <div>
                    <img src={UGLogo} class="h-8 w-8" alt="User's School Logo" />
                </div>
                );
        }else{
            return null;
        }
    }


    return (
        <div className="p-6 flex space-x-2">

            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div className='flex items-center space-x-2'>
                        <img src={Avatar} alt='Avatar' className='profile'/>
                        <span className="text-gray-800">@{posts.user.username}</span>

                    </div>

                    <div>
                        <small className="ml-2 text-sm text-gray-600">{dayjs(posts.created_at).fromNow()}</small>
                        { posts.created_at !== posts.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                        
                    </div>   

                    <div>{renderSchoolImage()}</div>
                 
                
                    
                    {posts.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('post.destroy', posts.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                                <Dropdown.Link as="button" href={route('post.destroy', posts.id)} method="delete">
                                    Save
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <p className="mt-4 text-lg text-gray-900">{posts.message}</p>
                }
                </div>
        </div>
    );
}