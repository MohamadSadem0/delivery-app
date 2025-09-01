<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Models\Order;
use App\Domain\Order\Enums\OrderStatus;
use App\Events\OrderStatusUpdated;
use RuntimeException;

class OrderStateMachine
{
    /** @var array<string, string[]> */
    protected array $transitions = [
        'pending_payment' => ['processing', 'canceled'],
        'processing'      => ['shipped', 'canceled'],
        'shipped'         => ['delivered', 'canceled'],
        'delivered'       => ['refunded'],
        'canceled'        => [],
        'refunded'        => [],
    ];

    public function canTransition(Order $order, string $to): bool
    {
        $from = (string) $order->status;
        return in_array($to, $this->transitions[$from] ?? [], true);
    }

    public function transition(Order $order, string $to, ?string $reason = null): Order
    {
        $to = strtolower($to);
        if (!isset($this->transitions[(string)$order->status])) {
            throw new RuntimeException("Unknown current status: {$order->status}");
        }
        if (!in_array($to, $this->transitions[(string)$order->status], true)) {
            throw new RuntimeException("Invalid transition from {$order->status} to {$to}");
        }

        $order->status = $to;
        if ($reason) {
            // store reason if you add a column; alternatively log to audit via observer meta.
            // $order->status_reason = $reason;
        }
        $order->save();

        event(new OrderStatusUpdated($order));

        return $order;
    }
}
