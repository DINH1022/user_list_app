<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});
const emit = defineEmits(['change-page']);
</script>
<template>
    <nav v-if="totalPages > 0">
        <ul class="pagination justify-content-left">
            <li :class="['page-item', { disabled: currentPage === 1 }]">
                <a class="page-link" href="#" @click.prevent="emit('change-page','prev')">&laquo;</a>
            </li>
            <li v-for="page in totalPages" :key="page" :class="['page-item', { active: currentPage === page }]">
                <a class="page-link" href="#" @click.prevent="emit('change-page',page)">{{ page }}</a>
            </li>
            <li :class="['page-item',{ disabled: currentPage === totalPages }]">
                <a class="page-link" href="#" @click.prevent="emit('change-page','next')">&raquo;</a>
            </li>
        </ul>
    </nav>
</template>
