const express = require('express') //recuperation du packet express

const app = new express() // creation d'une instance de l'application express, le petit serveur web sur lequel l'API rest va fonctionner
const port = 3000 // definition du port sur lequel on va demarrer l'API Rest

app.get('/',(req,res) => res.send('hello again, express !')) // definition du premier point de terminaison (coeur d'express)
app.get('/api/pokemons/:id',(req,res)  => {
    const id  = req.params.id
    res.send(`Vous avez demandéle pokemon n° ${id}`)
})

app.listen(port,() => console.log(`Notre premiere application Node est demarée sur : http://localhost:${port}`)) //demarage de l'API Rest sur le port 300 et affichage d'un message de confirmation dans le terminal grace a listennm