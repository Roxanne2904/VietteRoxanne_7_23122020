#Projet Les Petits Plats

##Goal

1. La recherche doit pouvoir se faire via le champ principal ou via les tags
   |ingrédients,ustensiles ou appareil|
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la
   barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée proposent
   seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les
   tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la
   fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface |avec ou sans
   Bootstrap| devra passer avec succès le validateur W3C.
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche

---

##Tasks:

- [x] Mettre en place tout le html et le css en version static;
- [x] Verifier que le html et css passe au w3c;
- [x] Finir le diagramme pour préparer l'algorithmes;
- [x] Commencer à mettre en place l'injection dynamique du à la recherche utilsateur |main search|:

> - [x] Le diagramme_1 a été réalisé;
> - [x] l'affichages des listes ingredients ...etc, ne contiennent plus de doublons;
> - [x] message d'erreur si moins de 3 caractères;
> - [x] le système recherche si des recettes match avec la valeur input;
> - [x] le système affiche les recettes correspondantes ou met un msg d'erreur et fait des proposition;
> - [x] Les mots clefs se mettent à jours en fonction des recettes présentent;
> - [x] Le code à été nettoyé et optimisé;
> - [x] Les listes des mots clefs se mettent à jours en fonction de la valeur input;
> - [x] adapté le css lors de l'event "oninput";

> - [ ] Mettre en place le "onClick" sur les mots clefs;
> - [ ] Mettre à jour le diagramme- plus détaillé l'algo du main input-;

> - BONUS

> - [ ] Afficher les recettes en fonction du resulat des tags et du main input ;

---

##Notes:

> Blocks ingrédients, appareils et ustensiles peuvent s'ouvrir en même temps;

---

[DATA](https://raw.githubusercontent.com/OpenClassrooms-Student-Center/P11-front-end-search-engine/master/recipes.js);
