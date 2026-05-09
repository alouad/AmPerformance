<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'niveau_etudes' => 'nullable|string',
            'filiere' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'niveau_etudes' => $request->niveau_etudes,
            'filiere' => $request->filiere,
            'phone' => $request->phone,
            'role' => 'etudiant',
        ]);

        return response()->json(['message' => 'Inscription réussie', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'nullable|string|max:255',
            'prenom' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'niveau_etudes' => 'nullable|string',
            'filiere' => 'nullable|string',
            'interets' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);

        if ($request->has('name')) $user->name = $request->name;
        if ($request->has('prenom')) $user->prenom = $request->prenom;
        if ($request->has('email')) $user->email = $request->email;
        if ($request->has('niveau_etudes')) $user->niveau_etudes = $request->niveau_etudes;
        if ($request->has('filiere')) $user->filiere = $request->filiere;
        if ($request->has('interets')) $user->interets = $request->interets;
        if ($request->has('phone')) $user->phone = $request->phone;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profil mis à jour avec succès', 'user' => $user]);
    }
}
