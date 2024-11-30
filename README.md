# PDF Marker Pro

A web application that allows users to watermark PDF files using a logo image, flatten the PDF to secure the watermark, and download the processed file. The app is designed as a **Progressive Web App (PWA)** that works offline and can be installed on mobile and desktop devices.

---

## Features

- Upload a PDF file and a logo image.
- Add the logo as a watermark to all pages of the PDF.
- Flatten the PDF to make the watermark non-editable.
- Download the processed PDF.
- Fully responsive design with a modern dark theme.
- Offline functionality using a service worker.
- Installable as a PWA for mobile and desktop devices.

---

## Live Demo

Try the app live at: [PDF Marker Pro Live Demo](https://br1jm0h4n.github.io/pdf-marker-pro/)

---

## Repository

Access the source code at: [GitHub Repository](https://github.com/BR1JM0H4N/pdf-marker-pro.git)

---

## Technologies Used

- **HTML5, CSS3, and JavaScript** for the frontend.
- **PDF-Lib.js** for PDF manipulation.
- **PDF.js** for rendering and flattening PDF content.
- **Service Worker** for offline functionality.
- **PWA Manifest** for installation on devices.

---

## Installation and Usage

### 1. Clone the Repository
```bash
git clone https://github.com/BR1JM0H4N/pdf-marker-pro.git
cd pdf-marker-pro
```

### 2. Serve the Application Locally
You need a static file server to run the app locally:
```bash
npx http-server . -p 8080
```

Open your browser and navigate to `http://localhost:8080`.

---

## Deploying the App

To deploy the app online, upload the project files to a hosting platform that supports HTTPS. Some popular options include:
- **Render** (as used in the live demo)
- **GitHub Pages**
- **Netlify**
- **Vercel**

For detailed deployment steps, refer to the documentation of your chosen platform.

---

## Offline Functionality

This app is a Progressive Web App (PWA) and works offline:
- On the first visit, the app caches all required files.
- After caching, the app can be used without an internet connection.

---

## Adding a Favicon

To customize the favicon:
1. Replace `favicon.ico` or `favicon.png` in the project root.
2. Ensure it is linked in `index.html` with the appropriate `<link>` tag.

---

## Screenshots
Will upload something soon 🙂

---

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to fork this repository and submit a pull request.

---

## Acknowledgements

- [PDF-Lib.js](https://pdf-lib.js.org/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Favicon Generator](https://favicon.io/)

---

**Author:** Yours truly BR1JMOH4N
**Repository:** [GitHub Repository](https://github.com/BR1JM0H4N/pdf-marker-pro.git)
```
