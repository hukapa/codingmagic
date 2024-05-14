<!-- Header.svelte -->
<header>
    <slot />
    <div class="header-icons">
      <i class="fas fa-bell notification-icon"></i>
      <i class="fas fa-question-circle support-icon"></i>
    </div>
  </header>
  
  <style>
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    .header-icons {
      display: flex;
      align-items: center;
    }
  
    .notification-icon,
    .support-icon {
      font-size: 1.2rem;
      color: #888;
      margin-left: 1rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }
  
    .notification-icon:hover,
    .support-icon:hover {
      color: #333;
    }
  </style>