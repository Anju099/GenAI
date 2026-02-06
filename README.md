# Playwright TypeScript Framework (minimal)

This scaffold provides a minimal Playwright + TypeScript test framework.

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

Notes:
- Replace the example test URL with your application under test.
- Use `npm run test:headed` to run tests with a visible browser.

## MCP Excel Server Configuration

This repository includes configuration for the Model Context Protocol (MCP) Excel server, which enables AI-powered Excel file manipulation.

### Setup Instructions

#### 1. Choose the correct configuration file:

**For Windows:**
- Use `mcp.windows.json` (configured with `cmd /c` wrapper for Windows)
- Copy or rename to the location required by your MCP client (e.g., Claude Desktop)

**For macOS/Linux:**
- Use `mcp.json` (configured with direct `npx` command)
- Copy or rename to the location required by your MCP client

#### 2. Installation

The MCP server uses `@negokaz/excel-mcp-server` package which will be automatically installed via `npx --yes` when the server starts.

**Manual installation (optional):**
```bash
npm install -g @negokaz/excel-mcp-server
```

#### 3. Configuration Details

**Windows Configuration (`mcp.windows.json`):**
```json
{
  "mcpServers": {
    "excel": {
      "command": "cmd",
      "args": ["/c", "npx", "--yes", "@negokaz/excel-mcp-server"],
      "env": { "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000" }
    }
  }
}
```

**Unix/macOS Configuration (`mcp.json`):**
```json
{
  "mcpServers": {
    "excel": {
      "command": "npx",
      "args": ["--yes", "@negokaz/excel-mcp-server"],
      "env": { "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000" }
    }
  }
}
```

#### 4. Key Features

The Excel MCP Server provides:
- **Read/write Excel cells**: Access and modify cell values programmatically
- **Formula support**: Work with Excel formulas
- **Sheet management**: Create, copy, and manage worksheets
- **Pagination**: Handle large Excel files efficiently
- **Multiple formats**: Supports `.xlsx`, `.xlsm`, `.xltx`, `.xltm`
- **Screenshot capture**: (Windows only) Capture sheet screenshots
- **Live editing**: (Windows only) Work with open Excel workbooks

#### 5. Troubleshooting

**Error: "npm error 404 @modelcontextprotocol/server-excel"**
- ❌ The package `@modelcontextprotocol/server-excel` does NOT exist
- ✅ Use `@negokaz/excel-mcp-server` instead (as configured in this repo)

**Error: "Connection closed" or "MCP error -32000"**
- Ensure Node.js is installed (version 20.x or later recommended)
- Verify npx is in your system PATH
- On Windows, make sure you're using the `mcp.windows.json` configuration
- Check that the MCP client (e.g., Claude Desktop) has proper permissions

**For Claude Desktop:**
1. Copy the appropriate config file to Claude's config directory:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Restart Claude Desktop
3. Check the MCP log viewer for connection status

#### 6. Environment Variables

- `EXCEL_MCP_PAGING_CELLS_LIMIT`: Controls the maximum number of cells to read/write in a single page (default: 4000)

### References

- NPM Package: [@negokaz/excel-mcp-server](https://www.npmjs.com/package/@negokaz/excel-mcp-server)
- GitHub Repository: [negokaz/excel-mcp-server](https://github.com/negokaz/excel-mcp-server)
