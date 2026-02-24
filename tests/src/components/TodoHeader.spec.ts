// =============================================================================
//  COMPONENT TEST — TodoHeader.spec.js
// =============================================================================
//
//  Wat zijn component tests?
//  In plaats van een gewone functie te testen, testen we nu een stuk van de UI.
//  We maken het component aan in een nep-browser en doen alsof we een gebruiker zijn:
//  we typen tekst, drukken op toetsen, klikken op knoppen — en controleren wat er gebeurt.
//
//  Je kent dit al van React! Het is hetzelfde idee.
//
//  De tools die we gebruiken (spiekbriefje):
//
//    mount(MyComponent)           → Maak het component aan (zoals renderen)
//    wrapper.find(".my-class")    → Zoek een HTML-element (zoals querySelector)
//    wrapper.find("input").setValue("hi")  → Typ "hi" in een invoerveld
//    wrapper.find("input").trigger("keyup.enter") → Druk op de Enter-toets
//    wrapper.emitted("event-name") → Heeft het component dit event afgevuurd?
//
// =============================================================================

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory, type Router } from "vue-router";
import TodoHeader from "@/components/TodoHeader.vue";

// ---------------------------------------------------------------------------
//  Maak je geen zorgen over deze functie — hij zet alleen een nep-router op.
//  De TodoHeader heeft een link, dus Vue heeft een router nodig om te werken.
//  Je hoeft hier niets aan te veranderen.
// ---------------------------------------------------------------------------
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });
}

// ===========================================================================
//  Oefening 4 — 🔴 Los de falende test op
// ===========================================================================
//
//  De eerste test slaagt. De tweede test FAALT.
//
//  HOE DOE JE DIT:
//  1. Voer `npm test` uit en bekijk de fout
//  2. Open het bestand: src/components/TodoHeader.vue
//  3. Zoek deze regel:  @keyup.enter="..."
//     Dit betekent: "als de gebruiker de Enter-toets LOSLAAT, doe iets"
//  4. Kijk nu naar de test hieronder — welk event triggert hij?
//     Zie je de mismatch?
//  5. Pas de test aan zodat hij hetzelfde event triggert als het component verwacht
//  6. Sla op en de test wordt groen!
//
describe("Oefening 4 — TodoHeader component", () => {
  it("moet een input renderen met de juiste placeholder", () => {
    const wrapper = mount(TodoHeader, {
      global: { plugins: [makeRouter()] },
    });

    // Zoek het inputveld (heeft class="new-todo" in de HTML)
    const input = wrapper.find(".new-todo");

    // Bestaat het inputveld?
    expect(input.exists()).toBe(true);

    // Heeft het de juiste placeholdertekst?
    expect(input.attributes("placeholder")).toBe("What needs to be done?");
  });

  // ❌ DEZE TEST FAALT — kun je zien waarom?
  it("moet 'add-todo' emitten als de gebruiker typt en op Enter drukt", async () => {
    const wrapper = mount(TodoHeader, {
      global: { plugins: [makeRouter()] },
    });

    // Zoek het inputveld
    const input = wrapper.find(".new-todo");

    // Typ "Buy milk" in het inputveld
    await input.setValue("Buy milk");

    // Druk op Enter — maar is "keydown" wel correct? 🤔
    // Vergelijk dit met wat TodoHeader.vue daadwerkelijk luistert!
    await input.trigger("keydown.enter");

    // Controleer: heeft het component zijn ouder verteld "voeg deze todo toe"?
    // In Vue praten componenten met ouders via "events" (zoals callbacks in React)
    const emitted = wrapper.emitted("add-todo");
    expect(emitted).toBeTruthy();

    const firstCall = emitted?.[0];
    expect(firstCall).toBeTruthy();

    // Controleer: is de juiste tekst meegestuurd?
    expect(firstCall?.[0]).toBe("Buy milk");
  });

  // -----------------------------------------------------------------
  //  🏗️ BONUS: Na het drukken op Enter moet het inputveld leeg zijn
  //  (zodat de gebruiker meteen een nieuwe todo kan typen).
  //
  //  Schrijf een test die dit controleert!
  //  Tip: na Enter, check  input.element.value === ""
  // -----------------------------------------------------------------
});
