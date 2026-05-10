# Application Task: Archive Explorer

A high-performance mobile application built to demonstrate production-ready architectural patterns, efficient state management, and optimized list rendering in React Native. 

The application interfaces with the Open Library API to provide a search-driven archive feed with infinite scrolling, local data persistence, and native stack navigation. Design decisions prioritize absolute performance and raw functionality over bloated UI frameworks, utilizing a brutalist, high-contrast aesthetic.

## ⚙️ Core Functionality
*   **Infinite Scroll Feed:** Effortlessly loads massive datasets using highly optimized `FlatList` pagination strategies.
*   **Debounced Search:** Real-time query filtering that aggressively minimizes unnecessary API calls.
*   **State Persistence:** App state (feed data and search context) survives app restarts and background kills via local device storage.
*   **Native Navigation:** Fluid screen transitions managed by React Navigation's Native Stack.

