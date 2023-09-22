require('./bootstrap');
import Chatpanel from '@/Components/ChatPanel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import ReactDOM from 'react-dom';
import { Head } from '@inertiajs/react';
ReactDOM.render(document.getElementById('chat_panel_container'));


export default function Index({auth}) {
    return (
       <AuthenticatedLayout user={auth.user}>
        <Head title='Chats' />
        
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <div id="chat_panel_container"></div>
                </div>
                </div>
                <div class="row">
                    <div class="col-md">
                        <div id="chat_submit_container"></div>
                    </div>
                </div>
            </div>  

       </AuthenticatedLayout>
    );
}
