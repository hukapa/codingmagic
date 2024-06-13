<script lang="ts">
  import { goto } from "$app/navigation";
  import MonacoEditor from "./MonacoEditor.svelte";
  import OutputComponent from "./OutputComponent.svelte";

  let code: string = `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}`;
  let currentTab: "theory" | "practice" = "theory";
</script>

<main>
  <div class="container">
    <div class="content-container">
      <div class="tab-container">
        <button
          class="tab-button"
          class:active={currentTab === "theory"}
          on:click={() => (currentTab = "theory")}
        >
          <i class="fas fa-book-open"></i>
          Theory
        </button>
        <button
          class="tab-button"
          class:active={currentTab === "practice"}
          on:click={() => (currentTab = "practice")}
        >
          <i class="fas fa-code"></i>
          Practice
        </button>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <button 
          class="back-button"
          on:click={() => {
            goto("/dashboard");
          }}
        >
          <i class="fas fa-arrow-left"></i>
          Back to Dashboard
        </button>
      </div>
      <div class="content">
        {#if currentTab === "theory"}
          <div class="theory-content">
            <h1>Mastering the Art of C# Magic</h1>
            <h2>Getting Started</h2>
            <p>
              C# is an object-oriented programming language developed by
              Microsoft. It is part of the .NET framework and is widely used for
              building various types of applications, such as Windows desktop
              applications, web applications, mobile apps, and games.
            </p>
            <h2>Basic Syntax</h2>
            <p>
              C# syntax is similar to other C-style languages like C++ and Java.
              Here's a simple "Hello, World!" program in C#:
            </p>
            <h2>Object-Oriented Programming</h2>
            <p>
              C# is an object-oriented language, which means that it supports
              concepts like classes, objects, inheritance, and polymorphism.
              These concepts help in writing modular, reusable, and scalable
              code.
            </p>
          </div>
        {:else}
          <div class="practice-content">
            <div class="editor-container">
              <MonacoEditor {code} language="csharp" theme="vs-dark" />
            </div>
            <div class="output-container">
              <h2>Output</h2>
              <OutputComponent {code} />
            </div>
          </div>
        {/if}
      </div>
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
    position: relative;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .content-container {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 40px;
    border-radius: 10px;
    max-width: 800px;
    text-align: center;
    z-index: 100;
  }

  .tab-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .tab-button {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 8px 16px;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 4px;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    cursor: pointer;
    margin: 0 10px;
  }

  .tab-button.active {
    background-color: #fff;
    color: #333;
  }

  .tab-button i {
    margin-right: 8px;
  }

  .content {
    max-width: 700px;
    margin: 0 auto;
  }

  .theory-content {
    text-align: left;
  }

  .theory-content h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .theory-content p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .practice-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .output-container {
    width: 100%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    text-align: left;
  }

  .output-container h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
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
  .monaco-editor .view-lines {
    padding-left: 0 !important;
  }

  .editor-container {
    width: 40vw;
    height: 500px;
    margin-bottom: 20px;
  }

  .output-container {
    width: 100%;
    max-height: 300px;
    overflow: auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    text-align: left;
  }
  .back-button {
    display: inline-flex; 
    align-items: center; 
    padding: 10px 15px;
    background-color: #333;
    color: white; 
    text-decoration: none; 
    border-radius: 5px; 
    transition: background-color 0.3s ease;
  }

  .back-button:hover {
    background-color: #555; 
  }

  .back-button i {
    margin-right: 8px; 
  }
</style>
