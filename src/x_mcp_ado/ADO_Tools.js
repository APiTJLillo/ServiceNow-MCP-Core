/* Accessible from all application scopes */
var ADO_Tools = Class.create();
ADO_Tools.prototype = {
    initialize: function() {
        this.baseUrl = gs.getProperty('x_mcp_ado.base_url');
        this.token = this._loadToken();
    },

    _loadToken: function() {
        var gr = new GlideRecord('x_mcp_ado_cred');
        if (gr.get('active', true))
            return gr.token.toString();
        return gs.getProperty('x_mcp_ado.pat');
    },

    /**
     * Retrieve an Azure DevOps work item.
     * @param {Number} id
     */
    getWorkItem: function(id) {
        var rm = new sn_ws.RESTMessageV2();
        rm.setHttpMethod('get');
        rm.setEndpoint(this.baseUrl + '/_apis/wit/workitems/' + id + '?api-version=7.0');
        rm.setRequestHeader('Authorization', 'Basic ' + GlideStringUtil.base64Encode(':' + this.token));
        var res = rm.execute();
        return JSON.parse(res.getBody());
    },

    /**
     * Create a new work item.
     * @param {String} project
     * @param {String} type
     * @param {String} title
     * @param {String} description
     */
    createWorkItem: function(project, type, title, description) {
        var rm = new sn_ws.RESTMessageV2();
        rm.setHttpMethod('post');
        var url = this.baseUrl + '/' + project + '/_apis/wit/workitems/$' + type + '?api-version=7.0';
        rm.setEndpoint(url);
        rm.setRequestHeader('Content-Type', 'application/json-patch+json');
        rm.setRequestHeader('Authorization', 'Basic ' + GlideStringUtil.base64Encode(':' + this.token));
        var body = [
            {op: 'add', path: '/fields/System.Title', value: title},
            {op: 'add', path: '/fields/System.Description', value: description}
        ];
        rm.setRequestBody(JSON.stringify(body));
        var res = rm.execute();
        return JSON.parse(res.getBody());
    },

    type: 'ADO_Tools'
};
