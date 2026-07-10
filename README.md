# Blog Frontend

This is the Angular frontend application for the microservices blog project.

## Configuration
The API Gateway URL is configured in the environment files located in `src/environments/`.
- `environment.ts` (Production)
- `environment.development.ts` (Development)

Update the `apiGatewayUrl` in these files to point to your backend API Gateway (default is `http://localhost:8080`).

## Development Server
To start the development server, run:
```bash
npm install
npm start
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
