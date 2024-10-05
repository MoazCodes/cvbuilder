# CV Builder

A **React-based frontend web application** for building and customizing CVs. This project allows users to create, edit, and download their CVs easily, featuring various templates and styling options.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create and edit CVs with user-friendly interface.
- Various templates and styling options.
- Download CVs in PDF format.
- Responsive design for optimal viewing on all devices.

## Technologies Used
- **Frontend**: React
- **Backend**: Django 
- **Styling**: CSS / Bootstrap
- **Build Tools**: Webpack, Babel

## Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (version 14 or higher)
- **npm** (Node package manager, comes with Node.js)
- **Python** 
- **Django** 
- **Git** 

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:MoazCodes/cvbuilder.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd cvbuilder
   ```
3. **Install frontend dependencies**:
    ```bash
    cd frontend
    npm install
    ```
4. **Install backend dependencies**:
    ```bash
    cd ../backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    deactivate
    ```

## Usage
1. **Run the frontend**:
    ```bash
    cd frontend
    npm start
    ```
2. **Run the backend**:
    ```bash
    cd backend
    source venv/bin/activate
    python manage.py migrate
    python manage.py runserver
    ```
3. **closing project**:
    ```bash
    deactivate
    ```

## Contributing
Contributions are welcome! Please follow these steps:
1. **Fork the repo**.
2. **Create a new branch for your feature**:
    ```bash
    git checkout -b feature/YourFeatureName
    ```
3. **Make your changes and commit them**:
    ```bash
    git add .
    git commit -m "Add your message here"
    ```
4. **Push to your forked repository**:
    ```bash
    git push origin feature/YourFeatureName
    ```
5. **Create a pull request**.

## License
This project is licensed under the **MIT** License. See the [LICENSE](https://opensource.org/license/mit) file for details.
