<script lang="ts">
import { signIn } from '../lib/auth';

export default {
  name: 'SignInView',
  data() {
    return {
      userName: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    handleFormSubmit() {
      if (this.isLoading) { return; }

      this.isLoading = true;
      this.errorMessage = '';

      signIn({
        username: this.userName,
        password: this.password,
      })
        .then((res) => {
          console.log('Success: ', res);

          this.$router.replace('/forums');
          this.isLoading = false;
        })
        .catch((err) => {
          console.log('Error: ', err);

          if (err.response?.data?.message) {
            this.errorMessage = err.response?.data?.message;
          } else if (err.code === 'ERR_NETWORK') {
            this.errorMessage = 'Network error, please check your internet connection.';
          } else {
            this.errorMessage = 'Something went wrong, please try again.';
          }

          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <main class="h-screen flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Sign In</h2>
        <div v-if="errorMessage !== ''" class="w-full max-w-xs">
          <div class="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{errorMessage}}</span>
            </div>
          </div>
        </div>
        <form
          v-on:submit.prevent="handleFormSubmit"
          class="flex flex-col gap-4"
        >
          <div class="form-control w-full max-w-xs">
            <label for="username" class="pb-1 label-text">Username</label>
            <input v-model="userName" required id="username" type="text" placeholder="Type username here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label for="password" class="pb-1 label-text">Password</label>
            <input v-model="password" required id="password" type="password" placeholder="Type password here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <button
              type="submit"
              class="btn btn-primary"
              v-bind:class="{ loading: isLoading }"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
