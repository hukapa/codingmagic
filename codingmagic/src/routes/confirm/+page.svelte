<script lang="ts">
    import { page } from '$app/stores';
  
    const { data } = $page; // Dados da página (incluindo o email, se fornecido)
  </script>
  
  {#if data.error}
    <h2>Error</h2>
    <p>{data.error}</p>
  {:else}
    <h2>Confirmation Successful!</h2>
    <p>Your account has been confirmed, {data.user?.email}.</p>
    <button on:click={() => location.href = '/login'}>Go to Login</button>
  {/if}
  