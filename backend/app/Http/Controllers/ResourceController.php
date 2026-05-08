<?php
namespace App\Http\Controllers;
use App\Models\Resource;
class ResourceController extends Controller {
    public function index() { return response()->json(Resource::all()); }
}
