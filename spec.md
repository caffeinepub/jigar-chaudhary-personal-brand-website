# Specification

## Summary
**Goal:** Fix the Admin Panel routing in `App.tsx` so it works with the deployed site's hash-based SPA navigation.

**Planned changes:**
- Update the routing logic in `App.tsx` to detect the `/admin` path within `window.location.hash` instead of `window.location.pathname`
- Update existing hash-change and popstate event listeners to check for the `/admin` segment within the hash
- Ensure the `caffeineAdminToken` hash parameter passthrough does not interfere with admin panel detection

**User-visible outcome:** Navigating to `/#/admin` on the deployed site renders the AdminPanel component correctly, allowing the admin to view booking submissions without a blank screen or redirect.
