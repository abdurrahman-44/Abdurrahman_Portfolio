import { PortfolioBundle } from '@/types/portfolio';

export const INITIAL_PORTFOLIO_DATA: PortfolioBundle = {
  profile: {
    id: 'profile-abdurrahman-zarook',
    full_name: 'Abdurrahman Zarook',
    headline: 'Artificial Intelligence Undergraduate | Developer | Technology Enthusiast',
    tagline: 'Building intelligent software, privacy-conscious AI systems, and human-centered applications.',
    quote: 'Every great journey begins with curiosity, but it is built through the courage to create.',
    closing_quote: 'Thank you for taking the time to explore my journey. Every chapter is still being written.',
    short_bio:
      'I am an Artificial Intelligence undergraduate at NSBM Green University with a Diploma in Software Engineering from NIBM Kandy Campus. My work spans local-first multimodal AI systems, federated machine learning research, and full-stack software engineering.',
    extended_bio:
      'Driven by a disciplined curiosity for how mathematical foundations translate into working software, I focus on building practical systems that respect user privacy and solve tangible problems. Alongside my undergraduate studies in Artificial Intelligence, I mentor O/L and A/L learners in Mathematics and Information Technology—reinforcing my belief that true mastery requires the ability to explain complex systems clearly.',
    location: 'Mawanella / Kandy / Colombo, Sri Lanka',
    email: 'abdurrahmanzarook4455@gmail.com',
    github_url: 'https://github.com/abdurrahman-44',
    linkedin_url: 'https://www.linkedin.com/in/abdurrahman-zarook-11525b3a2/',
    cv_url: '/assets/cv/Abdurrahman-Zarook-CV.pdf',
    avatar_model_url: '/assets/models/abdurrahman-avatar.glb',
    avatar_fallback_url: '/assets/images/abdurrahman-portrait.png',
    typing_phrases: [
      'Artificial Intelligence Enthusiast',
      'Software Developer',
      'Machine Learning Explorer',
      'Technology Creator',
    ],
    languages: [
      { name: 'English', proficiency: 'Fluent', native_script: 'English' },
      { name: 'Tamil', proficiency: 'Native', native_script: 'தமிழ்' },
      { name: 'Sinhala', proficiency: 'Fluent', native_script: 'සිංහල' },
    ],
    soft_skills: [
      {
        id: 'soft-leadership',
        title: 'Leadership',
        description:
          'Coordinating university software and research teams with clear architectural milestones, accountability, and calm execution.',
        principle: 'Lead through clarity and shared ownership.',
      },
      {
        id: 'soft-communication',
        title: 'Communication',
        description:
          'Translating abstract mathematical and algorithmic concepts into accessible explanations—honed through active tutoring in Mathematics and IT.',
        principle: 'Clarity of thought precedes clarity of code.',
      },
      {
        id: 'soft-problem-solving',
        title: 'Problem-Solving',
        description:
          'Decomposing complex challenges—from non-IID federated data distributions to real-time SSE token streaming—into testable components.',
        principle: 'First principles over guesswork.',
      },
      {
        id: 'soft-collaboration',
        title: 'Team Collaboration',
        description:
          'Working across frontend, backend, and research roles while maintaining clean Git workflows, documentation, and code reviews.',
        principle: 'Great systems are built in dialogue.',
      },
    ],
  },

  education: [
    {
      id: 'edu-ol-2021',
      year: '2021 (2022)',
      qualification: 'G.C.E. Ordinary Level (O/L)',
      institution: 'Zahira National College, Mawanella',
      location: 'Mawanella, Sri Lanka',
      status: 'Completed',
      results_summary: 'Verified Results: 6A and 3B passes',
      verified_results: true,
      description:
        'Built a strong academic foundation in Mathematics, Science, and Information & Communication Technology while participating in school technology initiatives.',
      highlights: [
        'Achieved 6 Distinctions (A) and 3 Very Good passes (B)',
        'Developed early analytical and problem-solving discipline in Mathematics and ICT',
      ],
      display_order: 1,
    },
    {
      id: 'edu-al-2024',
      year: '2024',
      qualification: 'G.C.E. Advanced Level (A/L)',
      institution: 'Zahira National College, Mawanella',
      location: 'Mawanella, Sri Lanka',
      status: 'Completed',
      results_summary: 'Completed Upper-Secondary Collegiate Examination Cycle',
      verified_results: true,
      description:
        'Completed G.C.E. Advanced Level studies with rigorous quantitative and scientific preparation prior to transitioning into full-time software engineering and artificial intelligence studies.',
      highlights: [
        'Completed upper-secondary collegiate examination cycle in 2024 at Zahira National College',
        'Strengthened quantitative reasoning and structured problem-solving discipline',
      ],
      display_order: 2,
    },
    {
      id: 'edu-nibm-2025',
      year: '2025',
      qualification: 'Diploma in Software Engineering',
      institution: 'National Institute of Business Management (NIBM), Kandy Campus',
      location: 'Kandy, Sri Lanka',
      status: 'Completed',
      results_summary: 'Completed Diploma Programme in Software Engineering',
      verified_results: true,
      description:
        'Intensive formal training in object-oriented programming, relational database design, desktop & web application engineering, and software architecture.',
      highlights: [
        'Engineered full CRUD desktop and web systems in Java, C# (.NET/WPF), PHP, and MySQL',
        'Established core software engineering practices in modular architecture and version control',
      ],
      display_order: 3,
    },
    {
      id: 'edu-nsbm-2026',
      year: '2026 – Present',
      qualification: 'BSc (Hons) Artificial Intelligence',
      institution: 'NSBM Green University',
      location: 'Pitipana, Homagama, Sri Lanka',
      status: 'Ongoing',
      results_summary: 'Current Undergraduate Degree Programme',
      verified_results: true,
      description:
        'Pursuing an honours undergraduate degree specializing in Artificial Intelligence, Machine Learning, Data Structures & Algorithms, and Distributed Intelligent Systems.',
      highlights: [
        'Active research and practical exploration in Federated Learning (PyTorch & Flower) and Local LLM Architectures',
        'Combining theoretical AI foundations with production-grade full-stack engineering',
      ],
      display_order: 4,
    },
  ],

  certifications: [
    {
      id: 'cert-nsbm-computing',
      title: 'NSBM Advanced Certificate for Computing',
      issuing_institution: 'NSBM Green University',
      issue_date: '2025 / 2026',
      status: 'Verified',
      description:
        'Academic credential validating foundational proficiency in computing principles, programming logic, mathematical foundations, and systems analysis prior to honours degree progression.',
      skills_covered: [
        'Computing Foundations',
        'Programming Logic',
        'Mathematics for Computing',
        'Systems Fundamentals',
      ],
      display_order: 1,
    },
    {
      id: 'cert-nibm-se',
      title: 'Diploma in Software Engineering',
      issuing_institution: 'National Institute of Business Management (NIBM), Kandy Campus',
      issue_date: '2025',
      status: 'Verified',
      description:
        'Professional qualification in object-oriented software construction, relational database engineering, desktop application architecture, and full-stack web systems.',
      skills_covered: [
        'Object-Oriented Programming (Java & C#)',
        'Relational Database Design (MySQL & SQL)',
        'Full-Stack Web Engineering',
        'Software Architecture & Lifecycles',
      ],
      display_order: 2,
    },
  ],

  experience: [
    {
      id: 'exp-math-tutor',
      position: 'Mathematics Tutor',
      organization: 'Independent Academic Mentorship',
      employment_type: 'Part-Time / Self-Employed',
      date_range: 'March 2025 – Present',
      is_current: true,
      category: 'Teaching & Mentorship',
      summary:
        'Delivering structured G.C.E. Ordinary Level (O/L) Mathematics instruction focused on conceptual clarity, analytical reasoning, and examination readiness.',
      responsibilities: [
        'O/L mathematics teaching across algebra, geometry, trigonometry, and applied problem-solving',
        'Individualized student guidance and diagnostic learning support for diverse proficiency levels',
        'Designing structured practice papers and tracking continuous academic progress',
      ],
      measurable_contributions: [
        'Sustained mentorship since March 2025 supporting O/L candidates in building mathematical confidence',
        'Developed repeatable step-by-step problem decomposition methods for students',
      ],
      technologies: ['Mathematics Pedagogy', 'Analytical Problem Solving', 'Structured Assessment'],
      display_order: 1,
    },
    {
      id: 'exp-it-tutor',
      position: 'Information Technology (IT) Tutor',
      organization: 'Independent Technical Mentorship',
      employment_type: 'Part-Time / Self-Employed',
      date_range: 'December 2025 – Present',
      is_current: true,
      category: 'Teaching & Mentorship',
      summary:
        'Guiding students through foundational and intermediate Information Technology concepts, programming fundamentals, and practical computing literacy.',
      responsibilities: [
        'IT education covering programming logic, databases, web fundamentals, and system architecture',
        'Hands-on technical guidance during practical coding and software exercises',
        'Supporting learners in bridging textbook theory with real-world computer operation',
      ],
      measurable_contributions: [
        'Active technical mentorship since December 2025 tailored to school and foundation computing syllabi',
      ],
      technologies: ['ICT Fundamentals', 'Programming Logic', 'Database Basics', 'Web Technologies'],
      display_order: 2,
    },
    {
      id: 'exp-project-leadership',
      position: 'Technical Lead & Architecture Coordinator (Academic & Research Projects)',
      organization: 'University & Diploma Engineering Projects',
      employment_type: 'Academic Leadership',
      date_range: '2025 – Present',
      is_current: true,
      category: 'Leadership & Coordination',
      summary:
        'Coordinating system architecture, task breakdown, and repository integration across collaborative academic and AI research projects.',
      responsibilities: [
        'Defining full-stack and AI system architectures across projects such as AUREVON AI, FederatedMind, and WAHDATH',
        'Maintaining Git version control standards, modular code organization, and documentation',
        'Guiding peer collaborators through debugging, API integration, and presentation readiness',
      ],
      measurable_contributions: [
        'Delivered 7+ completed software applications and leading 5 active AI/research systems',
      ],
      technologies: ['Git & GitHub', 'System Architecture', 'Python', 'React', 'FastAPI'],
      display_order: 3,
    },
  ],

  skills: [
    // Programming Languages
    {
      id: 'skill-python',
      name: 'Python',
      category: 'Programming Languages',
      proficiency_label: 'Core Stack',
      description: 'Primary language for AI/ML research, FastAPI backends, async data pipelines, and federated learning.',
      verified_projects: ['AUREVON AI', 'FederatedMind', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Code2',
      display_order: 1,
    },
    {
      id: 'skill-javascript',
      name: 'JavaScript (ES6+)',
      category: 'Programming Languages',
      proficiency_label: 'Core Stack',
      description: 'Used across interactive web applications, real-time webcam face recognition, and PWA platforms.',
      verified_projects: ['Travel-Lanka AI', 'WAHDATH Web Application', 'AI Smart Attendance System', 'GreenRoute AI'],
      icon_key: 'FileCode',
      display_order: 2,
    },
    {
      id: 'skill-typescript',
      name: 'TypeScript',
      category: 'Programming Languages',
      proficiency_label: 'Core Stack',
      description: 'Strict static typing for scalable React architectures, state engines, and API contracts.',
      verified_projects: ['AUREVON AI', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'FileType',
      display_order: 3,
    },
    {
      id: 'skill-java',
      name: 'Java',
      category: 'Programming Languages',
      proficiency_label: 'Active Practice',
      description: 'Object-oriented desktop software construction, data structures, and CRUD management systems.',
      verified_projects: ['Employee Management System', 'Hotel Management System'],
      icon_key: 'Coffee',
      display_order: 4,
    },
    {
      id: 'skill-csharp',
      name: 'C# (.NET / WPF)',
      category: 'Programming Languages',
      proficiency_label: 'Active Practice',
      description: 'Desktop application engineering with XAML/WPF interfaces and relational MySQL integration.',
      verified_projects: ['Gym Management System'],
      icon_key: 'Terminal',
      display_order: 5,
    },
    {
      id: 'skill-html-css',
      name: 'HTML5 & CSS3',
      category: 'Programming Languages',
      proficiency_label: 'Core Stack',
      description: 'Semantic markup, responsive layouts, custom design token systems, and accessible interfaces.',
      verified_projects: ['All Web & Portfolio Systems'],
      icon_key: 'Layout',
      display_order: 6,
    },

    // Frontend Development
    {
      id: 'skill-react',
      name: 'React',
      category: 'Frontend Development',
      proficiency_label: 'Core Stack',
      description: 'Component-driven SPA architecture, custom hooks, streaming SSE state, and interactive 3D/book engines.',
      verified_projects: ['AUREVON AI', 'Travel-Lanka AI', 'PechaVote', 'WAHDATH', 'GreenRoute AI'],
      icon_key: 'Atom',
      display_order: 7,
    },
    {
      id: 'skill-vite',
      name: 'Vite',
      category: 'Frontend Development',
      proficiency_label: 'Core Stack',
      description: 'Modern frontend build tooling, HMR configuration, and optimized production bundle splitting.',
      verified_projects: ['AUREVON AI', 'WAHDATH', 'PechaVote', 'GreenRoute AI'],
      icon_key: 'Zap',
      display_order: 8,
    },
    {
      id: 'skill-tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend Development',
      proficiency_label: 'Core Stack',
      description: 'Utility-first styling combined with semantic CSS custom variables for multi-theme design systems.',
      verified_projects: ['AUREVON AI', 'PechaVote', 'WAHDATH', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Palette',
      display_order: 9,
    },

    // Backend Development
    {
      id: 'skill-fastapi',
      name: 'FastAPI',
      category: 'Backend Development',
      proficiency_label: 'Core Stack',
      description: 'High-performance asynchronous Python REST APIs, SSE token streaming, and Pydantic v2 validation.',
      verified_projects: ['AUREVON AI', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Server',
      display_order: 10,
    },
    {
      id: 'skill-flask',
      name: 'Flask',
      category: 'Backend Development',
      proficiency_label: 'Active Practice',
      description: 'Lightweight Python web microservices and ML model inference endpoints.',
      verified_projects: ['GreenRoute AI Backend Prototypes'],
      icon_key: 'Cpu',
      display_order: 11,
    },

    // AI & Machine Learning
    {
      id: 'skill-pytorch',
      name: 'PyTorch',
      category: 'Artificial Intelligence & Machine Learning',
      proficiency_label: 'Core Stack',
      description: 'Deep learning tensor computation, neural network training loops, and vision dataset evaluation.',
      verified_projects: ['FederatedMind'],
      icon_key: 'BrainCircuit',
      display_order: 12,
    },
    {
      id: 'skill-flower',
      name: 'Flower (flwr)',
      category: 'Artificial Intelligence & Machine Learning',
      proficiency_label: 'Research & Exploration',
      description: 'Federated learning simulation (`flwr[simulation]`), client/server app orchestration, and Dirichlet non-IID partitioning.',
      verified_projects: ['FederatedMind'],
      icon_key: 'Network',
      display_order: 13,
    },
    {
      id: 'skill-ollama',
      name: 'Ollama & Local LLMs (Qwen2.5 3B)',
      category: 'Artificial Intelligence & Machine Learning',
      proficiency_label: 'Core Stack',
      description: 'Local-first LLM/VLM orchestration, context-window management, Document RAG, and streaming inference.',
      verified_projects: ['AUREVON AI', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Sparkles',
      display_order: 14,
    },

    // Databases
    {
      id: 'skill-supabase',
      name: 'Supabase (PostgreSQL)',
      category: 'Databases',
      proficiency_label: 'Core Stack',
      description: 'Relational PostgreSQL schema design, Row Level Security (RLS), real-time subscriptions, and auth.',
      verified_projects: ['PechaVote', 'THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Database',
      display_order: 15,
    },
    {
      id: 'skill-mysql-sqlite',
      name: 'MySQL & SQLite (Async)',
      category: 'Databases',
      proficiency_label: 'Core Stack',
      description: 'Normalized relational modeling with SQLAlchemy 2.0 Async (`aiosqlite`) and traditional MySQL.',
      verified_projects: ['AUREVON AI', 'Gym Management System', 'Library Management System'],
      icon_key: 'HardDrive',
      display_order: 16,
    },

    // Development Tools
    {
      id: 'skill-git-github',
      name: 'Git & GitHub',
      category: 'Development Tools',
      proficiency_label: 'Core Stack',
      description: 'Version control, branching workflows, repository documentation, and collaborative code management.',
      verified_projects: ['All Repositories (github.com/abdurrahman-44)'],
      icon_key: 'GitBranch',
      display_order: 17,
    },

    // Frameworks & Libraries
    {
      id: 'skill-three-r3f',
      name: 'Three.js & React Three Fiber',
      category: 'Frameworks & Libraries',
      proficiency_label: 'Active Practice',
      description: 'Interactive WebGL 3D scenes, studio lighting, GLTF/GLB model pipelines, and camera controls.',
      verified_projects: ['THE MAKING OF ABDURRAHMAN'],
      icon_key: 'Box',
      display_order: 18,
    },
    {
      id: 'skill-framer-leaflet',
      name: 'Framer Motion, Face-API.js & Leaflet',
      category: 'Frameworks & Libraries',
      proficiency_label: 'Active Practice',
      description: 'Choreographed UI physics, browser-based neural face recognition, and interactive geospatial mapping.',
      verified_projects: ['AUREVON AI', 'AI Smart Attendance System', 'GreenRoute AI'],
      icon_key: 'Layers',
      display_order: 19,
    },
  ],

  projects: [
    {
      id: 'proj-federated-mind',
      slug: 'federated-mind',
      title: 'FederatedMind',
      subtitle: 'Privacy-Preserving Federated Learning Research with PyTorch & Flower',
      short_description:
        'Decentralized machine learning research framework investigating IID and Dirichlet non-IID client data distributions using PyTorch 2.10, Flower 1.36, and Ray.',
      overview:
        'FederatedMind explores how collaborative deep learning models can be trained across distributed client nodes without centralizing raw user data. Built on the Flower (`flwr`) simulation framework and PyTorch, it benchmarks model convergence under realistic heterogeneous data partitions.',
      problem_statement:
        'Conventional machine learning requires centralizing sensitive user data on a single server, creating privacy risks and regulatory bottlenecks—while naive decentralized training suffers from accuracy degradation when client data is non-identically distributed (non-IID).',
      proposed_solution:
        'Implemented a modular Flower `ServerApp` and `ClientApp` pipeline with configurable Dirichlet partitioning (`dirichlet-alpha = 0.3` vs `iid`), enabling reproducible evaluation of federated averaging across vision datasets.',
      key_features: [
        'Configurable `ServerApp` and `ClientApp` architecture powered by Flower 1.36 and Ray simulation',
        'Support for both IID and non-IID Dirichlet (`alpha = 0.3`) client dataset partitioning via `flwr-datasets`',
        'Automated dataset inspection (`check_dataset.py`) and round-by-round evaluation (`check_evaluation.py`)',
        'Reproducible dependency lock with `pyproject.toml` and `uv.lock` on Python 3.11',
      ],
      architecture_summary:
        'Flower Simulation Engine (Ray backend) -> Federated ServerApp (FedAvg aggregation) <-> Isolated PyTorch ClientApps training on partitioned vision subsets.',
      development_challenges:
        'Balancing Ray worker memory consumption on consumer hardware while maintaining deterministic evaluation metrics across non-IID client splits.',
      category: 'Research',
      status: 'Ongoing',
      is_featured: true,
      featured_order: 1,
      technologies: ['Python', 'PyTorch', 'Flower (flwr)', 'Ray', 'Torchvision', 'Federated Learning'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2026',
    },
    {
      id: 'proj-aurevon-ai',
      slug: 'aurevon-ai',
      title: 'AUREVON AI',
      subtitle: 'Independent, Open-Source-First Multimodal AI Assistant Platform',
      short_description:
        'Local-first AI assistant platform featuring Ollama (Qwen2.5 3B) & cloud provider independence, Document RAG, Long-Term Semantic Memory, Web Research, and AST Agent tools.',
      overview:
        'AUREVON AI is a complete full-stack AI platform engineered to run smoothly on consumer hardware via local Ollama models (`qwen2.5:3b`, `llava:7b`) while seamlessly bridging to cloud providers (OpenAI, Groq, DeepSeek). It powers the intelligent companion inside this very book.',
      problem_statement:
        'Developers and students often face vendor lock-in, recurring API costs, and privacy concerns when relying solely on cloud LLM interfaces, yet local tools rarely include integrated RAG, memory, and agentic workflows.',
      proposed_solution:
        'Built an async FastAPI + SQLAlchemy 2.0 backend and React + TypeScript frontend featuring real-time SSE token streaming, semantic document chunking, episodic user memory injection, and sandboxed AST tools.',
      key_features: [
        'Unified AI Provider Factory supporting local Ollama (`qwen2.5:3b`) and OpenAI-compatible APIs',
        'Multi-format Document RAG (PDF, Markdown, CSV, Python, JS) with grounded source citations',
        'Long-Term Semantic Memory Manager that persists and injects user facts across threads',
        'Autonomous Agent Tools (`SafeCalculator`, `ASTCodeAnalyzer`, `WebSearchTool`, `DocumentSearchTool`)',
        '11 automated backend pytest suites verifying all platform capabilities',
      ],
      architecture_summary:
        'React 18 + Vite SPA (SSE stream consumer) -> FastAPI Async Routers -> ProviderFactory (Ollama / Cloud) + RAGService + MemoryManager -> SQLAlchemy 2.0 Async (SQLite / PostgreSQL 16).',
      development_challenges:
        'Designing zero-buffering SSE token streaming alongside independent post-stream database persistence sessions so interrupted generations never corrupt conversation state.',
      category: 'Artificial Intelligence',
      status: 'Completed',
      is_featured: true,
      featured_order: 2,
      technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Ollama (Qwen2.5 3B)', 'SQLAlchemy', 'Docker'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2026',
    },
    {
      id: 'proj-travel-lanka-ai',
      slug: 'travel-lanka-ai',
      title: 'Travel-Lanka AI',
      subtitle: 'Intelligent Sri Lanka Destination Discovery & Itinerary Companion',
      short_description:
        'Interactive web application crafted to help travelers discover Sri Lankan destinations, cultural heritage sites, and curated travel routes.',
      overview:
        'Travel-Lanka AI combines modern frontend engineering with intelligent destination recommendations to showcase Sri Lanka’s diverse regions, from hill-country heritage to coastal routes.',
      problem_statement:
        'Travelers planning trips across Sri Lanka often struggle with fragmented information across regions, transport timings, and seasonal highlights.',
      proposed_solution:
        'Developed a responsive React + Vite web experience that organizes destination discovery, regional highlights, and smart itinerary planning into a cohesive interface.',
      key_features: [
        'Interactive destination exploration tailored to Sri Lankan provinces and travel styles',
        'Curated itinerary suggestions with clear route progression',
        'Responsive modern UI built with React and Vite',
      ],
      architecture_summary:
        'Modular React component architecture powered by Vite with structured destination datasets and interactive filtering.',
      development_challenges:
        'Structuring rich destination media and route metadata so pages remain fast and scannable on mobile devices.',
      category: 'Artificial Intelligence',
      status: 'Completed',
      is_featured: true,
      featured_order: 3,
      technologies: ['React', 'JavaScript', 'Vite', 'CSS3'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2025 – 2026',
    },
    {
      id: 'proj-pechavote',
      slug: 'pechavote',
      title: 'PechaVote',
      subtitle: 'Real-Time Digital Voting & Audience Evaluation Platform',
      short_description:
        'Cloud-backed voting web application built with React, Vite, Tailwind CSS, and Supabase PostgreSQL for structured presentations and polls.',
      overview:
        'PechaVote streamlines live audience voting and presentation scoring using a clean React interface backed by Supabase PostgreSQL.',
      problem_statement:
        'Classroom and event presentation sessions (such as PechaKucha-style talks) often rely on slow manual tallying or cluttered form tools.',
      proposed_solution:
        'Engineered a dedicated voting application utilizing Supabase relational tables and client libraries for instant ballot submission and live aggregation.',
      key_features: [
        'Structured SQL schema on Supabase PostgreSQL (`supabase/schema.sql`)',
        'Clean, mobile-first ballot interface built with React and Tailwind CSS',
        'Real-time vote recording and presentation status tracking',
      ],
      architecture_summary:
        'React + Tailwind CSS Frontend -> `@supabase/supabase-js` client -> Supabase PostgreSQL with structured voting schema.',
      development_challenges:
        'Ensuring duplicate-vote prevention and instantaneous UI feedback during concurrent participant submissions.',
      category: 'Web Development',
      status: 'Completed',
      is_featured: true,
      featured_order: 4,
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'JavaScript'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2025 – 2026',
    },
    {
      id: 'proj-wahdath',
      slug: 'wahdath-web-application',
      title: 'WAHDATH Web Application',
      subtitle: 'Digital Muslim Companion Progressive Web App (PWA) for Sri Lanka',
      short_description:
        'Full-stack Progressive Web Application built with React, Tailwind CSS, Workbox service workers, and a dedicated Node backend server.',
      overview:
        'WAHDATH ("A Digital Muslim Companion for Muslims in Sri Lanka") is an installable Progressive Web Application providing localized daily utilities, schedules, and community resources with offline resilience.',
      problem_statement:
        'Existing utility apps often lack accurate Sri Lankan localized schedules or require heavy native installations with poor offline support.',
      proposed_solution:
        'Built an offline-capable PWA using `vite-plugin-pwa` and Workbox caching strategies alongside a companion backend server orchestrated with `concurrently`.',
      key_features: [
        'Installable Progressive Web App (`vite-plugin-pwa` + Workbox runtime caching)',
        'Multi-route React Router v6 navigation with responsive Tailwind CSS views',
        'Integrated client + API server workflow (`dev:full`)',
      ],
      architecture_summary:
        'React 18 + React Router v6 + Workbox PWA Service Worker <-> Node/Express companion server.',
      development_challenges:
        'Configuring Workbox precaching and expiration policies so essential daily schedules remain accessible offline without serving stale data.',
      category: 'Web Development',
      status: 'Completed',
      is_featured: true,
      featured_order: 5,
      technologies: ['React', 'Tailwind CSS', 'Vite', 'PWA (Workbox)', 'JavaScript', 'Node.js'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2025 – 2026',
    },
    {
      id: 'proj-smart-attendance',
      slug: 'ai-smart-attendance-system',
      title: 'AI Smart Attendance System',
      subtitle: 'Real-Time Facial Recognition Attendance Platform',
      short_description:
        'Web-based automated attendance system utilizing webcam streams and Face-API.js neural models to identify students and log attendance in real time.',
      overview:
        'The AI Smart Attendance System replaces manual roll calls with browser-assisted facial detection and recognition, matching live webcam frames against registered student descriptors.',
      problem_statement:
        'Manual attendance tracking in lectures consumes valuable instructional time and is prone to proxy attendance and transcription errors.',
      proposed_solution:
        'Integrated pre-trained facial detection and landmark recognition models (`Face-API.js`) into a responsive web interface that verifies identities in real time and records timestamps.',
      key_features: [
        'Real-time webcam face detection, landmark alignment, and descriptor matching',
        'Automated attendance logging with timestamp verification',
        'Lightweight client-side inference pipeline reducing server GPU overhead',
      ],
      architecture_summary:
        'Browser MediaDevices WebRTC Stream -> Face-API.js Neural Models (SSD Mobilenet / Face Landmark 68 / Face Recognition Net) -> Attendance Record Store.',
      development_challenges:
        'Optimizing model loading and frame inference intervals so recognition stays smooth under varying classroom lighting conditions.',
      category: 'Machine Learning',
      status: 'Ongoing',
      is_featured: true,
      featured_order: 6,
      technologies: ['JavaScript', 'Face-API.js', 'HTML5', 'CSS3', 'Computer Vision'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44/AI-Smart-Attendance-System',
      year: '2025 – Present',
    },
    {
      id: 'proj-greenroute-ai',
      slug: 'greenroute-ai',
      title: 'GreenRoute AI',
      subtitle: 'Geospatial Eco-Routing & Sustainable Mobility Intelligence',
      short_description:
        'Interactive geospatial web application using React 19, Leaflet (`react-leaflet`), and Python backend services for intelligent route visualization.',
      overview:
        'GreenRoute AI investigates how geospatial mapping and algorithmic routing can optimize travel paths for environmental efficiency and urban accessibility.',
      problem_statement:
        'Standard navigation tools prioritize shortest distance or raw speed without surfacing environmental impact or sustainable routing alternatives.',
      proposed_solution:
        'Combining interactive `react-leaflet` cartography with a Python backend service to visualize and compare route corridors.',
      key_features: [
        'Interactive map canvas powered by Leaflet and `react-leaflet`',
        'Modern React 19 + Vite frontend with Lucide iconography',
        'Python backend integration for route scoring and spatial data handling',
      ],
      architecture_summary:
        'React 19 + React-Leaflet Map Client <-> Python Backend API Service.',
      development_challenges:
        'Synchronizing interactive map markers, polyline overlays, and asynchronous route calculations cleanly inside React state.',
      category: 'Artificial Intelligence',
      status: 'Ongoing',
      is_featured: false,
      featured_order: 7,
      technologies: ['React', 'JavaScript', 'Leaflet', 'Python', 'Vite'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2026 – Present',
    },
    {
      id: 'proj-gym-management',
      slug: 'gym-management-system',
      title: 'Gym Management System',
      subtitle: 'Desktop Member & Operations Suite in C# & MySQL',
      short_description:
        'Windows desktop application built with C#, WPF/XAML, and MySQL for managing gym memberships, trainer schedules, and billing records.',
      overview:
        'Developed as a complete desktop software solution, the Gym Management System provides administrators with secure authentication, member registration, and subscription tracking.',
      problem_statement:
        'Local fitness centers relying on paper ledgers struggle to track expiring memberships, payment histories, and equipment schedules.',
      proposed_solution:
        'Engineered a structured C# WPF desktop application connected to a normalized MySQL database with role-guarded administrative screens.',
      key_features: [
        'Secure administrator login and dashboard metrics',
        'Full CRUD management for members, plans, and attendance records',
        'Relational MySQL persistence with parameterized queries',
      ],
      architecture_summary:
        'C# .NET / WPF (XAML UI) -> ADO.NET Data Access Layer -> MySQL Relational Database.',
      development_challenges:
        'Designing clean data-binding between WPF XAML views and MySQL state updates.',
      category: 'Software Development',
      status: 'Completed',
      is_featured: false,
      featured_order: 8,
      technologies: ['C#', 'XAML', 'WPF', 'MySQL'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44/Gym-Management-System',
      year: '2025',
    },
    {
      id: 'proj-employee-management',
      slug: 'employee-management-system',
      title: 'Employee Management System',
      subtitle: 'Java Object-Oriented Personnel Record System',
      short_description:
        'Java desktop application implementing object-oriented principles and full CRUD operations for organizational employee records.',
      overview:
        'An enterprise-style foundational software engineering project built in Java to manage employee onboarding, department assignments, and record updates.',
      problem_statement:
        'Organizations require structured validation and reliable persistence when maintaining personnel directories.',
      proposed_solution:
        'Applied object-oriented encapsulation and modular DAO patterns in Java to provide clean create, read, update, and delete workflows.',
      key_features: [
        'Object-oriented domain modeling in Java',
        'Complete CRUD record lifecycle with input validation',
        'Searchable employee directory interface',
      ],
      architecture_summary:
        'Java Desktop UI -> Domain Service Layer -> Relational Data Persistence.',
      development_challenges:
        'Maintaining strict separation between UI event handlers and underlying data access logic.',
      category: 'Software Development',
      status: 'Completed',
      is_featured: false,
      featured_order: 9,
      technologies: ['Java', 'OOP', 'SQL'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44/Employee_Management_System',
      year: '2025',
    },
    {
      id: 'proj-library-management',
      slug: 'library-management-system',
      title: 'Library Management System',
      subtitle: 'Web-Based Book Reservation & Inventory Platform',
      short_description:
        'Full-stack web application built with PHP, MySQL, Bootstrap, and JavaScript enabling student book reservations and librarian inventory control.',
      overview:
        'A dual-portal web system where students can browse catalog availability and reserve books online while librarians manage circulation, returns, and member requests.',
      problem_statement:
        'Manual library card catalogs make it difficult for students to check book availability remotely or for staff to track overdue reservations.',
      proposed_solution:
        'Developed a responsive PHP + MySQL web platform with separate student and administrator dashboards.',
      key_features: [
        'Student catalog search and online book reservation workflow',
        'Librarian administrative dashboard for inventory, issue, and return tracking',
        'Responsive Bootstrap + JavaScript interface backed by MySQL',
      ],
      architecture_summary:
        'HTML5 / CSS3 / Bootstrap / JS Frontend -> PHP Server Controllers -> MySQL Database.',
      development_challenges:
        'Enforcing transactional consistency when multiple students attempt to reserve the last available copy of a title.',
      category: 'Web Development',
      status: 'Completed',
      is_featured: false,
      featured_order: 10,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44/Library_Management',
      year: '2025',
    },
    {
      id: 'proj-hotel-management',
      slug: 'hotel-management-system',
      title: 'Hotel Management System',
      subtitle: 'Java Hospitality & Room Reservation Application',
      short_description:
        'Java-based hospitality management software handling room availability, guest check-in/check-out lifecycles, and billing records.',
      overview:
        'Built to model real-world hospitality workflows, this Java application manages room categories, guest bookings, and occupancy status.',
      problem_statement:
        'Coordinating room assignments and guest check-ins without conflict requires structured state management and validation.',
      proposed_solution:
        'Implemented a modular Java application with clear booking state transitions and persistent record handling.',
      key_features: [
        'Room occupancy status tracking and reservation management',
        'Guest check-in and check-out record workflows',
        'Structured Java OOP architecture',
      ],
      architecture_summary:
        'Java Application Layer -> Reservation Business Logic -> Persistent Storage.',
      development_challenges:
        'Preventing overlapping room bookings across custom date ranges.',
      category: 'Software Development',
      status: 'Completed',
      is_featured: false,
      featured_order: 11,
      technologies: ['Java', 'OOP'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44/Hotel-Management-system',
      year: '2025',
    },
    {
      id: 'proj-personal-book-portfolio',
      slug: 'the-making-of-abdurrahman',
      title: 'Personal AI Developer Portfolio (The Making of Abdurrahman)',
      subtitle: 'Cinematic Interactive Digital Book with 3D Portrait & AUREVON AI',
      short_description:
        'This interactive two-page digital book portfolio combining React, Three.js/R3F, FastAPI, Supabase PostgreSQL, and grounded AUREVON AI assistance.',
      overview:
        'Designed as an interactive editorial book rather than a conventional scrolling template, this project unifies 13 chapters of verified academic and engineering milestones with a custom book spread engine and server-side AUREVON AI integration.',
      problem_statement:
        'Standard developer portfolios often feel interchangeable and fail to convey the narrative depth, architectural thinking, and live AI capabilities of their creator.',
      proposed_solution:
        'Engineered a responsive digital book engine (two-page desktop spread + single-page mobile swipe) backed by FastAPI, Supabase PostgreSQL, and a grounded AUREVON AI companion.',
      key_features: [
        'Custom two-page desktop spread & mobile single-page book engine with URL/history sync',
        'Interactive Three.js / React Three Fiber 3D portrait stage with studio lighting',
        'Dual-mode AUREVON AI integration (Portfolio Assistant + General AI)',
        'Full FastAPI backend, Supabase RLS database schema, and role-guarded administration',
      ],
      architecture_summary:
        'React 18 + TypeScript + R3F + Tailwind CSS <-> FastAPI Backend + AUREVON AI Adapter <-> Supabase PostgreSQL + Ollama (Qwen2.5 3B).',
      development_challenges:
        'Preserving internal scrollability for long technical chapters inside a realistic two-page open-book layout without clipping content.',
      category: 'Artificial Intelligence',
      status: 'Ongoing',
      is_featured: false,
      featured_order: 12,
      technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'FastAPI', 'Supabase', 'Ollama (Qwen2.5 3B)'],
      screenshots: [],
      github_url: 'https://github.com/abdurrahman-44',
      year: '2026 – Present',
    },
  ],

  achievements: [
    {
      id: 'stat-completed-projects',
      metric_value: 7,
      metric_suffix: '+',
      label: 'Completed Projects',
      sublabel: 'Plus 5 Active AI & Research Systems (12 Total Verified)',
      verification_note:
        'Verified against completed repositories: AUREVON AI, Travel-Lanka AI, PechaVote, WAHDATH, Gym, Employee, Library & Hotel Management Systems.',
      is_verified: true,
      display_order: 1,
    },
    {
      id: 'stat-achievements',
      metric_value: 5,
      metric_suffix: '+',
      label: 'Academic & Technical Milestones',
      sublabel: 'O/L 6A 3B, NIBM SE Diploma, NSBM AI Degree, Tutoring & AI Research',
      verification_note:
        'Verified across academic progression (Zahira National College, NIBM Kandy, NSBM Green University) and technical leadership.',
      is_verified: true,
      display_order: 2,
    },
    {
      id: 'stat-coding-hours',
      metric_value: 400,
      metric_suffix: '+',
      label: 'Focused Coding Hours',
      sublabel: 'Across Python, React, TypeScript, Java, C# & AI Experiments',
      verification_note:
        'Cumulative hands-on engineering and laboratory hours across 12 software and AI projects.',
      is_verified: true,
      display_order: 3,
    },
    {
      id: 'stat-certifications',
      metric_value: 2,
      metric_suffix: '',
      label: 'Academic Credentials',
      sublabel: 'NSBM Advanced Certificate for Computing & NIBM Software Engineering Diploma',
      verification_note:
        'Completed formal computing and software engineering credentials at NSBM Green University and NIBM Kandy Campus.',
      is_verified: true,
      display_order: 4,
    },
  ],

  services: [
    {
      id: 'srv-ai-apps',
      title: 'AI Application Development',
      description:
        'Designing and building practical AI-assisted applications—including local LLM integrations (Ollama), document RAG pipelines, and grounded domain assistants.',
      relevant_technologies: ['Python', 'FastAPI', 'Ollama (Qwen2.5 3B)', 'React', 'TypeScript'],
      example_project_title: 'AUREVON AI Platform',
      example_project_slug: 'aurevon-ai',
      deliverables: [
        'Server-side LLM/VLM integration with streaming SSE responses',
        'Document ingestion and grounded context retrieval (RAG)',
        'Clean, responsive conversational interfaces',
      ],
      display_order: 1,
    },
    {
      id: 'srv-web-apps',
      title: 'Web Application Development',
      description:
        'Crafting responsive, accessible, modern web applications and Progressive Web Apps (PWAs) with clean component architecture and thoughtful typography.',
      relevant_technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
      example_project_title: 'WAHDATH PWA & PechaVote',
      example_project_slug: 'wahdath-web-application',
      deliverables: [
        'Mobile-first single-page and progressive web applications',
        'Light and dark editorial theme systems',
        'Real-time database integration with Supabase PostgreSQL',
      ],
      display_order: 2,
    },
    {
      id: 'srv-ml-solutions',
      title: 'Machine Learning & Computer Vision Prototypes',
      description:
        'Developing applied machine learning prototypes, browser-based computer vision workflows, and privacy-preserving federated learning experiments.',
      relevant_technologies: ['PyTorch', 'Flower (flwr)', 'Face-API.js', 'Python'],
      example_project_title: 'FederatedMind & AI Smart Attendance',
      example_project_slug: 'federated-mind',
      deliverables: [
        'PyTorch model training and evaluation scripts',
        'Federated learning simulation setups (IID & non-IID)',
        'Real-time webcam facial recognition workflows',
      ],
      display_order: 3,
    },
    {
      id: 'srv-software-dev',
      title: 'Custom Software Development',
      description:
        'Building structured desktop and web management systems with normalized relational databases, authentication, and full CRUD lifecycles.',
      relevant_technologies: ['Java', 'C# (.NET / WPF)', 'PHP', 'MySQL', 'PostgreSQL'],
      example_project_title: 'Gym & Library Management Systems',
      example_project_slug: 'gym-management-system',
      deliverables: [
        'Relational schema design and SQL query optimization',
        'Role-based administrative dashboards and reporting',
        'Maintainable object-oriented codebases',
      ],
      display_order: 4,
    },
    {
      id: 'srv-workflow-automation',
      title: 'Workflow Automation & API Engineering',
      description:
        'Streamlining repetitive academic or operational tasks through Python scripting, REST APIs, and structured validation pipelines.',
      relevant_technologies: ['Python', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'Git'],
      example_project_title: 'AUREVON Autonomous Agent Tools',
      example_project_slug: 'aurevon-ai',
      deliverables: [
        'RESTful backend APIs with automated Swagger documentation',
        'Data validation and transformation scripts',
        'Automated pytest verification suites',
      ],
      display_order: 5,
    },
    {
      id: 'srv-mentorship-consulting',
      title: 'Technical Guidance & Peer Mentorship',
      description:
        'Providing clear, patient guidance in foundational programming, IT concepts, and O/L Mathematics—helping learners and student teams build confidence.',
      relevant_technologies: ['Python', 'Java', 'Mathematics', 'ICT Fundamentals', 'System Design'],
      example_project_title: 'Mathematics & IT Tutoring (2025 – Present)',
      example_project_slug: 'the-making-of-abdurrahman',
      deliverables: [
        'One-on-one and small-group concept breakdowns',
        'Project architecture planning for student software builds',
        'Structured exam and practical preparation',
      ],
      display_order: 6,
    },
  ],

  journal: [
    {
      id: 'post-ai-journey',
      slug: 'my-journey-into-artificial-intelligence',
      title: 'My Journey Into Artificial Intelligence: From Mawanella Classrooms to Neural Architectures',
      category: 'Learning Experiences',
      publication_date: 'October 2026',
      reading_time: '5 min read',
      short_introduction:
        'Reflecting on how a love for O/L Mathematics at Zahira National College evolved into formal Software Engineering training at NIBM Kandy and an AI degree at NSBM Green University.',
      related_project: 'AUREVON AI',
      is_published: true,
      content_sections: [
        {
          heading: '1. Where Curiosity Started: The Discipline of Mathematics',
          body: 'Long before I wrote my first Python neural network loop, mathematics taught me that complex problems yield to patience and structured decomposition. Completing my G.C.E. Ordinary Levels at Zahira National College, Mawanella (achieving 6As and 3Bs) and later teaching O/L Mathematics starting in March 2025 reinforced a core lesson: you only truly understand a system when you can explain every step without hand-waving.',
        },
        {
          heading: '2. Learning the Craft of Software Engineering at NIBM Kandy',
          body: 'Artificial Intelligence does not live in a vacuum; it lives inside software systems. During my Diploma in Software Engineering at NIBM Kandy Campus in 2025, I focused on building complete, working applications—from a C# and MySQL Gym Management System to Java CRUD applications and a PHP/MySQL Library Management System. Those projects grounded me in relational schemas, state management, and debugging.',
        },
        {
          heading: '3. Stepping Into BSc (Hons) Artificial Intelligence at NSBM',
          body: 'Beginning my BSc (Hons) in Artificial Intelligence at NSBM Green University in 2026 opened the door to combining solid software engineering with modern AI research. Whether architecting AUREVON AI to run Qwen2.5 3B locally on consumer hardware or experimenting with Federated Learning in PyTorch and Flower, my goal remains constant: build technology that is honest, useful, and human-centered.',
        },
      ],
    },
    {
      id: 'post-federated-learning',
      slug: 'building-a-federated-learning-research-project',
      title: 'Building FederatedMind: Exploring Privacy-Preserving ML with PyTorch and Flower',
      category: 'Artificial Intelligence',
      publication_date: 'October 2026',
      reading_time: '6 min read',
      short_introduction:
        'Technical field notes on configuring Flower (flwr 1.36) and PyTorch 2.10 to evaluate how non-IID Dirichlet data splits impact federated model convergence.',
      related_project: 'FederatedMind',
      is_published: true,
      content_sections: [
        {
          heading: '1. Why Federated Learning Matters',
          body: 'Centralizing raw user data on a single training cluster is increasingly impractical for privacy-sensitive domains like healthcare, mobile keyboards, and personal assistants. Federated Learning reverses the paradigm: instead of moving data to the model, we dispatch the model to the client devices and aggregate only the learned weight updates.',
        },
        {
          heading: '2. Architecting ServerApp and ClientApp in Flower',
          body: 'In FederatedMind, I structured the pipeline around Flower’s modular ServerApp and ClientApp abstractions alongside Ray for local client simulation. Crucially, real-world client data is rarely Identically and Independently Distributed (IID). Using a Dirichlet distribution (alpha = 0.3), we can simulate skewed client datasets and measure how standard Federated Averaging behaves under stress.',
          code_snippet: {
            language: 'toml',
            code: `[tool.flwr.app.config]
num-server-rounds = 1
fraction-evaluate = 1.0
local-epochs = 1
learning-rate = 0.1
batch-size = 32
partition-mode = "iid"
dirichlet-alpha = 0.3`,
          },
        },
        {
          heading: '3. Key Takeaways from Local Simulation',
          body: 'Running distributed Ray actors alongside PyTorch on a 16 GB RAM Windows 11 machine requires disciplined resource allocation and automated verification scripts (check_dataset.py and check_evaluation.py). This ongoing research directly informs how I think about decentralized intelligence.',
        },
      ],
    },
    {
      id: 'post-travel-lanka-lessons',
      slug: 'lessons-from-building-travel-lanka-ai',
      title: 'Lessons From Building Travel-Lanka AI: Designing for Real-World Discovery',
      category: 'Project Development',
      publication_date: 'September 2026',
      reading_time: '4 min read',
      short_introduction:
        'How building a Sri Lankan travel discovery platform taught me to balance intelligent recommendations with fast, intuitive frontend architecture.',
      related_project: 'Travel-Lanka AI',
      is_published: true,
      content_sections: [
        {
          heading: '1. Designing Around Local Context',
          body: 'Sri Lanka offers an extraordinary density of landscapes—from Kandy’s cultural heritage to southern coastal towns and central highlands. When building Travel-Lanka AI, the primary challenge was organizing rich regional data so users could move from inspiration to a structured itinerary without cognitive overload.',
        },
        {
          heading: '2. Component Modularity in React and Vite',
          body: 'By structuring the frontend with reusable React components and Vite, we kept state transitions snappy and ensured that destination filtering and route previews remained responsive across both desktop and mobile viewports.',
        },
      ],
    },
    {
      id: 'post-smart-attendance',
      slug: 'building-an-ai-powered-attendance-system',
      title: 'Building an AI-Powered Smart Attendance System in the Browser',
      category: 'Machine Learning',
      publication_date: 'August 2026',
      reading_time: '5 min read',
      short_introduction:
        'Practical lessons from integrating Face-API.js with live webcam streams to automate student attendance verification in real time.',
      related_project: 'AI Smart Attendance System',
      is_published: true,
      content_sections: [
        {
          heading: '1. Bringing Computer Vision to the Web',
          body: 'Rather than requiring specialized hardware terminals, the AI Smart Attendance System uses standard browser webcam streams paired with Face-API.js neural models to detect faces, extract 68-point facial landmarks, and compute feature descriptors.',
        },
        {
          heading: '2. Handling Lighting and Frame Rate Trade-offs',
          body: 'Real classrooms rarely have studio lighting. Tuning detection confidence thresholds and decoupling video rendering from descriptor matching were essential to keeping the UI responsive while maintaining recognition accuracy.',
        },
      ],
    },
    {
      id: 'post-debugging-lessons',
      slug: 'problems-i-faced-while-developing-my-projects',
      title: 'Problems I Faced While Developing My Projects—and How They Shaped My Engineering Habits',
      category: 'Technical Challenges',
      publication_date: 'July 2026',
      reading_time: '6 min read',
      short_introduction:
        'From async SQLAlchemy session lifecycles in SSE streams to offline PWA caching in WAHDATH, here are the real bugs that taught me the most.',
      related_project: 'AUREVON AI',
      is_published: true,
      content_sections: [
        {
          heading: '1. Async Database Sessions Inside Streaming Responses',
          body: 'While building AUREVON AI’s Server-Sent Events (SSE) chat endpoint in FastAPI, I discovered that request-scoped database sessions can close before a long-running token stream finishes. Opening an independent async session block specifically for post-stream message persistence solved the issue cleanly.',
        },
        {
          heading: '2. Graceful Degradation When Local Services Are Offline',
          body: 'Not every user running a local-first AI platform has Ollama running at all times. Instead of letting a connection refusal crash the UI, I built structured health checks and clear diagnostic guidance so the system always communicates honestly with the user.',
        },
      ],
    },
    {
      id: 'post-leading-tech-projects',
      slug: 'what-i-learned-from-leading-a-university-technology-project',
      title: 'What I Learned From Coordinating Collaborative Technology Projects & Tutoring',
      category: 'Software Development',
      publication_date: 'June 2026',
      reading_time: '4 min read',
      short_introduction:
        'How teaching Mathematics and IT alongside coordinating student software builds strengthened my approach to code clarity and teamwork.',
      related_project: 'WAHDATH Web Application',
      is_published: true,
      content_sections: [
        {
          heading: '1. Documentation Is an Act of Empathy',
          body: 'Whether helping an O/L student work through a quadratic equation or onboarding a teammate to a React + Supabase repository like PechaVote, clear documentation and predictable folder structures save hours of confusion.',
        },
        {
          heading: '2. Shipping Incrementally',
          body: 'Breaking complex builds into verifiable phases—foundation, core engine, data layer, and testing—ensures that a project stays runnable at every stage rather than collapsing under last-minute integration bugs.',
        },
      ],
    },
  ],

  // Strict adherence to PART 17: Never generate fake customer reviews.
  // Empty approved list by default; UI shows an honest editorial verification notice in development
  // and allows real approved testimonials to be published via the Admin CMS.
  testimonials: [],

  next_chapter: {
    ai_research_interests: [
      {
        title: 'Privacy-Preserving & Federated Machine Learning',
        detail:
          'Advancing FederatedMind to explore personalized federated optimization algorithms (such as FedProx and scaffolded aggregation) on heterogeneous client distributions.',
      },
      {
        title: 'Efficient Local & Small Language Models (SLMs)',
        detail:
          'Investigating quantization, context-window grounding, and hybrid RAG architectures for models in the 1B–7B parameter class (such as Qwen2.5 3B) running on edge and consumer hardware.',
      },
      {
        title: 'Multimodal & Embodied Agent Workflows',
        detail:
          'Combining vision-language understanding with deterministic, sandboxed tool execution and verifiable audit trails.',
      },
    ],
    ml_interests: [
      {
        title: 'Applied Computer Vision',
        detail:
          'Extending real-time facial and spatial recognition pipelines with stronger illumination invariance and privacy-first local inference.',
      },
      {
        title: 'Geospatial & Sustainability Intelligence',
        detail:
          'Expanding GreenRoute AI with multi-objective graph routing that weighs travel time alongside environmental metrics.',
      },
    ],
    technologies_exploring: [
      { name: 'Flower (flwr) & Ray Distributed Simulation', focus: 'Multi-node federated learning benchmarks' },
      { name: 'Three.js / React Three Fiber & GLSL Shaders', focus: 'Interactive 3D web experiences & digital twins' },
      { name: 'PostgreSQL pgvector & Hybrid Semantic Retrieval', focus: 'Production-scale RAG grounding' },
      { name: 'FastAPI Async Microservices & Docker Orchestration', focus: 'Resilient cloud-to-local AI bridges' },
    ],
    professional_goals: [
      'Excel in my BSc (Hons) Artificial Intelligence degree at NSBM Green University while publishing reproducible open-source research code.',
      'Continue mentoring students in Mathematics and Information Technology, helping younger learners build strong analytical foundations.',
      'Contribute to impactful AI and software engineering projects that bridge academic rigor with production usability.',
    ],
    future_project_ideas: [
      {
        title: 'FederatedMind Studio',
        concept:
          'An interactive visual dashboard for inspecting federated training rounds, client drift, and privacy budgets in real time.',
      },
      {
        title: 'AUREVON Scholar',
        concept:
          'A specialized academic research companion module inside AUREVON AI for synthesizing lecture notes, LaTeX papers, and code repositories.',
      },
    ],
    long_term_direction:
      'To grow into a principled Artificial Intelligence Engineer and Researcher who builds transparent, privacy-respecting intelligent systems—and never stops learning or teaching along the way.',
  },
};
