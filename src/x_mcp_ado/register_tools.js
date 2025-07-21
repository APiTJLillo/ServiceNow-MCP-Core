(function() {
    var registry = new x_mcp_core.MCP_ToolRegistry();
    registry.register({
        name: 'ado.get_work_item',
        description: 'Retrieve an Azure DevOps work item',
        handler: 'x_mcp_ado.ADO_Tools.getWorkItem',
        inputs: ['id']
    });
    registry.register({
        name: 'ado.create_work_item',
        description: 'Create an Azure DevOps work item',
        handler: 'x_mcp_ado.ADO_Tools.createWorkItem',
        inputs: ['project', 'type', 'title', 'description']
    });
})();
