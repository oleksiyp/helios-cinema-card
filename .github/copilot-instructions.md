<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Helios Cinema Card Development Instructions

This is a Home Assistant custom component that scrapes movie information from Helios Cinema Wrocław and displays it as an interactive rotating card.

## Project Structure
- `custom_components/helios_cinema/` - Home Assistant integration files
- `www/helios-cinema-card.js` - Frontend Lovelace card component
- Web scraping logic uses aiohttp and BeautifulSoup4
- Frontend uses Lit framework for web components

## Key Components
1. **Sensor** (`sensor.py`) - Fetches and parses movie data from Helios website
2. **Card** (`helios-cinema-card.js`) - Interactive frontend component with rotation logic
3. **Integration** (`__init__.py`) - Home Assistant component setup

## Development Guidelines
- Follow Home Assistant development patterns and async/await usage
- Use proper error handling for web scraping (timeouts, HTTP errors)
- Maintain responsive design for both desktop and mobile
- Implement proper TypeScript-like patterns in JavaScript (without actual TypeScript syntax)
- Use Home Assistant design tokens and styling conventions

## Web Scraping Notes
- Target URL: https://helios.pl/wroclaw/kino-helios-magnolia
- Parse movie titles, descriptions, images, and showtimes
- Handle dynamic content and fallback parsing strategies
- Respect rate limiting and add appropriate delays

## Frontend Behavior
- Auto-rotation every 5 seconds by default
- Click to enter manual mode
- Return to auto mode after 30 seconds of inactivity
- Show navigation controls on hover
- Display film counter and mode indicator
