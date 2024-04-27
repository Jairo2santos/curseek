// src/store/courses.js
import { defineStore } from 'pinia';
import axios from '../axiosConfig';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    currentPage: 1,
    totalPages: 1,
    totalCourses: 0,
    isLoading: false,
    error: null,
    categories: []
  }),
  actions: {
    async fetchCourses(page = 1, category = '') {
      this.isLoading = true;
      try {
        const queryParams = `page=${page}${category ? `&category=${encodeURIComponent(category)}` : ''}`;
        const response = await axios.get(`/cursos/coursera?${queryParams}`);
        this.courses = response.data.courses;
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        this.totalCourses = response.data.totalCourses;
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/categorias/coursera');
        this.categories = response.data;
      } catch (error) {
        this.error = error;
      }
    }
  }
});
