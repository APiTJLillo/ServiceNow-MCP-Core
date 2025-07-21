# ServiceNow MCP Core

This repository contains a set of ServiceNow scoped applications that together implement a modular MCP server. The core application exposes `/mcp/list_tools` and `/mcp/call` endpoints and maintains a registry of available tools. Additional applications provide tool implementations for ITSM operations, development utilities and Azure DevOps integration.

## Repository layout

```
src/x_mcp_core    - core application (registry, dispatcher, REST API)
src/x_mcp_itsm    - ITSM tool module
src/x_mcp_devops  - development tool module
src/x_mcp_ado     - Azure DevOps bridge
Shared utilities   - MCP_JSON and MCP_Error classes
```

### File reference

| Path | ServiceNow record type |
| ---- | ---------------------- |
| `src/x_mcp_core/MCP_ToolRegistry.js` | Script Include |
| `src/x_mcp_core/MCP_Dispatcher.js` | Script Include |
| `src/x_mcp_core/MCP_JSON.js` | Script Include |
| `src/x_mcp_core/MCP_Error.js` | Script Include |
| `src/x_mcp_core/rest_mcp_list_tools.js` | Scripted REST resource |
| `src/x_mcp_core/rest_mcp_call.js` | Scripted REST resource |
| `src/x_mcp_itsm/ITSM_Tools.js` | Script Include |
| `src/x_mcp_itsm/register_tools.js` | Post-install fix script |
| `src/x_mcp_devops/DevOps_Tools.js` | Script Include |
| `src/x_mcp_devops/register_tools.js` | Post-install fix script |
| `src/x_mcp_ado/ADO_Tools.js` | Script Include |
| `src/x_mcp_ado/register_tools.js` | Post-install fix script |
```

Each folder mirrors a scoped application exported from ServiceNow source control.

## Getting started

1. Import the scoped applications into your ServiceNow instance.
2. Ensure the table **x_mcp_core_tool** exists. Tools register themselves in this table via the `MCP_ToolRegistry` class.
3. The Scripted REST API in `x_mcp_core` exposes two resources:
 - **`/mcp/list_tools`** – returns all registered tools.
 - **`/mcp/call`** – invokes a tool and returns its result.
4. Install the satellite applications to register their tools automatically. Each module contains a `register_tools.js` script that inserts records into the core registry table.
5. Set a system property `x_mcp_core.token` if you want to require an `Authorization: Bearer` header for all requests.

See `TODO.MD` for the remaining work items.
