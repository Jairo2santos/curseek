const Blog = require('../../models/generals/blog.models');
const slugify = require('slugify');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-date'); 
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error al obtener los blogs:', error);
    res.status(500).send('Error interno del servidor');
  }
};


const getBlogBySlug = async (req, res) => {
  const blogSlug = req.params.slug;
  try {
    const blog = await Blog.findOne({ slug: blogSlug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error al obtener el blog por slug:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const createBlog = async (req, res) => {
  const { title, content, author, image } = req.body;
  // Genera el slug a partir del título
  const slug = slugify(title, { lower: true, strict: true });

  try {
    // Verifica si el slug ya existe
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: 'Ya existe un blog con este título' });
    }

    const newBlog = new Blog({ title, content, author, image, slug });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error al crear un nuevo blog:', error);
    res.status(500).send('Error interno del servidor');
  }
};

 const deleteBlogBySlug = async (req, res) => {
      const { slug } = req.params;
    
      try {
        const deletedBlog = await Blog.findOneAndDelete({ slug });
        if (!deletedBlog) {
          return res.status(404).json({ message: 'Blog no encontrado' });
        }
        res.status(200).json({ message: 'Blog eliminado con éxito' });
      } catch (error) {
        console.error('Error al eliminar el blog:', error);
        res.status(500).send('Error interno del servidor');
      }
    };
    


const updateBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const { title, content, author, image } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate({ slug }, { title, content, author, image }, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error al actualizar el blog:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlogBySlug,
  updateBlogBySlug,
  getBlogBySlug
};
