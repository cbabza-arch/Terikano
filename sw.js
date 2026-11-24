<html>
<style>
   div{min-height:1em;}
</style>
<body>self.addEventListener(&#39;fetch&#39;, e =&gt; {<br/>  e.respondWith(<br/>    caches.open(&#39;terikano-v1&#39;).then(c =&gt; c.match(e.request).then(r =&gt; r || fetch(e.request).then(res =&gt; { c.put(e.request, res.clone()); return res; }).catch(()=&gt;r)))<br/>  );<br/>});</body>
</html>