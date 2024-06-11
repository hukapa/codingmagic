<!-- dashboard -->
<script lang="ts">
  export let data;
  import { onMount, setContext } from "svelte";
  import CourseGrid from "$lib/Components/Dashboard/CourseGrid.svelte";
  import Header from "$lib/Components/Dashboard/Header.svelte";
  import Navbar from "$lib/Components/Dashboard/Navbar.svelte";
  import { goto } from "$app/navigation";
  import WelcomeModal from "$lib/Components/Dashboard/WelcomeModal.svelte";
  import SearchBar from "$lib/Components/Dashboard/SearchBar.svelte";

  const { supabase, session } = data;

  setContext("supabaseContext", { supabase, session });

  let shouldShowModal = true;
  let searchTerm = "";

  console.log(supabase);
  console.log(session);

  if (session !== null) {
    console.log("session is not null");
  } else {
    console.log("session is null");
    goto("/login");
  }

  onMount(async () => {
    const hasSeenWelcome = localStorage.getItem("has_seen_welcome");
    console.log("Has seen welcome:");
    console.log(hasSeenWelcome);
    if (hasSeenWelcome === "true") {
      shouldShowModal = false;
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .select("has_seen_welcome")
        .eq("user_id", session?.user.id);

      shouldShowModal = !data || !data[0].has_seen_welcome;
    }
  });
</script>

<main>
  <div class="dashboard">
    {#if shouldShowModal}
      <WelcomeModal {supabase} {session} />
    {/if}
    <Navbar {supabase} {session} />
    <div class="content">
      <div class="header-cooked">
        <Header>
          <div class="center-container">
            <SearchBar on:search={(e) => (searchTerm = e.detail)} />
          </div>
          <!-- Other header components: Notifications, Support, etc. -->
        </Header>
      </div>
      <!-- Main content area -->
      <CourseGrid {searchTerm} />
    </div>
  </div>
</main>

<style>
  .dashboard {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: black;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .content {
    flex: 1;
    padding: 1rem;
  }

  .header-cooked {
    padding-left: 80px;
  }

  .center-container {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
</style>
