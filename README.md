# HomeCar

**HomeCar** est une application mobile de service de prélèvement sanguin à domicile. Elle sert de plateforme d'intermédiation connectant les patients ayant besoin de prises de sang avec des infirmiers qualifiés.

L'application propose un système de connexion unifié qui redirige automatiquement les utilisateurs vers des parcours distincts selon leur profil : **Patient** ou **Infirmier**.

## Fonctionnalités Principales

- **Parcours dédiés (Patients & Infirmiers)** : Flux de navigation séparés adaptés à chaque rôle.
- **Géolocalisation et Cartographie** : Capture de la position du patient lors d'une demande (via `expo-location`) et affichage sur une carte interactive pour l'infirmier (via `react-native-maps`).
- **Upload d'Ordonnance** : Les patients peuvent télécharger des photos de leurs ordonnances (via `expo-image-picker`). Les images sont converties en base64 pour être envoyées au backend.
- **Notifications Push** : Alertes en temps réel pour prévenir les infirmiers de nouvelles demandes et les patients lorsque leur demande est acceptée (utilisant `expo-notifications`, `expo-device` et `expo-server-sdk`).
- **Paiements via Mobile Money** : Intégration avec les portefeuilles électroniques locaux (par ex. D-Money/Waafi), en utilisant le numéro de téléphone de l'utilisateur comme identifiant.
- **Protection de la Vie Privée** : Les numéros de téléphone des patients et des infirmiers sont mutuellement masqués jusqu'à la confirmation de la demande.

## Stack Technique

Le projet est divisé en deux grandes parties :

### 1. Frontend (Application Mobile)
L'application client est développée en **React Native** avec le framework **Expo**. Le code source se trouve dans le répertoire `src/`.

- **Navigation** : Gérée avec React Navigation (`@react-navigation/native-stack`).
- **Gestion de l'état** : Utilisant l'API Context de React (notamment `src/context/AppContext.js`) pour la gestion de l'état global et la communication avec l'API REST.
- **Structure des dossiers** :
  - `src/context/` : Contextes React.
  - `src/navigation/` : Configuration du routage.
  - `src/screens/` : Écrans de l'application, séparés en répertoires `patient` et `nurse`.
- **Configuration Dynamique** : L'application détermine dynamiquement l'URL de l'API backend selon l'environnement d'exécution (ex. `10.0.2.2` pour l'émulateur Android, `localhost` pour les simulateurs Web/iOS).

### 2. Backend
Le serveur de l'API REST se trouve dans le répertoire `backend/`.

- **Technologie** : Node.js avec Express.
- **Base de données** : SQLite (le fichier de base de données est ignoré par Git) pour stocker les données des utilisateurs et des requêtes de prélèvement.
