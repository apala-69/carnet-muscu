# Carnet Muscu — cahier des charges

Application personnelle de suivi de musculation, sur téléphone, en français.
Ce document reprend tout ce qui a été décidé avant le passage sur Claude Code (benchmark, maquettes, programme, première version).

## 1. L'utilisateur

- Débutant en musculation depuis octobre 2026, en salle (machines, poulies, haltères).
- Objectif : **prise de masse**.
- Séances de **45 min à 1 h**.
- Va à la salle **1, 2 ou 3 fois par semaine** selon les semaines.
- **Pas de pompes.**
- Son gros problème : il voit le nom d'un exercice mais ne sait pas ce que c'est. **Chaque exercice doit avoir une image, partout dans l'appli.** C'est la priorité n° 1.
- Il veut voir tout de suite, sans phrase, **quelles parties du corps** chaque séance travaille.
- L'appli et toutes les réponses sont **en français uniquement**.

## 2. Ce qui existe déjà (version 1)

`index.html` est une première version qui fonctionne : un seul fichier HTML + CSS + JavaScript, sans dépendance, avec les photos dans `img/`.
Les captures de chaque écran sont dans `docs/captures/`.

Les données sont enregistrées dans le navigateur (`localStorage`, clé `carnet-muscu-v1`).
Dans sa version publiée sur claude.ai, l'appli utilisait le stockage partagé de l'artifact (`window.claude.use('db')`). Hors de claude.ai, le code bascule automatiquement sur `localStorage`.

## 3. Logique du programme (à respecter)

### 3.1 Principe : la semaine

1. En début de semaine, l'appli demande : **« Cette semaine, j'y vais combien de fois ? » → 1, 2 ou 3 fois.**
2. Elle affiche alors les séances de la semaine : **Séance 1, Séance 2, Séance 3**. Ne plus utiliser les mots « A », « B » ou « Essentiel » dans l'interface.
3. Chaque séance montre **les zones travaillées sous forme de pastilles** (Cuisses, Ischios, Pecs, Dos, Épaules, Biceps, Triceps, Abdos), le nombre d'exercices et la durée estimée.
4. États d'une séance : **Prochaine**, **Faite**, **À faire**.

### 3.2 Pourquoi « tout le corps » à chaque séance

C'est le consensus des références pour 1 à 3 séances par semaine. Voir `docs/SOURCES.md`.

- Chaque muscle doit être travaillé au moins 2 fois par semaine (méta-analyse de Schoenfeld, 2016).
- Mike Israetel (RP) conseille au débutant tout le corps, 4 à 6 exercices de base par séance et environ 8 reps.
- Greg Nuckols (Stronger by Science) fait 3 séances tout le corps, avec **des exercices différents d'une séance à l'autre pour les mêmes muscles**.
- On change les exercices d'une séance à l'autre, pas les muscles.

### 3.3 Construction d'une séance (par type de mouvement)

Chaque séance contient :

1. **Jambes – pousser** (presse, hack squat…)
2. **Jambes – charnière de hanche** (leg curl, soulevé de terre jambes tendues…)
3. **Pousser** avec le haut du corps (développé)
4. **Tirer** avec le haut du corps (tirage, rowing)
5. **Épaules** (isolation)
6. **Bras / abdos** (isolation)

Les gros exercices viennent en premier, l'isolation à la fin.

### 3.4 Programme cible (à appliquer — la V1 utilise encore l'ancien)

Défaut corrigé par rapport à la V1 : la Séance 1 n'avait que l'avant des cuisses et la Séance 2 que l'arrière. Maintenant, chaque séance travaille les deux.

**2 fois par semaine (environ 55 min)**

| Mouvement | Séance 1 | Séance 2 |
|---|---|---|
| Jambes – pousser | Presse à cuisses 3 × 8-12 | Hack squat 3 × 8-12 |
| Jambes – hanche | Leg curl assis 2 × 10-12 | Soulevé de terre jambes tendues 3 × 8-10 |
| Pousser | Chest press 3 × 8-10 | Développé incliné haltères 3 × 8-12 |
| Tirer | Tirage vertical 3 × 8-12 | Rowing assis 3 × 8-12 |
| Épaules | Élévations latérales 2 × 12-15 | Développé épaules machine 2 × 10-12 |
| Bras / abdos | Curl pupitre 2 × 10-12 + Triceps corde 2 × 10-12 | Curl marteau corde 2 × 10-12 + Crunch machine 2 × 12-15 |

**3 fois par semaine :** Séance 1, Séance 2 et une **Séance 3** avec d'autres variantes. Exemple : Leg extension + Leg curl allongé, Pec deck ou Développé incliné machine, Rowing machine ou Tirage prise serrée, Élévations latérales poulie, Curl haltères + Extension triceps au-dessus de la tête. Garder la même structure en 6 mouvements.

**1 fois par semaine :** une séance d'environ 60 min. Presse 4 × 8-12, Chest press 4 × 8-10, Tirage vertical 4 × 8-12, Développé épaules 3 × 10-12, Leg curl 3 × 10-12, Triceps corde 2 × 10-12.

**Machines d'abord :** pendant les 6 premières semaines, privilégier les machines pour apprendre. Ensuite, proposer de remplacer progressivement par des poids libres. Israetel et Nuckols construisent sur les poids libres.

### 3.5 Règles d'entraînement

