<!-- MonacoEditor.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import type { editor } from "monaco-editor";

  export let code = ""; // Código inicial
  export let language = "csharp"; // Linguagem padrão é C#
  export let theme = "vs-dark"; // Tema escuro padrão

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
