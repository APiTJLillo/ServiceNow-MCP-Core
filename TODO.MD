# MCP Server Initiative – Task List

## 1 · Core “MCP Bridge” scoped app (`x_mcp_core`)
- [x] **Scaffold app**
  - [x] Create new scoped application `MCP Bridge` (namespace `x_mcp_core`)
  - [x] Set application access to allow cross‑scope calls (as needed)
- [x] **Scripted REST API**
  - [x] Resource **`/mcp/list_tools`** – returns static/DB‑driven tool manifest
  - [x] Resource **`/mcp/call`** – dispatches tool invocations
  - [x] Optional: add SSE endpoint for streaming (`/mcp/stream`)
- [x] **Tool registry**
  - [x] Table `x_mcp_core_tool` (name, description, script include, input / output schema JSON)
  - [x] Utility Script Include `MCP_ToolRegistry` for look‑ups & validation
- [x] **Dispatcher**
  - [x] Script Include `MCP_Dispatcher`:
        * accepts tool name + params
        * routes to target Script Include (via `new <scope>.<ClassName>()`)
        * handles error / success wrapping
- [x] **Auth & ACLs**
  - [x] Basic Auth role (`mcp_core_api`) for dev use
  - [x] Token header option (`Authorization: Bearer <token>`)
 - [x] **Unit tests (ATF / Jest)**
  - [x] Happy‑path and error cases for dispatcher & registry
- [x] **Docs**
  - [x] `README` with usage examples and MCP payload samples

## 2 · ITSM MCP server app (`x_mcp_itsm`)
- [x] **Scaffold scoped app** (`ITSM MCP`)
- [x] **Tool implementations**
  - [x] `get_incident` / `create_incident`
  - [x] `search_records(table, query)`
- [x] **Registration script**
  - [x] On install/upgrade, insert records into `x_mcp_core_tool`
- [x] **Cross‑scope access**
  - [x] Enable “Can read/can run” for `MCP_Dispatcher`
        (use explicit namespace when calling from core)

## 3 · Dev Tools MCP server app (`x_mcp_devops`)
- [x] **Tools**
  - [x] `list_business_rules`
  - [x] `get_script_include(name)`
  - [x] `update_script_include(name, code)`
- [x] **Guardrails**
  - [x] Limit write tools to dev instances only (instance‑name check)

## 4 · Azure DevOps bridge app (`x_mcp_ado`)
- [x] **Credential store**
  - [x] Table `x_mcp_ado_cred` (PAT / OAuth tokens)
- [x] **Outbound integration**
  - [x] RESTMessageV2 for ADO base URL
- [x] **Tools**
  - [x] `ado_get_work_item(id)`
  - [x] `ado_create_work_item(project, type, title, description)`
- [x] **Register tools with core**

## 5 · Shared library & utilities
- [x] Common Script Include `MCP_JSON` (serialization helpers)
- [x] Exception class `MCP_Error`

## 6 · Dev & CI/CD setup
- [x] **Repo structure**
```
/src/x_mcp_core
/src/x_mcp_itsm
/src/x_mcp_devops
/src/x_mcp_ado
```

- [ ] **Update Sets / App Repo**
- [x] Export each scoped app to its own folder for easy commits
- [ ] **Automated tests** run in GitHub Actions using ServiceNow CICD APIs

## 7 · Optional enhancements
- [ ] UI Page for live tool testing
- [ ] Flow Designer subflows that proxy to `/mcp/call`
- [ ] Docker compose for local FastMCP proxy if you decide to off‑platform later

---

### How to work the list
1. Stand up **`x_mcp_core`** first – until `/mcp/list_tools` returns data, all other apps will 404.  
2. Each satellite app should add its tools during `post install` or `app upgrade`.  
3. Keep each tool self‑contained: one Script Include ‑> one ServiceNow capability.

Happy building!  
Ping me anytime you want deeper code stubs or testing strategies.
