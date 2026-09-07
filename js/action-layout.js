// Action Handlers: Layout & Global Navigation
(function (window) {
  window.ActionLayout = {
    attach: function (root, S, render) {
      // THEME TOGGLE
      const tl = document.getElementById('theme-light');
      const td = document.getElementById('theme-dark');
      if (tl) tl.onclick = () => { S.theme = 'light'; render(); };
      if (td) td.onclick = () => { S.theme = 'dark'; render(); };

      // SIDEBAR TOGGLE
      const collapseBtn = document.getElementById('sidebar-collapse-toggle');
      if (collapseBtn) collapseBtn.onclick = () => {
        S.sidebarCollapsed = !S.sidebarCollapsed;
        render();
      };

      // MOBILE TOGGLE
      const mobileToggle = document.getElementById('mobile-nav-toggle');
      if (mobileToggle) mobileToggle.onclick = () => {
        S.mobileNavOpen = !S.mobileNavOpen;
        render();
      };

      // SIDEBAR ACCORDION GROUP TOGGLE
      root.querySelectorAll('[data-toggle-sidebar-group]').forEach(el => {
        el.onclick = (e) => {
          e.stopPropagation();
          const group = el.dataset.toggleSidebarGroup;
          if (!S.expandedSidebarGroups) {
            S.expandedSidebarGroups = new Set();
          }
          if (S.expandedSidebarGroups.has(group)) {
            S.expandedSidebarGroups.delete(group);
          } else {
            S.expandedSidebarGroups.add(group);
          }
          render();
        };
      });

      // SIDEBAR NAV CLICKS
      root.querySelectorAll('[data-nav]').forEach(el => {
        el.onclick = () => {
          const key = el.dataset.nav;
          S.userMenuOpen = false;
          S.openKebab = null;
          S.mobileNavOpen = false;
          if (key === 'job-description' || key === 'role-charter') {
            S.page = 'job-description';
          } else if (key === 'governance-quality-manual') {
            try{ if(window.App && window.App.seedDocsIfEmpty) window.App.seedDocsIfEmpty(); }catch(e){}
            S.page = 'governance-quality-manual';
            S.mmDetailId = null;
          } else if (key === 'sop') {
            try{ if(window.App && window.App.seedDocsIfEmpty) window.App.seedDocsIfEmpty(); }catch(e){}
            S.page = 'sop';
            S.sopDetailId = null;
          } else if (key === 'technical-handbook') {
            try{ if(window.App && window.App.seedDocsIfEmpty) window.App.seedDocsIfEmpty(); }catch(e){}
            S.page = 'technical-handbook';
            S.thbDetailId = null;
          } else if (key === 'open-branch') {
            S.page = 'open-branch';
          } else if (key === 'kuartal') {
            S.page = 'kuartal';
          } else if (key === 'schedule-management') {
            S.page = 'schedule-management';
          } else if (key === 'project-management' || key === 'project-management-bqg' || key === 'project-management-sgp') {
            S.page = 'project-management';
            if (key === 'project-management-bqg') S.pmFilterDivision = 'BQG';
            else if (key === 'project-management-sgp') S.pmFilterDivision = 'SGP';
          } else {
            S.page = 'placeholder';
            S.placeholderLabel = key;
          }
          render();
        };
      });

      // USER MENU
      const umBtn = document.getElementById('user-menu-btn');
      if (umBtn) umBtn.onclick = (e) => {
        e.stopPropagation();
        S.userMenuOpen = !S.userMenuOpen;
        render();
      };

      // LOGOUT
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) logoutBtn.onclick = () => {
        S.userMenuOpen = false;
        S.modal = { kind: 'logoutConfirm' };
        render();
      };

      // PROJECT MANAGEMENT MODAL SAVE ACTIONS
      const saveProjectBtn = root.querySelector('[data-save-project]');
      if (saveProjectBtn) {
        saveProjectBtn.onclick = () => {
          const editId = saveProjectBtn.dataset.saveProject;
          const title = (document.getElementById('pm-form-title') || {}).value || '';
          const categoryType = (document.getElementById('pm-form-cattype') || {}).value || 'division';
          const division = (document.getElementById('pm-form-division') || {}).value || 'Business Quality & Governance';
          const department = categoryType === 'department' ? ((document.getElementById('pm-form-department') || {}).value || '') : '';
          const priority = (document.getElementById('pm-form-priority') || {}).value || 'medium';
          const status = (document.getElementById('pm-form-status') || {}).value || 'todo';
          const assignee = (document.getElementById('pm-form-assignee') || {}).value || 'Unassigned';
          const dueDate = (document.getElementById('pm-form-due') || {}).value || '';
          const desc = (document.getElementById('pm-form-desc') || {}).value || '';
          const tagsRaw = (document.getElementById('pm-form-tags') || {}).value || '';
          const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

          if (!title.trim()) {
            alert('Judul proyek / task wajib diisi');
            return;
          }

          if (categoryType === 'department' && !department) {
            alert('Silakan pilih Departemen terkait untuk task perdepartemen.');
            return;
          }

          if (editId) {
            const p = S.projects.find(x => x.id === editId);
            if (p) {
              p.title = title;
              p.categoryType = categoryType;
              p.division = division;
              p.department = department;
              p.priority = priority;
              p.status = status;
              p.assignee = assignee;
              p.dueDate = dueDate;
              p.description = desc;
              p.tags = tags;
            }
          } else {
            const newKey = 'PRJ-' + Math.floor(100 + Math.random() * 900);
            S.projects.unshift({
              id: 'prj-' + Date.now(),
              key: newKey,
              title: title,
              categoryType: categoryType,
              division: division,
              department: department,
              priority: priority,
              status: status,
              assignee: assignee,
              startDate: new Date().toISOString().split('T')[0],
              dueDate: dueDate,
              description: desc,
              tags: tags,
              tasks: []
            });
          }
          S.modal = null;
          render();
        };
      }

      // GENERIC DELETE CONFIRM (including Project)
      const confirmDelete = root.querySelector('[data-confirm-delete]');
      if (confirmDelete && S.modal && S.modal.confirmAction === 'deleteProject') {
        confirmDelete.onclick = () => {
          const id = S.modal.id;
          S.projects = S.projects.filter(p => p.id !== id);
          S.modal = null;
          render();
        };
      }

      // MODAL COMMON ACTIONS
      const modalClose = root.querySelector('[data-close-modal]');
      if (modalClose) modalClose.onclick = () => { S.modal = null; render(); };

      const modalOverlay = root.querySelector('.modal-overlay');
      if (modalOverlay) modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) { S.modal = null; render(); }
      };

      const confirmLogout = root.querySelector('[data-confirm-logout]');
      if (confirmLogout) confirmLogout.onclick = () => {
        S.loggedIn = false;
        S.modal = null;
        render();
      };

      // LOGIN SUBMIT
      const loginSubmit = document.getElementById('login-submit');
      if (loginSubmit) {
        const em = document.getElementById('login-email');
        const pw = document.getElementById('login-password');
        const tpw = document.getElementById('login-toggle-pw');
        if (em) em.oninput = e => S.loginForm.email = e.target.value;
        if (pw) pw.oninput = e => S.loginForm.password = e.target.value;
        if (tpw) tpw.onclick = () => {
          S.loginForm.showPw = !S.loginForm.showPw;
          render();
        };
        loginSubmit.onclick = () => {
          if (!S.loginForm.email || !S.loginForm.password) {
            S.loginForm.error = "Masukkan email dan kata sandi untuk melanjutkan.";
            render();
            return;
          }
          S.loginForm.error = "";
          S.loggedIn = true;
          render();
        };
      }
    }
  };
})(window);
