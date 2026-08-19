# Electricity Board — Backend (Step 1: Project Setup)

This is the Django backend for the Electricity Board applicant management
system. This step covers: virtualenv creation, Django project + app
scaffolding, and wiring up DRF / CORS so the React frontend (added in a
later step) can talk to the API.

## What's included in this step

```
backend/
├── manage.py
├── requirements.txt
├── electricity_board/        # Django project (settings, urls, wsgi/asgi)
│   ├── settings.py           # DRF, CORS, apps registered
│   └── urls.py               # /admin/ and /api/ wired up
└── applicants/                # Django app (models/views/serializers come next)
    └── urls.py                # placeholder, endpoints added in later steps
```

## 1. Create and activate a virtual environment

```bash
cd backend
python3 -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

## 2. Install dependencies

```bash
pip install -r requirements.txt
```

Installed packages:
- **Django** — web framework
- **djangorestframework** — REST API layer
- **django-cors-headers** — allows the React app (localhost:3000) to call this API
- **pandas / openpyxl** — used in a later step for bulk CSV/Excel upload

## 3. Run migrations

```bash
python manage.py migrate
```

## 4. Create a superuser (for Django admin, used later to log applicant data)

```bash
python manage.py createsuperuser
```

## 5. Run the dev server

```bash
python manage.py runserver
```

- Django admin: http://127.0.0.1:8000/admin/
- API root (empty for now): http://127.0.0.1:8000/api/

## What's next

This matches step 1 of the roadmap ("Project Setup with Virtualenv & Django
Flow"). Next steps we'll build on top of this:

1. **Creating Database Model with Normalization** — the `Applicant` model
   and any normalized lookup tables, registered in `applicants/admin.py`.
2. **Upload Bulk CSV Files with Pandas** — an endpoint that reads a CSV with
   pandas and bulk-creates `Applicant` rows.
3. **React app setup** — scaffolding `create-react-app` for the frontend.
4. ...through to charts and login, following the same order as your list.

Just say "next" / "continue" and I'll build the model + admin step.
