const multer = require('multer');
const path = require('path'); // Asegúrate de añadir esta línea
const { UPLOADS_DIR } = require('../configs/uploadsDir'); // Ajusta la ruta según sea necesario

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR); // Usar la ruta desde la configuración centralizada
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Aquí se usa path
    }
});

// Filtrado de archivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar archivo
    } else {
        cb(new Error('Solo se admiten imágenes en formato JPEG, PNG, WebP, GIF, SVG, o AVIF'), false); // Rechazar archivo
    }
};

// Carga de archivos configuración
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limita el tamaño de archivo a 5MB
});

module.exports = upload;
