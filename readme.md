# Testworkshop — TodoMVC Vue

## Wat is dit?

Dit is een eenvoudige **Todo-app** gebouwd met Vue.js. Je kunt todos toevoegen, afvinken, verwijderen en filteren op status.

### Snelle uitleg over vue
Vue is een heel makkelijk Javascript Framework met een laagdrempelige leercurve. Je hoeft eigenlijk niet zoveel te weten over dit framework. Er worden weinig Vue-specifieke API's gebruikt, maar de test mogelijkheden in @vue/test-utils zijn ongeevernaard in andere frameworks zoals React of Angular!

Vue bestanden zijn net als in React single file components (SFC). Dat betekend dat je HTML, Javascript en CSS in een en hetzelfde bestand zitten. In het .Vue bestand dat je er straks bij pakt, is dit duidelijk zichtbaar. Er is weinig overhead, zo is de HTML geen renderfunctie die je moet returnen, maar gewoon valide HTML. 

---

## Aan de slag

Je hebt alleen **Docker** nodig. Geen Node, npm of andere tools op je eigen systeem.

### Alles opstarten

```sh
docker-compose up -d
```

Dit start twee services:

| Service | Beschrijving | URL |
|---------|--------------|-----|
| **dev** | Vite dev server met hot-reload | http://localhost:5173 |
| **app** | Productie-build (nginx) | http://localhost:8080 |

Open http://localhost:5173 in je browser en probeer het uit. Voeg wat todos toe. Vink er een paar af. Dat is de app die we gaan testen!

### Tests draaien

Tests in **watchmodus** (draait opnieuw bij elke bestandswijziging):

```sh
docker-compose exec dev npm test
```

Tests **eenmalig** draaien:

```sh
docker-compose exec dev npm run test:run
```

### Shell openen in de container

```sh
docker-compose exec dev sh
```

Vanuit de shell kun je alle npm-commando's direct uitvoeren (`npm test`, `npm run build`, enz.).

### Stoppen

```sh
docker-compose down
```

> **Zonder Docker?** Dat kan ook: `npm install` en `npm run dev` werken gewoon als je Node.js hebt geïnstalleerd.

---

## Waarom testen we?

Stel je voor dat je een regel code wijzigt en per ongeluk iets anders kapotmaakt. Zonder tests merk je het pas als een gebruiker klaagt. Met tests krijg je direct feedback: groen = alles werkt, rood = iets is stuk.

## Drie soorten tests

We werken met drie soorten tests, van simpel tot complex:

| Type | Wat het test | Voorbeeld |
|------|--------------|-----------|
| **Unittest** | Een JavaScript-functie op zichzelf | "Voegt `addTodo()` een todo toe aan de lijst?" |
| **Componenttest** | Een UI-component op zichzelf | "Zendt de header een event uit als ik Enter druk?" |
| **Integratietest** | Meerdere onderdelen samen | "Kan ik een todo toevoegen EN zie ik die in de lijst?" |

---

## Workshopoefeningen

### Stap 0 - Schakel AI uit
Schakel Github Copilot, Google Gemini, Jetbrains AI, of welke AI-assistent je ook gebruikt, tijdelijk uit. Deze workshop is bedoeld om je zelf te laten nadenken over tests schrijven en debuggen. Je zult veel leren door de foutmeldingen te lezen en zelf oplossingen te bedenken!

### Stap 1 — Draai de tests en kijk wat er gebeurt

```sh
docker-compose exec dev npm test
```

Je zou veel mislukte tests (rood) en een paar geslaagde (groen) moeten zien. Lees de foutmeldingen. Ze vertellen je precies wat er misging en waar. Dit lijkt veel, maar maak je geen zorgen, we gaan ze stap voor stap oplossen!

---

### Stap 2 — Oefening 1: Los de bug op (Unittest)

📁 Open `tests/src/services/todoService.spec.ts`

De test `deleteCompleted: should remove all completed todos` is **mislukt** omdat er een **bug** in de code van de service zit.

**Jouw taak:**
1. Lees de foutmelding — die zegt "expected 2 but got 1"
2. Open `src/services/todoService.js`
3. Zoek de functie `deleteCompleted`
4. De filtervoorwaarde is fout — hij bewaart de verkeerde todos!
5. Fix het, sla op en kijk hoe de test groen wordt ✅

---

### Stap 3 — Oefening 2: Maak de tests af (Unittest)

📁 Blijf in `tests/src/services/todoService.spec.ts`

Er zijn 4 tests met `// TODO`-commentaar en `???`-plaatsvervangers. Ze testen `toggleTodo`, `editTodo` en `deleteTodo`.

**Jouw taak:**
1. Haal de `expect(...)`-regels uit commentaar
2. Vervang elke `???` met de juiste waarde
3. Bedenk wat elke functie **zou moeten** teruggeven
4. Sla op en controleer dat de tests slagen ✅

---

### Stap 4 — Oefening 3: Schrijf je eigen tests (Unittest)

