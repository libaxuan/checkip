export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 处理根路径返回HTML
        if (url.pathname === '/') {
            return new Response(htmlContent, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // 处理IP查询API
        if (url.pathname === '/api/ip') {
            const ip = url.searchParams.get('ip');
            if (!ip) return new Response('IP地址不能为空', { status: 400 });

            try {
                const response = await fetch(`https://api.vore.top/api/IPdata?ip=${ip}`);
                const data = await response.json();

                return Response.json({
                    ip: ip,
                    province: data.ipdata?.info1 || '未知',
                    city: data.ipdata?.info2 || '未知',
                    district: data.ipdata?.info3 || '未知',
                    isp: data.ipdata?.isp || '未知',
                    fullInfo: data.adcode?.o || '未知'
                });

            } catch (err) {
                return new Response('查询失败: ' + err.message, { status: 500 });
            }
        }

        return new Response('Not Found', { status: 404 });
    },
};

// 压缩后的HTML内容（已修改API请求地址）
const htmlContent = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>批量IP信息查询</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"><style>.container{max-width:1200px;margin:20px auto}.input-area{margin-bottom:20px}#ipList{height:150px}.table-hover{margin-top:20px}.sortable{cursor:pointer}.sortable:hover{background-color:#f8f9fa}.loading{display:none;margin:20px 0}</style></head><body><div class="container"><h2 class="mb-4">批量IP信息查询</h2><div class="input-area"><div class="row"><div class="col-md-9"><textarea class="form-control" id="ipList" placeholder="请输入要查询的IP地址，每行一个（最多100个）"></textarea></div><div class="col-md-3"><button class="btn btn-primary w-100 mb-2" onclick="startQuery()">执行查询</button><button class="btn btn-success w-100" onclick="exportCSV()">导出CSV</button></div></div></div><div class="loading text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><div class="mt-2">正在查询中，请稍候...</div></div><table class="table table-hover table-bordered"><thead class="table-light"><tr><th class="sortable" onclick="sortTable(0)">IP地址</th><th class="sortable" onclick="sortTable(1)">省份</th><th class="sortable" onclick="sortTable(2)">城市</th><th class="sortable" onclick="sortTable(3)">区县</th><th class="sortable" onclick="sortTable(4)">运营商</th><th>完整信息</th></tr></thead><tbody id="resultTable"></tbody></table></div><script>let currentData=[];let sortOrder=1;async function startQuery(){const t=document.getElementById('ipList').value.split('\\n').map(t=>t.trim()).filter(t=>t.match(/\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/)).slice(0,100);if(0===t.length)return alert('请输入有效的IP地址');showLoading(!0),currentData=[];try{const e=t.map(async t=>{const e=await fetch('/api/ip?ip='+t),a=await e.json();return{ip:t,province:a.province||'未知',city:a.city||'未知',district:a.district||'未知',isp:a.isp||'未知',fullInfo:a.fullInfo||'未知'}});currentData=await Promise.all(e),updateTable(currentData)}catch(e){alert('查询失败，请稍后重试')}finally{showLoading(!1)}}function updateTable(t){const e=document.getElementById('resultTable');e.innerHTML=t.map(t=>\`<tr><td>\${t.ip}</td><td>\${t.province}</td><td>\${t.city}</td><td>\${t.district}</td><td>\${t.isp}</td><td>\${t.fullInfo}</td></tr>\`).join('')}function sortTable(t){currentData.sort((e,a)=>{const n=Object.values(e)[t],s=Object.values(a)[t];return n.localeCompare(s)*sortOrder}),sortOrder*=-1,updateTable(currentData)}function exportCSV(){if(0===currentData.length)return;const t=[['IP地址','省份','城市','区县','运营商','完整信息'].join(','),...currentData.map(e=>[\`\${e.ip}\`,\`\${e.province}\`,\`\${e.city}\`,\`\${e.district}\`,\`\${e.isp}\`,\`"\${e.fullInfo}"\`].join(','))].join('\\n'),e=new Blob([t],{type:'text/csv'}),a=URL.createObjectURL(e),n=document.createElement('a');n.href=a,n.download=\`IP查询结果_\${new Date.toLocaleString()}.csv\`,n.click()}function showLoading(t){document.querySelector('.loading').style.display=t?'block':'none'}<\/script>`;