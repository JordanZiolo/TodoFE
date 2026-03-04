// =============================================================================
//  UNIT TESTS — todoService.spec.js
// =============================================================================
//
//  Wat zijn unit tests?
//  Unit tests controleren of ÉÉN functie doet wat hij moet doen.
//  Geen website, geen knoppen, geen Vue — gewoon puur JavaScript.
//
//  Hoe werkt een test?
//  1. Je geeft een functie invoer             (bijv. een lijst met todos)
//  2. De functie doet zijn werk               (bijv. verwijdert voltooide todos)
//  3. Je controleert of de uitvoer klopt      (bijv. alleen actieve todos over)
//
//  Dat is alles! Invoer → Functie → Controleer uitvoer.
//
//  Voer alle tests uit met:  npm test
// =============================================================================

import { describe, it, expect } from "vitest";
import type { Todo } from "@/types/todo";
import {
  createTodo,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  deleteCompleted,
  getActiveTodos,
  getCompletedTodos,
} from "@/services/todoService";

// ---------------------------------------------------------------------------
//  Deze hulpfunctie geeft ons een kant-en-klare todo-lijst voor onze tests.
//  Hij bevat 3 todos: 2 actief (niet klaar) en 1 voltooid (klaar).
// ---------------------------------------------------------------------------
function makeTodoList(): Todo[] {
  return [
    { id: "1", title: "Buy groceries", completed: false }, // actief
    { id: "2", title: "Walk the dog", completed: true }, // voltooid!
    { id: "3", title: "Do homework", completed: false }, // actief
  ];
}

// ===========================================================================
//  Oefening 1 — 🔴 Los de falende test op
// ===========================================================================
//
//  HOE DOE JE DIT:
//  1. Voer `npm test` uit in je terminal
//  2. Je ziet een rode fout — LEES HEM! Er staat iets als:
//     "expected 2 but got 1"
//  3. Open het bestand: src/services/todoService.js
//  4. Zoek de functie genaamd `deleteCompleted`
//  5. Er zit iets omgedraaid in het filter — zie je het?
//  6. Fix het, sla het bestand op, en de test wordt groen!
//
describe("Oefening 1 — Los de bug op in deleteCompleted", () => {
  it("addTodo: voegt een nieuwe todo toe aan een lege lijst", () => {
    const result = addTodo([], "Learn testing");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Learn testing");
    expect(result[0].completed).toBe(false);
    expect(result[0].id).toBeDefined();
  });

  it("addTodo: voegt een todo toe aan een bestaande lijst zonder deze te wijzigen", () => {
    const original = makeTodoList();
    const result = addTodo(original, "New todo");

    // De nieuwe lijst moet één item meer hebben
    expect(result).toHaveLength(4);
    // De originele lijst mag NIET gewijzigd zijn (immutability!)
    expect(original).toHaveLength(3);
  });

  // ❌ DEZE TEST FAALT — vind en fix de bug in todoService.js
  it("deleteCompleted: verwijdert alle voltooide todos", () => {
    const todos = makeTodoList();
    // todos[1] ("Walk the dog") is voltooid

    const result = deleteCompleted(todos);

    // Na het verwijderen van voltooide todos moeten alleen de actieve overblijven
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Buy groceries");
    expect(result[1].title).toBe("Do homework");
  });
});

