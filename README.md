# Helios Cinema Card

[![GitHub Release][releases-shield]][releases]
[![GitHub Activity][commits-shield]][commits]
[![License][license-shield]](LICENSE)
[![hacs][hacsbadge]][hacs]

A custom Lovelace card for Home Assistant that displays movies from Helios Cinema locations as an interactive rotating card.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=oleksiyp&repository=helios-cinema-card&category=lovelace)

![Helios Cinema Card Demo](screenshots/card-demo.png)

## Features

- 🎬 **Interactive movie display** with auto-rotation
- 🔄 **Manual navigation** with click-to-browse
- 📱 **Responsive design** for desktop and mobile
- ⏰ **Movie details** including showtimes and descriptions
- 🎨 **Customizable behavior** and timing
- 🚀 **Easy installation** via HACS

## Prerequisites

This card requires the **[Helios Cinema Scraper](https://github.com/oleksiyp/helios-cinema-scraper)** integration to provide movie data.

### Install the Integration First

1. Install [Helios Cinema Scraper](https://github.com/oleksiyp/helios-cinema-scraper) via HACS
2. Configure it in your `configuration.yaml`:
   ```yaml
   sensor:
     - platform: helios_cinema
       cinema_url: "https://helios.pl/wroclaw/kino-helios-magnolia"
       cinema_name: "Wrocław Magnolia"
   ```
3. Restart Home Assistant
4. Verify the sensor appears as `sensor.helios_cinema_wroclaw_magnolia` (or similar)

## Installation

### HACS (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Go to HACS → Frontend
3. Click the "+" button and search for "Helios Cinema Card"
4. Install the card
5. Add the card resource (HACS usually does this automatically)

### Manual Installation

1. Download `helios-cinema-card.js` from the latest release
2. Copy it to your `www` directory in Home Assistant
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/helios-cinema-card.js
    type: module
```

4. Restart Home Assistant

## Configuration

Add the card to your Lovelace dashboard:

```yaml
type: custom:helios-cinema-card
entity: sensor.helios_cinema_wroclaw_magnolia  # Use your sensor entity
name: "Cinema Films"
auto_rotate: true
rotate_interval: 5000  # milliseconds
manual_timeout: 30000  # milliseconds
```

## Card Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **Required** | The Helios Cinema sensor entity ID |
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

## Supported Cinemas

This card works with any Helios Cinema location in Poland that you configure in the [Helios Cinema Scraper](https://github.com/oleksiyp/helios-cinema-scraper) integration, including:

- **Wrocław**: Magnolia, Arkady
- **Warsaw**: City, Galeria Mokotów, Blue City
- **Krakow**: Plaza, Galeria Kazimierz
- **Gdansk**: Madison, Forum Gdansk
- **Poznan**: Stary Browar, Malta
- And many more!

## Development

### File Structure

```
helios-cinema-card/
├── helios-cinema-card.js    # Main card component
├── hacs.json               # HACS configuration
├── screenshots/            # Demo images
└── README.md              # Documentation
```

### Building from Source

The card is built using Lit framework. To modify:

1. Edit `helios-cinema-card.js`
2. Test in your Home Assistant instance
3. Submit a pull request

## Troubleshooting

1. **Card not loading**: Ensure the JavaScript file is added to resources
2. **No data showing**: Verify the Helios Cinema Scraper integration is installed and working
3. **Entity not found**: Check Developer Tools > States for the correct entity name
4. **Auto-rotation not working**: Check browser console for JavaScript errors

## Related Projects

- **[Helios Cinema Scraper](https://github.com/oleksiyp/helios-cinema-scraper)** - Required integration for data source

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

[releases-shield]: https://img.shields.io/github/release/oleksiyp/helios-cinema-card.svg?style=for-the-badge
[commits-shield]: https://img.shields.io/github/commit-activity/y/oleksiyp/helios-cinema-card.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/oleksiyp/helios-cinema-card.svg?style=for-the-badge
[hacsbadge]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge

[releases]: https://github.com/oleksiyp/helios-cinema-card/releases
[commits]: https://github.com/oleksiyp/helios-cinema-card/commits/main
[hacs]: https://github.com/custom-components/hacs
