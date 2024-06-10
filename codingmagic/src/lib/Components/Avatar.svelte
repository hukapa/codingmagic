<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { createEventDispatcher } from "svelte";
  import Navbar from "./Dashboard/Navbar.svelte";

  export let size = 10;
  export let url: string;
  export let supabase: SupabaseClient;

  let avatarUrl: string | null = null;
  let uploading = false;
  let files: FileList;

  const dispatch = createEventDispatcher();

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      avatarUrl = url;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  };

  const uploadAvatar = async () => {
    try {
      uploading = true;
      console.log("hehe")
      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      url = filePath;
      setTimeout(() => {
        dispatch("upload");
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      uploading = false;
    }
  };

  $: if (url) downloadImage(url);
</script>

<div>
  {#if avatarUrl}
    <img
      src={avatarUrl}
      alt={avatarUrl ? "Avatar" : "No image"}
      class="avatar image"
      style="height: {size}em; width: {size}em;"
    />
  {:else}
    <div class="avatar no-image" style="height: {size}em; width: {size}em;" />
  {/if}
  <input type="hidden" name="avatarUrl" value={url} />

  <div style="width: {size}em;">
    <label class="button primary block upload-button" for="single">
      <i class="fas fa-upload"></i>
      {uploading ? "Conjurando Avatar..." : "Enviar Avatar"}
    </label>
    <input
      style="visibility: hidden; position:absolute;"
      type="file"
      id="single"
      accept="image/*"
      bind:files
      on:change={uploadAvatar}
      disabled={uploading}
    />
  </div>
</div>

<style lang="scss">
  $primary-color: #6a3093;
  $secondary-color: #9d7ad3;
  $accent-color: #ffa500;
  $background-color: #191c29;
  .upload-button {
    background-color: $primary-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
</style>
