(function() {
    var registry = new x_mcp_core.MCP_ToolRegistry();
    registry.register({
        name: 'devops.list_business_rules',
        description: 'List business rules for a table',
        handler: 'x_mcp_devops.DevOps_Tools.listBusinessRules',
        inputs: ['table', 'active']
    });
    registry.register({
        name: 'devops.get_script_include',
        description: 'Retrieve the source of a Script Include',
        handler: 'x_mcp_devops.DevOps_Tools.getScriptInclude',
        inputs: ['name']
    });
    registry.register({
        name: 'devops.update_script_include',
        description: 'Update a Script Include with new code',
        handler: 'x_mcp_devops.DevOps_Tools.updateScriptInclude',
        inputs: ['name', 'code']
    });
})();
