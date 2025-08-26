# heyloo

## Introduction

heyloo is a modern chat application built with Next.js, featuring real-time messaging, image and file sharing, and video calls. It leverages Convex as the backend for seamless data synchronization, Clerk for user authentication, and Zego for high-quality video communication.

## Features

- Real-time text chat with multiple users
- Secure user authentication via Clerk
- Send and receive images and files within chats
- High-quality video calls powered by Zego
- Responsive and intuitive user interface

## Tech Stack

- **Next.js** — React framework for building the frontend
- **Convex** — Backend platform for real-time data and synchronization
- **Clerk** — User authentication and management
- **Zego** — Video call SDK for WebRTC-based video communication

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/heyloo.git
   cd heyloo
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables for Clerk, Convex, and Zego in a `.env.local` file.

### Running the app

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start using heyloo.

## Usage

### Chatting

- Register or sign in with Clerk authentication.
- Create or join chat rooms to start messaging.
- Messages are synced in real-time via Convex.

### Sending Images and Files

- Attach images or files directly in the chat input.
- Files are uploaded and shared securely with other participants.

### Video Calls

- Initiate video calls with other users using the integrated Zego SDK.
- Enjoy low-latency, high-quality video and audio communication.

## Project Structure

- `app/` — Next.js app directory with pages and components
- `convex/` — Backend functions and data schema using Convex
- `components/` — Reusable UI components (chat interface, video call UI, etc.)
- `lib/` — Utility functions and SDK integrations (Clerk, Zego)
- `public/` — Static assets like images and icons

## Deployment

Deploy heyloo easily on Vercel for production:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy and share your chat app instantly.

For detailed deployment instructions, visit [Vercel Documentation](https://vercel.com/docs).

---

Thank you for using heyloo — your all-in-one chat and video call solution!
