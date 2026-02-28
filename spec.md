# Specification

## Summary
**Goal:** Fix the admin panel so that authenticated Internet Identity principals are correctly used when fetching bookings and session registrations, eliminating the "account may not have admin permissions" error.

**Planned changes:**
- Ensure the admin panel's data-fetching queries use the authenticated actor (carrying the logged-in Internet Identity principal) rather than the anonymous actor.
- Disable admin queries until the authenticated actor is ready, preventing premature requests with an anonymous principal.
- Automatically trigger admin queries once the actor transitions from anonymous to authenticated, without requiring a manual retry.
- Ensure the backend `isAdmin` check correctly recognises the authenticated caller's principal.

**User-visible outcome:** After completing both authentication steps (Internet Identity + password), the admin panel loads all bookings and session registrations successfully without displaying a permissions error.
