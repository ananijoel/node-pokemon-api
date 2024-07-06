const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
      if(name.length < 2){
        const message = `le terme de recherche dit contenir au moins 2 caracteres.`
        return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
              [Op.like]: `%${name}%`
          }
        },
        order : ['name'],//['name', 'ASC']
        limit :  limit
      }) 
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme recherché ${name}.`
        res.json({message,data:rows})
      })
    } else {
      Pokemon.findAll({order: ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error =>{
        const message = `La liste des pokemons n'a pas pu etre recuperé. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
    } 
  })
}