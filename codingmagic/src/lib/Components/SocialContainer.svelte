<!-- Component SocialContainer.svelte -->
<script lang="ts">
  import GitHub from "$lib/Icons/GitHub.svelte";
  import Discord from "$lib/Icons/Discord.svelte";
  import Google from "$lib/Icons/Google.svelte";

  export let supabase: any;
  export let session: any;

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Error:", error);
    } else {
      const username = data.user.user_metadata.user_name; // GitHub username
      // Store the username in Supabase
      storeUsername(data.user.id, username);
    }
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });

    if (error) {
      console.error("Error:", error);
    } else {
      const username = data.user.user_metadata.username; // Discord username
      // Store the username in Supabase
      storeUsername(data.user.id, username);
    }
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error:", error);
    } else {
      const userName = data.user.user_metadata.email.split("@")[0]; // Google email prefix as username
      // Store the username in Supabase
      storeUsername(data.user.id, userName);
    }
  }

  async function storeUsername(userId: any, userName: any) {
    const { data, error } = await supabase
      .from("profiles")
      .eq("user_id", userId)
      .upsert({ username: userName });

    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Username stored successfully:", data);
    }
  }
</script>

<form class="social-container" method="POST">
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" on:click={signInWithGithub} class="social"><GitHub /></a>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" on:click={signInWithDiscord} class="social"><Discord /></a>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" on:click={signInWithGoogle} class="social"><Google /></a>
</form>

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