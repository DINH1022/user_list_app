<script setup>
import { ref, onMounted, computed } from 'vue'
import {filterUsers} from '@/services/userSearchService.js'
import { getPaginatedData, getTotalPages, switchPage} from '@/services/paginationService.js'
import { fetchAllUsers } from '@/services/usersApiService.js';

const USERS_PER_PAGE = 2
const allUsers = ref([])
const filteredUsers = ref([])
const currentPage = ref(1)
const searchInput = ref('')

const loadUsers = async () => {
  try {
    allUsers.value = await fetchAllUsers()    
    filteredUsers.value = [...allUsers.value]
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const paginatedUsers = computed(() => {
  return getPaginatedData(filteredUsers.value, currentPage.value, USERS_PER_PAGE)
})

const totalPages = computed(() => {
  return getTotalPages(filteredUsers.value.length, USERS_PER_PAGE)
})

const searchUsers = () => {
  filteredUsers.value = filterUsers(allUsers.value,searchInput.value)
  currentPage.value = 1
}

const changePage = (page) => {
  currentPage.value = switchPage(page, totalPages, currentPage)
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-between align-items-center p-3">
        <h5>Home</h5>
        <div class="d-flex">
          <input 
            v-model="searchInput"
            type="text" 
            class="form-control me-2" 
            placeholder="Search users ..."
            @keyup.enter="searchUsers">
          <button 
            class="btn btn-outline-success"
            @click="searchUsers">Search</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="col-wrapper">
          <div class="side-title">Side Title</div>
          <div class="side-content">side content</div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="col-wrapper">
          <div class="main-title">Main Title</div>
          <div class="info-wrapper">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Avatar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="paginatedUsers.length === 0">
                    <td colspan="5" class="no-results">Not found</td>
                  </tr>
                  <tr v-for="user in paginatedUsers" :key="user.id">
                    <td>{{ user.displayId }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td><img :src="user.avatar" class="avatar-img" alt="Avatar"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <nav v-if="totalPages > 0">
              <ul class="pagination justify-content-left">
                <li :class="['page-item', { disabled: currentPage === 1 }]">
                  <a class="page-link" href="#" @click.prevent="changePage('prev')">&laquo;</a>
                </li>
                <li v-for="page in totalPages" 
                    :key="page" 
                    :class="['page-item', { active: currentPage === page }]">
                  <a class="page-link" 
                     href="#" 
                     @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li :class="['page-item', { disabled: currentPage === totalPages }]">
                  <a class="page-link" href="#" @click.prevent="changePage('next')">&raquo;</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/UserList.css';
</style>