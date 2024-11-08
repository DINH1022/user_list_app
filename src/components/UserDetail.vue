<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    user: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['back']);
</script>

<template>
    <div class="user-detail">
        <button class="btn btn-secondary mb-3" @click="emit('back')">
            &larr; Back to Users
        </button>
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <img :src="user.avatar" class="avatar-img me-3" alt="Avatar" />
                <h3 class="mb-0">{{ user.first_name }} {{ user.last_name }}</h3>
            </div>
            <div class="card-body">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>ID:</th>
                            <td>{{ user.id }}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <th>First Name:</th>
                            <td>{{ user.first_name }}</td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>{{ user.last_name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>