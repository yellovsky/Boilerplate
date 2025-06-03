# Frontend Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technical Architecture](#technical-architecture)
3. [Application Structure](#application-structure)
4. [Development Environment](#development-environment)
5. [State Management & Data Flow](#state-management--data-flow)
6. [UI/UX Architecture](#uiux-architecture)
7. [Testing Strategy](#testing-strategy)
8. [Performance Considerations](#performance-considerations)
9. [Developer Experience](#developer-experience)

## Overview

The frontend application is built using modern React with React Router, following Feature-Sliced Design (FSD) principles. It leverages Vite for build tooling and includes comprehensive testing, internationalization, and state management solutions.

### Key Technologies
- React 19.1
- React Router 7.6
- Vite 6.3
- TailwindCSS 4.1
- Mantine UI 8.0
- TypeScript 5.8
- Storybook 9.0
- Vitest 3.1

## Technical Architecture

### Application Layer Structure

```mermaid
graph TB
    subgraph "Application Layers"
        App[App Layer]
        Pages[Pages Layer]
        Widgets[Widgets Layer]
        Features[Features Layer]
        Entities[Entities Layer]
        Shared[Shared Layer]
    end

    App --> Pages
    Pages --> Widgets
    Widgets --> Features
    Features --> Entities
    Entities --> Shared
```

### Build and Runtime Architecture

```mermaid
graph TB
    subgraph "Build Time"
        TS[TypeScript]
        Vite[Vite]
        TW[TailwindCSS]
        Babel[Babel]
    end

    subgraph "Runtime"
        React[React]
        Router[React Router]
        Query[TanStack Query]
        State[Jotai]
    end

    subgraph "Development"
        SB[Storybook]
        Test[Vitest]
        DevTools[DevTools]
    end

    TS --> Vite
    TW --> Vite
    Babel --> Vite
    Vite --> Runtime
```

## Application Structure

### Directory Organization
```
app/
├── app/ # Application-wide setup and configuration
├── pages/ # Route components and page layouts
├── widgets/ # Complex UI components combining features
├── features/ # Business logic and feature implementations
├── entities/ # Business entities and their logic
├── shared/ # Shared utilities, types, and components
├── library/ # UI component library
└── server/ # Server-side rendering logic
```

### Key Files
- `root.tsx` - Application root component and layout setup
- `entry.client.tsx` - Client-side hydration and i18n setup
- `entry.server.tsx` - Server-side rendering configuration
- `routes.ts` - Route definitions with locale support
- `theme.ts` - Mantine theme configuration

## Development Environment

### Build System Architecture

```mermaid
flowchart LR
    subgraph "Development Tools"
        Vite[Vite Dev Server]
        HMR[Hot Module Replacement]
        TS[TypeScript Checker]
        Biome[Biome Linter]
    end

    subgraph "Build Pipeline"
        Source[Source Files]
        Compile[Compilation]
        Bundle[Bundling]
        Output[Output]
    end

    Source --> Vite
    Vite --> HMR
    Source --> TS
    Source --> Biome
    Source --> Compile
    Compile --> Bundle
    Bundle --> Output
```

### Development Features
- Hot Module Replacement with Vite
- TypeScript type checking
- Biome for linting and formatting
- React Router DevTools integration
- TanStack Query DevTools
- Storybook for component development

## State Management & Data Flow

### Data Flow Architecture

```mermaid
graph LR
    subgraph "Client State"
        Jotai[Jotai Atoms]
        Local[Local State]
    end

    subgraph "Server State"
        Query[TanStack Query]
        Cache[Query Cache]
    end

    subgraph "UI Layer"
        Components[React Components]
        Routes[Route Components]
    end

    Query --> Cache
    Cache --> Components
    Jotai --> Components
    Local --> Components
    Components --> Routes
```

### State Management Solutions
- Jotai for global state
- TanStack Query for server state
- React Query DevTools for debugging
- Type-safe state management

## UI/UX Architecture

### Component Library Structure

```mermaid
graph TB
    subgraph "UI Components"
        Atoms[Atomic Components]
        Molecules[Molecular Components]
        Organisms[Organism Components]
        Templates[Template Components]
    end

    subgraph "Styling"
        Tailwind[TailwindCSS]
        Mantine[Mantine UI]
        CVA[Class Variance Authority]
    end

    Atoms --> Molecules
    Molecules --> Organisms
    Organisms --> Templates
    Tailwind --> Atoms
    Mantine --> Molecules
    CVA --> Atoms
```

### Design System Integration
- TailwindCSS for utility-first styling
- Mantine UI for advanced components
- Custom theme configuration with CSS layers
- Responsive design patterns
- Accessibility compliance with a11y addon

## Testing Strategy

### Testing Architecture

```mermaid
graph TB
    subgraph "Testing Levels"
        Unit[Unit Tests]
        Integration[Integration Tests]
        Component[Component Tests]
        E2E[E2E Tests]
    end

    subgraph "Tools"
        Vitest[Vitest]
        RTL[React Testing Library]
        Playwright[Playwright]
        StorybookTest[Storybook Tests]
    end

    Unit --> Vitest
    Integration --> RTL
    Component --> StorybookTest
    E2E --> Playwright
```

### Testing Tools
- Vitest for unit and integration testing
- React Testing Library for component testing
- Storybook for visual testing and documentation
- Coverage reporting with v8

## Performance Considerations

### Performance Optimization

```mermaid
graph TB
    subgraph "Build Optimization"
        Code[Code Splitting]
        Tree[Tree Shaking]
        Lazy[Lazy Loading]
    end

    subgraph "Runtime Optimization"
        Cache[Query Caching]
        Memo[Memoization]
        Virtual[Virtualization]
    end

    Code --> Bundle[Bundle Size]
    Tree --> Bundle
    Lazy --> LoadTime[Load Time]
    Cache --> Performance[Runtime Performance]
    Memo --> Performance
    Virtual --> Performance
```

### Key Performance Features
- Code splitting by route
- Lazy loading of components
- Query caching with TanStack Query
- Server-side rendering
- Optimized asset loading

## Developer Experience

### Development Workflow

```mermaid
flowchart LR
    subgraph "Local Development"
        Code[Code]
        Format[Format]
        Lint[Lint]
        Test[Test]
    end

    subgraph "Quality Gates"
        Types[Type Check]
        Tests[Test Suite]
        Build[Build]
    end

    Code --> Format
    Format --> Lint
    Lint --> Types
    Types --> Tests
    Tests --> Build
```

### Developer Tools
- Comprehensive TypeScript support
- Biome for code quality
- Hot Module Replacement
- Development server with SSR
- React DevTools integration
- Query DevTools
- Storybook development environment

## Getting Started

### Prerequisites
- Node.js >=20.0.0
- Yarn package manager

### Development Commands
```bash
# Start development server
yarn dev

# Run tests
yarn test
yarn test:ui    # With UI
yarn test:cov   # With coverage

# Start Storybook
yarn storybook

# Type checking
yarn lint

# Build for production
yarn build
```

## Best Practices

### Code Organization
1. Follow Feature-Sliced Design principles
2. Keep components small and focused
3. Use TypeScript for type safety
4. Implement lazy loading for routes
5. Follow accessibility guidelines

### State Management
1. Use Jotai for global state
2. Implement TanStack Query for API calls
3. Leverage React Query's caching
4. Keep state close to where it's used

### Performance
1. Implement code splitting
2. Use proper memoization
3. Optimize images and assets
4. Monitor bundle sizes
5. Implement proper caching strategies
