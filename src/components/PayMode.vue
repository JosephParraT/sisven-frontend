<template>
  <div>
    <h1>Pay Modes</h1>
    <form @submit.prevent="savePayMode">
      <input v-model="payMode.mode" placeholder="Mode" required>
      <button type="submit">Save</button>
    </form>
    <ul>
      <li v-for="payMode in payModes" :key="payMode.id">
        {{ payMode.mode }}
        <button @click="editPayMode(payMode)">Edit</button>
        <button @click="deletePayMode(payMode.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      payModes: [],
      payMode: {
        mode: ''
      },
      editMode: false
    };
  },
  methods: {
    fetchPayModes() {
      axios.get('/api/pay_modes').then(response => {
        this.payModes = response.data;
      });
    },
    savePayMode() {
      if (this.editMode) {
        axios.put(`/api/pay_modes/${this.payMode.id}`, this.payMode).then(this.fetchPayModes);
      } else {
        axios.post('/api/pay_modes', this.payMode).then(this.fetchPayModes);
      }
      this.payMode = { mode: '' };
      this.editMode = false;
    },
    editPayMode(payMode) {
      this.payMode = { ...payMode };
      this.editMode = true;
    },
    deletePayMode(id) {
      axios.delete(`/api/pay_modes/${id}`).then(this.fetchPayModes);
    }
  },
  mounted() {
    this.fetchPayModes();
  }
};
</script>