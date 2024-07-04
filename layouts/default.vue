<template>
  <Header />
  <div class="content">
    <div class="sidebar_wrapper"> <!-- Lagt til for å holde sidebar isolert fra layouten -->
      <sideBar />
    </div>
    <div class="slot_wrapper">
      <div v-if="shouldShowLoginPrompt" class="login-prompt">
        <h1>Welcome to XT Gates</h1>
        <p>Please register a username to ensure proper logging of work.</p>
        <NuxtLink to="/cookiepolicy" class="cookie-policy-link">View our Cookie Policy</NuxtLink>
      </div>
      <slot v-else /> <!-- Her ligger siden som hentes fra page mappen -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import sideBar from '@/components/sideBar.vue';

const authStore = useAuthStore();
const route = useRoute();

const isLoggedIn = authStore.isLoggedIn();
const shouldShowLoginPrompt = computed(() => !isLoggedIn.value && route.path !== '/cookiepolicy');
</script>

<style scoped>
body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.content {
  padding-top: var(--headerHeight); /* Variablelen ligger i assets/colors.css */
  display: flex; /* Flexbox for the 2 items sidebar, and the rest of the content */
  background-color: whitesmoke;
}

.slot_wrapper {
  flex: 6; /* 5/1 fordeling mellom sidebar og slot */
  margin-left: 3%;
  margin-right: 3%;
  justify-content: center;
}

.sidebar_wrapper {
  width: 12%;
  flex: 1;
}

.login-prompt {
  text-align: center;
  margin-top: 50px;
  width: 82%;
}

.login-prompt h1 {
  font-size: 2em;
  color: #333;
}

.login-prompt p {
  font-size: 1.2em;
  color: #555;
}

.cookie-policy-link {
  display: block;
  margin-top: 20px;
  font-size: 1em;
  color: #007BFF;
  text-decoration: none;
}

.cookie-policy-link:hover {
  text-decoration: underline;
}
</style>
