const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'le nom est deja pris'
        },
        validate: {
          notNull: {msg:'le nom du pokemon ne doit pas etre nulle'},
          notEmpty: {msg:'le champ d pokemon ne doit pas etre vide'},
        }
      },
      hp: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: 'Utilsez uniquement des nombres entiers pour les point de vie'},
          notNull: { msg: 'Les points de vie sont une propriete requise.'},
          min:{
            args: [0],
            msg: 'champ requis, nombre entre 0 et 999'
          },
          max:{
            args: [999],
            msg: 'champ requis, nombre entre 0 et 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: {msg: 'Utilsez uniquement des nombres entiers pour les degats d\'attaque'},
          notNull: { msg: 'les degats d\'attaque sont une propriete requise.'},
          min:{
            args: [0],
            msg: 'champ requis, nombre entre 0 et 99'
          },
          max:{
            args: [99],
            msg: 'champ requis, nombre entre 0 et 99'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl: {msg: 'Utilsez uniquement des liens pour les images'},
          notNull: { msg: 'L\'image du pokemon est une propriete requise.'}
        }
      },
      types: { 
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types',types.join())
        },
        validate:{
          isTypeValid(value){
            if(!value){
              throw new Error('Un pokemon doit au moins avoir un type.')
            }
            if(value.split(',').lengh >3){
              throw new Error('Un pokemon ne peux pas avoir plus de trois types ')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokemon doit appartenir a la liste suivante: ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }