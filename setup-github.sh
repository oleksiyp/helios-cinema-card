#!/bin/bash

# Helios Cinema Card - GitHub Setup Script
# This script helps initialize the repository for GitHub

echo "🎬 Helios Cinema Card - GitHub Setup"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial release: Helios Cinema Card v1.0.0

- Home Assistant integration for Helios Cinema Wrocław
- Interactive rotating card component
- Auto-rotation with manual override
- Real-time movie data scraping
- HACS compatibility
- Complete documentation and setup guides"

echo ""
echo "🚀 Next steps to publish on GitHub:"
echo "1. Create a new repository on GitHub named 'helios-cinema-card'"
echo "2. Add the remote origin:"
echo "   git remote add origin https://github.com/oleksiyp/helios-cinema-card.git"
echo "3. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "4. Create a release with tag 'v1.0.0' for HACS compatibility"
echo ""
echo "📋 For HACS submission:"
echo "1. Fork the HACS/default repository"
echo "2. Add your repository to the appropriate category"
echo "3. Create a pull request"
echo ""
echo "✨ Your project is ready for GitHub!"
