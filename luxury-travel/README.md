# Solstice Voyages

Site vitrine d'une maison de voyages de luxe : destinations d'exception dans le monde entier, expériences privatisées, tour du monde en jet privé et formulaire de demande de devis.

Site 100 % statique (HTML, CSS, JavaScript), sans dépendance ni étape de build.

## Lancer en local

```bash
cd luxury-travel
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

Ouvrir `index.html` directement dans le navigateur fonctionne aussi.

## Structure

| Fichier      | Rôle                                                                 |
|--------------|----------------------------------------------------------------------|
| `index.html` | Structure de la page (hero, destinations, expériences, devis…)       |
| `styles.css` | Charte graphique, thèmes clair et sombre, responsive                 |
| `data.js`    | Tout le contenu : destinations, expériences, voyage signature, avis |
| `app.js`     | Rendu, illustrations vectorielles, filtres, formulaire de devis      |

## Modifier le contenu

Tout se passe dans `data.js` : ajoutez une destination en copiant un objet existant.
Le champ `scene` choisit l'illustration (`ocean`, `mountain`, `savanna`, `ice`, `desert`, `coast`, `city`)
et `sky` ses deux couleurs de ciel. Les filtres par région se mettent à jour automatiquement.

## Formulaire de devis

Le formulaire valide les champs, affiche un budget indicatif et enregistre les demandes dans le
`localStorage` du navigateur (clé `solstice-demandes`). Pour recevoir réellement les demandes, remplacez
`saveRequest()` dans `app.js` par un appel à votre backend (API Next.js, Supabase, service e-mail…).

## Déploiement

N'importe quel hébergeur statique : Netlify, Vercel, GitHub Pages, Cloudflare Pages (dossier racine : `luxury-travel`).

Les coordonnées, le numéro d'immatriculation et les avis clients sont des exemples à remplacer.
