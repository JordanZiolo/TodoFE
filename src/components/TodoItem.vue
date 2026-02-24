<!--
  TodoItem.vue — One single row in the todo list

  Each todo gets its own TodoItem. This component can:
  • Show the todo text and a checkbox.
  • Let the user double-click the text to edit it.
  • Let the user click the X button to delete it.
  • Tell the parent when something changes (via events).
-->

<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import type { Todo } from "@/types/todo";

// -- Props -------------------------------------------------------------------
// Props are data passed DOWN from the parent component.
// We receive the todo object and its position (index) in the list.
interface Props {
  todo: Todo;
  index: number;
}

const props = defineProps<Props>();

// -- Events (emits) ----------------------------------------------------------
// Events are messages sent UP to the parent. We can fire three:
//   • delete-todo  → "please remove this todo"
//   • edit-todo    → "please change this todo's title"
//   • toggle-todo  → "please mark this todo as done/not-done"
const emit = defineEmits<{
  (e: "delete-todo", todo: Todo): void;
  (e: "edit-todo", todo: Todo, value: string): void;
  (e: "toggle-todo", todo: Todo, value: boolean): void;
}>();

// -- Local state -------------------------------------------------------------
const editing = ref(false);                          // Are we currently editing this todo?
const editInput = ref<HTMLInputElement | null>(null); // Reference to the edit <input> element
const editText = ref("");                             // The text being typed during editing

// -- Computed models ---------------------------------------------------------
// A "computed model" is a two-way bridge between the template and our data.

/**
 * editModel: connects the edit input field to the todo's title.
 *  - get → shows the current title in the input.
 *  - set → stores what the user types into editText.
 */
const editModel = computed({
  get() {
    return props.todo.title;
  },
  set(value: string) {
    editText.value = value;
  },
});

/**
 * toggleModel: connects the checkbox to the todo's completed status.
 *  - get → checks or unchecks the box based on completed.
 *  - set → sends a "toggle-todo" event to the parent when the user clicks.
 */
const toggleModel = computed({
  get() {
    return props.todo.completed;
  },
  set(value: boolean) {
    emit("toggle-todo", props.todo, value);
  },
});

// -- Methods -----------------------------------------------------------------

/** Start editing: show the input and focus it. */
function startEdit(): void {
  editing.value = true;
  // nextTick waits until Vue has updated the DOM, so the input exists
  // before we try to focus it.
  nextTick(() => {
    editInput.value?.focus();
  });
}

/** Finish editing: save or delete depending on what was typed. */
function finishEdit(): void {
  editing.value = false;
  // If the user cleared the text, delete the todo instead of saving blank.
  if (editText.value.trim().length === 0) deleteTodo();
  else updateTodo();
}

/** Cancel editing: just close the input without saving. */
function cancelEdit(): void {
  editing.value = false;
}

/** Ask the parent to delete this todo. */
function deleteTodo(): void {
  emit("delete-todo", props.todo);
}

/** Ask the parent to save the new title for this todo. */
function updateTodo(): void {
  emit("edit-todo", props.todo, editText.value);
  editText.value = ""; // Reset for next time
}
</script>

<template>
    <!-- The <li> gets CSS classes so it can look different when completed or being edited -->
    <li
        :class="{
            completed: todo.completed,
            editing: editing,
        }"
    >
        <!-- Normal (non-editing) view -->
        <div class="view">
            <!-- Checkbox to mark done / not done -->
            <input type="checkbox" class="toggle" v-model="toggleModel" />
            <!-- Double-click the label to start editing -->
            <label @dblclick="startEdit">{{ todo.title }}</label>
            <!-- The red X button to delete -->
            <button class="destroy" @click.prevent="deleteTodo"></button>
        </div>

        <!-- Editing view (shown only when editing is true) -->
        <div class="input-container">
            <input id="edit-todo-input" ref="editInput" type="text" class="edit" v-model="editModel" @keyup.enter="finishEdit" @blur="cancelEdit"/>
            <label class="visually-hidden" for="edit-todo-input">Edit Todo Input</label>
        </div>
    </li>
</template>