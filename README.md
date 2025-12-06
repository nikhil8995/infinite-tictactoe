# Endless X & O Game

An endless variation of Tic-Tac-Toe where pieces fade and disappear, keeping the game going forever!

## Game Rules

- Players take turns placing X and O on a 3x3 grid
- After 6 total moves (3 per player), the oldest piece starts fading with a lighter color
- You **cannot** place a piece on a fading square
- After the next move, the fading piece is removed from the board
- Get 3 in a row to win, but the game continues endlessly!

## Running Locally with Python

### Prerequisites

- Python 3.11+ or Miniconda
- Docker (for containerized deployment)

### Setup with Miniconda

```bash
# Create a new conda environment
conda create -n x0game python=3.11 -y

# Activate the environment
conda activate x0game

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

Visit `http://localhost:5000` in your browser.

## Running with Docker

### Build and run with Docker

```bash
# Build the Docker image
docker build -t x0game .

# Run the container
docker run -p 5000:5000 x0game
```

### Using Docker Compose (recommended)

```bash
# Build and start the application
docker compose up --build

# Run in detached mode
docker compose up -d

# Stop the application
docker compose down
```

Visit `http://172.18.0.2:5000` in your browser.

## Project Structure

```
X0/
├── app.py                 # Flask backend with game logic
├── templates/
│   └── index.html        # HTML template with game board
├── static/
│   └── game.js           # JavaScript game logic
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── README.md           # This file
```

## Features

- ✨ Beautiful gradient UI with animations
- 🎨 Fading animation for pieces about to disappear
- 🚫 Prevents placing pieces on fading squares
- 🏆 Win detection with celebration animation
- ♾️ Endless gameplay
- 🐳 Docker-ready for easy deployment

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Docker & Docker Compose
