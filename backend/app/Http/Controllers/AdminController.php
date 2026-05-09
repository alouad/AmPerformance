<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Institution;
use App\Models\Resource;
use App\Models\User;

class AdminController extends Controller
{
    // ================= APPOINTMENTS =================
    public function getAppointments() {
        return response()->json(Appointment::with('student')->orderBy('created_at', 'desc')->get());
    }

    public function updateAppointmentStatus(Request $request, $id) {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = $request->status;
        $appointment->save();
        return response()->json(['message' => 'Statut mis à jour', 'appointment' => $appointment]);
    }

    public function deleteAppointment($id) {
        Appointment::destroy($id);
        return response()->json(['message' => 'Rendez-vous supprimé']);
    }

    // ================= USERS =================
    public function getUsers() {
        return response()->json(User::where('role', '!=', 'admin')->get());
    }

    public function deleteUser($id) {
        User::destroy($id);
        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    // ================= INSTITUTIONS =================
    public function storeInstitution(Request $request) {
        $inst = Institution::create($request->all());
        return response()->json(['message' => 'Établissement ajouté', 'institution' => $inst], 201);
    }

    public function updateInstitution(Request $request, $id) {
        $inst = Institution::findOrFail($id);
        $inst->update($request->all());
        return response()->json(['message' => 'Établissement modifié', 'institution' => $inst]);
    }

    public function deleteInstitution($id) {
        Institution::destroy($id);
        return response()->json(['message' => 'Établissement supprimé']);
    }

    // ================= RESOURCES (ARTICLES) =================
    public function storeResource(Request $request) {
        $resource = Resource::create($request->all());
        return response()->json(['message' => 'Article publié', 'resource' => $resource], 201);
    }

    public function updateResource(Request $request, $id) {
        $resource = Resource::findOrFail($id);
        $resource->update($request->all());
        return response()->json(['message' => 'Article modifié', 'resource' => $resource]);
    }

    public function deleteResource($id) {
        Resource::destroy($id);
        return response()->json(['message' => 'Article supprimé']);
    }
}
