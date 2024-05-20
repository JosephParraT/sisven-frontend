<template>
  <div>
    <h1>Customers</h1>
    <form @submit.prevent="saveCustomer">
      <input v-model="customer.name" placeholder="Name" required>
      <textarea v-model="customer.contact_info" placeholder="Contact Info"></textarea>
      <button type="submit">Save</button>
    </form>
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        {{ customer.name }} - {{ customer.contact_info }}
        <button @click="editCustomer(customer)">Edit</button>
        <button @click="deleteCustomer(customer.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: [],
      customer: {
        name: '',
        contact_info: ''
      },
      editMode: false
    };
  },
  methods: {
    fetchCustomers() {
      axios.get('/api/customers').then(response => {
        this.customers = response.data;
      });
    },
    saveCustomer() {
      if (this.editMode) {
        axios.put(`/api/customers/${this.customer.id}`, this.customer).then(this.fetchCustomers);
      } else {
        axios.post('/api/customers', this.customer).then(this.fetchCustomers);
      }
      this.customer = { name: '', contact_info: '' };
      this.editMode = false;
    },
    editCustomer(customer) {
      this.customer = { ...customer };
      this.editMode = true;
    },
    deleteCustomer(id) {
      axios.delete(`/api/customers/${id}`).then(this.fetchCustomers);
    }
  },
  mounted() {
    this.fetchCustomers();
  }
};
</script>