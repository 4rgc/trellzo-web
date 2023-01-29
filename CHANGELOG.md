## v0.6.1 (2023-01-29)

### Fix

- **nginx**: add a config to handle over control over the routes to the app

## v0.6.0 (2023-01-29)

### Feat

- **nav**: show current app version (#71)
- **nav**: show current app version
- **nav**: display version in nav

## v0.5.0 (2022-11-27)

### Feat

- **Board**: allow moving of cards between and within lists (#56)

## v0.4.0 (2022-08-24)

### Feat

- **NoteCard**: display note due date
- **NoteCard**: align card name and description to the top-left corner

### Fix

- **NoteCard**: fix else if condition after refactor
- **Card**: render contents without an extra div if it's a ReactNode
- **NoteCard**: prevent NoteCard css spilling into other Card components
- **GhostCard**: force disable image on small GhostCards
- **EditableCard**: inputs and textareas growing outside card bounds
- **Card**: inner container growing outisde card bounds

### Refactor

- **NoteCard**: remove extra else if block in due date rendering
- **NoteCard**: remove redundant due-text class
- **Card**: separate title implementation by adding a className to it
- **NotesList**: move NoteCard to a separate component

## v0.3.0 (2022-08-22)

### Feat

- display lists (#33)

## v0.2.0 (2022-08-16)

### Feat

- **Boards**: open a board (#24)

## v0.1.1 (2022-08-14)

### Fix

- **ci**: save commitzen change increment for the release step

## v0.1.0 (2022-08-14)

### Feat

- add board creation (#12)
- add the EditableCard component (#9)
- add the TextInput component (merge PR #11)
- add a GhostCard component (merge PR #8)
- implement the GhostCard component
- add a way to override Card styles
- add automatic jwt refresh when getting 401
- make cards clickable
- show board cards on the boards page
- stretch the page content for the full width
- add a divider between the nav and the content
- add a nav element
- add Logo component
- add ellipsis on card title
- add Card component
- redirect to boards page on login
- add react routes
- add temporary implementation for the boards page
- add index.tsx to hook folder
- add typing to useFetcher hook
- change css files into scss
- implement a basic login page
- add a constructor to APIRequestParams
- use fetcher in useTrellzoAPI hook instead of useSWR
- implement custom useFetcher hook
- add a Button component
- add an interface for props with a class generator
- create a ClassGenerator type
- implement interfaces for React props
- implement custom hook to access the Trellzo API
- implement fetcher for the api
- store route in APIParams
- implement API request parameter wrapper

### Fix

- properly type GhostCard
- scss error
- set the API error when refreshing fails
- infinite refresh loop on unprotected routes
- build error by adding mini-css-extract-plugin
- move placeholder svg
- add global styles to storybook
- put all inputs into a form on the login page
- include credentials with fetcher
- add use callback to stop constant component rerendering
- return undefined body params string when empty
- add content-type to fetcher requests

### Refactor

- card scss, move image hiding to the component logic
- useTrellzoAPI logic to have its own state
- improve variable namings in useFetcher
- card subcomponents
- login page into a separate location
- Button styles and related code
