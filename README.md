# Movie Rental App
![image](https://github.com/user-attachments/assets/bf72af4d-adcd-4904-b6d4-80ce09c9f0e6)

## Introduction
Movie Rental App, a mock application built with Next.js and React. This application allows users to browse a collection of movies, add them to a cart, checkout rentals, and manage their rented movies—all handled on the frontend without backend user tracking. It's designed for demonstration purposes, showcasing state management, context APIs, and interactive UI components.

## Features
- **Browse Movies**: View a list of available movies with details such as genre, language, director, and stock availability
- **Search Functionality**: Search for movies by title with debounced input to optimize performance
- **Add to Cart**: Add movies to a rental cart, ensuring duplicates are not allowed and stock availability is respected
- **Checkout Rentals**: Complete the rental process, updating movie stock and adding movies to the user's rented list
- **Manage Rentals**: View and return rented movies, which updates the stock accordingly
- **Responsive Design**: Enjoy a seamless experience across various devices and screen sizes
- **Interactive UI**: Utilize animations and tooltips for enhanced user interaction

## Technologies Used
- **Framework**: Next.js (React Framework)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Custom UI components (Buttons, Badges, Drawers, etc.)

## Getting Started

### Prerequisites
- Node.js: Ensure you have Node.js installed. You can download it [here](https://nodejs.org)
- npm or yarn: Package manager to install dependencies

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/movie-rental-app.git
```

2. **Navigate to the Project Directory**
```bash
cd movie-rental-app
```

3. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. **Browse Movies**: On the home page, view the list of available movies. Each movie card displays relevant details.
2. **Search Movies**: Use the search bar at the top to find movies by title. The search input is debounced to optimize performance.
3. **Add to Cart**: Click the "Rent Movie" button on a movie card to add it to your rental cart.
4. **View Cart**: Click the floating cart icon at the bottom-right corner to open the rental cart drawer.
5. **Checkout Rentals**: In the cart drawer, click "Complete Rental" to finalize your rentals.
6. **Manage Rentals**: Navigate to the "My Rentals" page via the header to view and return your rented movies.
7. **Return Movies**: In the "My Rentals" page, click "Return Movie" to return a rented movie.
8. 
Open your browser and navigate to `http://localhost:3000` to view the application.

## Notes
- **State Persistence**: Data will be lost on page refresh. Consider using localStorage for persistence.
- **Authentication**: This mock app doesn't include user authentication.
- **Backend Limitations**: Frontend manages rental data while backend handles stock updates.
