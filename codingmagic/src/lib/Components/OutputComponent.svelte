<!-- component /OutputComponent.svelte -->
<script lang="ts">
    export let code: string;
  
  
    let output: string = 'Code output here';
  </script>
  
  <div>
    <pre>{output}</pre>
  </div>