<script lang="ts">
  import { redirect } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { fade, fly } from "svelte/transition";

  interface Course {
    id: number;
    title: string;
    bookmarked: boolean;
    image: string;
    description: string;
  }

  let courses: Course[] = [
    {
      id: 1,
      title: "Csharp",
      bookmarked: false,
      image: "/csharp.png",
      description:
        "C# is a modern, object-oriented programming language developed by Microsoft. It is widely used for building a variety of applications, including desktop, web, mobile, and games.",
    },
    {
      id: 2,
      title: "Python",
      bookmarked: false,
      image: "/python.jpg",
      description:
        "Python is a versatile and powerful programming language known for its simplicity and readability. It is widely used in data analysis, machine learning, web development, and many other domains.",
    },
    {
      id: 3,
      title: "CS:GO",
      bookmarked: false,
      image: "/CodingMagic-1.jpg",
      description:
        "CS:GO got released today, and its the best programming language in the world in every aspect.",
    },
    // Add more courses here
  ];

  let cardAnimation: any;

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });

    const cards = document.querySelectorAll<HTMLElement>(".card");
    cards.forEach((card) => {
      observer.observe(card);
      card.addEventListener("mouseover", () => {
        card.style.setProperty("--rotate", `${Math.random() * 360}deg`);
      });
    });

    return () => {
      observer.disconnect();
    };
  });

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cardAnimation = fly;
        entry.target.classList.add("animate");
      }
    });
  }

  function toggleBookmark(course: Course) {
    course.bookmarked = !course.bookmarked;
    // Add additional functionality, such as saving the bookmarked course
  }

  function redirectToCourseDetails(courseTile: string) {
    goto(`/courses/${courseTile}`);
  }
</script>

<div class="course-grid">
  {#each courses as course (course.id)}
    <div class="card" in:cardAnimation>
      <div class="course-header">
        <div class="header-content">
          <h3>{course.title}</h3>
          <button
            class="bookmark-btn"
            class:bookmarked={course.bookmarked}
            on:click={() => toggleBookmark(course)}
          >
            <i class="fas fa-bookmark"></i>
          </button>
        </div>
        <button class="details-btn" on:click={() => redirectToCourseDetails(course.title)}>
          <span>Details</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="image-wrapper">
        <img
          src={course.image}
          alt={`${course.title} course`}
          class="course-image"
        />
        <div class="overlay">
          <div class="description-container">
            <p class="description">{course.description}</p>
          </div>
          <div class="sparkles">
            <span class="sparkle"></span>
            <span class="sparkle"></span>
            <span class="sparkle"></span>
            <span class="sparkle"></span>
            <span class="sparkle"></span>
          </div>
        </div>
      </div>
      <p>
        Learn {course.title} programming fundamentals with magical spells and enchantments.
      </p>
    </div>
  {/each}
</div>

<style>
  @property --rotate {
    syntax: "";
    initial-value: 132deg;
    inherits: false;
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    justify-content: center;
    padding-left: 100px;
    padding-top: 20px;
    padding-right: 20px;
  }

  .card {
    background: #191c29;
    padding: 3px;
    position: relative;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
    color: rgb(88 199 250 / 0%);
    font-family: cursive;
    overflow: hidden;
  }

  .card:hover {
    color: rgb(88 199 250 / 100%);
    transition: color 1s;
  }

  .card:before,
  .card:after {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
      var(--rotate),
      #5ddcff,
      #3c67e3 43%,
      #4e00c2
    );
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -1%;
    animation: spin 2.5s linear infinite;
  }

  .card:after {
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    opacity: 1;
    transition: opacity 0.5s;
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: #6a3093;
    color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    align-items: center;
    font-family: "Montserrat", sans-serif;
  }

  .header-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1rem;
  }

  .bookmark-btn {
    background-color: transparent;
    border: none;
    color: #d8b3ff;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .bookmark-btn.bookmarked {
    color: #ffd700;
  }

  .details-btn {
    background-color: #8a65b2;
    border: none;
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .details-btn:hover {
    background-color: #9d7ad3;
  }

  .details-btn span {
    margin-right: 0.5rem;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-bottom: 12px;
  }

  .course-image {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(106, 48, 147, 0.8);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none; /* Added to prevent overlay from interfering with hover */
  }

  .image-wrapper:hover .overlay {
    opacity: 1;
  }

  .description-container {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 80%;
  }

  .sparkles {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .sparkle {
    width: 10px;
    height: 10px;
    background-color: #ffd700;
    border-radius: 50%;
    margin: 0 0.5rem;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    animation: sparkle 2s infinite;
  }

  @keyframes sparkle {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.5) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(360deg);
    }
  }

  @media (max-width: 767px) {
    .course-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .card {
      max-width: none;
    }

    .image-wrapper {
      height: 200px;
    }
  }
</style>
