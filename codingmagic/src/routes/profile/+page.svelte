<!-- /profile +page.svelte -->
<script lang="ts">
  import Avatar from "$lib/Components/Avatar.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  let { session, supabase } = data;
  $: ({ session, supabase } = data);

  let profileForm: HTMLFormElement;
  let loading = false;
  let newUsername = "";
  let avatarUrl = "";
  let email = session?.user.email;
  let currentUsername = "Loading...";
  let errorMessage = ""; // To display errors

  onMount(async () => {
		const { error, data } = await supabase
			.from("profiles")
			.select("username")
			.eq("user_id", session?.user.id)
			.single();

		if (error) {
			console.error("Error fetching username:", error);
			currentUsername = "Failed to load your Username";
		} else if (data) {
			currentUsername = data.username;
		} else {
			currentUsername = "Username not found";
		}
	});

  async function updateProfile() {
    // Validation
    if (!newUsername.trim()) {
      errorMessage = "Username cannot be empty!";
      return; // Stop the update if the username is invalid
    }

    try {
      loading = true;

      const updates = {
        user_id: session?.user.id,
        username: newUsername,
        user_email: email,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw new Error(error.message);
      }

      console.log("Profile Updated!");

      // Refresh the page (and data)
      location.reload();
    } catch (err) {
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = "Error Occurred.";
      }
    } finally {
      loading = false;
    }
  }
</script>

<div class="profile-container">
  <div class="form-widget">
    <div class="header">
      <h2>Update Profile</h2>
      <div class="sparkles"></div>
    </div>

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}

    <form method="post" bind:this={profileForm}>
      <div class="avatar-container">
        <Avatar
          {supabase}
          bind:url={avatarUrl}
          size={10}
          on:upload={() => profileForm.requestSubmit()}
        />
        <span class="upload-label">Upload Avatar</span>
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" type="text" value={email} disabled />
      </div>
      <div class="form-field">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          bind:value={newUsername}
          placeholder="Current Username: {currentUsername}"
          class="input-field"
        />
      </div>
      <div class="button-container">
        <input
          type="submit"
          class="button primary"
          value={loading ? "Loading..." : "Update"}
          disabled={loading}
          on:click={updateProfile}
        />
        <button
          class="button secondary"
          on:click={() => {
            goto("/dashboard");
          }}>Back to Dashboard</button
        >
      </div>
    </form>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #1f1b2b;
    background-image: linear-gradient(
        45deg,
        #2d2741 25%,
        transparent 25%,
        transparent 75%,
        #2d2741 75%
      ),
      linear-gradient(
        45deg,
        #2d2741 25%,
        transparent 25%,
        transparent 75%,
        #2d2741 75%
      );
    background-size: 40px 40px;
    background-position:
      0 0,
      20px 20px;
    padding: 2rem;
  }

  .form-widget {
    background-color: #1f1b2b;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    color: #d4c7e8;
    padding: 2rem;
    font-family: "Montserrat", sans-serif;
    max-width: 500px;
    width: 100%;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .profile-container {
      padding: 1rem;
    }
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .header h2 {
    font-size: 2rem;
    color: #9b86c9;
    text-shadow: 0 0 10px rgba(155, 134, 201, 0.5);
    margin: 0;
  }

  .sparkles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sparkle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #9b86c9;
    box-shadow: 0 0 10px rgba(155, 134, 201, 0.5);
    margin: 0 5px;
    animation: sparkle 1.5s infinite;
  }

  .sparkle:nth-child(1) {
    animation-delay: 0s;
  }

  .sparkle:nth-child(2) {
    animation-delay: 0.5s;
  }

  .sparkle:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes sparkle {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .upload-label {
    color: #9b86c9;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .form-field {
    margin-bottom: 1rem;
  }

  label {
    color: #9b86c9;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .input-field {
    background-color: #2d2741;
    border: none;
    border-radius: 5px;
    color: #d4c7e8;
    padding: 0.5rem;
    width: 100%;
  }

  .input-field::placeholder {
    color: #6e5f8a;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .button {
    border: none;
    border-radius: 5px;
    padding: 0.6rem 1.2rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    width: 100%;
  }

  .button.primary {
    background-color: #7a4fb9;
    color: #fff;
    box-shadow: 0 0 10px rgba(122, 79, 185, 0.5);
  }

  .button.primary:hover {
    background-color: #9370db;
  }
</style>
