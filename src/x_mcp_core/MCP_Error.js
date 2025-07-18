var MCP_Error = Class.create();
MCP_Error.prototype = {
    initialize: function(message) {
        this.message = message;
    },

    toJSON: function() {
        return { error: this.message };
    },

    toString: function() {
        return this.message;
    },

    type: 'MCP_Error'
};
