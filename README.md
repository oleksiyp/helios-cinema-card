# Helios Cinema Card

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]
[![License][license-shield]](LICENSE)
[![hacs][hacsbadge]][hacs]

A custom Home Assistant integration that displays movies from Helios Cinema Wrocław as an interactive rotating card.

![Helios Cinema Card Demo](demo-screenshot.png)

## Features

- 🎬 **Real-time movie data** from Helios Cinema Wrocław Magnolia
- 🔄 **Auto-rotating display** with manual override
- 📱 **Responsive design** for desktop and mobile
- ⏰ **Showtimes** for today and tomorrow
- 🎨 **Customizable appearance** and behavior
- 🚀 **Easy installation** via HACS or manual setup

## Installation

### HACS (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Go to HACS → Integrations
3. Click the "+" button and search for "Helios Cinema Card"
4. Install the integration
5. Restart Home Assistant
6. Add the integration through Settings → Integrations

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/yourusername/helios-cinema-card/releases)
2. Extract the files
3. Copy `custom_components/helios_cinema` to your `custom_components` directory
4. Copy `www/helios-cinema-card.js` to your `www` directory
5. Restart Home Assistant
6. Add the Lovelace resource:

```yaml
resources:
  - url: /local/helios-cinema-card.js
    type: module
```

4. Restart Home Assistant

## Configuration

### Add to configuration.yaml:

```yaml
helios_cinema:
  update_interval: 30  # minutes (optional, default: 30)
  cinema_url: "https://helios.pl/wroclaw/kino-helios-magnolia"  # optional
```

### Add to Lovelace:

```yaml
type: custom:helios-cinema-card
entity: sensor.helios_cinema_films
name: "Cinema Films"
auto_rotate: true
rotate_interval: 5000  # milliseconds
manual_timeout: 30000  # milliseconds
```

## Card Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | The sensor entity ID |
| `name` | string | "Cinema Films" | Card title |
| `auto_rotate` | boolean | true | Enable automatic rotation |
| `rotate_interval` | number | 5000 | Auto-rotation interval in milliseconds |
| `manual_timeout` | number | 30000 | Time before returning to auto mode |

## Usage

- The card automatically rotates through available films
- Click anywhere on the card to switch to manual mode
- Use navigation arrows to browse films manually
- After 30 seconds of inactivity, auto-rotation resumes
- Film counter shows current position (e.g., "2 / 5")
- Mode indicator shows "Auto Rotate" or "Manual Mode"

## Development

### Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Test the scraping functionality
python test_scraper.py
```

### File Structure

```
helios-cinema-card/
├── custom_components/
│   └── helios_cinema/
│       ├── __init__.py
│       ├── manifest.json
│       └── sensor.py
├── www/
│   └── helios-cinema-card.js
├── test_scraper.py
├── requirements.txt
└── README.md
```

## Troubleshooting

1. **No films showing**: Check that the Helios website is accessible and the HTML structure hasn't changed
2. **Card not loading**: Ensure the JavaScript file is in the `www` directory and added to resources
3. **Entity not found**: Verify the sensor is created by checking Developer Tools > States

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
