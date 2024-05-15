<!-- dashboard -->
<script lang="ts">
  import Header from "$lib/Components/Dashboard/Header.svelte";
  import Navbar from "$lib/Components/Dashboard/Navbar.svelte";
  import SearchBar from "$lib/Components/Dashboard/SearchBar.svelte";


</script>

<main>
  <div class="dashboard">
    <Navbar />
    <div class="content">
      <Header>
        <SearchBar />
        <!-- Other header components: Notifications, Support, etc. -->
      </Header>
      <!-- Main content area -->
    </div>
  </div>
</main>

<style>
  .dashboard {
    display: flex;
    height: 100vh;
    background-color: #f8f8f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .content {
    flex: 1;
    padding: 1rem;
  }
</style>