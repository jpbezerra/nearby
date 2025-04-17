# Nearby

Nearby is a platform that connects users to local markets and services. It consists of two main components: an API backend and a mobile application. The API handles data management and business logic, while the mobile app provides an intuitive interface for users to explore nearby markets and services.

---

## Features

- **API**: 
  - Built with Node.js and Prisma for efficient database management.
  - Handles categories, coupons, and market data.
  - Includes error handling and modular architecture for scalability.

- **Mobile App**:
  - Developed with React Native and Expo.
  - Interactive map to display nearby markets.
  - Dynamic filtering of categories and sub-areas.
  - User-friendly interface for exploring and navigating to markets.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (for mobile development)
- **SQLite** (for local database)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nearby.git
   cd nearby
   ```

2. Install dependencies for the API:
   ```bash
   cd api
   npm install
   ```

3. Install dependencies for the mobile app:
   ```bash
   cd ../mobile
   npm install
   ```

## Running the Project

### API
1. Navigate to the api directory:
   ```bash
   cd api
   ```

2. Start the API server:
   ```bash
   npm start
   ```

3. The API will be available at http://localhost:3000.

### Mobile App

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Use the Expo Go app on your mobile device or an emulator to preview the app.

## Project Structure
   ```bash
   nearby/
    ├── api/
    │   ├── prisma/                # Database schema and migrations
    │   ├── src/
    │   │   ├── controllers/       # API controllers
    │   │   ├── database/          # Prisma database connection
    │   │   ├── middlewares/       # Error handling and other middleware
    │   │   ├── routes/            # API routes
    │   │   ├── utils/             # Utility classes and helpers
    │   │   └── server.ts          # Main server entry point
    │   ├── .env                   # Environment variables
    │   ├── package.json           # Node.js dependencies
    │   └── tsconfig.json          # TypeScript configuration
    ├── mobile/
    │   ├── assets/                # Images and other assets
    │   ├── src/                   # Mobile app source code
    │   ├── app.json               # Expo configuration
    │   ├── package.json           # React Native dependencies
    └── README.md                  # Main project documentation
   ```

## Environment Variables

For the API, create a .env file in the api directory with the following variables:

   ```bash
   DATABASE_URL="file:./dev.db"
   PORT=3000
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, please contact jpbezerra.work@gmail.com.