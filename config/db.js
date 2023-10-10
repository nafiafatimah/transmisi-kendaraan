let mysql = require ('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transmisi-kendaraan'
});

//membuat kondisi untuk melihat koneksi berjalan atau tidak

connection.connect(function (error){
    if(!!error){
        console.log(error)
    }else{
        console.log('koneksi berhasil');
    }
})
module.exports = connection;