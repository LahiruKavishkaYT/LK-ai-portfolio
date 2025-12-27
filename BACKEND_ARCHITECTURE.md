# Backend Implementation Plan: Feedback System

## 1. Architecture Overview
Since the application is a **Vite Single Page Application (SPA)** deployed on **Vercel**, the most robust and scalable approach for handling large video uploads (up to 50MB) and data persistence is to use **Supabase** (Backend-as-a-Service).

**Why Supabase?**
*   **Bypasses Vercel Limits**: Vercel Serverless Functions have a **4.5MB request body limit**. Uploading 50MB videos through a Vercel API route is not possible without complex chunking. Supabase Storage allows direct client-to-storage uploads.
*   **Unified Stack**: Provides Database (PostgreSQL) and Object Storage (S3-compatible) in one SDK.
*   **Real-time**: Easy to build an admin dashboard later to view incoming feedback in real-time.

---

## 2. Database Schema (PostgreSQL)

We will create a single table `feedbacks` to store both written and video submissions.

### Table: `feedbacks`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, default: `gen_random_uuid()` |
| `created_at` | `timestamptz` | Default: `now()` |
| `full_name` | `text` | User's name |
| `role` | `text` | User's role/company |
| `type` | `text` | 'written' or 'video' |
| `testimonial` | `text` | The written feedback (nullable) |
| `video_path` | `text` | Path to the video in storage (nullable) |
| `status` | `text` | 'pending', 'approved', 'rejected' (Default: 'pending') |

---

## 3. Storage Strategy

### Bucket: `feedback-videos`
*   **Structure**: `uploads/{timestamp}_{random_string}.webm`
*   **Access Policies**:
    *   **Public**: `INSERT` (Allow anyone to upload)
    *   **Public**: `SELECT` (Allow viewing - or restrict to admin only)

---

## 4. Implementation Steps

### Phase 1: Setup
1.  Create a Supabase Project.
2.  Run the SQL migration to create the table and storage bucket.
3.  Get API Keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

### Phase 2: Frontend Integration
1.  Install SDK: `npm install @supabase/supabase-js`
2.  Create `lib/supabase.ts` client configuration.
3.  Update `FeedbackForm.tsx` to handle the submission logic.

### Phase 3: Submission Logic Flow
1.  **User clicks Submit**.
2.  **If Video**:
    *   Generate a unique file path.
    *   Upload `videoBlob` directly to Supabase Storage.
    *   Get the returned `path`.
3.  **Save Data**:
    *   Insert row into `feedbacks` table with `full_name`, `role`, `testimonial`, and `video_path`.
4.  **Success**: Show confirmation message.

---

## 5. Security (Row Level Security)
*   **Table Policies**:
    *   `Enable Insert`: For `anon` role (public users).
    *   `Enable Select`: Only for `service_role` (admin) or where `status = 'approved'`.
*   **Storage Policies**:
    *   `Enable Upload`: For `anon` role.
    *   `Enable Download`: Only for `service_role` (admin).

---

## 6. Vercel Deployment
*   Add Environment Variables in Vercel Project Settings:
    *   `VITE_SUPABASE_URL`
    *   `VITE_SUPABASE_ANON_KEY`

---

## 7. Future Admin Dashboard (Optional)
*   Create a hidden route `/admin` protected by a password.
*   Fetch all `pending` feedbacks.
*   Approve/Reject buttons to update the `status` column.
