const { response } = require('express');
const { v4  } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const path = require('path');
const fs = require('fs');

uploadFile = async(req, res=response) => {

    const collection = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospital', 'doctor', 'user'];

    if(!tiposValidos.includes(collection)){
        res.status(400).json({
            ok: false,
            msg: 'no es un medico, hospital o usuario (tipo)'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    const file = req.files.imagen;

    const Archivo = file.name.split('.');
    const extension = Archivo[Archivo.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'jfif'];

    if(!extensionesValidas.includes(extension)){
        res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        });
    }

    const nombreArchivo = `${v4()}.${extension}`;
    const path = `./uploads/${ collection }/${ nombreArchivo }`;

    file.mv(path, (err) => {
        if (err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'error contacte con el administrador'
        })
        }
    });

    updateImage( collection, id, nombreArchivo );
    
    res.status(200).json({
        ok: true,
        msg: 'carga del archivo exitosa',
        nombreArchivo
    });

}

showImage =  (req, res = response) => {

    const collection = req.params.tipo;
    const image = req.params.image;

    const pathImg = path.join( __dirname, `../uploads/${collection}/${image}`);

    if( fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    uploadFile,
    showImage,
}