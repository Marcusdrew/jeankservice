# Site vitrine — Jean Aluminium

Site vitrine professionnel pour Jean, menuisier aluminium à Kinshasa. Objectif : démontrer son savoir-faire à travers ses réalisations et déclencher des prises de contact (téléphone, WhatsApp).

## Structure du site

Site multi-pages (routes séparées pour le SEO et le partage), navigation claire en haut, appel à l'action présent partout.

- **/** — Accueil : hero impactant avec une réalisation phare, présentation rapide des 4 spécialités, aperçu galerie, témoignages, CTA contact
- **/realisations** — Galerie filtrable par catégorie (Fenêtres & baies, Portes & devantures, Vérandas, Portails & clôtures)
- **/savoir-faire** — À propos de Jean, son parcours, sa méthode, ses matériaux, sa zone d'intervention
- **/temoignages** — Avis clients regroupés
- **/contact** — Coordonnées, carte de la zone, lien direct téléphone + WhatsApp, formulaire simple (mailto pour commencer, pas de backend)

## Contenu prévu

- **Entreprise** : Jean Aluminium
- **Localisation** : Kinshasa — bureau à l'entrée Mimosa, Kinsuka Pêcheur — intervient partout dans la ville
- **Téléphone / WhatsApp** : 0810688062
- **Spécialités** : Fenêtres & baies vitrées · Portes & devantures · Vérandas & extensions · Portails & clôtures
- Photos de réalisations : placeholders générés au démarrage, à remplacer ensuite par les vraies photos de Jean

## Direction visuelle

Tu as choisi d'explorer 3 directions. Dès que ce plan est approuvé, je génère 3 maquettes distinctes (par exemple : industriel premium / architectural épuré / artisan chaleureux) et tu choisis celle qu'on construit.

## CTA & conversion

- Bouton "Appeler" (tel:) et "WhatsApp" (wa.me) visibles en permanence dans le header et le footer
- CTA répété en bas de chaque page
- Photos plein écran cliquables sur la galerie pour montrer le détail du travail

## Détails techniques

- TanStack Start (déjà en place) avec routes fichier dans `src/routes/`
- Une route par section pour SEO et partage social (meta title + description uniques par page)
- Tailwind v4, tokens de design dans `src/styles.css`
- Images de réalisations générées via le générateur d'images, stockées dans `src/assets/`
- Pas de backend pour l'instant : le formulaire de contact ouvre l'appli mail. Si plus tard tu veux recevoir les demandes dans une base de données + email, on activera Lovable Cloud
- Responsive mobile-first (beaucoup de prospects ouvriront depuis leur téléphone)

## Prochaine étape après approbation

1. Génération de 3 directions visuelles à comparer
2. Tu choisis ta préférée
3. Construction complète du site avec la direction retenue
