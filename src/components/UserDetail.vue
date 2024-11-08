<script setup>
import { defineProps } from 'vue';
defineProps({
    user: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="user-detail">
        <h3><strong>{{ user.first_name }} {{ user.last_name }}</strong></h3>

        <img :src="user.avatar" class="avatar-img-detail me-3" alt="Avatar" />
        
        <h4>{{ user.email }}</h4>
    </div>
</template>