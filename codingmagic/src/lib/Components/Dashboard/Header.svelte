<script>
  import SearchBar from "./SearchBar.svelte";
</script>

<header>
  <div class="header-content">
    <slot />
    <div class="header-icons">
      <i class="fas fa-bell notification-icon"></i>
      <i class="fas fa-question-circle support-icon"></i>
    </div>
  </div>
</header>

<style lang="scss">
  $primary-color: #6a3093;
  $secondary-color: #9d7ad3;
  $accent-color: #ffa500;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: $primary-color;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    animation: headerShimmer 5s infinite linear;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba($accent-color, 0.4),
        transparent
      );
      transition: left 0.5s ease-in-out;
    }

    @keyframes headerShimmer {
      0% {
        background-color: $primary-color;
      }
      50% {
        background-color: darken($primary-color, 10%);
      }
      100% {
        background-color: $primary-color;
      }
    }
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 1200px; 
  }

  .header-icons {
    display: flex;
    align-items: center;
  }

  .notification-icon,
  .support-icon {
    font-size: 2rem;
    color: $accent-color;
    margin-left: 1rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }
</style>
