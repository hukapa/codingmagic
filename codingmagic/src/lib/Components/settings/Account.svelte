<!-- Component Account.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";

  export let supabase: any;
  export let session: any;

  let showConfirmation = false;

  async function deleteAccount() {
    if (session?.user) {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .match({ user_id: session.user.id });

      if (error) {
        console.error("Error deleting user:", error);
        // Handle the error appropriately (e.g., show an error message)
      } else {
        // User deleted successfully
        // Sign out the user
        await supabase.auth.signOut();
        goto("/login"); // Redirect to the login page
      }
    } else {
      console.error("No user session found");
      // Handle the case where the user is not logged in
    }
  }
</script>

<div class="account-container">
  <button class="delete-button" on:click={() => (showConfirmation = true)}>
    <span class="button-text">Delete Account</span>
    <span class="icon">&#x2716;</span>
  </button>

  {#if showConfirmation}
    <div class="modal">
      <p>
        Are you absolutely sure you want to vanish your account from existence?
      </p>
      <div class="modal-buttons">
        <button class="confirm-button" on:click={deleteAccount}
          >Yes, I'm Certain</button
        >
        <button
          class="cancel-button"
          on:click={() => (showConfirmation = false)}
          >No, I've Reconsidered</button
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .account-container {
    /* Background for the entire container (e.g., subtle gradient) */
    background: linear-gradient(
      135deg,
      #201c29,
      #352f44
    ); /* Example gradient */
    padding: 20px;
    border-radius: 10px; /* Add rounded corners */
  }

  .delete-button {
    background-color: #9466ff; /* Vibrant purple */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex; /* Use flexbox for alignment */
    align-items: center;
    transition: transform 0.2s; /* Add a subtle hover effect */
  }

  .delete-button:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
  }

  .button-text {
    margin-right: 5px; /* Add some space between text and icon */
  }

  .icon {
    font-size: 18px;
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #201c29;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); /* Add a shadow */
    text-align: center;
  }

  .modal p {
    color: white;
    margin-bottom: 15px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-around;
  }

  .confirm-button,
  .cancel-button {
    /* Style the buttons to match the overall theme */
  }
</style>
