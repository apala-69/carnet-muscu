# Fonte — cahier des charges

Nom de l'appli : **Fonte** (anciennement « Carnet Muscu »). Logo : un disque de fonte noir vu de face, sur fond blanc (`icons/icon.svg`).

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

- 2 fois par semaine fait mieux que 1 (Schoenfeld 2016) ; à volume égal, la fréquence change peu (Schoenfeld 2019) : elle sert à répartir les séries.
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

### 3.4 Programme du coach (version fondée sur les études, novembre 2026)

Chaque règle et sa source sont affichées dans l'appli (Programmes → « Sur quoi je me base ») et listées dans `docs/SOURCES.md`. Les pratiques de coach non prouvées sont signalées comme telles.

| Mouvement | Séance 1 | Séance 2 | Séance 3 |
|---|---|---|---|
| Jambes – pousser | Presse à cuisses 3 × 8-12 | Hack squat 3 × 8-12 | Fente statique haltères 3 × 8-12 (+ leg extension 2 × 12-15) |
| Jambes – hanche | Leg curl assis 3 × 10-12 | SDT jambes tendues haltères 3 × 8-12 | Leg curl assis 3 × 10-12 |
| Pousser | Chest press 3 × 8-12 | Développé incliné haltères 3 × 8-12 | Développé couché haltères 3 × 8-12 |
| Tirer | Tirage vertical 3 × 8-12 | Rowing haltère un bras 3 × 8-12 | Rowing assis 3 × 8-12 |
| Épaules | Élévations latérales haltères 3 × 12-15 | Développé épaules machine 3 × 8-12 | Élévations latérales poulie 3 × 12-15 |
| Bras / abdos | Extension triceps au-dessus de la tête 2 × 10-12 + curl pupitre 2 × 10-12 | Curl marteau corde 2 × 10-12 + crunch machine 2 × 12-15 | Curl haltères 2 × 10-12 + triceps corde 2 × 10-12 |

- Repos : 2 min 30 sur les gros exercices (2 min pour les tirages), 90 s sur l'isolation (Schoenfeld 2016, Singer 2024).
- Mélange machines / poids libres dès le départ (Haugen 2023 : même hypertrophie). Leg curl **assis** (Maeo 2021), triceps **au-dessus de la tête** (Maeo 2022).
- Volume obtenu : 3 séances → 9 à 11 séries par semaine par gros muscle, 4 à 6 pour les bras ; 2 séances (S1 + S2) → 6. Séances de 56 à 60 min.
- **1 fois par semaine** : presse 4 × 8-12, chest press 4 × 8-12, tirage vertical 4 × 8-12, leg curl assis 3 × 10-12, développé épaules haltères 3 × 8-12, triceps au-dessus de la tête 2 × 10-12 (Nuzzo 2024 : une petite dose fait progresser, moins que 2 séances).
- Après 6 semaines, passage progressif aux poids libres pour les exercices restés sur machine (voir 4.2).

### 3.4 bis Séances personnalisables

- **Au premier lancement**, 3 choix : *Programme du coach* (section 3.4), *Je compose mes séances* (séances vides) ou *Demander à Claude*.
- **Une séance = un jour à la salle.** Les mêmes séances reviennent chaque semaine : toute modification s'applique dès maintenant et aux semaines suivantes.
- Dans chaque séance : ajouter, **remplacer**, retirer, monter / descendre un exercice, régler séries, reps et repos.
- Modifier le programme du coach le copie dans « Mes séances » (`settings.plan`, champ ajouté sans migration : absent = programme du coach). Bouton « Revenir au coach ».
- **Demander à Claude** : l'appli copie une demande (rôle de coach prise de masse, profil, liste des clés d'exercices, format JSON imposé). L'utilisateur colle la réponse : les exercices inconnus (ex. pompes) sont ignorés.
- Ajout rapide depuis la fiche d'un exercice : « + Séance N ».

### 3.5 Règles d'entraînement

