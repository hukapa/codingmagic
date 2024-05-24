<!-- /profile +page.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import Avatar from "$lib/Components/Avatar.svelte";
  import BackArrow from "$lib/Icons/BackArrow.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let data;
  export let form;
  let { session, supabase, profile } = data;
  $: ({ session, supabase, profile } = data);

  let profileForm: HTMLFormElement;
  let loading = false;
  let username: string = profile?.username ?? "";
  let avatarUrl: string = profile?.avatar_url ?? "";

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="wrapper">
  <div class="page-container">
    <div class="go-back">
      <button on:click={()=>goto("/dashboard")}> Back </button>
    </div>
    <div class="form-container">
      <div class="form-widget">
        <div class="form-header">
          <h2 class="form-title">Update Your Magical Profile</h2>
        </div>
        <form
          class="form-widget"
          method="post"
          action="?/update"
          use:enhance={handleSubmit}
          bind:this={profileForm}
        >
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="text"
              value={session.user.email}
              disabled
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form?.username ?? username}
              class="form-input"
            />
          </div>	
          <div class="form-group">
            <input
              type="submit"
              class="button primary"
              value={loading ? "Casting Spell..." : "Update Profile"}
              disabled={loading}
            />
          </div>
        </form>
        <Avatar
          {supabase}
          bind:url={avatarUrl}
          size={10}
          on:upload={() => {
            profileForm.requestSubmit();
          }}
        />
        <form method="post" action="?/signout" use:enhance={handleSignOut}>
          <div class="form-group">
            <button class="button" disabled={loading}>Sign Out</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;700&display=swap");

  $primary-color: #6a3093;
  $secondary-color: #9d7ad3;
  $accent-color: #ffa500;
  $background-color: #191c29;

  .page-container {
    background-color: $background-color;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Roboto", sans-serif;
  }

  .form-container {
    max-width: 600px; /* Aumentar a largura do container */
    width: 100%;
    padding: 2rem;
  }

  .form-widget {
    background-color: #282c3f;
    border-radius: 6px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    color: white;
    display: flex; /* Adicionar layout flexível */
    flex-direction: column;
  }

  .form-header {
    background-color: $primary-color;
    color: #fff;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    font-family: "Montserrat", sans-serif;
  }

  .form-group {
    padding: 1rem;
    display: flex; /* Adicionar layout flexível */
    flex-direction: column;
  }

  .form-label {
    display: block;
    font-weight: bold;
    color: $secondary-color;
    margin-bottom: 0.5rem;
  }

  .form-input {
    max-width: 80%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: #191c29;
    color: #fff;
  }

  .button {
    background-color: $secondary-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    width: 100%;
  }

  .button:hover {
    background-color: darken($secondary-color, 10%);
  }

  .button.primary {
    background-color: $primary-color;
  }

  .button.primary:hover {
    background-color: darken($primary-color, 10%);
  }
</style>
