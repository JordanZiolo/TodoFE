// =============================================================================
//  COMPONENT TEST — TodoItem.spec.js
// =============================================================================
//
//  TodoItem is één rij in de todo-lijst. Het toont:
//  - Een selectievakje om het als klaar te markeren
//  - De todo-tekst
//  - Een X-knop om het te verwijderen
//  - Als je dubbelklikt, kun je de tekst bewerken
//
//  In deze oefening schrijf je de tests zelf!
//  Een hulpfunctie mountTodoItem() staat voor je klaar.
//  Elke test heeft stap-voor-stap instructies — volg ze als een recept.
//
//  SPIEKBRIEFJE — dingen die je kunt doen met een gemount component:
//
//    wrapper.find("label")                         → zoek een <label> element
//    wrapper.find(".destroy")                      → zoek element met class "destroy"
//    wrapper.find("li").classes()                  → haal CSS-klassen op, bijv. ["completed"]
//    wrapper.find("label").text()                  → haal de tekst op, bijv. "Buy milk"
//    wrapper.find("button").trigger("click")       → klik op een knop
//    wrapper.find("label").trigger("dblclick")     → dubbelklik
//    wrapper.emitted("delete-todo")                → is dit event afgevuurd? (undefined = nee)
//
//    expect(something).toBe("hello")               → moet gelijk zijn aan "hello"
//    expect(array).toContain("item")               → array bevat "item"
//    expect(value).toBeTruthy()                    → waarde is niet null/undefined/false
//    expect(wrapper.find("li").classes()).toContain("completed")
//                                                  → heeft het <li> element de klasse "completed"?
// =============================================================================

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem.vue";

// ---------------------------------------------------------------------------
//  Deze hulpfunctie maakt een TodoItem component aan voor testen.
//  Als je geen todo meegeeft, gebruikt hij een standaard todo.
//  Je kunt ook je eigen todo meegeven, zoals:
//    mountTodoItem({ id: "1", title: "Mijn todo", completed: true })
// ---------------------------------------------------------------------------
function mountTodoItem(todo?: Todo) {
  if (!todo) {
    todo = { id: "1", title: "Test todo", completed: false };
  }

  return mount(TodoItem, {
    props: {
      todo,
      index: 0,
    },
  });
}

// ===========================================================================
//  Oefening 5 — 🏗️ Schrijf component tests voor TodoItem
// ===========================================================================
//
//  Jouw taak: schrijf de code in elk it() blok.
//  Volg de stappen — ze vertellen je precies wat je moet doen!
//
describe("Oefening 5 — TodoItem component", () => {
  // -------------------------------------------------------------------------
  //  Test 5a: Toont het de todo-tekst?
  // -------------------------------------------------------------------------
  //
  //  Stappen (volg deze, één regel per stap):
  //
  //    const wrapper = mountTodoItem()
  //    const label = wrapper.find("label")
  //    expect(label.text()).toBe("Test todo")
  //
  it("toont de titel van de todo in een label", () => {
    expect(true).toBe(false); // Deze regel mag je weghalen als je met deze test aan de slag gaat
  });

  // -------------------------------------------------------------------------
  //  Test 5b: Ziet een voltooide todo er anders uit?
  // -------------------------------------------------------------------------
  //  Als een todo klaar is, moet het <li> de CSS-klasse "completed" hebben.
  //
  //  Stappen:
  //
  //    const wrapper = mountTodoItem({ id: "1", title: "Klaar", completed: true })
  //    const li = wrapper.find("li")
  //    💡 Controleer of li de CSS-klasse "completed" heeft
  //
  it("heeft de klasse 'completed' als de todo klaar is", () => {
    expect(true).toBe(false); // Deze regel mag je weghalen als je met deze test aan de slag gaat
  });

  // -------------------------------------------------------------------------
  //  Test 5c: Verwijdert klikken op het X-knopje de todo?
  // -------------------------------------------------------------------------
  //  De X-knop heeft class="destroy". Als je erop klikt,
  //  moet het component een event "delete-todo" uitsturen
  //  (tegen de ouder: "verwijder deze!").
  //
  //  Stappen:
  //
  //    const wrapper = mountTodoItem()
  //    const button = wrapper.find(".destroy")
  //    💡 Klik op de button
  //    💡 Controleer of het event "delete-todo" is uitgestuurd
  //
  it("stuurt 'delete-todo' uit als op het destroy-knopje wordt geklikt", async () => {
    expect(true).toBe(false); // Deze regel mag je weghalen als je met deze test aan de slag gaat
  });

  // -------------------------------------------------------------------------
  //  Test 5d: Kun je dubbelklikken om te bewerken?
  // -------------------------------------------------------------------------
  //  Als je dubbelklikt op de tekst, gaat de todo in "edit-modus".
  //  Dat betekent dat het <li> de CSS-klasse "editing" krijgt.
  //
  //  Stappen:
  //
  //    const wrapper = mountTodoItem()
  //    💡 Zoek het label element
  //    💡 Dubbelklik op het label
  //    💡 Controleer of het <li> element nu de CSS-klasse "editing" heeft
  //
  it("gaat in bewerkmodus als je dubbelklikt op het label", async () => {
    expect(true).toBe(false); // Deze regel mag je weghalen als je met deze test aan de slag gaat
  });

  // -------------------------------------------------------------------------
  //  🧠 BONUS: Kun je nog meer dingen testen?
  // -------------------------------------------------------------------------
  //
  //  - Wat gebeurt er als je een todo bewerkt en de titel leeg maakt?
  //    (Open TodoItem.vue en kijk naar de finishEdit-functie!)
  //
  //  - Wat als je Escape indrukt tijdens het bewerken? Wordt het geannuleerd?
  //
  //  - Is het selectievakje aangevinkt als de todo klaar is?
  //
});
