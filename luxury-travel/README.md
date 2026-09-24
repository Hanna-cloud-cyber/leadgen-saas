# Bluehour Travel

Site d'une maison de voyages de luxe sur mesure : 12 destinations d'exception, expériences privatisées,
un Grand Tour en jet privé et un parcours « Concevoir mon voyage » en trois étapes.

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de build.

## Lancer en local

```bash
cd luxury-travel
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Arborescence du site

Navigation par ancre (`#…`), une seule page HTML :

| Adresse                               | Page                                                         |
|---------------------------------------|--------------------------------------------------------------|
| `#accueil`                            | Hero en triptyque, recherche, à la une, envies, « Où partir en… », expériences, Grand Tour, avis |
| `#destinations`                       | Toutes les destinations, filtres (envie, région, mois) et tri |
| `#skylines`, `#iles`, `#riviera`, `#nature` | Destinations d'une envie                               |
| `#dubai`, `#maldives`, …              | Fiche destination : infos clés, calendrier, séjour, itinéraire, expériences |
| `#experiences`                        | Expériences privatisées                                      |
| `#grand-tour`                         | Voyage signature Skylines & lagons                           |
| `#maison`                             | La Maison : méthode, engagements, avis                       |
| `#envies`                             | Carnet d'envies (cœurs), gardé dans le navigateur            |
| `#concevoir`                          | Demande de voyage en 3 étapes avec estimation                |

## Fichiers

| Fichier      | Rôle                                                   |
|--------------|--------------------------------------------------------|
| `index.html` | En-tête, menu, pied de page                            |
| `styles.css` | Charte graphique, thèmes clair et sombre, responsive   |
| `data.js`    | Tout le contenu (destinations, envies, expériences…)   |
| `app.js`     | Pages, navigation, filtres, carnet d'envies, formulaires |
| `images/`    | Photos des destinations                                |

## Modifier le contenu

Tout se passe dans `data.js`. Pour ajouter une destination, copiez un objet existant, déposez la photo
dans `images/` et renseignez `months` (12 valeurs : 2 = idéal, 1 = agréable, 0 = déconseillé).

## Formulaires

La demande de voyage et la newsletter sont validées puis enregistrées dans le `localStorage` du navigateur
(clés `bluehour-demandes` et `bluehour-newsletter`). Pour les recevoir réellement, remplacez ces enregistrements
dans `app.js` (gestionnaire `submit`) par un appel à votre backend (API, Supabase, service e-mail…).

## À remplacer avant la mise en ligne

- Coordonnées, numéro d'immatriculation Atout France et avis clients : ce sont des exemples.
- Photos : vérifiez que vous avez le droit de les utiliser commercialement (`images/kauai.jpg` porte un filigrane).
