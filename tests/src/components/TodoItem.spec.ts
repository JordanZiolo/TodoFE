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
    const wrapper = mountTodoItem();
    const label = wrapper.find("label");
    expect(label.text()).toBe("Test todo");
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
    const wrapper = mountTodoItem({ id: "1", title: "Klaar", completed: true });
    const li = wrapper.find("li");
    expect(li.classes()).toContain("completed");
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
    const wrapper = mountTodoItem();
    const button = wrapper.find(".destroy");
    await button.trigger("click");
    expect(wrapper.emitted("delete-todo")).toBeTruthy();
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
    const wrapper = mountTodoItem();
    const label = wrapper.find("label");
    await label.trigger("dblclick");
    expect(wrapper.find("li").classes()).toContain("editing");
  });

  // -------------------------------------------------------------------------
  //  🧠 BONUS: Extra tests
  //
  //  ℹ️ LET OP: De oplossingen hieronder zijn VOORBEELDEN.
  //  Er zijn meerdere goede manieren om hetzelfde gedrag te testen!
  //  Jouw aanpak mag anders zijn — zolang je het juiste gedrag controleert.
  //  Bijvoorbeeld: je kunt ook op specifieke event-payloads checken,
  //  of andere CSS-klassen/attributen gebruiken als bewijs.
  // -------------------------------------------------------------------------

  // -- Bonus: lege titel = verwijderen --------------------------------------
  // In TodoItem.vue checkt finishEdit() of de tekst leeg is.
  // Zo ja: dan wordt deleteTodo() aangeroepen i.p.v. updateTodo().
  // We controleren dat het event "delete-todo" wordt uitgestuurd.
  // Je zou ook kunnen checken dat "edit-todo" NIET werd uitgestuurd.
  it("stuurt 'delete-todo' uit als je de titel leeg maakt tijdens bewerken", async () => {
    const wrapper = mountTodoItem();

    // Dubbelklik om in bewerkmodus te gaan
    await wrapper.find("label").trigger("dblclick");

    // Maak de titel leeg en druk op Enter
    const editInput = wrapper.find(".edit");
    await editInput.setValue("");
    await editInput.trigger("keyup.enter");

    // finishEdit verwijdert de todo als de titel leeg is
    expect(wrapper.emitted("delete-todo")).toBeTruthy();
  });

  // -- Bonus: annuleer bewerken via blur ------------------------------------
  // Als het invoerveld focus verliest (blur), wordt cancelEdit() aangeroepen.
  // De "editing" klasse verdwijnt dan.
  // Alternatief: je zou ook @keyup.escape kunnen testen als dat in de
  // template was gekoppeld — in dit component wordt blur gebruikt.
  it("annuleert bewerken als het invoerveld focus verliest (blur)", async () => {
    const wrapper = mountTodoItem();

    // Ga in bewerkmodus
    await wrapper.find("label").trigger("dblclick");
    expect(wrapper.find("li").classes()).toContain("editing");

    // Verlaat het invoerveld (blur) → editing stopt
    const editInput = wrapper.find(".edit");
    await editInput.trigger("blur");
    expect(wrapper.find("li").classes()).not.toContain("editing");
  });

  // -- Bonus: checkbox status ------------------------------------------------
  // Het selectievakje moet de "completed" status van de todo reflecteren.
  // Je zou ook v-model of toggleModel kunnen testen — dit is simpeler.
  it("heeft het selectievakje aangevinkt als de todo klaar is", () => {
    const wrapper = mountTodoItem({ id: "1", title: "Klaar", completed: true });
    const checkbox = wrapper.find(".toggle");
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
  });

  it("heeft het selectievakje NIET aangevinkt als de todo niet klaar is", () => {
    const wrapper = mountTodoItem({ id: "1", title: "Bezig", completed: false });
    const checkbox = wrapper.find(".toggle");
    expect((checkbox.element as HTMLInputElement).checked).toBe(false);
  });
});
