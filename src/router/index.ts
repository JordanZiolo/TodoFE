// =============================================================================
// router/index.ts — The app's navigation map
// =============================================================================
// The router decides WHICH page (view) to show based on the URL.
// Think of it like a signpost: if the user goes to "/active",
// the router says "show the TodoView filtered to active todos".
//
// All three routes use the SAME component (TodoView). The only
// difference is the route NAME, which the app uses to decide which
// filter (all / active / completed) to apply.
// =============================================================================

import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import TodoView from "../views/TodoView.vue";

// Each object describes one "page" the user can visit.
const routes: RouteRecordRaw[] = [
  {
    path: "/",          // The home page URL
    name: "all",        // Name used to identify this filter
    component: TodoView,
  },
  {
    path: "/active",    // URL for active todos
    name: "active",
    component: TodoView,
  },
  {
    path: "/completed", // URL for completed todos
    name: "completed",
    component: TodoView,
  },
];

// Create the router using hash-based URLs (e.g. /#/active).
// Hash history works everywhere, even without a special server setup.
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

