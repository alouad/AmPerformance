<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentCreated extends Mailable
{
    use Queueable, SerializesModels;
    public $appointment;
    public $user;
    
    public function __construct($appointment, $user)
    {
        $this->appointment = $appointment;
        $this->user = $user;
    }
    
    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Nouveau Rendez-vous - AmOrientation');
    }
    
    public function content(): Content
    {
        return new Content(view: 'emails.appointment');
    }
}
