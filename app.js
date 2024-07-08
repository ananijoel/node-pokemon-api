const express = require('express') //recuperation du packet express
const morgan = require('morgan') //recuperation du packet morgan
const favicon = require('serve-favicon') //recuperation du middleware de definition de la favicon
const bodyParser = require('body-parser') //recuperation du middleware de conversion des entres de l'app en json
const sequelize = require('./src/db/sequelize')

const app = new express() // creation d'une instance de l'application express, le petit serveur web sur lequel l'API rest va fonctionner
const port = 3000 // definition du port sur lequel on va demarrer l'API Rest

app
    .use(favicon('./favicon.ico'))//definition de la favicon de l'applicaton
    .use(morgan('dev'))//affiche l'url des requettes entrantes vers l'api rest
    .use(bodyParser.json())// middleware qui sert a parser toutes les entres de la web app du format string au format json

sequelize.initDb()

// ici nous placerons nos futurs endpoints
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//Gestion des erreurs 404
app.use(({res})=>{
    const message = 'impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL'
    res.status(404).json({message})
})

app.listen(port,() => console.log(`Notre premiere application Node est demarée sur : http://localhost:${port}`)) //demarage de l'API Rest sur le port 300 et affichage d'un message de confirmation dans le terminal grace a listennm