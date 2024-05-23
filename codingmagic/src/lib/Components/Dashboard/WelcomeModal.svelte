<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade, scale } from "svelte/transition";
  export let supabase;
  export let session;
  export let username;

  const showModal = writable(true);

  onMount(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("has_seen_welcome")
      .eq("user_id", session?.user.id);

    if (data && data[0].has_seen_welcome) {
      showModal.set(false);
      localStorage.setItem("has_seen_welcome", "true");
    } else {
      showModal.set(true);
      localStorage.setItem("has_seen_welcome", "false");
    }
  });

  const closeModal = async () => {
    showModal.set(false);
    localStorage.setItem("has_seen_welcome", "true");
    await supabase
      .from("profiles")
      .update({ has_seen_welcome: true })
      .eq("user_id", session.user.id);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $showModal}
  <div class="modal-overlay" transition:fade={{ duration: 200 }}>
    <div class="modal-content" transition:scale={{ duration: 300 }}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="modal" on:click|stopPropagation>
        <h2 class="modal-title">Greetings, Mystical Wanderer!</h2>
        <p class="modal-text">
          You have stumbled upon a realm where dreams and reality intertwine.
          Prepare to embark on a journey filled with wonder and enchantment,
          {username}. Let your imagination soar as you unlock the secrets of
          this magical world.
        </p>
        <button class="modal-button" on:click={closeModal}>
          <span class="button-text">Unleash the Magic</span>
          <span class="button-magic">&#9957;</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  /* Modal Content */
  .modal-content {
    position: relative;
    z-index: 10000;
  }

  /* Modal */
  .modal {
    background-color: #8b5cf6;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    animation: modal-glow 2s infinite;
  }

  .modal-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  .modal-text {
    font-size: 18px;
    margin-bottom: 30px;
  }

  .modal-button {
    background-color: #6d28d9;
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }

  .modal-button:hover {
    background-color: #5b21d6;
  }

  .modal-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modal-button:hover::before {
    opacity: 1;
  }

  .button-text {
    margin-right: 10px;
  }

  .button-magic {
    font-size: 24px;
    animation: sparkle 1s infinite;
  }

  @keyframes sparkle {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes modal-glow {
    0% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
    }
    100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }
  }
</style>
