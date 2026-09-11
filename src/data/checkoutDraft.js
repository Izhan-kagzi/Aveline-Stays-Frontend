const KEY = "aveline_checkout_draft";

/**
 * The "shopping cart" for this app is a single pending booking selected on a
 * hotel's page. It's persisted to sessionStorage (not just router state) so
 * a page refresh on /checkout doesn't lose it, and it's explicitly cleared
 * once a payment succeeds and the booking is written.
 */
export function saveCheckoutDraft(draft) {
  sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function loadCheckoutDraft() {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearCheckoutDraft() {
  sessionStorage.removeItem(KEY);
}
