<script setup>
import { ref, onMounted, computed } from "vue";
import { filterUsers } from "@/services/userSearchService.js";
import {
  getPaginatedData,
  getTotalPages,
  switchPage,
} from "@/services/paginationService.js";
import { fetchAllUsers } from "@/services/usersApiService.js";
import SearchBar from '@/components/SearchBar.vue';
import UserTable from '@/components/UserTable.vue';
import UserPagination from "@/components/UserPagination.vue";
import UserDetail from "@/components/UserDetail.vue";


const USERS_PER_PAGE = 2;
const allUsers = ref([]);
const filteredUsers = ref([]);
const currentPage = ref(1);
const searchInput = ref("");

const loadUsers = async () => {
  try {
    allUsers.value = await fetchAllUsers();
    filteredUsers.value = [...allUsers.value];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
const selectedUser = ref(null);
const showUserDetail = (user) => {
  selectedUser.value = user;
};
const backToTable = () => {
  selectedUser.value = null;
};
const paginatedUsers = computed(() => {
  return getPaginatedData(
    filteredUsers.value,
    currentPage.value,
    USERS_PER_PAGE
  );
});

const totalPages = computed(() => {
  return getTotalPages(filteredUsers.value.length, USERS_PER_PAGE);
});

const searchUsers = () => {
  filteredUsers.value = filterUsers(allUsers.value, searchInput.value);
  currentPage.value = 1;
};

const changePage = (page) => {
  currentPage.value = switchPage(page, totalPages, currentPage);
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="container-fluid">

    <div class="row top-header">
      <div class="col-12">
        <p class="text-center">VueJs</p>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-between align-items-center p-3">
        <h5><strong>Home</strong></h5>
        <SearchBar v-model:searchInput="searchInput" @search="searchUsers" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="col-wrapper">
          <div class="side-title">Side</div>
          <div class="side-content">...</div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="col-wrapper">
          <div class="main-title">Main</div>
          <div class="info-wrapper">
            <template v-if="!selectedUser">
            <UserTable :users="paginatedUsers" @user-selected="showUserDetail"/>
            <UserPagination :current-page="currentPage" :total-pages="totalPages" @change-page="changePage" />
            </template>
            <UserDetail v-else :user="selectedUser" @back="backToTable"/>
          </div>
        </div>
      </div>

    </div>
    
    <div class="row footer">
      <div class="col-12">
        <p class="text-center footer-text mb-0">Copyright © &lt;QuangVinh&gt;</p>
      </div>
    </div>
  </div>
</template>
