async function n(e){return await(await fetch(e.action,{method:e.method,body:new FormData(e),headers:{accept:"application/json"}})).json()}export{n as s};
