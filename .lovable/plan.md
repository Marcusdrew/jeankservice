## Objectif

Produire un **PDF de proforma** prêt à envoyer par WhatsApp/email à Jean KAKUDJI, présentant l'offre de création + abonnement du site **jeankservice.lovable.app**, avec une offre de lancement attractive pour signer rapidement.

Ce n'est **pas une modification du site** — c'est un livrable (`/mnt/documents/proforma-jk-service.pdf`).

## Contenu de la proforma

**En-tête**
- Émetteur : Jenovic ILAMBU — Conception & gestion de sites web
- Client : Jean KAKUDJI — JK Service (Kinshasa)
- N° proforma : `JKS-2026-001`, date du jour, validité 15 jours

**Objet**
> Création + gestion du site vitrine professionnel **jeankservice.lovable.app** (portes, fenêtres, portails & vérandas aluminium).

**Section 1 — Frais de création (one-shot)**

| Désignation | Montant |
|---|---|
| Site vitrine 6 pages (Accueil, Réalisations, Savoir-faire, Témoignages, Offres, Contact) | 200 $ |
| Hébergement + nom de domaine 1ère année | inclus |
| Intégration WhatsApp + suivi visiteurs (Google Analytics) | inclus |
| Optimisation SEO local Kinshasa | inclus |
| **Sous-total création** | **200 $** |
| Remise lancement −20 % | −40 $ |
| **Net à payer création** | **160 $** |

**Section 2 — Abonnement mensuel (au choix)**

| Formule | Essentielle | Pro |
|---|---|---|
| Prix / mois | 20 $ | 45 $ |
| Hébergement & domaine | ✓ | ✓ |
| Photos réalisations | 5/mois | illimitées + retouche |
| Témoignages | ✓ | ✓ |
| Suivi visites & contacts WhatsApp | ✓ | rapport mensuel détaillé |
| Modifications texte / prix | ✓ | ✓ + nouvelles sections |
| SEO Google Kinshasa | — | ✓ |
| Support | WhatsApp 48h | prioritaire 12h |
| Campagne promo bannière | — | 1/mois |

> **Offre de lancement : 1er mois OFFERT** sur la formule choisie.

**Section 3 — Total à régler aujourd'hui**

| | |
|---|---|
| Création (remisée) | 160 $ |
| 1er mois (offert) | 0 $ |
| **Total** | **160 $** |

**Modalités**
- Paiement : Mobile Money / espèces / virement (RIB ou n° MoMo à fournir)
- 50 % à la commande (80 $), 50 % à la mise en ligne
- Abonnement facturé à partir du 2ᵉ mois

**Pied de page**
- Contact Jenovic (tel / WhatsApp / email — *à compléter par toi avant envoi*)
- Mention : *« Proforma non comptable, vaut accord commercial après signature. »*
- Signature client + signature prestataire

## Implémentation technique

- Script Python avec **ReportLab** (Platypus : tables + paragraphes stylés)
- Palette sobre : noir, gris, accent ember `#C2410C` (cohérent avec le site)
- Typo : Helvetica (built-in ReportLab, garantit le rendu)
- Format A4, marges 2 cm, 1 page (2 max si débord)
- Sortie : `/mnt/documents/proforma-jk-service.pdf`
- QA visuelle obligatoire : conversion en image + inspection (lisibilité, alignement tableaux, pas de débord)

## Question ouverte (à confirmer avant ou après génération)

Tes **coordonnées de contact** (téléphone/WhatsApp + email) et ton **moyen de paiement** (n° Mobile Money / RIB) ne sont pas encore donnés. Je peux :
- soit générer une **v1 avec placeholders** `[Téléphone : …]` que tu remplis à la main,
- soit attendre que tu me donnes les infos pour une version finale prête à envoyer.

Dis-moi laquelle tu préfères au moment d'implémenter.
