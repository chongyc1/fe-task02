# FE Task 02
Rick and Morty API <br />
by Yc <br />

## Table of Content
- [Production/Demo Link](#productiondemo-link)
- [Technology / Library Used](#technology--library-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Directroy Structure](#directory-structure)
  - [Folder Description](#folder-description)
  - [Components Structure Design](#components-structure-design)
- [Usage](#usage)
  - [Router](#router-component)
  - [Layout / Navbar](#layout-and-navbar-component)
  - [\<ContactSection />](#contactsection-component)
  - [\<CharacterSection />](#charactersection-component)
- [Hooks](#hooks)
  - [useGetContactsList](#usegetcontactslist-hooks)
  - [useDebounced](#usedebounced-hooks)
  - [useScrollToContact](#usescrolltocontact-hooks)
  - [useGetCharacterDetails](#usegetcharacterdetails-hooks)
- Provider
  - [ContactDataProvider](#contactdataprovider-provider)


## Production/Demo Link
Deployed by Vercel <br />
https://fe-task02.vercel.app/

## Technology / Library Used
- React 18 (Typescript)
- Vite
- React Router Dom v6
- Axios
- Tailwind CSS

## Features
- Ability to view **Chracter list** 
  - URL: `/contact`
  - Filter by `Status` or `Gender`
  - Filter by `name` input  
- Ability to view **Chracter details** 
  - URL: `/contact/:id`
  - Character Info
  - Episodes Info

## Getting Started

### Prerequisites
- Node.js v16+
- npm (Package manager)

### Installation
```bash
# Clone this project
git close https://github.com/chongyc1/fe-task02

# Navigate to the project
cd fe-task02

# Install dependencies
npm install
```

### Running the Project
```bash
# For development
npm run dev

# For build for production
npm run build
```


## Directory Structure
```bash
.
├── 📁 src/               # main working folder
│   ├── ...
│   ├── 📁 apis/          # Handling API
│   ├── 📁 components/    # Contains reusable UI components
│   ├── 📁 hooks/         # Custom hooks
│   ├── 📁 types/         # Type definitions
│   ├── Router.tsx        # Handling Route
│   ├── App.tsx           # main app component
│   ├── main.tsx          # Entry point of the app
│   └── ...
└── README.md             
```
### Folder Description
Below is an overview of the structure:
- `apis`: Handling API requests
- `components`: Resuable UI components used accross the whole application/project.
- `hooks`: Custom React hooks for the application.
- `types`: TypeScript type definitions to ensure type safety.


### Components Structure Design

All new components are organized within the `src/components` directory. Below is an overview of the structure:
- `index.tsx`: The main entry point for the component.
 
- `_components`: A folder that contains sub-components, which are smaller, reusable parts of the main component.


```bash
.
├── 📁 src/               
│   ├── ...
│   ├── 📁 components/    
│       │
│       ├── 📁 new-components/ 
│       │   ├── 📁 _components/  
│       │   └── index.tsx   
│       │
│       ├── 📁 new2-components/ 
│           ├── 📁 _components/  
│           └── index.tsx
└── ...
```

## Usage

### `Router` Component
Path - ```/src/Router.tsx```

Example:
- `/` → Home page
- `/contact` → Contacts List
- `/contact/:id` → Character details for contact with ID

### Usage
```ts
<Route path="{YOUR_PATH}" element={<YourElement />} />
```

### `Layout` and `Navbar` Component

**Layout** <br />
Path - `/src/components/main/Layout.tsx`
<br />
A container for the main application layout. It split the content into two primary sections: a **sidebar** for navigation and a **content area** for displaying content.
<br />
**Usage**
```ts
<Layout>
  <YourPageComponent />
</Layout>
```
<br />

**Navbar** <br />
Path - ```/src/components/main/_components/Navbar.tsx```
<br />
A component in the sidebar of the Layout. It uses `react-router-dom` component to navigate pages.
<br />
**Usage**
```ts
const NAV = [
  ...,
  {
    name: "Your Path",
    path: '/add-your-path-here',
  },
  ...
];
```

### `ContactSection` Component
- A component that contain contact list and filter section
- Main function for getting contact list data - `useGetContactsList`

**Usage**
```ts
import ContactSection from './components/ContactSection';

const ContactsPage = () => {
  const contactId = "123"; // Example contact ID to scroll to (in /contact/:id)

const preloadPage = // Count the occurrences of ID 123 on a specific page (Optional)
  
  return (
    <div>
      <h1>Contacts</h1>
      <ContactSection
        preloadPage={preloadPage} //Optional
        id={contactId}
      />
    </div>
  );
};

```

### `CharacterSection` Component
Displays detailed information for a character, including character details and a list of episodes in which they appear.
- It is developed using a component-based style, making it easily extendable in the future.

**Sub-components** <br />
- `CharacterHeader`: Character's name and Image
- `PersonalInfo`: Detailed character's information - such as species, status, gender, etc.
- `EpisodesInfo`: The list of episodes in which the character has appeared

**Usage**
```ts
import CharacterSection from './components/CharacterSection';

const CharacterDetailPage = () => {
  return (
    <div>
      <h1>Character Details</h1>
      <CharacterSection />
    </div>
  );
};
```

## Hooks
Custom Hook for the system

### `useGetContactsList` hooks
The hook is to fetch and manage a list of contacts with support for pagination and filtering. <br />
It handles fetching contacts from an API, managing loading states, and applying filters to the results. <br />
The hook returns data related to the contact list, the current loading state, pagination details, and methods to manipulate the filter and pagination.


<br />

**Usage**
```ts
import useGetContactsList from 'path/to/useGetContactsList';
const {
  data,
  loading,
  page,
  maxPage,
  filter,
  setPage,
  setFilterData 
} = useGetContactsList();
```

`Params` <br />

- preloadPage (optional): This is the initial params to preload for `/contact/:id`. If not provided, it defaults to page 1.

<br />

`Return`<br />

The hook returns an object containing the following properties and methods:

- `data`: An array of Contact objects
- `loading`: Is the data still being fetched.
- `page`: Current page number.
- `maxPage`: Total number of pages available based on API.
- `filter`: An object representing the current filters. Contains:
  - `name`: name filter.
  - `status`: status filter.
  - `gender`: gender filter.
- `searchMode`: Is search filter is active.
- `setPage`: Function - update the current page number.
- `setFilterData`: Function to update the filter state.


### `useDebounced` hooks
A debouncing function delays executing a callback until a X amount of time has passed since the last trigger. In this project is when want to wait until the user stops typing the name filter input before taking action.

**Usage**
```ts
useDebounced(() => {
  YourFunction()
}, 500, [query]);
```

Based on `query` state, it will wait until 500ms without any chages, will execute `YourFunction()`



### `useScrollToContact` hooks
To automatically scroll to the contact row for `ContactSection` when in url `contact/:id`

**Usage**
```ts
import useScrollToContact from "path/to/useScrollToContact";

useScrollToContact(CONTACT_ID, loading, preloadPage);
```

### `useGetCharacterDetails` hooks
To fetch detailed information about a specific character. It return character's data and a list of episodes. 

`Param` <br />
- id: The unique id of the character.

`Return` <br />
- loading: A boolean that determine the data are still being loaded from the API.
- data: The character data: name, species, status, and more. This is of type `Contact`.
- episodes: An array of episodes (of type `Episode`).


### `ContactDataProvider` Provider
Initially, I planned to use `<ContactDataWrapper>` to store all the data within the Provider.<br />
Plan B, I decided to use hooks instead.
However, **`selectedCharacter`** is still in use for sharing across components, 
can refer to the active contact in `<ContactRow>`          