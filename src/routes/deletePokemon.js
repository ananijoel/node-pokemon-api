const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
        const message = `le pokemon demamde n'existe pas . reessayez avec un autre identifiant`
        return res.status(404).sjon({message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error =>{
      const message = ` le pokemons\ n'a pas pu etre suprime. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}