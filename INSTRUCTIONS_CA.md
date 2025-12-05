# Guia de Suite de Tests Playwright

Aquesta carpeta conté els fitxers base necessaris per implementar la suite de tests ETE (End-to-End) amb Playwright a qualsevol projecte Magento.

## 1. Requeriments Previs

Abans de començar, assegura't que l'entorn on s'executaran els tests (la teva màquina local o servidor CI/CD) tingui instal·lat:

*   **Node.js**: Versió 16 o superior.
*   **NPM**: Generalment inclòs amb Node.js.

## 2. Instal·lació

### Opció A: Composer Create Project (Recomanat)

Aquesta opció descarrega la suite directament a la carpeta destí, llesta per ser usada i modificada. No s'afegeix com a dependència a `composer.json` per evitar que se sobrescriguin els teus tests en actualitzar.

```bash
composer create-project orangecat/magento2-playwright-suite dev/tests/playwright
```

*Nota: Si el paquet està en un repositori privat, afegeix `--repository-url="..."` a la comanda.*

### Opció B: Manual

Copia tot el contingut d'aquesta carpeta (`playwright`) a la ruta `dev/tests/playwright` al teu nou projecte Magento.

L'estructura final hauria de veure's així:

```text
<projecte-magento>/
└── dev/
    └── tests/
        └── playwright/
            ├── package.json
            ├── playwright.config.ts
            ├── INSTRUCTIONS_CA.md (aquest fitxer)
            └── tests/
                └── _template.spec.ts
```

## 3. Instal·lació

Un cop copiats els fitxers, obre una terminal, navega al directori i executa les comandes d'instal·lació:

```bash
cd dev/tests/playwright

# 1. Instal·lar dependències del projecte (definides a package.json)
npm install

# 2. Instal·lar els navegadors de Playwright
npx playwright install
```

> **Nota per a Linux**: Si en executar els tests reps errors sobre dependències que falten a Linux, potser necessites executar `npx playwright install-deps` (pot requerir sudo).

## 4. Configuració

L'únic fitxer que necessites modificar obligatòriament és `playwright.config.ts`.

1.  Obre `playwright.config.ts`.
2.  Busca la propietat `baseURL` dins de `use`.
3.  Canvia la URL per la del teu entorn de desenvolupament o staging.

```typescript
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://el-teu-projecte-magento.test/',
    // ...
},
```

## 5. Ús i Execució de Tests

### Crear un nou test
1.  Copia el fitxer `tests/_template.spec.ts` i reanomena'l (ex. `tests/checkout.spec.ts`).
2.  Edita el nou fitxer i afegeix la teva lògica de prova.

### Executar tests
Des de la carpeta `dev/tests/playwright`:

*   **Executar tots els tests:**
    ```bash
    npx playwright test
    ```

*   **Executar un test específic:**
    ```bash
    npx playwright test tests/checkout.spec.ts
    ```

*   **Mode Interactiu (UI):**
    Ideal per desenvolupar i depurar.
    ```bash
    npx playwright test --ui
    ```

*   **Veure report HTML:**
    Si hi ha hagut fallades, pots veure el detall amb:
    ```bash
    npx playwright show-report
    ```
