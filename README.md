# Playwright TypeScript Framework (minimal)

This scaffold provides a minimal Playwright + TypeScript test framework.

## MCP (Model Context Protocol) Integration

This project includes MCP integration for browser automation with AI agents. The `mcp.json` configuration file enables AI tools (like Claude Desktop, VS Code Copilot, Cursor IDE) to control browser automation using Playwright.

### Using MCP

The MCP server can be used with compatible AI tools by referencing the `mcp.json` configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

This allows AI agents to:
- Navigate web pages
- Fill forms and interact with elements
- Take screenshots
- Execute JavaScript
- Perform automated testing tasks

For more information on MCP, see the [Model Context Protocol documentation](https://modelcontextprotocol.io).

## Setup

Setup (PowerShell):

```powershell
cd "C:\Users\hp\OneDrive\GenAI"
npm install
npx playwright install
npm test
```

Files created:
- `package.json` (scripts + devDependencies)
- `playwright.config.ts`
- `tsconfig.json`
- `tests/` (example test and page objects)
- `mcp.json` (MCP server configuration)

Notes:
- Replace the example test URL with your application under test.
- Use `npm run test:headed` to run tests with a visible browser.
