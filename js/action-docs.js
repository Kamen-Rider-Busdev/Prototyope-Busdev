// Action Handlers: Manual Mutu / SOP / Technical Handbook (tanpa kolom link)
(function (window) {
  function bind(root, sel, fn) {
    root.querySelectorAll(sel).forEach(function (el) {
      el.onclick = function (e) { e.stopPropagation(); fn(el, e); };
    });
  }
  function val(id) {
    var el = document.getElementById(id);
    return el ? (el.value || '').trim() : '';
  }
  function openDrawio(sop) {
    // Sesuai request: action Edit langsung dialihkan ke draw.io
    var title = sop ? (sop.code + ' ' + sop.name) : 'SOP Baru';
    var url = 'https://app.diagrams.net/?title=' + encodeURIComponent(title) + '&splash=0';
    try { window.open(url, '_blank'); } catch (e) {}
  }
  function downloadPreview(sop) {
    if (!sop || !sop.preview) return;
    var a = document.createElement('a');
    a.href = sop.preview;
    a.download = (sop.code || 'sop') + '-flowchart.svg';
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ try{ document.body.removeChild(a); }catch(e){} }, 300);
  }

  window.ActionDocs = {
    attach: function (root, S, render, App) {
      if (!S.page) return;
      var isManual = S.page.indexOf('governance-quality-manual') === 0;
      var isSop = S.page.indexOf('sop') === 0 && S.page.indexOf('sop-') !== 0;
      // careful: page 'sop' and 'sop-detail' only (avoid collision with other keys)
      isSop = (S.page === 'sop' || S.page === 'sop-detail');
      var isThb = (S.page === 'technical-handbook' || S.page === 'technical-handbook-detail');
      if (!isManual && !isSop && !isThb) return;

      // ---------- SEARCH ----------
      var mmSearch = document.getElementById('mm-search-input');
      if (mmSearch) mmSearch.oninput = function (e) { S.mmSearch = e.target.value; render(); };
      var sopSearch = document.getElementById('sop-search-input');
      if (sopSearch) sopSearch.oninput = function (e) { S.sopSearch = e.target.value; render(); };
      var thbSearch = document.getElementById('thb-search-input');
      if (thbSearch) thbSearch.oninput = function (e) { S.thbSearch = e.target.value; render(); };

      // ---------- FILTERS ----------
      var mmDir = document.getElementById('mm-filter-directorate');
      if (mmDir) mmDir.onchange = function (e) { S.mmDirectorate = e.target.value; S.openKebab = null; render(); };

      var sopDir = document.getElementById('sop-filter-directorate');
      if (sopDir) sopDir.onchange = function (e) {
        S.sopDirectorate = e.target.value; S.sopDivision = 'ALL'; S.sopDepartment = 'ALL'; S.openKebab = null; render();
      };
      var sopDiv = document.getElementById('sop-filter-division');
      if (sopDiv) sopDiv.onchange = function (e) {
        S.sopDivision = e.target.value; S.sopDepartment = 'ALL'; S.openKebab = null; render();
      };
      var sopDept = document.getElementById('sop-filter-department');
      if (sopDept) sopDept.onchange = function (e) { S.sopDepartment = e.target.value; S.openKebab = null; render(); };

      var thbDir = document.getElementById('thb-filter-directorate');
      if (thbDir) thbDir.onchange = function (e) {
        S.thbDirectorate = e.target.value; S.thbDivision = 'ALL'; S.thbDepartment = 'ALL'; S.openKebab = null; render();
      };
      var thbDiv = document.getElementById('thb-filter-division');
      if (thbDiv) thbDiv.onchange = function (e) {
        S.thbDivision = e.target.value; S.thbDepartment = 'ALL'; S.openKebab = null; render();
      };
      var thbDept = document.getElementById('thb-filter-department');
      if (thbDept) thbDept.onchange = function (e) { S.thbDepartment = e.target.value; S.openKebab = null; render(); };

      // ---------- KEBAB ----------
      bind(root, '[data-kebab]', function (el) {
        var parts = (el.dataset.kebab || '').split(':');
        var type = parts[0], id = parts.slice(1).join(':');
        if (S.openKebab && S.openKebab.type === type && S.openKebab.id === id) S.openKebab = null;
        else S.openKebab = { type: type, id: id };
        render();
      });

      // ---------- EXPORT PDF (detail dokumen) ----------
      bind(root, '[data-export-pdf]', function (el) {
        try { window.print(); } catch (e) { alert('Gunakan Print > Save as PDF pada browser'); }
      });

      // ---------- BAB TOGGLE + CRUD (manual / sop / handbook) ----------
      function findDoc(docType, docId){
        if(docType==='manual') return (S.manuals||[]).find(function(x){return x.id===docId;});
        if(docType==='sop') return (S.sops||[]).find(function(x){return x.id===docId;});
        return (S.handbooks||[]).find(function(x){return x.id===docId;});
      }
      bind(root, '[data-toggle-chapter]', function (el) {
        var parts=(el.dataset.toggleChapter||'').split(':');
        var docId=parts[1], chapId=parts.slice(2).join(':');
        if(!S.docOpen) S.docOpen={};
        var key=docId+':'+chapId;
        if(!(key in S.docOpen)){
          var doc=findDoc(parts[0], docId);
          var idx=doc && doc.chapters ? doc.chapters.findIndex(function(c){return c.id===chapId;}) : -1;
          S.docOpen[key]=(idx===0);
          // toggle dari default: jika default terbuka -> tutup, jika tertutup -> buka
          S.docOpen[key]=!S.docOpen[key];
        } else {
          S.docOpen[key]=!S.docOpen[key];
        }
        render();
      });
      bind(root, '[data-add-chapter]', function (el) {
        var parts=(el.dataset.addChapter||'').split(':');
        if(parts[0]==='sop' || parts[0]==='handbook'){ alert('Bab SOP / Handbook format pasti dan tidak bisa ditambah'); return; }
        S.modal={kind:'addChapter', docType:parts[0], docId:parts.slice(1).join(':')};
        render();
      });
      bind(root, '[data-edit-chapter]', function (el) {
        var parts=(el.dataset.editChapter||'').split(':');
        var docType=parts[0], docId=parts[1], chapId=parts.slice(2).join(':');
        S.modal={kind:'editChapter', docType:docType, docId:docId, chapId:chapId};
        render();
      });
      bind(root, '[data-delete-chapter]', function (el) {
        var parts=(el.dataset.deleteChapter||'').split(':');
        var docType=parts[0], docId=parts[1], chapId=parts.slice(2).join(':');
        if(docType==='sop' || docType==='handbook'){ alert('Bab SOP / Handbook format pasti dan tidak bisa dihapus'); return; }
        var doc=findDoc(docType, docId);
        var ch=doc && doc.chapters ? doc.chapters.find(function(c){return c.id===chapId;}) : null;
        if(ch && (ch.title||'').toLowerCase()==='pendahuluan'){ alert('Bab Pendahuluan wajib ada dan tidak bisa dihapus'); return; }
        S.modal={kind:'deleteChapter', docType:docType, docId:docId, chapId:chapId, chapTitle:ch?ch.title:''};
        render();
      });
      bind(root, '[data-save-chapter]', function (el) {
        var parts=(el.dataset.saveChapter||'').split(':');
        var docType=parts[0], docId=parts[1], chapId=parts.slice(2).join(':');
        var doc=findDoc(docType, docId);
        if(!doc) return;
        if(!doc.chapters) doc.chapters=[];
        var lockedFormat=(docType==='sop' || docType==='handbook');
        var title=val('doc-chap-title'), content=val('doc-chap-content');
        if(!chapId){
          if(lockedFormat){ alert('Bab SOP / Handbook format pasti dan tidak bisa ditambah'); S.modal=null; render(); return; }
          if(!title){ alert('Judul bab wajib diisi'); return; }
          var nid='bab-'+App.uid();
          doc.chapters.push({id:nid, title:title, content:content});
          if(!S.docOpen) S.docOpen={};
          S.docOpen[docId+':'+nid]=true;
        } else {
          var ch=doc.chapters.find(function(c){return c.id===chapId;});
          if(!ch) return;
          if(lockedFormat || (ch.title||'').toLowerCase()==='pendahuluan'){
            if(!content){ alert('Isi bab wajib diisi'); return; }
            ch.content=content;
          } else {
            if(!title){ alert('Judul bab wajib diisi'); return; }
            ch.title=title; ch.content=content;
          }
        }
        doc.updated=App.getCurrentDateTime(); doc.updatedBy='Anda';
        S.modal=null; render();
      });
      bind(root, '[data-confirm-delete-chapter]', function (el) {
        var parts=(el.dataset.confirmDeleteChapter||'').split(':');
        var docType=parts[0], docId=parts[1], chapId=parts.slice(2).join(':');
        if(docType==='sop' || docType==='handbook'){ alert('Bab SOP / Handbook format pasti dan tidak bisa dihapus'); S.modal=null; render(); return; }
        var doc=findDoc(docType, docId);
        if(doc && doc.chapters){
          var ch=doc.chapters.find(function(c){return c.id===chapId;});
          if(ch && (ch.title||'').toLowerCase()==='pendahuluan'){ alert('Bab Pendahuluan tidak bisa dihapus'); S.modal=null; render(); return; }
          doc.chapters=doc.chapters.filter(function(c){return c.id!==chapId;});
          doc.updated=App.getCurrentDateTime(); doc.updatedBy='Anda';
        }
        S.modal=null; render();
      });

      // ---------- MANUAL MUTU CRUD (list nama dokumen, filter direktorat) ----------
      bind(root, '[data-add-manual]', function () { S.modal = { kind: 'addManual' }; S.openKebab = null; render(); });
      bind(root, '[data-view-manual]', function (el) {
        S.mmDetailId = el.dataset.viewManual; S.page = 'governance-quality-manual-detail'; S.openKebab = null; render();
        var sc = document.getElementById('main-scroll-content'); if (sc) sc.scrollTop = 0;
      });
      bind(root, '[data-edit-manual]', function (el) { S.modal = { kind: 'editManual', id: el.dataset.editManual }; S.openKebab = null; render(); });
      bind(root, '[data-delete-manual]', function (el) { S.modal = { kind: 'deleteManual', id: el.dataset.deleteManual }; S.openKebab = null; render(); });
      bind(root, '[data-back-to-manual-list]', function () { S.page = 'governance-quality-manual'; S.mmDetailId = null; render(); });
      bind(root, '[data-save-manual]', function (el) {
        var editId = el.dataset.saveManual;
        var name = val('doc-mm-name'), code = val('doc-mm-code');
        if (!name || !code) { alert('Nama dan Kode dokumen wajib diisi'); return; }
        var purpose=val('doc-mm-purpose'), scope=val('doc-mm-scope'), content=val('doc-mm-content');
        var payload = {
          name: name, code: code,
          directorateId: val('doc-mm-dir') || 'ALL',
          version: val('doc-mm-version') || 'v1.0',
          status: val('doc-mm-status') || 'Draft',
          updated: val('doc-mm-updated') || App.getCurrentDateTime(),
          updatedBy: 'Anda',
          purpose: purpose, scope: scope, content: content
        };
        if (editId) {
          var m = (S.manuals || []).find(function (x) { return x.id === editId; });
          if (m){
            Object.assign(m, payload);
            if(!m.chapters || !m.chapters.length){
              m.chapters=[{id:'bab-pendahuluan', title:'Pendahuluan', content:(purpose+(scope?'\n'+scope:''))||'-'}];
              if(content) m.chapters.push({id:'bab-'+App.uid(), title:'Isi Dokumen', content:content});
            } else {
              var pend=m.chapters.find(function(c){return (c.title||'').toLowerCase()==='pendahuluan';});
              if(pend) pend.content=(purpose+(scope?'\n'+scope:''))||pend.content;
            }
          }
        } else {
          var chapters=[{id:'bab-pendahuluan', title:'Pendahuluan', content:(purpose+(scope?'\n'+scope:''))||'-'}];
          if(content) chapters.push({id:'bab-'+App.uid(), title:'Isi Dokumen', content:content});
          S.manuals.unshift(Object.assign({ id: 'mm-' + App.uid(), chapters:chapters }, payload));
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-manual]', function (el) {
        var id = el.dataset.confirmDeleteManual;
        S.manuals = (S.manuals || []).filter(function (x) { return x.id !== id; });
        if (S.mmDetailId === id) { S.mmDetailId = null; S.page = 'governance-quality-manual'; }
        S.modal = null; render();
      });

      // ---------- SOP CRUD + draw.io ----------
      bind(root, '[data-add-sop]', function () { S.modal = { kind: 'addSop' }; S.openKebab = null; render(); });
      bind(root, '[data-view-sop]', function (el) {
        S.sopDetailId = el.dataset.viewSop; S.page = 'sop-detail'; S.openKebab = null; render();
        var sc = document.getElementById('main-scroll-content'); if (sc) sc.scrollTop = 0;
      });
      bind(root, '[data-edit-sop-drawio]', function (el) {
        var id = el.dataset.editSopDrawio;
        var s = (S.sops || []).find(function (x) { return x.id === id; });
        S.openKebab = null; render();
        openDrawio(s);
      });
      bind(root, '[data-download-sop]', function (el) {
        var s = (S.sops || []).find(function (x) { return x.id === el.dataset.downloadSop; });
        downloadPreview(s);
      });
      bind(root, '[data-delete-sop]', function (el) { S.modal = { kind: 'deleteSop', id: el.dataset.deleteSop }; S.openKebab = null; render(); });
      bind(root, '[data-back-to-sop-list]', function () { S.page = 'sop'; S.sopDetailId = null; render(); });
      // modal internal cascade: ganti direktorat -> refresh divisi
      var sopModalDir = document.getElementById('doc-sop-dir');
      if (sopModalDir) sopModalDir.onchange = function (e) {
        var divSel = document.getElementById('doc-sop-div');
        var deptSel = document.getElementById('doc-sop-dept');
        if (!divSel) return;
        var divs = App.docDivisions(e.target.value);
        divSel.innerHTML = '<option value="">-- Pilih --</option>' + divs.map(function (v) { return '<option value="' + v.id + '">' + v.name + '</option>'; }).join('');
        if (deptSel) deptSel.innerHTML = '<option value="">-- Pilih --</option>';
      };
      var sopModalDiv = document.getElementById('doc-sop-div');
      if (sopModalDiv) sopModalDiv.onchange = function (e) {
        var deptSel = document.getElementById('doc-sop-dept');
        if (!deptSel) return;
        var deps = App.docDepartments(e.target.value);
        deptSel.innerHTML = '<option value="">-- Pilih --</option>' + deps.map(function (v) { return '<option value="' + v.id + '">' + v.name + '</option>'; }).join('');
      };
      bind(root, '[data-save-sop]', function (el) {
        var editId = el.dataset.saveSop;
        var name = val('doc-sop-name'), code = val('doc-sop-code');
        if (!name || !code) { alert('Nama dan Kode SOP wajib diisi'); return; }
        var detailProses = val('doc-sop-detailproses') || val('doc-sop-steps');
        var purpose=val('doc-sop-purpose'), scope=val('doc-sop-scope'), reference=val('doc-sop-reference'), definitions=val('doc-sop-definitions'), communication=val('doc-sop-communication');
        var payload = {
          name: name, code: code,
          directorateId: val('doc-sop-dir') || 'ALL',
          divisionId: val('doc-sop-div') || '',
          departmentId: val('doc-sop-dept') || '',
          version: val('doc-sop-version') || 'v1.0',
          status: val('doc-sop-status') || 'Draft',
          pic: val('doc-sop-pic'),
          purpose: purpose,
          scope: scope,
          reference: reference,
          definitions: definitions,
          detailProses: detailProses,
          communication: communication,
          steps: detailProses,
          updated: App.getCurrentDateTime(), updatedBy: 'Anda'
        };
        function buildDefaultChapters(){
          return [
            {id:'bab-penjelasan', title:'Penjelasan Umum', content:'Maksud dan Tujuan:\n'+(purpose||'-')+'\n\nRuang Lingkup:\n'+(scope||'-')+'\n\nReferensi:\n'+(reference||'-')+'\n\nDefinisi Istilah:\n'+(definitions||'-')},
            {id:'bab-detail', title:'Detail Proses', content:detailProses||'-'},
            {id:'bab-komunikasi', title:'Proses Komunikasi', content:communication||'-'}
          ];
        }
        if (editId) {
          var s = (S.sops || []).find(function (x) { return x.id === editId; });
          if (s){
            var custom=(s.chapters||[]).slice(3);
            Object.assign(s, payload);
            s.chapters=buildDefaultChapters().concat(custom);
          }
        } else {
          var preview = App.sopFlowchartSVG(payload.code, payload.name);
          S.sops.unshift(Object.assign({ id: 'sop-' + App.uid(), drawioUrl: '', preview: preview, chapters:buildDefaultChapters() }, payload));
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-sop]', function (el) {
        var id = el.dataset.confirmDeleteSop;
        S.sops = (S.sops || []).filter(function (x) { return x.id !== id; });
        if (S.sopDetailId === id) { S.sopDetailId = null; S.page = 'sop'; }
        S.modal = null; render();
      });

      // ---------- HANDBOOK CRUD ----------
      bind(root, '[data-add-handbook]', function () { S.modal = { kind: 'addHandbook' }; S.openKebab = null; render(); });
      bind(root, '[data-view-handbook]', function (el) {
        S.thbDetailId = el.dataset.viewHandbook; S.page = 'technical-handbook-detail'; S.openKebab = null; render();
        var sc = document.getElementById('main-scroll-content'); if (sc) sc.scrollTop = 0;
      });
      bind(root, '[data-edit-handbook]', function (el) { S.modal = { kind: 'editHandbook', id: el.dataset.editHandbook }; S.openKebab = null; render(); });
      bind(root, '[data-delete-handbook]', function (el) { S.modal = { kind: 'deleteHandbook', id: el.dataset.deleteHandbook }; S.openKebab = null; render(); });
      bind(root, '[data-back-to-handbook-list]', function () { S.page = 'technical-handbook'; S.thbDetailId = null; render(); });
      var thbModalDir = document.getElementById('doc-thb-dir');
      if (thbModalDir) thbModalDir.onchange = function (e) {
        var divSel = document.getElementById('doc-thb-div');
        var deptSel = document.getElementById('doc-thb-dept');
        if (!divSel) return;
        var divs = App.docDivisions(e.target.value);
        divSel.innerHTML = '<option value="">-- Pilih --</option>' + divs.map(function (v) { return '<option value="' + v.id + '">' + v.name + '</option>'; }).join('');
        if (deptSel) deptSel.innerHTML = '<option value="">-- Pilih --</option>';
      };
      var thbModalDiv = document.getElementById('doc-thb-div');
      if (thbModalDiv) thbModalDiv.onchange = function (e) {
        var deptSel = document.getElementById('doc-thb-dept');
        if (!deptSel) return;
        var deps = App.docDepartments(e.target.value);
        deptSel.innerHTML = '<option value="">-- Pilih --</option>' + deps.map(function (v) { return '<option value="' + v.id + '">' + v.name + '</option>'; }).join('');
      };
      bind(root, '[data-save-handbook]', function (el) {
        var editId = el.dataset.saveHandbook;
        var name = val('doc-thb-name'), code = val('doc-thb-code');
        if (!name || !code) { alert('Judul dan Kode handbook wajib diisi'); return; }
        var summary=val('doc-thb-summary'), tools=val('doc-thb-tools'), spec=val('doc-thb-spec'), steps=val('doc-thb-steps');
        var payload = {
          name: name, code: code, category: val('doc-thb-cat') || 'Umum',
          directorateId: val('doc-thb-dir') || 'ALL',
          divisionId: val('doc-thb-div') || '', departmentId: val('doc-thb-dept') || '',
          version: val('doc-thb-version') || 'v1.0', status: val('doc-thb-status') || 'Berlaku',
          summary: summary, tools: tools,
          spec: spec, steps: steps,
          updated: App.getCurrentDateTime(), updatedBy: 'Anda'
        };
        function buildChapters(){
          var ch=[{id:'bab-pendahuluan', title:'Pendahuluan', content:summary||'-'}];
          if(tools) ch.push({id:'bab-alat', title:'Alat dan Bahan', content:tools});
          if(spec) ch.push({id:'bab-spec', title:'Spesifikasi', content:spec});
          if(steps) ch.push({id:'bab-langkah', title:'Langkah Kerja', content:steps});
          return ch;
        }
        if (editId) {
          var h = (S.handbooks || []).find(function (x) { return x.id === editId; });
          if (h){
            var custom=(h.chapters||[]).filter(function(c){return ['Pendahuluan','Alat dan Bahan','Spesifikasi','Langkah Kerja','Alat dan bahan'].indexOf(c.title)<0;});
            Object.assign(h, payload);
            h.chapters=buildChapters().concat(custom);
          }
        } else {
          S.handbooks.unshift(Object.assign({ id: 'thb-' + App.uid(), chapters:buildChapters() }, payload));
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-handbook]', function (el) {
        var id = el.dataset.confirmDeleteHandbook;
        S.handbooks = (S.handbooks || []).filter(function (x) { return x.id !== id; });
        if (S.thbDetailId === id) { S.thbDetailId = null; S.page = 'technical-handbook'; }
        S.modal = null; render();
      });
    }
  };
})(window);
