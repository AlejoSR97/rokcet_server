const express = require('express');
const connectDB = require('./config/dbConfiguration');
const cors = require('cors');

const app = express();

connectDB();
app.use(cors());

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));
app.use('/api/pokemones', require('./routes/pokemon'));
app.use('/api/users', require('./routes/user'));

app.listen(4000, () => {
    console.log('Servidor corriento en puerto 4000');
});