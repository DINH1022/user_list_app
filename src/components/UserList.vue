<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const USERS_PER_PAGE = 2
const allUsers = ref([])
const filteredUsers = ref([])
const currentPage = ref(1)
const searchInput = ref('')

const fetchAllUsers = async () => {
  try {
    const firstPage = await axios.get('https://reqres.in/api/users?page=1')
    allUsers.value = [...firstPage.data.data]
    
    const promises = []
    for(let i = 2; i <= firstPage.data.total_pages; i++) {
      promises.push(axios.get(`https://reqres.in/api/users?page=${i}`))
    }

    const responses = await Promise.all(promises)
    responses.forEach(response => {
      allUsers.value = [...allUsers.value, ...response.data.data]
    })
    
    filteredUsers.value = [...allUsers.value]
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * USERS_PER_PAGE
  const end = start + USERS_PER_PAGE
  return filteredUsers.value.map((user, index) => ({
    ...user,
    displayId: index + 1
  })).slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / USERS_PER_PAGE)
})

const searchUsers = () => {
  const searchTerm = searchInput.value.trim().toLowerCase()
  if (searchTerm === '') {
    filteredUsers.value = [...allUsers.value]
  } else {
    filteredUsers.value = allUsers.value.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm) ||
      user.last_name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    )
  }
  currentPage.value = 1
}

const changePage = (page) => {
  if (page === 'prev' && currentPage.value > 1) {
    currentPage.value--
  } else if (page === 'next' && currentPage.value < totalPages.value) {
    currentPage.value++
  } else if (typeof page === 'number') {
    currentPage.value = page
  }
}

onMounted(() => {
  fetchAllUsers()
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
.side-content{
    background-color : #f8f9fa;
    padding : 20px;
    min-height: 70vh;
}

.main-title, .side-title{
    background-color:#0d6efd;
    color : white;
    padding : 15px;
}
.pagination{
    margin-top : 20px;
    margin-left : 15px;
}

.no-results {
    text-align: center;
    padding: 20px;
    color: #666;
}
.table td {
    vertical-align: middle;
}
.avatar-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
}
.row.mb-3 {
    background-color: #f0f0f0; 
}
.col-wrapper, .row.mt-3  {
    border : 1px solid rgb(183, 179, 179);
    border-radius: 4px;
}

.info-wrapper{
    padding : 20px;
    min-height: 70vh;
}
</style>