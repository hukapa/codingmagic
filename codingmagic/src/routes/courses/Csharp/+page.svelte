<!-- +page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";

  function startCourse() {
    goto("/courses/Csharp/lesson");
  }
</script>

<main>
  <div class="container">
    <div class="content">
      <h1>Master the Art of C# Magic</h1>
      <p>
        Embark on a mystical journey through the realm of C# programming. In
        this comprehensive course, you'll learn to wield the power of
        object-oriented programming, conjure console applications, and construct
        enchanting Windows desktop applications. Explore advanced incantations
        like LINQ, asynchronous programming, and more. By the end of your
        training, you'll possess the arcane knowledge to craft robust and
        efficient C# applications for various enchanted realms.
      </p>
      <button class="button" on:click={startCourse}>
        <i class="fas fa-hat-wizard"></i>
        Begin Your Magical Quest
      </button>
    </div>
  </div>
  <div class="background">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
    <div class="circle circle-4"></div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

  main {
    font-family: "Montserrat", sans-serif;
    margin: 0;
    padding: 0;
    background-image: url(/CodingMagic-3.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100vh;
    color: #fff;
    overflow: hidden;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  .content {
    max-width: 800px;
    text-align: center;
    padding: 40px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    background-color: #6a3093;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .button:hover {
    background-color: #9d7ad3;
  }

  .button i {
    margin-right: 8px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.5;
    animation: float 6s infinite ease-in-out;
  }

  .circle-1 {
    width: 200px;
    height: 200px;
    background-color: #ff9800;
    top: -100px;
    left: -100px;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 150px;
    height: 150px;
    background-color: #e91e63;
    top: 50%;
    left: -75px;
    animation-delay: 2s;
  }

  .circle-3 {
    width: 120px;
    height: 120px;
    background-color: #3f51b5;
    bottom: -60px;
    right: -60px;
    animation-delay: 4s;
  }

  .circle-4 {
    width: 80px;
    height: 80px;
    background-color: #4caf50;
    top: 20%;
    right: -40px;
    animation-delay: 6s;
  }

  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(50px, 50px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>