| Règle | Valeur |
|---|---|
| Volume | 10 à 12 séries par muscle et par semaine au départ, puis on monte |
| Intensité | Arrêter chaque série à 1-2 reps de l'échec (« reps en réserve ») |
| Repos | 2 à 3 min sur les gros exercices, 60 à 90 s sur l'isolation (repos défini par exercice) |
| Selon l'objectif | Prise de masse : gros exercices 3 × 8-12 (2 min 30), isolation 3 × 10-15 (1 min 15). Force : 4 × 3-6 (3 min 30). Endurance : 3 × 12-15 / 2 × 15-20 (45 s à 1 min). Gainage en secondes. Affiché dans chaque fiche. |
| Progression | Double progression : fourchette de reps (ex. 8-12) ; quand le haut est atteint sur toutes les séries, +2,5 kg |
| Cycle | 6 semaines : semaines 1-5 en progression (réserve de 3 → 1), semaine 6 allégée (moitié des séries) |
| Échauffement | Sur le 1er exercice : 50 % × 10 puis 75 % × 5, calculés à partir de la charge de travail |
| Stagnation | Charge identique sur 3 séances → alerte (ajouter une série ou changer d'exercice) |
| Poids du corps | Pesée le lundi au réveil ; cible prise de masse : +0,25 à +0,5 % du poids par semaine |
| Protéines | Repère : environ 1,6 g par kg de poids et par jour (Morton et al., 2018) |

## 4. Écrans et fonctionnalités

Navigation : **barre d'onglets en bas, 5 onglets** : Aujourd'hui, Programmes, Exercices, Nutrition, Progrès.
Elle est **masquée pendant la séance** (Séance, Repos, Fin) pour éviter les appuis par erreur.

1. **Aujourd'hui** : choix 1/2/3 fois cette semaine, cartes Séance 1/2/3 avec les pastilles de zones et l'état, bouton « Commencer la séance N », liste des exercices de la séance choisie (vignette photo, zone, séries × reps), rappel du coach (alerte la plus importante), carte « Nutrition du jour ».
2. **Séance en cours, en tunnel** (plein écran, une étape à la fois) : écran d'échauffement (5 min de cardio léger, mobilité, séries d'approche à 50 % × 10 et 75 % × 5), puis une série par écran (démo photo, « Série x sur n », dernière fois, charge et reps avec boutons − / +, réserve 0/1/2/3+, disques, conseil de progression) et le bouton **« Valider · suivant »**. **Exercices enchaînés (superset)** : réglés dans l'éditeur (« Enchaîner avec le suivant », « Tout enchaîner par 2 ») ; la séance fait A1 → A2 → repos → A1 série 2 → A2 série 2 → repos… Le repos réglé sur le 2e exercice s'applique au duo. Autres actions : « + Série », « Passer cette série », précédent, liste des exercices, « machine prise ». Une montre connectée n'est pas accessible depuis une appli web : bip et vibration du téléphone à la fin du repos.
3. **Repos** (plein écran) : grand compte à rebours, −15 s / +15 s / Passer, prochain exercice avec photo, conseil, bip + vibration à la fin, écran maintenu allumé (Wake Lock).
4. **Fin de séance** : durée, séries, volume, nouveaux records (avec photos), ressenti Facile / Bien / Dur, « Une douleur ? » (Aucune, Dos, Épaules, Genoux, Coudes), note libre, enregistrer.
5. **Fiche exercice** : grande démo, pastilles de muscles, étapes numérotées, erreurs à éviter, historique des charges, alternatives avec photos, favori.
6. **Exercices** : recherche, filtres par zone et favoris, grille de photos.
7. **Programmes** : cycle de 6 semaines (semaine en cours, semaine allégée), choix 1/2/3 fois, détail des séances de la semaine, règles du coach, « recommencer un cycle ».
8. **Nutrition** (remplace Shakers, jugé inutile) : 2 objectifs du jour calculés sur le dernier poids (protéines 1,6 g/kg ; calories = entretien estimé à 33 kcal/kg + 300), et ajustement chaque semaine selon la balance (< +0,25 %/sem. → +150 kcal ; > +0,5 %/sem. → −150 kcal ; bouton pour appliquer). Les anciens shakers restent stockés et exportés.
9. **Progrès** : **le coach** (voir 4.1) ; séances, semaine en cours, temps total ; volume de la semaine par muscle par rapport à la cible ; courbe de charge par exercice ; alertes de stagnation ; poids du corps et tendance ; historique des séances (avec suppression).

