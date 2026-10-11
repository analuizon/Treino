import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=process.cwd();
const publicFiles=new Set(['/index.html','/style.css','/app.js','/model.js','/sw.js','/icon.svg','/manifest.webmanifest']);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(!publicFiles.has(url.pathname==='/'?'/index.html':url.pathname)){res.writeHead(404).end('Não encontrado');return;}const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!path.startsWith(root+'/')){res.writeHead(403).end();return;}const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-cache'}).end(data);}catch{res.writeHead(404).end('Não encontrado');}}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Ritmo disponível na porta '+(process.env.PORT||3000)));
