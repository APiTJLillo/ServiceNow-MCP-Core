(function() {
    var registry = new x_mcp_core.MCP_ToolRegistry();
    registry.register({
        name: 'itsm.get_incident',
        description: 'Retrieve an incident by number',
        handler: 'x_mcp_itsm.ITSM_Tools.getIncident',
        inputs: ['number']
    });
    registry.register({
        name: 'itsm.create_incident',
        description: 'Create a new incident',
        handler: 'x_mcp_itsm.ITSM_Tools.createIncident',
        inputs: ['short_description', 'caller']
    });
    registry.register({
        name: 'itsm.search_records',
        description: 'Search a table using an encoded query',
        handler: 'x_mcp_itsm.ITSM_Tools.searchRecords',
        inputs: ['table', 'query']
    });
})();
