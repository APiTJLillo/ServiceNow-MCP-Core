# ITSM MCP Module (x_mcp_itsm)

Provides tools for interacting with the ITSM tables such as incidents. The module registers its tools with the core during installation.

## Scripts
- `ITSM_Tools.js` – **Script Include** implementing `getIncident`, `createIncident` and `searchRecords` using GlideRecord APIs.
- `register_tools.js` – **post-install fix script** that registers this module's tools with the core registry.

The `ITSM_Tools` Script Include should allow cross‑scope calls so the MCP core can invoke it.
