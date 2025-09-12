# Conduit API Tests

This project contains automated API tests for the Conduit application using Playwright. It is designed to validate the functionality of the Conduit backend API.

## Project Structure
```
application/        # Core logic for API requests and controllers
  controllers/      # API endpoint controllers
  data/             # Builders and factories for test data
env/                # Environment configuration
fixtures/           # Test fixtures
models/             # Data models for API entities
schemas/            # JSON schema definitions for validation
tests/              # Test specifications
utils/              # Utility functions
playwright.config.ts# Playwright configuration
```

## Getting Started
### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/NighthawkHK/conduit-api-tests.git
   cd conduit-api-tests
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```

### Running Tests
This project requires some system variables in order to run tests. Please see env/index.ts for additional details.

To execute all tests:
```powershell
npm run regress
```

To run tests by module please take a look at existing scripts in package.json.

### Viewing Reports
After running tests, view the HTML report:
```powershell
npx playwright show-report
```
Or open `playwright-report/index.html` in your browser.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
