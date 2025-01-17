const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null) {
          const message = `le pokemon demamde n'existe pas . reessayez avec un autre identifiant`
          return res.status(404).sjon({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        const message = ` le pokemons\ n'a pas pu etre recuperé. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}