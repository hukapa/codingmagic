<script lang="ts">
  import { onMount } from "svelte";

  export let data;
  let { supabase, session }: any = data;
  $: ({ supabase, session } = data);


  let y: number;
  let height: number;
  $: scroll = (y / height) * 100;

  let MenuActive = false;
  function toggleMenu() {
    MenuActive = !MenuActive;
  }

  let videoSource = "CodingMagic-vid-1.mp4";

  let courses: any[] = [];

  onMount(async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      courses = data;
    }
  });

  let name = "";
  let email = "";
  let userId = "";
  let message = "";

  onMount(async () => {
    if (session) {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, user_email, user_id")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        name = data.username;
        email = data.user_email;
        userId = data.user_id;
      }
    }
  });

  const handleSubmit = async () => {
    const body = `Name: ${name}\nEmail: ${email}\nUser ID: ${userId}\nMessage: ${message}`;
    const mailtoLink = `mailto:a25817@alunos.aepbs.net?subject=New%20Message%20from%20Coding%20Magic&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    name = "";
    email = "";
    userId = "";
    message = "";
  };
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
          <!-- svelte-ignore a11y-missing-content -->
          <ul class="navlinks">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <li><a href=""></a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            {#if session !== null}
              <li><a href="/dashboard">Dashboard</a></li>
            {:else}
              <li><a href="/login">Login</a></li>
            {/if}
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

<section class="course-section" id="courses">
  <h2 class="myH2">Courses</h2>
  <div class="course-list">
    {#each courses as course}
      <div class="course-card">
        <img class="course-card-image" src={course.image} alt={course.title} />
        <div class="course-card-content">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {#if session}
            <a href={`/courses/${course.title}`} class="course-card-cta"
              >Iniciar Curso</a
            >
          {:else}
            <a href="/login" class="course-card-cta">Iniciar Sessão</a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<section id="about">
  <div class="about-parallax">
    <div class="about-content">
      <div class="card">
        <div class="card-body">
          <h2 class="myH2">About Us</h2>
          <p>
            At Coding Magic, we believe that coding is more than just a skill –
            it's an art form that unlocks limitless possibilities. Our mission
            is to inspire and empower individuals to unleash their creative
            potential through the power of code.
          </p>
          <p>
            Founded by a passionate team of software engineers and educators,
            Coding Magic was born out of a shared vision to make programming
            accessible and enjoyable for everyone. We understand that learning
            to code can be daunting, but with the right guidance and a
            supportive community, it can also be a transformative and rewarding
            journey.
          </p>
          <p>
            Through our comprehensive resources, interactive courses, and
            engaging community, we strive to cultivate an environment where
            creativity thrives, knowledge flourishes, and dreams take shape. We
            believe that by mastering the art of coding, individuals can unlock
            new horizons, shape the digital world, and create meaningful
            solutions that impact lives.
          </p>
          <p>
            Join us on this exciting adventure, and let Coding Magic be your
            guide as you embark on a path of continuous learning, innovation,
            and personal growth. Together, we'll transform ideas into reality,
            one line of code at a time.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="contact-content">
    <h2 class="myH2">Contact Us</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} disabled={session} />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} disabled={session} />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="5" bind:value={message}></textarea>
      </div>
      <button type="submit" class="btn">Send Message</button>
    </form>
  </div>
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
    z-index: 1000;
    backdrop-filter: blur(2px);
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

  .nav div.logo a:hover {
    color: orange;
    transform: scale(1.2);
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
    text-decoration: underline;
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
    color: orange;
    text-align: center;
    font-size: 4rem;
  }

  .myH3 {
    color: orange;
    text-align: center;
    font-size: 1.9rem;
  }

  .course-section {
    padding: 60px 0;
    text-align: center;
  }

  .course-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    justify-content: center;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
  }

  .course-card {
    position: relative;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    overflow: hidden;
    background-color: #111;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }

  .course-card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .course-card-content {
    padding: 20px;
    text-align: left;
  }

  .course-card h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: orange;
  }

  .course-card p {
    font-size: 1rem;
    color: #fff;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .course-card-cta {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
  .about-parallax {
    height: 100vh;
    background-image: url("/CodingMagic-1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
  }
  .card {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-body p {
    color: #fff;
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  #contact {
    background-color: #111;
    padding: 60px 0;
  }

  .contact-content {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .contact-content h2 {
    font-size: 2.4rem;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
  }

  .form-group textarea {
    resize: vertical;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: orange;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn:hover {
    background-color: #c65900;
  }
</style>