📁 Blijf in `tests/src/services/todoService.spec.ts`

Er staan 3 lege `it()`-blokken onderaan. Ze beschrijven een scenario in gewone taal.

**Jouw taak:**
1. Lees de beschrijving van elke test
2. Schrijf de testcode zelf
3. Gebruik `makeTodoList()` om testdata te maken
4. Gebruik `expect(...)` om het resultaat te controleren

Probeer ook de **bonus** — denk aan rare randgevallen, zoals "wat als de titel leeg is?"

---

### Stap 5 — Oefening 4: Fix de test (Componenttest)

📁 Open `tests/src/components/TodoHeader.spec.ts`

Dit is je eerste **componenttest**. De test mount de `TodoHeader`-component (het invoerveld bovenaan de app), typt tekst in en drukt op een toets.

Maar de test **mislukt**! Het lijkt alsof het component niet reageert.

**Jouw taak:**
1. Lees de foutmelding — die zegt dat het event nooit is uitgezonden
2. Open `tests/src/components/TodoHeader.vue` en kijk naar `@keyup.enter` in de template
3. Kijk nu naar de test — welk event triggert die?
4. Zie je het verschil? Fix de test, sla op en kijk hoe hij groen wordt ✅

---

### Stap 6 — Oefening 5: Schrijf componenttests (Componenttest)

📁 Open `tests/src/components/TodoItem.spec.ts`

Er zijn 4 lege tests met stap-voor-stap instructies. Elke test controleert iets anders aan de `TodoItem`-component (een rij in de todo-lijst).

**Jouw taak:**
1. **Test 5a** — Mount de component, zoek de `<label>`, check de tekst
2. **Test 5b** — Mount met `completed: true`, check dat de `<li>` de class "completed" heeft
3. **Test 5c** — Klik op de `.destroy`-knop, check dat "delete-todo" is uitgezonden
4. **Test 5d** — Dubbelklik op het label, check dat de `<li>` de class "editing" heeft

Elke test heeft een `Steps:`-sectie die precies zegt wat je moet doen. Volg ze als een recept!

---

### Stap 7 — Oefening 6: Integratietests

📁 Open `tests/integration/TodoIntegration.spec.ts`

Nu testen we de **hele app** — header, lijst en footer samen. Een test is al af zodat je het patroon kunt zien.

**Jouw taak:**
1. **Test 6a** — Er is een deels complete test. Voeg de ontbrekende regel toe om de todo-teller te checken
2. **Test 6b** — Schrijf een volledige test: voeg 2 todos toe, vink er een af, klik op "Clear Completed", check dat er nog maar 1 over is
3. **Bonus** — Probeer de route-filter-uitdaging: navigeer naar `/active` en `/completed` en check dat de juiste todos getoond worden

---

## Snelle referentie

### Vitest — resultaten controleren

```js
expect(value).toBe("hello")        // waarde moet gelijk zijn aan "hello"
expect(value).toBeTruthy()          // waarde mag niet null/undefined/false zijn
expect(array).toHaveLength(3)       // array heeft 3 items
expect(array).toContain("item")     // array bevat "item"
expect(value).toBeUndefined()       // waarde is undefined
```

### Vue Test Utils — werken met componenten

```js
const wrapper = mount(MyComponent)         // maak de component
wrapper.find(".my-class")                  // vind een element (zoals querySelector)
wrapper.find(".my-class").text()           // haal de tekst op
wrapper.find(".my-class").classes()        // haal CSS-classes op als array
wrapper.find("input").setValue("hello")    // typ in een input
wrapper.find("button").trigger("click")    // klik een knop
wrapper.find("input").trigger("keyup.enter") // druk op Enter
wrapper.emitted("event-name")             // check of event is uitgezonden
wrapper.findAll("li")                      // vind ALLE bijpassende elementen
```

## Bestandoverzicht

```
src/
  services/
    todoService.ts              ← Pure JS-functies (wat we unittesten)
  components/
    TodoHeader.vue              ← Het invoerveld bovenaan
    TodoItem.vue                ← Een rij in de todo-lijst
    TodoFooter.vue              ← De teller + filterlinks onderaan
    TodosComponent.vue          ← De hoofdcomponent die alles samenbrengt
tests/                          ← Alle tests staan hier (spiegelt src/)
  services/
    todoService.spec.ts         ← Oefeningen 1-3 (unittests)
  components/
    TodoHeader.spec.ts          ← Oefening 4 (componenttest)
    TodoItem.spec.ts            ← Oefening 5 (componenttest)
  integration/
    TodoIntegration.spec.ts     ← Oefening 6 (integratietest)
```

## Licensing & attribution

This repository is an educational fork based on the TodoMVC project (TasteJS).

- Upstream-derived application code and assets are licensed under the **MIT License** (see `license.md`).
- Educational/workshop materials (the instructions in `readme.md` and files under `tests/**`) are licensed under **CC BY 4.0** (see `LICENSE-EDU`).

See `NOTICE` for attribution details.
