<!-- dashboard -->
<script lang="ts">
  export let data;
  import { setContext } from "svelte";
  import CourseGrid from "$lib/Components/Dashboard/CourseGrid.svelte";
  import Header from "$lib/Components/Dashboard/Header.svelte";
  import Navbar from "$lib/Components/Dashboard/Navbar.svelte";

  const { supabase, session } = data;

  setContext("supabaseContext", { supabase, session });

  let username = session?.user.user_metadata.name;

  console.log(supabase);
  console.log(session);
</script>

<main>
  <div class="dashboard">
    <Navbar {supabase} {session} {username} />
    <div class="content">
      <div class="header-cooked">
        <Header>
          <!-- Other header components: Notifications, Support, etc. -->
        </Header>
      </div>
      <!-- Main content area -->
      <CourseGrid />
    </div>
  </div>
</main>

<style>
  .dashboard {
    display: flex;
    height: 100%;
    width: 100%;
    /* background-image: url(/CodingMagic-1.jpg);
    background-size: cover; */
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
</style>
