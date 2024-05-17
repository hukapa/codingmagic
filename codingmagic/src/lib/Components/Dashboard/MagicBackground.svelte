<script>
  import { onMount } from "svelte";

  onMount(() => {
    for (let i = 0; i < 50; i++) {
      // Create 50 particles
      const particle = document.createElement("div");
      particle.classList.add("dust-particle");
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      document.body.appendChild(particle);
    }
  });
</script>

<div class="dust-particle"></div>
<div class="dust-particle"></div>
<div class="dust-particle"></div>
<div class="light-ray"></div>
<div class="floating-particle"></div>
<div class="floating-particle"></div>
<div class="floating-particle"></div>

<style>
  :global(main) {
    background: radial-gradient(ellipse at bottom, #150a25 0%, #000000 100%);
    color: #f0e6f6;
    font-family: "Cinzel", serif;
    filter: sepia(0.3);
    overflow: hidden;
  }

  /* Styles for dust particles */
  .dust-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #ffd700;
    border-radius: 50%;
    opacity: 0.5;
    z-index: 1;
    animation: dustFloat 8s ease-in-out infinite;
  }

  @keyframes dustFloat {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-10px) translateX(5px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }

  /* Styles for light rays */
  .light-ray {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    mix-blend-mode: screen; /* Blend with background colors */
    animation: shimmer 12s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.6;
    }
  }

  /* Styles for floating particles */
  .floating-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #ffd700;
    border-radius: 50%;
    opacity: 0.7;
    z-index: 1;
    animation: float 15s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-30px) translateX(15px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
</style>
