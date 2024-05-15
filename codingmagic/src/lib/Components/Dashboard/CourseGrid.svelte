<!-- CourseGrid.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
  
    let courses = [
      { id: 1, title: 'C#', bookmarked: false, image: '/c#.png' },
      { id: 2, title: 'Python', bookmarked: false, image: '/python.jpg' },
      // Add more courses here
    ];
  
    let containerAnimation: any;
  
    onMount(() => {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.8,
      });
  
      const containers = document.querySelectorAll('.course-container');
      containers.forEach((container) => observer.observe(container));
  
      return () => {
        observer.disconnect();
      };
    });
  
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          containerAnimation = fly;
          entry.target.classList.add('animate');
        }
      });
    }
  
    function toggleBookmark(course: { id: number; bookmarked: boolean }) {
      course.bookmarked = !course.bookmarked;
      // Add additional functionality, such as saving the bookmarked course
    }
  </script>
  
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
            <img src={course.image} alt={`${course.title} course`} class="course-image" />
            <!-- Course content goes here -->
            <p>Learn {course.title} programming fundamentals.</p>
            <!-- Add interactive elements, animations, etc. -->
          </div>
      </div>
    {/each}
  </div>
  
  <style>
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }
  
    .course-container {
      background-color: #f8f0ff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }
  
    .course-container.animate {
      animation: slide-up 0.5s ease-out;
    }
  
    @keyframes slide-up {
      0% {
        transform: translateY(50px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  
    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #6a3093;
      color: #fff;
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
  
    .course-content {
      padding: 1rem;
      text-align: center;
    }
  
    .course-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }
  
    .course-image:hover {
      transform: scale(1.05);
    }
  </style>  