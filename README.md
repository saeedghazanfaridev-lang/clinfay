# Clinfay

Clinfay is a Persian-language clinic discovery website concept. The current project focuses on the frontend experience for browsing healthcare centers and exploring clinic information.

> **Project status:** In progress. The frontend is available, while the Python backend is planned and has not been implemented yet.

## About the Project

The goal of Clinfay is to make it easier for people to explore healthcare centers and, in future versions, find relevant providers using information such as medical specialty, location, and visit type.

The current frontend uses sample data. It is a work in progress, not a live medical directory or appointment-booking service.

## Current Features

- Persian-language interface and responsive page layout
- Clinic cards with sample names, specialties, locations, and descriptions
- UI controls for choosing a specialty, district, and visit type
- Mobile navigation menu
- Clinic-card carousel and separate homepage sections
- Reusable React components and Tailwind CSS styling

Some controls are currently presentation-only. The search form is not connected to a backend, and real clinic search, authentication, and appointment booking are not implemented.

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

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Create a production build when needed:

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
├── data/         # Current sample content
├── App.jsx       # Main page composition
├── index.css     # Global styles
└── main.jsx      # React application entry point
```

## Backend Roadmap

A Python backend is planned as the next major phase of this project. It will be developed separately from the current frontend and connected through an API.

Planned areas of work include:

- Designing the data model for clinics, doctors, specialties, and locations
- Choosing and setting up a Python backend framework and database
- Building API endpoints for clinic data and search filters
- Replacing frontend sample data with data fetched from the API
- Adding authentication and access control
- Exploring appointment-management functionality
- Writing tests and documenting the API

These items are planned work, not existing features. The backend design and implementation details will be updated as development progresses.

## Development Approach

Clinfay is being developed iteratively as a learning and portfolio project. The current frontend has been revised with AI assistance. The planned Python backend will be implemented as a separate development phase, with its progress documented in this repository.

---

This project is under active development. Features and documentation may change as work continues.
