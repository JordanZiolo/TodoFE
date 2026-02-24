<!--
  TodoFooter.vue — The bottom bar with counts, filters, and "Clear completed"

  This component shows:
  • How many todos are left to do ("3 items left").
  • Links to switch between All / Active / Completed views.
  • A button to remove all completed todos at once.

  It does NOT own the todos — it receives them as a prop from the parent.
  When the user clicks "Clear Completed", it sends an event UP to the parent.
-->

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import type { Todo } from "@/types/todo";
import type { Ref } from "vue";

// -- Props -------------------------------------------------------------------
// The parent can pass either a plain array OR a Vue ref containing an array.
interface Props {
  todos: Ref<Todo[]> | Todo[];
}

const props = defineProps<Props>();

// -- Events ------------------------------------------------------------------
// This component can emit one event: "delete-completed".
const emit = defineEmits<{
  (e: "delete-completed"): void;
}>();

// -- Route -------------------------------------------------------------------
// We use the current route to highlight the active filter link.
const route = useRoute();

// -- Computed properties -----------------------------------------------------

/**
 * Unwrap the todos prop so we always work with a plain array,
 * regardless of whether the parent passed a ref or a raw array.
 */
const todosArray = computed(() => {
  return Array.isArray(props.todos) ? props.todos : props.todos.value;
});

/** Count how many todos are NOT completed yet. */
const remaining = computed(
  () => todosArray.value.filter((todo) => !todo.completed).length
);
</script>

<template>
  <!-- The whole footer only shows when there is at least one todo -->
  <footer class="footer" v-show="todosArray.length > 0">
    <!-- Show how many items are still active -->
    <span class="todo-count">
      <strong>{{ remaining }}</strong>
      {{ remaining === 1 ? "item" : "items" }} left
    </span>

    <!-- Filter links: highlight the one matching the current route -->
    <ul class="filters">
      <li>
        <RouterLink to="/" :class="{ selected: route.name == 'all' }"
          >All</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/active" :class="{ selected: route.name == 'active' }"
          >Active</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/completed"
          :class="{ selected: route.name == 'completed' }"
          >Completed</RouterLink
        >
      </li>
    </ul>

    <!-- Button to remove all done todos — only visible when at least one is done -->
    <button
      class="clear-completed"
      v-show="todosArray.some((todo) => todo.completed)"
      @click="emit('delete-completed')"
    >
      Clear Completed
    </button>
  </footer>
</template>