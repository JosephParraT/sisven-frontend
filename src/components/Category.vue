<template>
  <div>
    <h1>Categories</h1>
    <form @submit.prevent="saveCategory">
      <input v-model="category.name" placeholder="Name" required>
      <textarea v-model="category.description" placeholder="Description"></textarea>
      <button type="submit">Save</button>
    </form>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }} - {{ category.description }}
        <button @click="editCategory(category)">Edit</button>
        <button @click="deleteCategory(category.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      category: {
        name: '',
        description: ''
      },
      editMode: false
    };
  },
  methods: {
    fetchCategories() {
      axios.get('/api/categories').then(response => {
        this.categories = response.data;
      });
    },
    saveCategory() {
      if (this.editMode) {
        axios.put(`/api/categories/${this.category.id}`, this.category).then(this.fetchCategories);
      } else {
        axios.post('/api/categories', this.category).then(this.fetchCategories);
      }
      this.category = { name: '', description: '' };
      this.editMode = false;
    },
    editCategory(category) {
      this.category = { ...category };
      this.editMode = true;
    },
    deleteCategory(id) {
      axios.delete(`/api/categories/${id}`).then(this.fetchCategories);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>