| Règle | Valeur |
|---|---|
| Volume | 10 à 12 séries par muscle et par semaine au départ, puis on monte |
| Intensité | Arrêter chaque série à 1-2 reps de l'échec (« reps en réserve ») |
| Repos | 2 à 3 min sur les gros exercices, 60 à 90 s sur l'isolation (repos défini par exercice) |
| Progression | Double progression : fourchette de reps (ex. 8-12) ; quand le haut est atteint sur toutes les séries, +2,5 kg |
| Cycle | 6 semaines : semaines 1-5 en progression (réserve de 3 → 1), semaine 6 allégée (moitié des séries) |
| Échauffement | Sur le 1er exercice : 50 % × 10 puis 75 % × 5, calculés à partir de la charge de travail |
| Stagnation | Charge identique sur 3 séances → alerte (ajouter une série ou changer d'exercice) |
| Poids du corps | Pesée le lundi au réveil ; cible prise de masse : +0,25 à +0,5 % du poids par semaine |
| Protéines | Repère : environ 1,6 g par kg de poids et par jour (Morton et al., 2018) |

## 4. Écrans et fonctionnalités

Navigation : **barre d'onglets en bas, 5 onglets** : Aujourd'hui, Programmes, Exercices, Shakers, Progrès.
Elle est **masquée pendant la séance** (Séance, Repos, Fin) pour éviter les appuis par erreur.

1. **Aujourd'hui** : choix 1/2/3 fois cette semaine, cartes Séance 1/2/3 avec les pastilles de zones et l'état, bouton « Commencer la séance N », liste des exercices de la séance choisie (vignette photo, zone, séries × reps), carte Shaker avec ajout en un geste.
2. **Séance en cours** (plein écran) : chrono, « Exercice x sur n », barre de progression, **démo photo** (alternance départ / arrivée, vues Animation / Départ / Arrivée), nom, zone, matériel, 3 points clés, échauffement calculé, tableau des séries (dernière fois, kg, reps, réserve 0/1/2/3+, case à cocher), « + Série », conseil de progression, bouton « machine prise » (remplacement par un exercice du même muscle, avec photo), précédent / suivant / terminer.
3. **Repos** (plein écran) : grand compte à rebours, −15 s / +15 s / Passer, prochain exercice avec photo, conseil, bip + vibration à la fin, écran maintenu allumé (Wake Lock).
4. **Fin de séance** : durée, séries, volume, nouveaux records (avec photos), ressenti Facile / Bien / Dur, ajout de shaker, note libre, enregistrer.
5. **Fiche exercice** : grande démo, pastilles de muscles, étapes numérotées, erreurs à éviter, historique des charges, alternatives avec photos, favori.
6. **Exercices** : recherche, filtres par zone et favoris, grille de photos.
7. **Programmes** : cycle de 6 semaines (semaine en cours, semaine allégée), choix 1/2/3 fois, détail des séances de la semaine, règles du coach, « recommencer un cycle ».
8. **Shakers** : type (Whey, Caséine, Gainer), dose (25/30/40/50 g), liste du jour avec suppression, calendrier du mois (shakers et séances), jours d'affilée.
9. **Progrès** : séances, semaine en cours, temps total ; volume de la semaine par muscle par rapport à la cible ; courbe de charge par exercice ; alertes de stagnation ; poids du corps et tendance ; historique des séances (avec suppression).

## 5. Design

Direction claire, inspirée des codes sportswear (Nike, Adidas) sans copier de marque ni de logo.

- Fond blanc `#FFFFFF`, texte quasi noir `#111111`, gris `#F5F5F5` derrière les photos, filets de 1 px `#E5E5E5`, pas d'ombres.
- Un seul accent : vert acide `#DEFF4A`, réservé à la progression et aux records. Rouge `#B3000A` sur fond `#FFF1F0` pour les erreurs à éviter et la stagnation.
- Typo : **Anton** pour les titres en capitales condensées (proche de la Futura de Nike) et **Inter Tight** pour le texte (proche d'Helvetica Now), via Google Fonts.
- Boutons en pilule, noir pour l'action principale. Boutons ronds pour les icônes. Zones tactiles d'au moins 44 px.
- Méthode Emil Kowalski pour les animations :
  - appui = `scale(0.97)` en 160 ms, courbe `cubic-bezier(0.23,1,0.32,1)` ;
  - aucune animation sur les gestes répétés (cocher une série, changer d'onglet) : uniquement un changement de couleur ;
  - respecter `prefers-reduced-motion`.

## 6. Images des exercices

- Source : **free-exercise-db** (domaine public) — https://github.com/yuhonas/free-exercise-db
- 2 photos par exercice (`img/<clé>-0.jpg` = départ, `img/<clé>-1.jpg` = arrivée), redimensionnées à 600 px de large.
- 36 exercices dans la V1. La correspondance clé → dossier d'origine est dans `docs/SOURCES.md`.
- Piste pour aller plus loin : **exercises-dataset** (1 324 exercices avec GIF animés, licence à vérifier).

## 7. Prochaines étapes pour Claude Code

1. **Appliquer le programme cible** (section 3.4) avec une vraie Séance 3, construite par type de mouvement.
2. **En faire une PWA installable** sur l'écran d'accueil du téléphone : `manifest.json`, icônes, service worker pour fonctionner hors ligne à la salle.
3. **Héberger gratuitement** (GitHub Pages) pour l'ouvrir depuis le téléphone.
4. **Export / import des données** (fichier JSON), puisque le stockage reste dans le navigateur.
5. **Rappel shaker** après la séance (notification de la PWA, si le téléphone le permet).
6. **Passage aux poids libres** après 6 semaines : proposer des remplacements (squat, développé couché, rowing haltère…), ce qui demandera d'ajouter leurs photos.
7. Ajouter des exercices et traduire les consignes en français au fur et à mesure.

## 8. Ce qu'il ne faut pas faire

- Pas de pompes dans les programmes.
- Pas de texte en anglais dans l'interface.
- Pas d'exercice sans image.
- Pas de réseau social, de compte ou de publicité : c'est une appli personnelle.
