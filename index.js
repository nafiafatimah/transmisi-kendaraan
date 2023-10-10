const express = require ('express')
const app = express()
const port = 4000

//membuat route baru dengan method GET yang isinya hallo...
const bodyPs = require('body-parser'); //import body-paarser
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

const  kenRouterTransmisi = require('./routes/transmisi');
app.use('/api/trans', kenRouterTransmisi);

const  kenRouterKendaraan = require('./routes/kendaraan');
app.use('/api/ken', kenRouterKendaraan);

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http:://localhost:${port}`)
})