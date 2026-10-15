# Clinfay

Clinfay is a Persian-language clinic discovery website project. It aims to help people explore healthcare centers and find relevant providers by medical specialty, location, and visit type.

> **Project status:** In progress. The current React frontend uses sample data. A Python backend is planned and has not been implemented yet.

## Project Background

I originally started Clinfay when I was focused on frontend development and learning JavaScript. Since then, I have shifted my learning and career focus toward **backend development with Python**.

I am returning to this existing project to build its backend as a hands-on learning and portfolio project, then connect it to the current frontend through APIs. My goal is to understand and implement the backend step by step rather than present planned functionality as if it were already complete.

## Current Frontend

The current interface includes:

- Persian-language, responsive page layout
- Clinic cards with sample names, specialties, locations, and descriptions
- UI controls for choosing a specialty, district, and visit type
- Mobile navigation menu
- Clinic-card carousel and homepage sections
- Reusable React components and Tailwind CSS styling

The frontend currently uses sample data. The search form is not connected to an API, and real clinic search, authentication, and appointment booking are not implemented.

## Technology Stack

- **JavaScript**
- **React 18**
- **Vite**
- **Tailwind CSS**

## Run Locally

### Requirements

- Node.js
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/saeedghazanfaridev-lang/clinfay.git
   cd clinfay
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build the project:

   ```bash
   npm run build
   ```

To preview the production build locally, run:

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/       # Images, icons, and fonts
├── components/   # Reusable UI components
├── data/         # Sample frontend content
├── App.jsx       # Main page composition
├── index.css     # Global styles
└── main.jsx      # React application entry point
```

## Backend Roadmap

The next major phase is to build a backend with Python and connect it to the existing frontend through an API.

Planned work:

- Design data models for clinics, doctors, specialties, and locations
- Choose and configure a Python backend framework and database
- Build API endpoints for clinic data and search filters
- Replace sample frontend data with data retrieved from the API
- Add authentication and access control
- Explore appointment-management functionality
- Add tests and API documentation

These are planned tasks, not implemented features. The framework, database, and final API design will be documented as those decisions are made during development.

## Development Goals

Clinfay will evolve in small, documented steps. The immediate goal is to build a working Python backend, learn the reasoning behind each design decision, and integrate it with the existing React interface.

---

This project is under active development. Features and documentation may change as development progresses.
