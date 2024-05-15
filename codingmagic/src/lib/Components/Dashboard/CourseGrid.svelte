<!-- CourseGrid.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let courses = [
    {
      id: 1,
      title: "C#",
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
      bookmarked:false,
      image: "/CodingMagic-1.jpg",
      description: "CS:GO got released today, and its the best programming language in the world in every aspect."
    },
    // Add more courses here
  ];

  let containerAnimation: any;

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });

    const containers = document.querySelectorAll(".course-container");
    containers.forEach((container) => observer.observe(container));

    return () => {
      observer.disconnect();
    };
  });

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        containerAnimation = fly;
        entry.target.classList.add("animate");
      }
    });
  }

  function toggleBookmark(course: { id: number; bookmarked: boolean }) {
    course.bookmarked = !course.bookmarked;
    // Add additional functionality, such as saving the bookmarked course
  }
</script>

<!-- CourseGrid.svelte -->
<div class="course-grid">
  {#each courses as course (course.id)}
    <div class="course-container" in:containerAnimation>
      <div class="course-header">
        <h3>{course.title}</h3>
        <button class="bookmark-btn" class:bookmarked={course.bookmarked} on:click={() => toggleBookmark(course)}>
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
      <div class="course-content">
        <div class="image-wrapper">
          <img src={course.image} alt={`${course.title} course`} class="course-image" />
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
        <p>Learn {course.title} programming fundamentals with magical spells and enchantments.</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-content: center;
    padding-left: 100px;
    padding-top: 20px;
    padding-right: 20px;
  }

  .course-container {
    background-color: #f8f0ff;
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: #6a3093;
    color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .bookmark-btn {
    background-color: transparent;
    border: none;
    color: #d8b3ff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .bookmark-btn.bookmarked {
    color: #ffd700;
  }

  .course-content {
    padding: 1.5rem;
    text-align: center;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-radius: 8px;
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .course-container {
      max-width: none;
    }

    .image-wrapper {
      height: 200px;
    }
  }
</style>
