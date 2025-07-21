/* Accessible from all application scopes */
var DevOps_Tools = Class.create();
DevOps_Tools.prototype = {
    initialize: function() {},

    /**
     * List business rules for a given table.
     * @param {Object} params - {table: '', active: 'true|false'}
     */
    listBusinessRules: function(params) {
        var list = [];
        var gr = new GlideRecord('sys_script');
        if (params.table)
            gr.addQuery('collection', params.table);
        if (params.active !== undefined)
            gr.addQuery('active', params.active);
        gr.query();
        while (gr.next()) {
            list.push({
                name: gr.name.toString(),
                table: gr.collection.toString(),
                active: gr.active.toString()
            });
        }
        return list;
    },

    /**
     * Return the source of a Script Include.
     * @param {String} name
     */
    getScriptInclude: function(name) {
        var gr = new GlideRecord('sys_script_include');
        if (gr.get('name', name)) {
            return gr.script.toString();
        }
        return '';
    },

    /**
     * Update a Script Include with new code.
     * @param {String} name
     * @param {String} code
     */
    updateScriptInclude: function(name, code) {
        var instance = gs.getProperty('instance_name');
        if (instance && instance.indexOf('dev') === -1)
            return {error: 'Updates are restricted to dev instances'};

        var gr = new GlideRecord('sys_script_include');
        if (!gr.get('name', name))
            return {error: 'Script Include not found: ' + name};
        gr.script = code;
        gr.update();
        return {name: name, updated: true};
    },

    type: 'DevOps_Tools'
};
