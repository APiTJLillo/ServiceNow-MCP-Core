const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// simple in-memory table store
const db = {};
function GlideRecord(table) {
  db[table] = db[table] || [];
  const rec = {};
  let iter = [];
  return new Proxy({}, {
    get(target, prop) {
      if (prop === 'initialize') return () => { for (const k in rec) delete rec[k]; };
      if (prop === 'insert') return () => { db[table].push({...rec}); return db[table].length; };
      if (prop === 'get') return (field, value) => { const r = db[table].find(x => x[field] === value); if (r) { Object.assign(rec, r); return true; } return false; };
      if (prop === 'query') return () => { iter = db[table].slice(); };
      if (prop === 'next') return () => { if (iter.length) { Object.assign(rec, iter.shift()); return true; } return false; };
      if (prop === '_rec') return rec;
      return rec[prop];
    },
    set(target, prop, value) { rec[prop] = value; return true; }
  });
}

const Class = { create: () => function(){ if (this.initialize) this.initialize.apply(this, arguments); } };

const sandbox = { GlideRecord, Class, MCP_JSON: undefined, MCP_Error: undefined, MCP_ToolRegistry: undefined, MCP_Dispatcher: undefined, global:{} };
sandbox.global = sandbox;

function loadScript(path) {
  const code = fs.readFileSync(path, 'utf8');
  vm.runInNewContext(code, sandbox, {filename: path});
}

// load core scripts
loadScript('src/x_mcp_core/MCP_JSON.js');
loadScript('src/x_mcp_core/MCP_Error.js');
loadScript('src/x_mcp_core/MCP_ToolRegistry.js');
loadScript('src/x_mcp_core/MCP_Dispatcher.js');

// stub test handler
sandbox['test.Handler'] = function(){};
sandbox['test.Handler'].prototype = {
  echo: function(params){ return params; }
};

function testRegistryAndDispatcher() {
  const registry = new sandbox.MCP_ToolRegistry();
  registry.register({name:'test.echo', description:'', handler:'test.Handler.echo', inputs:['msg'], outputs:[]});
  const list = registry.list();
  assert.strictEqual(list.length, 1, 'registry should contain one tool');
  const dispatcher = new sandbox.MCP_Dispatcher();
  const ok = dispatcher.dispatch('test.echo', {msg:'hi'});
  assert.deepStrictEqual(ok, {msg:'hi'});
  const err = dispatcher.dispatch('test.echo', {});
  assert.equal(JSON.stringify(err), JSON.stringify({error:'Missing parameter: msg'}));
}

try {
  testRegistryAndDispatcher();
  console.log('All tests passed');
} catch (e) {
  console.error('Test failure:', e.message);
  process.exit(1);
}
