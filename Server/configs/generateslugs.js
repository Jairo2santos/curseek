const mongoose = require('mongoose');
const UTNCourse = require('../models/utn.models');
const UdemyCourse = require('../models/udemy.models');

mongoose.connect('mongodb://localhost:27017/cursosApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const normalizeText = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateUniqueSlug = async (Model, slug, originalId) => {
  let uniqueSlug = slug;
  let count = 1;
  while (await Model.findOne({ slug: uniqueSlug, _id: { $ne: originalId } })) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }
  return uniqueSlug;
};

const generateSlugsForModel = async (Model) => {
  const courses = await Model.find({});
  
  for (let course of courses) {
    const slug = normalizeText(course.title);
    const uniqueSlug = await generateUniqueSlug(Model, slug, course._id);
    
    course.slug = uniqueSlug;
    await course.save();
  }

  console.log(`Slugs generados para modelo: ${Model.modelName}`);
};

const generateAllSlugs = async () => {
  await generateSlugsForModel(UTNCourse);
  await generateSlugsForModel(UdemyCourse);
  console.log('Todos los slugs han sido generados y guardados.');
};

generateAllSlugs().then(() => {
  mongoose.disconnect();
});
