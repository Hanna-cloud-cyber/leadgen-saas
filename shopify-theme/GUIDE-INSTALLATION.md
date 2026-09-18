# Installer la page Sculptia dans ton thème Shopify (Dawn)

Tu vas créer 3 fichiers de code + uploader 12 images dans l'éditeur de thème Shopify. Suis les étapes dans l'ordre.

## Étape 1 — Ouvrir l'éditeur de code

1. Dans Shopify, va dans **Boutique en ligne** → **Thèmes**
2. Sur ton thème actuel (Dawn), clique sur les **trois points (⋮)** → **Modifier le code**

## Étape 2 — Uploader les 12 images

Dans le panneau de gauche, trouve le dossier **Assets** (Ressources).

1. Clique sur **Ajouter un composant** (ou l'icône ⬆️ selon l'interface) en haut du panneau **Assets**
2. Choisis **Charger un fichier** (Upload file)
3. Sélectionne les 12 images que je t'ai envoyées (elles ont déjà les bons noms : `sculptia-black.png`, `sculptia-navy.png`, etc.) — tu peux les sélectionner toutes en même temps
4. Répète jusqu'à ce que les 12 soient dans le dossier Assets

**Important : ne renomme pas les fichiers**, le code cherche ces noms exacts.

## Étape 3 — Créer le fichier JavaScript

1. Toujours dans **Assets**, clique sur **Ajouter un composant** → **Créer un fichier vierge**
2. Nomme-le exactement : `sculptia.js`
3. Ouvre le fichier `sculptia.js` que je t'ai envoyé, copie tout son contenu, colle-le dans l'éditeur Shopify
4. Sauvegarde (Enregistrer / Save, ou Ctrl+S)

## Étape 4 — Créer la section produit

1. Dans le panneau de gauche, trouve le dossier **Sections**
2. Clique sur **Ajouter un composant** → **Créer une nouvelle section**
3. Nomme-la exactement : `sculptia-product` (sans `.liquid`, Shopify l'ajoute automatiquement)
4. Ouvre le fichier `sculptia-product.liquid` que je t'ai envoyé, copie tout son contenu, colle-le dans l'éditeur Shopify
5. Sauvegarde

## Étape 5 — Créer le gabarit (template) de page produit

1. Dans le panneau de gauche, trouve le dossier **Templates**
2. Clique sur **Ajouter un composant** → **Créer un modèle**
3. Choisis le type **product**, et nomme-le : `sculptia`
   (Shopify va créer `templates/product.sculptia.json`)
4. Ouvre le fichier `product.sculptia.json` que je t'ai envoyé, copie tout son contenu, colle-le dans l'éditeur Shopify (remplace ce que Shopify a mis par défaut)
5. Sauvegarde

## Étape 6 — Assigner ce gabarit à ton produit Sculptia

1. Va dans **Produits** → ouvre **Sculptia 3D Anti-Cellulite Legging**
2. Dans le panneau de droite, section **Modèle de la page** (Theme template)
3. Change-le pour sélectionner **sculptia**
4. Sauvegarde le produit

## Étape 7 — Vérifier

1. Clique sur **Aperçu** (Preview) de ton thème, ou visite directement `getsculptia.com` / `npiyyf-s2.myshopify.com` en cherchant la page du produit Sculptia
2. Vérifie que :
   - Les photos changent bien quand tu cliques sur une couleur
   - Les tailles se sélectionnent
   - Le bouton "Ajouter au panier" fonctionne et t'amène sur `/cart`

Envoie-moi une capture d'écran si quelque chose ne s'affiche pas correctement — je corrigerai le code.

## Note

Le prix affiché par bundle (Buy 2 Get 1 Free, etc.) est calculé automatiquement à partir du prix réel de la variante Shopify. Le vrai rabais au moment du paiement reste géré par les remises automatiques "Buy X Get Y" que tu dois créer dans **Marketing → Réductions** (voir `README-SHOPIFY.md` à la racine du projet).
