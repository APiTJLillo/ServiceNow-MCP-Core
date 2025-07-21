# MCP Bridge (x_mcp_core)

This folder contains the core scoped application that exposes MCP endpoints and maintains the tool registry used by all modules.

## Components

- `MCP_ToolRegistry.js` – **Script Include** that registers tools in the `x_mcp_core_tool` table and performs lookups.
- `MCP_Dispatcher.js` – **Script Include** that loads the requested tool handler and executes it.
- `MCP_JSON.js` – **Script Include** helper for JSON serialization.
- `MCP_Error.js` – **Script Include** providing a simple error object.
- `rest_mcp_list_tools.js` – script body for a **Scripted REST resource** `/mcp/list_tools`.
- `rest_mcp_call.js` – script body for a **Scripted REST resource** `/mcp/call`.
- `rest_mcp_stream.js` – script body for a **Scripted REST resource** `/mcp/stream` sending SSE.

## Usage

Install this application in your instance and register tools via the satellite modules. The REST API returns data in MCP format and allows external AI agents to invoke tools by name.
Set the property `x_mcp_core.token` to require an `Authorization` header and ensure callers have the `mcp_core_api` role.
