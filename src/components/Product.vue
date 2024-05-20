<template>
  <div>
    <h1>Products</h1>
    <form @submit.prevent="saveProduct">
      <input v-model="product.name" placeholder="Name" required>
      <textarea v-model="product.description" placeholder="Description"></textarea>
      <input v-model="product.category_id" placeholder="Category ID" required>
      <input v-model="product.quantity" type="number" placeholder="Quantity" required>
      <input v-model="product.price" type="number" step="0.01" placeholder="Price" required>
      <button type="submit">Save</button>
    </form>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.description }} - {{ product.quantity }} - {{ product.price }}
        <button @click="editProduct(product)">Edit</button>
        <button @click="deleteProduct(product.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      product: {
        name: '',
        description: '',
        category_id: '',
        quantity: '',
        price: ''
      },
      editMode: false
    };
  },
  methods: {
    fetchProducts() {
      axios.get('/api/products').then(response => {
        this.products = response.data;
      });
    },
    saveProduct() {
      if (this.editMode) {
        axios.put(`/api/products/${this.product.id}`, this.product).then(this.fetchProducts);
      } else {
        axios.post('/api/products', this.product).then(this.fetchProducts);
      }
      this.product = { name: '', description: '', category_id: '', quantity: '', price: '' };
      this.editMode = false;
    },
    editProduct(product) {
      this.product = { ...product };
      this.editMode = true;
    },
    deleteProduct(id) {
      axios.delete(`/api/products/${id}`).then(this.fetchProducts);
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>