# FE Test task for the position of Frontend Developer

## 🚀 [Live Demo](https://test-task-timeline-zrtsky.vercel.app) 🚀

## Task description

Create a simple **planning screen** that includes the following features:

1. **Drag & Drop Functionality**:
    - Allow users to drag and drop items between different days & users.
2. **Right-Click Context Menu**:
    - Enable a right-click feature on items to open a context menu with at least two actions (e.g., Edit and Delete).
3. **Modals**:
    - Include modals triggered by user interactions (e.g., clicking a button or selecting an option in the context menu).
    - The modal should display detailed information about the selected item and allow edits.
4. **Dynamic Data Handling**:
    - Use **fake data** to populate the planning screen dynamically (no need for a backend).
    - Ensure data updates in real-time when an item is dragged, dropped, or modified.

## Tech Stack

- [Next.js 15 (React 19)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [date-fns](https://date-fns.org/)

*And etc.*

## Description

I used the React 19 compiler in this project, which optimizes rendering by default. As a result, you may notice that I didn’t use `useMemo`, `useCallback`, or the `memo HOC` in many places. These optimizations are now less critical since React 19’s compiler takes care of many performance-related concerns automatically.

In this project, I implemented the **Feature-Sliced Design (FSD)** methodology to structure the frontend application. **FSD** is a modern, scalable approach to organizing frontend projects, focusing on dividing the application by features and layers to improve maintainability, scalability, and collaboration.

## Key Features

### 1. Dragging and Dropping Tasks

Users can easily drag and drop tasks within the timeline. This feature allows for quick reorganization and scheduling adjustments directly in the interface.

- Drag: Click and hold a task, then move it horizontally or vertically across the timeline.
- Horizontal Drag: Adjusts the task’s position in time (e.g., moving it to a different day or time).
- Vertical Drag: Allows changing the task’s grouping (e.g., assigning it to a different team or category).
- Drop: When the task is dropped, the changes are saved, and any necessary validations or updates are triggered (e.g., preventing overlaps or respecting constraints).

### Technical Implementation

- The drag-and-drop behavior is built using event listeners (onDragStart, onDragOver, onDrop) or libraries like react-beautiful-dnd for seamless animations and performance.

### 2. Double-Click for Editing

Tasks in the timeline can be edited directly through a double-click action, which opens a detailed editing menu.

### Key Behaviors

**Double-Click: Opens a modal or sidebar with a form that allows users to modify task details such as:**

- Title
- Description
- Status (e.g., “In Progress”, “Completed”)
  
**Save/Cancel Options:**

- Save: Updates the task and reflects changes immediately on the timeline.
- Cancel: Closes the menu without saving changes.
