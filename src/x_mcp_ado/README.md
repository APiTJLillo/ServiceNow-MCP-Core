# Azure DevOps MCP Module (x_mcp_ado)

Provides tools that interact with Azure DevOps work items using outbound REST calls.

## Scripts
- `ADO_Tools.js` – **Script Include** implementing `getWorkItem` and `createWorkItem` using `sn_ws.RESTMessageV2`.
- `register_tools.js` – **post-install fix script** that registers Azure DevOps tools with the core application on install.

The module reads credentials from the `x_mcp_ado_cred` table or falls back to the `x_mcp_ado.pat` property.
