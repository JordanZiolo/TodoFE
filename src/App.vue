<!--
  App.vue — The root (top-level) component

  This is the "shell" of the app. It doesn't show any content itself;
  it just says: "Whatever page the router tells me to show, show it here."

  <RouterView /> is like a TV screen — the router decides which channel
  (component) is displayed.
-->

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <!-- The router swaps the content inside this tag based on the URL -->
  <RouterView />
</template>
