<!DOCTYPE html>
<html>
<body>
    <h2>Nouveau rendez-vous demandé</h2>
    <p>Bonjour Conseiller,</p>
    <p>Un nouveau rendez-vous a été demandé sur la plateforme AmOrientation :</p>
    <ul>
        <li><strong>Étudiant :</strong> {{ $user->name }} {{ $user->prenom }}</li>
        <li><strong>Email :</strong> {{ $user->email }}</li>
        <li><strong>Téléphone :</strong> {{ $user->phone ?? 'Non renseigné' }}</li>
        <li><strong>Filière actuelle :</strong> {{ $user->filiere ?? 'Non précisée' }}</li>
        <li><strong>Date souhaitée :</strong> {{ \Carbon\Carbon::parse($appointment->date)->format('d/m/Y à H:i') }}</li>
        <li><strong>Notes :</strong> {{ $appointment->notes }}</li>
    </ul>
    <p>Merci,</p>
    <p>L'équipe AmOrientation</p>
</body>
</html>
