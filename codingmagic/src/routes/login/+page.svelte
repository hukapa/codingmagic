<script lang="ts">
  import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
  } from "$env/static/public";
  import { createClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  import GitHub from "$lib/Icons/GitHub.svelte";
  import Discord from "$lib/Icons/Discord.svelte";
  import Google from "$lib/Icons/Google.svelte";
  import MagicStar from "$lib/Icons/MagicStar.svelte";

  const supabaseUrl = PUBLIC_SUPABASE_URL;
  const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let user: any;
  let email = "";
  let password = "";
  let isRightPanelActive = true;

  let index = 0,
    interval = 1000;

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star: any) => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  };

  for (const star of document.getElementsByClassName("magic-star")) {
    setTimeout(
      () => {
        animate(star);

        setInterval(() => animate(star), 1000);
      },
      index++ * (interval / 3)
    );
  }

  function toggleRightPanel() {
    isRightPanelActive = !isRightPanelActive;
  }
</script>

<div class="Container-Body">
  <div
    class={isRightPanelActive ? "container" : "container right-panel-active"}
    id="container"
  >
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <div class="social-container">
          <a href="#" class="social"><GitHub /></a>
          <a href="#" class="social"><Discord /></a>
          <a href="#" class="social"><Google /></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
        <h2>
          Create an account with a
          <span class="magic">
            <h3 class="magic-text"><a href="">Magic Link!</a></h3>
          </span>
        </h2>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <div class="social-container">
          <a href="#" class="social"><GitHub /></a>
          <a href="#" class="social"><Discord /></a>
          <a href="#" class="social"><Google /></a>
        </div>
        <span>or use your account</span>
        <input type="email" placeholder="Email" bind:value={email} />
        <input type="password" placeholder="Password" bind:value={password} />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn" on:click={toggleRightPanel}
            >Sign In</button
          >
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp" on:click={toggleRightPanel}
            >Sign Up</button
          >
          <h2>
            Create an account with a
            <span class="magic">
              <h3 class="magic-text"><a href="">Magic Link!</a></h3>
            </span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

  * {
    box-sizing: border-box;
  }

  .Container-Body {
    background-image: url(/CodingMagic-3.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 100vh;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  :root {
    --purple: rgb(123, 31, 162);
    --violet: rgb(103, 58, 183);
    --pink: rgb(244, 143, 177);
  }

  @keyframes background-pan {
    from {
      background-position: 0% center;
    }

    to {
      background-position: -200% center;
    }
  }

  @keyframes scale {
    from,
    to {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(180deg);
    }
  }

  h2 > .magic {
    display: inline-block;
    position: relative;
  }

  h2 > .magic > .magic-star {
    --size: clamp(20px, 1.5vw, 30px);

    animation: scale 700ms ease forwards;
    display: block;
    height: var(--size);
    left: var(--star-left);
    position: absolute;
    top: var(--star-top);
    width: var(--size);
  }

  h2 > .magic > .magic-star > svg {
    animation: rotate 1000ms linear infinite;
    display: block;
    opacity: 0.7;
  }

  h2 > .magic > .magic-star > svg > path {
    fill: var(--violet);
  }

  h2 > .magic > .magic-text {
    animation: background-pan 3s linear infinite;
    background: linear-gradient(
      to right,
      var(--purple),
      var(--violet),
      var(--pink),
      var(--purple)
    );
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid;
    background-color: #af07d9;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #c641ff;
    background: -webkit-linear-gradient(to right, #6604d6, #c641ff);
    background: linear-gradient(to right, #6604d6, #c641ff);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }

  .social-container a {
    fill: #af07d9;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
</style>
