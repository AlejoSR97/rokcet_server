const User = require("../models/User");


exports.getUser = async (req, res) => {
    try {
        const userName = req.headers.user;
        const user = await User.findOne({ name: userName });
        if (!user) {
            res.status(404).json({ msg: "No existe el usuario." });
        } else {
            res.json(user);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error consultando usuario: ${error}`);
    }
}

exports.authUser = async (req, res) => {
    try {
        const userName = req.headers.user;
        const userPassword = req.headers.password;
        var user = await User.findOne({ name: userName, password: userPassword });

        if (!user) {
            res.status(404).json({ msg: "Credenciales incorrectas." });
        } else {
            user.last_connection = Date.now();
            await User.updateOne({ name: userName }, { last_connection: user.last_connection });
            res.json(user);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error consultando usuario: ${error}`);
    }
}

exports.createUser = async (req, res) => {
    try {
        let user;
        user = new User(req.body);

        await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error creando el usuario: ${error}`);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const newUser = req.body;
        let user = await User.findOne({ name: req.body.name });

        if (!user) {
            res.status(404).json({ msg: "No se ha encontrado el usuario." });
        } else {
            user.name = newUser.name;
            user.password = newUser.password;
            user.nickname = newUser.nickname;
            user.team = newUser.team;

            await User.updateOne({ _id: user._id }, newUser);
            user = await User.findOne({ _id: user._id });
            res.send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error actualizando el usuario: ${error}`);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findOne({ name: req.headers.name });

        if (!user) {
            res.status(404).json({ msg: "No se ha encontrado el usuario." });
        } else {
            user = await User.findOneAndDelete({ name: req.headers.name });
            res.json({ msg: 'Se ha eliminado el usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error eliminando el usuario: ${error}`);
    }
}