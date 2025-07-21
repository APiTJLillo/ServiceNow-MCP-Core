# DevOps MCP Module (x_mcp_devops)

Contains tools for inspecting and editing development artifacts such as business rules and Script Includes. Intended for use in development instances only.

## Scripts
- `DevOps_Tools.js` – **Script Include** providing `listBusinessRules`, `getScriptInclude` and `updateScriptInclude` functions.
- `register_tools.js` – **post-install fix script** that registers the DevOps tools with the MCP Core when installed. Each registration declares an `inputs` array.

`updateScriptInclude` checks the `instance_name` property to prevent updates on non‑dev instances. All Script Includes are available to other scopes so the core can dispatch to them.
