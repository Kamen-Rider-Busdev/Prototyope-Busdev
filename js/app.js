/**
 * BIG Center - Business Innovation and Governance Center App Engine
 * Loads layout & pages from /page/ and data from /json/
 * Action handlers mounted per submenu from /js/action-*.js
 */

(function(window) {
  "use strict";

  let SECTION_DEFS = [];
  let STANDARD_MONITORS = [];

  const ICONS = {
  chevron: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronDown: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  kebab: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`,
  division: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  dept: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  person: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
  sun: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  back: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  close: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
  inbox: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
  building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  link: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  shield: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  book: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`
};
  const uid = (() => { let n = 1000; return () => (++n).toString(36); })();

  function escHtml(s){ return (s??'').toString().replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function escAttr(s){ return escHtml(s); }
  function getDeep(obj, path){ return path.split('.').reduce((o,k)=>o==null?undefined:o[k], obj); }
  function setDeep(obj, path, val){
    const parts = path.split('.'); let o = obj;
    for(let i=0; i<parts.length-1; i++){ o = o[parts[i]]; }
    o[parts[parts.length-1]] = val;
  }

  function emptyJD(){
    return {
      description:'', objectives:[], authorities:{granted:[], limitations:[]},
      responsibilities:[], kpi:[], ksao:{knowledge:[],skill:[],ability:[],other:[]},
      requirements:{pendidikan:'',pengalaman:[],teknis:[],nonTeknis:[]},
      risks:[], regulations:[], leadership:[], assessments:[], communication:[],
      candidateCompetencies:[]
    };
  }

  function getCurrentDateTime() {
    const d = new Date();
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const pad = n => n.toString().padStart(2, '0');
    return pad(d.getDate()) + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ', ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }


  function createStandardMonitors() {
    return STANDARD_MONITORS.map((name, i) => {
      let m = { id: 'mon-' + uid(), name, status: 'Aktif', progress: 0, lastUpdated: '-' };
      if(name === 'Opsi Lokasi POP ODC') m.popOdcOptions = [];
      if(name === 'Permit') m.permitData = [];
      if(name === 'Plan Area') m.planAreaData = [];
      if(name === 'Opsi Lokasi Kantor Branch') m.branchOfficeOptions = [];
      if(name === 'Route Area') m.routeAreaData = [];
      if(name === 'Pembangunan POP ODC') m.pembangunanPopData = [];
      if(name === 'Pemasangan Tiang') m.pemasanganTiangData = [];
      if(name === 'Fasum (Free WiFi)') m.fasumData = [];
      return m;
    });
  }

  const HOD_NAMES = {};

  function headOfDivisionRole(division){
    if(!division.headOfDivisionJobRoleId) return null;
    const custom = HOD_NAMES[division.headOfDivisionJobRoleId];
    return {
      id: division.headOfDivisionJobRoleId,
      name: custom ? 'Head of Division ' + custom : 'Head of Division ' + division.name,
      type: 'Head of Division',
      departmentId: null,
      divisionId: division.id,
      supervisor: 'Directorate Head',
      jd: (window.__hodJD && window.__hodJD[division.headOfDivisionJobRoleId]) || emptyJD()
    };
  }

  const S = {
    loggedIn: false,
    theme: 'light',
    sidebarCollapsed: false,
    mobileNavOpen: false,
    page: 'job-description',
    placeholderLabel: '',
    menu: [],
    directorates: [],
    activeDirectorateId: 'dir-pcc',
    expandedDivisions: new Set(['div-hc']),
    expandedDepartments: new Set(),
    expandedSidebarGroups: new Set(['Dasaria Workflow Playbook', 'Strategic Growth & Product', 'Cross-Functional']),
    openKebab: null,
    userMenuOpen: false,
    modal: null,
    detailRoleId: null,
    detailEditMode: false,
    editDraft: null,
    activeSectionKey: 'identity',
    loginForm: { email: '', password: '', showPw: false, error: '' },
    jdSearchQuery: '',
    obSearchQuery: '',
    obLifecycleFilter: 'ALL',
    obDetailTab: 'summary',
    branches: [],
    activeBranchId: null,
    activeMonitorId: null,
    bofSelection: {},
    projects: [],
    pmViewMode: 'board',
    pmSearchQuery: '',
    pmFilterDivision: 'ALL',
    pmFilterDepartment: 'ALL',
    pmFilterCategoryType: 'ALL',
    pmFilterPriority: 'ALL',
    kuartalMainTab: 'pencapaian',
    kuartalView: 'bulanan',
    kuartalYear: 2026,
    kuartalMonth: 8,
    kuartalBranch: 'all',
    kuartalStatus: 'all',
    kelolaYear: 2026,
    kelolaBranch: 'all',
    activeKuartalDetailBranch: null,
    kuartalData: { branches: [], records: {}, augustBase: {}, auditTrail: [] },
    scheduleTab: 'attendance',
    attendanceFilterDate: '2026-09-07',
    attendanceFilterDivision: 'ALL',
    attendanceSearchQuery: '',
    leaveFilterStatus: 'ALL',
    leaveSearchQuery: '',
    holidayFilterYear: '2026',
    holidayFilterType: 'ALL',
    holidayMonth: 9,
    holidayYear: 2026,
    holidayDivision: 'ALL',
    scheduleRosterSearch: '',
    scheduleData: { attendance: [], leaveRequests: [], holidays: [], employeeRoster: [] }
  };

  function findDirectorate(id){ return S.directorates.find(d=>d.id===id); }
  function findDivision(id){ for(const d of S.directorates){ const v=d.divisions.find(x=>x.id===id); if(v) return v; } return null; }
  function findDepartment(id){ for(const d of S.directorates) for(const v of d.divisions){ const dep=v.departments.find(x=>x.id===id); if(dep) return dep; } return null; }
  function findJobRole(id){
    for(const d of S.directorates) for(const v of d.divisions){
      if(v.headOfDivisionJobRoleId===id) return headOfDivisionRole(v);
      for(const dep of v.departments){ const r=dep.jobRoles.find(x=>x.id===id); if(r) return r; }
    }
    return null;
  }
  function jobRoleContext(roleId){
    for(const d of S.directorates) for(const v of d.divisions){
      if(v.headOfDivisionJobRoleId===roleId) return {directorate:d, division:v, department:null};
      for(const dep of v.departments){
        if(dep.jobRoles.find(r=>r.id===roleId)) return {directorate:d, division:v, department:dep};
      }
    }
    return {directorate:null, division:null, department:null};
  }

  function getFilteredDir(dir, q){
    if(!q) return dir;
    const lower = q.toLowerCase();
    const filteredDivs = [];
    for(const v of dir.divisions){
      let vClone = Object.assign({}, v, { departments: [] });
      let divMatch = v.name.toLowerCase().includes(lower);
      const hod = headOfDivisionRole(v);
      let hodMatch = hod && hod.name.toLowerCase().includes(lower);
      for(const dep of v.departments){
        let depMatch = dep.name.toLowerCase().includes(lower);
        let matchedRoles = dep.jobRoles.filter(r => r.name.toLowerCase().includes(lower));
        if(depMatch || matchedRoles.length){
          vClone.departments.push(Object.assign({}, dep, {
            jobRoles: depMatch ? dep.jobRoles : matchedRoles
          }));
        }
      }
      if(divMatch || hodMatch || vClone.departments.length){
        filteredDivs.push(vClone);
      }
    }
    return Object.assign({}, dir, { divisions: filteredDivs });
  }

  function countJobRoles(dir){
    let n = 0;
    for(const v of dir.divisions){
      if(v.headOfDivisionJobRoleId) n++;
      for(const dep of v.departments){ n += dep.jobRoles.length; }
    }
    return n;
  }

  function kebabOpen(type, id){
    return S.openKebab && S.openKebab.type===type && S.openKebab.id===id;
  }

  window.App = {
    ICONS, escHtml, escAttr, getDeep, setDeep, uid, getCurrentDateTime,
    get SECTION_DEFS() { return SECTION_DEFS; }, get STANDARD_MONITORS() { return STANDARD_MONITORS; }, HOD_NAMES, emptyJD,
    createStandardMonitors, findDirectorate, findDivision, findDepartment,
    findJobRole, headOfDivisionRole, jobRoleContext, getFilteredDir, countJobRoles
  };

  window.S = S;

  function render(){
    let focusId = document.activeElement ? document.activeElement.id : null;
    let selStart = focusId && document.activeElement.selectionStart ? document.activeElement.selectionStart : null;
    
    const root = document.getElementById('root');
    if(!root) return;

    root.innerHTML = S.loggedIn ? renderApp() : renderLogin();
    
    if (window.ActionLayout) window.ActionLayout.attach(root, S, render, window.App);
    if (window.ActionJobDescription) window.ActionJobDescription.attach(root, S, render, window.App);
    if (window.ActionOpenBranch) window.ActionOpenBranch.attach(root, S, render, window.App);
    if (window.ActionDwpSop) window.ActionDwpSop.attach(root, S, render, window.App);
    if (window.ActionKuartal) window.ActionKuartal.attach(root, S, render, window.App);
    if (window.ActionProjectManagement) window.ActionProjectManagement.attach(root, S, render, window.App);
    if (window.ActionSchedule) window.ActionSchedule.attach(root, S, render, window.App);

    if(focusId && document.getElementById(focusId)) {
      const el = document.getElementById(focusId);
      el.focus();
      if(selStart !== null && el.setSelectionRange) el.setSelectionRange(selStart, selStart);
    }
  }

  window.render = render;

function renderLogin(){
  const f = S.loginForm;
  return `
  <div class="login-screen" data-theme="${S.theme}">
    <div class="login-aside">
      <div class="brand"><b>BIG Center</b> - Business Innovation and Governance Center</div>
      <div>
        <h1>Satu peta yang jelas untuk struktur organisasi dan uraian jabatan.</h1>
      </div>
      <div class="tiers">
        <span>Directorate → Division → Department → Job Role</span>
        <span>14 bagian uraian jabatan terstruktur, bukan dokumen datar</span>
        <span>Dirancang untuk 7 direktorat dan puluhan jabatan</span>
      </div>
    </div>
    <div class="login-main">
      <div class="login-card">
        <h2>Masuk ke akun Anda</h2>
        <p class="sub">Gunakan kredensial internal Business Development.</p>
        <div class="field">
          <label>Email</label>
          <input id="login-email" type="text" placeholder="nama@perusahaan.co.id" value="${escAttr(f.email)}">
        </div>
        <div class="field">
          <label>Kata sandi</label>
          <div class="pw-wrap">
            <input id="login-password" type="${f.showPw?'text':'password'}" placeholder="••••••••" value="${escAttr(f.password)}">
            <button id="login-toggle-pw" type="button">${f.showPw?'Sembunyikan':'Tampilkan'}</button>
          </div>
        </div>
        ${f.error?`<div class="delete-warning">${f.error}</div>`:''}
        <button class="btn btn-primary" id="login-submit">Masuk</button>
        <div class="login-hint">Prototipe — gunakan email &amp; kata sandi apa pun untuk masuk.</div>
      </div>
    </div>
  </div>`;
}


function renderApp(){
  return `
  <div data-theme="${S.theme}" style="height: 100%;">
  <div class="app">
    ${renderSidebar()}
    <div class="main">
      ${renderHeader()}
      <div class="content" id="main-scroll-content">
        ${S.page==='job-description' ? renderJobDescriptionPage() : ''}
        ${S.page==='job-description-detail' ? renderDetailPage() : ''}
        ${S.page==='open-branch' ? renderOpenBranchPage() : ''}
        ${S.page==='open-branch-detail' ? renderBranchDetailPage() : ''}
        ${S.page==='open-branch-monitor' ? renderMonitorDetailPage() : ''}
        ${S.page==='project-management' ? renderProjectManagementPage() : ''}
        ${S.page==='schedule-management' ? renderScheduleManagementPage() : ''}
        ${S.page==='kuartal' ? renderKuartalPage() : ''}
        ${S.page==='placeholder' ? renderPlaceholderPage() : ''}
      </div>
    </div>
  </div>
  ${S.modal ? renderModal() : ''}
  </div>`;
}

function renderSidebar(){
  const menuSource = (S.menu && S.menu.length) ? S.menu : [
    {
      group: "Dasaria Workflow Playbook",
      items: [
        { key: "governance-quality-manual", label: "Governance & Quality Manual", desc: "Kebijakan, prinsip, standar mutu", icon: "shield", real: false },
        { key: "job-description", label: "Role Charter / Job Description", desc: "Tanggung jawab dan kewenangan", icon: "building", real: true },
        { key: "sop", label: "SOP", desc: "Alur proses kerja", icon: "fileText", real: false },
        { key: "technical-handbook", label: "Technical Handbook", desc: "Metode teknis dan cara penerapan", icon: "book", real: false },
        { key: "knowledge-base", label: "Knowledge Base", desc: "Materi keilmuan, konsep, teori, referensi", icon: "search", real: false },
        { key: "forms-records", label: "Forms & Records", desc: "Bukti pelaksanaan", icon: "edit", real: false }
      ]
    },
    {
      group: "Strategic Growth & Product",
      items: [
        { key: "open-branch", label: "Open Branch", desc: "Monitoring pembukaan cabang", icon: "location", real: true },
        { key: "kuartal", label: "Kuartal", desc: "Pencapaian branch & target", icon: "inbox", real: true }
      ]
    },
    {
      group: "Cross-Functional",
      items: [
        { key: "project-management", label: "Project Management", desc: "Kanban board & task tracking", icon: "inbox", real: true },
        { key: "schedule-management", label: "Management Schedule", desc: "Absensi, pengajuan izin & cuti, jadwal libur", icon: "calendar", real: true }
      ]
    }
  ];

  const groups = menuSource.map(g => ({
    label: g.group,
    items: (g.items || []).map(it => ({
      key: it.key,
      label: it.label,
      desc: it.desc || '',
      icon: ICONS[it.icon] || ICONS.inbox,
      real: it.real
    }))
  }));
  
  const isActive = k => {
    if(S.page.startsWith('job-description')) return k === 'job-description' || k === 'role-charter';
    if(S.page.startsWith('open-branch')) return k === 'open-branch';
    if(S.page === 'project-management') return k === 'project-management';
    if(S.page === 'schedule-management') return k === 'schedule-management';
    if(S.page === 'kuartal') return k === 'kuartal';
    return S.page === 'placeholder' && S.placeholderLabel === k;
  };

  const isGroupExpanded = g => {
    if (!S.expandedSidebarGroups) return true;
    return S.expandedSidebarGroups.has(g.label);
  };

  return `
  <div class="sidebar ${S.sidebarCollapsed?'collapsed':''} ${S.mobileNavOpen?'mobile-open':''}">
    <div class="sidebar-brand"><div class="mark">BIG</div><span>BIG Center</span></div>
    <div class="sidebar-scroll">
      ${groups.map(g=>`
        <div class="sidebar-group ${isGroupExpanded(g)?'expanded':'collapsed-group'}">
          <div class="sidebar-group-header" data-toggle-sidebar-group="${escAttr(g.label)}">
            <span class="sidebar-group-label">${escHtml(g.label)}</span>
            <span class="sidebar-group-chevron">${ICONS.chevronDown}</span>
          </div>
          <div class="sidebar-group-items">
            ${g.items.map(it=>`
              <div class="nav-item ${isActive(it.key)?'active':''}" data-nav="${it.key}" data-real="${it.real}">
                ${it.icon}
                <div class="nav-text">
                  <span class="nav-label">${escHtml(it.label)}</span>
                  ${it.desc ? `<span class="nav-desc">${escHtml(it.desc)}</span>` : ''}
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div class="sidebar-foot">
      <button class="btn btn-ghost btn-sm collapse-btn" id="sidebar-collapse-toggle">${S.sidebarCollapsed?'»':'« Ciutkan'}</button>
    </div>
  </div>`;
}

function renderHeader(){
  const titleMap = {
    "job-description":"Role Charter / Job Description",
    "job-description-detail":"Role Charter / Job Description",
    "open-branch":"Open Branch",
    "open-branch-detail":"Open Branch",
    "open-branch-monitor":"Open Branch",
    "project-management":"Project Management",
    "schedule-management":"Management Schedule",
    "kuartal":"Pencapaian Branch (Kuartal)"
  };
  const placeholderTitles = {
    "governance-quality-manual":"Governance & Quality Manual",
    "sop":"SOP",
    "dwp-sop":"SOP",
    "technical-handbook":"Technical Handbook",
    "knowledge-base":"Knowledge Base",
    "forms-records":"Forms & Records",
    "business-governance-docs":"Business Governance Documents"
  };
  const currentTitle = titleMap[S.page] || placeholderTitles[S.placeholderLabel] || "BIG Center";

  return `
  <div class="header">
    <div style="display:flex;align-items:center;gap:10px;">
      <button class="btn-ghost btn" id="mobile-nav-toggle" style="display:none;padding:6px;">☰</button>
      <div class="header-title">${currentTitle}</div>
    </div>
    <div class="header-right">
      <div class="theme-toggle">
        <button class="${S.theme==='light'?'active':''}" id="theme-light" aria-label="Light mode">${ICONS.sun}</button>
        <button class="${S.theme==='dark'?'active':''}" id="theme-dark" aria-label="Dark mode">${ICONS.moon}</button>
      </div>
      <div class="user-menu">
        <button class="user-chip" id="user-menu-btn">
          <div class="avatar">BD</div>
          <span class="name">Budi Santoso</span>
        </button>
        ${S.userMenuOpen?`
        <div class="dropdown">
          <button disabled style="color:var(--ink-faint);">budi.santoso@perusahaan.co.id</button>
          <hr style="border:none;border-top:1px solid var(--border);margin:4px 2px;">
          <button class="danger" id="logout-btn">Keluar</button>
        </div>`:''}
      </div>
    </div>
  </div>`;
}


function renderPlaceholderPage(){
  const meta = {
    "governance-quality-manual": { title: "Governance & Quality Manual", sub: "Kebijakan, prinsip, standar mutu" },
    "sop": { title: "SOP", sub: "Alur proses kerja" },
    "dwp-sop": { title: "SOP", sub: "Alur proses kerja" },
    "technical-handbook": { title: "Technical Handbook", sub: "Metode teknis dan cara penerapan" },
    "knowledge-base": { title: "Knowledge Base", sub: "Materi keilmuan, konsep, teori, referensi" },
    "forms-records": { title: "Forms & Records", sub: "Bukti pelaksanaan" },
    "business-governance-docs": { title: "Business Governance Documents", sub: "Dokumen tata kelola bisnis" },
    "open-branch": { title: "Open Branch", sub: "Monitoring pembukaan cabang" },
    "kuartal": { title: "Kuartal", sub: "Pencapaian branch" },
    "project-management-bqg": { title: "Project Management", sub: "Manajemen proyek" },
    "project-management-sgp": { title: "Project Management", sub: "Manajemen proyek" }
  };
  const item = meta[S.placeholderLabel] || { title: "Modul ini", sub: "Sedang dalam tahap pengembangan" };
  return `
  <div class="page-head" style="margin-bottom:20px;">
    <div>
      <h1 style="font-size:22px; font-weight:700; margin:0 0 4px;">${escHtml(item.title)}</h1>
      <p style="margin:0; font-size:13.5px; color:var(--ink-soft);">${escHtml(item.sub)} &bull; Dasaria Workflow Playbook</p>
    </div>
  </div>
  <div class="placeholder-panel">
    <div class="icon">${ICONS.inbox}</div>
    <h3>Coming Soon</h3>
    <p>Modul ${escHtml(item.title)} (${escHtml(item.sub)}) sedang dalam tahap penyusunan dan akan segera tersedia pada rilis berikutnya.</p>
  </div>`;
}

/* ======================= PROJECT MANAGEMENT (OPEN SOURCE STYLE) ======================= */

function renderProjectManagementPage() {
  const query = (S.pmSearchQuery || '').toLowerCase().trim();
  const divFilter = S.pmFilterDivision || 'ALL';
  const deptFilter = S.pmFilterDepartment || 'ALL';
  const typeFilter = S.pmFilterCategoryType || 'ALL';
  const prioFilter = S.pmFilterPriority || 'ALL';

  // Daftar divisi dan departemen unik untuk filter
  const allDepartments = [];
  (S.projects || []).forEach(p => {
    if (p.department && !allDepartments.includes(p.department)) {
      allDepartments.push(p.department);
    }
  });

  const filtered = (S.projects || []).filter(p => {
    if (divFilter !== 'ALL' && p.division !== divFilter) return false;
    if (deptFilter !== 'ALL' && (p.department || '') !== deptFilter) return false;
    if (typeFilter !== 'ALL' && (p.categoryType || 'division') !== typeFilter) return false;
    if (prioFilter !== 'ALL' && p.priority !== prioFilter) return false;
    if (query) {
      const matchTitle = (p.title || '').toLowerCase().includes(query);
      const matchKey = (p.key || '').toLowerCase().includes(query);
      const matchDesc = (p.description || '').toLowerCase().includes(query);
      const matchDept = (p.department || '').toLowerCase().includes(query);
      const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(query));
      const matchAssignee = (p.assignee || '').toLowerCase().includes(query);
      if (!matchTitle && !matchKey && !matchDesc && !matchDept && !matchTags && !matchAssignee) return false;
    }
    return true;
  });

  const isBoard = S.pmViewMode !== 'table';

  const getScopeBadge = p => {
    const isDept = p.categoryType === 'department' && p.department;
    if (isDept) {
      return `<span class="badge badge-scope-dept" title="Task Perdepartemen">Dept: ${escHtml(p.department)}</span>`;
    }
    return `<span class="badge badge-scope-div" title="Task Divisi">Divisi</span>`;
  };

  const getDivBadge = div => {
    if (div === 'Business Quality & Governance' || div === 'BQG') return '<span class="badge badge-div-bqg">BQG</span>';
    if (div === 'Strategic Growth & Product' || div === 'SGP') return '<span class="badge badge-div-sgp">SGP</span>';
    return '<span class="badge badge-div-cross">Cross-Divisi</span>';
  };

  const getPrioBadge = prio => {
    const cls = 'badge-priority-' + (prio || 'medium');
    const label = prio ? prio.toUpperCase() : 'MEDIUM';
    return `<span class="badge ${cls}">${label}</span>`;
  };

  const calcProgress = p => {
    if (!p.tasks || !p.tasks.length) return p.status === 'done' ? 100 : 0;
    const done = p.tasks.filter(t => t.done).length;
    return Math.round((done / p.tasks.length) * 100);
  };

  let contentView = '';

  if (isBoard) {
    const columns = [
      { id: 'todo', title: 'To Do', color: 'var(--ink-faint)' },
      { id: 'in-progress', title: 'In Progress', color: 'var(--primary)' },
      { id: 'review', title: 'Review / QA', color: 'var(--accent)' },
      { id: 'done', title: 'Done', color: 'var(--success)' }
    ];

    contentView = `
    <div class="pm-board">
      ${columns.map(col => {
        const colProjects = filtered.filter(p => p.status === col.id);
        return `
        <div class="pm-col">
          <div class="pm-col-head">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${col.color};"></span>
              <span>${col.title}</span>
            </div>
            <span class="pm-col-count">${colProjects.length}</span>
          </div>
          <div class="pm-col-body" data-status="${col.id}">
            ${colProjects.map(p => {
              const prog = calcProgress(p);
              const initials = (p.assignee || 'U').split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
              return `
              <div class="pm-card" draggable="true" data-pm-card="${p.id}">
                <div class="pm-card-top">
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span class="pm-card-key">${escHtml(p.key)}</span>
                    ${getDivBadge(p.division)}
                    ${getScopeBadge(p)}
                  </div>
                  ${getPrioBadge(p.priority)}
                </div>
                <div class="pm-card-title">${escHtml(p.title)}</div>
                ${p.description ? `<div class="pm-card-desc">${escHtml(p.description)}</div>` : ''}
                
                ${p.tags && p.tags.length ? `
                  <div style="margin-bottom:8px;">
                    ${p.tags.map(t => `<span class="pm-tag">#${escHtml(t)}</span>`).join('')}
                  </div>` : ''}

                <div class="pm-progress-wrap">
                  <div class="pm-progress-bar">
                    <div class="pm-progress-fill" style="width:${prog}%;"></div>
                  </div>
                  <span class="pm-progress-text">${prog}%</span>
                </div>

                <div class="pm-card-foot">
                  <div class="pm-card-assignee">
                    <div class="pm-card-avatar">${initials}</div>
                    <span>${escHtml(p.assignee || 'Unassigned')}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <button class="btn-ghost btn-sm" style="padding:2px 5px;" data-pm-edit="${p.id}" title="Edit Proyek">${ICONS.edit}</button>
                    <button class="btn-ghost btn-sm" style="padding:2px 5px;color:var(--danger);" data-pm-delete="${p.id}" title="Hapus Proyek">${ICONS.trash}</button>
                  </div>
                </div>
              </div>`;
            }).join('')}
            ${!colProjects.length ? `<div style="padding:24px;text-align:center;color:var(--ink-faint);font-size:12px;border:1px dashed var(--border);border-radius:var(--radius);">Tidak ada tugas</div>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  } else {
    // Table list view
    contentView = `
    <div style="overflow-x:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:75px;">Key</th>
            <th>Judul Proyek / Task</th>
            <th style="width:100px;">Kategori</th>
            <th style="width:140px;">Divisi / Departemen</th>
            <th style="width:110px;">Status</th>
            <th style="width:90px;">Prioritas</th>
            <th style="width:130px;">Assignee</th>
            <th style="width:110px;">Progress</th>
            <th style="width:95px;">Due Date</th>
            <th style="width:75px;text-align:right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(p => {
            const prog = calcProgress(p);
            const statusMap = {
              'todo': '<span class="badge badge-staff">To Do</span>',
              'in-progress': '<span class="badge badge-division">In Progress</span>',
              'review': '<span class="badge badge-head">Review / QA</span>',
              'done': '<span class="badge badge-status">Done</span>'
            };
            const divShort = p.division === 'Business Quality & Governance' ? 'BQG' : p.division === 'Strategic Growth & Product' ? 'SGP' : p.division;
            return `
            <tr style="cursor:pointer;" data-pm-card="${p.id}">
              <td style="font-family:monospace;font-weight:700;color:var(--primary);">${escHtml(p.key)}</td>
              <td style="font-weight:600;">${escHtml(p.title)}</td>
              <td>${p.categoryType === 'department' ? '<span class="badge badge-scope-dept">Departemen</span>' : '<span class="badge badge-scope-div">Divisi</span>'}</td>
              <td>
                <div style="font-size:12.5px;font-weight:600;">${escHtml(divShort)}</div>
                ${p.department ? `<div style="font-size:11.5px;color:var(--ink-soft);">${escHtml(p.department)}</div>` : '<div style="font-size:11px;color:var(--ink-faint);font-style:italic;">Lingkup Divisi</div>'}
              </td>
              <td>${statusMap[p.status] || p.status}</td>
              <td>${getPrioBadge(p.priority)}</td>
              <td>${escHtml(p.assignee || '-')}</td>
              <td>
                <div style="display:flex;align-items:center;gap:6px;">
                  <div class="pm-progress-bar" style="width:50px;">
                    <div class="pm-progress-fill" style="width:${prog}%;"></div>
                  </div>
                  <span style="font-size:11.5px;color:var(--ink-soft);">${prog}%</span>
                </div>
              </td>
              <td style="font-size:12px;color:var(--ink-soft);">${escHtml(p.dueDate || '-')}</td>
              <td style="text-align:right;">
                <div style="display:inline-flex;gap:4px;">
                  <button class="btn-ghost btn-sm" style="padding:4px;" data-pm-edit="${p.id}">${ICONS.edit}</button>
                  <button class="btn-ghost btn-sm" style="padding:4px;color:var(--danger);" data-pm-delete="${p.id}">${ICONS.trash}</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
          ${!filtered.length ? `<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--ink-faint);">Tidak ada data proyek yang sesuai kriteria pencarian.</td></tr>` : ''}
        </tbody>
      </table>
    </div>`;
  }

  return `
  <div class="page-head" style="margin-bottom: 20px;">
    <div>
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">Project Management</h1>
      <p style="margin: 0; font-size: 13.5px; color: var(--ink-soft);">
        Sistem manajemen proyek &amp; task terpadu dengan kategori Divisi maupun Departemen (BQG &amp; SGP).
      </p>
    </div>
    <button class="btn btn-primary" id="btn-add-project">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Tambah Proyek / Task
    </button>
  </div>

  <div class="pm-toolbar">
    <div class="pm-filters">
      <div class="search-box pm-search">
        <input type="text" id="pm-search-input" placeholder="Cari task, key, dept, atau tag..." value="${escAttr(S.pmSearchQuery)}">
      </div>
      <select id="pm-filter-category-type" class="modal-inp" style="width: auto; padding: 7px 10px; font-size: 13px;">
        <option value="ALL" ${typeFilter==='ALL'?'selected':''}>Semua Kategori</option>
        <option value="division" ${typeFilter==='division'?'selected':''}>Task Divisi</option>
        <option value="department" ${typeFilter==='department'?'selected':''}>Task Perdepartemen</option>
      </select>
      <select id="pm-filter-division" class="modal-inp" style="width: auto; padding: 7px 10px; font-size: 13px;">
        <option value="ALL" ${divFilter==='ALL'?'selected':''}>Semua Divisi</option>
        <option value="Business Quality & Governance" ${divFilter==='Business Quality & Governance'||divFilter==='BQG'?'selected':''}>Business Quality &amp; Governance (BQG)</option>
        <option value="Strategic Growth & Product" ${divFilter==='Strategic Growth & Product'||divFilter==='SGP'?'selected':''}>Strategic Growth &amp; Product (SGP)</option>
        <option value="Cross-Divisi" ${divFilter==='Cross-Divisi'?'selected':''}>Cross-Divisi</option>
      </select>
      <select id="pm-filter-department" class="modal-inp" style="width: auto; padding: 7px 10px; font-size: 13px;">
        <option value="ALL" ${deptFilter==='ALL'?'selected':''}>Semua Departemen</option>
        ${allDepartments.map(d => `<option value="${escAttr(d)}" ${deptFilter===d?'selected':''}>${escHtml(d)}</option>`).join('')}
      </select>
      <select id="pm-filter-priority" class="modal-inp" style="width: auto; padding: 7px 10px; font-size: 13px;">
        <option value="ALL" ${prioFilter==='ALL'?'selected':''}>Semua Prioritas</option>
        <option value="urgent" ${prioFilter==='urgent'?'selected':''}>Urgent</option>
        <option value="high" ${prioFilter==='high'?'selected':''}>High</option>
        <option value="medium" ${prioFilter==='medium'?'selected':''}>Medium</option>
        <option value="low" ${prioFilter==='low'?'selected':''}>Low</option>
      </select>
    </div>

    <div class="pm-view-toggle">
      <button class="pm-view-btn ${isBoard ? 'active' : ''}" id="pm-view-board">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"></rect><rect x="14" y="3" width="7" height="11" rx="1"></rect></svg>
        Board
      </button>
      <button class="pm-view-btn ${!isBoard ? 'active' : ''}" id="pm-view-table">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        Tabel List
      </button>
    </div>
  </div>

  <div id="pm-content-view">
    ${contentView}
  </div>
  `;
}

/* ======================= MANAGEMENT SCHEDULE ENGINE ======================= */

function renderScheduleManagementPage() {
  const currentTab = S.scheduleTab || 'attendance';

  let tabContent = '';
  if (currentTab === 'attendance') {
    tabContent = renderScheduleAttendanceTab();
  } else if (currentTab === 'leave') {
    tabContent = renderScheduleLeaveTab();
  } else if (currentTab === 'holidays') {
    tabContent = renderScheduleHolidaysTab();
  }

  return `
  <div class="page-head" style="margin-bottom: 20px;">
    <div>
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">Management Schedule</h1>
      <p style="margin: 0; font-size: 13.5px; color: var(--ink-soft);">
        Sistem terpadu jadwal kerja, absensi kehadiran harian, pengajuan izin &amp; cuti, serta kalender libur operasional.
      </p>
    </div>
  </div>

  <div class="pm-view-toggle" style="display:inline-flex; margin-bottom: 20px;">
    <button class="pm-view-btn ${currentTab==='attendance'?'active':''}" data-schedule-tab="attendance">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Absensi Kehadiran
    </button>
    <button class="pm-view-btn ${currentTab==='leave'?'active':''}" data-schedule-tab="leave">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      Pengajuan Izin &amp; Cuti
    </button>
    <button class="pm-view-btn ${currentTab==='holidays'?'active':''}" data-schedule-tab="holidays">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
      Jadwal Libur Operasional
    </button>
  </div>

  ${tabContent}
  `;
}

function renderScheduleAttendanceTab() {
  const list = (S.scheduleData && S.scheduleData.attendance) ? S.scheduleData.attendance : [];
  const divFilter = S.attendanceFilterDivision || 'ALL';
  const query = (S.attendanceSearchQuery || '').toLowerCase().trim();

  const filtered = list.filter(item => {
    if (divFilter !== 'ALL' && item.division !== divFilter) return false;
    if (query) {
      const matchName = (item.employeeName || '').toLowerCase().includes(query);
      const matchId = (item.employeeId || '').toLowerCase().includes(query);
      const matchRole = (item.role || '').toLowerCase().includes(query);
      const matchLoc = (item.location || '').toLowerCase().includes(query);
      if (!matchName && !matchId && !matchRole && !matchLoc) return false;
    }
    return true;
  });

  const onTimeCount = list.filter(x => x.status === 'Hadir Tepat Waktu').length;
  const lateCount = list.filter(x => x.status === 'Terlambat').length;
  const wfhDutyCount = list.filter(x => x.status === 'WFH' || x.status === 'Tugas Luar').length;
  const leaveCount = list.filter(x => x.status === 'Cuti / Izin').length;

  const getStatusBadge = st => {
    if (st === 'Hadir Tepat Waktu') return `<span class="badge badge-attend-ontime">Hadir Tepat Waktu</span>`;
    if (st === 'Terlambat') return `<span class="badge badge-attend-late">Terlambat</span>`;
    if (st === 'WFH') return `<span class="badge badge-attend-wfh">WFH</span>`;
    if (st === 'Tugas Luar') return `<span class="badge badge-attend-duty">Tugas Luar</span>`;
    if (st === 'Cuti / Izin') return `<span class="badge badge-attend-leave">Cuti / Izin</span>`;
    return `<span class="badge badge-attend-absent">Alpa</span>`;
  };

  return `
  <div class="kpi-row-kuartal" style="margin-bottom: 20px;">
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Hadir Tepat Waktu</div>
        <div class="kpi-icon-kuartal" style="background:var(--success-soft); color:var(--success);">✓</div>
      </div>
      <div class="val">${onTimeCount}</div>
      <div class="sub">karyawan hadir sesuai jam kerja</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Terlambat</div>
        <div class="kpi-icon-kuartal" style="background:var(--accent-soft); color:var(--accent);">⏱</div>
      </div>
      <div class="val">${lateCount}</div>
      <div class="sub">toleransi maks. 15 menit</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">WFH &amp; Tugas Luar</div>
        <div class="kpi-icon-kuartal" style="background:var(--primary-soft); color:var(--primary);">📍</div>
      </div>
      <div class="val">${wfhDutyCount}</div>
      <div class="sub">survei cabang &amp; remote kerja</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Izin &amp; Cuti</div>
        <div class="kpi-icon-kuartal" style="background:#FEF7E0; color:#B06000;">📅</div>
      </div>
      <div class="val">${leaveCount}</div>
      <div class="sub">terdata izin/cuti resmi</div>
    </div>
  </div>

  <div class="pm-toolbar" style="margin-bottom: 16px;">
    <div class="pm-filters">
      <div class="search-box pm-search" style="min-width:260px;">
        <input type="text" id="att-search-input" placeholder="Cari Karyawan, NIP, Posisi..." value="${escAttr(S.attendanceSearchQuery || '')}">
      </div>
      <select id="att-filter-division" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px;">
        <option value="ALL" ${divFilter==='ALL'?'selected':''}>Semua Divisi</option>
        <option value="Business Quality & Governance" ${divFilter==='Business Quality & Governance'?'selected':''}>Business Quality &amp; Governance</option>
        <option value="Strategic Growth & Product" ${divFilter==='Strategic Growth & Product'?'selected':''}>Strategic Growth &amp; Product</option>
        <option value="Technology & Digital" ${divFilter==='Technology & Digital'?'selected':''}>Technology &amp; Digital</option>
      </select>
    </div>
    <button class="btn btn-primary btn-sm" id="btn-clock-in">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>
      Catat Kehadiran
    </button>
  </div>

  <div style="overflow-x: auto; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-card);">
    <table class="data-table" style="border:none; border-radius:0;">
      <thead>
        <tr>
          <th style="width:45px; text-align:center;">No</th>
          <th>Karyawan &amp; NIP</th>
          <th>Divisi &amp; Posisi</th>
          <th>Tanggal</th>
          <th style="width:90px; text-align:center;">Masuk</th>
          <th style="width:90px; text-align:center;">Pulang</th>
          <th>Lokasi / Cabang</th>
          <th style="width:140px;">Status</th>
          <th>Catatan</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((item, i) => `
          <tr>
            <td style="text-align:center; font-weight:600;">${i + 1}</td>
            <td>
              <div style="font-weight:600; color:var(--ink);">${escHtml(item.employeeName)}</div>
              <div style="font-size:11.5px; color:var(--ink-faint); font-family:monospace;">${escHtml(item.employeeId)}</div>
            </td>
            <td>
              <div style="font-size:13px; font-weight:500;">${escHtml(item.role)}</div>
              <div style="font-size:11.5px; color:var(--ink-soft);">${escHtml(item.division)}</div>
            </td>
            <td style="font-size:12.5px; color:var(--ink-soft);">${escHtml(item.date)}</td>
            <td style="text-align:center; font-family:monospace; font-weight:600; color:var(--primary);">${escHtml(item.clockIn)}</td>
            <td style="text-align:center; font-family:monospace; color:var(--ink-soft);">${escHtml(item.clockOut)}</td>
            <td style="font-size:12.5px;">${escHtml(item.location)}</td>
            <td>${getStatusBadge(item.status)}</td>
            <td style="font-size:12.5px; color:var(--ink-soft); max-width:240px; white-space:normal;">${escHtml(item.notes || '-')}</td>
          </tr>
        `).join('')}
        ${!filtered.length ? `<tr><td colspan="9" style="text-align:center; padding:32px; color:var(--ink-faint);">Tidak ada catatan absensi yang sesuai filter.</td></tr>` : ''}
      </tbody>
    </table>
  </div>
  `;
}

function renderScheduleLeaveTab() {
  const list = (S.scheduleData && S.scheduleData.leaveRequests) ? S.scheduleData.leaveRequests : [];
  const statusFilter = S.leaveFilterStatus || 'ALL';
  const query = (S.leaveSearchQuery || '').toLowerCase().trim();

  const filtered = list.filter(item => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (query) {
      const matchName = (item.employeeName || '').toLowerCase().includes(query);
      const matchType = (item.type || '').toLowerCase().includes(query);
      const matchReason = (item.reason || '').toLowerCase().includes(query);
      if (!matchName && !matchType && !matchReason) return false;
    }
    return true;
  });

  const pendingCount = list.filter(x => x.status === 'Menunggu Persetujuan').length;
  const approvedCount = list.filter(x => x.status === 'Disetujui').length;
  const rejectedCount = list.filter(x => x.status === 'Ditolak').length;

  const getLeaveStatusBadge = st => {
    if (st === 'Disetujui') return `<span class="badge badge-ws-completed">Disetujui</span>`;
    if (st === 'Menunggu Persetujuan') return `<span class="badge badge-ws-hold">Menunggu Persetujuan</span>`;
    return `<span class="badge badge-attend-absent">Ditolak</span>`;
  };

  return `
  <div class="kpi-row-kuartal" style="margin-bottom: 20px;">
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Hak Cuti Tahunan</div>
        <div class="kpi-icon-kuartal" style="background:var(--primary-soft); color:var(--primary);">🗓</div>
      </div>
      <div class="val">12 <span style="font-size:14px; font-weight:500; color:var(--ink-faint);">Hari / Tahun</span></div>
      <div class="sub">standar ketenagakerjaan RI</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Menunggu Persetujuan</div>
        <div class="kpi-icon-kuartal" style="background:var(--accent-soft); color:var(--accent);">⏳</div>
      </div>
      <div class="val">${pendingCount}</div>
      <div class="sub">butuh approval atasan</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Pengajuan Disetujui</div>
        <div class="kpi-icon-kuartal" style="background:var(--success-soft); color:var(--success);">✓</div>
      </div>
      <div class="val">${approvedCount}</div>
      <div class="sub">izin &amp; cuti tervalidasi</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Pengajuan Ditolak</div>
        <div class="kpi-icon-kuartal" style="background:var(--danger-soft); color:var(--danger);">✕</div>
      </div>
      <div class="val">${rejectedCount}</div>
      <div class="sub">kuota habis / jadwal bentrok</div>
    </div>
  </div>

  <div class="pm-toolbar" style="margin-bottom: 16px;">
    <div class="pm-filters">
      <div class="search-box pm-search" style="min-width:260px;">
        <input type="text" id="leave-search-input" placeholder="Cari Pemohon, Jenis Cuti, Alasan..." value="${escAttr(S.leaveSearchQuery || '')}">
      </div>
      <select id="leave-filter-status" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px;">
        <option value="ALL" ${statusFilter==='ALL'?'selected':''}>Semua Status Pengajuan</option>
        <option value="Menunggu Persetujuan" ${statusFilter==='Menunggu Persetujuan'?'selected':''}>Menunggu Persetujuan</option>
        <option value="Disetujui" ${statusFilter==='Disetujui'?'selected':''}>Disetujui</option>
        <option value="Ditolak" ${statusFilter==='Ditolak'?'selected':''}>Ditolak</option>
      </select>
    </div>
    <button class="btn btn-primary btn-sm" id="btn-add-leave-request">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Ajukan Izin &amp; Cuti
    </button>
  </div>

  <div style="overflow-x: auto; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-card);">
    <table class="data-table" style="border:none; border-radius:0;">
      <thead>
        <tr>
          <th style="width:45px; text-align:center;">No</th>
          <th>Nama Karyawan</th>
          <th>Divisi</th>
          <th>Jenis Pengajuan</th>
          <th>Periode Tanggal</th>
          <th style="width:75px; text-align:center;">Durasi</th>
          <th>Keperluan / Alasan</th>
          <th>Lampiran</th>
          <th style="width:150px;">Status</th>
          <th>Approver</th>
          <th style="width:120px; text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((item, i) => `
          <tr>
            <td style="text-align:center; font-weight:600;">${i + 1}</td>
            <td>
              <div style="font-weight:600; color:var(--ink);">${escHtml(item.employeeName)}</div>
              <div style="font-size:11.5px; color:var(--ink-faint); font-family:monospace;">${escHtml(item.employeeId)}</div>
            </td>
            <td style="font-size:12.5px; color:var(--ink-soft);">${escHtml(item.division)}</td>
            <td><span class="badge badge-staff">${escHtml(item.type)}</span></td>
            <td>
              <div style="font-size:12.5px; font-weight:600; color:var(--ink);">${escHtml(item.startDate)} &rarr; ${escHtml(item.endDate)}</div>
            </td>
            <td style="text-align:center; font-weight:700; color:var(--primary);">${item.totalDays} hari</td>
            <td style="font-size:12.5px; color:var(--ink-soft); max-width:200px; white-space:normal;">${escHtml(item.reason)}</td>
            <td>
              ${item.attachment ? `<span class="doc-link" style="cursor:pointer;">${ICONS.link} ${escHtml(item.attachment)}</span>` : '<span style="color:var(--ink-faint); font-size:12px;">-</span>'}
            </td>
            <td>${getLeaveStatusBadge(item.status)}</td>
            <td style="font-size:12px; color:var(--ink-soft);">${escHtml(item.approver)}</td>
            <td style="text-align:right;">
              ${item.status === 'Menunggu Persetujuan' ? `
                <div style="display:inline-flex; gap:4px;">
                  <button class="btn btn-secondary btn-sm" style="padding:3px 8px; font-size:11px; color:var(--success);" data-approve-leave="${item.id}" title="Setujui">Setujui</button>
                  <button class="btn btn-secondary btn-sm" style="padding:3px 8px; font-size:11px; color:var(--danger);" data-reject-leave="${item.id}" title="Tolak">Tolak</button>
                </div>
              ` : '<span style="font-size:11.5px; color:var(--ink-faint);">-</span>'}
            </td>
          </tr>
        `).join('')}
        ${!filtered.length ? `<tr><td colspan="11" style="text-align:center; padding:32px; color:var(--ink-faint);">Tidak ada permohonan izin/cuti yang sesuai filter.</td></tr>` : ''}
      </tbody>
    </table>
  </div>
  `;
}

/* ======================= MANAGEMENT SCHEDULE CALENDAR & ROSTER ENGINE ======================= */

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const SHORT_DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function getDayOfWeekShort(year, month, day) {
  const d = new Date(year, month - 1, day);
  return SHORT_DAYS_ID[d.getDay()];
}

function isWeekendDay(year, month, day) {
  const d = new Date(year, month - 1, day);
  const w = d.getDay();
  return w === 0 || w === 6;
}

function findHolidayOnDate(holidays, year, month, day) {
  const pad = n => n.toString().padStart(2, '0');
  const dateStr = `${year}-${pad(month)}-${pad(day)}`;
  return (holidays || []).find(h => h.date === dateStr);
}

function getEmployeeDateStatus(emp, dateStr, day, holiday) {
  if (emp.schedules && emp.schedules[dateStr]) {
    return emp.schedules[dateStr];
  }

  const leaveReqs = (S.scheduleData && S.scheduleData.leaveRequests) ? S.scheduleData.leaveRequests : [];
  const activeLeave = leaveReqs.find(l => {
    if (l.status !== 'Disetujui') return false;
    const matchEmp = (l.employeeId === emp.id) || (l.employeeName === emp.name);
    if (!matchEmp) return false;
    return dateStr >= l.startDate && dateStr <= l.endDate;
  });

  if (activeLeave) {
    if (activeLeave.type && activeLeave.type.includes('Sakit')) return 'S';
    if (activeLeave.type && activeLeave.type.includes('Izin')) return 'I';
    return 'C';
  }

  if (holiday) {
    if (!emp.shiftType || emp.shiftType.includes('5-Day') || emp.shiftType.includes('Standard')) {
      return 'L';
    }
  }

  const d = new Date(dateStr);
  const dayNum = d.getDay();
  if (emp.shiftType === 'Standard 5-Day') {
    if (dayNum === 0 || dayNum === 6) return 'L';
  } else if (emp.shiftType === 'Standard 6-Day') {
    if (dayNum === 0) return 'L';
  }

  return '';
}

// 1. Komponen Filter Kalender Roster
function renderRosterFilters(month, year, division, divisions, holidaysInMonth) {
  return `
  <div class="pm-toolbar" style="margin-bottom: 16px;">
    <div class="pm-filters" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <div>
        <span class="field-lbl">Bulan</span>
        <select id="roster-filter-month" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px; font-weight:600;">
          ${MONTHS_LONG.map((mName, i) => `
            <option value="${i + 1}" ${month === (i + 1) ? 'selected' : ''}>${mName}</option>
          `).join('')}
        </select>
      </div>

      <div>
        <span class="field-lbl">Tahun</span>
        <select id="roster-filter-year" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px; font-weight:600;">
          ${[2025, 2026, 2027].map(y => `
            <option value="${y}" ${year === y ? 'selected' : ''}>Tahun ${y}</option>
          `).join('')}
        </select>
      </div>

      <div>
        <span class="field-lbl">Divisi</span>
        <select id="roster-filter-division" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px;">
          <option value="ALL" ${division === 'ALL' ? 'selected' : ''}>Semua Divisi</option>
          ${divisions.map(div => `
            <option value="${escAttr(div)}" ${division === div ? 'selected' : ''}>${escHtml(div)}</option>
          `).join('')}
        </select>
      </div>

      <div class="search-box pm-search" style="min-width:220px; align-self:flex-end;">
        <input type="text" id="roster-search-input" placeholder="Cari nama / posisi pegawai..." value="${escAttr(S.scheduleRosterSearch || '')}">
      </div>
    </div>

    <div style="display:flex; align-items:center; gap:8px; align-self:flex-end;">
      <button class="btn btn-primary btn-sm" id="btn-add-holiday">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Tambah Hari Libur
      </button>
    </div>
  </div>

  ${holidaysInMonth && holidaysInMonth.length ? `
    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:12px; font-size:12px; color:var(--ink-soft); background:var(--surface); border:1px solid var(--border); padding:8px 14px; border-radius:var(--radius);">
      <span style="font-weight:700; color:var(--danger); display:flex; align-items:center; gap:4px;">
        <span style="width:8px; height:8px; border-radius:50%; background:var(--danger);"></span> Libur Nasional Bulan Ini:
      </span>
      ${holidaysInMonth.map(h => `
        <span style="background:var(--danger-soft); color:var(--danger); padding:2px 8px; border-radius:4px; font-weight:600;" title="${escAttr(h.desc || h.name)}">
          ${parseInt(h.date.split('-')[2], 10)} ${MONTHS_SHORT[parseInt(h.date.split('-')[1], 10)-1]}: ${escHtml(h.name)}
        </span>
      `).join('')}
    </div>
  ` : ''}
  `;
}

// 2. Komponen Header Tanggal (Dua Tingkat)
function renderRosterTableHeader(daysInMonth, year, month, holidays) {
  let dateNumbersRow = '';
  let dayNamesRow = '';

  for (let d = 1; d <= daysInMonth; d++) {
    const isWeekend = isWeekendDay(year, month, d);
    const holiday = findHolidayOnDate(holidays, year, month, d);
    const dayName = getDayOfWeekShort(year, month, d);

    let numClass = 'roster-th-date-num';
    let dayClass = 'roster-th-date-day';
    let tooltipAttr = '';

    if (holiday) {
      numClass += ' is-holiday';
      dayClass += ' is-holiday';
      tooltipAttr = `title="${escAttr(holiday.name)} (${escAttr(holiday.type)})"`;
    } else if (isWeekend) {
      numClass += ' is-weekend';
      dayClass += ' is-weekend';
    }

    dateNumbersRow += `<th class="${numClass}" ${tooltipAttr}>${d}</th>`;
    dayNamesRow += `<th class="${dayClass}" ${tooltipAttr}>${dayName}</th>`;
  }

  return `
  <thead>
    <tr>
      <th rowspan="2" class="roster-th-name">Nama Pegawai</th>
      <th rowspan="2" class="roster-th-division">Divisi</th>
      ${dateNumbersRow}
      <th colspan="5" class="roster-th-rekap-main">REKAP</th>
    </tr>
    <tr>
      ${dayNamesRow}
      <th class="roster-th-rekap-sub rekap-first" title="Libur">L</th>
      <th class="roster-th-rekap-sub" title="Sakit">S</th>
      <th class="roster-th-rekap-sub" title="Alpha">A</th>
      <th class="roster-th-rekap-sub" title="Izin">I</th>
      <th class="roster-th-rekap-sub" title="Cuti">C</th>
    </tr>
  </thead>
  `;
}

// 3. Komponen Cell Status
function renderRosterStatusCell(status, isWeekend, isHoliday) {
  let colTintClass = 'roster-td-date';
  if (isHoliday) colTintClass += ' roster-col-holiday';
  else if (isWeekend) colTintClass += ' roster-col-weekend';

  let badge = '';
  if (status === 'L') {
    badge = `<span class="roster-badge-l" title="Jadwal Libur">L</span>`;
  } else if (status === 'S') {
    badge = `<span class="roster-badge-s" title="Sakit">S</span>`;
  } else if (status === 'A') {
    badge = `<span class="roster-badge-a" title="Alpha / Tanpa Keterangan">A</span>`;
  } else if (status === 'I') {
    badge = `<span class="roster-badge-i" title="Izin">I</span>`;
  } else if (status === 'C') {
    badge = `<span class="roster-badge-c" title="Cuti">C</span>`;
  } else {
    badge = `<span style="color:var(--ink-faint); font-size:10px;">·</span>`;
  }

  return `<td class="${colTintClass}">${badge}</td>`;
}

// 4. Komponen Kolom Rekap (L, S, A, I, C)
function renderRosterRekapColumns(rekap) {
  return `
    <td class="roster-td-rekap rekap-first ${rekap.L > 0 ? 'has-val-l' : ''}">${rekap.L}</td>
    <td class="roster-td-rekap">${rekap.S}</td>
    <td class="roster-td-rekap">${rekap.A}</td>
    <td class="roster-td-rekap">${rekap.I}</td>
    <td class="roster-td-rekap">${rekap.C}</td>
  `;
}

// 5. Komponen Baris Pegawai
function renderRosterEmployeeRow(emp, daysInMonth, year, month, holidays) {
  const pad = n => n.toString().padStart(2, '0');
  const rekap = { L: 0, S: 0, A: 0, I: 0, C: 0 };
  let dateCells = '';

  for (let d = 1; d <= daysInMonth; d++) {
    const isWeekend = isWeekendDay(year, month, d);
    const holiday = findHolidayOnDate(holidays, year, month, d);
    const dateStr = `${year}-${pad(month)}-${pad(d)}`;
    const status = getEmployeeDateStatus(emp, dateStr, d, holiday);

    if (status && rekap[status] !== undefined) {
      rekap[status]++;
    }

    dateCells += renderRosterStatusCell(status, isWeekend, !!holiday);
  }

  return `
  <tr>
    <td class="roster-td-name">
      <div style="font-weight:600; color:var(--ink); line-height:1.2;">${escHtml(emp.name)}</div>
      <div style="font-size:11px; color:var(--ink-faint); margin-top:2px;">${escHtml(emp.role || emp.id)}</div>
    </td>
    <td class="roster-td-division">
      <span style="font-size:11.5px; font-weight:500; color:var(--ink-soft);">${escHtml(emp.division)}</span>
    </td>
    ${dateCells}
    ${renderRosterRekapColumns(rekap)}
  </tr>
  `;
}

// 6. Komponen Baris Total Libur (Total L)
function renderRosterTotalRow(employees, daysInMonth, year, month, holidays) {
  const pad = n => n.toString().padStart(2, '0');
  let totalLCells = '';
  let grandTotalL = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const isWeekend = isWeekendDay(year, month, d);
    const holiday = findHolidayOnDate(holidays, year, month, d);
    const dateStr = `${year}-${pad(month)}-${pad(d)}`;

    let countLOnDate = 0;
    employees.forEach(emp => {
      const st = getEmployeeDateStatus(emp, dateStr, d, holiday);
      if (st === 'L') {
        countLOnDate++;
        grandTotalL++;
      }
    });

    let tint = holiday ? 'roster-col-holiday' : isWeekend ? 'roster-col-weekend' : '';
    let valHtml = countLOnDate > 0
      ? `<span class="roster-td-total-val has-total-l">${countLOnDate}</span>`
      : `<span style="color:var(--ink-faint);">0</span>`;

    totalLCells += `<td class="roster-td-date ${tint}">${valHtml}</td>`;
  }

  return `
  <tr class="roster-tr-total">
    <td class="roster-td-name">
      <div style="font-weight:800; color:var(--primary); font-size:13px;">Total L</div>
    </td>
    <td class="roster-td-division">
      <span style="font-size:11px; color:var(--ink-faint); font-style:italic;">Libur per Hari</span>
    </td>
    ${totalLCells}
    <td class="roster-td-rekap rekap-first has-val-l" style="font-size:13px; font-weight:800;">${grandTotalL}</td>
    <td class="roster-td-rekap" style="color:var(--ink-faint);">-</td>
    <td class="roster-td-rekap" style="color:var(--ink-faint);">-</td>
    <td class="roster-td-rekap" style="color:var(--ink-faint);">-</td>
    <td class="roster-td-rekap" style="color:var(--ink-faint);">-</td>
  </tr>
  `;
}

// 7. Komponen Tabel Kalender Lengkap
function renderRosterCalendarTable(employees, daysInMonth, year, month, holidays) {
  const tableHeader = renderRosterTableHeader(daysInMonth, year, month, holidays);
  const employeeRows = employees.map(emp => renderRosterEmployeeRow(emp, daysInMonth, year, month, holidays)).join('');
  const totalRow = renderRosterTotalRow(employees, daysInMonth, year, month, holidays);

  return `
  <div class="roster-container">
    <div class="roster-table-scroll">
      <table class="roster-table">
        ${tableHeader}
        <tbody>
          ${employeeRows}
          ${!employees.length ? `
            <tr>
              <td colspan="${daysInMonth + 7}" style="text-align:center; padding:36px; color:var(--ink-faint);">
                Tidak ada data pegawai yang sesuai dengan filter.
              </td>
            </tr>
          ` : ''}
          ${totalRow}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

// Main View Function for Tab Jadwal Libur Operasional
function renderScheduleHolidaysTab() {
  const year = parseInt(S.holidayYear || 2026, 10);
  const month = parseInt(S.holidayMonth || 9, 10);
  const divFilter = S.holidayDivision || 'ALL';
  const query = (S.scheduleRosterSearch || '').toLowerCase().trim();

  const holidays = (S.scheduleData && S.scheduleData.holidays) ? S.scheduleData.holidays : [];
  const pad = n => n.toString().padStart(2, '0');
  const ymPrefix = `${year}-${pad(month)}`;
  const holidaysInMonth = holidays.filter(h => (h.date || '').startsWith(ymPrefix));

  const allEmployees = (S.scheduleData && S.scheduleData.employeeRoster && S.scheduleData.employeeRoster.length)
    ? S.scheduleData.employeeRoster
    : [
      { id: "EMP-001", name: "Budi Santoso", division: "Business Quality & Governance", role: "Head of Dept Talent Acquisition", shiftType: "Standard 5-Day" },
      { id: "EMP-002", name: "Dimas Rantung", division: "Strategic Growth & Product", role: "Project Leader Open Branch", shiftType: "Operational Shift" },
      { id: "EMP-003", name: "Dewi Sartika", division: "Business Quality & Governance", role: "Compliance Analyst", shiftType: "Standard 5-Day" },
      { id: "EMP-004", name: "Rian Hidayat", division: "Strategic Growth & Product", role: "Branch Leader Kediri", shiftType: "Operational Shift" },
      { id: "EMP-005", name: "Siti Nurhaliza", division: "Strategic Growth & Product", role: "Product Growth Officer", shiftType: "Standard 5-Day" },
      { id: "EMP-006", name: "Ahmad Fauzi", division: "Technology & Digital", role: "Software Engineer", shiftType: "Standard 5-Day" },
      { id: "EMP-007", name: "Rizky Pratama", division: "Strategic Growth & Product", role: "Branch Leader Malang", shiftType: "Operational Shift" },
      { id: "EMP-008", name: "Hana Aeni", division: "Strategic Growth & Product", role: "Admin Sales Pasuruan", shiftType: "Standard 6-Day" },
      { id: "EMP-009", name: "Bayu Prasetyo", division: "Strategic Growth & Product", role: "Teknisi FTTH Lapangan", shiftType: "Rotating Shift" },
      { id: "EMP-010", name: "Hendra Gunawan", division: "Strategic Growth & Product", role: "Teknisi FTTH Lapangan", shiftType: "Rotating Shift" },
      { id: "EMP-011", name: "Yuli Astuti", division: "Business Quality & Governance", role: "SOP Specialist", shiftType: "Standard 5-Day" },
      { id: "EMP-012", name: "Farhan Ramadhan", division: "Technology & Digital", role: "Network Engineer NOC", shiftType: "Operational Shift" }
    ];

  // Extract unique divisions
  const divisions = Array.from(new Set(allEmployees.map(e => e.division).filter(Boolean)));

  // Filter employees
  const filteredEmployees = allEmployees.filter(emp => {
    if (divFilter !== 'ALL' && emp.division !== divFilter) return false;
    if (query) {
      const matchName = (emp.name || '').toLowerCase().includes(query);
      const matchId = (emp.id || '').toLowerCase().includes(query);
      const matchRole = (emp.role || '').toLowerCase().includes(query);
      if (!matchName && !matchId && !matchRole) return false;
    }
    return true;
  });

  const daysInMonth = getDaysInMonth(year, month);

  return `
    ${renderRosterFilters(month, year, divFilter, divisions, holidaysInMonth)}
    ${renderRosterCalendarTable(filteredEmployees, daysInMonth, year, month, holidays)}
  `;
}

/* ======================= KUARTAL / PENCAPAIAN BRANCH ENGINE ======================= */

function monthIndex(y,m){ return y*12+(m-1); }
function idxToYM(idx){ return {year:Math.floor(idx/12), month:(idx%12)+1}; }
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
const MONTHS_LONG = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function initKuartalData(raw) {
  S.kuartalData = {
    branches: raw.branches || [],
    records: {},
    augustBase: raw.augustBase || {},
    auditTrail: raw.auditTrail || []
  };

  const refIdx = monthIndex(2026, 8);

  function ageToMonths(str){
    const m = (str || '').match(/(\d+)\s*th.*?(\d+)\s*bln/);
    if(!m) return 12;
    return parseInt(m[1])*12 + parseInt(m[2]);
  }

  S.kuartalData.branches.forEach(b => {
    b.ageMonths = ageToMonths(b.usia);
    b.foundingIdx = refIdx - b.ageMonths;
    const ym = idxToYM(b.foundingIdx);
    b.foundingLabel = `${MONTHS_SHORT[ym.month-1]} ${ym.year}`;
    b.customQ1 = null;

    S.kuartalData.records[b.id] = {};
    const base = S.kuartalData.augustBase[b.id] || {target:200, onlyAdmin:5, onlyFasum:2, erp:7, ae:100};
    const totalSpan = Math.max(1, refIdx - b.foundingIdx);

    for(let idx = b.foundingIdx; idx <= refIdx + 12; idx++){
      if(idx === refIdx && S.kuartalData.augustBase[b.id]){
        S.kuartalData.records[b.id][idx] = { ...base };
        continue;
      }
      const growth = (idx - b.foundingIdx) / totalSpan;
      const scale = 0.5 + 0.5 * Math.max(0, growth);
      const ym2 = idxToYM(idx);
      S.kuartalData.records[b.id][idx] = {
        target: Math.max(20, Math.round((base.target || 200) * scale)),
        onlyAdmin: Math.max(0, Math.round((base.onlyAdmin || 5) * scale)),
        onlyFasum: Math.max(0, Math.round((base.onlyFasum || 2) * scale)),
        erp: Math.max(0, Math.round((base.erp || 7) * scale)),
        ae: Math.max(0, Math.round((base.ae || 100) * scale))
      };
    }
  });
}

function getKuartalBranchQuarters(branchId, year) {
  const b = (S.kuartalData.branches || []).find(x => x.id === branchId);
  if(!b) return [];
  const foundingYM = idxToYM(b.foundingIdx);
  if(foundingYM.year > year) return [];

  let q1Start = foundingYM.month;
  let q1End = Math.min(12, q1Start + 3);
  let q1StartYear = year;
  let q1EndYear = year;

  if(b.customQ1){
    q1Start = b.customQ1.start;
    q1End = b.customQ1.end;
    q1StartYear = b.customQ1.startYear ?? year;
    q1EndYear = b.customQ1.endYear ?? year;
  }

  let quarters = [];
  quarters.push({
    q: 1,
    year: q1StartYear,
    startIdx: monthIndex(q1StartYear, q1Start),
    endIdx: monthIndex(q1EndYear, q1End),
    label: `${MONTHS_SHORT[q1Start-1]} ${q1StartYear} – ${MONTHS_SHORT[q1End-1]} ${q1EndYear}`
  });

  let nextMonth = q1End + 1;
  let nextYear = q1EndYear;
  if(nextMonth > 12){ nextMonth -= 12; nextYear += 1; }

  for(let q = 2; q <= 4; q++){
    let mStartMonth = nextMonth;
    let mStartYear = nextYear;
    let mEndMonth = mStartMonth + 2;
    let mEndYear = mStartYear;
    while(mEndMonth > 12){ mEndMonth -= 12; mEndYear += 1; }

    quarters.push({
      q,
      year: mStartYear,
      startIdx: monthIndex(mStartYear, mStartMonth),
      endIdx: monthIndex(mEndYear, mEndMonth),
      label: `${MONTHS_SHORT[mStartMonth-1]} – ${MONTHS_SHORT[mEndMonth-1]} ${mStartYear}`
    });

    nextMonth = mEndMonth + 1;
    nextYear = mEndYear;
    if(nextMonth > 12){ nextMonth -= 12; nextYear += 1; }
  }

  return quarters;
}

function calculateKuartalData(branchId, year) {
  const rawQuarters = getKuartalBranchQuarters(branchId, year);
  if(!rawQuarters.length) return [];

  let processed = [];
  let yearSurplus = 0;
  const b = (S.kuartalData.branches || []).find(x => x.id === branchId);
  const refIdx = monthIndex(2026, 8);

  rawQuarters.forEach(qObj => {
    let qTarget = 0;
    let qTotal = 0;
    let monthsCount = 0;

    for(let idx = qObj.startIdx; idx <= qObj.endIdx; idx++){
      if(idx >= b.foundingIdx && idx <= refIdx){
        const d = (S.kuartalData.records[branchId] || {})[idx];
        if(d){
          qTarget += d.target || 0;
          qTotal += (d.onlyAdmin || 0) + (d.ae || 0);
          monthsCount++;
        }
      }
    }

    const rawDiff = qTotal - qTarget;
    let availableCarryBefore = yearSurplus;
    let net = rawDiff + yearSurplus;
    const expectedMonths = (qObj.endIdx - qObj.startIdx) + 1;

    let status = 'Data Belum Lengkap';
    if(monthsCount >= Math.min(3, expectedMonths)){
      status = net >= 0 ? 'Tercapai' : 'Tidak Tercapai';
    }

    processed.push({
      ...qObj,
      monthsCount,
      rawDiff,
      availableCarryBefore,
      net,
      target: qTarget,
      total: qTotal,
      status
    });

    yearSurplus = net >= 0 ? net : 0;
  });

  return processed;
}

function renderKuartalPage() {
  if (S.activeKuartalDetailBranch) {
    return renderKuartalBranchDetail(S.activeKuartalDetailBranch);
  }

  const isKelola = S.kuartalMainTab === 'kelolaTarget';
  const tabPencapaianActive = !isKelola ? 'active' : '';
  const tabKelolaActive = isKelola ? 'active' : '';

  let kuartalContent = '';
  if (!isKelola) {
    kuartalContent = renderKuartalPencapaianView();
  } else {
    kuartalContent = renderKuartalKelolaTargetView();
  }

  return `
  <div class="page-head" style="margin-bottom: 20px;">
    <div>
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">Pencapaian Branch</h1>
      <p style="margin: 0; font-size: 13.5px; color: var(--ink-soft);">
        Rekap target &amp; closing branch — bulanan, kuartal operasional fleksibel, dan tahunan · Sales Operations &amp; Growth.
      </p>
    </div>
    <div style="display:flex; gap:8px;">
      <button class="btn btn-secondary btn-sm" id="btn-export-kuartal-csv">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Export CSV
      </button>
    </div>
  </div>

  <div style="margin-bottom: 16px;">
    <div class="pm-view-toggle" style="display:inline-flex;">
      <button class="pm-view-btn ${tabPencapaianActive}" id="tab-btn-pencapaian">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        Pencapaian Branch
      </button>
      <button class="pm-view-btn ${tabKelolaActive}" id="tab-btn-kelolatarget">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Kelola Target &amp; Kuartal
      </button>
    </div>
  </div>

  <div id="kuartal-main-container">
    ${kuartalContent}
  </div>
  `;
}

function renderKuartalPencapaianView() {
  const branches = S.kuartalData.branches || [];
  const fBranch = S.kuartalBranch || 'all';
  const fStatus = S.kuartalStatus || 'all';
  const view = S.kuartalView || 'bulanan';
  const year = S.kuartalYear || 2026;
  const month = S.kuartalMonth || 8;

  const filtered = branches.filter(b => {
    if (fBranch !== 'all' && b.id !== fBranch) return false;
    return true;
  });

  // Calculate status per branch
  const rows = filtered.map(b => {
    const quarters = calculateKuartalData(b.id, year);
    const rec = (S.kuartalData.records[b.id] || {})[monthIndex(year, month)];
    const totalClosing = rec ? (rec.onlyAdmin || 0) + (rec.ae || 0) : 0;
    const target = rec ? (rec.target || 0) : 0;
    const selisih = totalClosing - target;
    const persen = target ? (totalClosing / target) * 100 : 0;

    let status = 'Data Belum Lengkap';
    if (rec) {
      status = totalClosing >= target ? 'Tercapai' : 'Tidak Tercapai';
    }

    return {
      branch: b,
      rec,
      totalClosing,
      target,
      selisih,
      persen,
      quarters,
      status
    };
  }).filter(r => fStatus === 'all' || r.status === fStatus);

  const totalCount = rows.length;
  const tercapaiCount = rows.filter(r => r.status === 'Tercapai').length;
  const tidakCount = rows.filter(r => r.status === 'Tidak Tercapai').length;
  const pendingCount = rows.filter(r => r.status === 'Data Belum Lengkap').length;

  const kpiHtml = `
  <div class="kpi-row-kuartal">
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Total Branch</div>
        <div class="kpi-icon-kuartal" style="background:var(--primary-soft); color:var(--primary);">🏢</div>
      </div>
      <div class="val">${totalCount}</div>
      <div class="sub">dalam periode terpilih</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Tercapai</div>
        <div class="kpi-icon-kuartal" style="background:var(--success-soft); color:var(--success);">✓</div>
      </div>
      <div class="val">${tercapaiCount}</div>
      <div class="sub">${totalCount ? Math.round((tercapaiCount / totalCount) * 100) : 0}% dari branch</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Tidak Tercapai</div>
        <div class="kpi-icon-kuartal" style="background:var(--danger-soft); color:var(--danger);">✕</div>
      </div>
      <div class="val">${tidakCount}</div>
      <div class="sub">${totalCount ? Math.round((tidakCount / totalCount) * 100) : 0}% dari branch</div>
    </div>
    <div class="kpi-card-kuartal">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div class="lbl">Data Belum Lengkap</div>
        <div class="kpi-icon-kuartal" style="background:var(--accent-soft); color:var(--accent);">⏳</div>
      </div>
      <div class="val">${pendingCount}</div>
      <div class="sub">perlu pembaruan</div>
    </div>
  </div>`;

  let tableHtml = '';
  if (view === 'bulanan') {
    tableHtml = `
    <div class="table-card-kuartal">
      <div class="table-card-head-kuartal">
        <div>
          <h2>Tabel Data Closing — ${MONTHS_LONG[month - 1]} ${year}</h2>
          <div class="meta">${rows.length} branch ditampilkan</div>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:45px;">No</th>
              <th>Branch</th>
              <th style="text-align:right;">Only Admin</th>
              <th style="text-align:right;">Only Fasum</th>
              <th style="text-align:right;">Admin ERP</th>
              <th style="text-align:right;">Closing AE</th>
              <th style="text-align:right; font-weight:700;">Total Closing</th>
              <th style="text-align:right;">Target</th>
              <th style="text-align:right;">Selisih</th>
              <th style="text-align:right;">%</th>
              <th style="width:130px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => {
              const d = r.rec;
              const sign = r.selisih > 0 ? '+' : '';
              const selCls = r.selisih >= 0 ? 'selisih-pos' : 'selisih-neg';
              const stBadge = r.status === 'Tercapai' ? '<span class="badge badge-status">Tercapai</span>' : r.status === 'Tidak Tercapai' ? '<span class="badge" style="background:var(--danger-soft);color:var(--danger);">Tidak Tercapai</span>' : '<span class="badge badge-draft">Belum Lengkap</span>';
              return `
              <tr>
                <td>${i + 1}</td>
                <td style="font-weight:600; color:var(--ink);">${escHtml(r.branch.name)}</td>
                <td style="text-align:right;">${d ? d.onlyAdmin.toLocaleString('id-ID') : '-'}</td>
                <td style="text-align:right;">${d ? d.onlyFasum.toLocaleString('id-ID') : '-'}</td>
                <td style="text-align:right;">${d ? d.erp.toLocaleString('id-ID') : '-'}</td>
                <td style="text-align:right;">${d ? d.ae.toLocaleString('id-ID') : '-'}</td>
                <td style="text-align:right; font-weight:700; color:var(--primary);">${r.totalClosing.toLocaleString('id-ID')}</td>
                <td style="text-align:right;">${r.target.toLocaleString('id-ID')}</td>
                <td style="text-align:right;" class="${selCls}">${sign}${r.selisih.toLocaleString('id-ID')}</td>
                <td style="text-align:right;">${r.persen.toFixed(1)}%</td>
                <td>${stBadge}</td>
              </tr>`;
            }).join('')}
            ${!rows.length ? `<tr><td colspan="11" style="text-align:center;padding:24px;color:var(--ink-faint);">Tidak ada data closing untuk filter yang dipilih.</td></tr>` : ''}
          </tbody>
        </table>
      </div>
      <div style="padding:10px 16px; font-size:12px; color:var(--ink-faint); border-top:1px solid var(--border);">
        ℹ️ Total Closing = Closing AE + Only Admin.
      </div>
    </div>`;
  } else if (view === 'triwulan') {
    tableHtml = `
    <div class="table-card-kuartal">
      <div class="table-card-head-kuartal">
        <div>
          <h2>Kuartal per Branch (${year})</h2>
          <div class="meta">${rows.length} branch &bull; siklus kuartal fleksibel &amp; carry-over otomatis</div>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th rowspan="2" class="sticky-col sticky-no" style="vertical-align:middle;">No</th>
              <th rowspan="2" class="sticky-col sticky-branch" style="vertical-align:middle;">Branch</th>
              <th rowspan="2" class="sticky-col sticky-berdiri" style="vertical-align:middle;">Berdiri</th>
              <th colspan="6" style="text-align:center; background:var(--division-bg); border-left: 2px solid var(--border-strong);">Kuartal 1</th>
              <th colspan="6" style="text-align:center; background:var(--surface); border-left: 2px solid var(--border-strong);">Kuartal 2</th>
              <th colspan="6" style="text-align:center; background:var(--division-bg); border-left: 2px solid var(--border-strong);">Kuartal 3</th>
              <th colspan="6" style="text-align:center; background:var(--surface); border-left: 2px solid var(--border-strong);">Kuartal 4</th>
            </tr>
            <tr>
              <th style="font-size:10.5px; border-left:2px solid var(--border-strong);">Periode</th><th>Target</th><th>Closing</th><th>Selisih</th><th>Carry</th><th>Status</th>
              <th style="font-size:10.5px; border-left:2px solid var(--border-strong);">Periode</th><th>Target</th><th>Closing</th><th>Selisih</th><th>Carry</th><th>Status</th>
              <th style="font-size:10.5px; border-left:2px solid var(--border-strong);">Periode</th><th>Target</th><th>Closing</th><th>Selisih</th><th>Carry</th><th>Status</th>
              <th style="font-size:10.5px; border-left:2px solid var(--border-strong);">Periode</th><th>Target</th><th>Closing</th><th>Selisih</th><th>Carry</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => {
              const qs = r.quarters || [];
              let cells = '';
              for (let qIdx = 0; qIdx < 4; qIdx++) {
                const q = qs[qIdx];
                if (!q) {
                  cells += `<td colspan="6" style="text-align:center; color:var(--ink-faint); font-size:12px; border-left:2px solid var(--border-strong);">—</td>`;
                } else {
                  const selCls = q.net >= 0 ? 'selisih-pos' : 'selisih-neg';
                  const sign = q.net > 0 ? '+' : '';
                  const stBadge = q.status === 'Tercapai' ? '<span class="badge badge-status" style="font-size:10.5px;">Tercapai</span>' : '<span class="badge" style="background:var(--danger-soft);color:var(--danger);font-size:10.5px;">Tidak</span>';
                  cells += `
                  <td style="font-size:11px; border-left:2px solid var(--border-strong); color:var(--ink-soft);">${escHtml(q.label)}</td>
                  <td style="text-align:right;">${q.target.toLocaleString('id-ID')}</td>
                  <td style="text-align:right; font-weight:700; color:var(--primary);">${q.total.toLocaleString('id-ID')}</td>
                  <td style="text-align:right;" class="${selCls}">${sign}${q.net.toLocaleString('id-ID')}</td>
                  <td style="text-align:right;">${q.availableCarryBefore.toLocaleString('id-ID')}</td>
                  <td>${stBadge}</td>`;
                }
              }
              return `
              <tr>
                <td class="sticky-col sticky-no">${i + 1}</td>
                <td class="sticky-col sticky-branch" style="font-weight:600;">${escHtml(r.branch.name)}</td>
                <td class="sticky-col sticky-berdiri"><div class="founded-lbl">${escHtml(r.branch.foundingLabel)}<br>(${escHtml(r.branch.usia)})</div></td>
                ${cells}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="padding:10px 16px; font-size:12px; color:var(--ink-faint); border-top:1px solid var(--border);">
        ℹ️ Kuartal 1 fleksibel (bisa 4 bulan saat awal beroperasi), Kuartal 2–4 berdurasi 3 bulan dengan carry-over surplus otomatis.
      </div>
    </div>`;
  } else {
    // View Tahunan
    tableHtml = `
    <div class="table-card-kuartal">
      <div class="table-card-head-kuartal">
        <div>
          <h2>Rekap Tahunan ${year}</h2>
          <div class="meta">${rows.length} branch ditampilkan</div>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:45px;">No</th>
              <th>Branch</th>
              <th style="text-align:right;">Cakupan Data</th>
              <th style="text-align:right;">Target Tahunan</th>
              <th style="text-align:right; font-weight:700;">Total Closing Tahunan</th>
              <th style="text-align:right;">Selisih</th>
              <th style="text-align:right;">%</th>
              <th style="width:130px;">Status</th>
              <th style="width:80px; text-align:right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => {
              let totTarget = 0, totClosing = 0, count = 0;
              for (let m = 1; m <= 12; m++) {
                const recM = (S.kuartalData.records[r.branch.id] || {})[monthIndex(year, m)];
                if (recM) {
                  totTarget += recM.target || 0;
                  totClosing += (recM.onlyAdmin || 0) + (recM.ae || 0);
                  count++;
                }
              }
              const sel = totClosing - totTarget;
              const pct = totTarget ? (totClosing / totTarget) * 100 : 0;
              const stBadge = totClosing >= totTarget ? '<span class="badge badge-status">Tercapai</span>' : '<span class="badge" style="background:var(--danger-soft);color:var(--danger);">Tidak Tercapai</span>';
              return `
              <tr>
                <td>${i + 1}</td>
                <td style="font-weight:600; color:var(--ink);">${escHtml(r.branch.name)}</td>
                <td style="text-align:right;">${count} / 12 bulan <span class="chip-ytd">YTD</span></td>
                <td style="text-align:right;">${totTarget.toLocaleString('id-ID')}</td>
                <td style="text-align:right; font-weight:700; color:var(--primary);">${totClosing.toLocaleString('id-ID')}</td>
                <td style="text-align:right;" class="${sel >= 0 ? 'selisih-pos' : 'selisih-neg'}">${sel > 0 ? '+' : ''}${sel.toLocaleString('id-ID')}</td>
                <td style="text-align:right;">${pct.toFixed(1)}%</td>
                <td>${stBadge}</td>
                <td style="text-align:right;">
                  <button class="btn btn-secondary btn-sm" style="padding:3px 8px; font-size:11.5px;" data-open-branch-detail="${r.branch.id}">Detail</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  return `
  <!-- Filter Bar -->
  <div class="kuartal-filter-bar">
    <div class="pm-view-toggle">
      <button class="pm-view-btn ${view==='bulanan'?'active':''}" id="btn-view-bulanan">Bulanan</button>
      <button class="pm-view-btn ${view==='triwulan'?'active':''}" id="btn-view-triwulan">Kuartal per Branch</button>
      <button class="pm-view-btn ${view==='tahunan'?'active':''}" id="btn-view-tahunan">Tahunan</button>
    </div>

    ${view === 'bulanan' ? `
    <div>
      <span class="field-lbl">Bulan</span>
      <select class="modal-inp" id="fMonth" style="padding:6px 10px; font-size:13px;">
        ${MONTHS_LONG.map((mName, i) => `<option value="${i+1}" ${month===(i+1)?'selected':''}>${mName}</option>`).join('')}
      </select>
    </div>` : ''}

    <div>
      <span class="field-lbl">Tahun</span>
      <select class="modal-inp" id="fYear" style="padding:6px 10px; font-size:13px;">
        ${[2023, 2024, 2025, 2026, 2027].map(y => `<option value="${y}" ${year===y?'selected':''}>${y}</option>`).join('')}
      </select>
    </div>

    <div>
      <span class="field-lbl">Branch</span>
      <select class="modal-inp" id="fBranch" style="padding:6px 10px; font-size:13px;">
        <option value="all">Semua Branch</option>
        ${branches.map(b => `<option value="${b.id}" ${fBranch===b.id?'selected':''}>${escHtml(b.name)}</option>`).join('')}
      </select>
    </div>

    <div>
      <span class="field-lbl">Status</span>
      <select class="modal-inp" id="fStatus" style="padding:6px 10px; font-size:13px;">
        <option value="all">Semua Status</option>
        <option value="Tercapai" ${fStatus==='Tercapai'?'selected':''}>Tercapai</option>
        <option value="Tidak Tercapai" ${fStatus==='Tidak Tercapai'?'selected':''}>Tidak Tercapai</option>
        <option value="Data Belum Lengkap" ${fStatus==='Data Belum Lengkap'?'selected':''}>Data Belum Lengkap</option>
      </select>
    </div>

    <button class="btn btn-ghost btn-sm" id="btnResetFilter" style="margin-left:auto;">Reset Filter</button>
  </div>

  ${kpiHtml}
  ${tableHtml}
  `;
}

function renderKuartalKelolaTargetView() {
  const branches = S.kuartalData.branches || [];
  const year = S.kelolaYear || 2026;
  const fBranch = S.kelolaBranch || 'all';

  const filtered = branches.filter(b => fBranch === 'all' || b.id === fBranch);

  return `
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
    <div class="kuartal-filter-bar" style="margin-bottom:0; padding:10px 14px;">
      <div>
        <span class="field-lbl">Filter Tahun</span>
        <select class="modal-inp" id="kelolaYearSelect" style="padding:6px 10px; font-size:13px;">
          ${[2023, 2024, 2025, 2026, 2027].map(y => `<option value="${y}" ${year===y?'selected':''}>${y}</option>`).join('')}
        </select>
      </div>
      <div>
        <span class="field-lbl">Filter Branch</span>
        <select class="modal-inp" id="kelolaBranchFilter" style="padding:6px 10px; font-size:13px;">
          <option value="all">Semua Branch</option>
          ${branches.map(b => `<option value="${b.id}" ${fBranch===b.id?'selected':''}>${escHtml(b.name)}</option>`).join('')}
        </select>
      </div>
      <button class="btn btn-ghost btn-sm" id="kelolaBtnReset">Reset</button>
    </div>
    <button class="btn btn-primary btn-sm" id="btn-tambah-target">+ Tambah Target</button>
  </div>

  <!-- TABEL 1: TARGET BULANAN JAN-DES -->
  <div class="table-card-kuartal">
    <div class="table-card-head-kuartal">
      <div>
        <h2>1. Tabel Target Bulanan &amp; Total Setahun</h2>
        <div class="meta">Target bulanan Jan - Des untuk tahun ${year}</div>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th class="sticky-col sticky-no">No</th>
            <th class="sticky-col sticky-branch">Branch</th>
            ${MONTHS_SHORT.map(m => `<th style="text-align:right; font-size:11px;">${m}</th>`).join('')}
            <th style="text-align:right; font-weight:700;">Total Setahun</th>
            <th style="width:70px; text-align:center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map((b, i) => {
            let monthsHtml = '';
            let sumYear = 0;
            for (let m = 1; m <= 12; m++) {
              const rec = (S.kuartalData.records[b.id] || {})[monthIndex(year, m)];
              const tVal = rec ? rec.target : 0;
              sumYear += tVal;
              monthsHtml += `<td style="text-align:right; font-weight:500;">${tVal.toLocaleString('id-ID')}</td>`;
            }
            return `
            <tr>
              <td class="sticky-col sticky-no">${i + 1}</td>
              <td class="sticky-col sticky-branch" style="font-weight:600;">${escHtml(b.name)}</td>
              ${monthsHtml}
              <td style="text-align:right; font-weight:700; color:var(--primary);">${sumYear.toLocaleString('id-ID')}</td>
              <td style="text-align:center;">
                <button class="btn-ghost btn-sm" style="padding:3px 7px;" data-edit-target-branch="${b.id}" title="Edit Target">${ICONS.edit}</button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- TABEL 2: FASE KUARTAL BRANCH -->
  <div class="table-card-kuartal">
    <div class="table-card-head-kuartal">
      <div>
        <h2>2. Tabel Fase Kuartal Branch</h2>
        <div class="meta">Pemetaan rentang bulan &amp; tahun operasional kuartal per branch</div>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:45px;">No</th>
            <th>Nama Branch</th>
            <th style="background:var(--division-bg); border-left:2px solid var(--border-strong);">Kuartal 1</th>
            <th style="border-left:2px solid var(--border-strong);">Kuartal 2</th>
            <th style="background:var(--division-bg); border-left:2px solid var(--border-strong);">Kuartal 3</th>
            <th style="border-left:2px solid var(--border-strong);">Kuartal 4</th>
            <th style="width:80px; text-align:center;">Aksi Fase</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map((b, i) => {
            const quarters = calculateKuartalData(b.id, year);
            return `
            <tr>
              <td>${i + 1}</td>
              <td><div style="font-weight:600;">${escHtml(b.name)}</div><div class="founded-lbl">${escHtml(b.foundingLabel)}</div></td>
              ${quarters.map(q => `
                <td style="border-left:2px solid var(--border-strong); font-size:12px; font-weight:600;">${escHtml(q.label)}</td>
              `).join('')}
              <td style="text-align:center;">
                <button class="btn btn-secondary btn-sm" style="padding:3px 8px; font-size:11px;" data-edit-fase-branch="${b.id}">Atur</button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
}

function renderKuartalBranchDetail(branchId) {
  const b = (S.kuartalData.branches || []).find(x => x.id === branchId);
  if (!b) return '';
  const year = S.kuartalYear || 2026;
  const quarters = calculateKuartalData(branchId, year);

  let rowsHtml = '';
  let lastYearVal = 0;

  for (let m = 1; m <= 12; m++) {
    const idx = monthIndex(year, m);
    const d = (S.kuartalData.records[branchId] || {})[idx];
    if (!d) continue;

    const qNum = Math.floor((m - 1) / 3) + 1;
    const qObj = quarters.find(q => q.q === qNum);
    const tClosing = (d.onlyAdmin || 0) + (d.ae || 0);
    const selisihMurni = tClosing - (d.target || 0);

    rowsHtml += `
    <tr>
      <td style="font-weight:600;">${MONTHS_LONG[m - 1]}</td>
      <td><b>Q${qNum}</b></td>
      <td>${year}</td>
      <td style="text-align:right;">${d.target.toLocaleString('id-ID')}</td>
      <td style="text-align:right; font-weight:700; color:var(--primary);">${tClosing.toLocaleString('id-ID')}</td>
      <td style="text-align:right;" class="${selisihMurni >= 0 ? 'selisih-pos' : 'selisih-neg'}">${selisihMurni > 0 ? '+' : ''}${selisihMurni.toLocaleString('id-ID')}</td>
      <td style="text-align:right;">${qObj ? qObj.availableCarryBefore.toLocaleString('id-ID') : '0'}</td>
      <td style="text-align:right;" class="${qObj && qObj.net >= 0 ? 'selisih-pos' : 'selisih-neg'}">${qObj ? (qObj.net > 0 ? '+' : '') + qObj.net.toLocaleString('id-ID') : '-'}</td>
      <td>${qObj ? (qObj.status === 'Tercapai' ? '<span class="badge badge-status">Tercapai</span>' : '<span class="badge" style="background:var(--danger-soft);color:var(--danger);">Tidak</span>') : '-'}</td>
    </tr>`;

    if (qObj) lastYearVal = qObj.net >= 0 ? qObj.net : 0;
  }

  return `
  <div class="page-head" style="margin-bottom: 20px;">
    <div>
      <button class="btn btn-ghost btn-sm" id="btn-back-branch-detail" style="margin-bottom:8px; padding-left:0;">${ICONS.back} Kembali ke Daftar Branch</button>
      <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">Detail Branch — ${escHtml(b.name)}</h1>
      <p style="margin: 0; font-size: 13.5px; color: var(--ink-soft);">
        Manajemen Target, Closing Transaksi, dan Alokasi Carry-over Kuartalan &amp; Tahunan.
      </p>
    </div>
  </div>

  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; margin-bottom:20px;">
    <div class="kpi-card-kuartal">
      <div class="lbl">Usia &amp; Berdiri</div>
      <div class="val" style="font-size:20px;">${escHtml(b.usia)}</div>
      <div class="sub">${escHtml(b.foundingLabel)}</div>
    </div>
    <div class="kpi-card-kuartal">
      <div class="lbl">Status Carry-over Global</div>
      <div class="val" style="font-size:20px; color:var(--success);">Aktif</div>
      <div class="sub">Surplus otomatis bergulir ke kuartal berikutnya</div>
    </div>
    <div class="kpi-card-kuartal">
      <div class="lbl">Akumulasi Tabungan Tahun Ini</div>
      <div class="val" style="font-size:20px; color:var(--primary);">${lastYearVal.toLocaleString('id-ID')}</div>
      <div class="sub">Carry-over bersih yang siap diteruskan</div>
    </div>
  </div>

  <div class="table-card-kuartal">
    <div class="table-card-head-kuartal">
      <div>
        <h2>Tabel Kinerja Bulanan &amp; Carry-over Kuartalan</h2>
        <div class="meta">Rincian per bulan, alokasi carry-over, dan status pencapaian tahun ${year}</div>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Bulan</th>
            <th>Kuartal</th>
            <th>Tahun</th>
            <th style="text-align:right;">Target Bulan</th>
            <th style="text-align:right;">Total Closing</th>
            <th style="text-align:right;">Selisih Murni</th>
            <th style="text-align:right;">Carry Masuk</th>
            <th style="text-align:right;">Selisih Bersih (Net)</th>
            <th>Status Kuartal</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>
  `;
}


/* ======================= OPEN BRANCH PAGE ======================= */

function formatDisplayDate(str) {
  if (!str) return '-';
  if (str.includes('/')) return str;
  const parts = str.split('-');
  if (parts.length === 3) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const mIdx = parseInt(parts[1], 10) - 1;
    return `${parts[2]} ${months[mIdx] || parts[1]} ${parts[0]}`;
  }
  return str;
}

function calculateBranchAggregateProgress(b) {
  if (!b || !b.monitors || !b.monitors.length) return b ? (b.progress || 0) : 0;
  const sum = b.monitors.reduce((acc, m) => acc + (m.progress || 0), 0);
  return Math.round(sum / b.monitors.length);
}

function renderOpenBranchPage(){
  const q = (S.obSearchQuery || '').toLowerCase().trim();
  const lf = S.obLifecycleFilter || 'ALL';

  const filteredBranches = S.branches.filter(b => {
    if (lf !== 'ALL' && (b.lifecycleStatus || 'Draft') !== lf) return false;
    if (q) {
      const matchName = (b.name || '').toLowerCase().includes(q);
      const matchFull = (b.fullName || '').toLowerCase().includes(q);
      const matchLoc = (b.location || '').toLowerCase().includes(q);
      const matchLeader = (b.projectLeader || '').toLowerCase().includes(q);
      if (!matchName && !matchFull && !matchLoc && !matchLeader) return false;
    }
    return true;
  });

  const getLifecycleBadge = st => {
    if (st === 'Release') return `<span class="badge badge-lifecycle-release">Release</span>`;
    if (st === 'Pra-Release') return `<span class="badge badge-lifecycle-pra-release">Pra-Release</span>`;
    return `<span class="badge badge-lifecycle-draft">Draft</span>`;
  };
    
  let rows = filteredBranches.length ? filteredBranches.map((b, i) => {
    const badgeCls = b.status === 'Aktif' ? 'badge-status' : 'badge-nonaktif';
    const aggProg = calculateBranchAggregateProgress(b);
    const targetDateDisp = b.targetOpenDate ? formatDisplayDate(b.targetOpenDate) : 'Belum ditetapkan';

    return `<tr>
      <td style="text-align:center; font-weight:600;">${String(i+1).padStart(2,'0')}</td>
      <td>
        <div style="font-weight:600; color:var(--ink); font-size:13.5px; cursor:pointer;" data-view-branch="${b.id}">${escHtml(b.name)}</div>
        <div style="font-size:11.5px; color:var(--ink-soft); display:flex; gap:8px; align-items:center;">
          ${b.projectLeader ? `<span>Leader: <b>${escHtml(b.projectLeader)}</b></span>` : ''}
          ${b.fullName && b.fullName !== b.name ? `<span style="color:var(--ink-faint); font-style:italic;">&bull; ${escHtml(b.fullName)}</span>` : ''}
        </div>
      </td>
      <td>${escHtml(b.location || '-')}</td>
      <td>
        <div style="font-weight:600; font-size:12.5px; color:var(--primary);">${targetDateDisp}</div>
      </td>
      <td>${getLifecycleBadge(b.lifecycleStatus || 'Draft')}</td>
      <td>
        <div class="progress-cell">
          <span style="font-weight:700; width:34px;">${aggProg}%</span>
          <div class="progress-track" style="width:70px;"><div class="progress-fill" style="width:${aggProg}%;"></div></div>
        </div>
      </td>
      <td><span class="badge ${badgeCls}">${escHtml(b.status || 'Aktif')}</span></td>
      <td style="color:var(--ink-faint); font-size:12px;">${escHtml(b.lastUpdated || '-')}</td>
      <td style="text-align: right; position: relative;">
        <div style="display:inline-flex; align-items:center; gap:4px;">
          <button class="btn btn-secondary btn-sm" data-view-branch="${b.id}" style="padding:4px 8px; font-size:11.5px;">Rancangan</button>
          <button class="kebab-btn" data-kebab="branch:${b.id}">${ICONS.kebab}</button>
        </div>
        ${kebabOpen('branch', b.id) ? `
        <div class="kebab-menu">
          <button data-view-branch="${b.id}">${ICONS.eye} Buka Rancangan Program</button>
          <button data-edit-branch="${b.id}">${ICONS.edit} Edit Project Branch</button>
          <button data-toggle-branch="${b.id}">${b.status === 'Aktif' ? 'Non-aktifkan' : 'Aktifkan'}</button>
          <button class="danger" data-delete-branch="${b.id}">${ICONS.trash} Hapus Branch</button>
        </div>` : ''}
      </td>
    </tr>`;
  }).join('') : `<tr><td colspan="9" style="text-align:center; padding: 36px; color:var(--ink-faint);">Tidak ada project branch yang sesuai filter.</td></tr>`;

  return `
  <div class="page-head" style="margin-bottom: 20px;">
    <div>
      <h1 style="font-size:22px; font-weight:700; margin:0 0 4px;">Open Branch Monitoring</h1>
      <p style="margin:0; font-size:13.5px; color:var(--ink-soft);">
        Dashboard pemantauan pembukaan cabang baru, tracking 10 workstream terintegrasi, dan evaluasi kesiapan rilis.
      </p>
    </div>
    <button class="btn btn-primary" data-add-branch="1">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Tambah Project Branch
    </button>
  </div>

  <div class="pm-toolbar" style="margin-bottom: 16px;">
    <div class="pm-filters">
      <div class="search-box pm-search" style="min-width:260px;">
        <input type="text" id="ob-search-input" placeholder="Cari Branch, Lokasi, Leader..." value="${escAttr(S.obSearchQuery)}">
      </div>
      <select id="ob-lifecycle-filter" class="modal-inp" style="width: auto; padding: 7px 12px; font-size: 13px;">
        <option value="ALL" ${lf==='ALL'?'selected':''}>Semua Status Lifecycle</option>
        <option value="Draft" ${lf==='Draft'?'selected':''}>Draft</option>
        <option value="Pra-Release" ${lf==='Pra-Release'?'selected':''}>Pra-Release</option>
        <option value="Release" ${lf==='Release'?'selected':''}>Release</option>
      </select>
    </div>
    <div style="font-size:12.5px; color:var(--ink-faint);">
      Total: <b>${filteredBranches.length}</b> branch terdaftar
    </div>
  </div>

  <div style="overflow-x: auto; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-card);">
    <table class="data-table" style="border:none; border-radius:0;">
      <thead>
        <tr>
          <th style="width:45px; text-align:center;">No</th>
          <th style="min-width:180px;">Branch &amp; Project</th>
          <th>Lokasi</th>
          <th style="width:140px;">Rencana Pembukaan</th>
          <th style="width:110px;">Status Lifecycle</th>
          <th style="width:140px;">Progress Monitoring</th>
          <th style="width:100px;">Operasional</th>
          <th style="width:130px;">Last Update</th>
          <th style="width:110px; text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  `;
}

function renderBranchDetailPage() {
  const b = S.branches.find(x => x.id === S.activeBranchId);
  if (!b) return '';
  const activeTab = S.obDetailTab || 'summary';

  const lifecycleBadge = b.lifecycleStatus === 'Release' ? '<span class="badge badge-lifecycle-release">Release</span>' :
    b.lifecycleStatus === 'Pra-Release' ? '<span class="badge badge-lifecycle-pra-release">Pra-Release</span>' :
    '<span class="badge badge-lifecycle-draft">Draft</span>';

  const monitors = b.monitors || [];
  const completedCount = monitors.filter(m => m.status === 'Completed' || m.progress === 100).length;
  const inProgressCount = monitors.filter(m => m.status === 'On Progress' || (m.progress > 0 && m.progress < 100)).length;
  const holdCount = monitors.filter(m => m.status === 'Hold' || (m.blocker && m.blocker !== '-')).length;
  const aggProg = calculateBranchAggregateProgress(b);

  let tabContent = '';
  if (activeTab === 'summary') {
    tabContent = renderRancanganProgramSummaryTable(b);
  } else if (activeTab === 'readiness') {
    tabContent = renderOpeningReadinessView(b);
  } else if (activeTab === 'timeline') {
    tabContent = renderTimelineSummaryView(b);
  }

  return `
  <div style="margin-bottom:12px;">
    <button class="btn btn-ghost btn-sm" data-nav-ob-home="1" style="padding-left:0; color:var(--ink-soft);">${ICONS.back} Kembali ke List Open Branch</button>
  </div>

  <div class="ob-summary-hero">
    <div class="ob-summary-hero-top">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
          <h2 style="margin:0; font-size:22px; font-weight:700; color:var(--ink);">${escHtml(b.fullName || b.name)}</h2>
          ${lifecycleBadge}
          <span class="badge ${b.status==='Aktif'?'badge-status':'badge-nonaktif'}">${escHtml(b.status || 'Aktif')}</span>
        </div>
        <div style="font-size:13px; color:var(--ink-soft);">${escHtml(b.location)} &bull; Diperbarui: ${escHtml(b.lastUpdated || '-')}</div>
      </div>
      <button class="btn btn-secondary btn-sm" data-edit-branch="${b.id}">${ICONS.edit} Edit Project Branch</button>
    </div>

    <div class="ob-summary-hero-grid">
      <div class="ob-hero-stat-card">
        <span class="lbl">Rencana Tanggal Pembukaan</span>
        <span class="val" style="color:var(--primary); font-size:17px;">${b.targetOpenDate ? formatDisplayDate(b.targetOpenDate) : '01 Jan 2027'}</span>
        <span class="sub">Target Open All Branch</span>
      </div>
      <div class="ob-hero-stat-card">
        <span class="lbl">Project Leader</span>
        <span class="val" style="font-size:16px;">${escHtml(b.projectLeader || 'Dimas Rantung')}</span>
        <span class="sub">Penanggung Jawab Utama</span>
      </div>
      <div class="ob-hero-stat-card">
        <span class="lbl">Total Progress Project</span>
        <div style="display:flex; align-items:center; gap:8px; margin-top:3px;">
          <span class="val" style="color:var(--primary); font-size:18px;">${aggProg}%</span>
          <div class="progress-track" style="flex:1; height:6px;"><div class="progress-fill" style="width:${aggProg}%;"></div></div>
        </div>
        <span class="sub">Agregasi 10 Workstream</span>
      </div>
      <div class="ob-hero-stat-card">
        <span class="lbl">Status Workstream</span>
        <span class="val" style="font-size:16px;">${completedCount} <span style="font-size:12px; font-weight:500; color:var(--ink-faint);">/ ${monitors.length} Selesai</span></span>
        <span class="sub">${inProgressCount} Berjalan &bull; ${holdCount} Perlu Perhatian</span>
      </div>
    </div>
  </div>

  <div class="pm-view-toggle" style="display:inline-flex; margin-bottom:18px;">
    <button class="pm-view-btn ${activeTab==='summary'?'active':''}" data-ob-tab="summary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      Rancangan Program (Summary 10 Workstream)
    </button>
    <button class="pm-view-btn ${activeTab==='readiness'?'active':''}" data-ob-tab="readiness">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Opening Readiness Checklist
    </button>
    <button class="pm-view-btn ${activeTab==='timeline'?'active':''}" data-ob-tab="timeline">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      Timeline &amp; Fase
    </button>
  </div>

  ${tabContent}
  `;
}

function renderRancanganProgramSummaryTable(b) {
  const getStatusBadge = status => {
    if (status === 'Completed') return `<span class="badge badge-ws-completed">Completed</span>`;
    if (status === 'On Progress') return `<span class="badge badge-ws-progress">On Progress</span>`;
    if (status === 'Hold') return `<span class="badge badge-ws-hold">Hold</span>`;
    if (status === 'N/A') return `<span class="badge badge-ws-na">N/A</span>`;
    return `<span class="badge badge-ws-planning">Planning</span>`;
  };

  const rows = (b.monitors || []).map((m, i) => {
    const prog = m.progress || 0;
    const st = m.status || (prog === 100 ? 'Completed' : prog > 0 ? 'On Progress' : 'Planning');
    const sourceSheet = `Monitoring - ${m.name.replace('Opsi Lokasi POP ODC', 'Opsi Lokasi POP OD')}`;
    const pic = m.pic || (m.popOdcOptions && m.popOdcOptions[0] ? m.popOdcOptions[0].surveyor : b.projectLeader || 'PIC Workstream');
    const target = m.targetDate || (m.pembangunanPopData && m.pembangunanPopData[0] ? m.pembangunanPopData[0].dokumentasi.targetODCReady : b.targetOpenDate ? formatDisplayDate(b.targetOpenDate) : '-');
    const blocker = m.blocker || (m.status === 'Hold' ? 'Menunggu persetujuan stakeholder' : '-');
    const nextAction = m.nextAction || 'Lanjutkan tahapan verifikasi lapangan';
    const evidence = m.evidence || (m.popOdcOptions && m.popOdcOptions[0] ? 'Link Maps & Foto' : '-');

    return `
    <tr>
      <td style="font-weight:600; text-align:center;">${i + 1}</td>
      <td>
        <div style="font-weight:600; color:var(--ink); font-size:13.5px;">${escHtml(m.name)}</div>
        <div style="font-size:11px; color:var(--ink-faint); font-family:monospace;">${escHtml(sourceSheet)}</div>
      </td>
      <td>${getStatusBadge(st)}</td>
      <td>
        <div class="progress-cell">
          <span style="font-weight:600; width:34px;">${prog}%</span>
          <div class="progress-track" style="width:60px;"><div class="progress-fill" style="width:${prog}%;"></div></div>
        </div>
      </td>
      <td><span style="font-size:12.5px; font-weight:500;">${escHtml(pic)}</span></td>
      <td style="font-size:12px; color:var(--ink-soft);">${escHtml(target)}</td>
      <td style="max-width:200px; white-space:normal; font-size:12px; line-height:1.4;">
        ${blocker !== '-' ? `<span style="color:var(--danger); font-weight:500;">⚠️ ${escHtml(blocker)}</span>` : '<span style="color:var(--ink-faint);">-</span>'}
      </td>
      <td style="max-width:200px; white-space:normal; font-size:12px; line-height:1.4; color:var(--ink-soft);">
        ${escHtml(nextAction)}
      </td>
      <td style="font-size:12px;">
        ${evidence !== '-' ? `<span class="doc-link" style="cursor:pointer;" data-view-monitor="${m.id}">${ICONS.link} ${escHtml(evidence)}</span>` : '<span style="color:var(--ink-faint);">-</span>'}
      </td>
      <td style="text-align:right;">
        <button class="btn btn-secondary btn-sm" data-view-monitor="${m.id}" style="padding:4px 10px; font-size:12px;">
          Buka Sheet
        </button>
      </td>
    </tr>`;
  }).join('');

  return `
  <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-card);">
    <div style="padding:16px 20px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="margin:0; font-size:15px; font-weight:700;">Rancangan Program — Summary 10 Workstream</h3>
        <p style="margin:2px 0 0; font-size:12px; color:var(--ink-soft);">Sheet master progress yang merangkum kondisi terakhir dari seluruh sheet monitoring aktif.</p>
      </div>
      <div style="font-size:12px; color:var(--ink-faint);">Single Source of Truth: Detail pekerjaan tetap diisi pada masing-masing sheet.</div>
    </div>
    <div style="overflow-x:auto;">
      <table class="data-table" style="border:none; border-radius:0;">
        <thead>
          <tr>
            <th style="width:40px; text-align:center;">No</th>
            <th style="min-width:180px;">Workstream &amp; Source Sheet</th>
            <th style="width:110px;">Status Summary</th>
            <th style="width:125px;">Progress</th>
            <th style="width:140px;">PIC</th>
            <th style="width:110px;">Target</th>
            <th style="min-width:170px;">Kendala / Blocker</th>
            <th style="min-width:170px;">Next Action</th>
            <th style="width:130px;">Evidence</th>
            <th style="width:100px; text-align:right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderOpeningReadinessView(b) {
  const chk = b.readinessChecklist || {
    operational: [
      { id: "ro-1", title: "Branch Leader telah aktif dan siap bertugas", done: true },
      { id: "ro-2", title: "Teknisi telah menyelesaikan training dan siap operasional", done: true },
      { id: "ro-3", title: "Account Executive ready untuk canvassing", done: false },
      { id: "ro-4", title: "Akun ERP BL, AE, dan Teknisi telah aktif", done: true },
      { id: "ro-5", title: "Kantor Branch siap digunakan (listrik, air, AC)", done: false }
    ],
    technical: [
      { id: "rt-1", title: "POP ODC telah aktif dan lolos pengujian", done: false },
      { id: "rt-2", title: "Jalur Backbone telah terhubung dengan redaman standar", done: false },
      { id: "rt-3", title: "Perangkat aktif (OLT, Switch, Mikrotik) normal", done: false },
      { id: "rt-4", title: "Internet kantor branch telah aktif", done: false },
      { id: "rt-5", title: "Seluruh area batch awal telah siap dilayani", done: false }
    ],
    commercial: [
      { id: "rc-1", title: "Banner promosi & spanduk telah terpasang", done: false },
      { id: "rc-2", title: "Marketing kit & brosur paket penjualan tersedia", done: true },
      { id: "rc-3", title: "Sales system & kuartal siap digunakan", done: true },
      { id: "rc-4", title: "Perizinan area penjualan/coverage telah siap", done: false }
    ],
    launch: [
      { id: "rl-1", title: "Canvassing telah dimulai di coverage terpilih", done: false },
      { id: "rl-2", title: "Customer pertama berhasil terpasang", done: false },
      { id: "rl-3", title: "Serah terima proyek (BAST) disetujui Direksi/Manajemen", done: false },
      { id: "rl-4", title: "Branch dinyatakan siap beroperasi penuh (Hard Launch)", done: false }
    ]
  };

  const calcCat = items => {
    const done = items.filter(x => x.done).length;
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
  };

  const op = calcCat(chk.operational || []);
  const tc = calcCat(chk.technical || []);
  const cm = calcCat(chk.commercial || []);
  const ln = calcCat(chk.launch || []);

  return `
  <div class="ob-readiness-grid">
    <div class="ob-readiness-card">
      <div class="ob-readiness-card-head">
        <h4>Operational Readiness</h4>
        <span class="badge ${op.pct===100?'badge-ws-completed':'badge-ws-progress'}">${op.done}/${op.total} (${op.pct}%)</span>
      </div>
      <div style="display:flex; flex-direction:column;">
        ${(chk.operational || []).map(item => `
          <label class="ob-checklist-item ${item.done?'done':''}">
            <input type="checkbox" data-ob-readiness-toggle="operational" data-item-id="${item.id}" ${item.done?'checked':''}>
            <span>${escHtml(item.title)}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="ob-readiness-card">
      <div class="ob-readiness-card-head">
        <h4>Technical Readiness</h4>
        <span class="badge ${tc.pct===100?'badge-ws-completed':'badge-ws-progress'}">${tc.done}/${tc.total} (${tc.pct}%)</span>
      </div>
      <div style="display:flex; flex-direction:column;">
        ${(chk.technical || []).map(item => `
          <label class="ob-checklist-item ${item.done?'done':''}">
            <input type="checkbox" data-ob-readiness-toggle="technical" data-item-id="${item.id}" ${item.done?'checked':''}>
            <span>${escHtml(item.title)}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="ob-readiness-card">
      <div class="ob-readiness-card-head">
        <h4>Commercial Readiness</h4>
        <span class="badge ${cm.pct===100?'badge-ws-completed':'badge-ws-progress'}">${cm.done}/${cm.total} (${cm.pct}%)</span>
      </div>
      <div style="display:flex; flex-direction:column;">
        ${(chk.commercial || []).map(item => `
          <label class="ob-checklist-item ${item.done?'done':''}">
            <input type="checkbox" data-ob-readiness-toggle="commercial" data-item-id="${item.id}" ${item.done?'checked':''}>
            <span>${escHtml(item.title)}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <div class="ob-readiness-card">
      <div class="ob-readiness-card-head">
        <h4>Soft Launch &amp; Handover Plan</h4>
        <span class="badge ${ln.pct===100?'badge-ws-completed':'badge-ws-progress'}">${ln.done}/${ln.total} (${ln.pct}%)</span>
      </div>
      <div style="display:flex; flex-direction:column;">
        ${(chk.launch || []).map(item => `
          <label class="ob-checklist-item ${item.done?'done':''}">
            <input type="checkbox" data-ob-readiness-toggle="launch" data-item-id="${item.id}" ${item.done?'checked':''}>
            <span>${escHtml(item.title)}</span>
          </label>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function renderTimelineSummaryView(b) {
  const phases = [
    { name: "1. Perencanaan (Planning)", durasi: "Bulan 1 - 2", desc: "Perencanaan area, penyusunan polygon RK/ODP, feasibility study lokasi POP ODC & kantor branch, serta persiapan perizinan permit.", status: "Completed" },
    { name: "2. Persiapan (Preparation)", durasi: "Bulan 2 - 3", desc: "Finalisasi sewa kantor branch, pengajuan permit ODC & tiang, rekruitmen SDM (Branch Leader, Teknisi, AE), dan pengadaan material infrastruktur.", status: "On Progress" },
    { name: "3. Pelaksanaan (Execution)", durasi: "Bulan 3 - 5", desc: "Pembangunan fisik dudukan POP ODC, penarikan kabel feeder backbone route area, penanaman tiang & QC, instalasi PLN & aktivasi OLT, serta komitmen fasum free wifi.", status: "On Progress" },
    { name: "4. Opening Branch (Go-Live)", durasi: "Bulan 5 - 6", desc: "Verifikasi operational readiness, technical readiness, pemasangan banner promosi, soft launch canvassing pelanggan awal, hingga handover resmi & hard launch.", status: "Planning" }
  ];

  return `
  <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:24px; box-shadow:var(--shadow-card);">
    <h3 style="margin:0 0 4px; font-size:16px; font-weight:700;">Timeline Summary &amp; Tahapan Pelaksanaan</h3>
    <p style="margin:0 0 20px; font-size:13px; color:var(--ink-soft);">Alur 4 fase pembukaan branch baru dari perencanaan awal hingga pembukaan operasional penuh.</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
      ${phases.map((p, idx) => `
        <div style="background:var(--division-bg); border-radius:var(--radius-lg); padding:16px; border:1px solid var(--border); display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13.5px; color:var(--primary);">${escHtml(p.name)}</span>
            <span class="badge ${p.status==='Completed'?'badge-ws-completed':p.status==='On Progress'?'badge-ws-progress':'badge-ws-planning'}">${p.status}</span>
          </div>
          <div style="font-size:11.5px; color:var(--ink-faint); font-weight:600;">Estimasi: ${p.durasi}</div>
          <div style="font-size:12.5px; color:var(--ink-soft); line-height:1.45;">${escHtml(p.desc)}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderMonitorDetailPage() {
  const b = S.branches.find(x => x.id === S.activeBranchId);
  if (!b) return '';
  const m = b.monitors.find(x => x.id === S.activeMonitorId);
  if (!m) return '';
  
  let content = '';
  
  if (m.name === 'Opsi Lokasi POP ODC' && m.popOdcOptions) {
     content = `
       <div class="pop-odc-container" style="margin-top: 24px;">
          ${m.popOdcOptions.map((opt, i) => `
             <div class="pop-odc-card">
                <div class="pop-odc-card-header">
                   <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                       <h3 style="margin:0; font-size:16px; font-weight:600; color:var(--primary);">Opsi Lokasi POP ODC #${i+1}</h3>
                       <div style="display:flex; gap:8px;">
                           <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--ink-soft);" data-edit-odc="${i}">${ICONS.edit} Edit</button>
                           <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--danger);" data-delete-odc="${i}">${ICONS.trash} Hapus</button>
                       </div>
                   </div>
                   <div class="pop-odc-header-grid">
                      <div class="grid-item"><span class="lbl">No</span><span class="val">: ${opt.no}</span></div>
                      <div class="grid-item"><span class="lbl">Nama Surveyor</span><span class="val">: ${escHtml(opt.surveyor)}</span></div>
                      <div class="grid-item"><span class="lbl">Tanggal</span><span class="val">: ${escHtml(opt.date)}</span></div>
                      <div class="grid-item"><span class="lbl">Opsi untuk Branch</span><span class="val">: ${escHtml(opt.branchOption)}</span></div>
                      <div class="grid-item"><span class="lbl">Status</span><span class="val">: ${escHtml(opt.status)}</span></div>
                      <div class="grid-item"><span class="lbl">Rekomendasi</span><span class="val">: ${escHtml(opt.recommendation)}</span></div>
                   </div>
                </div>
                <div class="pop-odc-table-wrapper" style="overflow-x:auto;">
                   <table class="data-table pop-odc-table" style="border:none; border-radius:0;">
                      <thead>
                         <tr><th style="border-top:none;">Kategori</th><th style="border-top:none;">Indikator</th><th style="border-top:none;">Keterangan</th></tr>
                      </thead>
                      <tbody>
                         <!-- Identitas Lokasi -->
                         <tr><td rowspan="4">Identitas Lokasi</td><td>Alamat Lengkap</td><td>${escHtml(opt.location.address)}</td></tr>
                         <tr><td>Link Google Maps</td><td>${opt.location.gmaps ? `<a href="${escAttr(opt.location.gmaps)}" class="doc-link" target="_blank">${ICONS.link} Buka Maps</a>` : '-'}</td></tr>
                         <tr><td>PIC / Penanggung Jawab Lokasi</td><td>${escHtml(opt.location.pic)}</td></tr>
                         <tr><td>Status Lahan</td><td>${escHtml(opt.location.landStatus)}</td></tr>
                         
                         <!-- Keamanan & Kondisi Lingkungan -->
                         <tr><td rowspan="5">Keamanan & Kondisi Lingkungan</td><td>Ada Pihak yang Melakukan Pengawasan</td><td>${escHtml(opt.environment.pengawasan)}</td></tr>
                         <tr><td>Akses Kendaraan Operasional</td><td>${escHtml(opt.environment.akses)}</td></tr>
                         <tr><td>Lokasi Tidak Terlalu Terbuka</td><td>${escHtml(opt.environment.terbuka)}</td></tr>
                         <tr><td>Terlindung dari Matahari Langsung</td><td>${escHtml(opt.environment.matahari)}</td></tr>
                         <tr><td>Risiko Banjir</td><td>${escHtml(opt.environment.banjir)}</td></tr>
                         
                         <!-- Dokumentasi & Rekomendasi -->
                         <tr><td rowspan="2">Dokumentasi & Rekomendasi</td><td>Link Dokumentasi</td><td>${opt.documentation.fileLink ? `<a href="${opt.documentation.fileLink.startsWith('http') ? escAttr(opt.documentation.fileLink) : '#'}" class="doc-link" target="${opt.documentation.fileLink.startsWith('http')?'_blank':'_self'}">${ICONS.link} ${escHtml(opt.documentation.fileLink)}</a>` : '-'}</td></tr>
                         <tr><td>Catatan</td><td>${escHtml(opt.documentation.notes)}</td></tr>
                      </tbody>
                   </table>
                </div>
             </div>
          `).join('')}
          <button class="btn btn-secondary" data-add-odc="1" style="margin-top:8px;">${ICONS.plus} Tambah Opsi Lokasi</button>
       </div>
     `;
  } else if (m.name === 'Permit' && m.permitData) {
      const cell = val => {
          let s = (val || "").toString().trim();
          if(!s) return "-";
          if(s.startsWith('http')) return `<a href="${escAttr(s)}" class="doc-link" target="_blank">${ICONS.link} Buka Tautan</a>`;
          return escHtml(s);
      };
      
      content = `
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; margin-top:24px;">
              <h3 style="margin:0; font-size:16px;">Data Permit</h3>
              <button class="btn btn-primary btn-sm" data-add-permit="1">${ICONS.plus} Tambah Data Permit</button>
          </div>
          <div style="overflow-x:auto; padding-bottom:16px;">
             <table class="data-table" style="min-width:1800px;">
                <thead>
                   <tr>
                      <th colspan="6" class="th-group-1">Informasi Area</th>
                      <th colspan="11" class="th-group-2">Informasi Permit</th>
                      <th colspan="5" class="th-group-3">Monitoring progress</th>
                   </tr>
                   <tr>
                      <!-- Area -->
                      <th>No</th><th>Kecamatan</th><th>Kelurahan</th><th>Kode Area</th><th>RW</th><th>RT</th>
                      <!-- Permit -->
                      <th>Jenis Permit</th><th>Status Planner</th><th>PIC Planner</th><th>Status Permit</th><th>PIC Permit</th><th>Tanggal Naik Proposal</th><th>Tanggal Naik BAK</th><th>Target Selesai</th><th>Tanggal Selesai</th><th>Jenis Kompensasi</th><th>Nilai Kompensasi</th>
                      <!-- Monitoring -->
                      <th>Overall Status</th><th>Link Proposal</th><th>Link BAK</th><th>Keterangan</th><th style="text-align:center;">Action</th>
                   </tr>
                </thead>
                <tbody>
                   ${m.permitData.length ? m.permitData.map((p, i) => `
                     <tr>
                        <td>${cell(p.no)}</td>
                        <td>${cell(p.kecamatan)}</td>
                        <td>${cell(p.kelurahan)}</td>
                        <td>${cell(p.kodeArea)}</td>
                        <td>${cell(p.rw)}</td>
                        <td>${cell(p.rt)}</td>
                        
                        <td>${cell(p.jenisPermit)}</td>
                        <td>${cell(p.statusPlanner)}</td>
                        <td>${cell(p.picPlanner)}</td>
                        <td>${cell(p.statusPermit)}</td>
                        <td>${cell(p.picPermit)}</td>
                        <td>${cell(p.tglProposal)}</td>
                        <td>${cell(p.tglBak)}</td>
                        <td>${cell(p.targetSelesai)}</td>
                        <td>${cell(p.tglSelesai)}</td>
                        <td>${cell(p.jenisKompensasi)}</td>
                        <td>${cell(p.nilaiKompensasi)}</td>
                        
                        <td><span class="badge ${p.overallStatus==='Done'?'badge-status':(p.overallStatus==='Pending'?'badge-nonaktif':'badge-draft')}">${cell(p.overallStatus)}</span></td>
                        <td>${cell(p.linkProposal)}</td>
                        <td>${cell(p.linkBak)}</td>
                        <td>${cell(p.keterangan)}</td>
                        
                        <td style="text-align:center; position:relative;">
                          <button class="kebab-btn" data-kebab="permit:${p.id}">${ICONS.kebab}</button>
                          ${kebabOpen('permit', p.id) ? `
                          <div class="kebab-menu" style="right:14px;">
                            <button data-edit-permit="${i}">${ICONS.edit} Edit</button>
                            <button class="danger" data-delete-permit="${i}">${ICONS.trash} Hapus</button>
                          </div>` : ''}
                        </td>
                     </tr>
                   `).join('') : `<tr><td colspan="22" style="text-align:center; padding:32px; color:var(--ink-faint);">Belum ada Data Permit.</td></tr>`}
                </tbody>
             </table>
          </div>
      `;
  } else if (m.name === 'Plan Area' && m.planAreaData) {
      const cell = val => {
          let s = (val || "").toString().trim();
          return s ? escHtml(s) : "-";
      };
      
      content = `
          <div style="display:flex; flex-wrap: wrap; gap: 24px; margin-top:24px; padding: 16px; border:1px dashed var(--border-strong); border-radius: 8px; background:var(--dept-bg);">
              <div><span style="color:var(--ink-faint); font-size:12.5px;">PIC Task:</span> <span style="font-weight:500; font-size:13.5px;">BL (saat selesai training)</span></div>
              <div><span style="color:var(--ink-faint); font-size:12.5px;">Link Planning RK/ODP (Google Earth):</span> <a href="#" class="doc-link">Link GE Pandaan 1, 2 Gempol</a></div>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; margin-top:24px;">
              <h3 style="margin:0; font-size:16px;">Data Plan Area</h3>
              <button class="btn btn-primary btn-sm" data-add-plan="1">${ICONS.plus} Tambah Data Plan Area</button>
          </div>
          
          <div style="overflow-x:auto; padding-bottom:16px;">
             <table class="data-table" style="min-width:1400px;">
                <thead>
                   <tr>
                      <th colspan="8" style="background-color: var(--accent-soft) !important; color: var(--accent) !important; text-align: center !important; border-bottom: none !important; padding: 12px 16px !important;">Informasi Area</th>
                      <th colspan="7" style="background-color: #EFE4F5 !important; color: #531D70 !important; text-align: center !important; border-bottom: none !important; padding: 12px 16px !important;">Perencanaan Area</th>
                   </tr>
                   <tr>
                      <!-- Area -->
                      <th>No</th><th>Nama Area</th><th>Kode Area</th><th>Kecamatan</th><th>Kelurahan</th><th>RW</th><th>Total Luas Area</th><th>Standart Luas Area<br>(100 M - 150 M)</th>
                      <!-- Perencanaan -->
                      <th>Status Area</th><th>Plan RK</th><th>Plan ODP</th><th>Jumlah Tiang</th><th>Sumber CJ</th><th>Catatan</th><th style="text-align:center;">Action</th>
                   </tr>
                </thead>
                <tbody>
                   ${m.planAreaData.length ? m.planAreaData.map((p, i) => `
                     <tr>
                        <td>${cell(p.no)}</td>
                        <td>${cell(p.namaArea)}</td>
                        <td>${cell(p.kodeArea)}</td>
                        <td>${cell(p.kecamatan)}</td>
                        <td>${cell(p.kelurahan)}</td>
                        <td>${cell(p.rw)}</td>
                        <td>${cell(p.totalLuasArea)}</td>
                        <td>${cell(p.stdLuasArea)}</td>
                        
                        <td><span class="badge ${p.statusArea==='Approved'?'badge-status':(p.statusArea==='Pending'?'badge-draft':'badge-nonaktif')}">${cell(p.statusArea)}</span></td>
                        <td>${cell(p.planRk)}</td>
                        <td>${cell(p.planOdp)}</td>
                        <td>${cell(p.jmlTiang)}</td>
                        <td>${cell(p.sumberCj)}</td>
                        <td style="max-width:200px; white-space:normal;">${cell(p.keterangan)}</td>
                        
                        <td style="text-align:center; position:relative;">
                          <button class="kebab-btn" data-kebab="plan:${p.id}">${ICONS.kebab}</button>
                          ${kebabOpen('plan', p.id) ? `
                          <div class="kebab-menu" style="right:14px;">
                            <button data-edit-plan="${i}">${ICONS.edit} Edit</button>
                            <button class="danger" data-delete-plan="${i}">${ICONS.trash} Hapus</button>
                          </div>` : ''}
                        </td>
                     </tr>
                   `).join('') : `<tr><td colspan="15" style="text-align:center; padding:32px; color:var(--ink-faint);">Belum ada Data Plan Area.</td></tr>`}
                </tbody>
             </table>
          </div>
      `;
  } else if (m.name === 'Opsi Lokasi Kantor Branch' && m.branchOfficeOptions) {
    const selKey = `${S.activeBranchId}:${S.activeMonitorId}`;
    const sel = S.bofSelection[selKey] || {};

    content = `
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:20px; margin-top:24px; margin-bottom:8px;">
        <div style="font-size:13px; font-weight:600; color:var(--primary); margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid var(--border);">Keputusan Lokasi Kantor Branch</div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
          <div>
            <div style="font-size:12px; color:var(--ink-faint); margin-bottom:4px;">Opsi yang Dipilih</div>
            <select id="bof-sel-opsi" style="width:100%; padding:8px 10px; border:1px solid var(--border-strong); border-radius:var(--radius); font-size:13px; background:var(--surface); color:var(--ink);" data-bof-sel-opsi="1">
              <option value="">-- Belum Dipilih --</option>
              ${m.branchOfficeOptions.map((opt, i) => `<option value="${opt.id}" ${sel.opsiId===opt.id?'selected':''}>Opsi #${opt.no} – ${escAttr(opt.identitas.alamat.substring(0,40))}...</option>`).join('')}
            </select>
          </div>
          <div>
            <div style="font-size:12px; color:var(--ink-faint); margin-bottom:4px;">Harga Sewa</div>
            <input id="bof-sel-harga" type="text" placeholder="mis. Rp 45.000.000 / tahun" value="${escAttr(sel.hargaSewa||'')}" style="width:100%; padding:8px 10px; border:1px solid var(--border-strong); border-radius:var(--radius); font-size:13px; background:var(--surface); color:var(--ink);" data-bof-sel-harga="1">
          </div>
          <div>
            <div style="font-size:12px; color:var(--ink-faint); margin-bottom:4px;">Dokumen Planning Kantor</div>
            <input id="bof-sel-dokumen" type="text" placeholder="Link dokumen / nama file" value="${escAttr(sel.dokumenPlanning||'')}" style="width:100%; padding:8px 10px; border:1px solid var(--border-strong); border-radius:var(--radius); font-size:13px; background:var(--surface); color:var(--ink);" data-bof-sel-dokumen="1">
          </div>
        </div>
        <div style="margin-top:12px; display:flex; justify-content:flex-end;">
          <button class="btn btn-primary btn-sm" data-save-bof-sel="1">Simpan Keputusan</button>
        </div>
      </div>

      <div class="pop-odc-container" style="margin-top:16px;">
        ${m.branchOfficeOptions.map((opt, i) => `
          <div class="pop-odc-card">
            <div class="pop-odc-card-header">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <h3 style="margin:0; font-size:16px; font-weight:600; color:var(--primary);">Opsi Lokasi Kantor Branch #${opt.no}</h3>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--ink-soft);" data-edit-bof="${i}">${ICONS.edit} Edit</button>
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--danger);" data-delete-bof="${i}">${ICONS.trash} Hapus</button>
                </div>
              </div>
              <div class="pop-odc-header-grid">
                <div class="grid-item"><span class="lbl">No</span><span class="val">: ${opt.no}</span></div>
                <div class="grid-item"><span class="lbl">Nama Surveyor</span><span class="val">: ${escHtml(opt.surveyor)}</span></div>
                <div class="grid-item"><span class="lbl">Tanggal</span><span class="val">: ${escHtml(opt.date)}</span></div>
                <div class="grid-item"><span class="lbl">Status</span><span class="val">: ${escHtml(opt.status)}</span></div>
                <div class="grid-item"><span class="lbl">Rekomendasi</span><span class="val">: <span class="badge ${opt.recommendation==='Direkomendasikan'?'badge-status':opt.recommendation==='Pertimbangkan'?'badge-draft':'badge-nonaktif'}">${escHtml(opt.recommendation)}</span></span></div>
              </div>
            </div>
            <div class="pop-odc-table-wrapper" style="overflow-x:auto;">
              <table class="data-table pop-odc-table" style="border:none; border-radius:0;">
                <thead>
                  <tr><th style="border-top:none; width:180px;">Kategori</th><th style="border-top:none; width:260px;">Indikator</th><th style="border-top:none;">Keterangan</th></tr>
                </thead>
                <tbody>
                  <!-- Identitas Lokasi -->
                  <tr><td rowspan="8" style="font-weight:600; vertical-align:top; padding-top:12px;">Identitas Lokasi</td><td>Foto Tampak Depan</td><td>${opt.identitas.fotoTampakDepan ? `<a href="${escAttr(opt.identitas.fotoTampakDepan)}" class="doc-link" target="_blank">${ICONS.link} Lihat Foto</a>` : '-'}</td></tr>
                  <tr><td>Alamat Lengkap</td><td>${escHtml(opt.identitas.alamat)}</td></tr>
                  <tr><td>Link Gmaps</td><td>${opt.identitas.gmaps ? `<a href="${escAttr(opt.identitas.gmaps)}" class="doc-link" target="_blank">${ICONS.link} Buka Maps</a>` : '-'}</td></tr>
                  <tr><td>Nama Pemilik</td><td>${escHtml(opt.identitas.namaPemilik)}</td></tr>
                  <tr><td>Nomor Kontak Pemilik</td><td>${escHtml(opt.identitas.kontakPemilik)}</td></tr>
                  <tr><td>Jenis Bangunan</td><td>${escHtml(opt.identitas.jenisBangunan)}</td></tr>
                  <tr><td>Jumlah Lantai</td><td>${escHtml(opt.identitas.jumlahLantai)}</td></tr>
                  <tr><td>Jumlah Ruangan</td><td>${escHtml(opt.identitas.jumlahRuangan)}</td></tr>

                  <!-- Lokasi & Operasional -->
                  <tr><td rowspan="5" style="font-weight:600; vertical-align:top; padding-top:12px;">Lokasi &amp; Operasional</td><td>Jarak ke Area Penjualan Terjauh (Km)</td><td>${escHtml(opt.operasional.jarakAreaPenjualan)}</td></tr>
                  <tr><td>Akses Kendaraan Operasional</td><td>${escHtml(opt.operasional.aksesKendaraan)}</td></tr>
                  <tr><td>Area Parkir</td><td>${escHtml(opt.operasional.areaParkir)}</td></tr>
                  <tr><td>Kondisi Lingkungan</td><td>${escHtml(opt.operasional.kondisiLingkungan)}</td></tr>
                  <tr><td>Tingkat Keamanan Lingkungan</td><td>${escHtml(opt.operasional.keamananLingkungan)}</td></tr>

                  <!-- Kesesuaian Standar Branch -->
                  <tr><td rowspan="6" style="font-weight:600; vertical-align:top; padding-top:12px;">Kesesuaian Standar Branch</td><td>Area Brainstorming Tersedia</td><td>${escHtml(opt.standarBranch.areaBrainstorming)}</td></tr>
                  <tr><td>Area Penyimpanan Material FTTH</td><td>${escHtml(opt.standarBranch.areaMaterialFTTH)}</td></tr>
                  <tr><td>Area Penyimpanan Tiang</td><td>${escHtml(opt.standarBranch.areaTiang)}</td></tr>
                  <tr><td>Area Istirahat Tim</td><td>${escHtml(opt.standarBranch.areaIstirahat)}</td></tr>
                  <tr><td>Pantry / Dapur</td><td>${escHtml(opt.standarBranch.pantry)}</td></tr>
                  <tr><td>Kamar Mandi</td><td>${escHtml(opt.standarBranch.kamarMandi)}</td></tr>

                  <!-- Informasi Bangunan -->
                  <tr><td rowspan="5" style="font-weight:600; vertical-align:top; padding-top:12px;">Informasi Bangunan</td><td>Luas Tanah (m²)</td><td>${escHtml(opt.infoBangunan.luasTanah)}</td></tr>
                  <tr><td>Luas Bangunan (m²)</td><td>${escHtml(opt.infoBangunan.luasBangunan)}</td></tr>
                  <tr><td>Jumlah Lantai</td><td>${escHtml(opt.infoBangunan.jumlahLantai)}</td></tr>
                  <tr><td>Jumlah Ruangan</td><td>${escHtml(opt.infoBangunan.jumlahRuangan)}</td></tr>
                  <tr><td>Harga Sewa</td><td>${escHtml(opt.infoBangunan.hargaSewa)}</td></tr>

                  <!-- Kondisi Bangunan -->
                  <tr><td rowspan="6" style="font-weight:600; vertical-align:top; padding-top:12px;">Kondisi Bangunan</td><td>Kondisi Bangunan</td><td>${escHtml(opt.kondisiBangunan.kondisiBangunan)}</td></tr>
                  <tr><td>Kondisi Kelistrikan</td><td>${escHtml(opt.kondisiBangunan.kondisiKelistrikan)}</td></tr>
                  <tr><td>Daya Listrik (VA)</td><td>${escHtml(opt.kondisiBangunan.dayaListrik)}</td></tr>
                  <tr><td>Kondisi Air Bersih</td><td>${escHtml(opt.kondisiBangunan.kondisiAir)}</td></tr>
                  <tr><td>Sumber Air</td><td>${escHtml(opt.kondisiBangunan.sumberAir)}</td></tr>
                  <tr><td>Estimasi Biaya Renovasi (Isi jika membutuhkan renovasi)</td><td>${escHtml(opt.kondisiBangunan.estimasiRenovasi) || '-'}</td></tr>

                  <!-- Dokumentasi -->
                  <tr><td rowspan="1" style="font-weight:600; vertical-align:top; padding-top:12px;">Dokumentasi</td><td>Link Dokumentasi Lengkap</td><td>${opt.dokumentasi.linkDokumentasi ? `<a href="${escAttr(opt.dokumentasi.linkDokumentasi)}" class="doc-link" target="_blank">${ICONS.link} Buka Dokumentasi</a>` : '-'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
        <button class="btn btn-secondary" data-add-bof="1" style="margin-top:8px;">${ICONS.plus} Tambah Opsi Lokasi</button>
      </div>
    `;
  } else if (m.name === 'Fasum (Free WiFi)' && m.fasumData) {
    const cell = val => { const s=(val||'').toString().trim(); return s?escHtml(s):'-'; };
    const statusBadgeFsm = s => {
      const map = {'Approved':'badge-status','On Progress':'badge-draft','Pending':'badge-draft','Rejected':'badge-nonaktif'};
      return `<span class="badge ${map[s]||'badge-draft'}">${escHtml(s||'-')}</span>`;
    };
    content = `
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; margin-top:24px;">
        <h3 style="margin:0; font-size:16px;">Data Fasum (Free WiFi)</h3>
        <button class="btn btn-primary btn-sm" data-add-fasum="1">${ICONS.plus} Tambah Data Fasum</button>
      </div>
      <div style="overflow-x:auto; padding-bottom:16px;">
        <table class="data-table" style="min-width:1100px;">
          <thead>
            <tr>
              <th colspan="5" class="th-group-1" style="text-align:center;">Informasi Area</th>
              <th colspan="3" class="th-group-2" style="text-align:center;">Permintaan Fasum</th>
              <th colspan="2" class="th-group-3" style="text-align:center;">Dokumentasi</th>
              <th rowspan="2" style="text-align:center; vertical-align:middle; background:var(--surface); border-bottom:2px solid var(--border-strong);">Action</th>
            </tr>
            <tr>
              <th>No</th>
              <th>Nama Area</th>
              <th>Kelurahan</th>
              <th>RW</th>
              <th>RT</th>
              <th>Lokasi Fasum</th>
              <th>Pemohon</th>
              <th>Status</th>
              <th>Titik Koordinat</th>
              <th>Link Dokumentasi</th>
            </tr>
          </thead>
          <tbody>
            ${m.fasumData.length ? m.fasumData.map((f, i) => `
              <tr>
                <td>${cell(f.no)}</td>
                <td style="font-weight:500;">${cell(f.namaArea)}</td>
                <td>${cell(f.kelurahan)}</td>
                <td>${cell(f.rw)}</td>
                <td>${cell(f.rt)}</td>
                <td>${cell(f.lokasiFasum)}</td>
                <td>${cell(f.pemohon)}</td>
                <td>${statusBadgeFsm(f.status)}</td>
                <td>${cell(f.titikKoordinat)}</td>
                <td>${f.linkDokumentasi ? `<a href="${escAttr(f.linkDokumentasi)}" class="doc-link" target="_blank">${ICONS.link} Buka</a>` : '-'}</td>
                <td style="text-align:center; position:relative;">
                  <button class="kebab-btn" data-kebab="fasum:${f.id}">${ICONS.kebab}</button>
                  ${kebabOpen('fasum', f.id) ? `
                  <div class="kebab-menu" style="right:14px;">
                    <button data-edit-fasum="${i}">${ICONS.edit} Edit</button>
                    <button class="danger" data-delete-fasum="${i}">${ICONS.trash} Hapus</button>
                  </div>` : ''}
                </td>
              </tr>
            `).join('') : `<tr><td colspan="11" style="text-align:center;padding:32px;color:var(--ink-faint);">Belum ada Data Fasum.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  } else if (m.name === 'Pemasangan Tiang' && m.pemasanganTiangData) {
    const cell = val => { const s=(val||'').toString().trim(); return s?escHtml(s):'-'; };
    const linkCell = (url, label) => url ? `<a href="${escAttr(url)}" class="doc-link" target="_blank">${ICONS.link} ${label}</a>` : '-';
    const statusBadgeTg = s => {
      const map = { 'Selesai':'badge-status','Lolos QC':'badge-status','On Progress':'badge-draft','Belum Mulai':'badge-nonaktif','Belum QC':'badge-nonaktif','Revisi':'badge-nonaktif' };
      return `<span class="badge ${map[s]||'badge-draft'}">${escHtml(s||'-')}</span>`;
    };
    content = `
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; margin-top:24px;">
        <h3 style="margin:0; font-size:16px;">Data Pemasangan Tiang</h3>
        <button class="btn btn-primary btn-sm" data-add-tiang="1">${ICONS.plus} Tambah Data Tiang</button>
      </div>
      <div style="overflow-x:auto; padding-bottom:16px;">
        <table class="data-table" style="min-width:1400px;">
          <thead>
            <tr>
              <th colspan="5" class="th-group-1" style="text-align:center;">Informasi Tiang</th>
              <th colspan="6" class="th-group-2" style="text-align:center;">Monitoring</th>
            </tr>
            <tr>
              <th>No</th>
              <th>ID Tiang</th>
              <th>Lokasi / Segmen</th>
              <th>Link Google Maps</th>
              <th>Jenis Tiang</th>
              <th>Status Pekerjaan</th>
              <th>Status QC</th>
              <th>Link Dokumentasi</th>
              <th>Catatan</th>
              <th>Lampiran Form QC</th>
              <th>Lampiran Form Hasil Penanaman Tiang</th>
              <th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${m.pemasanganTiangData.length ? m.pemasanganTiangData.map((t, i) => `
              <tr>
                <td>${cell(t.no)}</td>
                <td style="font-weight:600;">${cell(t.idTiang)}</td>
                <td>${cell(t.lokasi)}</td>
                <td>${linkCell(t.linkGmaps, 'Buka Maps')}</td>
                <td>${cell(t.jenisTiang)}</td>
                <td>${statusBadgeTg(t.statusPekerjaan)}</td>
                <td>${statusBadgeTg(t.statusQC)}</td>
                <td>${linkCell(t.linkDokumentasi, 'Buka')}</td>
                <td style="max-width:160px;white-space:normal;">${cell(t.catatan)}</td>
                <td>${linkCell(t.lampiranFormQC, 'Form QC')}</td>
                <td>${linkCell(t.lampiranFormTanam, 'Form Tanam')}</td>
                <td style="text-align:center; position:relative;">
                  <button class="kebab-btn" data-kebab="tiang:${t.id}">${ICONS.kebab}</button>
                  ${kebabOpen('tiang', t.id) ? `
                  <div class="kebab-menu" style="right:14px;">
                    <button data-edit-tiang="${i}">${ICONS.edit} Edit</button>
                    <button class="danger" data-delete-tiang="${i}">${ICONS.trash} Hapus</button>
                  </div>` : ''}
                </td>
              </tr>
            `).join('') : `<tr><td colspan="12" style="text-align:center;padding:32px;color:var(--ink-faint);">Belum ada Data Pemasangan Tiang.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  } else if (m.name === 'Pembangunan POP ODC' && m.pembangunanPopData) {
    const statusBadgePop = s => {
      const map = { 'Done':'badge-status','Approved':'badge-status','Aktif':'badge-status','On Progress':'badge-draft','Submitted':'badge-draft','Draft':'badge-draft','Belum Mulai':'badge-nonaktif' };
      const cls = map[s] || 'badge-draft';
      return `<span class="badge ${cls}">${escHtml(s||'-')}</span>`;
    };
    content = `
      <div class="pop-odc-container" style="margin-top:24px;">
        ${m.pembangunanPopData.map((opt, i) => `
          <div class="pop-odc-card">
            <div class="pop-odc-card-header">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <h3 style="margin:0; font-size:16px; font-weight:600; color:var(--primary);">Pembangunan POP ODC #${opt.no}</h3>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--ink-soft);" data-edit-ppop="${i}">${ICONS.edit} Edit</button>
                  <button class="btn btn-ghost btn-sm" style="padding:4px 8px; color:var(--danger);" data-delete-ppop="${i}">${ICONS.trash} Hapus</button>
                </div>
              </div>
              <div class="pop-odc-header-grid">
                <div class="grid-item"><span class="lbl">No</span><span class="val">: ${opt.no}</span></div>
                <div class="grid-item"><span class="lbl">Nama Surveyor</span><span class="val">: ${escHtml(opt.surveyor)}</span></div>
                <div class="grid-item"><span class="lbl">Tanggal</span><span class="val">: ${escHtml(opt.date)}</span></div>
                <div class="grid-item"><span class="lbl">Status</span><span class="val">: ${statusBadgePop(opt.status)}</span></div>
                <div class="grid-item"><span class="lbl">Rekomendasi</span><span class="val">: ${escHtml(opt.recommendation)}</span></div>
              </div>
            </div>
            <div class="pop-odc-table-wrapper" style="overflow-x:auto;">
              <table class="data-table pop-odc-table" style="border:none; border-radius:0;">
                <thead>
                  <tr><th style="border-top:none; width:200px;">Kategori</th><th style="border-top:none; width:280px;">Indikator</th><th style="border-top:none;">Keterangan</th></tr>
                </thead>
                <tbody>
                  <!-- Informasi Lokasi -->
                  <tr><td rowspan="3" style="font-weight:600; vertical-align:top; padding-top:12px;">Informasi Lokasi</td><td>Foto Lokasi</td><td>${opt.infoLokasi.fotoLokasi ? `<a href="${escAttr(opt.infoLokasi.fotoLokasi)}" class="doc-link" target="_blank">${ICONS.link} Lihat Foto</a>` : '-'}</td></tr>
                  <tr><td>Alamat Lokasi</td><td>${escHtml(opt.infoLokasi.alamatLokasi)}</td></tr>
                  <tr><td>Link Google Maps</td><td>${opt.infoLokasi.linkGmaps ? `<a href="${escAttr(opt.infoLokasi.linkGmaps)}" class="doc-link" target="_blank">${ICONS.link} Buka Maps</a>` : '-'}</td></tr>

                  <!-- Pembangunan ODC -->
                  <tr><td rowspan="5" style="font-weight:600; vertical-align:top; padding-top:12px;">Pembangunan ODC</td><td>Status RAB Material &amp; Perangkat</td><td>${statusBadgePop(opt.pembangunanODC.statusRAB)}</td></tr>
                  <tr><td>Status Pengadaan Material ODC</td><td>${statusBadgePop(opt.pembangunanODC.statusPengadaan)}</td></tr>
                  <tr><td>Status Pembangunan ODC</td><td>${statusBadgePop(opt.pembangunanODC.statusPembangunan)}</td></tr>
                  <tr><td>Status Instalasi Perangkat ODC</td><td>${statusBadgePop(opt.pembangunanODC.statusInstalasi)}</td></tr>
                  <tr><td>Status Uji Kelayakan ODC</td><td>${statusBadgePop(opt.pembangunanODC.statusUjiKelayakan)}</td></tr>

                  <!-- Kelistrikan ODC -->
                  <tr><td rowspan="3" style="font-weight:600; vertical-align:top; padding-top:12px;">Kelistrikan ODC</td><td>Status Pengajuan PLN</td><td>${statusBadgePop(opt.kelistrikanODC.statusPengajuanPLN)}</td></tr>
                  <tr><td>Status Instalasi Listrik PLN</td><td>${statusBadgePop(opt.kelistrikanODC.statusInstalasiListrik)}</td></tr>
                  <tr><td>Status Listrik ODC</td><td>${statusBadgePop(opt.kelistrikanODC.statusListrikODC)}</td></tr>

                  <!-- Aktivasi Perangkat -->
                  <tr><td rowspan="3" style="font-weight:600; vertical-align:top; padding-top:12px;">Aktivasi Perangkat</td><td>Status Persiapan Perangkat Jaringan</td><td>${statusBadgePop(opt.aktivasiPerangkat.statusPersiapan)}</td></tr>
                  <tr><td>Status Konfigurasi Jaringan</td><td>${statusBadgePop(opt.aktivasiPerangkat.statusKonfigurasi)}</td></tr>
                  <tr><td>Status Aktivasi ODC</td><td>${statusBadgePop(opt.aktivasiPerangkat.statusAktivasiODC)}</td></tr>

                  <!-- Dokumentasi -->
                  <tr><td rowspan="4" style="font-weight:600; vertical-align:top; padding-top:12px;">Dokumentasi</td><td>Target ODC Ready</td><td>${escHtml(opt.dokumentasi.targetODCReady)}</td></tr>
                  <tr><td>Aktual ODC Ready</td><td>${escHtml(opt.dokumentasi.aktualODCReady)}</td></tr>
                  <tr><td>Catatan Kendala</td><td>${escHtml(opt.dokumentasi.catatanKendala)}</td></tr>
                  <tr><td>Link Dokumentasi Lengkap</td><td>${opt.dokumentasi.linkDokumentasi ? `<a href="${escAttr(opt.dokumentasi.linkDokumentasi)}" class="doc-link" target="_blank">${ICONS.link} Buka Dokumentasi</a>` : '-'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
        <button class="btn btn-secondary" data-add-ppop="1" style="margin-top:8px;">${ICONS.plus} Tambah Data Pembangunan POP ODC</button>
      </div>
    `;
  } else if (m.name === 'Route Area' && m.routeAreaData) {
    const cell = val => { const s = (val||'').toString().trim(); return s ? escHtml(s) : '-'; };
    const statusBadge = s => {
      const cls = s==='Aktif'?'badge-status': s==='Pending'?'badge-draft':'badge-nonaktif';
      return `<span class="badge ${cls}">${escHtml(s)}</span>`;
    };

    content = `
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; margin-top:24px;">
        <h3 style="margin:0; font-size:16px;">Data Route Area</h3>
        <button class="btn btn-primary btn-sm" data-add-route="1">${ICONS.plus} Tambah Data Route Area</button>
      </div>
      <div style="overflow-x:auto; padding-bottom:16px;">
        <table class="data-table" style="min-width:1600px;">
          <thead>
            <tr>
              <th colspan="5" class="th-group-1" style="text-align:center;">Informasi Area</th>
              <th colspan="5" class="th-group-2" style="text-align:center;">Jalur 1</th>
              <th colspan="1" style="background:var(--accent-soft);color:var(--accent);text-align:center;border-bottom:none;padding:12px 8px;">CJ</th>
              <th colspan="5" class="th-group-3" style="text-align:center;">Jalur 2</th>
              <th colspan="1" style="background:#EFE4F5;color:#531D70;text-align:center;border-bottom:none;padding:12px 8px;">CJ</th>
              <th colspan="5" class="th-group-1" style="text-align:center;">Jalur 3</th>
              <th colspan="1" style="background:var(--accent-soft);color:var(--accent);text-align:center;border-bottom:none;padding:12px 8px;">CJ</th>
              <th colspan="5" class="th-group-2" style="text-align:center;">Jalur 4</th>
              <th colspan="1" style="background:#EFE4F5;color:#531D70;text-align:center;border-bottom:none;padding:12px 8px;">CJ</th>
              <th colspan="4" class="th-group-3" style="text-align:center;">Monitoring</th>
            </tr>
            <tr>
              <!-- Informasi Area -->
              <th>No</th><th>Batch</th><th>Warna Area</th><th>Nama Area</th><th>OTB</th>
              <!-- Jalur 1 -->
              <th>Kabel</th><th>Tube</th><th>Core</th><th>Panjang (m)</th><th style="width:40px;"></th>
              <th>CJ</th>
              <!-- Jalur 2 -->
              <th>Kabel</th><th>Tube</th><th>Core</th><th>Panjang (m)</th><th style="width:40px;"></th>
              <th>CJ</th>
              <!-- Jalur 3 -->
              <th>Kabel</th><th>Tube</th><th>Core</th><th>Panjang (m)</th><th style="width:40px;"></th>
              <th>CJ</th>
              <!-- Jalur 4 -->
              <th>Kabel</th><th>Tube</th><th>Core</th><th>Panjang (m)</th><th style="width:40px;"></th>
              <th>CJ</th>
              <!-- Monitoring -->
              <th>Total Panjang (m)</th><th>Status Route</th><th>Link Dokumentasi</th><th>Catatan</th><th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${m.routeAreaData.length ? m.routeAreaData.map((r, i) => `
              <tr>
                <td>${cell(r.no)}</td>
                <td>${cell(r.batch)}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:6px;">
                    ${r.warnaArea ? `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${r.warnaHex||'#ccc'};flex-shrink:0;"></span>` : ''}
                    ${cell(r.warnaArea)}
                  </div>
                </td>
                <td style="font-weight:500;">${cell(r.namaArea)}</td>
                <td>${cell(r.otb)}</td>
                <!-- Jalur 1 -->
                <td>${cell(r.jalur1.kabel)}</td><td>${cell(r.jalur1.tube)}</td><td>${cell(r.jalur1.core)}</td><td>${cell(r.jalur1.panjang)}</td><td></td>
                <td>${cell(r.cj1)}</td>
                <!-- Jalur 2 -->
                <td>${cell(r.jalur2.kabel)}</td><td>${cell(r.jalur2.tube)}</td><td>${cell(r.jalur2.core)}</td><td>${cell(r.jalur2.panjang)}</td><td></td>
                <td>${cell(r.cj2)}</td>
                <!-- Jalur 3 -->
                <td>${cell(r.jalur3.kabel)}</td><td>${cell(r.jalur3.tube)}</td><td>${cell(r.jalur3.core)}</td><td>${cell(r.jalur3.panjang)}</td><td></td>
                <td>${cell(r.cj3)}</td>
                <!-- Jalur 4 -->
                <td>${cell(r.jalur4.kabel)}</td><td>${cell(r.jalur4.tube)}</td><td>${cell(r.jalur4.core)}</td><td>${cell(r.jalur4.panjang)}</td><td></td>
                <td>${cell(r.cj4)}</td>
                <!-- Monitoring -->
                <td style="font-weight:600;">${cell(r.totalPanjang)}</td>
                <td>${statusBadge(r.statusRoute)}</td>
                <td>${r.linkDokumentasi ? `<a href="${escAttr(r.linkDokumentasi)}" class="doc-link" target="_blank">${ICONS.link} Buka</a>` : '-'}</td>
                <td style="max-width:160px;white-space:normal;">${cell(r.catatan)}</td>
                <td style="text-align:center; position:relative;">
                  <button class="kebab-btn" data-kebab="route:${r.id}">${ICONS.kebab}</button>
                  ${kebabOpen('route', r.id) ? `
                  <div class="kebab-menu" style="right:14px;">
                    <button data-edit-route="${i}">${ICONS.edit} Edit</button>
                    <button class="danger" data-delete-route="${i}">${ICONS.trash} Hapus</button>
                  </div>` : ''}
                </td>
              </tr>
            `).join('') : `<tr><td colspan="34" style="text-align:center;padding:32px;color:var(--ink-faint);">Belum ada Data Route Area.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  } else if (m.name === 'Pemasangan Banner') {
    const list = m.bannerData || [];
    content = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin: 24px 0 16px;">
        <h3 style="margin:0; font-size:16px; font-weight:600; color:var(--ink);">Data Titik Pemasangan Banner Promosi</h3>
        <button class="btn btn-secondary btn-sm" data-add-banner="1">${ICONS.plus} Tambah Titik Banner</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px;">No</th>
              <th>Kecamatan / Kelurahan</th>
              <th>Kode Area</th>
              <th>Titik Koordinat</th>
              <th>Lokasi Maps</th>
              <th>PIC</th>
              <th>Target Pemasangan</th>
              <th>Tanggal Pemasangan</th>
              <th>Status</th>
              <th>Dokumentasi Foto</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${list.length ? list.map((item, i) => `
              <tr>
                <td>${item.no || i + 1}</td>
                <td style="font-weight:600;">${escHtml(item.kecamatan || '-')} / ${escHtml(item.kelurahan || '-')}</td>
                <td><span style="font-family:monospace; font-weight:600; color:var(--primary);">${escHtml(item.kodeArea || '-')}</span></td>
                <td>${escHtml(item.titikKoordinat || '-')}</td>
                <td>${item.linkMaps ? `<a href="${escAttr(item.linkMaps)}" target="_blank" class="doc-link">${ICONS.link} Maps</a>` : '-'}</td>
                <td>${escHtml(item.pic || '-')}</td>
                <td>${escHtml(item.targetPemasangan || '-')}</td>
                <td>${escHtml(item.tanggalPemasangan || '-')}</td>
                <td>${statusBadge(item.status || 'Planning')}</td>
                <td>${item.foto ? `<a href="${escAttr(item.foto)}" target="_blank" class="doc-link">${ICONS.eye} Lihat Foto</a>` : '<span style="color:var(--ink-faint);">-</span>'}</td>
                <td style="max-width:200px; white-space:normal; font-size:12.5px;">${escHtml(item.keterangan || '-')}</td>
              </tr>
            `).join('') : `<tr><td colspan="11" style="text-align:center; padding:32px; color:var(--ink-faint);">Belum ada data pemasangan banner.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  } else if (m.name === 'Pengajuan Material') {
    const list = m.materialData || [];
    content = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin: 24px 0 16px;">
        <h3 style="margin:0; font-size:16px; font-weight:600; color:var(--ink);">Data Pengajuan &amp; Kesiapan Material / Tools / Kantor</h3>
        <button class="btn btn-secondary btn-sm" data-add-material="1">${ICONS.plus} Tambah Item Material</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px;">No</th>
              <th>Jenis Material</th>
              <th>Nama Material / Item</th>
              <th style="text-align:right;">Kebutuhan</th>
              <th style="text-align:right;">Ready</th>
              <th style="text-align:right;">Gap</th>
              <th>Status</th>
              <th>Link BAST</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            ${list.length ? list.map((item, i) => {
              const gap = (item.kebutuhan || 0) - (item.ready || 0);
              const gapBadge = gap <= 0 ? '<span class="badge badge-ws-completed">Terpenuhi (0)</span>' : `<span class="badge badge-ws-hold">Kurang (${gap})</span>`;
              return `
              <tr>
                <td>${item.no || i + 1}</td>
                <td><span class="badge badge-staff">${escHtml(item.jenisMaterial || 'Tools')}</span></td>
                <td style="font-weight:600;">${escHtml(item.namaMaterial)}</td>
                <td style="text-align:right; font-weight:600;">${item.kebutuhan || 0}</td>
                <td style="text-align:right; font-weight:600; color:var(--primary);">${item.ready || 0}</td>
                <td style="text-align:right;">${gapBadge}</td>
                <td>${statusBadge(item.status || 'Planning')}</td>
                <td>${item.linkBAST ? `<a href="${escAttr(item.linkBAST)}" target="_blank" class="doc-link">${ICONS.link} BAST</a>` : '<span style="color:var(--ink-faint);">-</span>'}</td>
                <td style="max-width:200px; white-space:normal; font-size:12.5px;">${escHtml(item.catatan || '-')}</td>
              </tr>`;
            }).join('') : `<tr><td colspan="9" style="text-align:center; padding:32px; color:var(--ink-faint);">Belum ada data pengajuan material.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  } else {
      content = `
        <div class="placeholder-panel" style="margin-top:24px;">
           <div class="icon">${ICONS.inbox}</div>
           <h3>Detailed Monitoring UI</h3>
           <p>Konten detail untuk <b>${escHtml(m.name)}</b> akan diimplementasikan pada tahap pengembangan berikutnya.</p>
        </div>`;
  }

  return `
  <button class="btn btn-ghost btn-sm" data-nav-ob-branch="${b.id}" style="padding-left: 0; margin-bottom: 12px;">${ICONS.back} Kembali</button>
  <div class="ob-header-context">
    <h2 style="margin:0 0 4px; font-size: 20px;">${escHtml(m.name)}</h2>
    <div style="font-size:13.5px; color:var(--ink-soft); margin-bottom:8px;">${escHtml(b.name)}</div>
    <div style="display:flex; gap:16px; font-size:13px; flex-wrap: wrap;">
      <div><span style="color:var(--ink-faint);">Status:</span> <span class="badge ${m.status==='Aktif'?'badge-status':'badge-nonaktif'}">${escHtml(m.status)}</span></div>
      <div>
        <div class="progress-cell" style="display:inline-flex;">
          <span style="color:var(--ink-faint);">Progress:</span> 
          <span>${m.progress}%</span>
          <div class="progress-track" style="width:60px;"><div class="progress-fill" style="width:${m.progress}%"></div></div>
        </div>
      </div>
      <div><span style="color:var(--ink-faint);">Last Update:</span> ${escHtml(m.lastUpdated)}</div>
    </div>
  </div>
  ${content}
  `;
}

/* ======================= JOB DESCRIPTION PAGE ======================= */


function renderJobDescriptionPage(){
  if(S.directorates.length === 0) {
     return `
     <div class="empty-state" style="margin-top: 40px;">
       <p>Belum ada direktorat.</p>
       <button class="btn btn-primary" id="add-directorate-btn-empty">${ICONS.plus} Add Directorate</button>
     </div>`;
  }

  const dirSource = findDirectorate(S.activeDirectorateId) || S.directorates[0];
  const dir = getFilteredDir(dirSource, S.jdSearchQuery);
  const isSearching = !!S.jdSearchQuery;
  
  return `
  <div class="directorate-selector">
    ${S.directorates.map(d=>`
      <button class="directorate-tab ${d.id===dir.id?'active':''}" data-select-directorate="${d.id}">
        ${d.name} <span class="count">${countJobRoles(d)}</span>
      </button>`).join('')}
    <button class="dir-add-btn" id="add-directorate-btn">${ICONS.plus} Directorate</button>
  </div>
  <div class="toolbar-row" style="margin-bottom: 20px;">
    <div style="position:relative; width: 280px; flex-shrink: 0;">
      <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--ink-faint); display:flex;">${ICONS.search}</span>
      <input type="text" id="jd-search-input" placeholder="Search Job Role, Dept, Div..." value="${escAttr(S.jdSearchQuery)}" style="width:100%; padding: 8px 12px 8px 32px; border:1px solid var(--border-strong); border-radius:var(--radius); font-size:13px; background:var(--surface); color:var(--ink);">
    </div>
    <div style="display:flex; gap:8px;">
      <button class="btn btn-ghost btn-sm" style="color:var(--ink-soft);" data-edit-directorate="${dir.id}">${ICONS.edit} Edit Directorate</button>
      <button class="btn btn-ghost btn-sm" style="color:var(--danger);" data-delete-directorate="${dir.id}">${ICONS.trash} Delete Directorate</button>
      <button class="btn btn-secondary btn-sm" data-add-division="${dir.id}">${ICONS.plus} Add Division</button>
    </div>
  </div>
  <div class="hierarchy-panel">
    <table class="hierarchy-table">
      <thead><tr>
        <th>Organizational Structure</th>
        <th class="col-type">Role Type</th>
        <th class="col-action"></th>
      </tr></thead>
      <tbody>
        ${dir.divisions.length ? dir.divisions.map(v=>renderDivisionRows(dir, v, isSearching)).join('') : `<tr class="empty-row"><td colspan="3">${isSearching ? 'Tidak ada hasil pencarian.' : 'Belum ada divisi pada direktorat ini.'}</td></tr>`}
      </tbody>
    </table>
  </div>`;
}

function countJobRoles(dir){
  let n=0;
  for(const v of dir.divisions){ if(v.headOfDivisionJobRoleId) n++; for(const dep of v.departments){ n += dep.jobRoles.length; } }
  return n;
}

function kebabOpen(type,id){ return S.openKebab && S.openKebab.type===type && S.openKebab.id===id; }

function renderDivisionRows(dir, v, forceExpand = false){
  const expanded = forceExpand || S.expandedDivisions.has(v.id);
  const hod = headOfDivisionRole(v);
  let rows = `
  <tr class="row-division">
    <td>
      <div class="row-inner">
        <button class="toggle-btn" data-toggle-division="${v.id}">${expanded?ICONS.chevronDown:ICONS.chevron}</button>
        <span class="row-icon division-icon">${ICONS.division}</span>
        <span>${escHtml(v.name)}</span>
      </div>
    </td>
    <td class="row-type-cell">Division</td>
    <td class="row-action-cell">
      <button class="kebab-btn" data-kebab="division:${v.id}">${ICONS.kebab}</button>
      ${kebabOpen('division',v.id)?`
      <div class="kebab-menu">
        <button data-edit-division="${v.id}">${ICONS.edit} Edit Division</button>
        <button class="danger" data-delete-division="${v.id}">${ICONS.trash} Delete Division</button>
      </div>`:''}
    </td>
  </tr>`;
  if(!expanded) return rows;

  if(hod){
    rows += `
    <tr class="row-head">
      <td><div class="row-inner" style="padding-left:40px;">
        <span class="connector">↳</span>
        <span class="row-icon">${ICONS.person}</span>
        <div class="role-col">
          <button class="role-name clickable" data-view-role="${hod.id}">${escHtml(hod.name)}</button>
          <span class="role-sub">Head of Division</span>
        </div>
      </div></td>
      <td class="row-type-cell"><span class="badge badge-head">HEAD OF DIVISION</span></td>
      <td class="row-action-cell">
        <button class="kebab-btn" data-kebab="hod:${v.id}">${ICONS.kebab}</button>
        ${kebabOpen('hod',v.id)?`
        <div class="kebab-menu">
          <button data-view-role="${hod.id}">${ICONS.eye} View Job Description</button>
          <button data-edit-role="${hod.id}">${ICONS.edit} Edit Job Description</button>
          <button class="danger" data-remove-hod="${v.id}">${ICONS.trash} Remove Head of Division</button>
        </div>`:''}
      </td>
    </tr>`;
  } else {
    rows += `
    <tr class="row-head">
      <td colspan="3"><div class="add-row-btn-wrap" style="padding-left:40px;">
        <button class="add-inline-btn" data-assign-hod="${v.id}">${ICONS.plus} Assign Head of Division</button>
      </div></td>
    </tr>`;
  }

  rows += v.departments.map(dep=>renderDepartmentRows(dir, v, dep, forceExpand)).join('');
  rows += `
    <tr><td colspan="3"><div class="add-row-btn-wrap" style="padding-left:40px;">
      <button class="add-inline-btn" data-add-department="${v.id}">${ICONS.plus} Add Department</button>
    </div></td></tr>`;
  return rows;
}

function renderDepartmentRows(dir, v, dep, forceExpand = false){
  const expanded = forceExpand || S.expandedDepartments.has(dep.id);
  const hodept = dep.jobRoles.find(r=>r.id===dep.headOfDepartmentJobRoleId);
  const staff = dep.jobRoles.filter(r=>r.id!==dep.headOfDepartmentJobRoleId);
  let rows = `
  <tr class="row-department">
    <td><div class="row-inner" style="padding-left:24px;">
      <button class="toggle-btn" data-toggle-department="${dep.id}">${expanded?ICONS.chevronDown:ICONS.chevron}</button>
      <span class="row-icon dept-icon">${ICONS.dept}</span>
      <span>${escHtml(dep.name)}</span>
    </div></td>
    <td class="row-type-cell">Department · ${dep.jobRoles.length} role</td>
    <td class="row-action-cell">
      <button class="kebab-btn" data-kebab="department:${dep.id}">${ICONS.kebab}</button>
      ${kebabOpen('department',dep.id)?`
      <div class="kebab-menu">
        <button data-edit-department="${dep.id}">${ICONS.edit} Edit Department</button>
        <button class="danger" data-delete-department="${dep.id}">${ICONS.trash} Delete Department</button>
      </div>`:''}
    </td>
  </tr>`;
  if(!expanded) return rows;

  if(hodept){
    rows += roleRow(hodept, "HEAD OF DEPARTMENT", "badge-head", 56);
  } else {
    rows += `<tr class="row-head"><td colspan="3"><div class="add-row-btn-wrap" style="padding-left:56px;">
      <button class="add-inline-btn" data-assign-hodept="${dep.id}">${ICONS.plus} Assign Head of Department</button>
    </div></td></tr>`;
  }
  if(staff.length){
    rows += staff.map(r=>roleRow(r,"STAFF","badge-staff",56)).join('');
  } else {
    rows += `<tr class="empty-row"><td colspan="3"><span style="padding-left:56px;display:block;">Belum ada staff job role.</span></td></tr>`;
  }
  rows += `<tr><td colspan="3"><div class="add-row-btn-wrap" style="padding-left:56px;">
    <button class="add-inline-btn" data-add-jobrole="${dep.id}">${ICONS.plus} Add Job Role</button>
  </div></td></tr>`;
  return rows;
}

function roleRow(role, badgeText, badgeClass, indent){
  return `
  <tr class="row-staff">
    <td><div class="row-inner" style="padding-left:${indent}px;">
      <span class="connector">↳</span>
      <span class="row-icon">${ICONS.person}</span>
      <div class="role-col">
        <button class="role-name clickable" data-view-role="${role.id}">${escHtml(role.name)}</button>
        <span class="role-sub">${role.jd && hasAnyContent(role.jd) ? 'Job description tersedia' : 'Belum lengkap'}</span>
      </div>
    </div></td>
    <td class="row-type-cell"><span class="badge ${badgeClass}">${badgeText}</span></td>
    <td class="row-action-cell">
      <button class="kebab-btn" data-kebab="role:${role.id}">${ICONS.kebab}</button>
      ${kebabOpen('role',role.id)?`
      <div class="kebab-menu">
        <button data-view-role="${role.id}">${ICONS.eye} View Job Description</button>
        <button data-edit-role="${role.id}">${ICONS.edit} Edit Job Description</button>
        <button class="danger" data-delete-role="${role.id}">${ICONS.trash} Delete Job Role</button>
      </div>`:''}
    </td>
  </tr>`;
}

function hasAnyContent(jd){
  return !!(jd.description || jd.objectives.length || jd.responsibilities.length || jd.kpi.length);
}

/* ======================= DETAIL PAGE ======================= */


function renderDetailPage(){
  const role = findJobRole(S.detailRoleId);
  if(!role) return `<div class="empty-state"><p>Job role tidak ditemukan.</p></div>`;
  const ctx = jobRoleContext(role.id);
  const jd = S.detailEditMode ? S.editDraft : role.jd;
  
  const statusBadgeClass = S.detailEditMode ? 'badge-draft' : '';
  const statusBadgeText = S.detailEditMode ? 'DRAFT EDIT' : '';

  return `
  <div class="jd-sticky-top-area">
    <div class="jd-header-nav">
      <button class="btn btn-ghost btn-sm jd-back-btn" data-back-to-jd-list="1" data-bc-home="1" title="Kembali ke struktur">${ICONS.back} <span>Job Description</span></button>
      <div class="jd-header-actions">
        ${S.detailEditMode ? `
          <button class="btn btn-secondary btn-sm" id="btn-cancel-edit-jd" data-cancel-edit="1">Batal</button>
          <button class="btn btn-primary btn-sm" id="btn-save-jd" data-save-edit="1">Simpan Perubahan</button>
        ` : `
          <button class="btn btn-secondary btn-sm" id="btn-edit-jd" data-edit-jd="1">${ICONS.edit} <span>Edit Jabatan</span></button>
        `}
      </div>
    </div>

    <div class="jd-header-main">
      <div class="jd-header-title-row">
        <h1 class="jd-header-title">${escHtml(role.name)}</h1>
        ${S.detailEditMode ? `<span class="badge ${statusBadgeClass}">${statusBadgeText}</span>` : ''}
      </div>

      <div class="jd-header-meta">
        <div class="jd-org-trail" title="Hierarki Organisasi">
          <span class="jd-org-item">${escHtml(ctx.directorate?ctx.directorate.name:'—')}</span>
          <span class="jd-org-sep">/</span>
          <span class="jd-org-item">${escHtml(ctx.division?ctx.division.name:'—')}</span>
          ${ctx.department ? `<span class="jd-org-sep">/</span><span class="jd-org-item">${escHtml(ctx.department.name)}</span>` : ''}
        </div>

        <div class="jd-meta-pills">
          <span class="jd-pill jd-pill-type">
            <span class="jd-pill-label">Tipe:</span>
            <span class="jd-pill-val">${escHtml(role.type || 'Staff')}</span>
          </span>
          <span class="jd-pill jd-pill-supervisor">
            <span class="jd-pill-label">Atasan:</span>
            <span class="jd-pill-val">${escHtml(role.supervisor || '—')}</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  ${S.detailEditMode?`<div class="edit-banner">${ICONS.edit} Anda sedang dalam mode edit. Perubahan belum tersimpan hingga Anda menekan "Simpan Perubahan".</div>`:''}

  <div class="detail-layout">
    <div class="jd-toc-wrapper">
      <div class="jd-toc-card">
        <div class="toc-title">ON THIS PAGE</div>
        <div class="section-nav-list">
          ${SECTION_DEFS.map(s=>`<a href="#sec-${s.key}" class="${S.activeSectionKey===s.key?'active':''}" data-jump-section="${s.key}" data-section-link="${s.key}"><span class="n">${s.n}</span> <span class="t">${s.title}</span></a>`).join('')}
        </div>
      </div>
    </div>
    
    <div class="detail-main">
      ${renderSection01Identity(role, ctx)}
      ${renderSection02Description(jd)}
      ${renderSection03Objectives(jd)}
      ${renderSection04Authorities(jd)}
      ${renderSection05Responsibilities(jd)}
      ${renderSection06KPI(jd)}
      ${renderSection07KSAO(jd)}
      ${renderSection08Requirements(jd)}
      ${renderSection09Risks(jd)}
      ${renderSection10Regulations(jd)}
      ${renderSection11Leadership(jd)}
      ${renderSection12Assessments(jd)}
      ${renderSection13Communication(jd)}
      ${renderSection14Candidate(jd)}
    </div>
  </div>`;
}

function sectionHead(n,title){
  return `<div class="jd-section-head"><span class="num">${n}</span><h2>${title}</h2></div>`;
}

function renderSection01Identity(role, ctx){
  return `
  <div class="jd-section jd-section-card" id="sec-identity">
    ${sectionHead("01","Identitas Pekerjaan")}
    <div class="identity-grid">
      <div class="identity-row"><div class="k">Direktorat</div><div class="v">${escHtml(ctx.directorate?ctx.directorate.name:'—')}</div></div>
      <div class="identity-row"><div class="k">Divisi / Departemen</div><div class="v">${escHtml(ctx.division?ctx.division.name:'—')}${ctx.department?' / '+escHtml(ctx.department.name):''}</div></div>
      <div class="identity-row"><div class="k">Nama Jabatan</div><div class="v">${escHtml(role.name)}</div></div>
      <div class="identity-row"><div class="k">Tipe Jabatan</div><div class="v">${escHtml(role.type)}</div></div>
      <div class="identity-row"><div class="k">Atasan Langsung</div><div class="v">${escHtml(role.supervisor||'—')}</div></div>
    </div>
  </div>`;
}

function renderSection02Description(jd){
  const body = S.detailEditMode ? `
    <div class="edit-block">
      <p class="edit-label">Deskripsi Jabatan</p>
      <textarea data-field="description" style="min-height:140px;">${escHtml(jd.description)}</textarea>
    </div>` : (jd.description ? `<div class="narrative"><p>${escHtml(jd.description)}</p></div>` : emptyState("Belum ada deskripsi jabatan untuk Job Role ini."));
  return `<div class="jd-section jd-section-card" id="sec-description">${sectionHead("02","Deskripsi Jabatan")}${body}</div>`;
}

function renderSection03Objectives(jd){
  let body;
  if(S.detailEditMode){
    body = repeatableListEditor('objectives', jd.objectives, "Tambah output utama");
  } else if(jd.objectives.length){
    body = `<div class="outcome-list">${jd.objectives.map((o,i)=>`<div class="outcome-item"><div class="outcome-num">${String(i+1).padStart(2,'0')}</div><div class="outcome-text">${escHtml(o)}</div></div>`).join('')}</div>`;
  } else body = emptyState("Belum ada tujuan jabatan / output utama yang tercatat.");
  return `<div class="jd-section jd-section-card" id="sec-objectives">${sectionHead("03","Tujuan Jabatan / Output Utama")}${body}</div>`;
}

function renderSection04Authorities(jd){
  let body;
  if(S.detailEditMode){
    body = `
    <div class="edit-block"><p class="edit-label">Authority</p>${repeatableListEditor('authorities.granted', jd.authorities.granted, "Tambah wewenang")}</div>
    <div class="edit-block"><p class="edit-label">Limitation</p>${repeatableListEditor('authorities.limitations', jd.authorities.limitations, "Tambah batasan")}</div>
    `;
  } else if(jd.authorities.granted.length || jd.authorities.limitations.length){
    const allAuth = [...jd.authorities.granted, ...jd.authorities.limitations];
    body = `
    <ul class="wewenang-list">
      ${allAuth.map(a => `<li><span class="bullet">•</span> <span>${escHtml(a)}</span></li>`).join('')}
    </ul>`;
  } else body = emptyState("Belum ada data wewenang untuk Job Role ini.");
  return `<div class="jd-section jd-section-card" id="sec-authorities">${sectionHead("04","Wewenang")}${body}</div>`;
}

function renderSection05Responsibilities(jd){
  let body;
  if(S.detailEditMode){
    body = jd.responsibilities.map((p,pi)=>`
      <div class="edit-block" style="border:1px solid var(--border);border-radius:8px;padding:14px 16px;">
        <input data-field="responsibilities.${pi}.pillar" value="${escAttr(p.pillar)}" style="width:100%;border:1px solid var(--border-strong);border-radius:6px;padding:8px 10px;font-weight:600;font-size:13.5px;margin-bottom:10px;">
        ${p.tasks.map((t,ti)=>`
          <div class="repeat-item">
            <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
              <input data-field="responsibilities.${pi}.tasks.${ti}.title" value="${escAttr(t.title)}" placeholder="Judul tugas" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;font-weight:600;">
              <textarea data-field="responsibilities.${pi}.tasks.${ti}.desc" placeholder="Deskripsi tugas" style="min-height:44px;">${escHtml(t.desc)}</textarea>
            </div>
            <button class="rm-btn" data-remove-task="${pi}:${ti}">${ICONS.close}</button>
          </div>`).join('')}
        <button class="add-item-btn" data-add-task="${pi}">${ICONS.plus} Tambah tugas</button>
        <button class="btn btn-ghost btn-sm" style="margin-top:8px;color:var(--danger);" data-remove-pillar="${pi}">Hapus pilar ini</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-pillar="1">${ICONS.plus} Tambah pilar tanggung jawab</button>`;
  } else if(jd.responsibilities.length){
    body = `<div class="pillar-accordion">${jd.responsibilities.map((p,i)=>{
      const open = S.openPillars && S.openPillars.has(i);
      return `
      <div class="pillar">
        <button class="pillar-head" data-toggle-pillar="${i}"><span class="t">${escHtml(p.pillar)}</span><span class="n">${open?ICONS.chevronDown:ICONS.chevron} ${p.tasks.length} tugas</span></button>
        ${open?`<div class="pillar-body">${p.tasks.map(t=>`<div class="task-item"><div class="task-title">${escHtml(t.title)}</div><div class="task-desc">${escHtml(t.desc)}</div></div>`).join('')}</div>`:''}
      </div>`;
    }).join('')}</div>`;
  } else body = emptyState("Belum ada tugas dan tanggung jawab yang tercatat.");
  return `<div class="jd-section jd-section-card" id="sec-responsibilities">${sectionHead("05","Tugas dan Tanggung Jawab")}${body}</div>`;
}

function renderSection06KPI(jd){
  let body;
  if(S.detailEditMode){
    body = jd.kpi.map((k,i)=>`
      <div class="repeat-item" style="align-items:flex-start;flex-wrap:wrap;border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1;">
          <textarea data-field="kpi.${i}.keterangan" placeholder="Keterangan" style="grid-column:1/-1;min-height:52px;">${escHtml(k.keterangan)}</textarea>
          <input data-field="kpi.${i}.waktu" value="${escAttr(k.waktu)}" placeholder="Waktu" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <input data-field="kpi.${i}.kualitas" value="${escAttr(k.kualitas)}" placeholder="Kualitas" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <input data-field="kpi.${i}.akurasi" value="${escAttr(k.akurasi)}" placeholder="Akurasi" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <input data-field="kpi.${i}.biaya" value="${escAttr(k.biaya)}" placeholder="Biaya" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
        </div>
        <button class="rm-btn" data-remove-kpi="${i}">${ICONS.close}</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-kpi="1">${ICONS.plus} Tambah KPI</button>`;
  } else if(jd.kpi && jd.kpi.length){
    const cell = val => {
        let s = (val || "").toString().trim();
        return s ? escHtml(s) : "-";
    };
    body = `
    <div style="overflow-x: auto;">
      <table class="comm-table">
        <thead>
          <tr>
            <th>Keterangan</th>
            <th>Waktu</th>
            <th>Kualitas</th>
            <th>Akurasi</th>
            <th>Biaya</th>
          </tr>
        </thead>
        <tbody>
          ${jd.kpi.map(k=>`
          <tr>
            <td>${cell(k.keterangan)}</td>
            <td>${cell(k.waktu)}</td>
            <td>${cell(k.kualitas)}</td>
            <td>${cell(k.akurasi)}</td>
            <td>${cell(k.biaya)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  } else body = emptyState("Belum ada standar kinerja / KPI / SLA yang tercatat.");
  return `<div class="jd-section jd-section-card" id="sec-kpi">${sectionHead("06","Standar Kinerja / KPI / SLA")}${body}</div>`;
}

function renderSection07KSAO(jd){
  const cats = [
    ["knowledge","K","KNOWLEDGE","Pengetahuan yang Dipersyaratkan"],
    ["skill","S","SKILL","Aktivitas / Metode Kerja"],
    ["ability","A","ABILITY","Masalah yang Harus Diselesaikan"],
    ["other","O","OTHER CHARACTERISTICS","Orientasi / Karakteristik"]
  ];
  const hasAny = cats.some(([k])=>jd.ksao[k].length);
  let body;
  if(S.detailEditMode){
    body = `<div class="ksao-grid">${cats.map(([key,letter,mainLbl,subLbl])=>`
      <div class="ksao-card"><div class="ksao-head"><div class="ksao-letter">${letter}</div><div class="label">${mainLbl}</div><div class="sub-label">${subLbl}</div></div>
      ${repeatableListEditor('ksao.'+key, jd.ksao[key], "Tambah item")}
      </div>`).join('')}</div>`;
  } else if(hasAny){
    body = `<div class="ksao-grid">${cats.map(([key,letter,mainLbl,subLbl])=>`
      <div class="ksao-card ksao-${letter}"><div class="ksao-head"><div class="ksao-letter">${letter}</div><div class="label">${mainLbl}</div><div class="sub-label">${subLbl}</div></div>
      <ul>${jd.ksao[key].map(x=>`<li>${escHtml(x)}</li>`).join('') || `<li style="color:var(--ink-faint); list-style:none; padding-left:0;">Belum ada data.</li>`}</ul>
      </div>`).join('')}</div>`;
  } else body = emptyState("Belum ada pemetaan kompetensi (KSAO) untuk Job Role ini.");
  return `<div class="jd-section jd-section-card" id="sec-ksao">${sectionHead("07","Pemetaan Kompetensi (KSAO)")}${body}</div>`;
}

function renderSection08Requirements(jd){
  const r = jd.requirements;
  let body;
  if(S.detailEditMode){
    body = `
    <div class="edit-block"><p class="edit-label">Pendidikan</p><textarea data-field="requirements.pendidikan" style="min-height:60px;">${escHtml(r.pendidikan)}</textarea></div>
    <div class="edit-block"><p class="edit-label">Pengalaman</p>${repeatableListEditor('requirements.pengalaman', r.pengalaman, "Tambah butir pengalaman")}</div>
    <div class="edit-block"><p class="edit-label">Keterampilan Teknis</p>${repeatableListEditor('requirements.teknis', r.teknis, "Tambah keterampilan teknis")}</div>
    <div class="edit-block"><p class="edit-label">Keterampilan Non Teknis</p>${repeatableListEditor('requirements.nonTeknis', r.nonTeknis, "Tambah keterampilan non teknis")}</div>`;
  } else if(r.pendidikan || r.pengalaman.length || r.teknis.length || r.nonTeknis.length){
    body = `<div class="req-grid">
      ${r.pendidikan?`<div class="req-card"><div class="req-card-head">PENDIDIKAN</div><div class="req-card-body">${escHtml(r.pendidikan)}</div></div>`:''}
      ${r.pengalaman.length?`<div class="req-card"><div class="req-card-head">PENGALAMAN</div><div class="req-card-body"><ul>${r.pengalaman.map(x=>`<li>${escHtml(x)}</li>`).join('')}</ul></div></div>`:''}
      ${r.teknis.length?`<div class="req-card"><div class="req-card-head">KETERAMPILAN TEKNIS</div><div class="req-card-body"><ul>${r.teknis.map(x=>`<li>${escHtml(x)}</li>`).join('')}</ul></div></div>`:''}
      ${r.nonTeknis.length?`<div class="req-card"><div class="req-card-head">KETERAMPILAN NON TEKNIS</div><div class="req-card-body"><ul>${r.nonTeknis.map(x=>`<li>${escHtml(x)}</li>`).join('')}</ul></div></div>`:''}
    </div>`;
  } else body = emptyState("Belum ada persyaratan jabatan yang tercatat.");
  return `<div class="jd-section jd-section-card" id="sec-requirements">${sectionHead("08","Persyaratan Jabatan")}${body}</div>`;
}

function renderSection09Risks(jd){
  let body;
  if(S.detailEditMode){
    body = jd.risks.map((r,i)=>`
      <div class="repeat-item" style="border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          <input data-field="risks.${i}.cat" value="${escAttr(r.cat)}" placeholder="Kategori risiko" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;font-weight:600;">
          <textarea data-field="risks.${i}.desc" placeholder="Deskripsi risiko" style="min-height:50px;">${escHtml(r.desc)}</textarea>
        </div>
        <button class="rm-btn" data-remove-risk="${i}">${ICONS.close}</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-risk="1">${ICONS.plus} Tambah risiko</button>`;
  } else if(jd.risks.length){
    body = `<div class="risk-grid">${jd.risks.map(r=>`<div class="risk-card"><div class="risk-cat">${escHtml(r.cat.toUpperCase())}</div><div class="risk-desc">${escHtml(r.desc)}</div></div>`).join('')}</div>`;
  } else body = emptyState("Belum ada risiko jabatan yang tercatat.");
  return `<div class="jd-section jd-section-card" id="sec-risks">${sectionHead("09","Risiko Jabatan")}${body}</div>`;
}

function genericEmptyListSection(n,title,key,jd,addLabel,fields){
  const items = jd[key] || [];
  let body;
  if(S.detailEditMode){
    body = items.map((it,i)=>`
      <div class="repeat-item" style="border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          ${fields.map(f=>`<input data-field="${key}.${i}.${f.key}" value="${escAttr(it[f.key]||'')}" placeholder="${f.label}" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">`).join('')}
        </div>
        <button class="rm-btn" data-remove-generic="${key}:${i}">${ICONS.close}</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-generic="${key}">${ICONS.plus} ${addLabel}</button>`;
  } else if(items.length){
    body = `<div class="req-grid">${items.map(it=>`<div class="req-card"><div class="req-card-body" style="display:flex; flex-direction:column; gap:6px;">${fields.map(f=>{
        let val = (it[f.key]||'').trim();
        if(!val) val = '—';
        let displayVal = escHtml(val);
        if(f.key === 'link' && val.startsWith('http')) {
            displayVal = `<a href="${escAttr(val)}" class="doc-link" target="_blank" onclick="event.stopPropagation()">${ICONS.link} Buka Tautan</a>`;
        }
        return `<div><b>${f.label}:</b> ${displayVal}</div>`;
    }).join('')}</div></div>`).join('')}</div>`;
  } else {
    body = emptyState(`Belum ada ${title.toLowerCase()} yang terhubung dengan Job Description ini.`, S.detailEditMode?null:`data-add-generic="${key}"`, addLabel);
  }
  return `<div class="jd-section jd-section-card" id="sec-${key}">${sectionHead(n,title)}${body}</div>`;
}

function renderSection10Regulations(jd){
  return genericEmptyListSection("10","Regulasi / Standar yang Berlaku","regulations",jd,"Tambahkan Regulasi",[{key:"name",label:"Nama Dokumen"},{key:"link",label:"Link Dokumen"}]);
}
function renderSection11Leadership(jd){
  let body;
  if(S.detailEditMode){
    body = repeatableListEditor('leadership', jd.leadership, "Tambah tanggung jawab kepemimpinan");
  } else if(jd.leadership.length){
    body = `<div class="outcome-list">${jd.leadership.map((o,i)=>`<div class="outcome-item"><div class="outcome-num">${i+1}</div><div class="outcome-text">${escHtml(o)}</div></div>`).join('')}</div>`;
  } else body = emptyState("Belum ada data tanggung jawab kepemimpinan untuk Job Role ini.");
  return `<div class="jd-section jd-section-card" id="sec-leadership">${sectionHead("11","Tanggung Jawab Kepemimpinan")}${body}</div>`;
}
function renderSection12Assessments(jd){
  return genericEmptyListSection("12","Bukti / Metode Asesmen","assessments",jd,"Tambahkan Metode Asesmen",[{key:"method",label:"Assessment Method"},{key:"evidence",label:"Evidence"}]);
}

function renderSection13Communication(jd){
  let body;
  if(S.detailEditMode){
    body = jd.communication.map((c,i)=>`
      <div class="repeat-item" style="border:1px solid var(--border);border-radius:8px;padding:12px;flex-wrap:wrap;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:260px;">
          <select data-field="communication.${i}.type"><option ${c.type==='Internal'?'selected':''}>Internal</option><option ${c.type==='External'?'selected':''}>External</option></select>
          <input data-field="communication.${i}.party" value="${escAttr(c.party)}" placeholder="Pihak" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <textarea data-field="communication.${i}.purpose" placeholder="Tujuan komunikasi & koordinasi" style="grid-column:1/-1;min-height:44px;">${escHtml(c.purpose)}</textarea>
          <textarea data-field="communication.${i}.output" placeholder="Output yang diharapkan" style="grid-column:1/-1;min-height:44px;">${escHtml(c.output)}</textarea>
        </div>
        <button class="rm-btn" data-remove-comm="${i}">${ICONS.close}</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-comm="1">${ICONS.plus} Tambah relasi komunikasi</button>`;
  } else if(jd.communication.length){
    const internal = jd.communication.filter(c=>c.type==='Internal');
    const external = jd.communication.filter(c=>c.type==='External');
    body = `
    ${internal.length? `<p class="comm-sub">INTERNAL</p>` + commTable(internal) : emptyState("Belum ada relasi komunikasi internal.")}
    <div style="margin-top:24px;">
    ${external.length? `<p class="comm-sub">EXTERNAL</p>` + commTable(external) : emptyState("Belum ada relasi komunikasi eksternal.")}
    </div>
    `;
  } else body = emptyState("Belum ada data hubungan kerja / komunikasi untuk Job Role ini.");
  return `<div class="jd-section jd-section-card" id="sec-communication">${sectionHead("13","Hubungan Kerja / Komunikasi")}${body}</div>`;
}
function commTable(rows){
  return `<table class="comm-table"><thead><tr><th>Pihak</th><th>Tujuan Komunikasi &amp; Koordinasi</th><th>Output yang Diharapkan</th></tr></thead>
  <tbody>${rows.map(c=>`<tr><td>${escHtml(c.party)}</td><td>${escHtml(c.purpose)}</td><td>${escHtml(c.output)}</td></tr>`).join('')}</tbody></table>`;
}

function renderSection14Candidate(jd){
  let body;
  if(S.detailEditMode){
    body = jd.candidateCompetencies.map((c,i)=>`
      <div class="repeat-item" style="border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          <input data-field="candidateCompetencies.${i}.ksao" value="${escAttr(c.ksao)}" placeholder="KSAO (mis. K, S, A)" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <input data-field="candidateCompetencies.${i}.competency" value="${escAttr(c.competency)}" placeholder="Kandidat kompetensi" style="border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          <select data-field="candidateCompetencies.${i}.category"><option ${c.category==='Fungsional'?'selected':''}>Fungsional</option><option ${c.category==='Managerial'?'selected':''}>Managerial</option></select>
          <div style="display:flex;gap:6px; margin-top: 4px;">
             <input data-field="candidateCompetencies.${i}.documentName" value="${escAttr(c.documentName || '')}" placeholder="Nama Dokumen (opsional)" style="flex:1;border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
             <input data-field="candidateCompetencies.${i}.documentUrl" value="${escAttr(c.documentUrl || '')}" placeholder="URL Dokumen" style="flex:1;border:1px solid var(--border-strong);border-radius:6px;padding:7px 9px;font-size:13px;">
          </div>
        </div>
        <button class="rm-btn" data-remove-cand="${i}">${ICONS.close}</button>
      </div>`).join('') + `<button class="add-item-btn" data-add-cand="1">${ICONS.plus} Tambah kandidat kompetensi</button>`;
  } else if(jd.candidateCompetencies.length){
    body = `<div style="overflow-x:auto;"><table class="comm-table"><thead><tr><th>KSAO</th><th>Kandidat Kompetensi</th><th>Kategori</th><th>Dokumen</th></tr></thead>
    <tbody>${jd.candidateCompetencies.map(c=>`
      <tr>
        <td><div class="matrix-badges">${['K','S','A','O'].map(l=>`<span class="mini-badge ${(c.ksao||'').includes(l)?'on':''}">${l}</span>`).join('')}</div></td>
        <td>${escHtml(c.competency)}</td>
        <td>${escHtml(c.category)}</td>
        <td>${c.documentUrl ? `<a href="${escAttr(c.documentUrl)}" class="doc-link" target="_blank" onclick="event.stopPropagation()">${ICONS.link} ${escHtml(c.documentName || 'Lihat Dokumen')}</a>` : '<span class="doc-empty">Belum tersedia</span>'}</td>
      </tr>
    `).join('')}</tbody></table></div>`;
  } else body = emptyState("Belum ada kandidat kompetensi & kategorisasi untuk Job Role ini.");
  return `<div class="jd-section jd-section-card" id="sec-candidateCompetencies">${sectionHead("14","Kandidat Kompetensi & Kategorisasi")}${body}</div>`;
}

function emptyState(text, addAttr, addLabel){
  return `<div class="empty-state"><p>${text}</p>${addAttr?`<button class="btn btn-secondary btn-sm" ${addAttr}>${ICONS.plus} ${addLabel}</button>`:''}</div>`;
}

function repeatableListEditor(pathBase, items, addLabel){
  return items.map((v,i)=>`
    <div class="repeat-item">
      <textarea data-field="${pathBase}.${i}">${escHtml(v)}</textarea>
      <button class="rm-btn" data-remove-listitem="${pathBase}:${i}">${ICONS.close}</button>
    </div>`).join('') + `<button class="add-item-btn" data-add-listitem="${pathBase}">${ICONS.plus} ${addLabel}</button>`;
}

/* ======================= MODALS ======================= */

function renderModal(){
  const m = S.modal;

  if (m.kind === 'editFasum' || m.kind === 'addFasum') {
    const isEdit = m.kind === 'editFasum';
    const b = S.branches.find(x => x.id === S.activeBranchId);
    const mon = b.monitors.find(x => x.id === S.activeMonitorId);
    const f = isEdit ? mon.fasumData[m.idx] : {
      no: (mon.fasumData ? mon.fasumData.length + 1 : 1),
      namaArea: '', kelurahan: '', rw: '', rt: '',
      lokasiFasum: '', pemohon: '', status: 'Pending',
      titikKoordinat: '', linkDokumentasi: ''
    };
    const inp = (id, val, ph='') => `<input class="modal-inp" id="${id}" value="${escAttr(val||'')}" placeholder="${ph}">`;
    const lbl = t => `<label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">${t}</label>`;
    const sec = t => `<div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">${t}</div>`;

    return modalShell(isEdit ? 'Edit Data Fasum' : 'Tambah Data Fasum', `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div>
          ${sec('Informasi Area')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('No')}<input class="modal-inp" id="fsm-no" type="number" value="${f.no}"></div>
            <div style="grid-column:1/-1;">${lbl('Nama Area')}${inp('fsm-nama', f.namaArea)}</div>
            <div>${lbl('Kelurahan')}${inp('fsm-kel', f.kelurahan)}</div>
            <div>${lbl('RW')}${inp('fsm-rw', f.rw, 'mis. 01')}</div>
            <div>${lbl('RT')}${inp('fsm-rt', f.rt, 'mis. 02')}</div>
          </div>
        </div>
        <div>
          ${sec('Permintaan Fasum')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="grid-column:1/-1;">${lbl('Lokasi Fasum')}${inp('fsm-lokasi', f.lokasiFasum, 'mis. Depan Balai RW 01, Jl. Melati No.5')}</div>
            <div style="grid-column:1/-1;">${lbl('Pemohon')}${inp('fsm-pemohon', f.pemohon, 'mis. Ketua RW / Kelurahan')}</div>
            <div style="grid-column:1/-1;">
              ${lbl('Status')}
              <select id="fsm-status" class="modal-inp" style="width:100%;">
                <option ${f.status==='Pending'?'selected':''}>Pending</option>
                <option ${f.status==='On Progress'?'selected':''}>On Progress</option>
                <option ${f.status==='Approved'?'selected':''}>Approved</option>
                <option ${f.status==='Rejected'?'selected':''}>Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          ${sec('Dokumentasi')}
          <div style="display:grid; grid-template-columns:1fr; gap:12px;">
            <div>${lbl('Titik Koordinat')}${inp('fsm-koordinat', f.titikKoordinat, 'mis. -7.6342, 112.7821')}</div>
            <div>${lbl('Link Dokumentasi')}${inp('fsm-linkdok', f.linkDokumentasi, 'https://...')}</div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-fasum="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deleteFasumConfirm') {
    return modalShell('Hapus Data Fasum?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus data fasum ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-fasum="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if (m.kind === 'editTiang' || m.kind === 'addTiang') {
    const isEdit = m.kind === 'editTiang';
    const b = S.branches.find(x => x.id === S.activeBranchId);
    const mon = b.monitors.find(x => x.id === S.activeMonitorId);
    const t = isEdit ? mon.pemasanganTiangData[m.idx] : {
      no: (mon.pemasanganTiangData ? mon.pemasanganTiangData.length + 1 : 1),
      idTiang: '', lokasi: '', linkGmaps: '', jenisTiang: '',
      statusPekerjaan: 'Belum Mulai', statusQC: 'Belum QC',
      linkDokumentasi: '', catatan: '', lampiranFormQC: '', lampiranFormTanam: ''
    };
    const inp = (id, val, ph='') => `<input class="modal-inp" id="${id}" value="${escAttr(val||'')}" placeholder="${ph}">`;
    const lbl = text => `<label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">${text}</label>`;
    const sec = text => `<div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">${text}</div>`;

    return modalShell(isEdit ? 'Edit Data Tiang' : 'Tambah Data Tiang', `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div>
          ${sec('Informasi Tiang')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('No')}<input class="modal-inp" id="tg-no" type="number" value="${t.no}"></div>
            <div>${lbl('ID Tiang')}${inp('tg-id', t.idTiang, 'mis. TG-PDN-001')}</div>
            <div style="grid-column:1/-1;">${lbl('Lokasi / Segmen')}${inp('tg-lokasi', t.lokasi, 'mis. Jl. Raya Pandaan Segmen A - RW 01')}</div>
            <div style="grid-column:1/-1;">${lbl('Link Google Maps')}${inp('tg-gmaps', t.linkGmaps, 'https://...')}</div>
            <div style="grid-column:1/-1;">
              ${lbl('Jenis Tiang')}
              <select id="tg-jenis" class="modal-inp" style="width:100%;">
                <option ${t.jenisTiang==='Tiang Beton 9m'?'selected':''}>Tiang Beton 9m</option>
                <option ${t.jenisTiang==='Tiang Beton 11m'?'selected':''}>Tiang Beton 11m</option>
                <option ${t.jenisTiang==='Tiang Besi 7m'?'selected':''}>Tiang Besi 7m</option>
                <option ${t.jenisTiang==='Tiang Besi 9m'?'selected':''}>Tiang Besi 9m</option>
                <option ${t.jenisTiang==='Tiang Kayu'?'selected':''}>Tiang Kayu</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          ${sec('Monitoring')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              ${lbl('Status Pekerjaan')}
              <select id="tg-status-kerja" class="modal-inp" style="width:100%;">
                <option ${t.statusPekerjaan==='Belum Mulai'?'selected':''}>Belum Mulai</option>
                <option ${t.statusPekerjaan==='On Progress'?'selected':''}>On Progress</option>
                <option ${t.statusPekerjaan==='Selesai'?'selected':''}>Selesai</option>
              </select>
            </div>
            <div>
              ${lbl('Status QC')}
              <select id="tg-status-qc" class="modal-inp" style="width:100%;">
                <option ${t.statusQC==='Belum QC'?'selected':''}>Belum QC</option>
                <option ${t.statusQC==='Lolos QC'?'selected':''}>Lolos QC</option>
                <option ${t.statusQC==='Revisi'?'selected':''}>Revisi</option>
              </select>
            </div>
            <div style="grid-column:1/-1;">${lbl('Link Dokumentasi')}${inp('tg-linkdok', t.linkDokumentasi, 'https://...')}</div>
            <div style="grid-column:1/-1;">${lbl('Catatan')}<textarea id="tg-catatan" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(t.catatan||'')}</textarea></div>
            <div style="grid-column:1/-1;">${lbl('Lampiran Form QC (Link)')}${inp('tg-formqc', t.lampiranFormQC, 'https://...')}</div>
            <div style="grid-column:1/-1;">${lbl('Lampiran Form Hasil Penanaman Tiang (Link)')}${inp('tg-formtanam', t.lampiranFormTanam, 'https://...')}</div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-tiang="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deleteTiangConfirm') {
    return modalShell('Hapus Data Tiang?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus data tiang ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-tiang="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if (m.kind === 'editPpop' || m.kind === 'addPpop') {
    const isEdit = m.kind === 'editPpop';
    const b = S.branches.find(x => x.id === S.activeBranchId);
    const mon = b.monitors.find(x => x.id === S.activeMonitorId);
    const opt = isEdit ? mon.pembangunanPopData[m.idx] : {
      no: (mon.pembangunanPopData ? mon.pembangunanPopData.length + 1 : 1),
      surveyor: '', date: '', status: 'On Progress', recommendation: '',
      infoLokasi: { fotoLokasi: '', alamatLokasi: '', linkGmaps: '' },
      pembangunanODC: { statusRAB: 'Belum Mulai', statusPengadaan: 'Belum Mulai', statusPembangunan: 'Belum Mulai', statusInstalasi: 'Belum Mulai', statusUjiKelayakan: 'Belum Mulai' },
      kelistrikanODC: { statusPengajuanPLN: 'Belum Mulai', statusInstalasiListrik: 'Belum Mulai', statusListrikODC: 'Belum Mulai' },
      aktivasiPerangkat: { statusPersiapan: 'Belum Mulai', statusKonfigurasi: 'Belum Mulai', statusAktivasiODC: 'Belum Mulai' },
      dokumentasi: { targetODCReady: '', aktualODCReady: '', catatanKendala: '', linkDokumentasi: '' }
    };
    const statusOpts = ['Belum Mulai','On Progress','Submitted','Draft','Approved','Done','Aktif'];
    const selStatus = (id, val) => `<select id="${id}" class="modal-inp" style="width:100%;">${statusOpts.map(o=>`<option ${val===o?'selected':''}>${o}</option>`).join('')}</select>`;
    const inp = (id, val, ph='') => `<input class="modal-inp" id="${id}" value="${escAttr(val||'')}" placeholder="${ph}">`;
    const lbl = t => `<label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">${t}</label>`;
    const sec = t => `<div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">${t}</div>`;

    return modalShell(isEdit ? 'Edit Pembangunan POP ODC' : 'Tambah Pembangunan POP ODC', `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div>
          ${sec('Informasi Umum')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('No')}<input class="modal-inp" id="ppop-no" type="number" value="${opt.no}"></div>
            <div>${lbl('Nama Surveyor')}${inp('ppop-surveyor', opt.surveyor)}</div>
            <div>${lbl('Tanggal')}${inp('ppop-date', opt.date, 'DD/MM/YYYY')}</div>
            <div>
              ${lbl('Status')}
              <select id="ppop-status" class="modal-inp" style="width:100%;">
                <option ${opt.status==='On Progress'?'selected':''}>On Progress</option>
                <option ${opt.status==='Survey Selesai'?'selected':''}>Survey Selesai</option>
                <option ${opt.status==='Done'?'selected':''}>Done</option>
                <option ${opt.status==='Pending'?'selected':''}>Pending</option>
              </select>
            </div>
            <div style="grid-column:1/-1;">${lbl('Rekomendasi')}${inp('ppop-rec', opt.recommendation, 'mis. Lanjutkan, Direkomendasikan')}</div>
          </div>
        </div>
        <div>
          ${sec('Informasi Lokasi')}
          <div style="display:grid; grid-template-columns:1fr; gap:12px;">
            <div>${lbl('Foto Lokasi (Link URL)')}${inp('ppop-foto', opt.infoLokasi.fotoLokasi, 'https://...')}</div>
            <div>${lbl('Alamat Lokasi')}${inp('ppop-alamat', opt.infoLokasi.alamatLokasi)}</div>
            <div>${lbl('Link Google Maps')}${inp('ppop-gmaps', opt.infoLokasi.linkGmaps)}</div>
          </div>
        </div>
        <div>
          ${sec('Pembangunan ODC')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('Status RAB Material &amp; Perangkat')}${selStatus('ppop-rab', opt.pembangunanODC.statusRAB)}</div>
            <div>${lbl('Status Pengadaan Material ODC')}${selStatus('ppop-pengadaan', opt.pembangunanODC.statusPengadaan)}</div>
            <div>${lbl('Status Pembangunan ODC')}${selStatus('ppop-bangun', opt.pembangunanODC.statusPembangunan)}</div>
            <div>${lbl('Status Instalasi Perangkat ODC')}${selStatus('ppop-instalasi', opt.pembangunanODC.statusInstalasi)}</div>
            <div style="grid-column:1/-1;">${lbl('Status Uji Kelayakan ODC')}${selStatus('ppop-uji', opt.pembangunanODC.statusUjiKelayakan)}</div>
          </div>
        </div>
        <div>
          ${sec('Kelistrikan ODC')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('Status Pengajuan PLN')}${selStatus('ppop-pln', opt.kelistrikanODC.statusPengajuanPLN)}</div>
            <div>${lbl('Status Instalasi Listrik PLN')}${selStatus('ppop-listrik', opt.kelistrikanODC.statusInstalasiListrik)}</div>
            <div style="grid-column:1/-1;">${lbl('Status Listrik ODC')}${selStatus('ppop-listrik-odc', opt.kelistrikanODC.statusListrikODC)}</div>
          </div>
        </div>
        <div>
          ${sec('Aktivasi Perangkat')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('Status Persiapan Perangkat Jaringan')}${selStatus('ppop-persiapan', opt.aktivasiPerangkat.statusPersiapan)}</div>
            <div>${lbl('Status Konfigurasi Jaringan')}${selStatus('ppop-konfigurasi', opt.aktivasiPerangkat.statusKonfigurasi)}</div>
            <div style="grid-column:1/-1;">${lbl('Status Aktivasi ODC')}${selStatus('ppop-aktivasi', opt.aktivasiPerangkat.statusAktivasiODC)}</div>
          </div>
        </div>
        <div>
          ${sec('Dokumentasi')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>${lbl('Target ODC Ready')}${inp('ppop-target', opt.dokumentasi.targetODCReady, 'DD/MM/YYYY')}</div>
            <div>${lbl('Aktual ODC Ready')}${inp('ppop-aktual', opt.dokumentasi.aktualODCReady, 'DD/MM/YYYY atau -')}</div>
            <div style="grid-column:1/-1;">${lbl('Catatan Kendala')}<textarea id="ppop-catatan" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(opt.dokumentasi.catatanKendala||'')}</textarea></div>
            <div style="grid-column:1/-1;">${lbl('Link Dokumentasi Lengkap')}${inp('ppop-linkdok', opt.dokumentasi.linkDokumentasi, 'https://...')}</div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-ppop="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deletePpopConfirm') {
    return modalShell('Hapus Data Pembangunan POP ODC?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus data pembangunan POP ODC ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-ppop="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if (m.kind === 'editRoute' || m.kind === 'addRoute') {
    const isEdit = m.kind === 'editRoute';
    const b = S.branches.find(x => x.id === S.activeBranchId);
    const mon = b.monitors.find(x => x.id === S.activeMonitorId);
    const r = isEdit ? mon.routeAreaData[m.idx] : {
      no: (mon.routeAreaData ? mon.routeAreaData.length + 1 : 1),
      batch: '', warnaArea: '', warnaHex: '', namaArea: '', otb: '',
      jalur1: { kabel: '', tube: '', core: '', panjang: '' }, cj1: '',
      jalur2: { kabel: '', tube: '', core: '', panjang: '' }, cj2: '',
      jalur3: { kabel: '', tube: '', core: '', panjang: '' }, cj3: '',
      jalur4: { kabel: '', tube: '', core: '', panjang: '' }, cj4: '',
      totalPanjang: '', statusRoute: 'Aktif', linkDokumentasi: '', catatan: ''
    };
    const inp = (id, val, ph='') => `<input class="modal-inp" id="${id}" value="${escAttr(val||'')}" placeholder="${ph}">`;
    const jalurBlock = (n, j, cj) => `
      <div style="grid-column:1/-1;">
        <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:10px; color:var(--primary); font-size:12.5px;">Jalur ${n}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1fr; gap:10px;">
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:3px;">Kabel</label>${inp(`rta-j${n}-kabel`, j.kabel)}</div>
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:3px;">Tube</label>${inp(`rta-j${n}-tube`, j.tube)}</div>
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:3px;">Core</label>${inp(`rta-j${n}-core`, j.core)}</div>
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:3px;">Panjang (m)</label><input class="modal-inp" id="rta-j${n}-panjang" type="number" value="${escAttr(j.panjang||'')}"></div>
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:3px;">CJ</label>${inp(`rta-cj${n}`, cj)}</div>
        </div>
      </div>`;

    return modalShell(isEdit ? 'Edit Data Route Area' : 'Tambah Data Route Area', `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Informasi Area</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="rta-no" type="number" value="${r.no}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Batch</label>${inp('rta-batch', r.batch, 'mis. Batch 1')}</div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Warna Area</label>${inp('rta-warna', r.warnaArea, 'mis. Merah')}</div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kode Warna (hex)</label><input class="modal-inp" id="rta-hex" type="color" value="${escAttr(r.warnaHex||'#cccccc')}" style="height:38px;padding:2px 4px;cursor:pointer;"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Area</label>${inp('rta-nama', r.namaArea)}</div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">OTB</label>${inp('rta-otb', r.otb, 'mis. OTB-001')}</div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr; gap:12px;">
          ${jalurBlock(1, r.jalur1, r.cj1)}
          ${jalurBlock(2, r.jalur2, r.cj2)}
          ${jalurBlock(3, r.jalur3, r.cj3)}
          ${jalurBlock(4, r.jalur4, r.cj4)}
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Monitoring</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Total Panjang (m)</label><input class="modal-inp" id="rta-total" type="number" value="${escAttr(r.totalPanjang||'')}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Route</label>
              <select id="rta-status" class="modal-inp" style="width:100%;">
                <option ${r.statusRoute==='Aktif'?'selected':''}>Aktif</option>
                <option ${r.statusRoute==='Pending'?'selected':''}>Pending</option>
                <option ${r.statusRoute==='Non-aktif'?'selected':''}>Non-aktif</option>
              </select>
            </div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Dokumentasi</label>${inp('rta-link', r.linkDokumentasi, 'https://...')}</div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Catatan</label><textarea id="rta-catatan" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(r.catatan||'')}</textarea></div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-route="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deleteRouteConfirm') {
    return modalShell('Hapus Data Route Area?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus baris data route area ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-route="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if (m.kind === 'editPlanArea' || m.kind === 'addPlanArea') {
      const isEdit = m.kind === 'editPlanArea';
      const b = S.branches.find(x => x.id === S.activeBranchId);
      const mon = b.monitors.find(x => x.id === S.activeMonitorId);
      const p = isEdit ? mon.planAreaData[m.idx] : {
          no: (mon.planAreaData ? mon.planAreaData.length + 1 : 1),
          namaArea: '', kodeArea: '', kecamatan: '', kelurahan: '', rw: '', totalLuasArea: '', stdLuasArea: '100 M - 150 M',
          statusArea: 'Approved', planRk: '', planOdp: '', jmlTiang: '', sumberCj: '', keterangan: ''
      };

      return modalShell(isEdit ? 'Edit Data Plan Area' : 'Tambah Data Plan Area', `
          <div style="display:flex; flex-direction:column; gap:24px;">
              <!-- Informasi Area -->
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Informasi Area</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="pln-no" type="number" value="${p.no}"></div>
                      <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Area</label><input class="modal-inp" id="pln-nama" value="${escAttr(p.namaArea)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kode Area</label><input class="modal-inp" id="pln-kode" value="${escAttr(p.kodeArea)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kecamatan</label><input class="modal-inp" id="pln-kec" value="${escAttr(p.kecamatan)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kelurahan</label><input class="modal-inp" id="pln-kel" value="${escAttr(p.kelurahan)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">RW</label><input class="modal-inp" id="pln-rw" value="${escAttr(p.rw)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Total Luas Area</label><input class="modal-inp" id="pln-tla" value="${escAttr(p.totalLuasArea)}"></div>
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Standart Luas Area</label>
                        <select id="pln-sla" class="modal-inp" style="width:100%;">
                          <option ${p.stdLuasArea==='< 100 M'?'selected':''}>&lt; 100 M</option>
                          <option ${p.stdLuasArea==='100 M - 150 M'?'selected':''}>100 M - 150 M</option>
                          <option ${p.stdLuasArea==='> 150 M'?'selected':''}>&gt; 150 M</option>
                        </select>
                      </div>
                  </div>
              </div>
              <!-- Perencanaan Area -->
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Perencanaan Area</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Area</label>
                        <select id="pln-status" class="modal-inp" style="width:100%;">
                          <option ${p.statusArea==='Approved'?'selected':''}>Approved</option>
                          <option ${p.statusArea==='Pending'?'selected':''}>Pending</option>
                          <option ${p.statusArea==='Rejected'?'selected':''}>Rejected</option>
                        </select>
                      </div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Plan RK</label><input class="modal-inp" id="pln-rk" value="${escAttr(p.planRk)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Plan ODP</label><input class="modal-inp" id="pln-odp" value="${escAttr(p.planOdp)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Tiang</label><input class="modal-inp" id="pln-tiang" type="number" value="${escAttr(p.jmlTiang)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Sumber CJ</label><input class="modal-inp" id="pln-cj" value="${escAttr(p.sumberCj)}"></div>
                      <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Catatan</label><textarea id="pln-ket" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(p.keterangan)}</textarea></div>
                  </div>
              </div>
          </div>
      `, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-primary" data-save-plan="${isEdit ? m.idx : 'new'}">Simpan</button>
      `, true);
  }

  if (m.kind === 'deletePlanConfirm') {
      return modalShell('Hapus Data Plan Area?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus baris data plan area ini secara permanen?</p>`, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-danger" data-confirm-delete-plan="${m.idx}">${ICONS.trash} Hapus</button>
      `);
  }

  if (m.kind === 'editOdc' || m.kind === 'addOdc') {
      const isEdit = m.kind === 'editOdc';
      const b = S.branches.find(x => x.id === S.activeBranchId);
      const mon = b.monitors.find(x => x.id === S.activeMonitorId);
      const opt = isEdit ? mon.popOdcOptions[m.idx] : {
          no: (mon.popOdcOptions ? mon.popOdcOptions.length + 1 : 1),
          surveyor: '', date: '', branchOption: '', status: '', recommendation: '',
          location: { address: '', gmaps: '', pic: '', landStatus: '' },
          environment: { pengawasan: '', akses: '', terbuka: '', matahari: '', banjir: '' },
          documentation: { fileLink: '', notes: '' }
      };

      return modalShell(isEdit ? 'Edit Opsi Lokasi' : 'Tambah Opsi Lokasi', `
          <div style="display:flex; flex-direction:column; gap:20px;">
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Informasi Umum</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="odc-no" type="number" value="${opt.no}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Surveyor</label><input class="modal-inp" id="odc-surveyor" value="${escAttr(opt.surveyor)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal</label><input class="modal-inp" id="odc-date" placeholder="DD/MM/YYYY" value="${escAttr(opt.date)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Opsi untuk Branch</label><input class="modal-inp" id="odc-branchOpt" value="${escAttr(opt.branchOption)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status</label><input class="modal-inp" id="odc-status" value="${escAttr(opt.status)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Rekomendasi</label><input class="modal-inp" id="odc-rec" value="${escAttr(opt.recommendation)}"></div>
                  </div>
              </div>
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Identitas Lokasi</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Alamat Lengkap</label><input class="modal-inp" id="odc-address" value="${escAttr(opt.location.address)}"></div>
                      <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Google Maps</label><input class="modal-inp" id="odc-gmaps" value="${escAttr(opt.location.gmaps)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">PIC / Penanggung Jawab</label><input class="modal-inp" id="odc-pic" value="${escAttr(opt.location.pic)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Lahan</label><input class="modal-inp" id="odc-land" value="${escAttr(opt.location.landStatus)}"></div>
                  </div>
              </div>
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Keamanan & Kondisi Lingkungan</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Pengawasan</label><input class="modal-inp" id="odc-pengawasan" value="${escAttr(opt.environment.pengawasan)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Akses Kendaraan</label><input class="modal-inp" id="odc-akses" value="${escAttr(opt.environment.akses)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tidak Terlalu Terbuka</label><input class="modal-inp" id="odc-terbuka" value="${escAttr(opt.environment.terbuka)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Terlindung dari Matahari</label><input class="modal-inp" id="odc-matahari" value="${escAttr(opt.environment.matahari)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Risiko Banjir</label><input class="modal-inp" id="odc-banjir" value="${escAttr(opt.environment.banjir)}"></div>
                  </div>
              </div>
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Dokumentasi & Rekomendasi</div>
                  <div style="display:grid; grid-template-columns:1fr; gap:12px;">
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link / Nama File Dokumentasi</label><input class="modal-inp" id="odc-file" value="${escAttr(opt.documentation.fileLink)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Catatan</label><textarea id="odc-notes" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(opt.documentation.notes)}</textarea></div>
                  </div>
              </div>
          </div>
      `, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-primary" data-save-odc="${isEdit ? m.idx : 'new'}">Simpan</button>
      `, true);
  }
  
  if (m.kind === 'deleteOdcConfirm') {
      return modalShell('Hapus Opsi Lokasi?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus opsi lokasi ini secara permanen?</p>`, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-danger" data-confirm-delete-odc="${m.idx}">${ICONS.trash} Hapus</button>
      `);
  }

  // PERMIT MODAL
  if (m.kind === 'editPermit' || m.kind === 'addPermit') {
      const isEdit = m.kind === 'editPermit';
      const b = S.branches.find(x => x.id === S.activeBranchId);
      const mon = b.monitors.find(x => x.id === S.activeMonitorId);
      const opt = isEdit ? mon.permitData[m.idx] : {
          no: (mon.permitData ? mon.permitData.length + 1 : 1),
          kecamatan: '', kelurahan: '', kodeArea: '', rw: '', rt: '',
          jenisPermit: 'Izin ODC', statusPlanner: 'Proposal No', picPlanner: '', statusPermit: 'Submitted', picPermit: '',
          tglProposal: '', tglBak: '', targetSelesai: '', tglSelesai: '', jenisKompensasi: '', nilaiKompensasi: '',
          overallStatus: 'On Progress', linkProposal: '', linkBak: '', keterangan: ''
      };

      return modalShell(isEdit ? 'Edit Permit' : 'Tambah Permit', `
          <div style="display:flex; flex-direction:column; gap:20px;">
              <!-- Area -->
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Informasi Area</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="pmt-no" type="number" value="${opt.no}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kecamatan</label><input class="modal-inp" id="pmt-kec" value="${escAttr(opt.kecamatan)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kelurahan</label><input class="modal-inp" id="pmt-kel" value="${escAttr(opt.kelurahan)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kode Area</label><input class="modal-inp" id="pmt-kode" value="${escAttr(opt.kodeArea)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">RW</label><input class="modal-inp" id="pmt-rw" value="${escAttr(opt.rw)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">RT</label><input class="modal-inp" id="pmt-rt" value="${escAttr(opt.rt)}"></div>
                  </div>
              </div>
              <!-- Permit -->
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Informasi Permit</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jenis Permit</label>
                        <select id="pmt-jenis" class="modal-inp" style="width:100%;">
                          <option ${opt.jenisPermit==='Izin ODC'?'selected':''}>Izin ODC</option>
                          <option ${opt.jenisPermit==='Izin Tiang'?'selected':''}>Izin Tiang</option>
                          <option ${opt.jenisPermit==='Izin Tanam'?'selected':''}>Izin Tanam</option>
                        </select>
                      </div>
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Planner</label>
                        <select id="pmt-splanner" class="modal-inp" style="width:100%;">
                          <option ${opt.statusPlanner==='Proposal No'?'selected':''}>Proposal No</option>
                          <option ${opt.statusPlanner==='Survey'?'selected':''}>Survey</option>
                          <option ${opt.statusPlanner==='Done'?'selected':''}>Done</option>
                        </select>
                      </div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">PIC Planner</label><input class="modal-inp" id="pmt-picplan" value="${escAttr(opt.picPlanner)}"></div>
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Permit</label>
                        <select id="pmt-spermit" class="modal-inp" style="width:100%;">
                          <option ${opt.statusPermit==='Submitted'?'selected':''}>Submitted</option>
                          <option ${opt.statusPermit==='Approved'?'selected':''}>Approved</option>
                          <option ${opt.statusPermit==='Rejected'?'selected':''}>Rejected</option>
                        </select>
                      </div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">PIC Permit</label><input class="modal-inp" id="pmt-picper" value="${escAttr(opt.picPermit)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal Naik Proposal</label><input class="modal-inp" id="pmt-tglprop" placeholder="DD/MM/YYYY" value="${escAttr(opt.tglProposal)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal Naik BAK</label><input class="modal-inp" id="pmt-tglbak" placeholder="DD/MM/YYYY" value="${escAttr(opt.tglBak)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Target Selesai</label><input class="modal-inp" id="pmt-target" placeholder="DD/MM/YYYY" value="${escAttr(opt.targetSelesai)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal Selesai</label><input class="modal-inp" id="pmt-selesai" placeholder="DD/MM/YYYY" value="${escAttr(opt.tglSelesai)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jenis Kompensasi</label><input class="modal-inp" id="pmt-jkomp" value="${escAttr(opt.jenisKompensasi)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nilai Kompensasi</label><input class="modal-inp" id="pmt-nkomp" value="${escAttr(opt.nilaiKompensasi)}"></div>
                  </div>
              </div>
              <!-- Progress -->
              <div>
                  <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Monitoring progress</div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                      <div>
                        <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Overall Status</label>
                        <select id="pmt-overall" class="modal-inp" style="width:100%;">
                          <option ${opt.overallStatus==='On Progress'?'selected':''}>On Progress</option>
                          <option ${opt.overallStatus==='Pending'?'selected':''}>Pending</option>
                          <option ${opt.overallStatus==='Done'?'selected':''}>Done</option>
                        </select>
                      </div>
                      <div></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Proposal</label><input class="modal-inp" id="pmt-lprop" value="${escAttr(opt.linkProposal)}"></div>
                      <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link BAK</label><input class="modal-inp" id="pmt-lbak" value="${escAttr(opt.linkBak)}"></div>
                      <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Keterangan</label><textarea id="pmt-ket" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:50px;">${escHtml(opt.keterangan)}</textarea></div>
                  </div>
              </div>
          </div>
      `, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-primary" data-save-permit="${isEdit ? m.idx : 'new'}">Simpan</button>
      `, true);
  }
  
  if (m.kind === 'deletePermitConfirm') {
      return modalShell('Hapus Data Permit?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus baris data permit ini secara permanen?</p>`, `
          <button class="btn btn-secondary" data-close-modal>Batal</button>
          <button class="btn btn-danger" data-confirm-delete-permit="${m.idx}">${ICONS.trash} Hapus</button>
      `);
  }

  if (m.kind === 'editBof' || m.kind === 'addBof') {
    const isEdit = m.kind === 'editBof';
    const b = S.branches.find(x => x.id === S.activeBranchId);
    const mon = b.monitors.find(x => x.id === S.activeMonitorId);
    const opt = isEdit ? mon.branchOfficeOptions[m.idx] : {
      no: (mon.branchOfficeOptions ? mon.branchOfficeOptions.length + 1 : 1),
      surveyor: '', date: '', status: 'Survey Selesai', recommendation: 'Direkomendasikan',
      identitas: { fotoTampakDepan: '', alamat: '', gmaps: '', namaPemilik: '', kontakPemilik: '', jenisBangunan: '', jumlahLantai: '', jumlahRuangan: '' },
      operasional: { jarakAreaPenjualan: '', aksesKendaraan: '', areaParkir: '', kondisiLingkungan: '', keamananLingkungan: '' },
      standarBranch: { areaBrainstorming: 'Ada', areaMaterialFTTH: 'Ada', areaTiang: 'Ada', areaIstirahat: 'Ada', pantry: 'Ada', kamarMandi: '' },
      infoBangunan: { luasTanah: '', luasBangunan: '', jumlahLantai: '', jumlahRuangan: '', hargaSewa: '' },
      kondisiBangunan: { kondisiBangunan: 'Baik', kondisiKelistrikan: 'Baik', dayaListrik: '', kondisiAir: 'Baik', sumberAir: '', estimasiRenovasi: '' },
      dokumentasi: { linkDokumentasi: '' }
    };
    const adaSel = (val) => ['Ada','Tidak Ada'].map(o => `<option ${val===o?'selected':''}>${o}</option>`).join('');

    return modalShell(isEdit ? 'Edit Opsi Lokasi Kantor Branch' : 'Tambah Opsi Lokasi Kantor Branch', `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Informasi Umum</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="bof-no" type="number" value="${opt.no}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Surveyor</label><input class="modal-inp" id="bof-surveyor" value="${escAttr(opt.surveyor)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal</label><input class="modal-inp" id="bof-date" placeholder="DD/MM/YYYY" value="${escAttr(opt.date)}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status</label>
              <select id="bof-status" class="modal-inp" style="width:100%;">
                <option ${opt.status==='Survey Selesai'?'selected':''}>Survey Selesai</option>
                <option ${opt.status==='On Survey'?'selected':''}>On Survey</option>
                <option ${opt.status==='Pending'?'selected':''}>Pending</option>
                <option ${opt.status==='Batal'?'selected':''}>Batal</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Rekomendasi</label>
              <select id="bof-rec" class="modal-inp" style="width:100%;">
                <option ${opt.recommendation==='Direkomendasikan'?'selected':''}>Direkomendasikan</option>
                <option ${opt.recommendation==='Pertimbangkan'?'selected':''}>Pertimbangkan</option>
                <option ${opt.recommendation==='Tidak Direkomendasikan'?'selected':''}>Tidak Direkomendasikan</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Identitas Lokasi</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Foto Tampak Depan (Link URL)</label><input class="modal-inp" id="bof-foto" placeholder="https://..." value="${escAttr(opt.identitas.fotoTampakDepan)}"></div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Alamat Lengkap</label><input class="modal-inp" id="bof-alamat" value="${escAttr(opt.identitas.alamat)}"></div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Gmaps</label><input class="modal-inp" id="bof-gmaps" value="${escAttr(opt.identitas.gmaps)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Pemilik</label><input class="modal-inp" id="bof-pemilik" value="${escAttr(opt.identitas.namaPemilik)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nomor Kontak Pemilik</label><input class="modal-inp" id="bof-kontak" value="${escAttr(opt.identitas.kontakPemilik)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jenis Bangunan</label><input class="modal-inp" id="bof-jenis" placeholder="mis. Ruko, Rumah, Gedung" value="${escAttr(opt.identitas.jenisBangunan)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Lantai</label><input class="modal-inp" id="bof-id-lantai" type="number" value="${escAttr(opt.identitas.jumlahLantai)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Ruangan</label><input class="modal-inp" id="bof-id-ruangan" type="number" value="${escAttr(opt.identitas.jumlahRuangan)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Lokasi &amp; Operasional</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jarak ke Area Penjualan Terjauh (Km)</label><input class="modal-inp" id="bof-jarak" placeholder="mis. 5 km" value="${escAttr(opt.operasional.jarakAreaPenjualan)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Akses Kendaraan Operasional</label><input class="modal-inp" id="bof-akses" value="${escAttr(opt.operasional.aksesKendaraan)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Area Parkir</label><input class="modal-inp" id="bof-parkir" placeholder="mis. Ada (10 mobil)" value="${escAttr(opt.operasional.areaParkir)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kondisi Lingkungan</label><input class="modal-inp" id="bof-lingkungan" value="${escAttr(opt.operasional.kondisiLingkungan)}"></div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tingkat Keamanan Lingkungan</label><input class="modal-inp" id="bof-keamanan" value="${escAttr(opt.operasional.keamananLingkungan)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Kesesuaian Standar Branch</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Area Brainstorming Tersedia</label><select id="bof-brainstorming" class="modal-inp" style="width:100%;">${adaSel(opt.standarBranch.areaBrainstorming)}</select></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Area Penyimpanan Material FTTH</label><select id="bof-material" class="modal-inp" style="width:100%;">${adaSel(opt.standarBranch.areaMaterialFTTH)}</select></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Area Penyimpanan Tiang</label><select id="bof-tiang" class="modal-inp" style="width:100%;">${adaSel(opt.standarBranch.areaTiang)}</select></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Area Istirahat Tim</label><select id="bof-istirahat" class="modal-inp" style="width:100%;">${adaSel(opt.standarBranch.areaIstirahat)}</select></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Pantry / Dapur</label><select id="bof-pantry" class="modal-inp" style="width:100%;">${adaSel(opt.standarBranch.pantry)}</select></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kamar Mandi</label><input class="modal-inp" id="bof-kamarmandi" placeholder="mis. Ada (2 unit)" value="${escAttr(opt.standarBranch.kamarMandi)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Informasi Bangunan</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Luas Tanah (m²)</label><input class="modal-inp" id="bof-luasTanah" type="number" value="${escAttr(opt.infoBangunan.luasTanah)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Luas Bangunan (m²)</label><input class="modal-inp" id="bof-luasBgn" type="number" value="${escAttr(opt.infoBangunan.luasBangunan)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Lantai</label><input class="modal-inp" id="bof-info-lantai" type="number" value="${escAttr(opt.infoBangunan.jumlahLantai)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Ruangan</label><input class="modal-inp" id="bof-info-ruangan" type="number" value="${escAttr(opt.infoBangunan.jumlahRuangan)}"></div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Harga Sewa</label><input class="modal-inp" id="bof-harga" placeholder="mis. Rp 45.000.000 / tahun" value="${escAttr(opt.infoBangunan.hargaSewa)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Kondisi Bangunan</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kondisi Bangunan</label>
              <select id="bof-kondisi" class="modal-inp" style="width:100%;">
                <option ${opt.kondisiBangunan.kondisiBangunan==='Sangat Baik'?'selected':''}>Sangat Baik</option>
                <option ${opt.kondisiBangunan.kondisiBangunan==='Baik'?'selected':''}>Baik</option>
                <option ${opt.kondisiBangunan.kondisiBangunan==='Cukup Baik'?'selected':''}>Cukup Baik</option>
                <option ${opt.kondisiBangunan.kondisiBangunan==='Perlu Renovasi'?'selected':''}>Perlu Renovasi</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kondisi Kelistrikan</label>
              <select id="bof-listrik" class="modal-inp" style="width:100%;">
                <option ${opt.kondisiBangunan.kondisiKelistrikan==='Baik'?'selected':''}>Baik</option>
                <option ${opt.kondisiBangunan.kondisiKelistrikan==='Cukup'?'selected':''}>Cukup</option>
                <option ${opt.kondisiBangunan.kondisiKelistrikan==='Perlu Perbaikan'?'selected':''}>Perlu Perbaikan</option>
              </select>
            </div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Daya Listrik (VA)</label><input class="modal-inp" id="bof-daya" type="number" placeholder="mis. 3500" value="${escAttr(opt.kondisiBangunan.dayaListrik)}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kondisi Air Bersih</label>
              <select id="bof-air" class="modal-inp" style="width:100%;">
                <option ${opt.kondisiBangunan.kondisiAir==='Baik'?'selected':''}>Baik</option>
                <option ${opt.kondisiBangunan.kondisiAir==='Cukup'?'selected':''}>Cukup</option>
                <option ${opt.kondisiBangunan.kondisiAir==='Perlu Perbaikan'?'selected':''}>Perlu Perbaikan</option>
              </select>
            </div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Sumber Air</label><input class="modal-inp" id="bof-sumber-air" placeholder="mis. PDAM, Sumur" value="${escAttr(opt.kondisiBangunan.sumberAir)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Estimasi Biaya Renovasi (isi jika perlu)</label><input class="modal-inp" id="bof-renovasi" placeholder="mis. Rp 20.000.000" value="${escAttr(opt.kondisiBangunan.estimasiRenovasi)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px; color:var(--primary);">Dokumentasi</div>
          <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Dokumentasi Lengkap</label><input class="modal-inp" id="bof-linkdok" placeholder="https://..." value="${escAttr(opt.dokumentasi.linkDokumentasi)}"></div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-bof="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deleteBofConfirm') {
    return modalShell('Hapus Opsi Lokasi Kantor Branch?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus opsi lokasi kantor branch ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-bof="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if(m.kind === 'addBranch' || m.kind === 'editBranch') {

    return modalShell(isEdit ? 'Edit Opsi Lokasi Kantor Branch' : 'Tambah Opsi Lokasi Kantor Branch', `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Informasi Umum</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">No</label><input class="modal-inp" id="bof-no" type="number" value="${opt.no}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Nama Surveyor</label><input class="modal-inp" id="bof-surveyor" value="${escAttr(opt.surveyor)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Tanggal</label><input class="modal-inp" id="bof-date" placeholder="DD/MM/YYYY" value="${escAttr(opt.date)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Opsi untuk Branch</label><input class="modal-inp" id="bof-branchOpt" value="${escAttr(opt.branchOption)}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status</label>
              <select id="bof-status" class="modal-inp" style="width:100%;">
                <option ${opt.status==='Survey Selesai'?'selected':''}>Survey Selesai</option>
                <option ${opt.status==='On Survey'?'selected':''}>On Survey</option>
                <option ${opt.status==='Pending'?'selected':''}>Pending</option>
                <option ${opt.status==='Batal'?'selected':''}>Batal</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Rekomendasi</label>
              <select id="bof-rec" class="modal-inp" style="width:100%;">
                <option ${opt.recommendation==='Direkomendasikan'?'selected':''}>Direkomendasikan</option>
                <option ${opt.recommendation==='Pertimbangkan'?'selected':''}>Pertimbangkan</option>
                <option ${opt.recommendation==='Tidak Direkomendasikan'?'selected':''}>Tidak Direkomendasikan</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Identitas Lokasi</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Alamat Lengkap</label><input class="modal-inp" id="bof-address" value="${escAttr(opt.location.address)}"></div>
            <div style="grid-column:1/-1;"><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link Google Maps</label><input class="modal-inp" id="bof-gmaps" value="${escAttr(opt.location.gmaps)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">PIC / Penanggung Jawab</label><input class="modal-inp" id="bof-pic" value="${escAttr(opt.location.pic)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Lahan</label><input class="modal-inp" id="bof-land" placeholder="mis. Sewa / Milik Sendiri" value="${escAttr(opt.location.landStatus)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Kondisi Bangunan</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Luas Bangunan</label><input class="modal-inp" id="bof-luasBgn" placeholder="mis. 120 m²" value="${escAttr(opt.building.luasBangunan)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Luas Tanah</label><input class="modal-inp" id="bof-luasTnh" placeholder="mis. 200 m²" value="${escAttr(opt.building.luasTanah)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Jumlah Lantai</label><input class="modal-inp" id="bof-lantai" type="number" value="${escAttr(opt.building.jumlahLantai)}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kondisi Bangunan</label>
              <select id="bof-kondisi" class="modal-inp" style="width:100%;">
                <option ${opt.building.kondisi==='Sangat Baik'?'selected':''}>Sangat Baik</option>
                <option ${opt.building.kondisi==='Baik'?'selected':''}>Baik</option>
                <option ${opt.building.kondisi==='Cukup Baik'?'selected':''}>Cukup Baik</option>
                <option ${opt.building.kondisi==='Perlu Renovasi'?'selected':''}>Perlu Renovasi</option>
              </select>
            </div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Fasilitas Parkir</label><input class="modal-inp" id="bof-parking" placeholder="mis. Ada (10 mobil)" value="${escAttr(opt.building.fasilitasParking)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Akses Jalan</label><input class="modal-inp" id="bof-akses" placeholder="mis. Jalan utama 2 jalur" value="${escAttr(opt.building.aksesJalan)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Informasi Finansial</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Harga Sewa</label><input class="modal-inp" id="bof-harga" placeholder="mis. Rp 45.000.000 / tahun" value="${escAttr(opt.financial.hargaSewa)}"></div>
            <div>
              <label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Status Negosiasi</label>
              <select id="bof-nego" class="modal-inp" style="width:100%;">
                <option ${opt.financial.statusNegotiasi==='Negosiasi'?'selected':''}>Negosiasi</option>
                <option ${opt.financial.statusNegotiasi==='Deal'?'selected':''}>Deal</option>
                <option ${opt.financial.statusNegotiasi==='Batal'?'selected':''}>Batal</option>
              </select>
            </div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Uang Muka</label><input class="modal-inp" id="bof-dp" placeholder="mis. Rp 5.000.000" value="${escAttr(opt.financial.uangMuka)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Kontrak Minimal</label><input class="modal-inp" id="bof-kontrak" placeholder="mis. 2 tahun" value="${escAttr(opt.financial.kontrakMin)}"></div>
          </div>
        </div>
        <div>
          <div class="edit-label" style="border-bottom:1px solid var(--border); padding-bottom:6px; margin-bottom:12px;">Dokumentasi & Rekomendasi</div>
          <div style="display:grid; grid-template-columns:1fr; gap:12px;">
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Link / Nama File Dokumentasi</label><input class="modal-inp" id="bof-file" value="${escAttr(opt.documentation.fileLink)}"></div>
            <div><label style="font-size:12px;color:var(--ink-faint);display:block;margin-bottom:4px;">Catatan</label><textarea id="bof-notes" style="width:100%;padding:10px;border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface);min-height:60px;">${escHtml(opt.documentation.notes)}</textarea></div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-bof="${isEdit ? m.idx : 'new'}">Simpan</button>
    `, true);
  }

  if (m.kind === 'deleteBofConfirm') {
    return modalShell('Hapus Opsi Lokasi Kantor Branch?', `<p style="font-size:14px;margin:0;">Anda yakin ingin menghapus opsi lokasi kantor branch ini secara permanen?</p>`, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-bof="${m.idx}">${ICONS.trash} Hapus</button>
    `);
  }

  if (m.kind === 'kuartalTarget') {
    const b = (S.kuartalData.branches || []).find(x => x.id === m.branchId) || S.kuartalData.branches[0];
    const year = S.kelolaYear || 2026;

    return modalShell(m.isNew ? 'Tambah Target Branch' : `Atur Target Bulanan — ${b ? b.name : ''} (${year})`, `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
        <div class="field">
          <label>Branch</label>
          <select class="modal-inp" id="mBranch" ${!m.isNew ? 'disabled' : ''}>
            ${(S.kuartalData.branches || []).map(br => `<option value="${br.id}" ${b && b.id===br.id?'selected':''}>${escHtml(br.name)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Tahun</label>
          <select class="modal-inp" id="mYear">
            ${[2023, 2024, 2025, 2026, 2027].map(y => `<option value="${y}" ${year===y?'selected':''}>${y}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="field">
        <label>Metode Input Target</label>
        <select class="modal-inp" id="mModeTarget">
          <option value="custom" selected>Isi Target Berbeda Tiap Bulan (Jan - Des)</option>
          <option value="uniform">Isi Target Seragam / Setahun Penuh (Dibagi Rata Otomatis)</option>
        </select>
      </div>

      <div class="field" id="wrapUniformInput" style="display:none;">
        <label>Total Target Closing Setahun Penuh</label>
        <input class="modal-inp" id="mTargetUniform" type="number" placeholder="mis. 2400">
        <div style="font-size:11.5px;color:var(--ink-faint);margin-top:4px;">Nilai akan dibagi rata secara otomatis ke 12 bulan operasional.</div>
      </div>

      <div class="field" id="wrapCustomInput">
        <label style="margin-bottom:8px;display:block;">Detail Target Bulanan:</label>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          ${[1,2,3,4,5,6,7,8,9,10,11,12].map(mNum => {
            const idx = year * 12 + (mNum - 1);
            const rec = b ? (S.kuartalData.records[b.id] || {})[idx] : null;
            const tVal = rec ? rec.target : '';
            return `
            <div>
              <label style="font-size:11px;color:var(--ink-soft);display:block;margin-bottom:2px;">${MONTHS_LONG[mNum - 1]}</label>
              <input class="modal-inp m-month-input" type="number" data-month="${mNum}" value="${escAttr(tVal)}" placeholder="0">
            </div>`;
          }).join('')}
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" id="btn-save-target-modal">Simpan Target</button>
    `);
  }

  if (m.kind === 'kuartalFase') {
    const b = (S.kuartalData.branches || []).find(x => x.id === m.branchId);
    if (!b) return '';
    const foundingYM = idxToYM(b.foundingIdx);
    const q1s = b.customQ1 ? b.customQ1.start : foundingYM.month;
    const q1e = b.customQ1 ? b.customQ1.end : Math.min(12, foundingYM.month + 3);
    const q1sy = b.customQ1 ? b.customQ1.startYear : S.kelolaYear;
    const q1ey = b.customQ1 ? b.customQ1.endYear : S.kelolaYear;

    return modalShell(`Atur Fase & Kuartal 1 — ${b.name}`, `
      <input type="hidden" id="fNewId" value="${escAttr(b.id)}">
      <div class="field">
        <label>Nama Branch</label>
        <input class="modal-inp" id="fNewName" value="${escAttr(b.name)}" disabled>
      </div>

      <div style="margin-top:14px; padding:12px; border-radius:var(--radius); background:var(--division-bg);">
        <label style="font-weight:600; font-size:12.5px; margin-bottom:6px; display:block; color:var(--primary);">
          Rentang Bulan Kuartal 1 (Bisa 4 Bulan / Sesuai Awal Beroperasi)
        </label>
        <p style="font-size:12px; color:var(--ink-soft); margin:0 0 10px;">
          Tentukan bulan mulai &amp; selesai K1. Kuartal 2, 3, dan 4 selanjutnya akan otomatis berlanjut 3 bulanan.
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label style="font-size:11px;color:var(--ink-faint);display:block;margin-bottom:4px;">Mulai K1 (Bulan &amp; Tahun)</label>
            <div style="display:flex; gap:6px;">
              <select class="modal-inp" id="q1Start">
                ${MONTHS_LONG.map((mName, i) => `<option value="${i+1}" ${q1s===(i+1)?'selected':''}>${mName}</option>`).join('')}
              </select>
              <select class="modal-inp" id="q1StartYear" style="width:90px;">
                ${[2023, 2024, 2025, 2026, 2027].map(y => `<option value="${y}" ${q1sy===y?'selected':''}>${y}</option>`).join('')}
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:11px;color:var(--ink-faint);display:block;margin-bottom:4px;">Selesai K1 (Bulan &amp; Tahun)</label>
            <div style="display:flex; gap:6px;">
              <select class="modal-inp" id="q1End">
                ${MONTHS_LONG.map((mName, i) => `<option value="${i+1}" ${q1e===(i+1)?'selected':''}>${mName}</option>`).join('')}
              </select>
              <select class="modal-inp" id="q1EndYear" style="width:90px;">
                ${[2023, 2024, 2025, 2026, 2027].map(y => `<option value="${y}" ${q1ey===y?'selected':''}>${y}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" id="btn-save-fase-modal">Simpan Fase</button>
    `);
  }

  if (m.kind === 'addProject' || m.kind === 'editProject') {
    const editing = m.kind === 'editProject';
    const p = editing ? S.projects.find(x => x.id === m.id) : null;
    const catType = p ? (p.categoryType || 'division') : 'division';
    const currentDiv = p ? p.division : (S.pmFilterDivision !== 'ALL' ? S.pmFilterDivision : 'Business Quality & Governance');
    const isBqg = currentDiv === 'Business Quality & Governance' || currentDiv === 'BQG';
    const isSgp = currentDiv === 'Strategic Growth & Product' || currentDiv === 'SGP';
    const isCross = currentDiv === 'Cross-Divisi';

    // Daftar departemen berdasarkan struktur organisasi internal
    const deptListBqg = ['Regulatory Compliance', 'Internal Audit', 'Standardization & SOP', 'Talent Acquisition', 'People Development'];
    const deptListSgp = ['Branch Expansion', 'Product Engineering', 'Strategic Partnerships', 'Market Intelligence'];
    const deptListOther = ['Finance & Accounting', 'IT Infrastructure', 'Operations'];

    let allDepts = [];
    if (isBqg) allDepts = deptListBqg;
    else if (isSgp) allDepts = deptListSgp;
    else allDepts = [...deptListBqg, ...deptListSgp, ...deptListOther];

    return modalShell(editing ? 'Edit Proyek / Task' : 'Tambah Proyek / Task Baru', `
      <div class="field">
        <label>Judul Proyek / Task</label>
        <input class="modal-inp" id="pm-form-title" value="${escAttr(p ? p.title : '')}" placeholder="mis. Audit Kepatuhan Tata Kelola...">
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="field">
          <label>Lingkup Kategori</label>
          <select class="modal-inp" id="pm-form-cattype">
            <option value="division" ${catType === 'division' ? 'selected' : ''}>Task Divisi (Level Divisi)</option>
            <option value="department" ${catType === 'department' ? 'selected' : ''}>Task Perdepartemen (Level Departemen)</option>
          </select>
        </div>
        <div class="field">
          <label>Divisi</label>
          <select class="modal-inp" id="pm-form-division">
            <option value="Business Quality & Governance" ${isBqg ? 'selected' : ''}>Business Quality &amp; Governance (BQG)</option>
            <option value="Strategic Growth & Product" ${isSgp ? 'selected' : ''}>Strategic Growth &amp; Product (SGP)</option>
            <option value="Cross-Divisi" ${isCross ? 'selected' : ''}>Cross-Divisi</option>
          </select>
        </div>
      </div>

      <div class="field" id="pm-form-dept-group" style="${catType === 'department' ? '' : 'display:none;'}">
        <label>Departemen Terkait</label>
        <select class="modal-inp" id="pm-form-department">
          <option value="">-- Pilih Departemen --</option>
          ${allDepts.map(d => `<option value="${escAttr(d)}" ${p && p.department === d ? 'selected' : ''}>${escHtml(d)}</option>`).join('')}
        </select>
        <div style="font-size:11.5px;color:var(--ink-faint);margin-top:4px;">Task ini akan dialokasikan khusus pada departemen terkait.</div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="field">
          <label>Prioritas</label>
          <select class="modal-inp" id="pm-form-priority">
            <option value="urgent" ${p && p.priority==='urgent'?'selected':''}>Urgent</option>
            <option value="high" ${p && p.priority==='high'?'selected':''}>High</option>
            <option value="medium" ${!p || p.priority==='medium'?'selected':''}>Medium</option>
            <option value="low" ${p && p.priority==='low'?'selected':''}>Low</option>
          </select>
        </div>
        <div class="field">
          <label>Status</label>
          <select class="modal-inp" id="pm-form-status">
            <option value="todo" ${p && p.status==='todo'?'selected':''}>To Do</option>
            <option value="in-progress" ${p && p.status==='in-progress'?'selected':''}>In Progress</option>
            <option value="review" ${p && p.status==='review'?'selected':''}>Review / QA</option>
            <option value="done" ${p && p.status==='done'?'selected':''}>Done</option>
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="field">
          <label>Assignee (Penanggung Jawab)</label>
          <input class="modal-inp" id="pm-form-assignee" value="${escAttr(p ? p.assignee : '')}" placeholder="mis. Budi Santoso">
        </div>
        <div class="field">
          <label>Due Date</label>
          <input class="modal-inp" id="pm-form-due" type="date" value="${escAttr(p ? p.dueDate : '')}">
        </div>
      </div>

      <div class="field">
        <label>Deskripsi Proyek / Task</label>
        <textarea class="modal-inp" id="pm-form-desc" style="min-height:70px;" placeholder="Tujuan, ruang lingkup, dan konteks tugas...">${escHtml(p ? p.description : '')}</textarea>
      </div>

      <div class="field">
        <label>Tags (pisahkan dengan koma)</label>
        <input class="modal-inp" id="pm-form-tags" value="${escAttr(p && p.tags ? p.tags.join(', ') : '')}" placeholder="mis. Governance, SOP, ISO">
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-project="${editing ? p.id : ''}">${editing ? 'Simpan Perubahan' : 'Simpan Proyek'}</button>
    `);
  }

  if (m.kind === 'viewProject') {
    const p = S.projects.find(x => x.id === m.id);
    if (!p) return '';
    const tasks = p.tasks || [];
    const doneTasks = tasks.filter(t => t.done).length;
    const percent = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : (p.status === 'done' ? 100 : 0);

    const isBqg = p.division === 'Business Quality & Governance' || p.division === 'BQG';
    const isSgp = p.division === 'Strategic Growth & Product' || p.division === 'SGP';
    const divShort = isBqg ? 'BQG' : isSgp ? 'SGP' : p.division;

    return modalShell(`${escHtml(p.key)} · ${escHtml(p.title)}`, `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <span class="badge ${isBqg?'badge-div-bqg':isSgp?'badge-div-sgp':'badge-div-cross'}">${divShort}</span>
          ${p.categoryType === 'department' && p.department ? `<span class="badge badge-scope-dept">Dept: ${escHtml(p.department)}</span>` : `<span class="badge badge-scope-div">Task Divisi</span>`}
          <span class="badge badge-priority-${p.priority || 'medium'}">${(p.priority || 'medium').toUpperCase()}</span>
          <span class="badge ${p.status==='done'?'badge-status':'badge-division'}">${p.status.toUpperCase()}</span>
        </div>
        <div style="font-size:12.5px; color:var(--ink-soft);">
          PIC: <b>${escHtml(p.assignee || 'Unassigned')}</b> &bull; Target: <b>${escHtml(p.dueDate || '-')}</b>
        </div>
      </div>

      <div style="margin-bottom:20px; font-size:13.5px; line-height:1.5; color:var(--ink); background:var(--division-bg); padding:12px; border-radius:var(--radius);">
        ${escHtml(p.description || 'Tidak ada deskripsi rinci.')}
      </div>

      <div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
          <span style="font-weight:600;">Checklist Tugas (${doneTasks}/${tasks.length})</span>
          <span style="font-weight:600; color:var(--primary);">${percent}%</span>
        </div>
        <div class="pm-progress-bar" style="height:6px; margin-bottom:12px;">
          <div class="pm-progress-fill" style="width:${percent}%;"></div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${tasks.map(t => `
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
              <input type="checkbox" data-pm-toggle-task="1" data-prj-id="${p.id}" data-task-id="${t.id}" ${t.done?'checked':''}>
              <span style="${t.done?'text-decoration:line-through;color:var(--ink-faint);':''}">${escHtml(t.title)}</span>
            </label>
          `).join('')}
          ${!tasks.length ? `<div style="font-size:12px; color:var(--ink-faint); font-style:italic;">Belum ada checklist tugas.</div>` : ''}
        </div>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <input class="modal-inp" id="pm-new-task-title" placeholder="Tambah tugas checklist baru..." style="flex:1;">
          <button class="btn btn-secondary btn-sm" id="pm-btn-add-task" data-prj-id="${p.id}">+ Tambah</button>
        </div>
      </div>

      ${p.tags && p.tags.length ? `
        <div style="margin-top:16px; border-top:1px solid var(--border); padding-top:12px;">
          <div style="font-size:11.5px; color:var(--ink-faint); margin-bottom:6px;">TAGS:</div>
          ${p.tags.map(t => `<span class="pm-tag">#${escHtml(t)}</span>`).join('')}
        </div>
      ` : ''}
    `, `
      <button class="btn btn-secondary" data-close-modal>Tutup</button>
      <button class="btn btn-primary" data-pm-edit="${p.id}" onclick="S.modal={kind:'editProject',id:'${p.id}'}; render();">Edit Detail</button>
    `, true);
  }

  if (m.kind === 'clockInModal') {
    return modalShell('Catat Kehadiran / Clock-In Karyawan', `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Nama Karyawan</label>
          <input class="modal-inp" id="cin-name" value="Budi Santoso" placeholder="mis. Budi Santoso">
        </div>
        <div class="field">
          <label>NIP / ID Karyawan</label>
          <input class="modal-inp" id="cin-empid" value="EMP-001" placeholder="mis. EMP-001">
        </div>
      </div>
      <div class="field">
        <label>Divisi</label>
        <select class="modal-inp" id="cin-div">
          <option value="Business Quality & Governance">Business Quality &amp; Governance</option>
          <option value="Strategic Growth & Product">Strategic Growth &amp; Product</option>
          <option value="Technology & Digital">Technology &amp; Digital</option>
          <option value="People Corporate Compliance">People Corporate Compliance</option>
        </select>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Lokasi Presensi</label>
          <select class="modal-inp" id="cin-loc">
            <option value="Head Office - Malang">Head Office - Malang</option>
            <option value="Branch Malang">Branch Malang</option>
            <option value="Branch Surabaya">Branch Surabaya</option>
            <option value="Branch Kediri">Branch Kediri</option>
            <option value="Branch Gempol (Site Survey)">Branch Gempol (Site Survey)</option>
            <option value="Remote / WFH">Remote / WFH</option>
            <option value="Kunjungan Lapangan">Kunjungan Lapangan</option>
          </select>
        </div>
        <div class="field">
          <label>Status Kehadiran</label>
          <select class="modal-inp" id="cin-status">
            <option value="Hadir Tepat Waktu">Hadir Tepat Waktu</option>
            <option value="Terlambat">Terlambat</option>
            <option value="WFH">WFH (Work From Home)</option>
            <option value="Tugas Luar">Tugas Luar / Site Visit</option>
            <option value="Cuti / Izin">Cuti / Izin</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Catatan / Keterangan Pekerjaan Hari Ini</label>
        <textarea class="modal-inp" id="cin-notes" style="min-height:60px;" placeholder="Agenda kerja utama hari ini..."></textarea>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" id="btn-save-clock-in">Simpan Kehadiran</button>
    `);
  }

  if (m.kind === 'addLeaveModal') {
    return modalShell('Form Pengajuan Izin & Cuti Karyawan', `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Nama Pemohon</label>
          <input class="modal-inp" id="lev-name" value="Budi Santoso" placeholder="mis. Budi Santoso">
        </div>
        <div class="field">
          <label>NIP / ID</label>
          <input class="modal-inp" id="lev-empid" value="EMP-001" placeholder="mis. EMP-001">
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Divisi</label>
          <select class="modal-inp" id="lev-div">
            <option value="Business Quality & Governance">Business Quality &amp; Governance</option>
            <option value="Strategic Growth & Product">Strategic Growth &amp; Product</option>
            <option value="Technology & Digital">Technology &amp; Digital</option>
            <option value="People Corporate Compliance">People Corporate Compliance</option>
          </select>
        </div>
        <div class="field">
          <label>Jenis Pengajuan</label>
          <select class="modal-inp" id="lev-type">
            <option value="Cuti Tahunan">Cuti Tahunan</option>
            <option value="Izin Sakit">Izin Sakit (Disertai Surat Dokter)</option>
            <option value="Izin Keperluan Khusus">Izin Keperluan Khusus (Keluarga/Menikah)</option>
            <option value="Cuti Melahirkan">Cuti Melahirkan</option>
            <option value="Izin Setengah Hari">Izin Setengah Hari</option>
          </select>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
        <div class="field">
          <label>Tanggal Mulai</label>
          <input class="modal-inp" id="lev-start" type="date">
        </div>
        <div class="field">
          <label>Tanggal Selesai</label>
          <input class="modal-inp" id="lev-end" type="date">
        </div>
        <div class="field">
          <label>Jumlah Hari</label>
          <input class="modal-inp" id="lev-days" type="number" min="0.5" step="0.5" value="1">
        </div>
      </div>
      <div class="field">
        <label>Alasan / Keperluan Cuti</label>
        <textarea class="modal-inp" id="lev-reason" style="min-height:60px;" placeholder="Uraikan keperluan izin/cuti secara jelas..."></textarea>
      </div>
      <div class="field">
        <label>Nama File / Bukti Lampiran (Opsional)</label>
        <input class="modal-inp" id="lev-attach" placeholder="mis. Surat_Dokter.pdf">
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" id="btn-save-leave">Ajukan Permohonan</button>
    `);
  }

  if (m.kind === 'addHolidayModal') {
    return modalShell('Tambah Hari Libur / Cuti Operasional', `
      <div class="field">
        <label>Nama Hari Libur</label>
        <input class="modal-inp" id="hol-name" placeholder="mis. Libur Khusus Family Gathering">
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Tanggal Libur</label>
          <input class="modal-inp" id="hol-date" type="date">
        </div>
        <div class="field">
          <label>Kategori</label>
          <select class="modal-inp" id="hol-type">
            <option value="Libur Khusus Perusahaan">Libur Khusus Perusahaan</option>
            <option value="Libur Nasional">Libur Nasional</option>
            <option value="Cuti Bersama">Cuti Bersama</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Lingkup Pemberlakuan</label>
        <select class="modal-inp" id="hol-scope">
          <option value="Internal Dasaria">Internal Dasaria (Seluruh Divisi)</option>
          <option value="Operasional Cabang">Operasional Cabang (Branch Terpilih)</option>
          <option value="Nasional">Nasional</option>
        </select>
      </div>
      <div class="field">
        <label>Deskripsi / Keterangan</label>
        <textarea class="modal-inp" id="hol-desc" style="min-height:60px;" placeholder="Keterangan operasional..."></textarea>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" id="btn-save-holiday">Simpan Jadwal Libur</button>
    `);
  }

  if (m.kind === 'addBranch' || m.kind === 'editBranch') {
    const editing = m.kind === 'editBranch';
    const b = editing ? S.branches.find(x => x.id === m.id) : null;

    return modalShell(editing ? 'Edit Project Branch' : 'Tambah Project Branch Baru', `
      <div class="field">
        <label>Nama Project / Branch</label>
        <input class="modal-inp" id="modal-branch-name" value="${escAttr(b ? b.name : '')}" placeholder="mis. Gempol Utara (G1)">
      </div>
      <div class="field">
        <label>Nama Lengkap / Identitas Program (Opsional)</label>
        <input class="modal-inp" id="modal-branch-fullname" value="${escAttr(b ? (b.fullName || '') : '')}" placeholder="mis. Planning Open Branch Gempol Utara (G1)">
      </div>
      <div class="field">
        <label>Lokasi Wilayah</label>
        <input class="modal-inp" id="modal-branch-loc" value="${escAttr(b ? b.location : '')}" placeholder="mis. Gempol, Pasuruan, Jawa Timur">
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Project Leader / PIC</label>
          <input class="modal-inp" id="modal-branch-leader" value="${escAttr(b ? (b.projectLeader || '') : '')}" placeholder="mis. Dimas Rantung">
        </div>
        <div class="field">
          <label>Rencana Tanggal Pembukaan</label>
          <input class="modal-inp" id="modal-branch-target-date" type="date" value="${escAttr(b ? (b.targetOpenDate || '') : '')}">
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="field">
          <label>Status Lifecycle</label>
          <select class="modal-inp" id="modal-branch-lifecycle">
            <option value="Draft" ${!b || b.lifecycleStatus === 'Draft' ? 'selected' : ''}>Draft</option>
            <option value="Pra-Release" ${b && b.lifecycleStatus === 'Pra-Release' ? 'selected' : ''}>Pra-Release</option>
            <option value="Release" ${b && b.lifecycleStatus === 'Release' ? 'selected' : ''}>Release</option>
          </select>
        </div>
        <div class="field">
          <label>Status Operasional</label>
          <select class="modal-inp" id="modal-branch-status">
            <option value="Aktif" ${!b || b.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
            <option value="Non-aktif" ${b && b.status === 'Non-aktif' ? 'selected' : ''}>Non-aktif</option>
          </select>
        </div>
      </div>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-primary" data-save-branch="${editing ? 'edit' : 'new'}">${editing ? 'Simpan Perubahan' : 'Simpan Project Branch'}</button>
    `);
  }

  if(m.kind === 'deleteBranch') {
    return modalShell(`Hapus Branch?`, `
      <p style="font-size:14px;margin:0 0 4px;">Menghapus branch <b>${escHtml(m.entityName)}</b> akan menghapusnya dari daftar Open Branch.</p>
    `, `
      <button class="btn btn-secondary" data-close-modal>Batal</button>
      <button class="btn btn-danger" data-confirm-delete-branch="${m.id}">${ICONS.trash} Hapus</button>
    `);
  }
  if(m.kind==='addDirectorate' || m.kind==='editDirectorate'){
    const editing = m.kind==='editDirectorate';
    const dir = editing ? findDirectorate(m.id) : null;
    return modalShell(editing?'Edit Directorate':'Add Directorate', `<div class="field"><label>Directorate Name</label><input id="modal-input-name" value="${escAttr(dir?dir.name:'')}" placeholder="mis. Business Development"></div>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-directorate="${editing?dir.id:''}">${editing?'Save Changes':'Add Directorate'}</button>`);
  }
  if(m.kind==='addDivision' || m.kind==='editDivision'){
    const editing = m.kind==='editDivision';
    const div = editing ? findDivision(m.id) : null;
    const dir = findDirectorate(editing?div.directorateId:m.directorateId);
    return modalShell(editing?'Edit Division':'Add Division', `<div class="modal-context">Parent Directorate: <b>${escHtml(dir.name)}</b></div><div class="field"><label>Division Name</label><input id="modal-input-name" value="${escAttr(div?div.name:'')}" placeholder="mis. Human Capital"></div><div class="field"><label>Head of Division (nama, opsional)</label><input id="modal-input-hod" value="${escAttr(div&&div.headOfDivisionJobRoleId?findJobRole(div.headOfDivisionJobRoleId).name.replace('Head of Division ',''):'')}" placeholder="mis. Jane Doe"></div>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-division="${editing?div.id:''}" data-directorate="${dir.id}">${editing?'Save Changes':'Add Division'}</button>`);
  }
  if(m.kind==='addDepartment' || m.kind==='editDepartment'){
    const editing = m.kind==='editDepartment';
    const dep = editing ? findDepartment(m.id) : null;
    const div = findDivision(editing?dep.divisionId:m.divisionId);
    const dir = findDirectorate(div.directorateId);
    return modalShell(editing?'Edit Department':'Add Department', `<div class="modal-context">Directorate: <b>${escHtml(dir.name)}</b><br>Parent Division: <b>${escHtml(div.name)}</b></div><div class="field"><label>Department Name</label><input id="modal-input-name" value="${escAttr(dep?dep.name:'')}" placeholder="mis. Talent Acquisition"></div><div class="field"><label>Head of Department (nama, opsional)</label><input id="modal-input-hodept" value="${escAttr(dep&&dep.headOfDepartmentJobRoleId?(dep.jobRoles.find(r=>r.id===dep.headOfDepartmentJobRoleId)||{name:''}).name.replace('Head of Department ',''):'')}" placeholder="mis. John Smith"></div>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-department="${editing?dep.id:''}" data-division="${div.id}">${editing?'Save Changes':'Add Department'}</button>`);
  }
  if(m.kind==='addJobRole'){
    const dep = findDepartment(m.departmentId);
    const div = findDivision(dep.divisionId);
    const dir = findDirectorate(div.directorateId);
    return modalShell('Add Job Role', `<div class="modal-context">Directorate: <b>${escHtml(dir.name)}</b><br>Division / Department: <b>${escHtml(div.name)} / ${escHtml(dep.name)}</b></div><div class="field"><label>Job Role Name</label><input id="modal-input-name" placeholder="mis. Field Talent Recruiter"></div><div class="field"><label>Job Role Type</label><select id="modal-input-type"><option>Staff</option><option>Head of Department</option></select></div><div class="field"><label>Direct Supervisor</label><input id="modal-input-supervisor" placeholder="mis. Head of Department Talent Acquisition"></div><p style="font-size:12.5px;color:var(--ink-faint);margin-top:4px;">14 bagian uraian jabatan dapat dilengkapi setelah Job Role dibuat.</p>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-jobrole="${dep.id}">Add Job Role</button>`);
  }
  if(m.kind==='assignHod'){
    const div = findDivision(m.divisionId);
    return modalShell('Assign Head of Division', `<div class="modal-context">Division: <b>${escHtml(div.name)}</b></div><div class="field"><label>Nama Head of Division</label><input id="modal-input-name" placeholder="mis. Jane Doe"></div>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-hod="${div.id}">Assign</button>`);
  }
  if(m.kind==='assignHodept'){
    const dep = findDepartment(m.departmentId);
    return modalShell('Assign Head of Department', `<div class="modal-context">Department: <b>${escHtml(dep.name)}</b></div><div class="field"><label>Nama Head of Department</label><input id="modal-input-name" placeholder="mis. John Smith"></div>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-primary" data-save-hodept="${dep.id}">Assign</button>`);
  }
  if(m.kind==='deleteConfirm'){
    return modalShell(`Delete ${m.entityLabel}?`, `<p style="font-size:14px;margin:0 0 4px;">Are you sure you want to delete <b>${escHtml(m.entityName)}</b>?</p>${m.warning?`<div class="delete-warning">${m.warning}</div>`:''}`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-danger" data-confirm-delete="1">${ICONS.trash} Delete ${m.entityLabel}</button>`);
  }
  if(m.kind==='discardConfirm'){
    return modalShell('Discard changes?', `<p style="font-size:14px;margin:0;">Perubahan yang belum disimpan akan hilang.</p>`, `<button class="btn btn-secondary" data-close-modal>Continue Editing</button><button class="btn btn-danger" data-confirm-discard="1">Discard</button>`);
  }
  if(m.kind==='logoutConfirm'){
    return modalShell('Keluar dari akun?', `<p style="font-size:14px;margin:0;">Anda akan keluar dari sesi ini dan kembali ke halaman login.</p>`, `<button class="btn btn-secondary" data-close-modal>Cancel</button><button class="btn btn-danger" data-confirm-logout="1">Keluar</button>`);
  }
  return '';
}

function modalShell(title, body, foot, isWide = false){
  return `
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal ${isWide ? 'modal-wide' : ''}">
      <div class="modal-head"><h3>${title}</h3><button class="modal-close" data-close-modal>${ICONS.close}</button></div>
      <div class="modal-body">${body}</div>
      <div class="modal-foot">${foot}</div>
    </div>
  </div>`;
}

/* ======================= HELPERS ======================= */

  async function loadDataFromJSON() {
    try {
      const [resDir, resBranch, resProjects, resKuartal, resSectionDefs, resMonitors, resMenu, resSchedule] = await Promise.all([
        fetch('json/directorates.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/branches.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/projects.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/kuartalData.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/sectionDefs.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/standardMonitors.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/menu.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('json/scheduleData.json').then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      if (resDir) {
        S.directorates = resDir;
        if ((!S.activeDirectorateId || !S.directorates.some(d => d.id === S.activeDirectorateId)) && resDir[0]) {
          S.activeDirectorateId = resDir[0].id;
        }
      }
      if (resBranch) S.branches = resBranch;
      if (resProjects) S.projects = resProjects;
      if (resSectionDefs) SECTION_DEFS = resSectionDefs;
      if (resMonitors) STANDARD_MONITORS = resMonitors;
      if (resMenu) S.menu = resMenu;
      if (resSchedule) {
        S.scheduleData = resSchedule;
      }
      if (resKuartal) {
        initKuartalData(resKuartal);
      }
      render();
    } catch(e) {
      console.log('Error loading json data:', e);
    }
  }

  loadDataFromJSON();
  render();

})(window);
