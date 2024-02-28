const mongoose = require('mongoose');
const Blog = require('./../models/generals/blog.models'); // Asegúrate de que la ruta al modelo es correcta
const slugify = require('slugify');

async function updateBlogs() {
  try {
    // Espera a que la conexión a la base de datos sea establecida
    await mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a la base de datos.');

    const blogs = await Blog.find(); // Obtén todos los blogs

    for (let blog of blogs) {
      if (!blog.slug) {
        const slug = slugify(blog.title, { lower: true, strict: true });
        await Blog.findByIdAndUpdate(blog._id, { slug });
      }
    }

    console.log('Slugs actualizados para todos los blogs existentes.');
  } catch (error) {
    console.error('Ocurrió un error:', error);
  } finally {
    // Cierra la conexión a la base de datos cuando hayas terminado
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  }
}

updateBlogs();
