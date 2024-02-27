const Blog = require('../../models/generals/blog.models');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-date'); 
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error al obtener los blogs:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const getBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error al obtener el blog por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const createBlog = async (req, res) => {
  const { title, content, author, image } = req.body; 

  try {
    const newBlog = new Blog({ title, content, author, image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error al crear un nuevo blog:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const deleteBlogById = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json({ message: 'Blog eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el blog por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  const { title, content, author, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, author, image },
      { new: true } // Esta opción devuelve el documento modificado
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error al actualizar el blog:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
  updateBlogById
};
