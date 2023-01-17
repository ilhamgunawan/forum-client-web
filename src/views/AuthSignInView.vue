<template>
  <main class="h-screen flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Sign In</h2>
        <form class="flex flex-col gap-4">
          <div class="form-control w-full max-w-xs">
            <label for="username" class="pb-1 label-text">Username</label>
            <input id="username" type="text" placeholder="Type username here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label for="password" class="pb-1 label-text">Password</label>
            <input id="password" type="password" placeholder="Type password here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <button type="submit" class="btn btn-primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
