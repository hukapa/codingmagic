<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleSearch(event: any) {
    dispatch("search", event.target.value);
  }
</script>

<div class="search-bar-container">
  <input
    type="text"
    placeholder="Search for a course"
    class="search-input"
    on:input={handleSearch}
  />
  <button class="search-btn">
    <i class="fas fa-search"></i>
  </button>
</div>

<style lang="scss">
  $primary-color: #6a3093;
  $secondary-color: #9d7ad3;
  $accent-color: #ffa500;

  .search-bar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $secondary-color;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    position: relative;
    overflow: hidden;

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

    &:hover::before {
      left: 100%;
    }
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
    background-color: transparent;
    color: $accent-color;

    &::placeholder {
      color: rgba($accent-color, 0.5);
    }
  }

  .search-btn {
    background-color: $primary-color;
    color: $accent-color;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 10px rgba($accent-color, 0.5);

    &:hover {
      background-color: darken($primary-color, 10%);
    }

    i {
      font-size: 1.2rem;
      animation: rotate 2s infinite linear;
      text-shadow: 0 0 10px rgba($accent-color, 0.5);
      animation: glow 2s ease-in-out infinite alternate;

      @keyframes glow {
        0% {
          text-shadow: 0 0 10px rgba($accent-color, 0.5);
        }
        100% {
          text-shadow: 0 0 20px rgba($accent-color, 1);
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
