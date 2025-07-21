# ITSM MCP Module (x_mcp_itsm)

Provides tools for interacting with the ITSM tables such as incidents. The module registers its tools with the core during installation.

## Scripts
- `ITSM_Tools.js` – **Script Include** implementing `getIncident`, `createIncident` and `searchRecords` using GlideRecord APIs.
- `register_tools.js` – **post-install fix script** that registers this module's tools with the core registry. Each registration specifies an `inputs` array describing required parameters.

All Script Includes in this module are configured for cross‑scope access so the MCP core can invoke them.
