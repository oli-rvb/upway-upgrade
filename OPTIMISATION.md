# Handoff — allègement du site

État au 21/09/2026. À lire avant toute nouvelle session d'optimisation.

## Le principe du site, à ne pas se tromper dessus

`index.html` compare **deux partis pris de design** : volet gauche `upway.html`
(le site Upway original), volet droit `site/ebikeshop.html` (le redesign).

Ce n'est **pas** une comparaison lourd/léger. L'allègement est invisible dans
cette comparaison, et c'est voulu : il ne doit changer aucun pixel.

Corollaire utile : la fidélité exigée de `upway.html` est une fidélité **de
design** — mise en page, typographie, couleurs, images, parcours. Elle ne porte
pas sur sa charge analytique. Les trackers ne sont pas du design et peuvent
partir. Les bundles de rendu, non.

## Ce qui a été fait

Deux commits sur `claude/portfolio-weight-optimization-f9e688`.

**Volet upgrade** (`site/`) — 197 → 122 requêtes, 12,75 → 7,31 Mo décompressés,
JS 7 315 → 2 294 Ko, erreurs console 69 → 15. `scrollHeight` identique
(7 196 px desktop, 9 543 px mobile).

- 4 bundles qui ne produisaient aucun pixel : `heroBanner.bundle.js` (1 745 Ko,
  montait dans un conteneur en `visibility:hidden` depuis que `.three-card-hero`
  le remplace), `liveSearch.bundle.js` (conteneur absent du DOM),
  `recommendedBikesWidget` + `recentlyViewedWidget` (conteneurs vides)
- trackers : conteneur GTM, ContentSquare, CMP Sirdata
- 190 Ko de markup figé des widgets, supprimé et non masqué
- `preloads.js` déchargé (il déclenchait 45 requêtes 404 vers le checkout Shopify)
- `header.js` : appel `pro.ip-api.com` neutralisé
- `callback.js` passé en `defer`

**Volet original** (`upway.html`) — 14 balises `<script>` et 4 blocs inline,
tous purement analytiques : CMP Sirdata, **deux** conteneurs GTM distincts,
ContentSquare, pixel OpenAI, LinkedIn Insight Tag, Bing UET, Awin, trekkie,
Web Pixels Manager. Aucun fichier supprimé ni modifié dans `upway_files/`.

## Le piège du cache — lire avant de mesurer quoi que ce soit

Le navigateur cache très agressivement ces fichiers. Une mesure faite sur une
page cachée est **fausse et convaincante** : elle montre des trackers qu'on
vient de retirer, ou une page cassée qui ne l'est plus.

Ça a produit deux faux diagnostics pendant la session précédente : un volet
droit prétendument vide, et une accusation infondée contre un agent qui avait
correctement fait son travail.

Servir avec `Cache-Control: no-store` **ne suffit pas** pour une entrée déjà
cachée. Un `?cb=<random>` sur l'URL ne se propage pas aux iframes de
`index.html`. La seule méthode fiable : **fenêtre de navigation privée**.

```bash
python3 -m http.server 8080 --bind 127.0.0.1   # depuis la racine du repo
open -a "Google Chrome" --args --incognito http://127.0.0.1:8080/index.html
```

`--args --incognito` est ignoré si Chrome tourne déjà. Vérifier le bandeau.

## Comment mesurer

Charger la page, attendre ~8 s, scroller jusqu'en bas pour déclencher le
lazyload, puis dans la console :

```js
const r = performance.getEntriesByType('resource');
const nav = performance.getEntriesByType('navigation')[0];
const tot = r.reduce((s, e) => s + (e.decodedBodySize || 0), 0) + nav.decodedBodySize;
({ requetes: r.length, mo: +(tot / 1048576).toFixed(2), hauteur: document.body.scrollHeight });
```

Le contrôle de non-régression le plus rapide est `document.body.scrollHeight` :
il doit rester identique avant/après, en desktop **et** en mobile (375 px).

Attention : `content-encoding: gzip` est **déjà actif** sur Hostinger/LiteSpeed.
Inutile de le recommander. Seule exception, les fichiers **sans extension**
(`cmp`, `stub`, `css2`) ne sont pas compressés, faute de `Content-Type`.

## Pièges vérifiés, à ne pas répéter

**Ne jamais se fier à un `grep` pour décider qu'un fichier est orphelin.**
`main.js`, les `Frame 116*.png` et les `RR*.progressive.jpg` ont été classés
orphelins par une analyse statique alors qu'ils sont chargés dynamiquement par
JS. Les supprimer aurait cassé la page. Décoder aussi les `%20` avant de
comparer. Seule preuve valable : la trace réseau au runtime.

**`innerHTML` ne voit pas le Declarative Shadow DOM.** Deux conteneurs ont été
diagnostiqués « vides » à tort. Tester avec `element.shadowRoot`.

**`display:none` n'empêche pas le chargement des `<img>`.** Masquer un bloc ne
l'allège pas : 490 Ko de visuels se téléchargeaient encore. Supprimer le markup.

**Alléger peut créer une course au chargement.** En retirant les gros trackers,
`callback.js` s'est mis à s'exécuter avant l'existence de `<body>` et plantait.
Toujours vérifier la console après un retrait, pas seulement le rendu.

**Certains blocs inline réinjectent les trackers depuis des CDN live.** Retirer
la balise `<script>` statique ne suffit pas ; il faut traiter l'inline aussi.

## Reste à faire, par gain décroissant

| Sujet | Gain | Risque |
|---|---|---|
| `cdn.shopify.com` sur le volet droit | ~1,6 Mo | **Élevé** — images et polices visibles, à trier une par une |
| `app.js` (Alia) sur le volet droit | 750 Ko brut / 223 Ko transféré | Moyen — expose `mountAliaCustomerApp`, jamais vérifié s'il rend un popup |
| Polices `.otf` → `woff2` | ~165 Ko | Faible — mais elles viennent du CDN Shopify |
| 14 orphelins de `upway_files/` | 0 transféré | Nul — n'affecte que la taille du dépôt |

Le volet gauche pèse encore ~18,6 Mo décompressés sur ~410 requêtes, et domine
le coût de `index.html`. C'est la conséquence assumée de préserver le « avant ».
Si le poids redevient un sujet, la question à trancher est éditoriale, pas
technique : jusqu'où le volet original doit-il rester fidèle ?

## À ne pas toucher

- `heroBanner.bundle.js` et les deux widgets **dans `upway.html`** : ils sont
  vivants et portent le design original. (Dans `site/` ils étaient morts, d'où
  leur suppression — ne pas confondre les deux volets.)
- Trustpilot, popup Mailchimp, Weglot : UX visible.
- Le stub `ShopifyAnalytics` de `upway.html` : d'autres scripts y poussent des
  données, risque de casse en cascade pour un gain nul.

## Défauts repérés, non corrigés

- `site/ebikeshop_files/header.js` affiche « Deliver to / **Enter your ZIP
  Code** » en anglais sur un site entièrement français. Préexistant.
- Le même fichier contient une clé API morte :
  `pro.ip-api.com/json?...&key=LAmdXeS120GAJAW`. Constante inutilisée depuis la
  neutralisation de l'appel, mais toujours expédiée.
- Erreurs console préexistantes dans `upway.html` (double déclaration
  `trustpilot_trustbox_settings`, conflits `CustomElementRegistry`) : présentes
  dans le snapshot d'origine, hors périmètre.
