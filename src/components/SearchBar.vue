<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    searchInput: {
        type: String,
        required: true
    }
});
const emit = defineEmits(['update:searchInput','search']);

</script>

<template>
    <div class="d-flex">
        <input 
            :value="searchInput"
            @input="e => emit('update:searchInput', e.target.value)"
            type="text" 
            class="form-control me-2" 
            placeholder="Search users ..."
            @keyup.enter="$emit('search')" 
        />
        <button class="btn btn-outline-success" @click="emit('search')">
            Search
        </button>
    </div>
</template>