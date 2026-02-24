// =============================================================================
// main.ts — The starting point of the whole app
// =============================================================================
// This file is like turning the key in a car's ignition:
// 1. It loads the styles (CSS) so things look pretty.
// 2. It creates the Vue app from our root component (App.vue).
// 3. It plugs in the router so we can navigate between pages.
// 4. It "mounts" (attaches) the app to the HTML element with class
//    "todoapp", which lives in index.html.
// =============================================================================

// -- Styles ------------------------------------------------------------------
import "./assets/main.css";                        // Our own custom styles
import "../node_modules/todomvc-app-css/index.css"; // TodoMVC standard look & feel
import "../node_modules/todomvc-common/base.css";   // TodoMVC shared base styles

// -- Vue setup ---------------------------------------------------------------
import { createApp } from "vue";  // The function that boots up Vue
import App from "./App.vue";      // The root (top-level) component
import router from "./router";    // Our navigation rules

// Create the Vue application using App.vue as the starting component
const app = createApp(App);

// Tell the app to use the router (so <RouterView> and <RouterLink> work)
app.use(router);

// Attach the app to the DOM element with class "todoapp" in index.html
app.mount(".todoapp");

