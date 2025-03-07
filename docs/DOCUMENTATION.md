# Death Note Mini-App Documentation

Welcome to the Death Note Mini-App documentation. This index provides links to all available documentation resources for the project.

## Game Design Documents

- [Game Rules and Mechanics](../GAME_RULES.md) - Comprehensive explanation of game rules, mechanics, and player actions
- [Cases Documentation](cases/README.md) - Detailed information about case structure and design

### Case Files

- [Case #1: The Serial Killer](cases/case_1_serial_killer.md) - Introductory case featuring a vigilante targeting criminals
- [Case #2: The Corporate Conspiracy](cases/case_2_corporate_conspiracy.md) - Advanced case involving corporate espionage and financial motives

## Technical Documentation

- [Deployment Guide](../DEPLOYMENT.md) - Instructions for deploying the mini-app
- [GitHub Pages Deployment](../GITHUB_PAGES_DEPLOY.md) - Specific instructions for GitHub Pages deployment

## Integration Documentation

- [n8n Integration Guide](../../n8n-integration-guide.md) - Guide for integrating the mini-app with n8n workflows
- [Ryuk Bot Integration](../../ryuk_system_prompt.md) - System prompt for the Ryuk bot including mini-app instructions

## Internationalization

The mini-app supports multiple languages:
- English (default)
- Russian
- German

Language files and translations can be found in `src/utils/i18n.js`.

## Project Structure

- `/public` - Static assets and HTML entry point
- `/src` - Source code
  - `/assets` - Images and media files
  - `/styles` - CSS stylesheets
  - `/utils` - Utility functions and game logic
- `/docs` - Documentation and GitHub Pages deployment files

## Contributing

When contributing new features or cases to the Death Note Mini-App, please follow these guidelines:

1. Maintain consistent documentation with the existing format
2. Create detailed case files for any new cases
3. Update translation files for all supported languages
4. Test thoroughly across different browsers and devices
5. Follow the narrative style established in existing content

## Future Development

Plans for future development include:
- Additional cases with increasing complexity
- More language options
- Enhanced character interactions
- Achievement system
- Deeper integration with the Telegram bot 