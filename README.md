# Space R03

![Space Explorer preview](images/preview.png)

## C’est quoi ce projet ?

Ce projet est un petit dessin interactif en SVG.js.  
J’ai choisi de faire une scène spatiale parce que c’est un thème que j'aime. Il faut le représenter avec des formes SVG, mais qui permet quand même de faire quelque chose de visuel et animé.

On retrouve donc une fusée, des planètes, des étoiles, une météorite, un satellite et une surface lunaire. L’idée n’est pas vraiment de faire un jeu complet, mais plutôt une illustration interactive où l’utilisateur peut cliquer sur différents éléments pour déclencher des petites animations (il en faut 12, et 4 interactives)

## Thème

Au départ, on voit une fusée posée sur une sorte de lune, avec un fond spatial, plusieurs planètes, des étoiles, un astéroïde et un satellite.

J’ai essayé de garder un style assez simple, parce que le but du travail est surtout d’utiliser SVG.js pour créer des composants graphiques, des animations et des interactions. Les objets sont donc construits avec des formes de base: cercles, ellipses, rectangles, lignes, polygones et textes.

## Ce qu’on peut faire dans la scène

L’utilisateur peut interagir avec plusieurs éléments :

- en cliquant sur la fusée, elle démarre, sa flamme apparaît, elle fait un loop puis revient à sa place ;
- en cliquant sur l’astéroïde, il explose en petits morceaux ;
- en cliquant sur le satellite, des ondes apparaissent comme un signal ;
- en cliquant sur le bouton `Voyage`, la lune se transforme en Terre (et vice-versa)

## Animations

Il y a aussi des animations qui se lancent directement dans la scène :

- les étoiles scintillent doucement ;
- les planètes bougent un peu en continu ;
- le satellite flotte légèrement ;
- une étoile filante traverse parfois le décor.

## Objectif du travail

L’objectif était de créer un contenu graphique 2D animé et interactif sur le web avec la librairie SVG.js.

Le projet devait donc contenir :

- au moins 12 composants graphiques ;
- au moins 2 animations prédéfinies ;
- au moins 4 interactions qui modifient le contenu graphique.

## Fichiers du projet

- `index.html` : la page web qui affiche le projet ;
- `script.js` : le fichier JavaScript qui crée toute la scène avec SVG.js ;
- `description.pdf` : la courte description du thème, des animations et des interactions.

## Lancer le projet

Pour voir le projet, il suffit d’ouvrir le fichier `index.html` dans un navigateur.

Dans VS Code, on peut aussi utiliser l’extension **Live Server** et lancer la page avec :

```text
Open with Live Server