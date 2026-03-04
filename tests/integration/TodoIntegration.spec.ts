// =============================================================================
//  INTEGRATIE TEST — TodoIntegration.spec.js
// =============================================================================
//
//  Tot nu toe hebben we getest:
//  - Unit tests:      één functie per keer (gewoon JavaScript)
//  - Component tests: één UI-component per keer
//
//  Nu testen we ALLES SAMEN — zoals een echte gebruiker de app gebruikt!
//
//  We laden de hele todo-app (header + lijst + footer), typen todos,
//  vinken ze af, verwijderen ze, en kijken of alles werkt.
//
//  Dit komt het dichtst bij het daadwerkelijk openen van de app in je browser
//  en rondklikken — maar geautomatiseerd, dus het draait in milliseconden!
//
// Naarmate je app groeit kan je ook kleinere onderdelen integratie testen, want de focus ligt op het testen van de samenwerking tussen componenten. Maar deze test is een goed voorbeeld van een "end-to-end" integratietest, waarbij we de hele app testen als één geheel.
// Als je app groeit, kan je echte E2E testen overwegen met tools zoals Cypress of Playwright, die de app in een echte browser testen.
// =============================================================================

import { describe, it, expect } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createRouter, createMemoryHistory, type Router } from "vue-router";
import TodosComponent from "@/components/TodosComponent.vue";

// ---------------------------------------------------------------------------
//  Maak je geen zorgen hierover — dit maakt een nep-router aan voor de app.
//  De app heeft 3 pagina's: Alles, Actief, Voltooid (ze filteren de lijst).
// ---------------------------------------------------------------------------
function makeRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "all", component: { template: "<div />" } },
      { path: "/active", name: "active", component: { template: "<div />" } },
      {
        path: "/completed",
        name: "completed",
        component: { template: "<div />" },
      },
    ],
  });
}

// ---------------------------------------------------------------------------
//  Dit start de hele app — header, lijst, footer, alles.
// ---------------------------------------------------------------------------
async function mountApp(): Promise<{ wrapper: VueWrapper<any>; router: Router }> {
  const router = makeRouter();
  await router.push("/");
  await router.isReady();

  const wrapper = mount(TodosComponent, {
    global: { plugins: [router] },
  });

  return { wrapper, router };
}

// ---------------------------------------------------------------------------
//  Dit doet wat een gebruiker doet: tekst typen in het invoerveld en op Enter drukken.
//  We hergebruiken dit in elke test zodat we onszelf niet herhalen.
// ---------------------------------------------------------------------------
async function addTodo(wrapper: VueWrapper<any>, title: string): Promise<void> {
  const input = wrapper.find(".new-todo");
  await input.setValue(title);
  await input.trigger("keyup.enter");
}

// ===========================================================================
//  Oefening 6 — Integratie tests
// ===========================================================================

