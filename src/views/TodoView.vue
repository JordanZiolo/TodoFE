<!--
  TodoView.vue — The page that the router displays

  This is a "view" (a page). The router shows this component for
  every route (/, /active, /completed). It simply wraps
  TodosComponent, which contains all the real logic.

  Think of a view as a picture frame — it holds the actual picture
  (TodosComponent) in place.
-->

<script setup lang="ts">
import TodosComponent from "../components/TodosComponent.vue";
</script>

<template>
    <!-- Render the main todos component -->
    <TodosComponent />
</template>