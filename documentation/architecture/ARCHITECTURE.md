# THE MAKING OF ABDURRAHMAN — System Architecture

## 1. Overview
**THE MAKING OF ABDURRAHMAN** is an interactive digital monograph and engineering portfolio for **Abdurrahman Zarook** (Artificial Intelligence Undergraduate at NSBM Green University). Rather than using a conventional vertical single-page template, the application models a physical open folio book on desktop (`lg` and above) and a tactile single-page swipe reader on mobile and tablet viewports.

## 2. Core Subsystems

### 2.1 Digital Book Engine (`frontend/src/components/book/DigitalBookEngine.tsx`)
- **Desktop Spread Presentation**: Renders Verso (left page) and Recto (right page) surfaces separated by a shaded bookbinding spine (`.book-spine-center`) and stacked paper edge shadows (`.book-edge-left`, `.book-edge-right`).
- **Internal Scroll Preservation**: Each page surface maintains its own independent vertical scroll container (`.book-page-scroll`), ensuring long technical chapters (such as Chapter 07: Projects or Chapter 10: Journal) never clip content.
- **Navigation & History**: Synchronizes with React Router v6 (`/chapter/:slug`), browser back/forward history, keyboard arrow navigation (`ArrowLeft` / `ArrowRight`), and mobile horizontal touch swipes.

### 2.2 Identity-Preserving 3D Portrait Stage (`frontend/src/components/avatar/InteractivePortrait3D.tsx`)
- Powered by **Three.js**, **React Three Fiber (`@react-three/fiber`)**, and **Drei (`@react-three/drei`)**.
- Preserves Abdurrahman's actual facial photograph inside a 3D studio-lit relief monolith with smooth rotation limits (`OrbitControls`), idle breathing motion (`useFrame`), and automatic upgrade support for a full-head photogrammetry `.glb` mesh at `/assets/models/abdurrahman-avatar.glb`.
- Includes WebGL capability detection and an instant 2D portrait fallback so the site never fails to load on constrained devices.

### 2.3 AUREVON AI Integration (`backend/app/integrations/aurevon/adapter.py`)
- Connects to the existing **AUREVON AI** ecosystem (`OllamaProvider` at `http://127.0.0.1:11434` running `qwen2.5:3b` locally, or OpenAI-compatible cloud providers in hosted production).
- **Mode 1 (Portfolio Assistant)**: Strictly grounded in the authoritative portfolio knowledge graph (`AUTHORITATIVE_PORTFOLIO_BUNDLE`). Never fabricates grades, certificates, or unverified claims.
- **Mode 2 (General AI Assistant)**: Routes open-ended technical questions to the underlying LLM while clearly separating general inference from verified personal facts.