describe("Oefening 6 — Volledige app integratie", () => {
  // -------------------------------------------------------------------------
  //  ✅ Deze test is af — lees hem om te zien hoe het werkt!
  //  Let op het patroon: start app → doe dingen → controleer het resultaat.
  // -------------------------------------------------------------------------
  it("voegt een todo toe en toont deze in de lijst", async () => {
    // Start de app
    const { wrapper } = await mountApp();

    // Typ "Integration test todo" en druk op Enter
    await addTodo(wrapper, "Integration test todo");

    // Zoek alle <li>-elementen in de todo-lijst
    const items = wrapper.findAll(".todo-list li");

    // Er moet nu precies 1 todo zijn
    expect(items).toHaveLength(1);

    // En deze moet de getypte tekst bevatten
    expect(items[0].text()).toContain("Integration test todo");
  });

  // -------------------------------------------------------------------------
  //  Test 6a — 🏗️ Voeg één regel toe om deze test af te maken
  // -------------------------------------------------------------------------
  //  We voegen 3 todos toe en vinken er één af.
  //  De teller onderaan moet nu "2" zeggen (want er zijn er nog 2 over).
  //
  //  Alles is gedaan behalve de laatste regel — die voeg jij toe!
  //
  it("laat het juiste aantal overgebleven todos zien na afvinken", async () => {
    const { wrapper } = await mountApp();

    // Voeg 3 todos toe
    await addTodo(wrapper, "Eerste");
    await addTodo(wrapper, "Tweede");
    await addTodo(wrapper, "Derde");

    // Vink de eerste todo af (klik op het selectievakje)
    const firstCheckbox = wrapper.find(".todo-list li .toggle");
    await firstCheckbox.setValue(true);

    // JOUW BEURT: controleer dat de teller "2" zegt
    // De teller heeft class="todo-count". Haal de tekst op en controleer of die "2" bevat.
    const count = wrapper.find(".todo-count");
    expect(count.text()).toContain("2");
  });

  // -------------------------------------------------------------------------
  //  Test 6b — 📝 Schrijf deze hele test zelf!
  // -------------------------------------------------------------------------
  //  Dit moet er gebeuren:
  //  1. Start de app                         (const { wrapper } = await mountApp())
  //  2. Voeg 2 todos toe                      (await addTodo(wrapper, "Eerste"))
  //  3. Vink de eerste af                     (zoek het selectievakje, setValue(true))
  //  4. Klik op de knop "Clear Completed"     (zoek ".clear-completed", trigger "click")
  //  5. Controleer dat er nog maar 1 todo is  (findAll ".todo-list li", verwacht lengte 1)
  //
  it("verwijdert voltooide todos als op 'Clear Completed' wordt geklikt", async () => {
    const { wrapper } = await mountApp();

    // Voeg 2 todos toe
    await addTodo(wrapper, "Eerste");
    await addTodo(wrapper, "Tweede");

    // Vink de eerste af
    const firstCheckbox = wrapper.find(".todo-list li .toggle");
    await firstCheckbox.setValue(true);

    // Klik op "Clear Completed"
    const clearBtn = wrapper.find(".clear-completed");
    await clearBtn.trigger("click");

    // Er moet nog maar 1 todo over zijn
    const items = wrapper.findAll(".todo-list li");
    expect(items).toHaveLength(1);
  });

  // -------------------------------------------------------------------------
  //  🧠 BONUS: Test de filterlinks (All / Active / Completed)
  //
  //  ℹ️ LET OP: De oplossingen hieronder zijn VOORBEELDEN.
  //  Jouw tests mogen er anders uitzien en toch correct zijn!
  //  Bijvoorbeeld: je kunt ook de tekst van elke todo controleren,
  //  of je kunt alle 3 de routes in één test combineren.
  //  Zolang je controleert dat de juiste todos zichtbaar zijn, is het goed.
  // -------------------------------------------------------------------------

  // -- Bonus: /active filter ------------------------------------------------
  // Na het afvinken van 1 van 3 todos en navigeren naar /active,
  // moeten alleen de 2 actieve (niet-afgevinkte) todos zichtbaar zijn.
  // Je zou hier ook kunnen checken welke titels er WEL staan.
  it("filtert todos op /active — toont alleen actieve todos", async () => {
    const { wrapper, router } = await mountApp();

    // Voeg 3 todos toe
    await addTodo(wrapper, "Eerste");
    await addTodo(wrapper, "Tweede");
    await addTodo(wrapper, "Derde");

    // Vink de eerste af (completed = true)
    const firstCheckbox = wrapper.find(".todo-list li .toggle");
    await firstCheckbox.setValue(true);

    // Ga naar de /active pagina
    await router.push("/active");
    await wrapper.vm.$nextTick(); // wacht tot Vue de DOM heeft bijgewerkt

    // Alleen de 2 niet-afgevinkte todos moeten zichtbaar zijn
    expect(wrapper.findAll(".todo-list li")).toHaveLength(2);
  });

  // -- Bonus: /completed filter ---------------------------------------------
  // Zelfde opzet, maar nu navigeren we naar /completed.
  // Alleen de 1 afgevinkte todo moet zichtbaar zijn.
  it("filtert todos op /completed — toont alleen voltooide todos", async () => {
    const { wrapper, router } = await mountApp();

    await addTodo(wrapper, "Eerste");
    await addTodo(wrapper, "Tweede");
    await addTodo(wrapper, "Derde");

    // Vink de eerste af
    const firstCheckbox = wrapper.find(".todo-list li .toggle");
    await firstCheckbox.setValue(true);

    // Ga naar de /completed pagina
    await router.push("/completed");
    await wrapper.vm.$nextTick();

    // Alleen de 1 voltooide todo moet zichtbaar zijn
    expect(wrapper.findAll(".todo-list li")).toHaveLength(1);
  });

  // -- Bonus: terug naar / (all) --------------------------------------------
  // Na het wisselen van filters moet / weer ALLE todos tonen.
  // Dit bewijst dat filteren geen todos verwijdert — het verbergt ze alleen.
  it("toont alle todos op / na filteren", async () => {
    const { wrapper, router } = await mountApp();

    await addTodo(wrapper, "Eerste");
    await addTodo(wrapper, "Tweede");
    await addTodo(wrapper, "Derde");

    // Vink de eerste af
    const firstCheckbox = wrapper.find(".todo-list li .toggle");
    await firstCheckbox.setValue(true);

    // Ga heen en weer tussen filters
    await router.push("/active");
    await wrapper.vm.$nextTick();
    await router.push("/");
    await wrapper.vm.$nextTick();

    // Terug op / moeten ALLE 3 todos weer zichtbaar zijn
    expect(wrapper.findAll(".todo-list li")).toHaveLength(3);
  });
});
