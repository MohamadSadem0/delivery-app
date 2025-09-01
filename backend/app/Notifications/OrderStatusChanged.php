<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Domain\Order\Models\Order;

class OrderStatusChanged extends Notification
{
    use Queueable;

    public function __construct(public Order $order) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Order Status Update')
            ->greeting('Hello '.$notifiable->name)
            ->line('Your order #'.$this->order->number.' status changed to '.$this->order->status)
            ->action('View Order', url('/orders/'.$this->order->id))
            ->line('Thank you for shopping with us!');
    }
}
