/* =====================================================================
   safeStorage — localStorage with an in-memory fallback.
   NOTE: real localStorage works in your own Vite app. Inside the
   Claude.ai artifact preview, browser storage is blocked, so this
   transparently falls back to memory (works for the session, won't
   survive a reload here). Same code, no changes needed in your repo.
   ===================================================================== */
export const safeStorage = (() => {
  let backend;
  try {
    const k = "__probe__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    backend = window.localStorage;
  } catch {
    const mem = new Map();
    backend = {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => mem.set(k, String(v)),
      removeItem: (k) => mem.delete(k),
    };
  }
  return {
    get: (k) => { try { return backend.getItem(k); } catch { return null; } },
    set: (k, v) => { try { backend.setItem(k, v); } catch {} },
    del: (k) => { try { backend.removeItem(k); } catch {} },
  };
})();
