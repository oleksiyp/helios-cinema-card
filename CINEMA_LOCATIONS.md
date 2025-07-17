# Supported Helios Cinema Locations

This integration works with any Helios Cinema location in Poland. Below are some popular configurations:

## Major Cities

### Warsaw (Warszawa)
```yaml
# Helios City
helios_cinema:
  cinema_url: "https://helios.pl/warszawa/kino-helios-city"
  cinema_name: "Helios City Warsaw"

# Helios Galeria Mokotów
helios_cinema:
  cinema_url: "https://helios.pl/warszawa/kino-helios-galeria-mokotow"
  cinema_name: "Helios Galeria Mokotów"

# Helios Blue City
helios_cinema:
  cinema_url: "https://helios.pl/warszawa/kino-helios-blue-city"
  cinema_name: "Helios Blue City"
```

### Krakow (Kraków)
```yaml
# Helios Plaza
helios_cinema:
  cinema_url: "https://helios.pl/krakow/kino-helios-plaza"
  cinema_name: "Helios Plaza Krakow"

# Helios Galeria Kazimierz
helios_cinema:
  cinema_url: "https://helios.pl/krakow/kino-helios-galeria-kazimierz"
  cinema_name: "Helios Galeria Kazimierz"
```

### Wrocław
```yaml
# Helios Magnolia (Default)
helios_cinema:
  cinema_url: "https://helios.pl/wroclaw/kino-helios-magnolia"
  cinema_name: "Helios Magnolia Wrocław"

# Helios Arkady
helios_cinema:
  cinema_url: "https://helios.pl/wroclaw/kino-helios-arkady"
  cinema_name: "Helios Arkady Wrocław"
```

### Gdansk (Gdańsk)
```yaml
# Helios Madison
helios_cinema:
  cinema_url: "https://helios.pl/gdansk/kino-helios-madison"
  cinema_name: "Helios Madison Gdansk"

# Helios Forum Gdansk
helios_cinema:
  cinema_url: "https://helios.pl/gdansk/kino-helios-forum-gdansk"
  cinema_name: "Helios Forum Gdansk"
```

### Poznan (Poznań)
```yaml
# Helios Stary Browar
helios_cinema:
  cinema_url: "https://helios.pl/poznan/kino-helios-stary-browar"
  cinema_name: "Helios Stary Browar"

# Helios Malta
helios_cinema:
  cinema_url: "https://helios.pl/poznan/kino-helios-malta"
  cinema_name: "Helios Malta"
```

## Other Cities

### Katowice
```yaml
helios_cinema:
  cinema_url: "https://helios.pl/katowice/kino-helios-punkt44"
  cinema_name: "Helios Punkt44 Katowice"
```

### Lodz (Łódź)
```yaml
helios_cinema:
  cinema_url: "https://helios.pl/lodz/kino-helios-galeria-lodz"
  cinema_name: "Helios Galeria Łódź"
```

### Szczecin
```yaml
helios_cinema:
  cinema_url: "https://helios.pl/szczecin/kino-helios-kaskada"
  cinema_name: "Helios Kaskada Szczecin"
```

### Lublin
```yaml
helios_cinema:
  cinema_url: "https://helios.pl/lublin/kino-helios-lublin-plaza"
  cinema_name: "Helios Plaza Lublin"
```

## How to Find Your Cinema URL

1. Visit [helios.pl](https://helios.pl)
2. Click on your city
3. Select your preferred cinema location
4. Copy the URL from your browser's address bar
5. Use it in the `cinema_url` configuration

## Entity Names

The integration automatically creates unique entity names based on the cinema location:

- `sensor.helios_cinema_films_magnolia` (Wrocław Magnolia)
- `sensor.helios_cinema_films_city` (Warsaw City)
- `sensor.helios_cinema_films_plaza` (Krakow Plaza)
- `sensor.helios_cinema_films_madison` (Gdansk Madison)
- And so on...

## Example Lovelace Configuration

```yaml
type: custom:helios-cinema-card
entity: sensor.helios_cinema_films_magnolia  # Use your actual entity name
name: "Local Cinema"  # Optional - will use cinema_name if not specified
auto_rotate: true
rotate_interval: 5000
manual_timeout: 30000
```

## Testing Your Configuration

After configuring your cinema, you can test the scraping functionality:

```bash
python3 test_scraper.py "https://helios.pl/your-city/kino-helios-your-location"
```

This will show you if the integration can successfully connect to and parse your chosen cinema's website.