// ===========================================================================
//  Oefening 2 — 🏗️ Maak de test af
// ===========================================================================
//
//  HOE DOE JE DIT:
//  1. Bekijk elke test hieronder — sommige regels beginnen met  // (uitgecomment)
//  2. Verwijder de // om ze te "uncommenten"
//  3. Vervang elke ??? met de waarde die je denkt dat correct is
//
//  Voorbeeld:  expect(result.completed).toBe(???)
//  Wordt:      expect(result.completed).toBe(true)
//
//  Denk na: als ik deze functie deze invoer geef,
//  wat moet er dan uitkomen?
//
describe("Oefening 2 — Maak de assertions af", () => {
  it("toggleTodo: zet een todo op voltooid", () => {
    const todo = { id: "1", title: "Test me", completed: false };

    const result = toggleTodo(todo, true);

    // Na toggelen naar true, wat moet completed zijn?
    expect(result.completed).toBe(true);

    // Is de titel veranderd? Dat mag niet!
    expect(result.title).toBe("Test me");
  });

  it("toggleTodo: zet een voltooide todo weer op actief", () => {
    const todo = { id: "1", title: "Test me", completed: true };

    const result = toggleTodo(todo, false);

    expect(result.completed).toBe(false);
    expect(result.title).toBe("Test me");
  });

  it("editTodo: verandert de titel van een todo", () => {
    const todo = { id: "1", title: "Old title", completed: false };

    const result = editTodo(todo, "New title");

    // Wat moet de nieuwe titel zijn?
    expect(result.title).toBe("New title");

    // Is completed veranderd? Dat mag niet — we hebben alleen de titel aangepast!
    expect(result.completed).toBe(false);

    // Is het ORIGINELE todo-object veranderd? Nee — editTodo geeft een kopie terug.
    expect(todo.title).toBe("Old title");
  });

  it("deleteTodo: verwijdert een specifieke todo uit de lijst", () => {
    const todos = makeTodoList();
    const todoToDelete = todos[1]; // "Walk the dog"

    const result = deleteTodo(todos, todoToDelete);

    // Hoeveel todos moeten er over zijn na verwijderen?
    expect(result).toHaveLength(2);

    // Is "Walk the dog" weg? Deze regel checkt dat hij NIET meer in de lijst staat:
    expect(result.find(t => t.title === "Walk the dog")).toBeUndefined();
  });
});

