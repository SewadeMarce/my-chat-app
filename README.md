# My Chat App

My Chat App est une application de messagerie moderne en temps réel, construite avec React Router, Express, TypeScript, Socket.IO et MongoDB. Elle permet de créer un compte, de se connecter, de discuter avec d’autres utilisateurs et de gérer son profil de manière fluide.

## Fonctionnalités

- Authentification utilisateur avec login, signup et logout
- Messagerie en temps réel via Socket.IO
- Liste des contacts et conversations récentes
- Statut des utilisateurs en ligne
- Mise à jour du profil avec photo
- Interface moderne et responsive
- Gestion des erreurs et notifications utilisateur

## Stack technique

- Frontend : React, React Router, TypeScript, Tailwind CSS, Zustand, Lucide React
- Backend : Express, Socket.IO, Mongoose, JWT, Cookie Parser
- Services externes : Cloudinary, Resend
- Outils : Vite, React Hot Toast

## Prérequis

Avant de lancer l’application, assurez-vous d’avoir :

- Node.js 20 ou plus
- npm
- Une instance MongoDB accessible

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd my-chat-app
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/my-chat-app
   JWT_SECRET=votre_secret_jwt
   CLIENT_URL=http://localhost:3000

   RESEND_API_KEY=votre_cle_resend
   EMAIL_FROM=votre_email@example.com
   EMAIL_FROM_NAME=My Chat App

   CLOUDINARY_CLOUD_NAME=votre_cloud_name
   CLOUDINARY_API_KEY=votre_api_key
   CLOUDINARY_API_SECRET=votre_api_secret
   ```

## Lancer l’application

### Mode développement

```bash
npm run dev
```

L’application sera disponible sur :
```text
http://localhost:3000
```

### Build de production

```bash
npm run build
```

### Démarrage en production

```bash
npm start
```

### Vérification TypeScript

```bash
npm run typecheck
```

## Structure du projet

```text
app/            # Frontend React Router
server/         # Backend Express et API
public/         # Fichiers statiques
Dockerfile      # Configuration Docker
```

## Notes

- L’authentification est gérée via des cookies sécurisés.
- Les messages et les données utilisateurs sont stockés dans MongoDB.
- Les images de profil peuvent être téléchargées et stockées via Cloudinary.

Si vous souhaitez, je peux aussi vous proposer une version encore plus complète du README avec une section “Captures d’écran”, “Architecture”, et “Contribution”.
