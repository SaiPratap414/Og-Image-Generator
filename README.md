# OG Image Generator

This project is a dynamic post page that generates Open Graph (og:image) images based on post content. It uses React for the frontend and Node.js with Express for the backend.

## Deliverables

1. A functional post page that generates appropriate og:images.
2. Source code for the implementation.
3. Brief documentation explaining how the system works.

## How It Works

### Frontend (React)

The frontend is a React application that provides a user interface for creating posts and generating OG images. It consists of:

- A form for entering post title and content
- An option to upload an image
- A button to generate the OG image
- A preview of the generated OG image

The main component (`App.js`) handles state management, form submission, and displaying the generated image.

### Backend (Node.js/Express)

The backend is a Node.js server using Express. It handles the OG image generation process:

1. Receives post data (title, content, image) from the frontend
2. Uses the `canvas` library to create an image with the post content
3. Saves the generated image and returns its URL to the frontend

### OG Image Generation Process

1. User fills out the post form on the frontend
2. On form submission, data is sent to the backend
3. Backend generates an image using the post data
4. The generated image URL is sent back to the frontend
5. Frontend displays the image and adds it as an og:image meta tag

## Setup and Running

1. Clone the repository
2. Install dependencies for both frontend and backend: