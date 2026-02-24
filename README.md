# 🎬 Tom-Streaming — Backend API

Backend REST du projet fullstack **Tom-Streaming**, une plateforme de streaming développée avec [NestJS](https://nestjs.com/) et TypeScript. Ce dépôt contient uniquement la partie serveur (API).

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| [NestJS](https://nestjs.com/) | Framework Node.js (TypeScript) |
| [TypeORM](https://typeorm.io/) | ORM pour la gestion de la base de données |
| MySQL | Base de données relationnelle |
| JWT | Authentification et sécurisation des routes |
| Nodemailer | Envoi d'e-mails (SMTP) |

---

## 📦 Fonctionnalités

- **Authentification** : inscription, connexion, génération et validation de tokens JWT
- **Gestion des films** : création, lecture, mise à jour et suppression (CRUD)
- **Gestion des catégories** : organisation des films par catégorie
- **Gestion des utilisateurs** : profils utilisateurs et gestion des accès
- **Envoi d'e-mails** : notifications via SMTP (Gmail)

---

## ⚙️ Installation

### Prérequis

- Node.js >= 18
- npm
- MySQL (base de données créée au préalable)

### Cloner le projet

```bash
git clone https://github.com/Zelledeudz/backendnestjs.git
cd backendnestjs
```

### Installer les dépendances

```bash
npm install
```

---

## 🔐 Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet en s'appuyant sur le modèle ci-dessous :

```properties
# DATABASE (TypeORM)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
DB_DATABASE=backend_base

DB_SSL=false
DB_SYNCHRONIZE=true
DB_LOGGING=false

# MAIL (SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=votre_adresse_mail
MAIL_PASSWORD=votre_mot_de_passe_application
```

> ⚠️ Ne jamais committer le fichier `.env`. Il est déjà inclus dans le `.gitignore`.

---

## 🚀 Lancer le projet

```bash
# Mode développement
npm run start:dev

# Mode production
npm run start:prod
```

L'API sera disponible par défaut sur : `http://localhost:3000`

---

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests end-to-end
npm run test:e2e

# Couverture de code
npm run test:cov
```

---

## 📁 Structure du projet

```
src/
├── auth/           # Authentification JWT
├── users/          # Module utilisateurs
├── films/          # Module films
├── categories/     # Module catégories
├── mail/           # Module envoi d'e-mails
├── app.module.ts   # Module racine
└── main.ts         # Point d'entrée
```

---

## 👤 Auteur

Projet réalisé dans le cadre d'un rendu scolaire.

Dépôt GitHub : [Zelledeudz/backendnestjs](https://github.com/Zelledeudz/backendnestjs)