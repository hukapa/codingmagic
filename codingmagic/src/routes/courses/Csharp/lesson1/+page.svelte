<!-- <script lang="ts">
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import { MonacoEditor } from "svelte-monaco-editor";

  let editor: monaco.editor.IStandaloneCodeEditor;
  let editorElement: HTMLDivElement;
  let output: string;

  onMount(() => {
    monaco.init().then(
      (monaco: typeof import("monaco-editor")) => {
        editor = monaco.editor.create(editorElement, {
          value: 'console.WriteLine("Hello, Magical World!");',
          language: "csharp",
          theme: "vs-dark",
          // Add any other Monaco Editor options you need
        });
      },
      (error: any) => console.error("An error occurred:", error)
    );
    return () => {
      editor?.dispose();
    };
  });
</script>

<div class="lesson-container">
  <div class="editor-container">
    <div class="editor" bind:this={editorElement}>
      {#if editorElement}
        <MonacoEditor
          {...monaco}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            suggest: { showKeywords: true },
          }}
        />
      {/if}
    </div>
    {#if output}
      <div class="output">{output}</div>
    {/if}
  </div>
</div>

<style>
  .lesson-container {
    background-color: #1c0f2f;
    color: #fff;
    padding: 2rem;
    min-height: 100vh;
  }

  .editor-container {
    background-color: #282c38;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .editor {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .output {
    margin-top: 1rem;
    background-color: #36384b;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #d1d4d4;
  }
</style> -->
