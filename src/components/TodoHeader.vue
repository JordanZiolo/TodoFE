<!--
  TodoHeader.vue — The top bar with the title and the "new todo" input

  This component is responsible for letting the user type a new todo
  and pressing Enter to add it. When that happens, it sends an event
  ("add-todo") UP to the parent so the parent can actually add it
  to the list.
-->

<script setup lang="ts">
import { RouterLink } from "vue-router";

// "emit" is how a child component sends a message to its parent.
// Here we declare that this component can emit one event: "add-todo",
// carrying a string value (the text the user typed).
const emit = defineEmits<{
  (e: "add-todo", value: string): void;
}>();

/**
 * Called when the user presses Enter in the input field.
 * It grabs the text, sends it to the parent, and clears the input.
 */
function handleKeyup(event: KeyboardEvent): void {
  const target = event.target as HTMLInputElement; // The input box
  emit("add-todo", target.value);                  // Tell the parent the new todo text
  target.value = "";                               // Clear the input so it's ready for the next todo
}
</script>

<template>
  <header class="header">
    <!-- Clicking the title takes you back to the "all" view -->
    <RouterLink to="/"><h1>todos</h1></RouterLink>

    <!-- The text box where the user types a new todo -->
    <input
      type="text"
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      @keyup.enter="handleKeyup"
    />
  </header>
</template>