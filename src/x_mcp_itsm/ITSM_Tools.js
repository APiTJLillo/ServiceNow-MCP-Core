var ITSM_Tools = Class.create();
ITSM_Tools.prototype = {
    initialize: function() {},

    /**
     * Retrieve an incident by number.
     * @param {Object} params - {number: ''}
     */
    getIncident: function(params) {
        var gr = new GlideRecord('incident');
        if (gr.get('number', params.number)) {
            return {
                number: gr.number.toString(),
                short_description: gr.short_description.toString(),
                state: gr.state.toString(),
                caller: gr.caller_id.toString()
            };
        }
        return {error: 'Incident not found: ' + params.number};
    },

    /**
     * Create a new incident.
     * @param {Object} params - {short_description:'', caller:''}
     */
    createIncident: function(params) {
        var gr = new GlideRecord('incident');
        gr.initialize();
        gr.short_description = params.short_description;
        if (params.caller)
            gr.caller_id = params.caller;
        var sysId = gr.insert();
        gr.get(sysId);
        return {
            number: gr.number.toString(),
            sys_id: sysId
        };
    },

    /**
     * Search any table with a query string.
     * @param {Object} params - {table:'', query:''}
     */
    searchRecords: function(params) {
        var results = [];
        var gr = new GlideRecord(params.table);
        gr.addEncodedQuery(params.query);
        gr.query();
        while (gr.next()) {
            results.push(gr.getDisplayValue());
        }
        return results;
    },

    type: 'ITSM_Tools'
};
