<script lang="ts">
  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  console.log(supabase)
  console.log(session)

  let y: number;
  let height: number;
  $: scroll = (y / height) * 100;

  let MenuActive = false;
  function toggleMenu() {
    MenuActive = !MenuActive;
  }

  let videoSource = "CodingMagic-vid-1.mp4";
</script>

<section class="home">
  <div
    class="img-parallax"
    style="background-image: url(/CodingMagic-LandingPage.jpg);"
  >
    <nav class={scroll < 50 ? "nav" : "nav affix"}>
      <div class="container">
        <div class="logo">
          <a href="#top">Coding Magic</a>
        </div>
        <div class={MenuActive ? "main_list show_list" : "main_list"}>
          <ul class="navlinks">
            <li><a href=""></a></li>
            {#if session !== null}
            <li><a href="/dashboard">Dashboard</a></li>
            {:else}
            <li><a href="/login">Login</a></li>
            {/if}
            <li><a href="#">Courses</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <button
          class:active={MenuActive}
          class="navTrigger"
          on:click={toggleMenu}
        >
          <i></i>
          <i></i>
          <i></i>
        </button>
      </div>
    </nav>
  </div>
</section>
<svelte:window bind:scrollY={y} bind:innerHeight={height} />

<section class="text1">
  <div>
    <h2 class="myH2">Coding Magic</h2>
    <h3 class="myH3">Never was that easy to learn Code!</h3>
  </div>
</section>

<section class="video-1">
  <video width="200px" height="100px" controls>
    <track kind="captions" />
    <source src={videoSource} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</section>

<section class="text1">
  <div>
    <h2 class="myH2">Coding Magic</h2>
    <h3 class="myH3">Never was that easy to learn Code!</h3>
  </div>
</section>

<section class="asd">
  <div
    class="img-parallax"
    style=" background-image: url(/CodingMagic-1.jpg);"
  ></div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,700");
  /*-- Inspiration taken from abdo steif -->
/* --> https://codepen.io/abdosteif/pen/bRoyMb?editors=1100*/

  /* Home section */

  button {
    all: unset;
  }

  .nav {
    width: 100%;
    height: 65px;
    position: fixed;
    line-height: 65px;
    text-align: center;
    font-family: "Quicksand", sans-serif;
  }

  .nav div.logo {
    float: left;
    width: auto;
    height: auto;
    padding-left: 3rem;
  }

  .nav div.logo a {
    text-decoration: none;
    color: #fff;
    font-size: 2.5rem;
  }

  .logo a:hover {
    color: orange;
    transform: scale(2);
  }

  .main_list {
    height: 65px;
    transition: all 0.06s ease-in-out;
    float: right;
  }

  .main_list ul {
    width: 100%;
    height: 65px;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .main_list ul li {
    width: auto;
    height: 65px;
    padding: 0;
    padding-right: 3rem;
  }

  .main_list ul li a {
    text-decoration: none;
    color: #fff;
    line-height: 65px;
    font-size: 2.4rem;
  }

  .main_list ul li a:hover {
    color: orange;
    transform: scale(1.2);
  }

  .img-parallax {
    height: 100vh;
    width: 100%;
    background-image: url(/CodingMagic-home.jpg);
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }

  @media (max-width: 768px) {
    .img-parallax {
      background-attachment: scroll;
    }
  }

  .navTrigger {
    display: none;
  }

  .nav {
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  /* Media qurey section */

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .container {
      margin: 0;
    }
  }

  @media screen and (max-width: 723px) {
    .navTrigger {
      display: block;
    }
    .logo {
      transition: 0.3s;
      margin-left: 15px;
    }
    .main_list {
      width: 100%;
      height: 0;
      overflow: hidden;
      transition-property: height;
    }
    .show_list {
      transition: all 0.3s ease-out 0.1s;
      margin-right: 1%;
      height: 2%;
      width: 43%;
    }
    .main_list ul {
      flex-direction: column;
      width: 100%;
      height: 2%;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #111;
      border-radius: 16px;
      /*same background color of navbar*/
      background-position: center top;
    }
    .main_list ul li {
      width: 100%;
      text-align: center;
    }
    .main_list ul li a {
      text-align: center;
      width: 100%;
      font-size: 3rem;
      padding: 20px;
    }
    .media_button {
      display: block;
    }
  }

  /* Animation */
  /* Inspiration taken from Dicson https://codemyui.com/simple-hamburger-menu-x-mark-animation/ */

  .navTrigger {
    cursor: pointer;
    width: 30px;
    height: 25px;
    margin: auto;
    position: absolute;
    right: 30px;
    top: 0;
    bottom: 0;
  }

  .navTrigger i {
    background-color: #fff;
    border-radius: 2px;
    content: "";
    display: block;
    width: 100%;
    height: 4px;
  }

  .navTrigger i:nth-child(1) {
    -webkit-animation: outT 0.8s backwards;
    animation: outT 0.8s backwards;
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
  }

  .navTrigger i:nth-child(2) {
    margin: 5px 0;
    -webkit-animation: outM 0.8s backwards;
    animation: outM 0.8s backwards;
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
  }

  .navTrigger i:nth-child(3) {
    -webkit-animation: outBtm 0.8s backwards;
    animation: outBtm 0.8s backwards;
    -webkit-animation-direction: reverse;
    animation-direction: reverse;
  }

  .navTrigger.active i:nth-child(1) {
    -webkit-animation: inT 0.8s forwards;
    animation: inT 0.8s forwards;
  }

  .navTrigger.active i:nth-child(2) {
    -webkit-animation: inM 0.8s forwards;
    animation: inM 0.8s forwards;
  }

  .navTrigger.active i:nth-child(3) {
    -webkit-animation: inBtm 0.8s forwards;
    animation: inBtm 0.8s forwards;
  }

  @-webkit-keyframes inM {
    50% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(45deg);
    }
  }

  @keyframes inM {
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @-webkit-keyframes outM {
    50% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(45deg);
    }
  }

  @keyframes outM {
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @-webkit-keyframes inT {
    0% {
      -webkit-transform: translateY(0px) rotate(0deg);
    }
    50% {
      -webkit-transform: translateY(9px) rotate(0deg);
    }
    100% {
      -webkit-transform: translateY(9px) rotate(135deg);
    }
  }

  @keyframes inT {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(9px) rotate(0deg);
    }
    100% {
      transform: translateY(9px) rotate(135deg);
    }
  }

  @-webkit-keyframes outT {
    0% {
      -webkit-transform: translateY(0px) rotate(0deg);
    }
    50% {
      -webkit-transform: translateY(9px) rotate(0deg);
    }
    100% {
      -webkit-transform: translateY(9px) rotate(135deg);
    }
  }

  @keyframes outT {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(9px) rotate(0deg);
    }
    100% {
      transform: translateY(9px) rotate(135deg);
    }
  }

  @-webkit-keyframes inBtm {
    0% {
      -webkit-transform: translateY(0px) rotate(0deg);
    }
    50% {
      -webkit-transform: translateY(-9px) rotate(0deg);
    }
    100% {
      -webkit-transform: translateY(-9px) rotate(135deg);
    }
  }

  @keyframes inBtm {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-9px) rotate(0deg);
    }
    100% {
      transform: translateY(-9px) rotate(135deg);
    }
  }

  @-webkit-keyframes outBtm {
    0% {
      -webkit-transform: translateY(0px) rotate(0deg);
    }
    50% {
      -webkit-transform: translateY(-9px) rotate(0deg);
    }
    100% {
      -webkit-transform: translateY(-9px) rotate(135deg);
    }
  }

  @keyframes outBtm {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-9px) rotate(0deg);
    }
    100% {
      transform: translateY(-9px) rotate(135deg);
    }
  }

  .affix {
    padding: 0;
    background-color: #111;
  }

  .myH2 {
    color: wheat;
    text-align: center;
    font-size: 4rem;
  }

  .myH3 {
    color: wheat;
    text-align: center;
    font-size: 1.9rem;
  }
</style>
