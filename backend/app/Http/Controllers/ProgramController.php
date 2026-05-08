<?php
namespace App\Http\Controllers;
use App\Models\Program;
class ProgramController extends Controller {
    public function index() { return response()->json(Program::with('institution')->get()); }
}
