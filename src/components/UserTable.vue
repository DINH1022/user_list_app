<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    users: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(['user-selected']);
</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead class="table-primary">
                <tr>
                    <th>ID</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-if="users.length === 0">
                    <td colspan="5" class="no-results">Not found</td>
                </tr>
                <tr v-for="user in users" :key="user.id" @click="emit('user-selected', user)" style="cursor: pointer" >
                    <td>{{ user.displayId }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <img :src="user.avatar" class="avatar-img" alt="Avatar" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>