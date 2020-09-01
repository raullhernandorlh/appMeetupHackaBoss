const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');

const imageUploadPath = path.join(__dirname, '..', process.env.UPLOADS_DIR);
const MAX_IMAGE_WIDTH = 1000;

async function processImage(uploadedImage) {
    console.log("Entro al metodo de procesar imagen")
    //crear el directorio de subidas si no existe
    await fs.mkdir(imageUploadPath, {recursive: true});

    //leer la imagen 
    const image = sharp(uploadedImage.data);

    //procesar la imagen si es muy grande
    const imageInfo = await image.metadata();

    if(imageInfo.width > MAX_IMAGE_WIDTH) {
        image.resize(MAX_IMAGE_WIDTH);
    }

    //guardar la imagen en el directorio de subidas
    const imageName = `${uuid.v4()}.jpg`;
    await image.toFile(path.join(imageUploadPath, imageName));

    //devolver el nombre de la imagen subida
    return imageName;
}

module.exports = processImage;