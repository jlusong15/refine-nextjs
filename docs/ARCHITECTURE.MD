## Architecture
* **Modular Architecture** – Built using Next.js App Router with a feature-based folder structure.
* **Reusable Components** – UI is organized into reusable shared components and feature-specific modules.
* **Refine** – Handles routing, resource management, CRUD operations, and role-based access control through the `accessControlProvider`.
* **Server State Management** – Managed by TanStack Query through Refine for efficient data fetching, caching, and synchronization.
* **Global Client State** – Managed with Zustand to mock user authentication by allowing developers to toggle (View as) between authenticated and unauthenticated views during development.
* **Form Management** – Built with React Hook Form for performant form handling.
* **Validation** – Uses Zod for schema-based validation and end-to-end type safety.
* **Theming & Responsiveness** – Implements a centralized color theme system using Tailwind CSS and shadcn/ui design tokens for consistent, maintainable styling, while leveraging Tailwind's responsive utility classes to provide an optimized user experience across desktop, tablet, and mobile devices.


## API Integration Approach
* **Backend API** – The application communicates with a Strapi REST API hosted in a shared **test environment on Railway**.
* **Data Provider** – API communication is centralized through Refine's `dataProvider`, which is configured with the Strapi Data Provider to enable resource-based CRUD operations.
* **Database** – The Strapi backend is connected to a **PostgreSQL database hosted on Supabase**.
* **Data Provider** – Refine's Strapi data provider is used to simplify CRUD operations and resource management.
* **HTTP Client** – Axios is configured to handle authenticated API requests using the required environment variables.
* **Data Fetching** – Refine hooks (`useList`, `useShow`, `useCreate`, `useUpdate`, and `useDelete`) are used to perform CRUD operations.
* **Caching & Synchronization** – TanStack Query, through Refine, manages query caching, background refetching, and automatic query invalidation to keep the UI synchronized with backend data.
* **Environment Configuration** – The frontend connects to the shared test backend using environment variables, allowing the same application to be configured for different environments without code changes.

### Access Control Roles
The application uses Refine's `accessControlProvider` to demonstrate role-based access control. The following mock roles and permissions are configured from the database:

| Role            | Permissions                  |
| --------------- | ---------------------------- |
| **ADMIN**       | View, Create, Update, Delete |
| **RECRUITER**   | View, Create, Update         |
| **INTERVIEWER** | View                         |

These roles are used to conditionally display pages, actions, and UI elements throughout the application based on the current user's assigned permissions.


## Challenges Encountered
Some challenges included integrating Refine with Next.js App Router, handling query invalidation to keep dashboard statistics up to date, optimizing loading and background refetch states for a smoother user experience, and configuring environment variables and deployment for seamless communication with the shared Strapi backend.

