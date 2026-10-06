# Svvayam Live Consultation Web Application

A production-ready web application designed for **Svvayam** (Bespoke Pooja Rooms & Sacred Temple Architecture, India). This system empowers **any team member** to conduct customer onboarding calls with confidence, removing dependency on the founders while delivering a calm, ultra-premium client experience.

---

## 1. Key Capabilities & Combined Features

The application unites three critical components into a unified, high-performance web experience:

### 1.1 Live 8-Step Consultation Flow (Wireframe Logic Preserved)
Preserves 100% of the copy, field labels, stage text, and mathematical formulas from the original wireframe:
1. **Purpose** (0–2 min): Client name, project location, consultation date.
2. **Worship** (2–6 min): Deities & traditions, daily rituals and family usage, idol dimensions/clearances.
3. **Space** (6–10 min): Available width × depth × height with units, internal/external basis, essential storage/enclosure, site constraints, and drag-and-drop/clipboard image paste.
4. **Alignment** (10–13 min): Family/architect approvers, investment range, desired installation date, decision timeline.
5. **Examples** (13–20 min): Dual-tab visual reference picker:
   - **Tab 1: 4×4 Reference Grid**: Matrix with 4 scale tiers (*Small niche/open mandap*, *Enclosed altar/compact unit*, *Dedicated pooja room*, *Large temple/pavilion 10–15 ft*) and 4 detailing tiers (*Minimal*, *Restrained detail*, *Rich detail*, *Maximal*).
   - **Tab 2: Existing Client Projects**: Embedded repository of all 37 authentic completed sanctums.
   - **Selection Rule**: The client selects **exactly 3 references** across either source to unlock the "Next" button.
6. **Scope & Budget** (20–25 min): Recommended scope, proposed materials, indicative budget (accepts inputs like *"15 lakh"*, *"1.5 cr"*, *"₹25,00,000"*), timeline, exclusions, and real-time design fee computation.
7. **Your Journey** (25–30 min): 8-stage architectural progress grid with full-screen viewer supporting photos, high-res renders, and PDF blueprints.
8. **Proposal** (Customer-facing review): Comprehensive preliminary proposal with printable design fee breakdown, engagement inclusions, 4-step design journey, and print stylesheet (`@media print`).

### 1.2 Presentation & Landing Page Recreated (`/`)
Faithful recreation of the official Svvayam presentation site:
- **Hero & Branding**: Clean ivory canvas (`#f6f5f1`), deep green accents (`#25372e`), warm gold glow (`#ad792f`), Cormorant Garamond serif headers, and the official logo at `/assets/SVVAYAM-LOGO-4.png`.
- **Hero Statistics**: 100+ Client Projects, 460+ Segregated Assets, 100+ Sanctum Installations & Stage Proofs.
- **Client Architecture Explorer**: Full interactive grid of all 37 client sanctums with scale filters (*All 37*, *Compact 14*, *Medium 16*, *Grand 7*), live search, and multi-stage detail modal.
- **Presentations & Documents**: Interactive canvas viewer for all 3 presentation decks (59 slides total) with slide navigation, zoom controls, and thumbnail rails.
- **Visual Explore Video Archive**: 6 curated workshop videos (Factory cutting, Dry-fit assembling, 3 Artisan shorts, Sketch to installation) with unmuted-by-demand controls.

### 1.3 Authentication & Role-Based Access Control
- **Phone OTP**: Powered by Supabase Auth with default country code `+91`.
- **Roles**:
  - `admin`: Svvayam team members. Can conduct consultations, edit reference grids and journey assets, view all consultations, and trigger Google Sheets synchronization.
  - `client`: Read-only access to their own consultation proposal, printable PDF, and interactive visual reference selection during live onboarding.
- **Local Dev Mock Auth**: If Supabase credentials are not yet configured, the system operates seamlessly in offline/mock mode using fixed test numbers (`+919999999999` for Admin, `+919888888888` for Client, fixed OTP `123456`).

### 1.4 Database & Google Sheets Automation
- **Supabase Postgres**: Automated debounced auto-save during calls, backed by an offline localStorage fallback.
- **Google Sheets Edge Function**: Server-side Edge Function (`/supabase/functions/sync-sheets`) upserting 29 specific consultation columns by unique Consultation ID into a designated Google Sheet via a Service Account (Sheets API v4).

---

## 2. Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS 3.4 (custom palette: `#25372e`, `#ad792f`, `#f6f5f1`, `#dfd8ca`, `#171d19`)
- **Routing**: React Router DOM v7
- **Database & Auth**: Supabase JS v2
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS hardware-accelerated transforms

---

## 3. Getting Started

### 3.1 Install Dependencies
```bash
npm install
```

### 3.2 Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3.3 Production Build
```bash
npm run build
npm run preview
```

---

## 4. Supabase Setup Guide

### 4.1 Database Migration
1. Go to your [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor**.
3. Run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql` (Creates profiles, consultations, consultation_images, reference_grid, journey_assets, client_projects, sheet_sync_log tables, RLS policies, and admin helpers).
   - `supabase/migrations/002_storage_setup.sql` (Initializes 4 storage buckets: `reference-grid`, `journey`, `client-projects`, and `consultation-uploads`).

### 4.2 Phone OTP Provider Configuration
1. In Supabase Dashboard, navigate to **Authentication** > **Providers** > **Phone**.
2. Enable Phone provider and select your SMS provider:
   - **Twilio / MessageBird / Vonage**: Enter Account SID, Auth Token, and Sender ID.
   - For India (+91), ensure DLT (Distributed Ledger Technology) template registration is completed for transactional OTP sending.
3. For local staging, navigate to **Authentication** > **Phone Auth** and add test phone numbers with fixed verification codes (e.g., `+919999999999` with code `123456`).

### 4.3 Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
INITIAL_ADMIN_PHONES=+919999999999,+919876543210
```

---

## 5. Google Sheets Integration Guide

The Google Sheets integration runs securely on the server via a **Supabase Edge Function** (`/supabase/functions/sync-sheets`) using Google Sheets API v4.

### 5.1 Create Google Service Account
1. Open [Google Cloud Console](https://console.cloud.google.com).
2. Create a project and enable the **Google Sheets API**.
3. Navigate to **IAM & Admin** > **Service Accounts** and create a service account.
4. Generate a JSON Key for the service account.
5. Create a Google Sheet and share it with the service account email (with **Editor** permissions).

### 5.2 Configure Supabase Secrets
Set the secrets in your Supabase project:
```bash
supabase secrets set GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
supabase secrets set GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
supabase secrets set GOOGLE_SHEET_ID="your-google-sheet-id"
```

### 5.3 Deploy Edge Function
```bash
supabase functions deploy sync-sheets --no-verify-jwt
```

---

## 6. Formula & Copy Reference

- **Indicative Budget Parser**: Accepts numbers with or without symbols, including words (*"15 lakh"*, *"1.5 cr"*, *"₹35,00,000"*).
- **Design Engagement Fee**: Computed as `Math.min(100000, amount * 0.20)` (the lower of ₹1,00,000 or 20% of the indicative project budget).
- **Tax treatment**: Explicitly noted as per proposal exclusions (*"To be confirmed in the written quotation"*).
