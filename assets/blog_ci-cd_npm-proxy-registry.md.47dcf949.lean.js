import{_ as s,v as a,b as n,R as l}from"./chunks/framework.1a271518.js";const f=JSON.parse('{"title":"私有 npm registry","description":"","frontmatter":{},"headers":[],"relativePath":"blog/ci-cd/npm-proxy-registry.md","filePath":"blog/ci-cd/npm-proxy-registry.md","lastUpdated":1692276427000}'),p={name:"blog/ci-cd/npm-proxy-registry.md"},o=l(`<h1 id="私有-npm-registry" tabindex="-1">私有 npm registry <a class="header-anchor" href="#私有-npm-registry" aria-label="Permalink to &quot;私有 npm registry&quot;">​</a></h1><p>使用 <a href="https://github.com/verdaccio/verdaccio" target="_blank" rel="noreferrer">verdaccio</a> 搭建</p><h2 id="初始" tabindex="-1">初始 <a class="header-anchor" href="#初始" aria-label="Permalink to &quot;初始&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span></span></code></pre></div><h2 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span></span></code></pre></div><h2 id="创建配置文件" tabindex="-1">创建配置文件 <a class="header-anchor" href="#创建配置文件" aria-label="Permalink to &quot;创建配置文件&quot;">​</a></h2><p>config.yaml</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This is the default configuration file. It allows all users to do anything,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># please read carefully the documentation and best practices to</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># improve security.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Look here for more config file examples:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://github.com/verdaccio/verdaccio/tree/5.x/conf</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Read about the best practices</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/best</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># path to a directory with all packages</span></span>
<span class="line"><span style="color:#F07178;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./storage</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># path to a directory with plugins to include</span></span>
<span class="line"><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./plugins</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/webui</span></span>
<span class="line"><span style="color:#F07178;">web</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Verdaccio</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># comment out to disable gravatar support</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># gravatar: false</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># by default packages are ordercer ascendant (asc|desc)</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># sort_packages: asc</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># convert your UI to the dark side</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># darkMode: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># html_cache: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># by default all features are displayed</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># login: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showInfo: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showSettings: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># In combination with darkMode you can force specific theme</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showThemeSwitch: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showFooter: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showSearch: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showRaw: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># showDownloadTarball: true</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  HTML tags injected after manifest &lt;scripts/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># scriptsBodyAfter:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#    - &#39;&lt;script type=&quot;text/javascript&quot; src=&quot;https://my.company.com/customJS.min.js&quot;&gt;&lt;/script&gt;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  HTML tags injected before ends &lt;/head&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  metaScripts:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#    - &#39;&lt;script type=&quot;text/javascript&quot; src=&quot;https://code.jquery.com/jquery-3.5.1.slim.min.js&quot;&gt;&lt;/script&gt;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#    - &#39;&lt;script type=&quot;text/javascript&quot; src=&quot;https://browser.sentry-cdn.com/5.15.5/bundle.min.js&quot;&gt;&lt;/script&gt;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#    - &#39;&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot; /&gt;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  HTML tags injected first child at &lt;body/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  bodyBefore:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#    - &#39;&lt;div id=&quot;myId&quot;&gt;html before webpack scripts&lt;/div&gt;&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  Public path for template manifest scripts (only manifest)</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">#  publicPath: http://somedomain.org/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#authentication</span></span>
<span class="line"><span style="color:#F07178;">auth</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">htpasswd</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./htpasswd</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># Maximum amount of users allowed to register, defaults to &quot;+inf&quot;.</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># You can set this to -1 to disable registration.</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># max_users: 1000</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># Hash algorithm, possible options are: &quot;bcrypt&quot;, &quot;md5&quot;, &quot;sha1&quot;, &quot;crypt&quot;.</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># algorithm: bcrypt # by default is crypt, but is recommended use bcrypt for new installations</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># Rounds number for &quot;bcrypt&quot;, will be ignored for other algorithms.</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># rounds: 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#uplinks</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># a list of other known repositories we can talk to</span></span>
<span class="line"><span style="color:#F07178;">uplinks</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">npmjs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://registry.npmmirror.com/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Learn how to protect your packages</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/protect-your-dependencies/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#packages</span></span>
<span class="line"><span style="color:#F07178;">packages</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@*/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># scoped packages</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">access</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$all</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">publish</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$authenticated</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">unpublish</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$authenticated</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">proxy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npmjs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">**</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># allow all users (including non-authenticated users) to read and</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># publish all packages</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># you can specify usernames/groupnames (depending on your auth plugin)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># and three keywords: &quot;$all&quot;, &quot;$anonymous&quot;, &quot;$authenticated&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">access</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$all</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># allow all known users to publish/publish packages</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># (anyone can register by default, remember?)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">publish</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$authenticated</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">unpublish</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$authenticated</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># if package is not available locally, proxy requests to &#39;npmjs&#39; registry</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">proxy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npmjs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># To improve your security configuration and  avoid dependency confusion</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># consider removing the proxy property for private packages</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/best#remove-proxy-to-increase-security-at-private-packages</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#server</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.</span></span>
<span class="line"><span style="color:#F07178;">server</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">keepAliveTimeout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># Allow \`req.ip\` to resolve properly when Verdaccio is behind a proxy or load-balancer</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># See: https://expressjs.com/en/guide/behind-proxies.html</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># trustProxy: &#39;127.0.0.1&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#offline-publish</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># publish:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   allow_offline: false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#url-prefix</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># url_prefix: /verdaccio/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># VERDACCIO_PUBLIC_URL=&#39;https://somedomain.org&#39;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># url_prefix: &#39;/my_prefix&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># // url -&gt; https://somedomain.org/my_prefix/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># VERDACCIO_PUBLIC_URL=&#39;https://somedomain.org&#39;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># url_prefix: &#39;/&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># // url -&gt; https://somedomain.org/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># VERDACCIO_PUBLIC_URL=&#39;https://somedomain.org/first_prefix&#39;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># url_prefix: &#39;/second_prefix&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># // url -&gt; https://somedomain.org/second_prefix/&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#security</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># security:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   api:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     legacy: true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     jwt:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       sign:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#         expiresIn: 29d</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#       verify:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#         someProp: [value]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    web:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#      sign:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#        expiresIn: 1h # 1 hour by default</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#      verify:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#         someProp: [value]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#user-rate-limit</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># userRateLimit:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   windowMs: 50000</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   max: 1000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#max-body-size</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># max_body_size: 10mb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#listen-port</span></span>
<span class="line"><span style="color:#F07178;">listen</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># - localhost:4873            # default value</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># - http://localhost:4873     # same thing</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">0.0.0.0:4873</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># listen on all addresses (INADDR_ANY)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - https://example.org:4873  # if you want to use https</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - &quot;[::1]:4873&quot;                # ipv6</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - unix:/tmp/verdaccio.sock    # unix socket</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># The HTTPS configuration is useful if you do not consider use a HTTP Proxy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#https</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   key: ./path/verdaccio-key.pem</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   cert: ./path/verdaccio-cert.pem</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   ca: ./path/verdaccio-csr.pem</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#proxy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># http_proxy: http://something.local/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https_proxy: https://something.local/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/configuration#notifications</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># notify:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   method: POST</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   headers: [{ &quot;Content-Type&quot;: &quot;application/json&quot; }]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   endpoint: https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   content: &#39;{&quot;color&quot;:&quot;green&quot;,&quot;message&quot;:&quot;New package published: * {{ name }}*&quot;,&quot;notify&quot;:true,&quot;message_format&quot;:&quot;text&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">audit</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://verdaccio.org/docs/logger</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># log settings</span></span>
<span class="line"><span style="color:#F07178;">log</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio.log</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">level</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">error</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#experiments:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  # support for npm token command</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  token: false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  # disable writing body size to logs, read more on ticket 1912</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  bytesin_off: false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  # enable tarball URL redirect for hosting tarball with a different server, the tarball_url_redirect can be a template string</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  tarball_url_redirect: &#39;https://mycdn.com/verdaccio/\${packageName}/\${filename}&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  # the tarball_url_redirect can be a function, takes packageName and filename and returns the url, when working with a js configuration file</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  tarball_url_redirect(packageName, filename) {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    const signedUrl = // generate a signed url</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#    return signedUrl;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># translate your registry, api i18n not available yet</span></span>
<span class="line"><span style="color:#F07178;">i18n</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;"># list of the available translations https://github.com/verdaccio/verdaccio/blob/master/packages/plugins/ui-theme/src/i18n/ABOUT_TRANSLATIONS.md</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">web</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">zh-CN</span></span></code></pre></div><h2 id="创建入口文件" tabindex="-1">创建入口文件 <a class="header-anchor" href="#创建入口文件" aria-label="Permalink to &quot;创建入口文件&quot;">​</a></h2><p>verdaccio.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./node_modules/verdaccio/bin/verdaccio</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="window-安装-pm2" tabindex="-1">window 安装 pm2 <a class="header-anchor" href="#window-安装-pm2" aria-label="Permalink to &quot;window 安装 pm2&quot;">​</a></h2><p>使用 <a href="https://github.com/jessety/pm2-installer" target="_blank" rel="noreferrer">pm2-installer</a> 安装，并自动添加 windows 服务，用于开机自启动</p><p>下载 <a href="https://github.com/jessety/pm2-installer/archive/main.zip" target="_blank" rel="noreferrer">安装包</a></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 解压 pm2-installer安装包</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 以管理员身份运行cmd</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cd 到 pm2-installer安装包 根目录 然后执行</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">setup</span></span></code></pre></div><h2 id="启动-verdaccio" tabindex="-1">启动 verdaccio <a class="header-anchor" href="#启动-verdaccio" aria-label="Permalink to &quot;启动 verdaccio&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 以管理员身份运行cmd</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># cd 到项目根目录 然后执行</span></span>
<span class="line"><span style="color:#FFCB6B;">pm2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio.js</span></span>
<span class="line"><span style="color:#FFCB6B;">pm2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">save</span></span></code></pre></div><h2 id="切换-npm-registry" tabindex="-1">切换 npm registry <a class="header-anchor" href="#切换-npm-registry" aria-label="Permalink to &quot;切换 npm registry&quot;">​</a></h2><p>直接使用 npm 指令</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 切换成局域网部署机器的ip</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://192.168.10.103:4873/</span></span></code></pre></div><p>或使用 nrm</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://192.168.10.103:4873/</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">use</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span></span></code></pre></div><h2 id="添加用户" tabindex="-1">添加用户 <a class="header-anchor" href="#添加用户" aria-label="Permalink to &quot;添加用户&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">adduser</span></span></code></pre></div><h2 id="发布包" tabindex="-1">发布包 <a class="header-anchor" href="#发布包" aria-label="Permalink to &quot;发布包&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publish</span></span></code></pre></div><h2 id="删除包" tabindex="-1">删除包 <a class="header-anchor" href="#删除包" aria-label="Permalink to &quot;删除包&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 删除包的某个版本</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">unpublish</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">包名@版本</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除包</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">unpublish</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">包名</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--force</span></span></code></pre></div>`,29),t=[o];function e(c,i,r,y,D,d){return a(),n("div",null,t)}const h=s(p,[["render",e]]);export{f as __pageData,h as default};
