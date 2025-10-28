# GitHub User Finder

A React app to search and view GitHub profiles and repositories.

## Features

- Search GitHub users by username
- View user profile info (avatar, bio, followers, etc.)
- Browse public repositories with infinite scroll
- Sort repositories by updated date, stars, or name
- Dark/Light mode toggle
- Caching to reduce API calls
- Responsive design for all devices

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- React + TypeScript
- Material-UI
- Axios
- Context API

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx
│   ├── UserProfile.tsx
│   ├── RepositoryCard.tsx
│   ├── Repositories.tsx
│   ├── ThemeToggle.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorAlert.tsx
├── context/
│   ├── GitHubContext.tsx
│   └── ThemeContext.tsx
├── services/
│   ├── githubService.ts
│   └── cacheService.ts
├── types/
│   └── index.ts
└── App.tsx
```

## How It Works

The app uses the GitHub REST API to fetch user data and repositories. Data is cached in localStorage to reduce API calls.

## Building for Production

```bash
npm run build
```
