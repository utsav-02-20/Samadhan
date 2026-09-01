/**
 * ============================================================================
 * File: index.js
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Entry point of the Citizens module.
 *
 * Functionality:
 * - Imports and groups all Citizen module components.
 * - Exports the Citizen router for use in the application's main router.
 * - Keeps the module modular and easy to import with a single file.
 *
 * Used By:
 * - src/routes/index.js
 * ============================================================================
 */

import citizenRoutes from "./routes/citizen.routes.js";

export default citizenRoutes;