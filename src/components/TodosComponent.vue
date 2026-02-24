<!--
  TodosComponent.vue — The brain of the app

  This is the main component that holds ALL the todo data and logic.
  It manages the list of todos and passes pieces of it down to
  child components (TodoHeader, TodoItem, TodoFooter).

  Data flows like this:
    • DOWN (props):  todos → TodoItem, todos → TodoFooter
    • UP   (events): TodoHeader emits "add-todo",
                     TodoItem  emits "delete/edit/toggle-todo",
                     TodoFooter emits "delete-completed"
-->

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import type { Todo, FilterName } from "@/types/todo";

import TodoFooter from "./TodoFooter.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoItem from "./TodoItem.vue";

// -- State -------------------------------------------------------------------
// "ref" is like a box that Vue watches. When the value inside changes,
// Vue automatically updates the screen.
const todos = ref<Todo[]>([]);   // The complete list of all todos
const route = useRoute();         // Tells us which page/filter the user is on

// -- Filters -----------------------------------------------------------------
// A lookup table of filter functions. Given a filter name ("all", "active",
// or "completed"), we can quickly get the right function.
const filters: Record<FilterName, (todos: Todo[]) => Todo[]> = {
  all: (todos) => todos,                                       // Show everything
  active: (todos) => todos.filter((todo) => !todo.completed),   // Only not-done
  completed: (todos) => todos.filter((todo) => todo.completed), // Only done
};

// -- Computed properties -----------------------------------------------------
// Computed properties are values that update themselves automatically
// whenever the data they depend on changes.

/** All todos that are NOT yet completed. */
const activeTodos = computed(() => filters.active(todos.value));

/** All todos that ARE completed. */
const completedTodos = computed(() => filters.completed(todos.value));

/**
 * The todos to show right now, based on the current route/filter.
 * If the route name doesn't match any filter, fall back to showing all.
 */
const filteredTodos = computed(() => {
  const filterName = route.name as FilterName;
  return filters[filterName]?.(todos.value) ?? todos.value;
});

/**
 * Two-way binding for the "toggle all" checkbox.
 *  - get → checked when there are ZERO active todos (i.e. everything is done).
 *  - set → marks ALL todos as done (true) or not done (false).
 */
const toggleAllModel = computed({
  get() {
    return activeTodos.value.length === 0;
  },
  set(value: boolean) {
    todos.value.forEach((todo) => {
      todo.completed = value;
    });
  },
});

// -- Helper: unique ID generator ---------------------------------------------
/** Create a random unique ID string (like a license plate for each todo). */
function uuid(): string {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    const random = (Math.random() * 16) | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";

    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

// -- Event handlers ----------------------------------------------------------
// These functions are called when child components fire events.

/** Add a new todo to the list (called when TodoHeader emits "add-todo"). */
function addTodo(value: string): void {
  todos.value.push({
    completed: false,
    title: value,
    id: uuid(),
  });
}

/** Remove a todo from the list (called when TodoItem emits "delete-todo"). */
function deleteTodo(todo: Todo): void {
  todos.value = todos.value.filter((t) => t !== todo);
}

/** Mark a todo as done or not done (called when TodoItem emits "toggle-todo"). */
function toggleTodo(todo: Todo, value: boolean): void {
  todo.completed = value;
}

/** Change a todo's title (called when TodoItem emits "edit-todo"). */
function editTodo(todo: Todo, value: string): void {
  todo.title = value;
}

/** Remove all completed todos (called when TodoFooter emits "delete-completed"). */
function deleteCompleted(): void {
  todos.value = todos.value.filter((todo) => !todo.completed);
}
</script>

<template>
  <!-- The input field at the top for adding new todos -->
  <TodoHeader @add-todo="addTodo" />

  <!-- The main section: only visible when there is at least one todo -->
  <main class="main" v-show="todos.length > 0">
    <!-- "Toggle all" checkbox: marks every todo as done or undone -->
    <div class="toggle-all-container">
      <input
        type="checkbox"
        id="toggle-all-input"
        class="toggle-all"
        v-model="toggleAllModel"
        :disabled="filteredTodos.length === 0"
      />
      <label class="toggle-all-label" for="toggle-all-input">
        Toggle All Input
      </label>
    </div>

    <!-- The list of todos. Each todo gets its own TodoItem component. -->
    <ul class="todo-list">
      <TodoItem
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @delete-todo="deleteTodo"
        @edit-todo="editTodo"
        @toggle-todo="toggleTodo"
      />
    </ul>
  </main>

  <!-- The footer with the item count, filter links, and "Clear completed" button -->
  <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
</template>