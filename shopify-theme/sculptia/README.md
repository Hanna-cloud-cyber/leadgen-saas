# Sculptia — thème de page produit Shopify

Ce dossier contient une section Shopify (Liquid) qui reproduit la page
`/sculptia` du repo (et l'aperçu HTML) directement dans ton thème Shopify,
branchée sur le vrai moteur produit/variantes/panier de Shopify.

## Fichiers

```
sculptia-theme/
├── sections/sculptia-product.liquid   → la page entière (contenu + schema éditable)
├── snippets/scp-icon-*.liquid         → 3 petites icônes SVG (camion, retour, bouclier)
├── templates/product.sculptia.json    → template produit qui utilise la section ci-dessus
├── assets/sculptia-product.css        → tout le style
├── assets/sculptia-product.js         → sélection couleur/taille, panier AJAX, FAQ, compte à rebours
└── assets/sculptia-*.jpg              → tes 17 visuels (photos + infographies), déjà optimisés
```

## 1. Installer les fichiers dans ton thème

**Option A — Shopify CLI (recommandé, un seul coup) :**
```bash
shopify theme push --path=. --theme=<ID_DU_THEME>
```
depuis ce dossier (après avoir fait `shopify login` sur ta boutique).

**Option B — À la main depuis l'admin Shopify :**
Boutique en ligne → Thèmes → `...` → Modifier le code, puis pour chaque
fichier ci-dessus : "Ajouter un nouveau modèle/composant/élément" dans le
bon dossier (`sections`, `snippets`, `templates`, `assets`) et coller/glisser
le contenu correspondant.

## 2. Créer le produit

Dans Produits → Ajouter un produit — assure-toi d'abord que la devise de
ta boutique (Réglages → Général) est bien en USD.

- **Titre** : `Sculptia 3D Anti-Cellulite Legging`
- **Prix** : `$38.00` et **Prix comparé** : `$65.00` (pour afficher le
  barré -42 % automatiquement — c'est le vrai prix Shopify qui s'affiche,
  plus besoin d'y toucher dans le code)
- **Option 1** : nommée exactement `Color` (ou `Couleur`), avec ces 8 valeurs
  (respecte l'orthographe, la correspondance couleur↔photo est basée dessus) :
  `Black, Heather Grey, Beige, Navy, Dark Olive, Hot Pink, Light Pink, Light Blue`
- **Option 2** : nommée exactement `Size` (ou `Taille`), valeurs `XS, S, M, L, XL, XXL`
- Renseigne le stock de chaque variante normalement.

Puis, dans l'onglet **Modèle de thème** de la fiche produit (en bas à
droite), choisis **`product.sculptia`**.

Si tu utilises d'autres noms de couleur que ceux ci-dessus, ouvre
`assets/sculptia-product.js` et ajoute l'entrée correspondante dans l'objet
`COLOR_MAP` en haut du fichier (nom de la valeur → couleur du rond +
nom du fichier photo à utiliser). Sans entrée correspondante, le rond de
couleur s'affiche en gris neutre et la galerie ne changera pas de photo,
mais la vente fonctionne quand même.

## 3. Important — la remise "Buy 2, Get 1 FREE"

Le bouton "Add to Cart" ajoute simplement **la quantité choisie**
(1, 2 ou 3) de la variante sélectionnée — c'est tout ce qu'un thème peut
faire. Le prix réduit affiché en face de chaque formule ($76, $114...)
n'est **pas** appliqué automatiquement au panier : pour que le client
paie vraiment ce prix-là, crée une **remise automatique** dans
Marketing → Remises → Automatique, du type **"Buy X, get Y"**
(ex. achetez 2, obtenez 1 gratuit) appliquée à ce produit. Shopify se
charge alors du calcul exact au panier/checkout — c'est plus fiable que
de le faire côté thème, et c'est la méthode que Shopify recommande.

## 4. Avis clients

Les chiffres (4,7 ★ / 355 avis) et la citation mise en avant sont des
réglages du bloc, modifiables depuis Personnaliser le thème → cette
section. Pour de vrais avis dynamiques (avec photos clients, etc.),
branche une app comme Judge.me, Loox ou Yotpo — je peux l'intégrer à côté
dès que tu en as choisi une.

## 5. FAQ

Les questions/réponses sont des **blocs** de la section : ajoute, retire
ou modifie-les depuis Personnaliser le thème, pas besoin de toucher au code.

## 6. Aperçu avant publication

Une fois les fichiers poussés et le produit créé avec son modèle assigné,
utilise le bouton **Aperçu** de Shopify (thème non publié) pour vérifier
avant de rendre la page publique.
