# MCP Excel Server Setup Guide

## Quick Fix for "npm 404 error" Issue

### Problem
You were getting this error:
```
npm error 404 @modelcontextprotocol/server-excel
npm error 404 Note that you can also install from a tarball, folder, http url, or git url.
MCP error -32000: Connection closed
```

### Root Cause
The package `@modelcontextprotocol/server-excel` **does not exist** on npm registry.

### Solution
Use the correct package: `@negokaz/excel-mcp-server`

---

## Step-by-Step Setup

### For Windows Users

#### 1. Update Your MCP Configuration

**Location:** Usually at `%APPDATA%\Claude\claude_desktop_config.json` for Claude Desktop

**Replace your current configuration** with:

```json
{
  "mcpServers": {
    "excel": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "--yes",
        "@negokaz/excel-mcp-server"
      ],
      "env": {
        "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000"
      }
    }
  }
}
```

**Important Notes:**
- ❌ Remove: `"C:\\Program Files\\nodejs\\npx.cmd"` 
- ✅ Use: `"cmd"` as the command
- ✅ Add: `"/c"` as the first argument
- ✅ Use: `"@negokaz/excel-mcp-server"` not `"@modelcontextprotocol/server-excel"`

#### 2. Verify Node.js Installation

```powershell
node --version
npx --version
```

Required: Node.js version 20.x or later

#### 3. Test Package Installation

```powershell
npx --yes @negokaz/excel-mcp-server --help
```

This should download and run the package successfully.

#### 4. Restart Claude Desktop

After updating the configuration:
1. Close Claude Desktop completely
2. Restart it
3. Check the MCP log viewer to verify connection

---

### For macOS/Linux Users

#### 1. Update Your MCP Configuration

**Location:** 
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/claude/claude_desktop_config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "excel": {
      "command": "npx",
      "args": [
        "--yes",
        "@negokaz/excel-mcp-server"
      ],
      "env": {
        "EXCEL_MCP_PAGING_CELLS_LIMIT": "4000"
      }
    }
  }
}
```

#### 2. Verify Node.js Installation

```bash
node --version
npx --version
```

#### 3. Test Package Installation

```bash
npx --yes @negokaz/excel-mcp-server --help
```

---

## Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EXCEL_MCP_PAGING_CELLS_LIMIT` | Maximum cells per page | 4000 |

### Example with Custom Settings

```json
{
  "mcpServers": {
    "excel": {
      "command": "cmd",
      "args": ["/c", "npx", "--yes", "@negokaz/excel-mcp-server"],
      "env": {
        "EXCEL_MCP_PAGING_CELLS_LIMIT": "8000"
      }
    }
  }
}
```

---

## Available Tools

Once connected, the Excel MCP server provides these tools:

1. **excel_describe_sheets** - List all sheets in a workbook
2. **excel_read_sheet** - Read data from a sheet (with pagination)
3. **excel_write_to_sheet** - Write data or formulas to cells
4. **excel_copy_sheet** - Copy/duplicate a worksheet
5. **excel_format_range** - Apply formatting to cells
6. **excel_create_table** - Create Excel tables
7. **excel_screen_capture** - Take screenshots (Windows only)

---

## Troubleshooting

### Issue: "Connection closed" error

**Check:**
1. Is Node.js installed? Run `node --version`
2. Is npx available? Run `npx --version`
3. Can you manually run the package? `npx --yes @negokaz/excel-mcp-server --help`
4. Are you using the correct config file for your OS?

**On Windows:**
- Must use `cmd` with `/c` argument
- Do NOT use full path to npx.cmd

### Issue: "npm error 404"

**Solution:**
- You're still using the old package name
- Update to `@negokaz/excel-mcp-server`
- Never use `@modelcontextprotocol/server-excel` (it doesn't exist!)

### Issue: Package not installing

**Try:**
```bash
# Clear npm cache
npm cache clean --force

# Test manual installation
npx --yes @negokaz/excel-mcp-server --help
```

### Issue: Permission errors (Windows)

**Solution:**
- Run PowerShell as Administrator
- Or ensure your user has access to AppData folders

---

## Verification Steps

After setup, verify your configuration:

1. **Check Config File Location**
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Verify JSON Syntax**
   - Use a JSON validator
   - Ensure no trailing commas
   - Ensure proper escaping of paths

3. **Test Server Manually**
   ```bash
   npx --yes @negokaz/excel-mcp-server
   ```
   - Should start without errors
   - Press Ctrl+C to stop

4. **Check Claude Desktop Logs**
   - Open MCP log viewer in Claude Desktop
   - Should show "Connected" status
   - Should list available Excel tools

---

## Example Usage

After successful setup, you can ask Claude:

- "Read data from Sheet1 in my Excel file"
- "Create a new sheet called 'Summary'"
- "Write this data to cells A1:C10"
- "What formulas are in column D?"

---

## Additional Resources

- **NPM Package:** https://www.npmjs.com/package/@negokaz/excel-mcp-server
- **GitHub Repo:** https://github.com/negokaz/excel-mcp-server
- **Current Version:** 0.12.0
- **License:** MIT

---

## Summary of Changes

### Before (Incorrect):
```json
{
  "command": "C:\\Program Files\\nodejs\\npx.cmd",
  "args": ["-y", "@modelcontextprotocol/server-excel"]
}
```

### After (Correct):
```json
{
  "command": "cmd",
  "args": ["/c", "npx", "--yes", "@negokaz/excel-mcp-server"]
}
```

**Key Changes:**
1. ✅ Changed command from full npx path to `cmd`
2. ✅ Added `/c` argument for cmd
3. ✅ Changed package to `@negokaz/excel-mcp-server`
4. ✅ Changed `-y` to `--yes` (more explicit)
5. ✅ Added environment variable configuration
