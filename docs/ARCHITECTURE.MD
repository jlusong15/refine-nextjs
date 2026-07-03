## Architecture
The application follows a modular, feature-based architecture using Next.js App Router.

UI components are organized into reusable shared components and feature-specific modules, while Refine handles routing, resource management, and CRUD operations. Server state is managed by TanStack Query through Refine, while Zustand is used for lightweight global client state to mock user authentication by allowing developers to toggle between authenticated and unauthenticated views during development. Forms are built with React Hook Form and validated using Zod schemas to ensure consistent input validation and type safety. A centralized color theme system is implemented using Tailwind CSS and shadcn/ui design tokens to provide consistent, maintainable styling across the application.

## API Integration Approach
The frontend communicates with a Strapi backend using Refine's Strapi data provider. CRUD operations are performed through Refine hooks such as useList, useShow, useCreate, useUpdate, and useDelete, with Axios handling authenticated HTTP requests. Query caching and automatic data invalidation are managed by TanStack Query to keep the UI synchronized with backend changes.

## Challenges Encountered
Some challenges included integrating Refine with Next.js App Router, handling query invalidation to keep dashboard statistics up to date, optimizing loading and background refetch states for a smoother user experience, and configuring environment variables and deployment for seamless communication with the shared Strapi backend.

