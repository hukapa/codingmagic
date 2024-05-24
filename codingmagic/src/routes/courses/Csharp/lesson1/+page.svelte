<script lang="ts">

    const lesson = {
        title: "The Essence of C#",
        theory: "C# is a versatile, object-oriented programming language used to create a wide range of applications.",
        example: `// Hello, world!
Console.WriteLine("Welcome to the realm of C#!");`,
        practice: "Write a C# program that prints your name to the console."
    };

    let userCode = lesson.example; // Initialize with the example code

    function runCode() {
        // Implement code execution logic here (e.g., using WebAssembly)
        console.log("Running code:", userCode);
    }
</script>

<div class="lesson-page">
    <h2>{lesson.title}</h2>
    <p>{lesson.theory}</p>

    <button on:click={runCode}>Run Your Spell</button>
    <p>{lesson.practice}</p>
</div>
