import{_ as s,v as n,b as a,R as l}from"./chunks/framework.1a271518.js";const d=JSON.parse('{"title":"nginx","description":"","frontmatter":{},"headers":[],"relativePath":"blog/ci-cd/nginx.md","filePath":"blog/ci-cd/nginx.md","lastUpdated":1692113512000}'),p={name:"blog/ci-cd/nginx.md"},o=l(`<h1 id="nginx" tabindex="-1">nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;nginx&quot;">​</a></h1><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 检查配置文件是否有错误</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 启动</span></span>
<span class="line"><span style="color:#FFCB6B;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 快速停止</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 正常停止</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">quit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 重启</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reload</span></span></code></pre></div><h2 id="常用配置" tabindex="-1">常用配置 <a class="header-anchor" href="#常用配置" aria-label="Permalink to &quot;常用配置&quot;">​</a></h2><p>nginx.conf</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">http: </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">server</span><span style="color:#F07178;"> {</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#F07178;">      </span><span style="color:#F78C6C;">8000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;"> server_name </span><span style="color:#F07178;"> localhost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;"># 根路径部署spa</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">location</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> root </span><span style="color:#F07178;">D:\\personProject\\vue2\\dist</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> index </span><span style="color:#F07178;"> index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> try_files $</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;">/ /index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;"># api 反向代理</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">location</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">/api </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#F07178;">https://api.leibo.group/api</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> proxy_set_header </span><span style="color:#F07178;">X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_add_x_forwarded_for</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;"># 子路径部署spa</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">location</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">/vue3 </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> alias </span><span style="color:#F07178;">D:/personProject/vue3/dist</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> index </span><span style="color:#F07178;"> index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> try_files $</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;">/ /vue3/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">location</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">/react </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> alias </span><span style="color:#F07178;">D:/personProject/react18/build</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> index </span><span style="color:#F07178;"> index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> try_files $</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;">/ /react/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">location</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">/angular </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> alias </span><span style="color:#F07178;">D:/personProject/angular16/dist/angular16</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> index </span><span style="color:#F07178;"> index.html index.htm</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#89DDFF;"> try_files $</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri</span><span style="color:#F07178;">/ /angular/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span>
<span class="line"><span style="color:#F07178;">  }</span></span>
<span class="line"><span style="color:#F07178;">}</span></span></code></pre></div>`,6),e=[o];function t(c,r,y,i,F,D){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
