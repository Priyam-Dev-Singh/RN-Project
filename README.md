# Archive Explorer

A React Native application for data retrieval and state management. 

The system interfaces with the Open Library API to output a search feed. The architecture focuses on list rendering, state persistence, and native navigation.

### Live Demonstration
[View Execution Record](https://drive.google.com/file/d/1Opr3kk--2m2tJjh9PlFqQISjBg4prys0/view?usp=drivesdk)

---

## Architecture

* **Pagination:** Loads data subsets using FlatList.
* **Search:** Filters queries and limits network requests via debouncing.
* **Persistence:** Writes search context and feed data to local storage to survive app restarts.
* **Navigation:** Routes screen transitions using Native Stack.

## Stack
* **Framework:** React Native (CLI)
* **State Management:** Redux Toolkit, Redux Persist
* **Navigation:** React Navigation
* **Data Source:** Open Library API

## Execution

1. Install dependencies:
   `npm install`

2. Start the JavaScript engine:
   `npm start`

3. Compile the Android shell:
   `npm run android`
