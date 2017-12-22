/**
 * Samwell typescript definition
 *
 * @author Abi Hafshin
 */

// add declaration for 'register-server' module
declare module 'samwell/register-server' {
  import { Logger } from 'samwell/lib/logger';
  function registerServer(logger: Logger): void;
  export = registerServer;
}

// ---------------------------------------------------------------------------
// ------------------------- Below is generated code -------------------------
// ---------------------------------------------------------------------------

