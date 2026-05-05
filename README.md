# EnternFlix

EnternFlix is a frontend streaming platform built with Next.js App Router, designed to deliver adaptive video playback using HLS streams. It integrates with a backend media service for content metadata, streaming manifests, and playback configuration. The application focuses on performance, scalability, and clean separation between UI and streaming infrastructure.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Application runs at: [http://localhost:3000](http://localhost:3000)

## Backend

This frontend depends on the EnternFlix backend service for APIs, media metadata, and streaming orchestration.

Backend repository: [https://github.com/xanderbilla/bi8s-go](https://github.com/xanderbilla/bi8s-go)
Ensure the backend is running and properly configured before using the frontend.

## Scripts

```bash
npm run dev        # start development server
npm run build      # production build
npm run start      # run production build
npm run typecheck  # TypeScript validation
npm run lint       # code quality checks
npm run test       # run tests
```

## Documentation

Project documentation is available in the `docs/` directory covering architecture, configuration, API integration, deployment, and operational runbooks.

## Contributing

Refer to `CONTRIBUTING.md` for contribution guidelines.

## Author

Vikas Singh
[https://xanderbilla.com](https://xanderbilla.com)
