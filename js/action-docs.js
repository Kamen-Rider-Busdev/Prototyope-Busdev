// Action Handlers: Manual / SOP / Handbook / KB — metadata-only edit, tiptap view, draw.io SOP
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
    var title = sop ? (sop.code + ' ' + sop.name) : 'SOP Baru';
    try { window.open('https://app.diagrams.net/?title=' + encodeURIComponent(title) + '&splash=0', '_blank'); } catch (e) {}
  }
  function findDoc(S, docType, docId) {
    if (docType === 'manual') return (S.manuals || []).find(function (x) { return x.id === docId; });
    if (docType === 'sop') return (S.sops || []).find(function (x) { return x.id === docId; });
    if (docType === 'handbook') return (S.handbooks || []).find(function (x) { return x.id === docId; });
    return (S.kbs || []).find(function (x) { return x.id === docId; });
  }
  window.ActionDocs = {
    attach: function (root, S, render, App) {
      if (!S.page) return;
      var isDb = S.page === 'database-management';
      var isDbPrj = S.page === 'database-project';
      var isQuery = S.page === 'query-management';
      var active = (S.page === 'governance-quality-manual' || S.page === 'governance-quality-manual-detail'
        || S.page === 'sop' || S.page === 'sop-detail'
        || S.page === 'technical-handbook' || S.page === 'technical-handbook-detail'
        || S.page === 'knowledge-base' || S.page === 'knowledge-base-detail' || isDb || isDbPrj || isQuery);

      if(isQuery){
        if(window.App && window.App.seedQueriesIfEmpty){ try{ window.App.seedQueriesIfEmpty(); }catch(e){} }
        var qSearch = document.getElementById('query-search-input');
        if(qSearch) qSearch.oninput = function(e){ S.querySearch = e.target.value; render(); };
        bind(root, '[data-view-query]', function(el){
          S.queryDetailId = el.dataset.viewQuery;
          S.queryEditMode = false; S.queryDraft = '';
          S.openKebab = null; render();
          var scq = document.getElementById('main-scroll-content'); if(scq) scq.scrollTop=0;
        });
        bind(root, '[data-back-to-query-list]', function(){
          S.queryDetailId = null; S.queryEditMode = false; S.queryDraft = '';
          render();
        });
        bind(root, '[data-add-query]', function(){ S.modal = { kind: 'addQuery' }; S.openKebab = null; render(); });
        bind(root, '[data-edit-query]', function(el){ S.modal = { kind: 'editQuery', id: el.dataset.editQuery }; S.openKebab = null; render(); });
        bind(root, '[data-delete-query]', function(el){ S.modal = { kind: 'deleteQuery', id: el.dataset.deleteQuery }; S.openKebab = null; render(); });
        bind(root, '[data-save-query]', function(el){
          var editId = el.dataset.saveQuery;
          var name = val('query-name');
          var sql = (document.getElementById('query-sql')||{}).value || '';
          sql = sql.trim();
          if(!name || !sql){ alert('Nama query dan SQL wajib diisi.'); return; }
          if(editId){
            var q = (S.queryList||[]).find(function(x){ return x.id===editId; });
            if(q){ q.name = name; q.sql = sql; q.updated = App.getCurrentDateTime(); }
          } else {
            if(!S.queryList) S.queryList = [];
            S.queryList.unshift({ id: 'qry-' + App.uid(), name: name, sql: sql, updated: App.getCurrentDateTime() });
          }
          S.modal = null; render();
        });
        bind(root, '[data-confirm-delete-query]', function(el){
          var id = el.dataset.confirmDeleteQuery;
          S.queryList = (S.queryList||[]).filter(function(x){ return x.id!==id; });
          if(S.queryDetailId===id){ S.queryDetailId = null; S.queryEditMode = false; S.queryDraft = ''; }
          S.modal = null; render();
        });
        bind(root, '[data-edit-query-text]', function(el){
          var q = (S.queryList||[]).find(function(x){ return x.id===el.dataset.editQueryText; });
          if(!q) return;
          S.queryEditMode = true; S.queryDraft = q.sql || '';
          render();
          setTimeout(function(){ var ta = root.querySelector('[data-query-textarea]'); if(ta){ try{ta.focus();}catch(e){} } }, 60);
        });
        bind(root, '[data-cancel-query-edit]', function(){ S.queryEditMode = false; S.queryDraft = ''; render(); });
        bind(root, '[data-save-query-edit]', function(el){
          var q = (S.queryList||[]).find(function(x){ return x.id===el.dataset.saveQueryEdit; });
          var ta = root.querySelector('[data-query-textarea]');
          var text = ta ? ta.value : S.queryDraft;
          if(!text || !text.trim()){ alert('Query tidak boleh kosong.'); return; }
          if(q){ q.sql = text; q.updated = App.getCurrentDateTime(); }
          S.queryEditMode = false; S.queryDraft = ''; render();
        });
        var qTa = root.querySelector('[data-query-textarea]');
        if(qTa){ qTa.oninput = function(e){ S.queryDraft = e.target.value; }; }
      }

      if(isDbPrj){
        var dbPrjSearch = document.getElementById('dbprj-search-input');
        if (dbPrjSearch) dbPrjSearch.oninput = function (e) { S.dbProjectSearch = e.target.value; render(); };

        bind(root, '[data-view-dbproject]', function(el){
          S.dbProjectDetailId = el.dataset.viewDbproject;
          S.dbProjectView = 'diagram';
          S.dbProjectActiveDb = null;
          S.dbProjectActiveTable = null;
          S.openKebab = null; render();
          var sc = document.getElementById('main-scroll-content'); if(sc) sc.scrollTop=0;
        });
        bind(root, '[data-view-dbproject-dbs]', function(el){
          S.dbProjectDetailId = el.dataset.viewDbprojectDbs;
          S.dbProjectView = 'dbs';
          S.dbProjectActiveDb = null;
          S.dbProjectActiveTable = null;
          S.openKebab = null; render();
          var sc2 = document.getElementById('main-scroll-content'); if(sc2) sc2.scrollTop=0;
        });
        bind(root, '[data-view-dbproject-tables]', function(el){
          var parts = (el.dataset.viewDbprojectTables||'').split('|||');
          S.dbProjectDetailId = parts[0];
          S.dbProjectActiveDb = parts[1];
          S.dbProjectActiveTable = null;
          S.dbProjectView = 'tables';
          S.openKebab = null; render();
          var sc3 = document.getElementById('main-scroll-content'); if(sc3) sc3.scrollTop=0;
        });
        bind(root, '[data-view-dbproject-attrs]', function(el){
          var parts = (el.dataset.viewDbprojectAttrs||'').split('|||');
          S.dbProjectDetailId = parts[0];
          S.dbProjectActiveDb = parts[1];
          S.dbProjectActiveTable = parts[2];
          S.dbProjectView = 'attrs';
          S.openKebab = null; render();
          var sc4 = document.getElementById('main-scroll-content'); if(sc4) sc4.scrollTop=0;
        });
        bind(root, '[data-back-to-dbproject-list]', function(){
          S.dbProjectDetailId = null;
          S.dbProjectView = null;
          S.dbProjectActiveDb = null;
          S.dbProjectActiveTable = null;
          render();
        });
        bind(root, '[data-add-dbproject]', function(){
          S.modal = { kind: 'addDbProject' };
          S.openKebab = null; render();
        });
        bind(root, '[data-edit-dbproject]', function(el){
          S.modal = { kind: 'editDbProject', id: el.dataset.editDbproject };
          S.openKebab = null; render();
        });
        bind(root, '[data-delete-dbproject]', function(el){
          S.modal = { kind: 'deleteDbProject', id: el.dataset.deleteDbproject };
          S.openKebab = null; render();
        });
        bind(root, '[data-save-dbproject]', function(el){
          var editId = el.dataset.saveDbproject;
          var name = val('dbprj-name');
          var desc = val('dbprj-desc');
          var checkedDbs = [];
          root.querySelectorAll('input[name="dbprj-db-check"]:checked').forEach(function (cb) {
            checkedDbs.push(cb.value);
          });

          if (!name) {
            alert('Nama Project wajib diisi.');
            return;
          }
          if (!checkedDbs.length) {
            alert('Pilih minimal 1 database terkait.');
            return;
          }

          if (editId) {
            var prj = (S.dbProjectList || []).find(function (x) { return x.id === editId; });
            if (prj) {
              prj.name = name;
              prj.description = desc;
              prj.dbs = checkedDbs;
              prj.updated = App.getCurrentDateTime();
              prj.updatedBy = 'Anda';
            }
          } else {
            if (!S.dbProjectList) S.dbProjectList = [];
            S.dbProjectList.unshift({
              id: 'dbprj-' + App.uid(),
              code: '',
              name: name,
              description: desc,
              dbs: checkedDbs,
              updated: App.getCurrentDateTime(),
              updatedBy: 'Anda'
            });
          }
          S.modal = null;
          render();
        });
        bind(root, '[data-confirm-delete-dbproject]', function(el){
          var id = el.dataset.confirmDeleteDbproject;
          S.dbProjectList = (S.dbProjectList || []).filter(function (x) { return x.id !== id; });
          if (S.dbProjectDetailId === id) {
            S.dbProjectDetailId = null;
            S.dbProjectView = null;
            S.dbProjectActiveDb = null;
            S.dbProjectActiveTable = null;
          }
          S.modal = null;
          render();
        });
      }
      // database management — CRUD + dbdiagram editor (kiri code, kanan visual)
      if(isDb){
        bind(root, '[data-db-view-tables]', function(el){ S.dbActiveDb = el.dataset.dbViewTables; S.dbView='tables'; S.dbActiveTable=null; render(); var sc=document.getElementById('main-scroll-content'); if(sc) sc.scrollTop=0; });
        bind(root, '[data-db-view-attrs]', function(el){
          var full = el.dataset.dbViewAttrs||'';
          var dot = full.lastIndexOf('.');
          var db = dot>-1 ? full.substring(0,dot) : S.dbActiveDb;
          var tbl = dot>-1 ? full.substring(dot+1) : full;
          if(!db) db = S.dbActiveDb;
          S.dbActiveDb = db; S.dbActiveTable = tbl; S.dbView='attributes'; render(); var sc2=document.getElementById('main-scroll-content'); if(sc2) sc2.scrollTop=0;
        });
        bind(root, '[data-db-back-databases]', function(){ S.dbView='databases'; S.dbActiveDb=null; S.dbActiveTable=null; S.dbEditorScope='overall'; S.dbCodeDraft=null; render(); });
        bind(root, '[data-db-back-tables]', function(){ S.dbView='tables'; S.dbActiveTable=null; render(); });
        // filter peruntukan
        bind(root, '[data-db-filter-toggle]', function(e){
          e.stopPropagation();
          S.dbFilterOpen = !S.dbFilterOpen; S.dbAddMenuOpen=false; render();
        });
        bind(root, '[data-db-peruntukan-filter]', function(el){
          S.dbPeruntukanFilter = el.dataset.dbPeruntukanFilter || 'ALL';
          S.dbFilterOpen=false; render();
        });
        var perSel = root.querySelector('[data-db-peruntukan-filter-select]');
        if(perSel){
          perSel.onchange = function(e){
            S.dbPeruntukanFilter = e.target.value || 'ALL';
            render();
          };
          perSel.onclick = function(e){ e.stopPropagation(); };
        }
        // tambah via SQL plain text
        bind(root, '[data-db-add-menu-toggle]', function(e){
          e.stopPropagation();
          S.dbAddMenuOpen = !S.dbAddMenuOpen; S.dbFilterOpen=false; render();
        });
        bind(root, '[data-db-add-sql]', function(el){
          var subtype=el.dataset.dbAddSql||'all';
          S.dbAddMenuOpen=false; S.modal={kind:'addViaSQL', subtype:subtype}; render();
        });
        bind(root, '[data-save-sql]', function(el){
          var subtype=el.dataset.saveSql||'all';
          var code=(document.getElementById('db-sql-code')||{}).value||'';
          code=code.trim(); if(!code){ alert('Kode SQL wajib diisi'); return; }
          var msgs=[];
          function findDb(name){ return (typeof DB_MODEL!=='undefined'? DB_MODEL.databases.find(d=>d.name===name):null); }
          var mDb = code.match(/CREATE\s+DATABASE\s+(\w+)\s*;?/i);
          if(mDb){
            var dbName=mDb[1].trim().toLowerCase();
            if(DB_MODEL.databases.some(d=>d.name===dbName)) msgs.push('Database '+dbName+' sudah ada');
            else {
              var per = 'Sistem HRIS';
              if(dbName.includes('sales')) per='Sistem SPVR';
              else if(dbName.includes('coverage')) per='Coverage & Infra';
              DB_MODEL.databases.push({name:dbName, peruntukan:per, tables:[]});
              msgs.push('Database '+dbName+' ditambahkan');
            }
          }
          var tableRe=/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w\.]+)\s*\(([\s\S]*?)\)\s*;?/gi;
          var tm; while((tm=tableRe.exec(code))!==null){
            var full=tm[1].trim();
            var body=tm[2];
            var parts=full.split('.');
            var tblName, dbName2;
            if(parts.length===2){ dbName2=parts[0]; tblName=parts[1]; }
            else { tblName=parts[0]; dbName2 = S.dbActiveDb || S.dbEditorScope || (DB_MODEL.databases[0]&&DB_MODEL.databases[0].name) || 'griya_company'; if(dbName2==='overall') dbName2=DB_MODEL.databases[0].name; }
            var db=findDb(dbName2);
            if(!db){ msgs.push('Database '+dbName2+' tidak ditemukan untuk tabel '+tblName); continue; }
            if(db.tables.some(t=>t.name===tblName)){ msgs.push('Tabel '+full+' sudah ada'); continue; }
            var cols=[];
            body.split(',').forEach(function(l){
              l=l.trim(); if(!l) return;
              var cm=l.match(/^(\w+)\s+(\w+)(.*)$/);
              if(!cm) return;
              var cname=cm[1], ctype=cm[2], rest=cm[3]||'';
              var isPk=/\[pk\]|PRIMARY\s+KEY/i.test(rest);
              cols.push({name:cname, type:ctype, pk:isPk, fk:false});
            });
            if(!cols.length) cols=[{name:'id',type:'bigint',pk:true,fk:false}];
            db.tables.push({name:tblName, full:dbName2+'.'+tblName, attrs:cols, fkCols:[]});
            msgs.push('Tabel '+dbName2+'.'+tblName+' ditambahkan ('+cols.length+' kolom)');
          }
          var colRe=/ALTER\s+TABLE\s+([\w\.]+)\s+ADD\s+(?:COLUMN\s+)?(\w+)\s+(\w+)[^;]*;?/gi;
          while((tm=colRe.exec(code))!==null){
            var tFull=tm[1].trim(), cName=tm[2].trim(), cType=tm[3].trim();
            var db=null, tbl=null;
            var tp=tFull.split('.');
            if(tp.length===2){ db=findDb(tp[0]); tbl=db?db.tables.find(t=>t.name===tp[1]):null; }
            else {
              var activeDbName=S.dbActiveDb||S.dbEditorScope;
              if(activeDbName==='overall') activeDbName=DB_MODEL.databases[0].name;
              db=findDb(activeDbName);
              tbl=db?db.tables.find(t=>t.name===tFull):null;
              tFull=db?db.name+'.'+tFull:tFull;
            }
            if(!tbl){ msgs.push('Tabel '+tFull+' tidak ditemukan untuk kolom '+cName); continue; }
            if(tbl.attrs.some(a=>a.name===cName)){ msgs.push('Kolom '+cName+' sudah ada di '+tFull); continue; }
            tbl.attrs.push({name:cName, type:cType, pk:false, fk:false});
            msgs.push('Kolom '+cName+' ditambahkan ke '+tFull);
          }
          var refRe=/Ref:\s*([\w\.]+)\s*>\s*([\w\.]+)/gi;
          while((tm=refRe.exec(code))!==null){
            var from=tm[1].trim(), to=tm[2].trim();
            if(from.split('.').length===2) from=(S.dbActiveDb||'griya_company')+'.'+from;
            if(to.split('.').length===2) to=(S.dbActiveDb||'griya_company')+'.'+to;
            var sIdx=from.lastIndexOf('.'), dIdx=to.lastIndexOf('.');
            var srcTbl=from.substring(0,sIdx), srcCol=from.substring(sIdx+1);
            var srcTb=null;
            if(typeof getTableByFull==='function') srcTb=getTableByFull(srcTbl);
            else {
              for(var di=0;di<DB_MODEL.databases.length;di++){ var d2=DB_MODEL.databases[di]; var t2=d2.tables.find(x=>x.full===srcTbl); if(t2){ srcTb=t2; break; } }
            }
            if(srcTb){
              var col=srcTb.attrs.find(c=>c.name===srcCol);
              if(col) col.fk=true;
              if(srcTb.fkCols.indexOf(srcCol)===-1) srcTb.fkCols.push(srcCol);
            }
            if(typeof DB_REFS!=='undefined'){
              if(!DB_REFS.some(r=>r.from===from && r.to===to)){
                var sParts=from.split('.'), dParts=to.split('.');
                var srcDbTbl=sParts.slice(0,2).join('.'), dstDbTbl=dParts.slice(0,2).join('.');
                DB_REFS.push({from, to, srcDbTbl, srcCol, dstDbTbl, dstCol:to.substring(dIdx+1)});
                msgs.push('FK '+from+' > '+to+' ditambahkan');
              }
            }
          }
          var fkRe=/ADD\s+FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s+REFERENCES\s+([\w\.]+)\s*\(\s*(\w+)\s*\)/gi;
          while((tm=fkRe.exec(code))!==null){
            var colName=tm[1].trim(), refTbl=tm[2].trim(), refCol=tm[3].trim();
            var before=code.substring(0, tm.index);
            var lastAlter=before.lastIndexOf('ALTER TABLE');
            var srcFull='';
            if(lastAlter>=0){
              var seg=before.substring(lastAlter);
              var m2=seg.match(/ALTER\s+TABLE\s+([\w\.]+)/i);
              if(m2) srcFull=m2[1].trim();
            }
            if(!srcFull) srcFull=S.dbActiveDb? S.dbActiveDb+'.unknown' : 'griya_company.unknown';
            if(srcFull.split('.').length===1) srcFull=(S.dbActiveDb||'griya_company')+'.'+srcFull;
            var srcFullCol=srcFull+'.'+colName;
            var dstFull=refTbl;
            if(dstFull.split('.').length===1) dstFull=(S.dbActiveDb||'griya_company')+'.'+dstFull;
            dstFull=dstFull+'.'+refCol;
            var sIdx2=srcFullCol.lastIndexOf('.');
            var srcTbl2=srcFullCol.substring(0,sIdx2), srcCol2=srcFullCol.substring(sIdx2+1);
            var tb2=null;
            if(typeof getTableByFull==='function') tb2=getTableByFull(srcTbl);
            if(tb2){
              var c2=tb2.attrs.find(c=>c.name===srcCol2);
              if(c2) c2.fk=true;
              if(tb2.fkCols.indexOf(srcCol2)===-1) tb2.fkCols.push(srcCol2);
            }
            if(typeof DB_REFS!=='undefined' && !DB_REFS.some(r=>r.from===srcFullCol && r.to===dstFull)){
              DB_REFS.push({from:srcFullCol, to:dstFull, srcDbTbl:srcTbl, srcCol:srcCol2, dstDbTbl:dstFull.substring(0,dstFull.lastIndexOf('.')), dstCol:refCol});
              msgs.push('FK '+srcFullCol+' > '+dstFull+' ditambahkan');
            }
          }
          S.modal=null;
          if(msgs.length) alert(msgs.join('\n'));
          else alert('Tidak ada perintah SQL yang dikenali. Contoh:\nCREATE DATABASE db_nama;\nCREATE TABLE db.t (id int [pk]);\nRef: db.t.col > db2.t2.id');
          render();
        });
        // --- list CRUD ---
        bind(root, '[data-db-add-database]', function(){ S.modal={kind:'addDatabase'}; render(); });
        bind(root, '[data-db-edit-database]', function(el){ S.modal={kind:'editDatabase', name:el.dataset.dbEditDatabase}; render(); });
        bind(root, '[data-db-delete-database]', function(el){ S.modal={kind:'deleteDatabase', name:el.dataset.dbDeleteDatabase}; render(); });
        bind(root, '[data-save-database]', function(el){
          var oldName=el.dataset.saveDatabase||'';
          var name=(document.getElementById('db-name')||{}).value||'';
          name=name.trim().toLowerCase().replace(/\s+/g,'_');
          if(!name){ alert('Nama database wajib diisi'); return; }
          if(!oldName){
            if(typeof DB_MODEL!=='undefined' && DB_MODEL.databases.some(d=>d.name===name)){ alert('Database sudah ada'); return; }
            DB_MODEL.databases.push({name:name, tables:[]});
          } else {
            var db=getDbByName(oldName);
            if(db){
              if(name!==oldName && DB_MODEL.databases.some(d=>d.name===name)){ alert('Nama sudah dipakai'); return; }
              // rename db and update full names and refs
              db.name=name;
              db.tables.forEach(tb=>{ tb.full=name+'.'+tb.name; });
              if(typeof DB_REFS!=='undefined'){
                DB_REFS.forEach(r=>{
                  if(r.srcDbTbl.startsWith(oldName+'.')){ r.srcDbTbl=name+r.srcDbTbl.substring(oldName.length); r.from=name+r.from.substring(oldName.length); }
                  if(r.dstDbTbl.startsWith(oldName+'.')){ r.dstDbTbl=name+r.dstDbTbl.substring(oldName.length); r.to=name+r.to.substring(oldName.length); }
                });
              }
              if(S.dbActiveDb===oldName) S.dbActiveDb=name;
              if(S.dbEditorScope===oldName) S.dbEditorScope=name;
            }
          }
          S.modal=null; render();
        });
        bind(root, '[data-confirm-delete-database]', function(el){
          var name=el.dataset.confirmDeleteDatabase;
          if(typeof DB_MODEL!=='undefined'){
            DB_MODEL.databases=DB_MODEL.databases.filter(d=>d.name!==name);
            if(typeof DB_REFS!=='undefined'){
              for(let i=DB_REFS.length-1;i>=0;i--){ const r=DB_REFS[i]; if(r.srcDbTbl.startsWith(name+'.')||r.dstDbTbl.startsWith(name+'.')) DB_REFS.splice(i,1); }
            }
          }
          if(S.dbActiveDb===name){ S.dbActiveDb=null; S.dbView='databases'; }
          S.modal=null; render();
        });
        // --- editor open & tabs ---
        bind(root, '[data-db-open-editor]', function(el){
          var scope=el.dataset.dbOpenEditor||'overall';
          S.dbView='editor'; S.dbEditorScope=scope; S.dbActiveDb = scope==='overall'?null:scope; S.dbCodeDraft=null; render();
          var sc=document.getElementById('main-scroll-content'); if(sc) sc.scrollTop=0;
        });
        bind(root, '[data-db-manage]', function(el){
          var scope=el.dataset.dbManage||'overall';
          S.dbView='manage'; S.dbEditorScope=scope; S.dbActiveDb = scope==='overall'?null:scope;
          var code = (typeof generateDBMLForScope==='function'?generateDBMLForScope(scope):'');
          S.dbCodeDraft = null;
          render();
          var sc2=document.getElementById('main-scroll-content'); if(sc2) sc2.scrollTop=0;
        });
        bind(root, '[data-db-manage-edit]', function(el){
          var scope=el.dataset.dbManageEdit||S.dbEditorScope||'overall';
          var getGen = window.generateDBMLForScope || (App && App.generateDBMLForScope);
          var code = getGen ? getGen(scope) : '';
          S.dbCodeDraft = code;
          render();
          setTimeout(function(){
            var ta=root.querySelector('[data-db-manage-code]');
            if(ta) try{ta.focus(); ta.setSelectionRange(0,0);}catch(e){}
          },50);
        });
        bind(root, '[data-db-diagram-scope]', function(el){
          S.dbEditorScope=el.dataset.dbDiagramScope||'overall';
          render();
        });
        bind(root, '[data-db-manage-scope]', function(el){
          S.dbEditorScope=el.dataset.dbManageScope||'overall';
          if(S.dbCodeDraft!==null && S.dbCodeDraft!==undefined){
            var getGen = window.generateDBMLForScope || (App && App.generateDBMLForScope);
            var code2 = getGen ? getGen(S.dbEditorScope) : '';
            S.dbCodeDraft=code2;
          }
          render();
        });
        // code editor in Manage view (full content)
        var manageTa=root.querySelector('[data-db-manage-code]');
        if(manageTa){
          manageTa.oninput=function(e){ S.dbCodeDraft=e.target.value; };
        }
        bind(root, '[data-db-manage-save]', function(el){
          var scope=el.dataset.dbManageSave||S.dbEditorScope||'overall';
          var ta=root.querySelector('[data-db-manage-code]');
          var text= ta? ta.value : S.dbCodeDraft;
          var parseFn = window.parseDBMLForScope || (App && App.parseDBMLForScope);
          if(parseFn){
            var res=parseFn(scope, text||'');
            if(!res.ok){ alert('Gagal parse: '+(res.msg||'cek sintaks DBML')); return; }
          }
          S.dbCodeDraft=null; render();
        });
        bind(root, '[data-db-manage-cancel]', function(){ S.dbCodeDraft=null; render(); });
        bind(root, '[data-db-editor-scope]', function(el){
          S.dbEditorScope=el.dataset.dbEditorScope||'overall';
          S.dbCodeDraft=null; render();
        });
        // code editor
        var codeTa=root.querySelector('[data-db-code-editor]');
        if(codeTa){
          codeTa.oninput=function(e){ S.dbCodeDraft=e.target.value; };
        }
        bind(root, '[data-db-editor-save]', function(el){
          var scope=el.dataset.dbEditorSave||S.dbEditorScope||'overall';
          var ta=root.querySelector('[data-db-code-editor]');
          var text= ta? ta.value : S.dbCodeDraft;
          var parseFn = window.parseDBMLForScope || (App && App.parseDBMLForScope);
          if(parseFn){
            var res=parseFn(scope, text||'');
            if(!res.ok){ alert('Gagal parse: '+(res.msg||'cek sintaks DBML')); return; }
          }
          S.dbCodeDraft=null; render();
        });
        bind(root, '[data-db-editor-cancel]', function(){ S.dbCodeDraft=null; render(); });
        bind(root, '[data-db-editor-reset]', function(){ S.dbCodeDraft=null; render(); });
        bind(root, '[data-db-export-dbml]', function(el){
          var scope=el.dataset.dbExportDbml||S.dbEditorScope||'overall';
          var getGen = window.generateDBMLForScope || (App && App.generateDBMLForScope);
          var txt = getGen ? getGen(scope) : '';
          var blob=new Blob([txt],{type:'text/plain'}); var url=URL.createObjectURL(blob);
          var a=document.createElement('a'); a.href=url; a.download=scope+'_dbml.txt'; document.body.appendChild(a); a.click(); setTimeout(()=>{try{document.body.removeChild(a); URL.revokeObjectURL(url);}catch(e){}},300);
        });
        bind(root, '[data-db-export-sql]', function(el){
          var scope=el.dataset.dbExportSql||S.dbEditorScope||'overall';
          var getGen = window.generateDBMLForScope || (App && App.generateDBMLForScope);
          var txt = getGen ? getGen(scope) : '';
          // simple SQL export: generate CREATE TABLE
          let sql='-- SQL export '+scope+'\n';
          if(scope==='overall' && typeof DB_MODEL!=='undefined'){
            DB_MODEL.databases.forEach(db=>{
              sql+=`\n-- Database ${db.name}\n`;
              db.tables.forEach(tb=>{
                sql+=`CREATE TABLE ${tb.full} (\n`;
                tb.attrs.forEach((c,i)=>{ sql+=`  ${c.name} ${c.type}${c.pk?' PRIMARY KEY':''}${i<tb.attrs.length-1?',':''}\n`; });
                sql+=`);\n`;
              });
            });
          } else {
            sql+=txt;
          }
          var blob=new Blob([sql],{type:'text/plain'}); var url=URL.createObjectURL(blob);
          var a=document.createElement('a'); a.href=url; a.download=scope+'_schema.sql'; document.body.appendChild(a); a.click(); setTimeout(()=>{try{document.body.removeChild(a); URL.revokeObjectURL(url);}catch(e){}},300);
        });
        bind(root, '[data-db-zoom]', function(el){
          var scope=el.dataset.zoomScope||S.dbEditorScope||'overall';
          var delta=parseInt(el.dataset.dbZoom||'0',10);
          if(!S.dbEditorZoom) S.dbEditorZoom=100;
          if(!S.dbEditorZoomMap) S.dbEditorZoomMap={};
          var cur=S.dbEditorZoomMap[scope]||100;
          cur=Math.min(200, Math.max(50, cur+delta));
          S.dbEditorZoomMap[scope]=cur;
          S.dbEditorZoom=cur;
          render();
        });
        bind(root, '[data-db-auto-layout]', function(el){
          var scope=el.dataset.dbAutoLayout||S.dbEditorScope||'overall';
          if(S.dbPositions) delete S.dbPositions[scope];
          render();
        });
        // drag tabel & database — tabel di dalam kotak database, database box bisa digeser, auto expand & tidak bertabrakan
        root.querySelectorAll('[data-db-drag-handle]').forEach(function(handle){
          handle.onmousedown = function(e){
            e.preventDefault(); e.stopPropagation();
            var full = handle.dataset.dbDragHandle;
            var scope = S.dbEditorScope || 'overall';
            // table positions are stored in _global for diagram view
            var posMap = (scope==='overall' || !S.dbPositions[scope]) ? S.dbPositions['_global'] : S.dbPositions[scope];
            if(!posMap || !posMap[full]) posMap=S.dbPositions['_global'];
            var pos = posMap ? posMap[full] : null;
            if(!pos) return;
            var startX=e.clientX, startY=e.clientY;
            var origX=pos.x, origY=pos.y;
            S.dbDrag={type:'table', scope, full, startX, startY, origX, origY};
            handle.style.cursor='grabbing';
            function onMove(ev){
              if(!S.dbDrag || S.dbDrag.type!=='table') return;
              var zoom=(S.dbEditorZoomMap && S.dbEditorZoomMap[scope]) ? S.dbEditorZoomMap[scope] : 100;
              var scale=zoom/100;
              var dx=(ev.clientX - S.dbDrag.startX)/scale;
              var dy=(ev.clientY - S.dbDrag.startY)/scale;
              var p=posMap[full];
              if(p){
                p.x=Math.max(0, S.dbDrag.origX+dx);
                p.y=Math.max(0, S.dbDrag.origY+dy);
                var card=root.querySelector('[data-db-card="'+CSS.escape(full)+'"]');
                if(card){ card.style.left=p.x+'px'; card.style.top=p.y+'px'; }
                // auto expand database box if table exceeds
                var dbName=full.split('.')[0];
                var dbPos=S.dbBoxPositions && S.dbBoxPositions[dbName];
                if(dbName && dbPos){
                  var needW = p.x + 220 + 12;
                  var needH = p.y + 160 + 12;
                  if(needW > dbPos.w) dbPos.w = needW;
                  if(needH > dbPos.h) dbPos.h = needH;
                  var dbEl=root.querySelector('[data-db-box="'+CSS.escape(dbName)+'"]');
                  if(dbEl){ dbEl.style.width=dbPos.w+'px'; dbEl.style.height=dbPos.h+'px'; }
                  // cek tabrakan antar kotak database — jika overlap, geser yang lain
                  if(S.dbBoxPositions){
                    Object.keys(S.dbBoxPositions).forEach(other=>{
                      if(other===dbName) return;
                      var o=S.dbBoxPositions[other];
                      if(!o) return;
                      // simple AABB collision
                      if(!(dbPos.x + dbPos.w + 24 < o.x || o.x + o.w + 24 < dbPos.x || dbPos.y + dbPos.h + 24 < o.y || o.y + o.h + 24 < dbPos.y)){
                        // tabrakan, geser other ke kanan/bawah
                        o.x = dbPos.x + dbPos.w + 24;
                        var otherEl=root.querySelector('[data-db-box="'+CSS.escape(other)+'"]');
                        if(otherEl){ otherEl.style.left=o.x+'px'; otherEl.style.top=o.y+'px'; }
                      }
                    });
                  }
                }
              }
            }
            function onUp(){
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onUp);
              handle.style.cursor='grab';
              S.dbDrag=null;
              render();
            }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          };
        });
        root.querySelectorAll('[data-db-box-drag]').forEach(function(handle){
          handle.onmousedown = function(e){
            e.preventDefault(); e.stopPropagation();
            var dbName=handle.dataset.dbBoxDrag;
            var scope=S.dbEditorScope||'overall';
            if(!S.dbBoxPositions || !S.dbBoxPositions[dbName]) return;
            var pos=S.dbBoxPositions[dbName];
            var startX=e.clientX, startY=e.clientY;
            var origX=pos.x, origY=pos.y;
            S.dbDrag={type:'db', dbName, startX, startY, origX, origY};
            handle.style.cursor='grabbing';
            function onMove(ev){
              if(!S.dbDrag || S.dbDrag.type!=='db') return;
              var zoom=(S.dbEditorZoomMap && S.dbEditorZoomMap[scope]) ? S.dbEditorZoomMap[scope] : 100;
              var scale=zoom/100;
              var dx=(ev.clientX - S.dbDrag.startX)/scale;
              var dy=(ev.clientY - S.dbDrag.startY)/scale;
              var p=S.dbBoxPositions[dbName];
              if(p){
                p.x=Math.max(0, S.dbDrag.origX+dx);
                p.y=Math.max(0, S.dbDrag.origY+dy);
                var el=root.querySelector('[data-db-box="'+CSS.escape(dbName)+'"]');
                if(el){ el.style.left=p.x+'px'; el.style.top=p.y+'px'; }
              }
            }
            function onUp(){
              document.removeEventListener('mousemove', onMove);
              document.removeEventListener('mouseup', onUp);
              handle.style.cursor='grab';
              S.dbDrag=null;
              // cek tabrakan antar DB setelah drag selesai
              var pos=S.dbBoxPositions[dbName];
              Object.keys(S.dbBoxPositions).forEach(other=>{
                if(other===dbName) return;
                var o=S.dbBoxPositions[other];
                if(!(pos.x + pos.w + 24 < o.x || o.x + o.w + 24 < pos.x || pos.y + pos.h + 24 < o.y || o.y + o.h + 24 < pos.y)){
                  o.x = pos.x + pos.w + 24;
                }
              });
              render();
            }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          };
        });
        // --- table CRUD from visual/editor ---
        bind(root, '[data-db-add-table]', function(el){
          var scope=el.dataset.dbAddTable||S.dbEditorScope||S.dbActiveDb||'';
          if(scope==='overall'){ alert('Pilih tab per database untuk tambah tabel. Keseluruhan hanya preview.'); return; }
          S.modal={kind:'addTable', db:scope}; render();
        });
        bind(root, '[data-db-edit-table]', function(el){ var full=el.dataset.dbEditTable; var parts=full.split('.'); var tbl=parts.pop(); var db=parts.join('.'); S.modal={kind:'editTable', full:full, db:db, table:tbl}; render(); });
        bind(root, '[data-db-delete-table]', function(el){ S.modal={kind:'deleteTable', full:el.dataset.dbDeleteTable}; render(); });
        bind(root, '[data-save-table]', function(el){
          var dbName=el.dataset.saveTable;
          var name=(document.getElementById('db-table-name')||{}).value||'';
          name=name.trim(); if(!name){ alert('Nama tabel wajib'); return; }
          var db=getDbByName(dbName);
          if(!db){ alert('Database tidak ditemukan'); return; }
          if(db.tables.some(t=>t.name===name)){ alert('Tabel sudah ada'); return; }
          db.tables.push({name:name, full:dbName+'.'+name, attrs:[{name:'id',type:'bigint',pk:true,fk:false}], fkCols:[]});
          S.modal=null; S.dbCodeDraft=null; render();
        });
        bind(root, '[data-save-table-edit]', function(el){
          var full=el.dataset.saveTableEdit||'';
          var parts=full.split('.'); var oldTbl=parts.pop(); var dbName=parts.join('.');
          var newName=(document.getElementById('db-table-name')||{}).value||'';
          newName=newName.trim(); if(!newName){ alert('Nama wajib'); return; }
          var db=getDbByName(dbName);
          var tb=db?db.tables.find(t=>t.name===oldTbl):null;
          if(!tb){ alert('Tabel tidak ditemukan'); return; }
          if(newName!==oldTbl && db.tables.some(t=>t.name===newName)){ alert('Nama sudah dipakai'); return; }
          var oldFull=full, newFull=dbName+'.'+newName;
          tb.name=newName; tb.full=newFull;
          if(typeof DB_REFS!=='undefined'){
            DB_REFS.forEach(r=>{ if(r.srcDbTbl===oldFull) {r.srcDbTbl=newFull; r.from=newFull+'.'+r.srcCol;} if(r.dstDbTbl===oldFull){r.dstDbTbl=newFull; r.to=newFull+'.'+r.dstCol;} });
          }
          S.modal=null; S.dbCodeDraft=null; render();
        });
        bind(root, '[data-confirm-delete-table]', function(el){
          var full=el.dataset.confirmDeleteTable||'';
          var parts=full.split('.'); var tbl=parts.pop(); var dbName=parts.join('.');
          var db=getDbByName(dbName);
          if(db) db.tables=db.tables.filter(t=>t.name!==tbl);
          if(typeof DB_REFS!=='undefined'){
            for(let i=DB_REFS.length-1;i>=0;i--){ const r=DB_REFS[i]; if(r.srcDbTbl===full||r.dstDbTbl===full) DB_REFS.splice(i,1); }
          }
          S.modal=null; S.dbCodeDraft=null; render();
        });
        // --- column CRUD ---
        bind(root, '[data-db-add-attr]', function(el){ var full=el.dataset.dbAddAttr||el.dataset.dbAddColumn||''; S.modal={kind:'addAttr', full:full}; render(); });
        bind(root, '[data-db-add-column]', function(el){
          var scope=el.dataset.dbAddColumn||S.dbEditorScope||'';
          if(scope==='overall'){ alert('Pilih database terlebih dahulu'); return; }
          var db=getDbByName(scope);
          if(!db || !db.tables.length){ alert('Belum ada tabel di '+scope); return; }
          S.modal={kind:'addAttr', full:db.tables[0].full}; render();
        });
        bind(root, '[data-db-edit-attr]', function(el){
          var v=el.dataset.dbEditAttr||''; var idx=v.lastIndexOf(':'); var full=v.substring(0,idx); var attr=v.substring(idx+1);
          S.modal={kind:'editAttr', full:full, attr:attr}; render();
        });
        bind(root, '[data-db-delete-attr]', function(el){
          var v=el.dataset.dbDeleteAttr||''; var idx=v.lastIndexOf(':'); var full=v.substring(0,idx); var attr=v.substring(idx+1);
          S.modal={kind:'deleteAttr', full:full, attr:attr}; render();
        });
        // need to handle fk checkbox visibility in modal
        setTimeout(()=>{
          var fkCb=document.getElementById('db-attr-fk');
          var fkWrap=document.getElementById('db-attr-fk-target-wrap');
          if(fkCb && fkWrap){
            fkCb.onchange=function(){ fkWrap.style.display=fkCb.checked?'block':'none'; };
          }
        },0);
        bind(root, '[data-save-attr]', function(el){
          var full=el.dataset.saveAttr||'';
          var tb=getTableByFull(full);
          if(!tb){ alert('Tabel tidak ditemukan'); return; }
          var name=(document.getElementById('db-attr-name')||{}).value||'';
          var type=(document.getElementById('db-attr-type')||{}).value||'varchar';
          var isPk=(document.getElementById('db-attr-pk')||{}).checked||false;
          var isFk=(document.getElementById('db-attr-fk')||{}).checked||false;
          var fkTarget=(document.getElementById('db-attr-fk-target')||{}).value||'';
          name=name.trim(); if(!name){ alert('Nama kolom wajib'); return; }
          if(tb.attrs.some(a=>a.name===name)){ alert('Kolom sudah ada'); return; }
          tb.attrs.push({name, type, pk:isPk, fk:isFk});
          if(isFk){
            if(!tb.fkCols.includes(name)) tb.fkCols.push(name);
            if(fkTarget && typeof DB_REFS!=='undefined'){
              // expect format db.table.col or table.col
              let to=fkTarget.trim();
              if(to && !to.includes('.')) to=full+'.'+to;
              // if to is db.table.col with 3 parts, keep; if 2 parts, prefix db
              const parts=to.split('.');
              if(parts.length===2) to=full.split('.')[0]+'.'+to;
              DB_REFS.push({from:full+'.'+name, to, srcDbTbl:full, srcCol:name, dstDbTbl:to.substring(0,to.lastIndexOf('.')), dstCol:to.substring(to.lastIndexOf('.')+1)});
            }
          }
          S.modal=null; S.dbCodeDraft=null; render();
        });
        bind(root, '[data-save-attr-edit]', function(el){
          var v=el.dataset.saveAttrEdit||''; var idx=v.lastIndexOf(':'); var full=v.substring(0,idx); var oldAttr=v.substring(idx+1);
          var tb=getTableByFull(full);
          if(!tb){ alert('Tabel tidak ditemukan'); return; }
          var col=tb.attrs.find(c=>c.name===oldAttr);
          if(!col){ alert('Kolom tidak ditemukan'); return; }
          var name=(document.getElementById('db-attr-name')||{}).value||'';
          var type=(document.getElementById('db-attr-type')||{}).value||col.type;
          var isPk=(document.getElementById('db-attr-pk')||{}).checked||false;
          var isFk=(document.getElementById('db-attr-fk')||{}).checked||false;
          name=name.trim(); if(!name){ alert('Nama wajib'); return; }
          if(name!==oldAttr && tb.attrs.some(a=>a.name===name)){ alert('Nama sudah dipakai'); return; }
          // update FK list
          if(col.name!==name || col.fk!==isFk){
            const fkIdx=tb.fkCols.indexOf(oldAttr);
            if(fkIdx>=0) tb.fkCols.splice(fkIdx,1);
            if(isFk && !tb.fkCols.includes(name)) tb.fkCols.push(name);
            if(typeof DB_REFS!=='undefined'){
              DB_REFS.forEach(r=>{ if(r.from===full+'.'+oldAttr){ r.from=full+'.'+name; r.srcCol=name; } });
            }
          }
          col.name=name; col.type=type; col.pk=isPk; col.fk=isFk;
          S.modal=null; S.dbCodeDraft=null; render();
        });
        bind(root, '[data-confirm-delete-attr]', function(el){
          var v=el.dataset.confirmDeleteAttr||''; var idx=v.lastIndexOf(':'); var full=v.substring(0,idx); var attr=v.substring(idx+1);
          var tb=getTableByFull(full);
          if(tb){
            tb.attrs=tb.attrs.filter(c=>c.name!==attr);
            const fkIdx=tb.fkCols.indexOf(attr);
            if(fkIdx>=0) tb.fkCols.splice(fkIdx,1);
            if(typeof DB_REFS!=='undefined'){
              for(let i=DB_REFS.length-1;i>=0;i--){ if(DB_REFS[i].from===full+'.'+attr) DB_REFS.splice(i,1); }
            }
          }
          S.modal=null; S.dbCodeDraft=null; render();
        });
        bind(root, '[data-db-add-fk]', function(el){
          var scope=el.dataset.dbAddFk||S.dbEditorScope||'overall';
          S.modal={kind:'addFK', scope:scope}; render();
        });
        bind(root, '[data-save-fk]', function(el){
          var scope=el.dataset.saveFk||'overall';
          var from=(document.getElementById('db-fk-from')||{}).value||'';
          var to=(document.getElementById('db-fk-to')||{}).value||'';
          from=from.trim(); to=to.trim();
          if(!from||!to){ alert('From dan To wajib diisi'); return; }
          // normalize to db.table.col
          function norm(s){
            s=s.trim();
            const parts=s.split('.');
            if(parts.length===2) s=(scope!=='overall'?scope+'.':'griya_company.')+s;
            else if(parts.length===1) s=(scope!=='overall'?scope+'.':'')+s;
            return s;
          }
          // allow user to input with or without db
          // For FK, from should be existing column, to should be existing
          let nFrom=from, nTo=to;
          if(!nFrom.includes('.')) nFrom=(scope!=='overall'?scope+'.':'')+nFrom;
          if(!nTo.includes('.')) nTo=(scope!=='overall'?scope+'.':'')+nTo;
          // ensure 3 parts
          if(nFrom.split('.').length===2) nFrom=(scope!=='overall'?scope+'.':'griya_company.')+nFrom;
          if(nTo.split('.').length===2) nTo=(scope!=='overall'?scope+'.':'griya_company.')+nTo;
          const sIdx=nFrom.lastIndexOf('.'), dIdx=nTo.lastIndexOf('.');
          const srcTbl=nFrom.substring(0,sIdx), srcCol=nFrom.substring(sIdx+1);
          const dstTbl=nTo.substring(0,dIdx), dstCol=nTo.substring(dIdx+1);
          const srcTb=getTableByFull(srcTbl);
          if(!srcTb){ alert('Tabel sumber tidak ditemukan: '+srcTbl); return; }
          const col=srcTb.attrs.find(c=>c.name===srcCol);
          if(col) col.fk=true;
          if(!srcTb.fkCols.includes(srcCol)) srcTb.fkCols.push(srcCol);
          if(typeof DB_REFS!=='undefined'){
            DB_REFS.push({from:nFrom, to:nTo, srcDbTbl:srcTbl, srcCol, dstDbTbl:dstTbl, dstCol});
          }
          S.modal=null; S.dbCodeDraft=null; render();
        });
      }
      if (!active) return;

      var mmS = document.getElementById('mm-search-input');
      if (mmS) mmS.oninput = function (e) { S.mmSearch = e.target.value; render(); };
      var mmD = document.getElementById('mm-filter-directorate');
      if (mmD) mmD.onchange = function (e) { S.mmDirectorate = e.target.value; S.openKebab = null; render(); };
      var sopS = document.getElementById('sop-search-input');
      if (sopS) sopS.oninput = function (e) { S.sopSearch = e.target.value; render(); };
      var sopDir = document.getElementById('sop-filter-directorate');
      if (sopDir) sopDir.onchange = function (e) { S.sopDirectorate = e.target.value; S.sopDivision = 'ALL'; S.sopDepartment = 'ALL'; S.openKebab = null; render(); };
      var sopDiv = document.getElementById('sop-filter-division');
      if (sopDiv) sopDiv.onchange = function (e) { S.sopDivision = e.target.value; S.sopDepartment = 'ALL'; S.openKebab = null; render(); };
      var sopDep = document.getElementById('sop-filter-department');
      if (sopDep) sopDep.onchange = function (e) { S.sopDepartment = e.target.value; S.openKebab = null; render(); };
      var thbS = document.getElementById('thb-search-input');
      if (thbS) thbS.oninput = function (e) { S.thbSearch = e.target.value; render(); };
      var thbDir = document.getElementById('thb-filter-directorate');
      if (thbDir) thbDir.onchange = function (e) { S.thbDirectorate = e.target.value; S.thbDivision = 'ALL'; S.thbDepartment = 'ALL'; S.openKebab = null; render(); };
      var thbDiv = document.getElementById('thb-filter-division');
      if (thbDiv) thbDiv.onchange = function (e) { S.thbDivision = e.target.value; S.thbDepartment = 'ALL'; S.openKebab = null; render(); };
      var thbDep = document.getElementById('thb-filter-department');
      if (thbDep) thbDep.onchange = function (e) { S.thbDepartment = e.target.value; S.openKebab = null; render(); };
      var kbS = document.getElementById('kb-search-input');
      if (kbS) kbS.oninput = function (e) { S.kbSearch = e.target.value; render(); };

      // toolbar docx ala tiptap demo: fungsional via execCommand. mousedown preventDefault agar seleksi tidak hilang.
      bind(root, '[data-docx-zoom]', function (el) {
        var id = el.dataset.docid;
        if (!S.docxZoom) S.docxZoom = {};
        var cur = S.docxZoom[id] || 100;
        cur = Math.min(200, Math.max(50, cur + (parseInt(el.dataset.docxZoom, 10) || 0)));
        S.docxZoom[id] = cur;
        render();
      });
      root.querySelectorAll('[data-docx-cmd]').forEach(function (btn) {
        btn.onmousedown = function (e) { e.preventDefault(); };
        btn.onclick = function (e) {
          e.preventDefault(); e.stopPropagation();
          var cmd = btn.dataset.docxCmd || '';
          try {
            document.execCommand('styleWithCSS', false, true);
            if (cmd === 'foreColorBtn') {
              var ci = btn.parentElement ? btn.parentElement.querySelector('input[data-docx-color]') : null;
              document.execCommand('foreColor', false, ci ? ci.value : '#111111');
            } else if (cmd.indexOf('formatBlock:') === 0) {
              document.execCommand('formatBlock', false, cmd.split(':')[1]);
            } else if (cmd === 'createLink') {
              var url = prompt('URL link:', 'https://');
              if (url) document.execCommand('createLink', false, url);
            } else if (cmd.indexOf('foreColor:') === 0) {
              document.execCommand('foreColor', false, cmd.split(':')[1]);
            } else if (cmd === 'footnote') {
              document.execCommand('insertHTML', false, '<sup>[1]</sup> ');
            } else if (cmd === 'pagebreak') {
              // 5. page break: garis putus + pindah halaman ala Word
              document.execCommand('insertHTML', false, '<div contenteditable="false" style="border-top:2px dashed #9AA0A6;margin:18px 0;padding-top:6px;font-size:11px;color:#9AA0A6;text-align:center;">— Page Break —</div><p><br></p>');
            } else if (cmd === 'image') {
              // 4. insert gambar: pilih file dulu, fallback URL
              var fi = root.querySelector('input[data-docx-image-file]');
              if (fi) { fi.click(); }
              else {
                var iu = prompt('URL gambar:', 'https://');
                if (iu) document.execCommand('insertImage', false, iu);
              }
            } else if (cmd === 'table') {
              // 4. insert tabel 3x3 yang bisa diketik selnya
              var th = '<table style="border-collapse:collapse;width:100%;margin:10px 0;font-size:13px;"><tbody>'
                + '<tr><td style="border:1px solid #9AA0A6;padding:8px;">Sel 1</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 2</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 3</td></tr>'
                + '<tr><td style="border:1px solid #9AA0A6;padding:8px;">Sel 4</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 5</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 6</td></tr>'
                + '<tr><td style="border:1px solid #9AA0A6;padding:8px;">Sel 7</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 8</td><td style="border:1px solid #9AA0A6;padding:8px;">Sel 9</td></tr>'
                + '</tbody></table><p><br></p>';
              document.execCommand('insertHTML', false, th);
            } else {
              document.execCommand(cmd, false, null);
            }
          } catch (err) {}
        };
      });
      // upload gambar dari file lokal
      root.querySelectorAll('[data-docx-image-file]').forEach(function (fi) {
        fi.onchange = function () {
          var f = fi.files && fi.files[0];
          if (!f) {
            var iu = prompt('URL gambar:', 'https://');
            if (iu) { try { document.execCommand('insertImage', false, iu); } catch (e) {} }
            return;
          }
          var rd = new FileReader();
          rd.onload = function () { try { document.execCommand('insertImage', false, rd.result); } catch (e) {} };
          rd.readAsDataURL(f);
          fi.value = '';
        };
        fi.onclick = function (e) { e.stopPropagation(); };
      });
      // popover ala tiptap: numbering / align / spacing (satu tombol, banyak pilihan)
      bind(root, '[data-docx-pop]', function (el) {
        var kind = el.dataset.docxPop, docId = el.dataset.docid;
        if (!S.docxPop) S.docxPop = null;
        if (S.docxPop && S.docxPop.docId === docId && S.docxPop.kind === kind) S.docxPop = null;
        else S.docxPop = { docId: docId, kind: kind };
        render();
      });
      // 1. poin angka 8 gaya seperti screenshot: buat OL lalu terapkan list-style
      bind(root, '[data-docx-numbering-apply]', function (el) {
        var v = el.dataset.docxNumberingApply;
        try {
          document.execCommand('insertOrderedList', false, null);
          var map = { 'decimal': 'decimal', 'decimal-paren': 'decimal', 'decimal-nested': 'decimal', 'upper-alpha': 'upper-alpha', 'lower-alpha-mixed': 'lower-alpha', 'upper-roman': 'upper-roman', 'lower-roman': 'lower-roman', 'decimal-leading-zero': 'decimal-leading-zero' };
          var st = map[v] || 'decimal';
          var ol = null;
          try {
            var node = window.getSelection().anchorNode;
            ol = node && node.parentElement ? node.parentElement.closest('ol') : null;
            if (!ol) ol = document.querySelector('[data-docx-body] ol:last-child');
          } catch (e2) {}
          if (ol) ol.style.listStyleType = st;
          if (!S.docxSpacing) S.docxSpacing = {};
        } catch (e) {}
        S.docxPop = null; render();
      });
      // 3. rata: satu tombol pill berisi 4 logo
      bind(root, '[data-docx-align-btn]', function (el) {
        try { document.execCommand(el.dataset.docxAlignBtn, false, null); } catch (e) {}
        S.docxPop = null; render();
      });
      // 2. spacing seperti screenshot: preset / custom + before-after
      bind(root, '[data-docx-spacing-apply]', function (el) {
        var v = el.dataset.docxSpacingApply, id = el.dataset.docid;
        if (!S.docxSpacing) S.docxSpacing = {};
        S.docxSpacing[id] = v;
        try {
          var ae = document.activeElement;
          if (ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) ae.style.lineHeight = v;
          else document.execCommand('insertHTML', false, '<span style="line-height:' + v + ';">' + (window.getSelection().toString() || 'teks') + '</span>');
        } catch (e) {}
        S.docxPop = null; render();
      });
      bind(root, '[data-docx-spacing-extra]', function (el) {
        var kind = el.dataset.docxSpacingExtra;
        try {
          var ae = document.activeElement;
          if (ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) {
            if (kind === 'before') ae.style.marginTop = '12px';
            else ae.style.marginBottom = '12px';
          }
        } catch (e) {}
        S.docxPop = null; render();
      });
      bind(root, '[data-docx-spacing-applycustom]', function (el) {
        var id = el.dataset.docxSpacingApplycustom;
        var line = (root.querySelector('input[data-docx-spacing-line]') || {}).value || '1';
        var bef = (root.querySelector('input[data-docx-spacing-before]') || {}).value || '0';
        var aft = (root.querySelector('input[data-docx-spacing-after]') || {}).value || '0';
        if (!S.docxSpacing) S.docxSpacing = {};
        S.docxSpacing[id] = line;
        try {
          var ae = document.activeElement;
          if (ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) {
            ae.style.lineHeight = line;
            ae.style.marginTop = bef + 'px';
            ae.style.marginBottom = aft + 'px';
          }
        } catch (e) {}
        S.docxPop = null; render();
      });
      root.querySelectorAll('[data-docx-spacing-custom]').forEach(function (sw) {
        sw.onchange = function (e) {
          e.stopPropagation();
          var id = sw.dataset.docid;
          if (!S.docxSpacingCustom) S.docxSpacingCustom = {};
          S.docxSpacingCustom[id] = sw.checked;
          render();
        };
        sw.onclick = function (e) { e.stopPropagation(); };
      });
      ['data-docx-spacing-line', 'data-docx-spacing-before', 'data-docx-spacing-after'].forEach(function (attr) {
        root.querySelectorAll('input[' + attr + ']').forEach(function (inp) {
          inp.onclick = function (e) { e.stopPropagation(); };
          inp.oninput = function (e) { e.stopPropagation(); };
        });
      });
      root.querySelectorAll('[data-docx-font]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          try { document.execCommand('fontName', false, sel.value); } catch (err) {}
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      // ukuran font: bisa ketik manual di input + pilih dari dropdown, keduanya sinkron
      root.querySelectorAll('[data-docx-size-input]').forEach(function (inp) {
        inp.onmousedown = function (e) { e.stopPropagation(); };
        inp.onclick = function (e) { e.stopPropagation(); };
        function applySize(v){
          var s = (v||'').toString().trim().replace('px','');
          if(!s) return;
          if(isNaN(parseInt(s,10))) return;
          try {
            var px = parseInt(s,10) + 'px';
            var txt = '';
            try { txt = window.getSelection().toString() || ''; } catch (e2) {}
            if(txt){
              document.execCommand('insertHTML', false, '<span style="font-size:'+px+';">'+txt+'</span>');
            } else {
              var ae = document.activeElement;
              if(ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) ae.style.fontSize = px;
            }
          } catch (err) {}
        }
        inp.onchange = function (e) { e.stopPropagation(); applySize(inp.value); };
        inp.onkeydown = function (e) {
          if(e.key==='Enter'){ e.preventDefault(); e.stopPropagation(); applySize(inp.value); inp.blur(); }
          else e.stopPropagation();
        };
        inp.oninput = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-size]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          var v = sel.value;
          if(!v) return;
          // sinkron ke input di sebelahnya
          var wrap = sel.parentElement;
          var inp = wrap ? wrap.querySelector('[data-docx-size-input]') : null;
          if(inp) inp.value = v;
          try {
            var px = v + 'px';
            var txt = '';
            try { txt = window.getSelection().toString() || ''; } catch (e2) {}
            if(txt) document.execCommand('insertHTML', false, '<span style="font-size:' + px + ';">' + txt + '</span>');
            else {
              var ae = document.activeElement;
              if(ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) ae.style.fontSize = px;
            }
          } catch (err) {}
          sel.value = '';
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      // dropdown ala docx/tiptap: satu tombol pilihan
      root.querySelectorAll('[data-docx-block]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          try { document.execCommand('formatBlock', false, sel.value); } catch (err) {}
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-align]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          try { document.execCommand(sel.value, false, null); } catch (err) {}
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-linespacing]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          try {
            var ae = document.activeElement;
            if (ae && ae.hasAttribute && ae.hasAttribute('data-docx-body')) ae.style.lineHeight = sel.value;
          } catch (err) {}
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-numbering]').forEach(function (sel) {
        sel.onmousedown = function (e) { e.stopPropagation(); };
        sel.onchange = function (e) {
          e.stopPropagation();
          try {
            document.execCommand('insertOrderedList', false, null);
            var ae = document.activeElement;
            var ol = null;
            try {
              var node = window.getSelection().anchorNode;
              ol = node && node.parentElement ? node.parentElement.closest('ol') : null;
            } catch (e2) {}
            if (ol) ol.style.listStyleType = sel.value;
          } catch (err) {}
        };
        sel.onclick = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-color]').forEach(function (inp) {
        inp.onmousedown = function (e) { e.stopPropagation(); };
        inp.onclick = function (e) { e.stopPropagation(); };
        inp.onchange = function (e) {
          e.stopPropagation();
          try {
            if (inp.dataset.docxColor === 'hilite') document.execCommand('hiliteColor', false, inp.value);
            else document.execCommand('foreColor', false, inp.value);
          } catch (err) {}
        };
      });
      // header & footer bisa diedit langsung saat mode edit
      root.querySelectorAll('[data-docx-header]').forEach(function (ed) {
        ed.oninput = function () {
          var doc = findDoc(S, 'manual', ed.dataset.docid) || findDoc(S, 'sop', ed.dataset.docid) || findDoc(S, 'handbook', ed.dataset.docid) || findDoc(S, 'kb', ed.dataset.docid);
          if(doc){ doc.header = ed.innerText || ''; }
        };
        ed.onmousedown = function (e) { e.stopPropagation(); };
        ed.onclick = function (e) { e.stopPropagation(); };
      });
      root.querySelectorAll('[data-docx-footer]').forEach(function (ed) {
        ed.oninput = function () {
          var doc = findDoc(S, 'manual', ed.dataset.docid) || findDoc(S, 'sop', ed.dataset.docid) || findDoc(S, 'handbook', ed.dataset.docid) || findDoc(S, 'kb', ed.dataset.docid);
          if(doc){ doc.footer = ed.innerText || ''; }
        };
        ed.onmousedown = function (e) { e.stopPropagation(); };
        ed.onclick = function (e) { e.stopPropagation(); };
      });
      // daftar isi otomatis — tombol di toolbar
      bind(root, '[data-docx-toc]', function (el) {
        var id = el.dataset.docid;
        var doc = findDoc(S, 'manual', id) || findDoc(S, 'sop', id) || findDoc(S, 'handbook', id) || findDoc(S, 'kb', id);
        if(!doc) return;
        doc.toc = !doc.toc;
        render();
      });
      // isi docx bisa diketik langsung saat mode edit, tersimpan tanpa render ulang (jadi fokus tidak hilang)
      root.querySelectorAll('[data-docx-body]').forEach(function (ed) {
        ed.oninput = function () {
          var doc = findDoc(S, ed.dataset.doctype, ed.dataset.docid);
          if (!doc || !doc.chapters) return;
          var ch = doc.chapters.find(function (c) { return c.id === ed.dataset.chapid; });
          if (ch) {
            ch.content = ed.innerText || '';
            doc.updated = App.getCurrentDateTime(); doc.updatedBy = 'Anda';
          }
        };
      });
      bind(root, '[data-docx-edit]', function (el) {
        var parts = (el.dataset.docxEdit || '').split(':');
        var doc = findDoc(S, parts[0], parts.slice(1).join(':'));
        if (!doc) return;
        if (!S.docxEdit) S.docxEdit = {};
        if (!S.docxBackup) S.docxBackup = {};
        try { S.docxBackup[doc.id] = JSON.stringify({chapters: doc.chapters||[], header: doc.header||'', footer: doc.footer||'', toc: !!doc.toc}); } catch(e){ S.docxBackup[doc.id]=JSON.stringify(doc.chapters||[]); }
        S.docxEdit[doc.id] = true;
        render();
        setTimeout(function () {
          var first = root.querySelector('[data-docx-body]');
          if (first) { try { first.focus(); } catch (e) {} }
        }, 60);
      });
      bind(root, '[data-docx-save]', function (el) {
        var parts = (el.dataset.docxSave || '').split(':');
        var doc = findDoc(S, parts[0], parts.slice(1).join(':'));
        if (doc) {
          root.querySelectorAll('[data-docx-body]').forEach(function (ed) {
            if (ed.dataset.docid !== doc.id) return;
            var ch = (doc.chapters || []).find(function (c) { return c.id === ed.dataset.chapid; });
            if (ch) ch.content = ed.innerText || '';
          });
          root.querySelectorAll('[data-docx-header]').forEach(function (ed) {
            if (ed.dataset.docid !== doc.id) return;
            doc.header = ed.innerText || '';
          });
          root.querySelectorAll('[data-docx-footer]').forEach(function (ed) {
            if (ed.dataset.docid !== doc.id) return;
            doc.footer = ed.innerText || '';
          });
          doc.updated = App.getCurrentDateTime(); doc.updatedBy = 'Anda';
        }
        if (!S.docxEdit) S.docxEdit = {};
        S.docxEdit[parts.slice(1).join(':')] = false;
        if (S.docxPop) S.docxPop = null;
        render();
      });
      bind(root, '[data-docx-cancel]', function (el) {
        var parts = (el.dataset.docxCancel || '').split(':');
        var doc = findDoc(S, parts[0], parts.slice(1).join(':'));
        if (doc && S.docxBackup && S.docxBackup[doc.id]) {
          try {
            var b = JSON.parse(S.docxBackup[doc.id]);
            if(b && typeof b === 'object' && 'chapters' in b){ doc.chapters=b.chapters; doc.header=b.header||''; doc.footer=b.footer||''; doc.toc=!!b.toc; }
            else doc.chapters = b;
          } catch (e) {}
        }
        if (!S.docxEdit) S.docxEdit = {};
        S.docxEdit[parts.slice(1).join(':')] = false;
        if (S.docxPop) S.docxPop = null;
        render();
      });

      bind(root, '[data-kebab]', function (el) {
        var parts = (el.dataset.kebab || '').split(':');
        var type = parts[0], id = parts.slice(1).join(':');
        if (S.openKebab && S.openKebab.type === type && S.openKebab.id === id) S.openKebab = null;
        else S.openKebab = { type: type, id: id };
        render();
      });
      bind(root, '[data-docx-noop]', function () {});
      bind(root, '[data-export-pdf]', function () { try { window.print(); } catch (e) {} });

      // toggle + bab (manual/KB bebas, SOP/handbook isi dikunci judulnya)
      bind(root, '[data-toggle-chapter]', function (el) {
        var parts = (el.dataset.toggleChapter || '').split(':');
        var docId = parts[1], chapId = parts.slice(2).join(':');
        if (!S.docOpen) S.docOpen = {};
        var key = docId + ':' + chapId;
        if (!(key in S.docOpen)) {
          var doc = findDoc(S, parts[0], docId);
          var idx = doc && doc.chapters ? doc.chapters.findIndex(function (c) { return c.id === chapId; }) : -1;
          S.docOpen[key] = (idx !== 0);
        } else S.docOpen[key] = !S.docOpen[key];
        render();
      });
      bind(root, '[data-add-chapter]', function (el) {
        var parts = (el.dataset.addChapter || '').split(':');
        if (parts[0] === 'sop' || parts[0] === 'handbook') { alert('Bab SOP / Handbook format pasti dan tidak bisa ditambah'); return; }
        S.modal = { kind: 'addChapter', docType: parts[0], docId: parts.slice(1).join(':') };
        render();
      });
      bind(root, '[data-edit-chapter]', function (el) {
        var parts = (el.dataset.editChapter || '').split(':');
        S.modal = { kind: 'editChapter', docType: parts[0], docId: parts[1], chapId: parts.slice(2).join(':') };
        render();
      });
      bind(root, '[data-delete-chapter]', function (el) {
        var parts = (el.dataset.deleteChapter || '').split(':');
        if (parts[0] === 'sop' || parts[0] === 'handbook') { alert('Bab SOP / Handbook tidak bisa dihapus'); return; }
        var doc = findDoc(S, parts[0], parts[1]);
        var ch = doc && doc.chapters ? doc.chapters.find(function (c) { return c.id === parts.slice(2).join(':'); }) : null;
        if (ch && (ch.title || '').toLowerCase() === 'pendahuluan') { alert('Bab Pendahuluan tidak bisa dihapus'); return; }
        S.modal = { kind: 'deleteChapter', docType: parts[0], docId: parts[1], chapId: parts.slice(2).join(':'), chapTitle: ch ? ch.title : '' };
        render();
      });
      bind(root, '[data-save-chapter]', function (el) {
        var parts = (el.dataset.saveChapter || '').split(':');
        var docType = parts[0], docId = parts[1], chapId = parts.slice(2).join(':');
        var doc = findDoc(S, docType, docId);
        if (!doc) return;
        if (!doc.chapters) doc.chapters = [];
        var locked = (docType === 'sop' || docType === 'handbook');
        var title = val('doc-chap-title'), content = val('doc-chap-content');
        if (!chapId) {
          if (locked) { alert('Bab format pasti, tidak bisa ditambah'); S.modal = null; render(); return; }
          if (!title) { alert('Judul bab wajib diisi'); return; }
          var nid = 'bab-' + App.uid();
          doc.chapters.push({ id: nid, title: title, content: content });
          if (!S.docOpen) S.docOpen = {};
          S.docOpen[docId + ':' + nid] = true;
        } else {
          var ch = doc.chapters.find(function (c) { return c.id === chapId; });
          if (!ch) return;
          if (locked || (ch.title || '').toLowerCase() === 'pendahuluan') {
            if (!content) { alert('Isi bab wajib diisi'); return; }
            ch.content = content;
          } else {
            if (!title) { alert('Judul bab wajib diisi'); return; }
            ch.title = title; ch.content = content;
          }
        }
        doc.updated = App.getCurrentDateTime(); doc.updatedBy = 'Anda';
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-chapter]', function (el) {
        var parts = (el.dataset.confirmDeleteChapter || '').split(':');
        var docType = parts[0], docId = parts[1], chapId = parts.slice(2).join(':');
        if (docType === 'sop' || docType === 'handbook') { alert('Tidak bisa dihapus'); S.modal = null; render(); return; }
        var doc = findDoc(S, docType, docId);
        if (doc && doc.chapters) doc.chapters = doc.chapters.filter(function (c) { return c.id !== chapId; });
        S.modal = null; render();
      });

      // navigasi detail
      bind(root, '[data-view-manual]', function (el) { S.mmDetailId = el.dataset.viewManual; S.page = 'governance-quality-manual-detail'; S.openKebab = null; render(); });
      bind(root, '[data-back-to-manual-list]', function () { S.page = 'governance-quality-manual'; S.mmDetailId = null; render(); });
      bind(root, '[data-view-sop]', function (el) { S.sopDetailId = el.dataset.viewSop; S.page = 'sop-detail'; S.openKebab = null; render(); });
      bind(root, '[data-back-to-sop-list]', function () { S.page = 'sop'; S.sopDetailId = null; render(); });
      bind(root, '[data-view-handbook]', function (el) { S.thbDetailId = el.dataset.viewHandbook; S.page = 'technical-handbook-detail'; S.openKebab = null; render(); });
      bind(root, '[data-back-to-handbook-list]', function () { S.page = 'technical-handbook'; S.thbDetailId = null; render(); });
      bind(root, '[data-view-kb]', function (el) { S.kbDetailId = el.dataset.viewKb; S.page = 'knowledge-base-detail'; S.openKebab = null; render(); });
      bind(root, '[data-back-to-kb-list]', function () { S.page = 'knowledge-base'; S.kbDetailId = null; render(); });

      // SOP draw.io
      bind(root, '[data-edit-sop-drawio]', function (el) {
        var s = (S.sops || []).find(function (x) { return x.id === el.dataset.editSopDrawio; });
        S.openKebab = null; render();
        openDrawio(s);
      });
      bind(root, '[data-download-sop]', function (el) {
        var s = (S.sops || []).find(function (x) { return x.id === el.dataset.downloadSop; });
        if (!s || !s.preview) return;
        var a = document.createElement('a');
        a.href = s.preview; a.download = (s.code || 'sop') + '-flowchart.svg';
        document.body.appendChild(a); a.click();
        setTimeout(function () { try { document.body.removeChild(a); } catch (e) {} }, 300);
      });

      // tambah / ubah metadata saja
      bind(root, '[data-add-manual]', function () { S.modal = { kind: 'addManual' }; S.openKebab = null; render(); });
      bind(root, '[data-edit-manual]', function (el) { S.modal = { kind: 'editManual', id: el.dataset.editManual }; S.openKebab = null; render(); });
      bind(root, '[data-delete-manual]', function (el) { S.modal = { kind: 'deleteManual', id: el.dataset.deleteManual }; S.openKebab = null; render(); });
      bind(root, '[data-save-manual]', function (el) {
        var editId = el.dataset.saveManual;
        var code = val('doc-mm-code');
        if (!code && !editId) { alert('No.Dokumen wajib diisi'); return; }
        if (editId) {
          var m = (S.manuals || []).find(function (x) { return x.id === editId; });
          if (m) {
            if (code) m.code = code;
            m.version = val('doc-mm-version') || m.version;
            m.status = val('doc-mm-status') || m.status;
            var up = val('doc-mm-updated'); if (up) { m.updated = up; m.updatedBy = 'Anda'; }
          }
        } else {
          var name = val('doc-mm-name');
          if (!name || !code) { alert('Nama dan No.Dokumen wajib diisi'); return; }
          S.manuals.unshift({ id: 'mm-' + App.uid(), code: code, name: name, directorateId: val('doc-mm-dir') || 'ALL', version: val('doc-mm-version') || 'v1.0', status: val('doc-mm-status') || 'Draft', updated: val('doc-mm-updated') || App.getCurrentDateTime(), updatedBy: 'Anda', chapters: [{ id: 'bab-pendahuluan', title: 'Pendahuluan', content: '-' }] });
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-manual]', function (el) {
        S.manuals = (S.manuals || []).filter(function (x) { return x.id !== el.dataset.confirmDeleteManual; });
        S.modal = null; render();
      });

      bind(root, '[data-add-sop]', function () { S.modal = { kind: 'addSop' }; S.openKebab = null; render(); });
      bind(root, '[data-edit-sop]', function (el) { S.modal = { kind: 'editSop', id: el.dataset.editSop }; S.openKebab = null; render(); });
      bind(root, '[data-delete-sop]', function (el) { S.modal = { kind: 'deleteSop', id: el.dataset.deleteSop }; S.openKebab = null; render(); });
      bind(root, '[data-save-sop]', function (el) {
        var editId = el.dataset.saveSop;
        var code = val('doc-sop-code');
        if (editId) {
          var s = (S.sops || []).find(function (x) { return x.id === editId; });
          if (s) {
            if (code) s.code = code;
            s.version = val('doc-sop-version') || s.version;
            s.status = val('doc-sop-status') || s.status;
            var up2 = val('doc-sop-updated'); if (up2) { s.updated = up2; s.updatedBy = 'Anda'; }
          }
        } else {
          var name2 = val('doc-sop-name');
          if (!name2 || !code) { alert('Nama dan No.Dokumen wajib diisi'); return; }
          var dir = val('doc-sop-dir') || 'ALL';
          var divs = App.docDivisions(dir);
          S.sops.unshift({ id: 'sop-' + App.uid(), code: code, name: name2, directorateId: dir, divisionId: '', departmentId: '', version: val('doc-sop-version') || 'v1.0', status: val('doc-sop-status') || 'Draft', updated: val('doc-sop-updated') || App.getCurrentDateTime(), updatedBy: 'Anda', pic: '-', preview: App.sopFlowchartSVG(code, name2), chapters: [{ id: 'bab-penjelasan', title: 'Penjelasan Umum', content: '-' }, { id: 'bab-detail', title: 'Detail Proses', content: '-' }, { id: 'bab-komunikasi', title: 'Proses Komunikasi', content: '-' }] });
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-sop]', function (el) {
        S.sops = (S.sops || []).filter(function (x) { return x.id !== el.dataset.confirmDeleteSop; });
        S.modal = null; render();
      });

      bind(root, '[data-add-handbook]', function () { S.modal = { kind: 'addHandbook' }; S.openKebab = null; render(); });
      bind(root, '[data-edit-handbook]', function (el) { S.modal = { kind: 'editHandbook', id: el.dataset.editHandbook }; S.openKebab = null; render(); });
      bind(root, '[data-delete-handbook]', function (el) { S.modal = { kind: 'deleteHandbook', id: el.dataset.deleteHandbook }; S.openKebab = null; render(); });
      bind(root, '[data-save-handbook]', function (el) {
        var editId = el.dataset.saveHandbook;
        var code = val('doc-thb-code');
        var kategori = val('doc-thb-kategori'), peruntukan = val('doc-thb-peruntukan');
        if (editId) {
          var h = (S.handbooks || []).find(function (x) { return x.id === editId; });
          if (h) {
            if (code) h.code = code;
            if (kategori) { h.kategori = kategori; h.category = kategori; }
            if (peruntukan) h.peruntukan = peruntukan;
            h.version = val('doc-thb-version') || h.version;
            h.status = val('doc-thb-status') || h.status;
            var up3 = val('doc-thb-updated'); if (up3) { h.updated = up3; h.updatedBy = 'Anda'; }
          }
        } else {
          var name3 = val('doc-thb-name');
          if (!name3 || !code || !peruntukan) { alert('Judul, No.Dokumen, dan Peruntukan wajib diisi'); return; }
          S.handbooks.unshift({ id: 'thb-' + App.uid(), code: code, name: name3, kategori: kategori || 'Operasional', peruntukan: peruntukan, category: kategori || 'Operasional', directorateId: 'ALL', divisionId: '', departmentId: '', version: val('doc-thb-version') || 'v1.0', status: val('doc-thb-status') || 'Berlaku', updated: val('doc-thb-updated') || App.getCurrentDateTime(), updatedBy: 'Anda', chapters: [{ id: 'bab-pendahuluan', title: 'Pendahuluan', content: '-' }] });
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-handbook]', function (el) {
        S.handbooks = (S.handbooks || []).filter(function (x) { return x.id !== el.dataset.confirmDeleteHandbook; });
        S.modal = null; render();
      });

      bind(root, '[data-add-kb]', function () { S.modal = { kind: 'addKb' }; S.openKebab = null; render(); });
      bind(root, '[data-edit-kb]', function (el) { S.modal = { kind: 'editKb', id: el.dataset.editKb }; S.openKebab = null; render(); });
      bind(root, '[data-delete-kb]', function (el) { S.modal = { kind: 'deleteKb', id: el.dataset.deleteKb }; S.openKebab = null; render(); });
      bind(root, '[data-save-kb]', function (el) {
        var editId = el.dataset.saveKb;
        var code = val('doc-kb-code');
        if (editId) {
          var k = (S.kbs || []).find(function (x) { return x.id === editId; });
          if (k) {
            if (code) k.code = code;
            k.version = val('doc-kb-version') || k.version;
            k.status = val('doc-kb-status') || k.status;
            var up4 = val('doc-kb-updated'); if (up4) { k.updated = up4; k.updatedBy = 'Anda'; }
          }
        } else {
          var name4 = val('doc-kb-name');
          if (!name4 || !code) { alert('Judul dan No.Dokumen wajib diisi'); return; }
          S.kbs.unshift({ id: 'kb-' + App.uid(), code: code, name: name4, version: val('doc-kb-version') || 'v1.0', status: val('doc-kb-status') || 'Draft', updated: val('doc-kb-updated') || App.getCurrentDateTime(), updatedBy: 'Anda', chapters: [{ id: 'bab-pendahuluan', title: 'Pendahuluan', content: '-' }] });
        }
        S.modal = null; render();
      });
      bind(root, '[data-confirm-delete-kb]', function (el) {
        S.kbs = (S.kbs || []).filter(function (x) { return x.id !== el.dataset.confirmDeleteKb; });
        S.modal = null; render();
      });
    }
  };
})(window);
