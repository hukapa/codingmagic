<script lang="ts">
</script>

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
      <h1 style="font-weight: bold; font-size: 24px;">Confirm Email</h1>
      <div class="form-container">
        <div class="form-control">
          <h2>
            An email confirmation was sent to. Please check your inbox and
            follow the instructions to confirm your account.
            <br />
            <br />
            If you don't see the email, check your spam folder.
          </h2>
          <h1><h1 /></h1>
        </div>
      </div>
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

  .wrapper {
    background-image: url(/CodingMagic-1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
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
</style>
