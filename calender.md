Set up Google Calendar + Google Meet integration for a booking platform (FindMyPeer). Use a Google service account — no per-user OAuth, no professional needs to connect their own Google account.

CONTEXT
- When a client completes payment for a session, the backend must automatically:
  1. Create an event on a dedicated Google Calendar (owned by the platform, not any individual user)
  2. Request a Google Meet link via conferenceData on that event
  3. Save the returned Meet link and Google event ID to the booking record in the database
  4. Use that same event ID later if the booking is cancelled or rescheduled

CREDENTIALS (I will paste these — do not hardcode them, load from environment variables)
- GOOGLE_SERVICE_ACCOUNT_KEY (JSON key file contents, or path to it)
- GOOGLE_CALENDAR_ID (the calendar ID of the dedicated "FindMyPeer Bookings" calendar)

REQUIREMENTS

1. Authentication
   - Use the Google APIs client library for [my backend language — Node.js/Python/etc.]
   - Authenticate using the service account credentials via environment variables
   - Scope needed: https://www.googleapis.com/auth/calendar

2. Create booking function: createCalendarEvent(booking)
   Input: booking object containing clientEmail, professionalEmail, startTime, endTime, professionalName, clientName, timezone
   - Create an event on GOOGLE_CALENDAR_ID with:
     - summary: e.g. "FindMyPeer session: {clientName} x {professionalName}"
     - start/end time with correct timezone
     - attendees: [{email: clientEmail}, {email: professionalEmail}]
     - conferenceData: request a Google Meet link (conferenceDataVersion: 1)
     - sendUpdates: "none" (we handle our own emails separately, don't let Google auto-email attendees)
   - Return: { eventId, meetLink }
   - Handle and log errors clearly (auth failure, invalid time, quota errors) without crashing the booking flow — if calendar creation fails, the booking should still be marked confirmed and flagged for manual follow-up, not silently lost

3. Update/reschedule function: updateCalendarEvent(eventId, newStartTime, newEndTime)
   - Patch the existing event's start/end time
   - Keep the same Meet link (don't recreate it)
   - Return updated event details

4. Cancel function: cancelCalendarEvent(eventId)
   - Delete the event from the calendar
   - Handle case where event was already deleted (don't throw a hard error, log and continue)

5. Rate limit handling
   - Wrap all Calendar API calls with exponential backoff retry logic (max 3-5 retries) for 403/429 usageLimits errors
   - Log quota errors distinctly from other errors so they're easy to spot in monitoring

6. Integration points
   - Call createCalendarEvent() immediately after payment webhook/confirmation succeeds, before sending confirmation emails
   - Store eventId and meetLink on the booking record
   - Pass meetLink into the confirmation email template (client + professional) and into reminder emails (24hr, 1hr before)
   - Call updateCalendarEvent() or cancelCalendarEvent() wherever the existing reschedule/cancellation logic lives

7. Testing
   - Write a simple test/script that creates one event, prints back the Meet link, then deletes it — so I can verify the service account and calendar ID work correctly before wiring it into the full booking flow

Do not implement any per-user Google OAuth flow. Do not ask the professional or client to sign in with Google at any point. This must work entirely server-side with the service account.