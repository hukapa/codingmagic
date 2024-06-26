<!--Component Navbar.svelte -->
<script lang="ts">
  export let supabase: any;
  export let session:any;
  import { goto, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
  import Avatar from "../Avatar.svelte";
  import { coursesStore } from "../../../routes/dashboard/stores";

  let currentUsername = "";

  interface ProfileData {
    avatar_url: string;
  }

  let avatarUrl: string | null = null;
  let expanded = false;
  function toggleExpand() {
    expanded = !expanded;
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    goto("/login");
  }

  supabase.auth.onAuthStateChange(async (event: string, session: any) => {
    if (event === "SIGNED_IN") {
      console.log("signed in");
      invalidateAll();
    }

    if (event === "SIGNED_OUT") {
      invalidateAll();
      console.log("signed out");
    }
  });

  $: if (session?.user) {
    supabase
      .from("profiles")
      .select("avatar_url")
      .eq("user_id", session.user.id)
      .single()
      .then(({ data, error }: { data: ProfileData | null; error: any }) => {
        if (error) {
          console.error("Error fetching avatar:", error);
        } else if (data) {
          avatarUrl = data.avatar_url;
        }
      });
  }

  onMount(async () => {
    updateUsername();
  });

  coursesStore.subscribe(() => {
    updateUsername();
  });

  async function updateUsername() {
    const { error, data } = await supabase
      .from("profiles")
      .select("username")
      .eq("user_id", session?.user.id)
      .single();

    if (error) {
      console.error("Error fetching username:", error);
      currentUsername = "Failed to load Username";
    } else if (data) {
      currentUsername = data.username;
    } else {
      currentUsername = "Username not found";
    }
  }
</script>

<nav
  class="navbar"
  class:expanded
  on:mouseenter={toggleExpand}
  on:mouseleave={toggleExpand}
>
  <div class="top">
    <div class="avatar-container">
      {#if avatarUrl}
        <Avatar {supabase} url={avatarUrl} size={6} />
      {:else}
        <img src="/avatar.png" alt="User Avatar" class="avatar" />
      {/if}
      <span class="username">{currentUsername}</span>
    </div>
  </div>
  <div class="nav-items">
    <ul class:centralized={!expanded}>
      <li>
        <a href="/">
          <i class="icon fas fa-user-astronaut"></i>
          <span class={expanded ? "label" : "label hidden"}>Coding Magic</span>
        </a>
      </li>
      <li>
        <a href="">
          <i class="icon fas fa-bookmark"></i>
          <span class={expanded ? "label" : "label hidden"}>Favorites</span>
        </a>
      </li>
      <li>
        <a href="/settings">
          <i class="icon fas fa-magic"></i>
          <span class={expanded ? "label" : "label hidden"}>Settings</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="bottom">
    <button class="sign-out" on:click={handleSignOut}>Sign Out</button>
  </div>
</nav>

<style>
  .navbar {
    width: 80px;
    background-color: #4b2d72;
    color: #fff;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
  }

  .navbar.expanded {
    width: 200px;
    z-index: 10;
  }

  .top {
    padding: 1rem;
    text-align: center;
  }

  .avatar-container {
    text-align: center;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
  }

  .username {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    color: #d8b3ff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-top: 0.5rem;
  }

  .nav-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hidden {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin-bottom: 2rem;
  }

  li a {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #fff;
    transition: background-color 0.3s ease;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: #d8b3ff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  ul.centralized .icon {
    font-size: 2rem;
  }

  .label {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .navbar.expanded .label {
    opacity: 1;
  }

  .bottom {
    padding: 1rem;
    text-align: center;
  }

  .sign-out {
    background-color: #9b59b6;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .sign-out:hover {
    background-color: #8e44ad;
  }
</style>
