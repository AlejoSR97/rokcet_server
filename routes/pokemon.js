const express = require('express');
const router = express.Router();
const pokemonsController = require('../controllers/pokemonsController');

//api/pokemones

router.get('/list/:page', pokemonsController.getPokemonsList);
router.get('/favorites', pokemonsController.getFavorites);
router.post('/favorites', pokemonsController.addFavorite);
router.delete('/favorites', pokemonsController.deleteFavorite);

module.exports = router;