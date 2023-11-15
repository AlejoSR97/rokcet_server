var axios = require('axios');
const Pokemon = require('../models/Pokemon');
const User = require('../models/User');

exports.getPokemonsList = async (req, res) => {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    var page = req.params.page;
    var offset = (page - 1) * 12;
    var limit = 12;

    var config = {
        method: 'get',
        url: url + `?offset=${offset}&limit=${limit}`,
        headers: {}
    };

    await axios(config).then(async function (response) {
        var results = response.data['results'];
        var pokemonsList = [];

        for (const element in results) {
            var config2 = {
                method: 'get',
                url: url + '/' + results[element]['url'].split('/')[6],
                headers: {}
            };

            await axios(config2).then(function (response2) {
                pokemonsList.push(response2.data);
                // res.send(results);
            }).catch(function (error) {
                console.log(error);
            });
        }

        res.send(pokemonsList);
    }).catch(function (error) {
        console.log(error);
    });
}

exports.getFavorites = async (req, res) => {
    try {
        const user = req.headers.user;
        const favoritos = await Pokemon.find({ user: user });

        if (!favoritos || favoritos.length == 0) {
            res.status(404).json({ msg: "No se encontraron favoritos." });
        } else {
            res.json(favoritos);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al consultar favoritos: ${error}.`);
    }
}

exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.headers.user });
        var pokemon;
        var pokemonDB = await Pokemon.findOne({ user: req.headers.user, number: req.body.number});

        if (!user) {
            res.status(404).json({ msg: "No existe el usuario." });
        } else if (pokemonDB != null) {
            res.status(400).json({ msg: "Este pokemon ya es favorito." });
        } else {
            pokemon = new Pokemon({
                user: req.headers.user,
                number: req.body.number,
                url: req.body.url,
                name: req.body.name,
                description: req.body.description,
                height: req.body.height,
                weight: req.body.weight,
                image: req.body.image,
                types: req.body.types,
            });

            await pokemon.save();
            res.send(pokemon);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al agregar el favorito: ${error}.`);
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const user = req.headers.user;
        const pokemonNumber = req.headers.pokemon;

        var pokemon = await Pokemon.findOne({ user: user, number: pokemonNumber });

        if (!pokemon) {
            res.status(404).json({ msg: "No se ha registrado como favorito." });
        } else {
            pokemon = await Pokemon.findOneAndDelete({ user: user, number: pokemonNumber });
            res.json({ msg: 'Se ha eliminado de tus favoritos.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al eliminar el favorito: ${error}`);
    }
}