# Animal Quiz Game

Welcome to the Animal Quiz Game! This project is a fun and educational game where players can test their knowledge of different animals. The game fetches data about various animals and presents it to the player in the form of a quiz. Players can guess the name of the animal based on its characteristics and taxonomy.

## Table of Contents

-   [Features](#features)
-   [Game Rules](#game-rules)
-   [How to Play](#how-to-play)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Components](#components)
-   [Contributing](#contributing)

## Features

-   **Random Animal Selection**: Enter any letter or multiple letters to fetch a random animal.
-   **Hints**: Reveal characteristics or taxonomy details to help guess the animal's name.
-   **Score Calculation**: Points are awarded based on the number of hints used.
-   **Timer**: A 20-minute timer to answer as many questions as possible.
-   **Responsive Design**: Optimized for both desktop and mobile devices.

## Game Rules

1. Enter an animal name in the input box and click "Search" to start each question.
2. The game will display characteristics and taxonomy of a randomly selected type of the searched animal.
3. You start with 20 points for each question.
4. Each hint you reveal will reduce the points for that question.
    - Characteristics hint: -2 points
    - Taxonomy hint: -4 points
5. If you guess the correct animal name, you will earn points based on the number of hints used. Fewer hints mean more points.
6. If you guess incorrectly, you will receive 0 points for that question.
7. Answer as many questions as you can within the 20-minute time limit.
8. Your total score will be calculated and displayed when the time runs out or when you finish all questions.

## How to Play

1. Click "Start Game" to begin.
2. Enter any animal name in the input box and click "Search".
3. The game will fetch various types of the searched animal and randomly select one.
4. Characteristics and taxonomy of the selected animal will be displayed.
5. Use hints to reveal more details if needed.
6. Guess the name of the animal and earn points.
7. Continue to the next question or restart the game when time runs out.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/dubea001/animal-game.git
    ```
2. Navigate to the project directory:
    ```sh
    cd animal-quiz-game
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and go to `http://localhost:5173` to play the game.

## Components

### `App.jsx`

-   Main component that sets up routes for the application.

### `StartGame.jsx`

-   Component that displays the game instructions and rules.
-   Includes a button to start the game.

### `GameSection.jsx`

-   Main game component where the quiz takes place.
-   Handles fetching animal data, managing game state, and displaying quiz questions.

### `OrganizedTable.jsx`

-   Component for displaying animal characteristics and taxonomy in a table format.
-   Allows users to reveal properties by clicking a button.

### `fetchApi.js`

-   Utility function for fetching data from the API.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.