### 4.1 Le coach

Règles simples calculées dans le téléphone (aucune donnée envoyée) :
- **Douleur** signalée en fin de séance (valable 14 jours, « Aucune » l'efface) : les exercices qui sollicitent la zone sont proposés 10 % plus légers, avec une alerte et un bouton « Remplacer » dans la séance ; les remplacements qui ne sollicitent pas la zone passent en premier. Rappel : douleur qui dure → médecin ou kiné.
- **Charge qui monte vite** : plus de +10 % (et plus de 2,5 kg) d'une séance à l'autre.
- **Stagnation** : même charge sur 3 séances.
- **Trop près de l'échec** : réserve à 0 sur la moitié des séries ou plus.
- **Fatigue** : 2 séances « Dur » de suite.
- **Reprise** : 8 jours ou plus sans séance → charges proposées −10 %.
- **Ça progresse** : gains de charge sur 4 semaines.
- **Bilan pour Claude** : bouton qui copie un résumé des 4 dernières semaines (séances, charges, ressenti, douleurs, poids, objectifs, alertes) à coller dans l'appli Claude, plus un lien « Ouvrir Claude ». Une IA directement dans l'appli demanderait une clé API payante : écartée pour l'instant.

### 4.2 Ajouts (novembre 2026)

- **Passage aux poids libres** : 6 semaines après la 1re séance, une carte sur Aujourd'hui propose un remplacement à la fois (ordre de priorité : chest press → développé couché haltères, développé incliné machine → barre, hack squat → squat, épaules machine → haltères, rowing machine → haltère…). La presse à cuisses reste. « Plus tard » = reproposé dans 14 jours.
- **Carte des muscles** (Progrès) : silhouette avant / arrière dessinée pour l'appli, colorée selon les séries faites depuis lundi (0, 1-4, 5-9, 10+).
- **Mensurations** (Progrès) : bras, poitrine, taille, cuisse (dans `settings.measures`), écart depuis la 1re mesure, rappel du coach après 30 jours, alerte si la taille monte plus vite que les bras. **Photos** dans IndexedDB (`fonte-photos`), réduites à 900 px, comparaison avant / maintenant ; incluses dans l'export.
- **Bilan de la semaine passée** : du lundi au mercredi sur Aujourd'hui (séances, records, séries, charge totale, poids, un conseil), fermable.
- **Calcul des disques** pendant la séance pour les exercices à la barre (barre 20 kg, barre EZ 10 kg ; disques 25 à 1,25 kg).

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
- 36 exercices dans la V1, **139** depuis l'ajout de la bibliothèque (filtres par muscle et par matériel). La correspondance clé → dossier d'origine est dans `docs/SOURCES.md`.
- Piste pour aller plus loin : **exercises-dataset** (1 324 exercices avec GIF animés, licence à vérifier).

## 7. Prochaines étapes pour Claude Code

1. **Appliquer le programme cible** (section 3.4) avec une vraie Séance 3, construite par type de mouvement.
2. **En faire une PWA installable** sur l'écran d'accueil du téléphone : `manifest.json`, icônes, service worker pour fonctionner hors ligne à la salle.
3. **Héberger gratuitement** (GitHub Pages) pour l'ouvrir depuis le téléphone.
4. **Export / import des données** (fichier JSON), puisque le stockage reste dans le navigateur.
5. ~~Rappel shaker~~ : abandonné (onglet Shakers remplacé par Nutrition).
6. ~~Passage aux poids libres~~ : fait (voir 4.2).
7. Ajouter des exercices et traduire les consignes en français au fur et à mesure.

## 8. Ce qu'il ne faut pas faire

- Pas de pompes dans les programmes.
- Pas de texte en anglais dans l'interface.
- Pas d'exercice sans image.
- Pas de réseau social, de compte ou de publicité : c'est une appli personnelle.
