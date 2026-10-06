# Testing & Quality Verification Guide

This document provides a walkthrough for verifying the **Svvayam Live Consultation Web Application** locally and in staging.

---

## Test Scenario 1: Landing Page & Presentations Verification

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173/` in your browser.
3. **Verify Hero Section**:
   - Confirm official Svvayam logo renders cleanly at the center with subtle ambient glow.
   - Confirm the title: *"Bespoke Sacred Architecture for Discerning Homes"*.
   - Confirm stats ribbon shows: **100+** Client Projects, **460+** Segregated Assets, **100+** Sanctum Installations.
4. **Verify Visual Explore Modal**:
   - Click the **Visual Explore** button in the header.
   - Verify modal displays 6 videos categorized across Factory Video, Assembling Process, Artisans at Svvayam, and Sketch to Installation.
   - Click **Unmute Video** to verify toggle state changes to "Sound On".
   - Close modal with the `X` button or `Esc` key.
5. **Verify Presentations & Docs Modal**:
   - Click the **Presentations & Documents** button in the header.
   - Switch between **Deck 1** (19 slides), **Deck 2** (30 slides), and **Deck 3** (10 slides).
   - Use the slide buttons or keyboard Right/Left arrow keys to step through slides.
   - Test Zoom In (`+`), Zoom Out (`-`), and Reset (`100%`).
6. **Verify Client Architecture Explorer**:
   - Scroll down to the Client Explorer section.
   - Confirm all 37 client sanctums load with hero photographs and dimension badges.
   - Click filter pills: **Compact (14)**, **Medium (16)**, **Grand (7)**, **All (37)**.
   - Enter a client name in the search box (e.g. *"Sujana"* or *"Pradeep"*) and verify instant filtering.
   - Click a client card to open the **Project Detail Modal**. Confirm dynamic architectural stages (Overview, Requirement, 2D CAD, 3D Photorealistic, etc.) load without stretching.

---

## Test Scenario 2: Authentication & Roles

1. Click **Live Consultation** in the header or hero.
2. If unauthenticated, verify you are redirected to `/login?redirect=/consult`.
3. **Test Admin Sign In (Local Mock Mode)**:
   - Full Name: `Anand Sharma`
   - Mobile: `+91 9999999999`
   - Click **Send Verification OTP**.
   - Enter 6-digit code: `123456`.
   - Click **Verify & Continue**.
   - Verify you land on `/consult` with the **Admin** badge in the header.
4. **Test Sign Out**:
   - Click the user avatar menu in the header and click the sign out icon.
   - Confirm you are logged out and can sign in again as a client (`+91 9888888888`).

---

## Test Scenario 3: Live 8-Step Consultation Flow

1. Navigate to `/consult`.
2. **Step 1: Purpose**:
   - Fill in: Client Name = *"Mr. & Mrs. Rajesh Sharma"*, Location = *"Bengaluru"*, Date = current date.
   - Click **Next →**.
3. **Step 2: Worship**:
   - Fill in Deities, Daily Rituals, and Idol Dimensions.
   - Click **Next →**.
4. **Step 3: Space**:
   - Enter Width × Depth × Height, Internal/External basis, and Site status.
   - Test reference photo upload: drag an image into the dashed zone or select a file.
   - Test label change (*Client reference* / *Inspiration* / *Completed Svvayam project*) and enter a caption.
   - Click **Next →**.
5. **Step 4: Alignment**:
   - Enter Approvers, Investment Range, Installation Date, and Decision Timeline.
   - Click **Next →**.
6. **Step 5: Visual Direction (Examples)**:
   - Notice the **Next** button is **disabled** and the status reads *"0 / 3 chosen"*.
   - In Tab 1 (Reference grid), click **Load demo examples**.
   - Pick 2 cells from the 4×4 matrix. Notice the badge updates to *"2 / 3 chosen"*, and **Next** remains disabled.
   - Switch to Tab 2 (**Existing client projects**).
   - Click **Pick as Reference** on any completed project (e.g. *Ms. Sujana Reddy*).
   - Notice the badge updates to *"3 / 3 chosen"*, and the **Next →** button becomes **enabled**!
   - Try selecting a 4th reference and verify the system protects the rule.
   - Click **Next →**.
7. **Step 6: Scope & Indicative Budget**:
   - Verify the top strip displays the **3 selected references** chosen from both tabs.
   - Enter Indicative Project Budget = `25 lakh` (or `2500000`).
   - Verify the Design Fee box immediately computes:
     - `Math.min(100000, 2500000 * 0.20) = ₹1,00,000`.
   - Change budget to `3 lakh` (300000) and verify the fee updates to `₹60,000` (20% of 3L).
   - Click **Review proposal →**.
8. **Step 7: Your Journey**:
   - Confirm 8 stage cards render.
   - Click on any card (e.g. *Stage 3: Design together*) to open the full-screen viewer.
   - Use Next Stage / Prev Stage buttons to step through all 8 stages.
   - Click **Close (X)**.
   - Click **Next →**.
9. **Step 8: Proposal**:
   - Confirm all client responses are aggregated under the 5 review sections.
   - Confirm the 3 selected reference images and site photos render cleanly.
   - Confirm the Design Engagement fee and inclusion list match the wireframe specification.
   - Click **Print / Save PDF** to verify `@media print` layout.
   - Click **Copy Client Link** to test sharing.
   - Click **Sync to Google Sheet** to test the integration dispatcher.
10. **Test Session Management**:
    - Click **Download session** in the top bar to export a `.json` backup.
    - Click **New client** to reset the draft.
    - Click **Import session** and choose the downloaded JSON file to confirm complete state restoration.
