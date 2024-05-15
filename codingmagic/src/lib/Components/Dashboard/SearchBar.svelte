<!-- SearchBar.svelte -->
<div class="search-bar-container">
  <input type="text" placeholder="Search for a course" class="search-input" />
  <button class="search-btn">
    <i class="fas fa-search"></i>
  </button>
</div>

<style>
  .search-bar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    margin: 0 auto;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .search-btn {
    background-color: #6a3093;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .search-btn:hover {
    background-color: #8e44ad;
  }

  .search-btn i {
    font-size: 1.2rem;
  }
</style>
