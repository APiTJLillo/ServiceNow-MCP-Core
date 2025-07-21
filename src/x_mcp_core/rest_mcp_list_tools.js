(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var required = gs.getProperty('x_mcp_core.token');
    var header = request.headers['Authorization'];
    if (required && header !== 'Bearer ' + required) {
        response.setStatus(403);
        response.setBody(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    var registry = new MCP_ToolRegistry();
    var body = { tools: registry.list() };
    var jsonUtil = new MCP_JSON();
    response.setBody(jsonUtil.stringify(body));
    response.setStatus(200);
})(request, response);
