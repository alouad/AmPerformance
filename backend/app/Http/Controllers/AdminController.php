<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Institution;
use App\Models\Resource;

class AdminController extends Controller
{
    // Appointments
    public function getAppointments() {
        return response()->json(Appointment::with('student')->orderBy('created_at', 'desc')->get());
    }

    public function updateAppointmentStatus(Request $request, $id) {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = $request->status; // 'confirmé'
        $appointment->save();
        return response()->json(['message' => 'Statut mis à jour', 'appointment' => $appointment]);
    }

    // Institutions
    public function storeInstitution(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'foundation_year' => 'nullable|string',
            'website' => 'nullable|string',
            'domaines' => 'nullable|string'
        ]);
        $inst = Institution::create($data);
        return response()->json(['message' => 'Établissement ajouté', 'institution' => $inst], 201);
    }

    // Articles (Resources)
    public function storeResource(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'type' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string'
        ]);
        $resource = Resource::create($data);
        return response()->json(['message' => 'Article publié', 'resource' => $resource], 201);
    }
}