// ===========================================================================
//  Oefening 3 — 📝 Schrijf je eigen tests vanaf nul
// ===========================================================================
//
//  Nu schrijf JIJ de tests! Geen invuloefeningen meer.
//  Elke test hieronder vertelt je wat je moet controleren. Jij schrijft de code.
//
//  Dit is het patroon — elke test ziet er zo uit:
//
//    it("beschrijving van wat je test", () => {
//      // 1. VOORBEREIDING: maak de data aan die je nodig hebt
//      const todos = makeTodoList();
//
//      // 2. VOER UIT: roep de functie aan
//      const result = someFunction(todos);
//
//      // 3. CONTROLEER: werkte het?
//      expect(result).toHaveLength(2);
//    });
//
describe("Oefening 3 — Schrijf je eigen tests", () => {
  it("getActiveTodos: geeft alleen niet-voltooide todos terug", () => {
    const todos = makeTodoList();

    const result = getActiveTodos(todos);

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Buy groceries");
    expect(result[1].title).toBe("Do homework");
  });

  it("getCompletedTodos: geeft alleen voltooide todos terug", () => {
    const todos = makeTodoList();

    const result = getCompletedTodos(todos);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Walk the dog");
  });

  it("createTodo: maakt een todo met de opgegeven titel", () => {
    const result = createTodo("Mijn nieuwe todo");

    expect(result.title).toBe("Mijn nieuwe todo");
    expect(result.completed).toBe(false);
    expect(result.id).toBeDefined();
  });

  // ===========================================================================
  //  🧠 BONUS — Wat als er rare situaties zijn?
  // ===========================================================================
  //
  //  Goede testers denken aan edge cases — dingen die mis kunnen gaan.
  //  Probeer tests te schrijven voor:
  //
  //  - Wat als je een todo toevoegt met een lege titel ""?
  //  - Wat als je probeert een todo te verwijderen die niet in de lijst staat?
  //  - Wat als je deleteCompleted aanroept maar er is niets voltooid?
  //  - Wat als ALLE todos voltooid zijn en je roept getActiveTodos aan?
  //  - Wat als de lijst leeg is?
  //
  //  Hier is er één als voorbeeld — kopieer dit patroon voor de rest:
  //
  //  ℹ️ LET OP: De oplossingen hieronder zijn VOORBEELDEN.
  //  Er zijn meerdere goede manieren om dezelfde situatie te testen.
  //  Jouw tests mogen er anders uitzien en toch correct zijn!
  //  Bijvoorbeeld: je kunt ook checken op specifieke titels i.p.v. alleen
  //  de lengte, of je kunt andere edge-case scenario's bedenken.

  // -- Voorbeeld edge case: alles is al voltooid --------------------------
  // Als alle todos klaar zijn, hoort getActiveTodos een lege lijst terug te geven.
  it("getActiveTodos: geeft een lege array terug als alles voltooid is", () => {
    const todos = [
      { id: "1", title: "Klaar 1", completed: true },
      { id: "2", title: "Klaar 2", completed: true },
    ];
    const result = getActiveTodos(todos);
    expect(result).toHaveLength(0);
  });

  // -- Edge case: lege titel -----------------------------------------------
  // Wat als iemand per ongeluk een todo aanmaakt zonder tekst?
  // addTodo maakt gewoon een todo aan — het controleert zelf niet op lege tekst.
  // Je zou ook kunnen testen dat de titel exact "" is, of dat id gedefinieerd is.
  it("addTodo: voegt een todo toe met een lege titel", () => {
    const result = addTodo([], "");

    // De functie maakt hem gewoon aan — hij valideert niet.
    // In een echte app zou je misschien WEL een check willen toevoegen!
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("");
    expect(result[0].completed).toBe(false);
  });

  // -- Edge case: verwijder iets dat niet bestaat ---------------------------
  // deleteTodo filtert op referentie (===). Als de todo niet in de lijst zit,
  // wordt er niets verwijderd. De originele lijst blijft intact.
  // Een andere geldige aanpak: check dat de titels van alle 3 items nog kloppen.
  it("deleteTodo: lijst blijft ongewijzigd als de todo niet in de lijst staat", () => {
    const todos = makeTodoList();
    const unknown = { id: "999", title: "Onbekend", completed: false };
    const result = deleteTodo(todos, unknown);
    expect(result).toHaveLength(3);
  });

  // -- Edge case: niets voltooid → deleteCompleted doet niets ---------------
  // Als er geen voltooide todos zijn, krijg je gewoon alles terug.
  // Je zou ook kunnen controleren dat de titels exact overeenkomen.
  it("deleteCompleted: geeft dezelfde items terug als er niets voltooid is", () => {
    const todos = [
      { id: "1", title: "Actief 1", completed: false },
      { id: "2", title: "Actief 2", completed: false },
    ];
    const result = deleteCompleted(todos);
    expect(result).toHaveLength(2);
  });

  // -- Edge case: geen voltooide todos → getCompletedTodos = leeg -----------
  // Simpel: als niets voltooid is, krijg je een lege array terug.
  it("getCompletedTodos: geeft een lege array terug als niets voltooid is", () => {
    const todos = [
      { id: "1", title: "Actief", completed: false },
    ];
    const result = getCompletedTodos(todos);
    expect(result).toHaveLength(0);
  });

  // -- Edge case: volledig lege lijst ---------------------------------------
  // Dit zijn de simpelste edge cases: een lege array als invoer.
  // Je zou dit ook in één test kunnen combineren — dat is ook prima!
  it("getActiveTodos: geeft een lege array terug bij een lege lijst", () => {
    const result = getActiveTodos([]);
    expect(result).toHaveLength(0);
  });

  it("getCompletedTodos: geeft een lege array terug bij een lege lijst", () => {
    const result = getCompletedTodos([]);
    expect(result).toHaveLength(0);
  });

  // -- Edge case: alles voltooid → deleteCompleted maakt de lijst leeg ------
  // Als alle todos klaar zijn en je ruimt op, houd je niets over.
  it("deleteCompleted: geeft een lege array terug als alles voltooid is", () => {
    const todos = [
      { id: "1", title: "Klaar 1", completed: true },
      { id: "2", title: "Klaar 2", completed: true },
    ];
    const result = deleteCompleted(todos);
    expect(result).toHaveLength(0);
  });
});
