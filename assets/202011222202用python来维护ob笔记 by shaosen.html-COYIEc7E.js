import{_ as p,c as d,a,b as t,e as s,d as i,w as e,r as o,o as r}from"./app-Dh2R83q2.js";const u={};function c(v,n){const l=o("RouteLink");return r(),d("div",null,[a("p",null,[n[2]||(n[2]=s("用python来维护ob笔记 by ",-1)),i(l,{to:"/07 信息源与贡献者/shaosen.html"},{default:e(()=>[...n[0]||(n[0]=[s("shaosen",-1)])]),_:1}),n[3]||(n[3]=a("br",null,null,-1)),n[4]||(n[4]=s(" 感兴趣可以将下面的代码块另存为“20201121 ",-1)),n[5]||(n[5]=a("a",{href:"http://xn--python-8t7lo82nbkhr96a.py",target:"_blank",rel:"noopener noreferrer"},"python维护笔记.py",-1)),n[6]||(n[6]=s("”后运行",-1)),n[7]||(n[7]=a("br",null,null,-1)),n[8]||(n[8]=s(" 运行环境：python 3.X",-1)),n[9]||(n[9]=a("br",null,null,-1)),n[10]||(n[10]=s(" 后续代码更新地址： ",-1)),n[11]||(n[11]=a("a",{href:"https://gitee.com/vken/md_note/tree/master/",target:"_blank",rel:"noopener noreferrer"},"https://gitee.com/vken/md_note/tree/master/",-1)),n[12]||(n[12]=a("br",null,null,-1)),i(l,{to:"/07 信息源与贡献者/落山鸡.html"},{default:e(()=>[...n[1]||(n[1]=[s("落山鸡",-1)])]),_:1}),n[13]||(n[13]=s("提醒：运行代码有风险，请注意数据备份，如有能力请审视代码。",-1))]),n[14]||(n[14]=t(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#! /usr/bin/env python </span></span>
<span class="line"><span># -*- coding: utf-8 -*</span></span>
<span class="line"><span>#使用前请做好备份，在不同设备上运行效果可能不一致，有可能损坏笔记数据；使用时请将rootdir(第9行）切换成自己的笔记地址，第9行(logdir)指定日志输出路径；20201122修复多个相同链接重复替换，转义不替换；bug:网址可能会胡乱替换</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import re  # 导入正则表达式</span></span>
<span class="line"><span>import urllib.parse  # 导入urllib.parse模块，用于url转义，urllib模块主要用于url请求相关内容；</span></span>
<span class="line"><span>now = time.strftime(&quot;%Y-%m-%d-%H_%M_%S&quot;,time.localtime(time.time())) </span></span>
<span class="line"><span>rootDir = r&quot;D:\\笔记\\笔记&quot;  #笔记文件夹地址，需要注意的是地址最后一位不能是\\</span></span>
<span class="line"><span>logdir = &quot;C:/Users/vkss/Desktop/&quot;#运行记录保存文件夹</span></span>
<span class="line"><span>logdir1 = logdir+now+r&quot;jreport.md&quot;</span></span>
<span class="line"><span>logdir2 = logdir+now+r&quot;lreport.md&quot;</span></span>
<span class="line"><span>wenjian = {}  # 空字典wenjian，用于存储文件路径及内容，key为文件路径，值为对象，20201117</span></span>
<span class="line"><span>wjmm = []  # 空列表wjm，用于存储文件名</span></span>
<span class="line"><span>wjcm = []  # 空列表wenjianming，用于存储重名文件，20201117</span></span>
<span class="line"><span>jlog = &quot;&quot;#用于存储简单log</span></span>
<span class="line"><span>llog = &quot;&quot;#用于存储详细log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Md():</span></span>
<span class="line"><span>    &quot;&quot;&quot;对md文件进行操作&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, lujing, wjlb):</span></span>
<span class="line"><span>        &quot;&quot;&quot;初始化路径&quot;&quot;&quot;</span></span>
<span class="line"><span>        self.lujing = lujing</span></span>
<span class="line"><span>        self.nr = &quot;&quot;  # md文档内容</span></span>
<span class="line"><span>        self.nr1 = &quot;&quot;# md原始文档内容</span></span>
<span class="line"><span>        self.lj = []  # md文档内链接</span></span>
<span class="line"><span>        self.ydqnr = 0  # 已读取内容，修改为1</span></span>
<span class="line"><span>        self.xg = 0  # 是否需要修改，如果需要改为1</span></span>
<span class="line"><span>        self.wjlb = wjlb  # 文件列表</span></span>
<span class="line"><span>        self.jlog = &quot;&quot; #保存简单修改log</span></span>
<span class="line"><span>        self.llog = &quot;修改的文档:\\n&quot; #保存详细修改前后文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def dqnr(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;读取md内容&quot;&quot;&quot;</span></span>
<span class="line"><span>        if self.ydqnr == 0:  # 如果已经读过了，应该跳过</span></span>
<span class="line"><span>            with open(lujing, encoding=&#39;utf-8&#39;) as f:</span></span>
<span class="line"><span>                self.nr = f.read()  # md文档内容</span></span>
<span class="line"><span>                self.nr1 = self.nr# 将nr复制到nr1，测试不会变</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def urlxg(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;修改url&quot;&quot;&quot;</span></span>
<span class="line"><span>        self.dqnr()</span></span>
<span class="line"><span>        self.lj = re.findall(r&quot;\\]\\(.*?\\)&quot;, self.nr)</span></span>
<span class="line"><span>        tslj = []#特殊链接，比如http，file</span></span>
<span class="line"><span>        for i in self.lj:#挑出特殊链接</span></span>
<span class="line"><span>            if i[2:8] == &quot;https:&quot; or i[2:7] == &quot;http:&quot; or i[2:10] ==&quot;file:///&quot;:</span></span>
<span class="line"><span>                tslj.append(i)</span></span>
<span class="line"><span>        for i in tslj:#从地址列表中删除特殊链接</span></span>
<span class="line"><span>            self.lj.remove(i)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for i in range(0, len(self.lj)):</span></span>
<span class="line"><span>            ddzjbl = urllib.parse.unquote(self.lj[i]).replace(&quot; &quot;, &quot;%20&quot;)  # 中间变量</span></span>
<span class="line"><span>            if self.lj[i] != ddzjbl:</span></span>
<span class="line"><span>                # 首先将dd[i]从url转换成普通字符，再用%20替换掉空格</span></span>
<span class="line"><span>                self.nr = self.nr.replace(self.lj[i], ddzjbl)</span></span>
<span class="line"><span>                self.jlog = self.jlog+&quot;\\n\\n&quot;+lujing+&quot;:转义了地址\\n\\n&quot;+self.lj[i]+&quot;\\n\\n&quot;+ddzjbl</span></span>
<span class="line"><span>                self.xg = 1</span></span>
<span class="line"><span>                self.lj[i] = ddzjbl</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def cxwj(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;重写文件，会在写之前判断是否需要写&quot;&quot;&quot;</span></span>
<span class="line"><span>        if self.xg == 1:</span></span>
<span class="line"><span>            # 写入文件，a表示追加，w表示覆盖写入，,encoding=&#39;utf-8&#39;表示以UTF8编码</span></span>
<span class="line"><span>            with open(self.lujing, &#39;w&#39;, encoding=&#39;utf-8&#39;) as f:</span></span>
<span class="line"><span>                f.write(self.nr)</span></span>
<span class="line"><span>                self.xg == 0  # 写完了，就不用再写了，修改标志改为0</span></span>
<span class="line"><span>            self.llog = self.llog+lujing+&quot;\\n&quot;+self.nr1+&quot;\\n&quot;+self.nr+&quot;\\n\\n&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def whlj(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;维护链接&quot;&quot;&quot;</span></span>
<span class="line"><span>        self.urlxg()        </span></span>
<span class="line"><span>        for wjm in set(self.lj):#集合就可以了</span></span>
<span class="line"><span>            wjm1 = self.ljxz(wjm)</span></span>
<span class="line"><span>            # 拆解出文件名</span></span>
<span class="line"><span>            if wjm[2:-1] != wjm1:</span></span>
<span class="line"><span>                self.nr = self.nr.replace(wjm[2:-1], wjm1)</span></span>
<span class="line"><span>                self.xg = 1</span></span>
<span class="line"><span>                self.jlog = self.jlog+&quot;\\n\\n&quot;+lujing+&quot;:修改了地址\\n\\n&quot;+wjm[2:-1]+&quot;\\n\\n&quot;+wjm1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def ljxz(self, wjm):</span></span>
<span class="line"><span>        &quot;&quot;&quot;链接修正，输入链接文件名，返回正确相对链接&quot;&quot;&quot;</span></span>
<span class="line"><span>        wjm = wjm[2:-1]</span></span>
<span class="line"><span>        dd3 = wjm</span></span>
<span class="line"><span>        wjm=wjm[wjm.rfind(&quot;/&quot;)+1:]</span></span>
<span class="line"><span>        if len(wjm) == 0:</span></span>
<span class="line"><span>            return dd3#如果拆出的文件名是空，那么就返回链接</span></span>
<span class="line"><span>        zjbl = 0</span></span>
<span class="line"><span>        wjm = wjm.replace(&quot;%20&quot;,&quot; &quot;)</span></span>
<span class="line"><span>        for ljj in self.wjlb:</span></span>
<span class="line"><span>            # 查找文件名,先不考虑重名的问题</span></span>
<span class="line"><span>            a1 = ljj.replace(&quot;/&quot;,&quot;\\\\&quot;).split(&quot;\\\\&quot;)</span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                if a1[-1].index(wjm) == 0:#链接中地址与路径中地址从0匹配</span></span>
<span class="line"><span>                    if len(a1[-1])&gt;len(wjm) and wjm.find(&quot;.&quot;,len(wjm)-5)&gt;0:</span></span>
<span class="line"><span>                        continue#后4位有小数点，认为是有后缀，应该完全匹配。但如果名字就带了小数点，可能会出现搜索不到，或者匹配错误，这极少发生</span></span>
<span class="line"><span>                    elif len(a1[-1])-len(wjm) &gt; 5:</span></span>
<span class="line"><span>                        continue#如果长度差大于5，跳过，认为后缀最长为4</span></span>
<span class="line"><span>                    # 计算相对路径</span></span>
<span class="line"><span>                    b1 = self.lujing.replace(&quot;/&quot;,&quot;\\\\&quot;).split(&quot;\\\\&quot;)</span></span>
<span class="line"><span>                    for i in range(0, max(len(a1), len(b1))):</span></span>
<span class="line"><span>                        if a1[i] != b1[i]:</span></span>
<span class="line"><span>                            # join是把列表转化为字符串，用空&quot;&quot;连接，这是求得的相对路径</span></span>
<span class="line"><span>                            dd = &quot;../&quot;*(len(b1)-i-1)+&quot;/&quot;.join(a1[i:])</span></span>
<span class="line"><span>                            dd = urllib.parse.unquote(dd).replace(&quot; &quot;,&quot;%20&quot;)</span></span>
<span class="line"><span>                            zjbl = 1</span></span>
<span class="line"><span>                            return dd</span></span>
<span class="line"><span>                    break</span></span>
<span class="line"><span>            except ValueError:#这里以后写，无目标的链接</span></span>
<span class="line"><span>                continue</span></span>
<span class="line"><span>          # 相对路径比较</span></span>
<span class="line"><span>        if zjbl == 0:</span></span>
<span class="line"><span>            return dd3</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def bianLi(rootDir):  # 遍历文件夹</span></span>
<span class="line"><span>    for root, dirs, files in os.walk(rootDir):</span></span>
<span class="line"><span>        for file in files:</span></span>
<span class="line"><span>            # 将路径存为wenjian字典的key，20201117</span></span>
<span class="line"><span>            wenjian[os.path.join(root, file)] = &quot;彡&quot;</span></span>
<span class="line"><span>            wjcm.append(os.path.join(root, file))</span></span>
<span class="line"><span>        for dir in dirs:</span></span>
<span class="line"><span>            bianLi(dir)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>bianLi(rootDir)</span></span>
<span class="line"><span>for lujing in wenjian.keys():</span></span>
<span class="line"><span>    if lujing[-3:] == &quot;.md&quot;:</span></span>
<span class="line"><span>        wenjian[lujing] = Md(lujing, wjcm)  # 类</span></span>
<span class="line"><span>        wenjian[lujing].whlj()</span></span>
<span class="line"><span>        wenjian[lujing].cxwj()</span></span>
<span class="line"><span>        if wenjian[lujing].xg == 1:</span></span>
<span class="line"><span>            jlog=jlog+wenjian[lujing].jlog</span></span>
<span class="line"><span>            llog=llog+wenjian[lujing].llog</span></span>
<span class="line"><span></span></span>
<span class="line"><span>with open(logdir1,&#39;w&#39;,encoding=&#39;utf-8&#39;,errors=&#39;ignore&#39;) as f:</span></span>
<span class="line"><span>   f.write(jlog)#将简单日志输出到文件</span></span>
<span class="line"><span>with open(logdir2,&#39;w&#39;,encoding=&#39;utf-8&#39;,errors=&#39;ignore&#39;) as f:</span></span>
<span class="line"><span>   f.write(llog)#将详细日志输出到文件</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))])}const b=p(u,[["render",c]]),q=JSON.parse('{"path":"/09%20%E7%A2%8E%E8%AE%B0/202011222202%E7%94%A8python%E6%9D%A5%E7%BB%B4%E6%8A%A4ob%E7%AC%94%E8%AE%B0%20by%20shaosen.html","title":"202011222202用python来维护ob笔记 by shaosen","lang":"zh-CN","frontmatter":{"description":"用python来维护ob笔记 by 感兴趣可以将下面的代码块另存为“20201121 python维护笔记.py”后运行 运行环境：python 3.X 后续代码更新地址： https://gitee.com/vken/md_note/tree/master/ 提醒：运行代码有风险，请注意数据备份，如有能力请审视代码。","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-10-30T01:29:06.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://LincDocs.github.io/obsidian-chinese-help/09%20%E7%A2%8E%E8%AE%B0/202011222202%E7%94%A8python%E6%9D%A5%E7%BB%B4%E6%8A%A4ob%E7%AC%94%E8%AE%B0%20by%20shaosen.html"}],["meta",{"property":"og:site_name","content":"obsidian-chinese-help"}],["meta",{"property":"og:description","content":"用python来维护ob笔记 by 感兴趣可以将下面的代码块另存为“20201121 python维护笔记.py”后运行 运行环境：python 3.X 后续代码更新地址： https://gitee.com/vken/md_note/tree/master/ 提醒：运行代码有风险，请注意数据备份，如有能力请审视代码。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-30T01:29:06.000Z"}],["meta",{"property":"article:modified_time","content":"2025-10-30T01:29:06.000Z"}]]},"git":{"createdTime":1761787746000,"updatedTime":1761787746000,"contributors":[{"name":"Linc","username":"Linc","email":"762699299@qq.com","commits":1,"url":"https://github.com/Linc"}]},"readingTime":{"minutes":3.98,"words":1193},"filePathRelative":"09 碎记/202011222202用python来维护ob笔记 by shaosen.md","excerpt":"<p>用python来维护ob笔记 by <a href=\\"/obsidian-chinese-help/07 信息源与贡献者/shaosen.html\\" target=\\"_blank\\">shaosen</a><br>\\n感兴趣可以将下面的代码块另存为“20201121 <a href=\\"http://xn--python-8t7lo82nbkhr96a.py\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">python维护笔记.py</a>”后运行<br>\\n运行环境：python 3.X<br>\\n后续代码更新地址： <a href=\\"https://gitee.com/vken/md_note/tree/master/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://gitee.com/vken/md_note/tree/master/</a><br>\\n<a href=\\"/obsidian-chinese-help/07 信息源与贡献者/落山鸡.html\\" target=\\"_blank\\">落山鸡</a>提醒：运行代码有风险，请注意数据备份，如有能力请审视代码。</p>","autoDesc":true,"bioChainData":{"outlink":[{"title":"shaosen","link":"07 信息源与贡献者/shaosen.html"},{"title":"落山鸡","link":"07 信息源与贡献者/落山鸡.html"}],"backlink":[],"localMap":{"nodes":[{"id":"09 碎记/202011222202用python来维护ob笔记 by shaosen.md","value":{"title":"202011222202用python来维护ob笔记 by shaosen","path":"09 碎记/202011222202用python来维护ob笔记 by shaosen.md","outlink":["07 信息源与贡献者/shaosen.md","07 信息源与贡献者/落山鸡.md"],"backlink":[]}},{"id":"07 信息源与贡献者/shaosen.md","value":{"title":"shaosen","path":"07 信息源与贡献者/shaosen.md","outlink":[],"backlink":[]}},{"id":"07 信息源与贡献者/落山鸡.md","value":{"title":"落山鸡","path":"07 信息源与贡献者/落山鸡.md","outlink":[],"backlink":[]}}],"links":[{"source":"09 碎记/202011222202用python来维护ob笔记 by shaosen.md","target":"07 信息源与贡献者/shaosen.md"},{"source":"09 碎记/202011222202用python来维护ob笔记 by shaosen.md","target":"07 信息源与贡献者/落山鸡.md"}]}}}');export{b as comp,q as data};
