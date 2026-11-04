# Carnet Muscu

Application personnelle de suivi de musculation : séances tout le corps avec une photo pour chaque exercice, séries, repos, cycles de 6 semaines, shakers et progrès.

## Ouvrir l'appli sur le téléphone

Adresse : **https://apala-69.github.io/carnet-muscu/**

1. Ouvre l'adresse sur le téléphone.
2. iPhone (Safari) : Partager → « Sur l'écran d'accueil ».
   Android (Chrome) : onglet Progrès → « Installer l'appli », ou menu ⋮ → « Installer l'application ».
3. L'appli s'ouvre en plein écran et marche sans réseau à la salle.

## Mettre en ligne (GitHub Pages, gratuit)

À faire une seule fois, sur github.com :

1. Fusionner la branche de travail dans `main`.
2. Dépôt → **Settings** → **Pages**.
3. *Source* : **Deploy from a branch**, branche **main**, dossier **/ (root)** → **Save**.
4. Après 1 à 2 minutes, l'appli est en ligne à l'adresse ci-dessus.

Chaque nouvelle fusion dans `main` met l'appli à jour. Après une modification de `index.html` ou des photos, change `VERSION` dans `sw.js` pour que les téléphones récupèrent la nouvelle version.

## Fichiers

- `index.html` : toute l'appli (HTML + CSS + JS, sans dépendance). Pour tester en local : `python3 -m http.server` puis http://localhost:8000.
- `img/` : 2 photos par exercice. `icons/` : icônes de l'appli. `manifest.json` et `sw.js` : installation et mode hors ligne.
- Tout le projet est décrit dans [`CAHIER_DES_CHARGES.md`](CAHIER_DES_CHARGES.md).
- Captures de la version 1 : [`docs/captures/`](docs/captures/).
- Sources (coachs, études, photos) : [`docs/SOURCES.md`](docs/SOURCES.md).
