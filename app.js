const express = require('express') //recuperation du packet express
const morgan = require('morgan') //recuperation du packet morgan
const favicon = require('serve-favicon') //recuperation du middleware de definition de la favicon
const bodyParser = require('body-parser') //recuperation du middleware de conversion des entres de l'app en json
const {success,getUniqueId} = require('./helper.js') // recuperaion du msssage de succes d'une requette et de la methode de recuperation de l'id a attribuer a un nouvel element de pokemons
let pokemons = require('./mock-pokemon') // recuperaion du tableau pokemons

const app = new express() // creation d'une instance de l'application express, le petit serveur web sur lequel l'API rest va fonctionner
const port = 3000 // definition du port sur lequel on va demarrer l'API Rest


app
    .use(favicon('./favicon.ico'))//definition de la favicon de l'applicaton
    .use(morgan('dev'))//affiche l'url des requettes entrantes vers l'api rest
    .use(bodyParser.json())// middleware qui sert a parser toutes les entres de la web app du format string au format json

app.get('/',(req,res) => res.send('hello again, express !')) // definition du premier point de terminaison (coeur d'express)
app.get('/api/pokemons/:id',(req,res)  => {
    const id  = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message ='un pokemon a bien été trouvé'
    res.json(success(message,pokemon))
})//point de terminaison qui permet de recuperer le nom d'un pokemon grace a son id

app.get('/api/pokemons',(req,res)=> {
    const message ='La liste des pokémons a bien ete récupérée:'
    res.json(success(message,pokemons))
})//point de terminaison qui fournit en json la liste des pokemons 

app.post('/api/pokemons',(req,res) =>{
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body,...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `le pokemon ${pokemonCreated.name} a bien ete crée `
    res.json(success(message,pokemonCreated))
})//point de terminaison qui permet d'ajouter un nouveau pokemon a la liste des pokemons grace a la methode post


app.listen(port,() => console.log(`Notre premiere application Node est demarée sur : http://localhost:${port}`)) //demarage de l'API Rest sur le port 300 et affichage d'un message de confirmation dans le terminal grace a listennm