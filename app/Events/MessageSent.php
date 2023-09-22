<?php

namespace App\Events;

use App\User;
use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $sender_id;
    public $rec_id;
    public $message;
    /**
     * Create a new event instance.
     */
    public function __construct($sender_id,$rec_id,$msg)
    {
        $this->sender_id = $sender_id;
        $this->rec_id = $rec_id;
        $this->message = $msg;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat-'.$this->sender_id),
            new PrivateChannel('chat-'.$this->rec_id)
        ];
    }
}