Perfect. We’ll treat Angular Router as a mini-course and build one application alongside it. That will let you understand not only the APIs, but also how routing influences real Angular application architecture.

I’ll use the current standalone Angular style with provideRouter, app.routes.ts, functional guards/resolvers, and lazy-loaded standalone components/features. This matches Angular’s current official guidance.

The application we'll build

We'll build a small Project Management Portal because it naturally gives us enough routing scenarios without making the business logic complicated.

Angular Router Learning App


/
├── home
├── login
├── projects
│   ├── /
│   ├── /new
│   └── /:projectId
│       ├── overview
│       ├── tasks
│       └── settings
│
├── employees
│   ├── /
│   └── /:employeeId
│
├── admin
│   ├── dashboard
│   └── users
│
├── settings
│   ├── profile
│   └── preferences
│
└── ** → 404

This one application will eventually let us cover almost the entire Router.

Our learning path
Router fundamentals
What routing actually means in an SPA
Routes
provideRouter()
RouterOutlet
RouterLink
RouterLinkActive
route matching
redirects
wildcard/404 routes
Navigation
declarative navigation with routerLink
programmatic navigation with Router
absolute vs relative navigation
navigate()
navigateByUrl()
navigation extras
Dynamic routes
/projects/:projectId
route parameters
ActivatedRoute
snapshots vs observable route state
component input binding
Query parameters
/projects?page=2&status=active
query parameter handling
preserve / merge
fragments
Nested routing
parent/child routes
nested router-outlet
/projects/10/tasks
/projects/10/settings
relative child navigation
Route configuration architecture
root routes
feature routes
route constants
keeping routing scalable
Lazy loading
loadComponent
loadChildren
feature-level route files
eager vs lazy loading
bundle boundaries

Angular currently supports both eager and lazy route loading, with loadComponent and loadChildren providing the main lazy-loading mechanisms.

Route guards
CanActivateFn
CanActivateChildFn
CanDeactivateFn
CanMatchFn
authentication
authorization
unsaved form protection
redirecting from guards

We'll also discuss the architectural rule that guards are UX/navigation controls, not actual security; authorization must still be enforced server-side. Angular explicitly warns about this.

Resolvers
ResolveFn
fetching project data before navigation
resolver errors
resolver + guards
when resolvers are appropriate
when normal component loading is better

Resolvers run before route activation and can supply data through the activated route.

Route metadata
data
route titles
permissions
breadcrumbs
feature metadata
Router events
NavigationStart
NavigationEnd
NavigationCancel
NavigationError
lazy-load events
loading indicators
analytics

The Router exposes these through Router.events.

Advanced routing
route-level providers
custom matchers
dynamic redirects
UrlTree
same-URL navigation
route reuse
auxiliary/named outlets
preloading strategies
router configuration features
view transitions
debugging routing problems
Production architecture
feature-first folder structure
lazy feature boundaries
authentication architecture
authorization architecture
route-driven data
URL design
avoiding giant app.routes.ts
common routing anti-patterns