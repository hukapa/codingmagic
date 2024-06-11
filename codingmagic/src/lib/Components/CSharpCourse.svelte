<script lang="ts">
  import MonacoEditor from "./MonacoEditor.svelte";
  import OutputComponent from "./OutputComponent.svelte"; // Importar o componente de saída

  let code: string = `// Escreva seu código C# aqui`;
</script>

<div class="course-container">
  <h1>Curso de C#</h1>
  <div class="editor-container">
    <MonacoEditor {code} language="csharp" theme="vs-dark" />
  </div>
  <div class="output-container">
    <h2>Saída</h2>
    <OutputComponent {code} />
    <!-- Renderizar o componente de saída -->
  </div>
</div>

<style>
  .course-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .editor-container {
    width: 80%;
    margin-bottom: 20px;
  }

  .output-container {
    width: 80%;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
</style>
