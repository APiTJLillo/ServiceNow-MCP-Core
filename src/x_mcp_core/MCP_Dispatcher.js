var MCP_Dispatcher = Class.create();
MCP_Dispatcher.prototype = {
    initialize: function() {
        this.registry = new MCP_ToolRegistry();
    },

    /**
     * Dispatch a tool invocation.
     * @param {String} name - tool name
     * @param {Object} params - parameters for tool
     */
    dispatch: function(name, params) {
        var tool = this.registry.get(name);
        if (!tool) {
            return new MCP_Error('Unknown tool: ' + name).toJSON();
        }

        // handler format: <scope>.<ClassName>.<method>
        var parts = tool.handler.split('.');
        if (parts.length !== 3) {
            return new MCP_Error('Invalid handler for ' + name).toJSON();
        }
        var scope = parts[0];
        var className = parts[1];
        var method = parts[2];

        var classPath = scope + '.' + className;
        var handler = new global[classPath]();
        if (typeof handler[method] !== 'function') {
            return new MCP_Error('Method not found for ' + name).toJSON();
        }
        try {
            return handler[method](params);
        } catch (e) {
            return new MCP_Error(e.toString()).toJSON();
        }
    },

    type: 'MCP_Dispatcher'
};
