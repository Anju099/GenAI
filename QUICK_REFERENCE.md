# Quick Reference - MCP Excel Fix

## 🚨 The Problem
```
npm error 404: @modelcontextprotocol/server-excel
MCP error -32000: Connection closed
```

## ✅ The Solution
Use `@negokaz/excel-mcp-server` instead!

## 📋 Quick Start

### Windows Users:
1. Copy contents from `mcp.windows.json`
2. Paste into: `%APPDATA%\Claude\claude_desktop_config.json`
3. Restart Claude Desktop

### macOS/Linux Users:
1. Copy contents from `mcp.json`
2. Paste into: `~/Library/Application Support/Claude/claude_desktop_config.json`
3. Restart Claude Desktop

## 📚 Full Documentation
- **Detailed Setup**: See `MCP_SETUP_GUIDE.md`
- **Before/After**: See `BEFORE_AFTER_COMPARISON.md`
- **General Info**: See `README.md` (MCP section)

## 🔍 Verify Installation
```bash
npx --yes @negokaz/excel-mcp-server
```
(Press Ctrl+C to stop after it starts)

## ✨ What You Get
- Read/write Excel cells
- Formula support
- Sheet management
- Large file handling
- Multiple Excel formats
- Screenshots (Windows only)
- Live editing (Windows only)

## 🆘 Still Having Issues?
Check `MCP_SETUP_GUIDE.md` → Troubleshooting section
