// saveUdemyCourses.js
const axios = require('axios');
const UdemyCourse = require('../../models/udemy.models.js');

async function saveUdemyCourses() {
  try {
    const fields = 'id,title,url,is_paid,price,visible_instructors,image_125_H,image_240x135,image_480x270,published_title,locale,headline';
    const headers = {
      "Accept": "application/json, text/plain, */*",
      "Authorization": "Basic RVdZV1VZMDY4OWZJMmFSY0R2WkkxZUp3TTVWaTJOd08wWUpqTjNIczpEQTFRWmpYTllBZHZZc05nREtFS3JjdjRRTThTbkV4V0YyUXBaR2l0aUNXR0lRVEcxZGllNUxyUGhnaEVnTE9aSzFyek1wcTk0VlRsZFMwUWozSnV0ZXFoaFlXdFBXbHBETVRrMG9yenM2YXNIdEtqRnd6SHY2S0NYejRLbHQ2RA==",
      "Content-Type": "application/json"
    };

    let page = 1;
    let totalCoursesSaved = 0;
    const MAX_COURSES = 2000;

    while (totalCoursesSaved < MAX_COURSES) {
      const response = await axios.get(`https://www.udemy.com/api-2.0/courses/?fields[course]=${fields}&page=${page}&page_size=100`, { headers });
      const coursesData = response.data.results;

      if (coursesData.length === 0) {
        // No hay más cursos para obtener, sal del bucle
        break;
      }

      for (const data of coursesData) {
        const course = {
          id: data.id,
          title: data.title,
          url: data.url,
          is_paid: data.is_paid,
          price: data.price,
          instructors: data.visible_instructors.map(instructor => ({
            title: instructor.title,
            name: instructor.name,
            display_name: instructor.display_name,
            job_title: instructor.job_title,
            image_50x50: instructor.image_50x50,
            image_100x100: instructor.image_100x100
          })),
          image_125_H: data.image_125_H,
          image_240x135: data.image_240x135,
          image_480x270: data.image_480x270,
          published_title: data.published_title,
          locale: data.locale,
          headline: data.headline
        };

        const existingCourse = await UdemyCourse.findOne({ id: course.id });
        if (!existingCourse) {
          await UdemyCourse.create(course);
        }

        totalCoursesSaved++;
        if (totalCoursesSaved >= MAX_COURSES) {
          break;
        }
      }

      page++;
    }
  } catch (error) {
    console.error('Error al obtener y guardar cursos:', error);
  }
}

module.exports = saveUdemyCourses;
