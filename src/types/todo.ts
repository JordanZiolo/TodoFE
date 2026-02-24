// =============================================================================
// todo.ts — The "shape" of a todo item
// =============================================================================
// Think of an interface like a cookie cutter: it describes what a todo
// looks like, but it doesn't create one. Every todo in the app will
// follow this shape.
// =============================================================================

/**
 * A single todo item — like one line on a sticky note.
 *
 * - id:        A unique code so we can tell todos apart (like a name tag).
 * - title:     The text the user typed ("Buy milk", "Walk the dog", …).
 * - completed: Is this task done? true = yes, false = not yet.
 */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * The three ways we can look at our todo list:
 *
 * - "all"       → Show every todo.
 * - "active"    → Show only the ones that are NOT done yet.
 * - "completed" → Show only the ones that ARE done.
 */
export type FilterName = "all" | "active" | "completed";

