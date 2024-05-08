<script lang="ts">
  import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
  } from "$env/static/public";
  import { createClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  let newPassword = "";
  let confirmPassword = "";
  let resetPasswordError = "";
  let passwordResetSuccessfully = "";

  const supabaseUrl = PUBLIC_SUPABASE_URL;
  const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      resetPasswordError = "Passwords do not match";
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error(error);
        resetPasswordError = error.message;
        return;
      }

      passwordResetSuccessfully = "Password reset successfully";
      console.log(passwordResetSuccessfully);

      // Redirect the user to the login page
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      resetPasswordError = "Failed to reset password";
    }
  }

  onMount(() => {
    // Get the token from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");

    if (!token) {
      resetPasswordError = "Invalid or missing token";
      return;
    }

    // Set the token in the Supabase client
    supabase.auth.setSession({
      access_token: token,
      refresh_token: token, // You can use the same token for both access and refresh
    });
  });
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<div class="wrapper">
  <header role="banner">
    <div id="cd-logo">
      <a href="/">
        <h1 style="font-size: large; color:white">CodingMagic</h1>
      </a>
    </div>
  
    <nav class="main-nav">
      <ul>
        <!-- inser more links here -->
        <li><a class="cd-signin" href="/login">Back to Login</a></li>
      </ul>
    </nav>
  </header>
  <div class="form-wrapper">
    <div class="form-container">
      <h1 style="font-weight: bold; font-size: 24px;">Reset Password</h1>
      <form on:submit|preventDefault>
        <div class="form-container">
          <div class="form-control">
            <input
              id="newPassword"
              type="password"
              placeholder="New Password"
              bind:value={newPassword}
              required
            />
          </div>
  
          <div class="form-control">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              bind:value={confirmPassword}
              required
            />
          </div>
          {#if resetPasswordError}
            <a href="/login" class="error">Something went wrong, click here to login</a>
          {:else if passwordResetSuccessfully}
            <p>{passwordResetSuccessfully}</p>
          {/if}
          {#if !resetPasswordError}
            <button type="submit" class="btn">Change Password</button>
          {/if}
        </div>
      </form>
    </div>
  </div>  
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: "Quicksand", sans-serif;
    vertical-align: baseline;
  }

  .wrapper{
    background-image: url(/CodingMagic-1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
  }

  .error {
    color: red;
  }

  .main-nav a.cd-signin {
    padding: 0.6em 1em;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 50em;
  }
  .main-nav a.cd-signin:active {
    scale: (0.95);
  }

  a {
    color: #2f889a;
    text-decoration: none;
  }

  /* -------------------------------- 

xcody-info 

-------------------------------- */

  #cody-info li a {
    display: block;
    width: 44px;
    height: 44px;
    position: relative;
    -webkit-transition: background 0.2s;
    -moz-transition: background 0.2s;
    transition: background 0.2s;
  }
  #cody-info li a:hover {
    background-color: #29889b;
  }

  /* -------------------------------- 

Main components 

-------------------------------- */
  header[role="banner"] {
    position: relative;
    height: 50px;
    background: #343642;
  }
  header[role="banner"] #cd-logo {
    float: left;
    margin: 4px 0 0 5%;
    /* reduce logo size on mobile and make sure it is left aligned with the transform-origin property */
    -webkit-transform-origin: 0 50%;
    -moz-transform-origin: 0 50%;
    -ms-transform-origin: 0 50%;
    -o-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);
  }
  header[role="banner"]::after {
    /* clearfix */
    content: "";
    display: table;
    clear: both;
  }
  @media only screen and (min-width: 768px) {
    header[role="banner"] {
      height: 80px;
    }
    header[role="banner"] #cd-logo {
      margin: 20px 0 0 5%;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }

  .main-nav {
    float: right;
    margin-right: 5%;
    width: 44px;
    height: 100%;
    background: url("../img/cd-icon-menu.svg") no-repeat center center;
    cursor: pointer;
  }
  .main-nav ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  .main-nav a {
    display: block;
    height: 50px;
    line-height: 50px;
    padding-left: 5%;
    background: #292a34;
    border-top: 1px solid #3b3d4b;
    color: #fff;
  }
  @media only screen and (min-width: 768px) {
    .main-nav {
      width: auto;
      height: auto;
      background: none;
      cursor: auto;
    }
    .main-nav ul {
      position: static;
      width: auto;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
      line-height: 80px;
    }
    .main-nav li {
      display: inline-block;
      margin-left: 1em;
    }
    .main-nav li:nth-last-child(2) {
      margin-left: 2em;
    }
    .main-nav a {
      display: inline-block;
      height: auto;
      line-height: normal;
      background: transparent;
    }
  }

  /* -------------------------------- 

-------------------------------- */

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .form-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
  }

  .form-control {
    margin-bottom: 1.5rem;
  }

  input {
    width: 91%;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  padding: 0 2rem;
}

  .form-wrapper .form-control {
    width: 100%;
  }

  .form-wrapper .btn {
    width: 100%;
  }
</style>
