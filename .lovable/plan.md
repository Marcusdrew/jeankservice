
## Ce qu'on va ajouter au site JK Service

### 1. Nouvelle page "Offres & Tarifs" (`/offres`)

Page publique présentant **2 formules d'abonnement mensuel** (gestion du site) :

**Formule Essentielle — 20 $/mois**
- Hébergement & nom de domaine inclus
- Mise à jour des photos de réalisations (jusqu'à 5/mois)
- Ajout de nouveaux témoignages
- Suivi des visites & contacts WhatsApp
- Réponse aux petites modifications (texte, prix)
- Support WhatsApp sous 48h

**Formule Pro — 45 $/mois**
- Tout ce qui est dans Essentielle
- Photos illimitées + retouche
- Nouvelles sections / pages à la demande
- Rapport mensuel détaillé (visites, clics, contacts)
- Optimisation Google (SEO local Kinshasa)
- Support prioritaire sous 12h
- 1 campagne promo / mois (bannière site)

Section frais de création one-shot mentionnée en haut (à partir de 200 $).

### 2. Section "Code Promo" sur la page Offres

Encadré visible où le visiteur entre un code promo (ex: `JK2026`) → affiche une réduction (-15 % le premier mois ou -50 $ sur la création). Logique côté client uniquement (codes en dur dans le fichier) — pas besoin de backend pour ça. Au clic "Profiter de l'offre", ouvre WhatsApp avec un message pré-rempli qui inclut le code utilisé.

### 3. Bouton WhatsApp pré-rempli (partout sur le site)

Tous les liens `wa.me/...` actuels passent à un format avec message pré-rempli :

> "Bonjour, je viens du site JK Service et j'aimerais échanger avec vous au sujet de…"

Implémenté via une **fonction utilitaire** `buildWhatsAppLink(context)` dans `src/lib/whatsapp.ts` pour qu'on puisse personnaliser le message selon la page (Contact, Réalisations, Offres avec code promo, etc.).

Fichiers concernés : `SiteLayout.tsx`, `contact.tsx`, `index.tsx`, `realisations.tsx`, `temoignages.tsx`, `savoir-faire.tsx`, nouvelle page `offres.tsx`.

### 4. Tracker simple + page admin cachée

**Tracker** (sans backend, stockage `localStorage` côté navigateur Jean/toi) :
- Compte chaque visite de page (avec route + date)
- Compte chaque clic sur bouton WhatsApp
- Compte chaque clic sur bouton "Appeler"
- Stocke les 200 derniers événements

Implémenté via un hook `useTracker()` + helper `trackEvent(type, meta)`.

**Page admin** : `/admin-jk` (URL non listée dans le menu)
- Affiche : total visites / 7 derniers jours / 30 jours
- Clics WhatsApp et Appels (avec pourcentage de conversion)
- Liste des dernières actions
- Bouton "Réinitialiser les stats"
- Petit mot de passe simple en clair côté client (`JKadmin2026`) — pas une vraie sécurité, juste pour éviter qu'un visiteur tombe dessus par hasard

> Limite honnête : ce tracker est **côté navigateur**, donc les stats ne sont visibles que sur l'appareil qui a consulté la page admin. Pour des stats globales (tous visiteurs confondus), il faudra plus tard installer Google Analytics gratuit ou activer Lovable Cloud — je te le proposerai après que Jean ait validé cette V1.

### 5. Lien discret vers `/offres` dans le footer

Pas dans le menu principal (c'est un site pour Jean, pas pour toi) — juste un petit lien "Offres de gestion" dans le footer, utile quand tu envoies l'URL à d'autres prospects artisans.

---

## Détails techniques

- Nouveau fichier `src/lib/whatsapp.ts` : `buildWhatsAppLink({ message?: string }): string`
- Nouveau fichier `src/lib/tracker.ts` : `trackEvent`, `getStats`, `resetStats` (localStorage)
- Nouveau hook `src/hooks/use-page-tracking.ts` : appelé dans `SiteLayout` pour tracker chaque navigation
- Nouvelles routes : `src/routes/offres.tsx`, `src/routes/admin-jk.tsx`
- Modif `SiteLayout.tsx` : remplacer les liens WhatsApp directs par `buildWhatsAppLink()` + ajouter tracking sur les clics tel/whatsapp
- Modif des autres routes : même remplacement des liens WhatsApp
- Pas de backend, pas de dépendances ajoutées
