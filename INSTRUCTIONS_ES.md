# Guía de instalación y uso de Suite de Tests Playwright

Esta carpeta contiene los archivos base necesarios para implementar la suite de tests ETE (End-to-End) con Playwright en cualquier proyecto Magento 2.

## 1. Requerimientos Previos

Antes de comenzar, asegúrate de que el entorno donde se ejecutarán los tests (tu máquina local o servidor CI/CD) tenga instalado:

*   **Node.js**: Versión 16 o superior.
*   **NPM**: Generalmente incluido con Node.js.

## 2. Instalación / Installation

### Opción A: Composer Create Project (Recomendado)

Esta opción descarga la suite directamente en la carpeta destino, lista para ser usada y modificada. No se añade como dependencia en `composer.json` para evitar que se sobrescriban tus tests al actualizar.

```bash
composer create-project orangecat/magento2-playwright-suite dev/tests/playwright --no-install
```



### Opción B: Manual

Copia todo el contenido de esta carpeta a la ruta `dev/tests/playwright` en tu proyecto Magento 2.

La estructura final debería verse así:

```text
<proyecto-magento>/
└── dev/
    └── tests/
        └── playwright/
            ├── package.json
            ├── playwright.config.ts
            ├── INSTRUCTIONS_ES.md (este archivo)
            └── tests/
                └── _template.spec.ts
```

## 3. Instalación

Una vez copiados los archivos, abre una terminal, navega al directorio y ejecuta los comandos de instalación:

```bash
cd dev/tests/playwright

# 1. Instalar dependencias del proyecto (definidas en package.json)
npm install

# 2. Instalar los navegadores de Playwright
npx playwright install
```

> **Nota para Linux**: Si al ejecutar los tests recibes errores sobre dependencias faltantes en Linux, puede que necesites ejecutar `npx playwright install-deps` (puede requerir sudo).

## 4. Configuración

El único archivo que necesitas modificar obligatoriamente es `playwright.config.ts`.

1.  Abre `playwright.config.ts`.
2.  Busca la propiedad `baseURL` dentro de `use`.
3.  Cambia la URL por la de tu entorno de desarrollo o staging.

```typescript
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://tu-proyecto-magento.test/',
    // ...
},
```

## 5. Uso y Ejecución de Tests

### Crear un nuevo test
1.  Copia el archivo `tests/_template.spec.ts` y renómbralo (ej. `tests/checkout.spec.ts`).
2.  Edita el nuevo archivo y añade tu lógica de prueba.

### Ejecutar tests
Desde la carpeta `dev/tests/playwright`:

*   **Ejecutar todos los tests:**
    ```bash
    npx playwright test
    ```

*   **Ejecutar un test específico:**
    ```bash
    npx playwright test tests/checkout.spec.ts
    ```

*   **Modo Interactivo (UI):**
    Ideal para desarrollar y depurar.
    ```bash
    npx playwright test --ui
    ```

*   **Ver reporte HTML:**
    Si hubo fallos, puedes ver el detalle con:
    ```bash
    npx playwright show-report
    ```
