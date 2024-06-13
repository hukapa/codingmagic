<!-- MonacoEditor.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import type { editor } from "monaco-editor";

  export let code = ""; 
  export let language = "csharp"; 
  export let theme = "vs-dark"; 

  let editorContainer: HTMLElement | null;
  let editor: editor.IStandaloneCodeEditor;

  onMount(() => {
    if (editorContainer) {
      editor = monaco.editor.create(editorContainer, {
        value: code,
        language: language,
        theme: theme,
        automaticLayout: true,
      });
    }
  });
</script>

<div bind:this={editorContainer} style="height: 500px; width: 100%;"></div>
