const express = require ('express');
const router = express.Router();
//IMPORT DATABAASE
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');

router.get('/', function (req, res){
    connection.query('select * from transmisi order by id_transmisi desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data transmisi',
                data: rows
            })
        }
    })
});
router.post('/store',[
    //validation
    body('nama_transmisi').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_transmisi: req.body.nama_transmisi
    }
    connection.query('insert into transmisi set ?', Data, function(err, rows){
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
    connection.query(`select * from transmisi where id_transmisi = ${id}`, function(err, rows) {
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
                message: 'Data Transmisi',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id', [
    body('nama_transmisi').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_transmisi: req.body.nama_transmisi
    }
    connection.query(`update transmisi set ? where id_transmisi = ${id}`, Data, function(err, rows) {
        if(err){
            return res.req.status(500).json({
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
    connection.query(`delete from transmisi where id_transmisi = ${id}`, function (err, rows){
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

module.exports = router;