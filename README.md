# HomeCar 🏥🩸

**HomeCar** est une application mobile développée avec React Native et Expo, servant d'intermédiaire pour les services de prélèvement sanguin à domicile. Elle connecte les patients ayant besoin d'analyses médicales avec des infirmiers qualifiés prêts à se déplacer.

## 🌟 Fonctionnalités

L'application propose deux parcours utilisateurs distincts via un système de connexion unifié :

### 🧑‍⚕️ Parcours Patient
- **Upload d'ordonnance :** Prise de photo ou sélection depuis la galerie via `expo-image-picker`.
- **Géolocalisation :** Récupération automatique de la position GPS (`expo-location`) pour faciliter la venue de l'infirmier.
- **Paiement Mobile :** Simulation d'intégration avec des portefeuilles électroniques locaux (ex: D-Money, Waafi) via le numéro de téléphone.
- **Suivi de demande :** Tableau de bord pour suivre l'état de la demande (En attente, Payée, Confirmée).
- **Notifications :** Alerte push lorsqu'un infirmier accepte la demande.

### 👩‍⚕️ Parcours Infirmier
- **Tableau de bord :** Liste des demandes payées et prêtes à être prises en charge.
- **Détails de la demande :** Visualisation de la photo de l'ordonnance et de la localisation du patient sur une carte interactive (`react-native-maps`).
- **Protection de la vie privée :** Le numéro de téléphone du patient reste masqué jusqu'à ce que l'infirmier accepte formellement la demande.
- **Notifications :** Alerte push lorsqu'une nouvelle demande de prélèvement est disponible.

---

## 🛠️ Technologies Utilisées

### Frontend (Application Mobile)
- **React Native** & **Expo**
- **React Navigation** (`@react-navigation/native-stack`) pour la gestion des écrans.
- **Expo Image Picker** pour la capture des ordonnances.
- **Expo Location** & **React Native Maps** pour la géolocalisation.
- **Expo Notifications** pour les alertes push en temps réel.
- **Context API** pour la gestion de l'état global (`AppContext.js`).

### Backend (Serveur API)
- **Node.js** & **Express** pour l'API REST.
- **SQLite3** pour la base de données légère (tables `users` et `requests`).
- **Expo Server SDK** pour l'envoi des notifications push depuis le serveur.
- **Body-Parser** (configuré avec une limite augmentée pour supporter l'upload d'images en base64).

---

## 🚀 Installation et Lancement

### 1. Prérequis
- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Un émulateur Android/iOS ou l'application **Expo Go** sur votre téléphone physique.

### 2. Démarrer le Backend

1. Ouvrez un terminal et naviguez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   node index.js
   ```
   *(Le serveur démarrera sur `http://localhost:3000`. La base de données SQLite `homecar.sqlite` sera créée automatiquement au premier lancement).*

### 3. Démarrer le Frontend (Application Expo)

1. Ouvrez un *nouveau* terminal à la racine du projet (dossier principal `HomeCar`) :
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. **Configuration de l'IP (Important pour tester sur mobile) :**
   Dans le fichier `src/context/AppContext.js`, la constante `BACKEND_HOST` détermine comment l'application communique avec l'API.
   - Par défaut, elle gère les émulateurs Android (`10.0.2.2`) et le web (`localhost`).
   - **Si vous testez sur un appareil physique avec Expo Go**, remplacez `localhost` par l'adresse IP locale de votre ordinateur (ex: `192.168.1.15`).
4. Lancez le projet :
   ```bash
   npx expo start
   ```
5. Scannez le QR code affiché dans le terminal avec l'application Expo Go (Android) ou l'application Appareil Photo (iOS).

---

## 📁 Structure du Projet

```text
HomeCar/
├── App.js                     # Point d'entrée de l'application
├── app.json                   # Configuration Expo
├── package.json
├── backend/                   # ⚙️ Serveur Express & Base de données
│   ├── index.js               # Serveur API (Routes, Notifications)
│   ├── database.js            # Configuration SQLite et Modèles
│   └── package.json
├── src/
│   ├── context/
│   │   └── AppContext.js      # État global, Appels API, Config Notifications
│   ├── navigation/
│   │   └── AppNavigator.js    # Configuration des routes (Auth, Patient, Nurse)
│   └── screens/
│       ├── auth/              # Écran de connexion unifié
│       ├── patient/           # Écrans du parcours Patient (Dashboard, Upload, Payment)
│       └── nurse/             # Écrans du parcours Infirmier (Dashboard, RequestDetails avec Carte)
```

---

## 🔒 Sécurité & Vie Privée
- Les images des ordonnances sont converties en `base64` pour être sauvegardées.
- Le flux d'acceptation garantit que ni le patient, ni l'infirmier n'ont accès aux informations de contact de l'autre avant la confirmation officielle de la prestation, protégeant ainsi les professionnels et les clients.