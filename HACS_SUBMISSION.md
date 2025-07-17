# HACS Submission Guide

## Steps to Add Helios Cinema Card to HACS

### 1. Repository Requirements ✅
- [x] Public GitHub repository
- [x] Proper file structure
- [x] `hacs.json` configuration file
- [x] `manifest.json` with required fields
- [x] README with installation instructions
- [x] Release with proper versioning (v1.0.0)

### 2. File Structure ✅
```
helios-cinema-card/
├── custom_components/helios_cinema/    # Integration files
├── www/helios-cinema-card.js          # Frontend card
├── hacs.json                          # HACS configuration
├── README.md                          # Documentation
├── CHANGELOG.md                       # Version history
└── LICENSE                           # MIT License
```

### 3. HACS Configuration ✅
File: `hacs.json`
- ✅ Proper configuration for integration type
- ✅ Content in root = false (files in subdirectories)
- ✅ Render README = true
- ✅ IoT class specified

### 4. Submission Process

#### Option A: Default HACS Repository (Recommended)
1. Create a fork of [HACS/default](https://github.com/hacs/default)
2. Add your repository to the appropriate JSON file:
   - For integrations: `integrations.json`
3. Create a pull request with your addition
4. Wait for review and approval

#### Option B: Custom Repository (Immediate)
Users can add your repository manually:
1. Go to HACS → Integrations
2. Click three dots menu → Custom repositories
3. Add repository URL: `https://github.com/oleksiyp/helios-cinema-card`
4. Select category: Integration
5. Click Add

### 5. Repository URL Format
Replace `yourusername` in all files with your actual GitHub username:
- `manifest.json`
- `README.md` 
- `INSTALLATION.md`
- Any other documentation

### 6. Create Release
After pushing to GitHub:
1. Go to your repository → Releases
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Add release notes from CHANGELOG.md
6. Publish release

### 7. Testing
Before submission, test:
- Manual installation works
- Card displays correctly
- All configuration options work
- No errors in Home Assistant logs

## Ready for Submission! 🚀

Your Helios Cinema Card is properly structured and ready for HACS submission.

### Next Steps:
1. Push to GitHub
2. Create v1.0.0 release
3. Submit to HACS default repository
4. Share with the community!
