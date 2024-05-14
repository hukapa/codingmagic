<!-- SearchBar.svelte -->
<div class="search-bar">
    <input type="text" placeholder="Search for a course" />
    <i class="fas fa-search search-icon"></i>
  </div>
  
  <style>
    .search-bar {
      position: relative;
      display: flex;
      align-items: center;
    }
  
    input {
      width: 100%;
      padding: 0.5rem 2rem 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  
    .search-icon {
      position: absolute;
      right: 0.5rem;
      color: #888;
    }
  </style>