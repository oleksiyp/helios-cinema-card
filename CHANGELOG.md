# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-17

### Added
- Initial release of Helios Cinema Card
- **Configurable cinema support** for any Helios Cinema location in Poland
- Web scraping integration with configurable cinema URL
- Interactive rotating card component for Lovelace
- Auto-rotation with manual mode override
- Film information display (poster, title, description, showtimes)
- Responsive design for desktop and mobile
- Configurable rotation intervals and timeouts
- HACS compatibility for easy installation
- **"Add to Home Assistant" button** in README
- Demo page for testing functionality

### Configuration Options
- `cinema_url`: Configurable URL for any Helios cinema location
- `cinema_name`: Custom display name for the cinema
- `update_interval`: Configurable data refresh interval

### Features
- Real-time movie data fetching from any Helios website
- Automatic card rotation every 5 seconds (configurable)
- Click-to-manual mode with 30-second auto-return
- Navigation controls for manual browsing
- Film counter and mode indicators
- Error handling and fallback parsing
- Home Assistant sensor integration with unique entity names
- Customizable update intervals

### Supported Locations
- Works with any Helios Cinema in Poland (Warsaw, Krakow, Wrocław, Gdansk, Poznan, etc.)
- Easy configuration with simple URL copy-paste from helios.pl

[1.0.0]: https://github.com/oleksiyp/helios-cinema-card/releases/tag/v1.0.0
