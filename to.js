(function(){
  const $ = sel => document.querySelector(sel);

  const inputEl = $('#input');
  const outputEl = $('#output');
  const btnConvert = $('#btn-convert');
  const btnCopy = $('#btn-copy');
  const btnClear = $('#btn-clear');
  const btnSample = $('#btn-sample');

  const optEscapeText = $('#opt-escape-text');
  const optMultiline = $('#opt-multiline');
  const optPreferMethod = $('#opt-prefer-method');
  const optWrapGroup = $('#opt-wrap-group');
  const optIndent = $('#opt-indent');
  const optPreserveNewlines = $('#opt-preserve-newlines');
  const optPreserveIndent = $('#opt-preserve-indent');
  const optTrimText = $('#opt-trim-text');

  // Default in-memory mapping (can be extended via mapping.json)
  let mapping = {
    global: {
      class: { kind: 'delimited', method: 'CLASS', delimiter: ' ' },
      id: { kind: 'string', method: 'ID' },
      title: { kind: 'string', method: 'TITLE' },
      hidden: { kind: 'bool', method: 'HIDDEN' },
    },
    a: {
      href: { kind: 'string', method: 'HREF' },
      download: { kind: 'bool', method: 'DOWNLOAD' },
      rel: { kind: 'delimited', method: 'REL', delimiter: ' ' },
      target: { kind: 'string', method: 'TARGET' },
    },
    img: {
      src: { kind: 'string', method: 'SRC' },
      alt: { kind: 'string', method: 'ALT' },
      width: { kind: 'int', method: 'WIDTH' },
      height: { kind: 'int', method: 'HEIGHT' },
    },
    input: {
      type: { kind: 'string', method: 'TYPE' },
      value: { kind: 'string', method: 'VALUE' },
      placeholder: { kind: 'string', method: 'PLACEHOLDER' },
      disabled: { kind: 'bool', method: 'DISABLED' },
      checked: { kind: 'bool', method: 'CHECKED' },
    },
    button: {
      type: { kind: 'string', method: 'TYPE' },
      disabled: { kind: 'bool', method: 'DISABLED' },
    },
    label: {
      for: { kind: 'string', method: 'FOR' },
    },
  };

  // Try to load external mapping.json to override/extend
  fetch('./mapping.json').then(r => r.ok ? r.json() : null).then(json => {
    if (json && typeof json === 'object') {
      mapping = deepMerge(mapping, json);
    }
  }).catch(() => {});

  function deepMerge(a, b){
    const out = Array.isArray(a) ? a.slice() : { ...a };
    for (const [k, v] of Object.entries(b || {})){
      if (v && typeof v === 'object' && !Array.isArray(v)){
        out[k] = deepMerge(a?.[k] || {}, v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  function escapeGoString(s){
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  function isWhitespaceOnly(text){
    return /^[\s\u00A0]*$/.test(text);
  }

  function tagCtor(tag){
    const up = tag.toUpperCase().replace(/-/g, '_');
    return `elements.${up}`; // Prefer generated helper if exists
  }

  function nodeToExpr(node, ctx){
    const { multiline, indentStr, preferMethod, escapeText, preserveNewlines, preserveIndent, trimText } = ctx;

    if (node.nodeType === Node.TEXT_NODE){
      let raw = node.nodeValue || '';
      if (isWhitespaceOnly(raw)) return null;
      
      // Apply text formatting options
      if (!preserveNewlines) {
        raw = raw.replace(/\n/g, ' ');
      }
      if (!preserveIndent) {
        raw = raw.replace(/^\s+/gm, '');
      }
      if (trimText) {
        raw = raw.trim();
      }
      
      if (isWhitespaceOnly(raw)) return null;
      const lit = `"${escapeGoString(raw)}"`;
      return escapeText ? `elements.Escaped(${lit})` : `elements.Text(${lit})`;
    }

    if (node.nodeType !== Node.ELEMENT_NODE){
      return null;
    }

    const el = node;
    const tag = el.tagName.toLowerCase();

    // children
    const childrenExprs = [];
    el.childNodes.forEach(ch => {
      const expr = nodeToExpr(ch, ctx);
      if (expr) childrenExprs.push(expr);
    });

    const ctor = tagCtor(tag);
    // Build children args; in multiline mode always add trailing comma after each arg (including single child)
    const args = multiline
      ? childrenExprs.map(e => {
          // ensure exactly one trailing comma on the arg line
          const lines = e.split('\n');
          // append comma to last non-empty line of the child expression
          let li = lines.length - 1;
          while (li >= 0 && lines[li].trim() === '') li--;
          if (li >= 0 && !/[,\)]\s*$/.test(lines[li])) {
            lines[li] = lines[li] + ',';
          } else if (li >= 0 && /\)$/.test(lines[li])) {
            // if child ends with ')' but no comma, add comma after ')'
            if (!/,\s*$/.test(lines[li])) lines[li] = lines[li] + ',';
          }
          return lines.join('\n');
        }).join(`\n${indentStr.repeat(ctx.level+2)}`)
      : childrenExprs.join(', ');
    const ctorCall = childrenExprs.length > 0
      ? `${ctor}(${multiline ? `\n${indentStr.repeat(ctx.level+2)}` : ''}${args}${multiline ? `\n${indentStr.repeat(ctx.level+1)}` : ''})`
      : `${ctor}()`;

    // attribute chain -> collect methods first for precise formatting
    const methods = [];

    // Prepare per-tag mapping lookup
    const tagMap = mapping[tag] || {};
    const globalMap = mapping.global || {};

    // attributes iteration
    const attrs = Array.from(el.attributes || []);
    for (const a of attrs){
      const name = a.name;
      let value = a.value;

      // data-*
      if (name.startsWith('data-')){
        const key = name.slice(5);
        const v = value ?? '';
        methods.push(`CustomData(\"${escapeGoString(key)}\", \"${escapeGoString(v)}\")`);
        continue;
      }

      const spec = preferMethod ? (tagMap[name] || globalMap[name]) : null;
      if (spec){
        const method = spec.method;
        switch (spec.kind){
          case 'string':
            methods.push(`${method}(\"${escapeGoString(value)}\")`);
            continue;
          case 'int':{
            const iv = parseInt(value, 10);
            const vv = Number.isFinite(iv) ? iv : 0;
            methods.push(`${method}(${vv})`);
            continue;
          }
          case 'number':{
            const fv = parseFloat(value);
            const vv = Number.isFinite(fv) ? fv : 0;
            methods.push(`${method}(${vv})`);
            continue;
          }
          case 'bool':{
            const present = value === '' || value === name || (typeof value === 'string' && value.toLowerCase() === 'true') || value === undefined;
            if (present){ methods.push(`${method}()`); }
            continue;
          }
          case 'delimited':{
            const del = spec.delimiter || ' ';
            const parts = (value || '').split(del).map(s => s.trim()).filter(Boolean);
            if (parts.length > 0){
              const args = parts.map(p => `\"${escapeGoString(p)}\"`).join(', ');
              methods.push(`${method}(${args})`);
            }
            continue;
          }
          case 'kv':{
            const pairDel = spec.pairDelimiter || ';';
            const kvDel = spec.kvDelimiter || ':';
            const entries = (value || '').split(pairDel).map(s => s.trim()).filter(Boolean);
            for (const entry of entries){
              const [k, v] = entry.split(kvDel);
              if (!k) continue;
              methods.push(`${method}(\"${escapeGoString((k||'').trim())}\", \"${escapeGoString((v||'').trim())}\")`);
            }
            continue;
          }
        }
      }

      // fallback Attr
      if (value === null || value === undefined){ value = ''; }
      methods.push(`Attr(\"${escapeGoString(name)}\", \"${escapeGoString(value)}\")`);
    }

    if (!multiline){
      // single line chaining
      return methods.length ? `${ctorCall}.${methods.join('.')}` : ctorCall;
    }

    // multiline chaining with trailing dots between lines
    const lines = [];
    if (methods.length){
      lines.push(`${ctorCall}.`);
      for (let i = 0; i < methods.length; i++){
        const m = methods[i];
        const end = (i < methods.length - 1) ? '.' : '';
        lines.push(`${indentStr.repeat(ctx.level+1)}${m}${end}`);
      }
      return lines.join('\n');
    }
    return ctorCall;
  }

  function convert(html){
    // Read options safely (some controls may be hidden/removed in UI)
    const multiline = !!(optMultiline?.checked ?? true);
    const escapeText = !!(optEscapeText?.checked ?? true);
    const preferMethod = !!(optPreferMethod?.checked ?? true);
    const wrapGroup = !!(optWrapGroup?.checked ?? true);
    const preserveNewlines = !!(optPreserveNewlines?.checked ?? false);
    const preserveIndent = !!(optPreserveIndent?.checked ?? false);
    const trimText = !!(optTrimText?.checked ?? true);
    const indent = parseInt((optIndent?.value ?? '4'), 10) || 4;
    const indentStr = ' '.repeat(indent);

    const parser = new DOMParser();
    let nodes = [];
    // If user pasted a full HTML document, treat it as a single root (<html>)
    if (/<html[\s>]/i.test(html)){
      const docFull = parser.parseFromString(html, 'text/html');
      if (docFull && docFull.documentElement){
        nodes = [docFull.documentElement];
      }
    } else {
      // Wrap with a container to get all top-level nodes
      const doc = parser.parseFromString(`<div id="__wrap__">${html}</div>`, 'text/html');
      const wrap = doc.getElementById('__wrap__');
      nodes = Array.from(wrap.childNodes);
    }

    const exprs = [];
    for (const n of nodes){
      const expr = nodeToExpr(n, { multiline, indentStr, preferMethod, escapeText, preserveNewlines, preserveIndent, trimText, level: 0 });
      if (expr) exprs.push(expr);
    }

    if (exprs.length === 0) return '';
    // Auto: single root → return directly without Group
    if (exprs.length === 1) {
      return exprs[0];
    }
    if (!multiline){
      return `elements.Group(${exprs.join(', ')})`;
    }
    // add trailing comma to each expression block (last non-empty line), exactly once
    const inner = exprs.map(e => {
      const parts = e.split('\n');
      // find last non-empty line
      let idx = parts.length - 1;
      while (idx >= 0 && parts[idx].trim() === '') idx--;
      if (idx >= 0) {
        const original = parts[idx];
        const rtrim = original.replace(/[\s\t]+$/,'');
        const trail = original.slice(rtrim.length); // preserve trailing spaces
        if (!rtrim.endsWith(',')) {
          parts[idx] = rtrim + ',' + trail;
        } else {
          parts[idx] = original; // already has comma
        }
      }
      return parts.map(ln => `${indentStr}${ln}`).join('\n');
    }).join('\n');
    return `elements.Group(\n${inner}\n)`;
  }

  function doConvert(){
    const html = inputEl.value || '';
    const code = convert(html);
    outputEl.textContent = code;
  }

  btnConvert.addEventListener('click', doConvert);
  inputEl.addEventListener('input', () => {
    // live update for better UX
    doConvert();
  });

  btnCopy.addEventListener('click', async () => {
    const text = outputEl.textContent || '';
    try{
      await navigator.clipboard.writeText(text);
      btnCopy.textContent = '已复制';
      setTimeout(() => btnCopy.textContent = '复制', 1200);
    }catch{
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
  });

  btnClear.addEventListener('click', () => {
    inputEl.value = '';
    outputEl.textContent = '';
  });

  btnSample.addEventListener('click', () => {
    inputEl.value = `<a href="/docs" class="link primary" data-track="nav">\n  文档\n</a>`;
    doConvert();
  });
})();
