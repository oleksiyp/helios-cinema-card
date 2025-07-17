# Installation and Setup Guide

This guide will help you install and configure the Helios Cinema Card in your Home Assistant setup.

## Prerequisites

- Home Assistant 2023.1.0 or later
- Access to Home Assistant configuration files
- Internet connection for movie data fetching

## Installation Methods

### Method 1: HACS (Recommended)

HACS (Home Assistant Community Store) is the easiest way to install and manage custom integrations.

#### Step 1: Install via HACS
1. Open Home Assistant
2. Go to **HACS** → **Integrations**
3. Click the **"+"** button in the bottom right
4. Search for **"Helios Cinema Card"**
5. Click **Install**
6. Restart Home Assistant

#### Step 2: Add Lovelace Resource
1. Go to **Settings** → **Dashboards**
2. Click the **three dots menu** → **Resources**
3. Click **"+ Add Resource"**
4. Set URL to: `/hacsfiles/helios-cinema-card/helios-cinema-card.js`
5. Set Resource type to: **JavaScript Module**
6. Click **Create**

### Method 2: Manual Installation

#### Step 1: Download Files
1. Download the latest release from [GitHub releases](https://github.com/yourusername/helios-cinema-card/releases)
2. Extract the downloaded ZIP file

#### Step 2: Copy Integration Files
1. Copy the `custom_components/helios_cinema` folder to your Home Assistant `custom_components` directory
2. Your structure should look like:
   ```
   homeassistant/
   ├── custom_components/
   │   └── helios_cinema/
   │       ├── __init__.py
   │       ├── manifest.json
   │       └── sensor.py
   ```

#### Step 3: Copy Frontend Files
1. Copy `www/helios-cinema-card.js` to your Home Assistant `www` directory
2. Your structure should look like:
   ```
   homeassistant/
   ├── www/
   │   └── helios-cinema-card.js
   ```

#### Step 4: Add Lovelace Resource
1. Add to your `configuration.yaml`:
   ```yaml
   lovelace:
     resources:
       - url: /local/helios-cinema-card.js
         type: module
   ```
2. Or add via UI: **Settings** → **Dashboards** → **Resources**

#### Step 5: Restart Home Assistant

## Configuration

### Step 1: Configure Integration
Add the following to your `configuration.yaml`:

```yaml
helios_cinema:
  update_interval: 30  # Update every 30 minutes (optional)
  cinema_url: "https://helios.pl/wroclaw/kino-helios-magnolia"  # Optional, this is the default
```

### Step 2: Restart Home Assistant
The sensor entity `sensor.helios_cinema_films` will be created automatically.

### Step 3: Add Card to Dashboard
Add a new card to your Lovelace dashboard:

```yaml
type: custom:helios-cinema-card
entity: sensor.helios_cinema_films
name: "Helios Cinema Wrocław"
auto_rotate: true
rotate_interval: 5000
manual_timeout: 30000
```

## Verification

### Check Entity Creation
1. Go to **Developer Tools** → **States**
2. Search for `sensor.helios_cinema_films`
3. Verify the entity exists and has film data

### Check Logs
1. Go to **Settings** → **System** → **Logs**
2. Search for "helios_cinema"
3. Check for any error messages

### Test Card
1. Go to your dashboard
2. Verify the card displays movie information
3. Test auto-rotation and manual controls

## Troubleshooting

### Entity Not Found
- Verify the integration is properly installed
- Check `configuration.yaml` syntax
- Restart Home Assistant
- Check logs for error messages

### Card Not Loading
- Verify the JavaScript file is in the correct location
- Check browser console for errors
- Clear browser cache
- Verify the resource is added to Lovelace

### No Movie Data
- Check internet connectivity
- Verify the Helios website is accessible
- Check logs for scraping errors
- Try manually accessing the Helios URL

### Debug Mode
Enable detailed logging:

```yaml
logger:
  logs:
    custom_components.helios_cinema: debug
```

## Advanced Configuration

### Custom Cinema URL
If you want to scrape a different Helios cinema:

```yaml
helios_cinema:
  cinema_url: "https://helios.pl/warszawa/kino-helios-city"
```

### Update Frequency
Adjust how often movie data is fetched:

```yaml
helios_cinema:
  update_interval: 15  # Update every 15 minutes
```

### Card Customization
Customize card behavior:

```yaml
type: custom:helios-cinema-card
entity: sensor.helios_cinema_films
name: "Local Cinema"
auto_rotate: false          # Disable auto-rotation
rotate_interval: 10000      # 10-second intervals
manual_timeout: 60000       # 1-minute timeout
```

## Support

If you encounter issues:
1. Check the [troubleshooting section](#troubleshooting)
2. Review the [GitHub issues](https://github.com/yourusername/helios-cinema-card/issues)
3. Create a new issue with logs and configuration details
