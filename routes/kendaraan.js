const express = require ('express');
const router = express.Router();
//IMPORT DATABAASE
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');
const multer = require ('multer') 
const path = require ('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})
const upload = multer({storage: storage})

router.get('/', function (req, res){
    connection.query('select * from kendaraan order by no_pol desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data kendaraan',
                data: rows
            })
        }
    })
});

router.post('/store', upload.single("gambar_kendaraan"), [
    //validation
    body('no_pol').notEmpty(),
    body('nama_kendaraan').notEmpty(),
    body('id_transmisi').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        no_pol: req.body.no_pol,
        nama_kendaraan: req.body.nama_kendaraan,
        id_transmisi: req.body.id_transmisi,
        gambar_kendaraan: req.file.filename
    }
    connection.query('insert into kendaraan set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from kendaraan where no_pol = ${id}`, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.lenght <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data kendaraan',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id', [
    //validation
    body('no_pol').notEmpty(),
    body('nama_kendaraan').notEmpty(),
    body('transmisi').notEmpty
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        no_pol: req.body.no_pol,
        nama_kendaraan: req.body.nama_kendaraan,
        id_transmisi: req.body.id_transmisi
    }
        connection.query(`update kendaraan set ? where no_pol = ${id}`, Data, function(err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: 'Server Error',
                })
            }else{
                return res.status(200).json({
                    status: true,
                    message: 'Update Success...!'
                })
            }
        })
    })

router.delete('/delete/(:id)', function(req, res){
        let id = req.params.id;


            connection.query(`delete from kendaraan where no_pol = ${id}`, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: 'Server Error',
                })
            }else{
                return res.status(200).json({
                    status: true,
                    message: 'Data has ben delete !',
                })
            }
        })
    })

router.get('/', function (req, res){
    connection.query('SELECT kendaraan.no_pol, kendaraan.nama_kendaraan, transmisi.nama_transmisi' + 
    ' FROM kendaraan INNER JOIN transmisi ON kendaraan.id_transmisi = transmisi.id_transmisi ', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200),json({
                status: true,
                message: 'Data Mahasiswa',
                data: rows
            })
        }
    })
})


module.exports = router;