var MCP_ToolRegistry = Class.create();
MCP_ToolRegistry.prototype = {
    initialize: function() {
        this._table = 'x_mcp_core_tool';
    },

    /**
     * Register a tool in the database.
     * @param {Object} tool - {name: '', description: '', handler: 'Scope.Class.method'}
     */
    register: function(tool) {
        var gr = new GlideRecord(this._table);
        gr.initialize();
        gr.name = tool.name;
        gr.description = tool.description;
        gr.handler = tool.handler;
        gr.insert();
    },

    /**
     * Retrieve a tool by name.
     */
    get: function(name) {
        var gr = new GlideRecord(this._table);
        if (gr.get('name', name)) {
            return {
                name: gr.name.toString(),
                description: gr.description.toString(),
                handler: gr.handler.toString()
            };
        }
        return null;
    },

    /**
     * List all registered tools.
     */
    list: function() {
        var list = [];
        var gr = new GlideRecord(this._table);
        gr.query();
        while (gr.next()) {
            list.push({
                name: gr.name.toString(),
                description: gr.description.toString(),
                handler: gr.handler.toString()
            });
        }
        return list;
    },

    type: 'MCP_ToolRegistry'
};
