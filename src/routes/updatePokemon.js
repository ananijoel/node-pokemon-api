const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `le pokemon demamde n'existe pas . reessayez avec un autre identifiant`
          return res.status(404).sjon({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error =>{
      const message = `La liste des pokemons n'a pas pu etre modifié. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
  
}