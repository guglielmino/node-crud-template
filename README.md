# CRUD Node.js service template

A simple skel intended to develop CRUD microservices with node.

Tech stack:

- Node.js (14.x and up)
- Typescript
- Typeorm

## Design

Design is very simple, it is intended to develop services working with a single entity or entities strictly connected between each other (boundary context).

Below the high level design for the service design.

    ┌─────────────┬─────────────┐
    │             │             │
    │   GraphQL   │   REST      │  Presentation Layer
    │             │             │
    └─────────────┴─────────────┘

    ┌───────────────────────────┐
    │                           │
    │       Services            │  Service layer (business)
    │                           │
    └───────────────────────────┘

    ┌───────────────────────────┐
    │                           │
    │       Repositories        │  Data Access Layer
    ├────────┬────────┬─────────┤
    │        │        │         │
    │        │        │         │
    │        │        │         │
    │  MySql │ MongoDB│ Other   │  Database Layer
    └────────┴────────┴─────────┘


