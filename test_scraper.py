#!/usr/bin/env python3
"""Test script for Helios Cinema scraper."""

import asyncio
import aiohttp
from bs4 import BeautifulSoup
import sys


async def test_scraper(url=None):
    """Test the web scraping functionality."""
    if url is None:
        url = "https://helios.pl/wroclaw/kino-helios-magnolia"
    
    print(f"Testing scraper for: {url}")
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status != 200:
                    print(f"HTTP {response.status} error")
                    return
                
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                print(f"Page title: {soup.title.string if soup.title else 'No title'}")
                print(f"HTML length: {len(html)} characters")
                
                # Look for movie-related elements
                potential_containers = [
                    soup.find_all('div', class_=['movie-card', 'film-item', 'movie-item']),
                    soup.find_all('div', class_=lambda x: x and any(
                        term in x.lower() for term in ['movie', 'film', 'cinema', 'show']
                    )),
                    soup.find_all(['h1', 'h2', 'h3'], string=True)
                ]
                
                for i, containers in enumerate(potential_containers):
                    print(f"\nSearch method {i+1}: Found {len(containers)} elements")
                    for j, container in enumerate(containers[:3]):  # Show first 3
                        text = container.get_text(strip=True)[:100]
                        print(f"  {j+1}: {text}...")
                
                # Look for images
                images = soup.find_all('img')
                movie_images = [img for img in images if img.get('src') and any(
                    term in img.get('src', '').lower() for term in ['film', 'movie', 'poster']
                )]
                print(f"\nFound {len(movie_images)} potential movie images")
                
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    # Allow custom URL from command line
    url = sys.argv[1] if len(sys.argv) > 1 else None
    if url:
        print(f"Using custom URL: {url}")
    else:
        print("Using default URL. You can provide a custom URL as a command line argument.")
        print("Example: python test_scraper.py https://helios.pl/warszawa/kino-helios-city")
    
    asyncio.run(test_scraper(url))
