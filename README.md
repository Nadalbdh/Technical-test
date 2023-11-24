# User Management Project

## Introduction

This demo project is for a technical test, utilizing Python/Django for the backend and React for the frontend.

## Features

- **Backend:**
    1. Navigate to the `backend` directory: `cd user_management/backend`.
    2. Install dependencies: `pip install -r requirements.txt`.
    3. Apply database migrations: `python manage.py migrate`.
    4. Load the fixtures: `python manage.py loaddata !user_api/fixtures/users_fixtures` and `python manage.py loaddata user_api/fixtures/profiles_fixtures`.
    5. Run the Django development server: `python manage.py runserver`.

- **Frontend:**
    1. Navigate to the `frontend/user-search` directory: `cd user_management/frontend/user-search`.
    2. Install dependencies: `npm install`.
    3. Start the React development server: `npm start`.
