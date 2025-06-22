# AI Shorts Generator (Refactored in TypeScript)

This is a full-stack AI-powered Shorts Video Generator built with **Next.js**, **TypeScript**, and a suite of modern tools. This project has been completely refactored into TypeScript and significantly enhanced with additional features and integrations from the original YouTube creation found in the Acknowledgements section!

## Features

- **User Authentication** with [Clerk](https://clerk.dev/)
- **Prompt-to-Video Generation** using:
  - **Google Gemini API** for generating scripts from prompts
  - **Replicate API** for AI-generated images
  - **Remotion** for rendering dynamic short videos
- **Captions + Audio Sync** using [AssemblyAI]
- **Cloud Storage** via Firebase (for storing images and audio files)
- **Database** powered by [Neon](https://neon.tech/) and [Drizzle ORM](https://orm.drizzle.team/)
- Fully written in **TypeScript** for better maintainability and type safety

## Tech Stack

| Area                | Tech                                |
| ------------------- | ----------------------------------- |
| Frontend            | Next.js (App Router) + Tailwind CSS |
| Backend             | API Routes with TypeScript          |
| Auth                | Clerk                               |
| AI Text Generation  | Google Gemini                       |
| AI Image Generation | Replicate                           |
| Video Rendering     | Remotion                            |
| Storage             | Firebase (Images & Audio)           |
| Database            | Neon + Drizzle ORM                  |

## How It Works

1. **User logs in** via Clerk.
2. **User enters dashboard**, has the option to create a new short.
3. **Prompt is entered**, Gemini generates a short script.
4. The script is:
   - Converted to **audio** (via Google TTS).
   - Sent to **Replicate** to generate corresponding images.
5. Images + audio + captions are combined using **Remotion** to create a video.
6. Final video assets are stored and downloadable.

## Acknowledgements

This project was inspired by and built upon the work of several tools, platforms, and creators.

- [TubeGuruji](https://www.youtube.com/@tubeguruji) — For the original [AI Shorts Generator tutorial](https://www.youtube.com/watch?v=eMplIjZ80Zs) that sparked this project.
- [Google Gemini](https://ai.google.dev/) — For generating intelligent and creative scripts from user prompts.
- [Replicate](https://replicate.com/) — For enabling powerful AI image generation capabilities.
- [Remotion](https://www.remotion.dev/) — For providing a robust and flexible framework to generate dynamic videos programmatically.
- [Clerk](https://clerk.dev/) — For seamless and secure user authentication.
- [Firebase](https://firebase.google.com/) — For easy storage and hosting of media assets.
- [Drizzle ORM](https://orm.drizzle.team/) — For its lightweight and type-safe database querying in TypeScript.
- [Neon](https://neon.tech/) — For hosting the PostgreSQL database with serverless scalability.
