<!-- /settings +page.svelte -->
<script lang="ts">
  import Profile from "$lib/Components/settings/Profile.svelte";
  import Account from "$lib/Components/settings/Account.svelte";

  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  let isProfileActive = false;
  let isAccountActive = false;

  function toggleProfile() {
    isProfileActive = !isProfileActive;
    isAccountActive = false;
  }

  function toggleAccount() {
    isAccountActive = !isAccountActive;
    isProfileActive = false;
  }
</script>

<nav class="settings-nav">
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class={isProfileActive ? "active" : ""} href="" on:click={toggleProfile}
    >Profile</a
  >
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class={isAccountActive ? "active" : ""} href="" on:click={toggleAccount}
    >Account</a
  >
</nav>

<div class="settings-content">
  {#if isProfileActive}
    <Profile {supabase} {session} />
  {:else if isAccountActive}
    <Account {supabase} {session} />
  {/if}
</div>

<style>
  .settings-nav {
    background-color: #201c29; /* Dark background */
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .settings-nav a {
    color: #9466ff; /* Purple text */
    text-decoration: none;
    margin: 0 15px;
    font-weight: 600;
    transition: color 0.2s; /* Smooth color transition */
  }

  .settings-nav a:hover,
  .settings-nav a.active {
    color: #d4c7e8; /* Lighter purple on hover/active */
  }

  .settings-content {
    background-color: #2d2741; /* Slightly lighter background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow */
  }
</style>
