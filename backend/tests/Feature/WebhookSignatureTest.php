<?php

// namespace Tests\Feature;

// use Illuminate\Support\Facades\Config;
// use Tests\TestCase;

// class WebhookSignatureTest extends TestCase
// {
//     /** @test */
//     public function rejects_when_provider_missing()
//     {
//         Config::set('payments.webhooks.skip_verification', false);

//         $resp = $this->postJson('/api/v1/webhooks/payments/test', ['foo' => 'bar'], [
//             // No provider header
//         ]);

//         $resp->assertStatus(400);
//     }

//     /** @test */
//     public function accepts_when_skip_verification_enabled()
//     {
//         Config::set('payments.webhooks.skip_verification', true);

//         $resp = $this->postJson('/api/v1/webhooks/payments/stripe', ['foo' => 'bar'], [
//             'X-Payment-Provider' => 'stripe',
//         ]);

//         $resp->assertStatus(200);
//     }
// }
