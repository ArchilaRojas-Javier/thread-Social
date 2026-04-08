# 🧵 Thread Social

> Application web full stack de type réseau social (inspirée de Twitter/X)  
> Les utilisateurs peuvent publier des threads, commenter et consulter leur fil d'actualité.

![Status](https://img.shields.io/badge/Status-En%20développement-orange?style=flat)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-C21325?style=flat&logo=jest&logoColor=white)

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Stack technique](#-stack-technique)
- [Architecture](#-architecture)
- [Lancer le projet](#-lancer-le-projet)
- [Roadmap](#-roadmap)
- [Bonnes pratiques](#-bonnes-pratiques)

---

## 📌 À propos

Projet personnel développé pour illustrer les bonnes pratiques de développement full stack :

- Architecture backend structurée avec principes **SOLID**
- API REST sécurisée avec **JWT**
- Base de données relationnelle gérée via **Sequelize ORM**
- Conteneurisation complète avec **Docker & Docker Compose**
- Intégration continue avec **GitHub Actions**
- Frontend moderne avec **React 18 + Vite + TypeScript**

---

## 🛠 Stack technique

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white)


### DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

---

## 🏗 Architecture

```
thread-Social/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration DB, env
│   │   ├── models/        # Modèles Sequelize
│   │   ├── controllers/   # Logique métier
│   │   ├── routes/        # Endpoints API REST
│   │   ├── middlewares/   # Auth JWT, validation
│   │   └── index.js       # Point d'entrée
│   ├── tests/             # Tests Jest
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Vues principales
│   │   ├── context/       # État global
│   │   ├── services/      # Appels API (Axios)
│   │   └── main.tsx
│   └── package.json
├── docker/
├── .github/workflows/     # CI/CD GitHub Actions
├── docker-compose.yml
└── README.md
```

---

## 🚀 Lancer le projet

### Prérequis
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Cloner le repo
git clone https://github.com/ArchilaRojas-Javier/thread-Social.git
cd thread-Social

# 2. Copier les variables d'environnement
cp backend/.env.example backend/.env

# 3. Lancer tous les services avec Docker
docker compose up --build
```

### Services disponibles

| Service | URL |
|---------|-----|
| API Backend | `http://localhost:3000` |
| Frontend React | `http://localhost:5173` |
| Base de données | `localhost:3306` |

---

## 🗺 Roadmap

### Infrastructure & DevOps
- [x] Structure du projet (backend / frontend / docker)
- [x] Docker Compose — orchestration des services
- [x] Image Docker pour la base de données MySQL
- [x] CI/CD avec GitHub Actions
- [ ] Variables d'environnement `.env.example`

### Base de données & Modèles
- [x] Image Docker MySQL configurée
- [ ] Schéma de la base de données
- [ ] Modèles Sequelize (User, Post, Comment, Like)
- [ ] Migrations et seeders

### Backend — API REST
- [ ] Authentification (register / login / logout)
- [ ] Middleware JWT
- [ ] CRUD Posts (threads)
- [ ] CRUD Commentaires
- [ ] Système de likes
- [ ] Fil d'actualité (feed)
- [ ] Tests unitaires Jest

### Frontend — React
- [ ] Layout principal et navigation
- [ ] Pages : Login / Register
- [ ] Page Feed (fil d'actualité)
- [ ] Composant Post / Thread
- [ ] Formulaire de publication
- [ ] Profil utilisateur

### Finalisation
- [ ] Documentation API (Swagger)
- [ ] Tests d'intégration
- [ ] Déploiement en ligne

---

## ✅ Bonnes pratiques

Ce projet applique les principes suivants :

- **SOLID** — architecture backend découplée et maintenable
- **REST** — endpoints sémantiques et cohérents
- **JWT** — authentification stateless sécurisée
- **Docker** — environnement reproductible et isolé
- **CI/CD** — intégration continue à chaque push
- **Git** — commits atomiques et messages clairs

---

## 👤 Auteur

**Javier Archila Rojas** — Développeur Web & Mobile Junior  
📍 Toulouse, France  
✉️ javier.ar23@proton.me  
🔗 [github.com/ArchilaRojas-Javier](https://github.com/ArchilaRojas-Javier)

---

*Projet en cours de développement — mis à jour régulièrement* 🚧
