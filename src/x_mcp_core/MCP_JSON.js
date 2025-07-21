/* Accessible from all application scopes */
var MCP_JSON = Class.create();
MCP_JSON.prototype = {
    initialize: function() {},

    stringify: function(obj) {
        return JSON.stringify(obj);
    },

    parse: function(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    },

    type: 'MCP_JSON'
};
