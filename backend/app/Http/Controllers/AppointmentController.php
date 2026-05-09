<?php
namespace App\Http\Controllers;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentCreated;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller {
    public function index(Request $request) {
        return response()->json($request->user()->appointments()->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);
        
        $appointment = Appointment::create([
            'student_id' => $request->user()->id,
            'student_name' => trim($request->user()->name . ' ' . $request->user()->prenom),
            'counselor_id' => 1,
            'date' => $request->date,
            'status' => 'pending',
            'notes' => $request->notes,
        ]);

        try {
            Mail::to('nouralhouda.tech@gmail.com')->send(new AppointmentCreated($appointment, $request->user()));
        } catch (\Exception $e) {
            Log::error('Mail could not be sent: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Rendez-vous enregistré avec succès', 'appointment' => $appointment], 201);
    }

    public function cancel(Request $request, $id) {
        $appointment = Appointment::where('id', $id)->where('student_id', $request->user()->id)->firstOrFail();
        $appointment->status = 'annulé';
        $appointment->save();
        return response()->json(['message' => 'Rendez-vous annulé avec succès']);
    }
}
