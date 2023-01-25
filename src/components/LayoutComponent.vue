<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="drawer h-full">
    <input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300 fixed z-10">
        <div class="flex-none lg:hidden">
          <label for="mobile-drawer" class="btn btn-square btn-ghost" v-on:click="toggleOverflow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">{{ title }}</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li>
              <button type="button" class="tooltip tooltip-bottom p-0" v-bind:data-tip="auth?.firstName">
                <div class="avatar w-8 h-8 flex-none">
                  <div class="rounded-full">
                    <img
                      v-if="auth"
                      v-bind:src="auth.image"
                      v-bind:alt="auth.firstName"
                    />
                  </div>
                </div>
              </button>
            </li>
            <li>
              <label for="sign-out-modal">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="fa-xs text-gray-400" />
                <span class="text-sm text-gray-400">Sign Out</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-20">
        <slot />
      </div>
    </div>
    <div class="drawer-side">
      <label for="mobile-drawer" class="drawer-overlay" v-on:click="toggleOverflow" />
      <ul class="menu p-4 w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li>
          <button type="button" class="flex items-center tooltip tooltip-bottom" v-bind:data-tip="auth?.firstName">
            <div class="avatar w-8 h-8 flex-none">
              <div class="rounded-full">
                <img
                  v-if="auth"
                  v-bind:src="auth.image"
                  v-bind:alt="auth.firstName"
                />
              </div>
            </div>
            <span class="text-sm text-gray-400">{{ auth?.firstName }} {{ auth?.lastName }}</span>
          </button>
        </li>
        <li>
          <label for="sign-out-modal">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="fa-xs text-gray-400" />
            <span class="text-sm text-gray-400">Sign Out</span>
          </label>
        </li>
      </ul>
    </div>

    <!-- Sign Out Modal -->
    <input type="checkbox" id="sign-out-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="sign-out-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-md text-gray-300 font-bold">Confirmation</h3>
        <p class="text-sm text-gray-300 py-4">Do you want to sign out?</p>
        <div class="flex justify-end gap-2">
          <button v-on:click="handleSignOut" type="button" class="btn btn-primary btn-sm">Yes</button>
          <label for="sign-out-modal" class="btn btn-sm">No</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, ['auth']),
  },
  methods: {
    ...mapActions(useAuthStore, ['clearAuth']),
    toggleOverflow() {
      const overFlowHidden = document.body.style.getPropertyValue('overflow-y');

      if (!overFlowHidden || overFlowHidden === 'auto' || overFlowHidden === 'scroll') {
        document.body.style.overflowY = 'hidden';
      }

      if (overFlowHidden === 'hidden') {
        document.body.style.overflowY = 'auto';
      }
    },
    handleSignOut() {
      this.clearAuth();
      this.$router.replace('/auth/signin');
    },
  },
};
</script>
