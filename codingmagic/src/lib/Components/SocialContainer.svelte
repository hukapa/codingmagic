<script lang="ts">
  import GitHub from "$lib/Icons/GitHub.svelte";
  import Discord from "$lib/Icons/Discord.svelte";
  import Google from "$lib/Icons/Google.svelte";
</script>

<div class="social-container">
    <a href="#" class="social"><GitHub /></a>
    <a href="#" class="social"><Discord /></a>
    <a href="#" class="social"><Google /></a>
  </div>

  <style>
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