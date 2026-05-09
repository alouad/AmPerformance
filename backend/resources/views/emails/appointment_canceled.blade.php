<!DOCTYPE html>
<html>
<body>
    <h2 style="color: #D32F2F;">Rendez-vous Annulé</h2>
    <p>Bonjour Conseiller,</p>
    <p>L'étudiant <strong>{{ $user->name }} {{ $user->prenom }}</strong> vient d'annuler son rendez-vous prévu pour le <strong>{{ \Carbon\Carbon::parse($appointment->date)->format('d/m/Y à H:i') }}</strong>.</p>
    <p>Voici un rappel des informations de l'étudiant :</p>
    <ul>
        <li><strong>Nom :</strong> {{ $user->name }} {{ $user->prenom }}</li>
        <li><strong>Email :</strong> {{ $user->email }}</li>
        <li><strong>Téléphone :</strong> {{ $user->phone ?? 'Non renseigné' }}</li>
    </ul>
    <p>Le créneau est désormais libre.</p>
    <br/>
    <p>L'équipe AmOrientation</p>
</body>
</html>
