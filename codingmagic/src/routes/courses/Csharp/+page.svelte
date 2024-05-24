<script lang="ts">
  import { onMount } from "svelte";

  let currentLesson = 0;
  let codeVisible = false;

  const lessons = [
    {
      title: "The Essence of C#",
      theory:
        "C# is a versatile, object-oriented programming language used to create a wide range of applications.",
      example: `// Hello, world!
Console.WriteLine("Welcome to the realm of C#!");`,
      practice: "Write a C# program that prints your name to the console.",
    },
    {
      title: "Variables and Data Types",
      theory:
        "Variables store values, and data types define what kind of values they can hold.",
      example: `string name = "Merlin";
int age = 1000;
bool isWizard = true;`,
      practice:
        "Declare variables to store your favorite spell, its power level, and whether it's offensive or defensive.",
    },
    // Add more lessons here...
  ];

  function toggleCodeVisibility() {
    codeVisible = !codeVisible;
  }

  function nextLesson() {
    currentLesson = (currentLesson + 1) % lessons.length;
    codeVisible = false;
  }

  onMount(() => {
    // Optional: Add animations or effects here
  });
</script>

<div class="learning-page">
  <div class="lesson-container">
    <h1 class="lesson-title">{lessons[currentLesson].title}</h1>

    <p class="theory-text">{lessons[currentLesson].theory}</p>

    <button class="toggle-button" on:click={toggleCodeVisibility}>
      {codeVisible ? "Hide Example" : "Reveal Example"}
    </button>

    {#if codeVisible}
      <pre class="code-block">{lessons[currentLesson].example}</pre>
    {/if}

    <p class="practice-text">
      <strong>Practice:</strong>
      {lessons[currentLesson].practice}
    </p>

    <button class="next-button" on:click={nextLesson}> Next Lesson </button>
  </div>
</div>

<style>
  .learning-page {
    background-color: black;
    color: #f0e6d2;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Lora", serif;
  }

  .spell-container {
    background-color: rgba(51, 25, 85, 0.8);
    border: 2px solid #9d7ad3;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  .spell-title {
    font-family: "Cinzel Decorative", cursive;
    font-size: 2.5rem;
    color: #d4af37;
    margin-bottom: 1rem;
  }

  .spell-text {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .cast-button {
    background-color: #9b59b6;
    color: #fff;
    border: none;
    padding: 0.8rem 1.6rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .cast-button:hover {
    background-color: #8e44ad;
  }
  .lesson-container {
    /* ... */
    text-align: left; /* Align text to the left */
  }

  .theory-text,
  .practice-text {
    margin-bottom: 1rem;
  }

  .code-block {
    background-color: #191c29;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto; /* Enable horizontal scrolling for long code */
  }

  .toggle-button {
    /* ... (style like the other buttons) ... */
  }
</style>
