# Electricity Board — Frontend

React app matching the "APPLICANT DETAILS" screen: dark navbar
(Electricity Board / Home / Dashboard Statistics), a date-range +
Applicant ID filter bar, and the applicant data table with an Edit
action per row.

## Setup

```bash
cd frontend
npm install
npm start
```

Runs at http://localhost:3000.

## Structure

```
src/
├── api/axios.js            # pre-configured API client (baseURL: /api)
├── components/
│   ├── Navbar.jsx / .css
│   └── ApplicantTable.jsx / .css   # filters + table, mirrors the screenshot
├── data/sampleApplicants.js        # placeholder rows shaped like the API response
├── pages/
│   ├── Home.jsx             # renders ApplicantTable
│   └── Dashboard.jsx        # placeholder, filled in during the Chart.js step
└── App.js                   # router + navbar shell
```

## How data loading works right now

`ApplicantTable` tries `GET /api/applicants/` on mount. If the Django
backend isn't running yet (or that endpoint doesn't exist yet), it
silently falls back to the sample rows in `data/sampleApplicants.js` so
the UI is always viewable. A banner tells you when you're looking at
sample data. This gets replaced with the real fetch (loading/error
states, pagination) in the "Creating Fetch API for ApplicantsData"
step.

## What's next

Per your roadmap, next up:
1. **Display ApplicantData at Datatable** — wire the table fully to the
   live API response instead of the fallback.
2. **Filters, Search & Pagination** — page-size controls, server-side
   filtering by date range, search-as-you-type on Applicant ID.
3. **Edit Applicants Frontend + Validation** — the Edit button opens a
   form/modal that PATCHes the record.
4. **Alert messages component**, **Chart.js dashboard**, **Login page**.

Say "next" and I'll continue in that order — or tell me if you'd
rather jump to the backend model/API first so the live data actually
flows in.
