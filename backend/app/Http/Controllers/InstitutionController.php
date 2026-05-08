<?php
namespace App\Http\Controllers;
use App\Models\Institution;
class InstitutionController extends Controller {
    public function index() { return response()->json(Institution::all()); }
}
