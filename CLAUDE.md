# Consignes pour Claude Code

- Réponds toujours **en français**, avec des messages courts et concrets.
- Lis `CAHIER_DES_CHARGES.md` avant toute modification : il contient l'utilisateur, la logique du programme, les écrans, le design et les prochaines étapes.
- L'appli est `index.html` (HTML + CSS + JS sans dépendance) et ses photos sont dans `img/`. Les captures de référence de la V1 sont dans `docs/captures/`.
- Priorité n° 1 : **chaque exercice affiché doit avoir sa photo**.
- Ne jamais proposer de pompes.
- Garde le design décrit (blanc, `#111111`, accent `#DEFF4A`, Anton + Inter Tight, boutons pilule) et les règles d'animation (appui `scale(0.97)` 160 ms, pas d'animation sur les gestes répétés, `prefers-reduced-motion`).
- Les données de l'utilisateur sont dans le `localStorage` (clé `carnet-muscu-v1`). Ne change pas leur format sans prévoir une migration.
- Teste sur une largeur de téléphone (390 px) avant de livrer.
- Garde l'appli épurée (voir section 4.0 du cahier des charges) : 3 onglets, zones tactiles d'au moins 44 px, une ligne d'explication au plus par carte, pas d'onglet Nutrition.
- À chaque modification de `index.html`, change `APP_VERSION` (dans `index.html`) et `VERSION` (dans `sw.js`).
