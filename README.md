# HandBallGG
 
## TP1H	TP 3 – Utilisation de Docker dans un de vos projets	BUT Informatique
## Ethan Bourguigneau, Yohann Chavanel, Théo Graille, Alan Sapet

<br>
<br>

# Sujet choisis :

Pour ce TP nous avons choisi de reprendre notre projet de SAÉ du S4. Un projet de site de handball de l’équipe féminine de Guilherand-Granges. Dans ce TP, nous allons Dockeriser notre application.

<br>
<br>

# Dockerfile :
-	Placez-vous à la racine du projet « cd ‘PATH/’HandBallGG
-	Ensuite créez un Dockerfile avec votre éditeur de texte préférer (vim/nano)
-	Voici ensuite notre Dockerfile :

![Dockerfile](https://i.imgur.com/iL88t7x.png)

<br>
<br>

# Docker-compose.yml :

-	Ensuite créez un fichier docker-compose.yml avec votre éditeur de texte préférer (vim/nano)
-	Voici ensuite notre docker-compose :

![docker-compose](https://i.imgur.com/1n4EkVd.png)


<br>
<br>

# Lancer via le docker-compose.yml :

- docker compose up -d --build

![docker-compose-up](https://i.imgur.com/jnAMqjy.png)

<br>
<br>


# Script import des données DB Mongo :

![ScriptImport](https://i.imgur.com/UbrgMEC.png)

<br>
<br>

# Résultat :

- docker ps -a

- docker network ls

![ResultDocker-ps-ls](https://i.imgur.com/Psi1egD.png)


<br>
<br>

# Via mano :

```bash 

sudo docker pull mongo:4
sudo docker pull node:18-alpine

sudo docker network create handballgg-network

sudo docker run -d --name mongo --network handballgg-network --env MONGO_INITDB_ROOT_USERNAME: admin --env MONGO_INITDB_ROOT_PASSWORD: admin --env MONGO_INITDB_DATABASE: HandBallGG mongo:4


sudo docker run -d --name node --network handballgg-network -p 3000:3000 --env DATABASE_mongodb: mongodb://admin:admin@mongodb:27017/ --env JWT_SECRET: UQAwzuiD666c7Jbph27449vFz8Mhis5 node:18-alpine
```
