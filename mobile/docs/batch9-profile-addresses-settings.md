# Batch 9 — Profile, Addresses, Settings

**What you got**
- Account: profile slice/API/selectors and `/account` screens
- Addresses: list + create/edit + delete
- Preferences: theme/language/currency/push in Redux

**Hookups to consider**
- If your backend uses different field names for Address, adapt the payload in `addresses.api.ts` or add a transform.
- Persist preferences by adding `'preferences'` to the whitelist in `src/store/persistedStore.ts`.
- Optional: add avatar upload using `expo-image-picker` to `Account` screen.

**Navigation**
- New `Account` tab in bottom tabs.
