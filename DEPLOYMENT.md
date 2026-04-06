# CitiScope Deployment Guide

This guide provides instructions for deploying the CitiScope Smart City Administration Dashboard.

## 1. Environment Variables

Before deploying, ensure you have the following environment variables configured in your production environment:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for the backend API | `https://api.citiscope.gov.et/v1` |
| `VITE_API_TIMEOUT` | API request timeout in ms | `10000` |
| `VITE_USE_MOCK` | Set to `false` for production | `false` |
| `GEMINI_API_KEY` | Your Google Gemini API Key | `AIza...` |

## 2. Deployment Options

### Option A: Vercel (Recommended for Frontend)

1.  **Connect Repository**: Connect your GitHub/GitLab repository to Vercel.
2.  **Framework Preset**: Select **Vite**.
3.  **Build Command**: `npm run build`
4.  **Output Directory**: `dist`
5.  **Environment Variables**: Add the variables listed above in the Vercel project settings.
6.  **Deploy**: Vercel will automatically build and deploy your application.

### Option B: VPS (Docker)

1.  **Build Docker Image**:
    ```bash
    docker build -t citiscope-frontend .
    ```
2.  **Run Container**:
    ```bash
    docker run -d -p 80:80 \
      -e VITE_API_URL=https://api.citiscope.gov.et/v1 \
      -e VITE_USE_MOCK=false \
      --name citiscope-dashboard \
      citiscope-frontend
    ```
3.  **Reverse Proxy (Optional)**: If you're using Nginx on the host, configure it to proxy traffic to the container on port 80.

## 3. Optimizations Included

-   **Code Splitting**: Routes are lazy-loaded using `React.lazy` and `Suspense`.
-   **Manual Chunks**: Vendor libraries are split into separate chunks for better caching.
-   **Nginx Caching**: Static assets are cached for 6 months via `nginx.conf`.
-   **SEO**: Meta tags and OpenGraph properties are configured in `index.html`.
-   **Image Optimization**: Use modern formats (WebP/AVIF) and lazy loading for images.

## 4. Post-Deployment Checklist

- [ ] Verify SSL/HTTPS is enabled.
- [ ] Test all routes for SPA fallback (handled by `nginx.conf` or Vercel).
- [ ] Check API connectivity with production backend.
- [ ] Monitor performance using Lighthouse or Web Vitals.
