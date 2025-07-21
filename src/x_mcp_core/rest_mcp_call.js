(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var required = gs.getProperty('x_mcp_core.token');
    var header = request.headers['Authorization'];
    if (required && header !== 'Bearer ' + required) {
        response.setStatus(403);
        response.setBody(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    if (!gs.hasRole('mcp_core_api')) {
        response.setStatus(403);
        response.setBody(JSON.stringify({ error: 'Insufficient role' }));
        return;
    }

    var jsonUtil = new MCP_JSON();
    var body = request.body.data;
    var name = body.name;
    var params = body.params || {};
    var dispatcher = new MCP_Dispatcher();
    var result = dispatcher.dispatch(name, params);
    response.setBody(jsonUtil.stringify(result));
    response.setStatus(200);
})(request, response);
