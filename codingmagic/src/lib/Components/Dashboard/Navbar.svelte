<!-- Navbar.svelte -->
<script lang="ts">
  let expanded = false;

  function toggleExpand() {
    expanded = !expanded;
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
      <img src="/avatar.png" alt="User Avatar" class="avatar" />
      <span class="username">User Name</span>
    </div>
  </div>
  <div class="nav-items">
    <ul class:centralized={!expanded}>
      <li>
        <a href="/profile">
          <i class="icon fas fa-user-astronaut"></i>
          <span class={expanded ? "label" : "label hidden"}>Profile</span>
        </a>
      </li>
      <li>
        <a href="/bookmark">
          <i class="icon fas fa-star"></i>
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
    <button class="sign-out">Sign Out</button>
  </div>
</nav>

<style>
  .navbar {
    width: 80px;
    background-color: #6a3093;
    color: #fff;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .navbar.expanded {
    width: 200px;
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
  margin: 0 auto; /* center the avatar horizontally */
}

.username {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  margin-top: 0.5rem;
}

  .nav-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hidden{
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
    background-color: rgba(216, 179, 255, 0.2);
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
