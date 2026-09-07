// Action Handlers: Job Description Submenu
(function (window) {
  window.ActionJobDescription = {
    attach: function (root, S, render, App) {
      if (S.page !== 'job-description' && S.page !== 'job-description-detail') return;

      const bind = (sel, fn) => {
        root.querySelectorAll(sel).forEach(el => {
          el.onclick = (e) => { e.stopPropagation(); fn(el, e); };
        });
      };

      // Search input
      const searchInp = document.getElementById('jd-search-input');
      if (searchInp) {
        searchInp.oninput = (e) => {
          S.jdSearchQuery = e.target.value;
          render();
        };
      }

      // Directorate tabs
      bind('[data-select-directorate]', el => {
        S.activeDirectorateId = el.dataset.selectDirectorate;
        S.openKebab = null;
        render();
      });

      // Add Directorate
      bind('#add-directorate-btn, #add-directorate-btn-empty', () => {
        S.modal = { kind: 'addDirectorate' };
        render();
      });

      // Edit Directorate
      bind('[data-edit-directorate]', el => {
        S.modal = { kind: 'editDirectorate', id: el.dataset.editDirectorate };
        render();
      });

      // Delete Directorate
      bind('[data-delete-directorate]', el => {
        const d = App.findDirectorate(el.dataset.deleteDirectorate);
        if (!d) return;
        S.modal = {
          kind: 'deleteConfirm',
          entityLabel: 'Direktorat',
          entityName: d.name,
          target: { type: 'directorate', id: d.id },
          warning: 'Menghapus direktorat akan menghapus seluruh divisi, departemen, dan job role di dalamnya.'
        };
        render();
      });

      // Toggle Division accordion
      bind('[data-toggle-division]', el => {
        const id = el.dataset.toggleDivision;
        if (S.expandedDivisions.has(id)) S.expandedDivisions.delete(id);
        else S.expandedDivisions.add(id);
        render();
      });

      // Add Division
      bind('[data-add-division]', el => {
        S.modal = { kind: 'addDivision', directorateId: el.dataset.addDivision };
        render();
      });

      // Edit Division
      bind('[data-edit-division]', el => {
        S.modal = { kind: 'editDivision', id: el.dataset.editDivision };
        S.openKebab = null;
        render();
      });

      // Delete Division
      bind('[data-delete-division]', el => {
        const v = App.findDivision(el.dataset.deleteDivision);
        if (!v) return;
        S.modal = {
          kind: 'deleteConfirm',
          entityLabel: 'Divisi',
          entityName: v.name,
          target: { type: 'division', id: v.id },
          warning: 'Menghapus divisi akan menghapus seluruh departemen dan job role di dalamnya.'
        };
        S.openKebab = null;
        render();
      });

      // Toggle Department accordion
      bind('[data-toggle-department]', el => {
        const id = el.dataset.toggleDepartment;
        if (S.expandedDepartments.has(id)) S.expandedDepartments.delete(id);
        else S.expandedDepartments.add(id);
        render();
      });

      // Add Department
      bind('[data-add-department]', el => {
        S.modal = { kind: 'addDepartment', divisionId: el.dataset.addDepartment };
        render();
      });

      // Edit Department
      bind('[data-edit-department]', el => {
        S.modal = { kind: 'editDepartment', id: el.dataset.editDepartment };
        S.openKebab = null;
        render();
      });

      // Delete Department
      bind('[data-delete-department]', el => {
        const dep = App.findDepartment(el.dataset.deleteDepartment);
        if (!dep) return;
        S.modal = {
          kind: 'deleteConfirm',
          entityLabel: 'Departemen',
          entityName: dep.name,
          target: { type: 'department', id: dep.id },
          warning: 'Menghapus departemen akan menghapus seluruh job role di dalamnya.'
        };
        S.openKebab = null;
        render();
      });

      // Add Job Role
      bind('[data-add-jobrole]', el => {
        S.modal = { kind: 'addJobRole', departmentId: el.dataset.addJobrole };
        render();
      });

      // Assign HOD
      bind('[data-assign-hod]', el => {
        S.modal = { kind: 'assignHOD', divisionId: el.dataset.assignHod };
        render();
      });

      // Remove HOD
      bind('[data-remove-hod]', el => {
        const v = App.findDivision(el.dataset.removeHod);
        if (!v) return;
        S.modal = {
          kind: 'deleteConfirm',
          entityLabel: 'Head of Division',
          entityName: 'Head of Division ' + v.name,
          target: { type: 'hod', id: v.id },
          warning: 'Jabatan Head of Division akan dikosongkan.'
        };
        S.openKebab = null;
        render();
      });

      // Assign HODept
      bind('[data-assign-hodept]', el => {
        S.modal = { kind: 'assignHODept', departmentId: el.dataset.assignHodept };
        render();
      });

      // View Role detail
      bind('[data-view-role]', el => {
        S.detailRoleId = el.dataset.viewRole;
        S.detailEditMode = false;
        S.editDraft = null;
        S.activeSectionKey = 'identity';
        S.page = 'job-description-detail';
        S.openKebab = null;
        render();
      });

      // Edit Role
      bind('[data-edit-role]', el => {
        S.detailRoleId = el.dataset.editRole;
        S.detailEditMode = true;
        const role = App.findJobRole(S.detailRoleId);
        S.editDraft = role ? JSON.parse(JSON.stringify(role.jd || {})) : {};
        S.activeSectionKey = 'identity';
        S.page = 'job-description-detail';
        S.openKebab = null;
        render();
      });

      // Delete Role
      bind('[data-delete-role]', el => {
        const r = App.findJobRole(el.dataset.deleteRole);
        if (!r) return;
        S.modal = {
          kind: 'deleteConfirm',
          entityLabel: 'Job Role',
          entityName: r.name,
          target: { type: 'role', id: r.id },
          warning: 'Menghapus job role akan menghapus seluruh uraian jabatan terkait.'
        };
        S.openKebab = null;
        render();
      });

      // Kebab toggle
      bind('[data-kebab]', el => {
        const val = el.dataset.kebab;
        const [type, id] = val.split(':');
        if (S.openKebab && S.openKebab.type === type && S.openKebab.id === id) {
          S.openKebab = null;
        } else {
          S.openKebab = { type, id };
        }
        render();
      });

      // Back to list
      bind('[data-back-to-jd-list]', () => {
        S.page = 'job-description';
        S.detailRoleId = null;
        S.detailEditMode = false;
        S.editDraft = null;
        render();
      });

      // Detail Edit actions
      bind('#btn-edit-jd', () => {
        S.detailEditMode = true;
        const r = App.findJobRole(S.detailRoleId);
        S.editDraft = r ? JSON.parse(JSON.stringify(r.jd || {})) : {};
        render();
      });

      bind('#btn-cancel-edit-jd', () => {
        S.detailEditMode = false;
        S.editDraft = null;
        render();
      });

      bind('#btn-save-jd', () => {
        const r = App.findJobRole(S.detailRoleId);
        if (r && S.editDraft) {
          r.jd = JSON.parse(JSON.stringify(S.editDraft));
        }
        S.detailEditMode = false;
        S.editDraft = null;
        render();
      });

      // Jump section tab
      bind('[data-jump-section]', (el, e) => {
        if (e) e.preventDefault();
        const key = el.dataset.jumpSection;
        S.activeSectionKey = key;

        root.querySelectorAll('[data-jump-section]').forEach(a => {
          a.classList.toggle('active', a.dataset.jumpSection === key);
        });

        const targetEl = document.getElementById('sec-' + key);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      // Scrollspy: update active TOC item as user scrolls through sections
      const scrollContainer = document.getElementById('main-scroll-content');
      if (scrollContainer && S.page === 'job-description-detail') {
        const sections = Array.from(root.querySelectorAll('.jd-section-card[id]'));
        if (sections.length) {
          scrollContainer.onscroll = () => {
            const containerRect = scrollContainer.getBoundingClientRect();
            const triggerY = containerRect.top + 140;
            let activeId = null;

            for (let i = 0; i < sections.length; i++) {
              const rect = sections[i].getBoundingClientRect();
              if (rect.top <= triggerY) {
                activeId = sections[i].id.replace('sec-', '');
              } else {
                break;
              }
            }

            if (!activeId && sections.length) {
              activeId = sections[0].id.replace('sec-', '');
            }

            if (activeId && activeId !== S.activeSectionKey) {
              S.activeSectionKey = activeId;
              root.querySelectorAll('[data-jump-section]').forEach(a => {
                const isActive = a.dataset.jumpSection === activeId;
                a.classList.toggle('active', isActive);
                if (isActive) {
                  a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                }
              });
            }
          };
        }
      }

      // Edit field changes
      root.querySelectorAll('[data-edit-field]').forEach(input => {
        input.oninput = (e) => {
          if (!S.editDraft) return;
          const path = e.target.dataset.editField;
          App.setDeep(S.editDraft, path, e.target.value);
        };
      });

      // Repeatable editor handlers
      bind('[data-add-list-item]', el => {
        if (!S.editDraft) return;
        const path = el.dataset.addListItem;
        const arr = App.getDeep(S.editDraft, path) || [];
        arr.push('');
        App.setDeep(S.editDraft, path, arr);
        render();
      });

      bind('[data-remove-list-item]', el => {
        if (!S.editDraft) return;
        const path = el.dataset.removeListItem;
        const idx = +el.dataset.idx;
        const arr = App.getDeep(S.editDraft, path) || [];
        arr.splice(idx, 1);
        App.setDeep(S.editDraft, path, arr);
        render();
      });

      // Modal save / confirm for Org structure
      bind('[data-save-directorate]', el => {
        const isEdit = el.dataset.saveDirectorate === 'edit';
        const name = (document.getElementById('modal-dir-name').value || '').trim();
        if (!name) return;
        if (isEdit) {
          const d = App.findDirectorate(S.modal.id);
          if (d) d.name = name;
        } else {
          const newId = 'dir-' + App.uid();
          S.directorates.push({ id: newId, name, divisions: [] });
          S.activeDirectorateId = newId;
        }
        S.modal = null;
        render();
      });

      bind('[data-save-division]', el => {
        const isEdit = el.dataset.saveDivision === 'edit';
        const name = (document.getElementById('modal-div-name').value || '').trim();
        if (!name) return;
        if (isEdit) {
          const v = App.findDivision(S.modal.id);
          if (v) v.name = name;
        } else {
          const dir = App.findDirectorate(S.modal.directorateId);
          if (dir) {
            const newId = 'div-' + App.uid();
            dir.divisions.push({
              id: newId,
              name,
              directorateId: dir.id,
              headOfDivisionJobRoleId: null,
              departments: []
            });
            S.expandedDivisions.add(newId);
          }
        }
        S.modal = null;
        render();
      });

      bind('[data-save-department]', el => {
        const isEdit = el.dataset.saveDepartment === 'edit';
        const name = (document.getElementById('modal-dept-name').value || '').trim();
        if (!name) return;
        if (isEdit) {
          const dep = App.findDepartment(S.modal.id);
          if (dep) dep.name = name;
        } else {
          const v = App.findDivision(S.modal.divisionId);
          if (v) {
            const newId = 'dept-' + App.uid();
            v.departments.push({
              id: newId,
              name,
              divisionId: v.id,
              headOfDepartmentJobRoleId: null,
              jobRoles: []
            });
            S.expandedDepartments.add(newId);
          }
        }
        S.modal = null;
        render();
      });

      bind('[data-save-jobrole]', () => {
        const name = (document.getElementById('modal-role-name').value || '').trim();
        const type = document.getElementById('modal-role-type').value;
        const supervisor = (document.getElementById('modal-role-supervisor').value || '').trim();
        if (!name) return;
        const dep = App.findDepartment(S.modal.departmentId);
        if (dep) {
          const newId = 'role-' + App.uid();
          dep.jobRoles.push({
            id: newId,
            name,
            type,
            departmentId: dep.id,
            supervisor,
            jd: App.emptyJD()
          });
        }
        S.modal = null;
        render();
      });

      bind('[data-save-assign-hod]', () => {
        const name = (document.getElementById('modal-hod-name').value || '').trim();
        if (!name) return;
        const v = App.findDivision(S.modal.divisionId);
        if (v) {
          v.headOfDivisionJobRoleId = 'role-hod-' + v.id;
          App.HOD_NAMES[v.headOfDivisionJobRoleId] = name;
        }
        S.modal = null;
        render();
      });

      bind('[data-save-assign-hodept]', () => {
        const name = (document.getElementById('modal-hodept-name').value || '').trim();
        if (!name) return;
        const dep = App.findDepartment(S.modal.departmentId);
        if (dep) {
          let existing = dep.jobRoles.find(r => r.type === 'Head of Department');
          if (existing) {
            existing.name = name;
            dep.headOfDepartmentJobRoleId = existing.id;
          } else {
            const newId = 'role-hodept-' + dep.id;
            dep.jobRoles.unshift({
              id: newId,
              name,
              type: 'Head of Department',
              departmentId: dep.id,
              supervisor: 'Head of Division',
              jd: App.emptyJD()
            });
            dep.headOfDepartmentJobRoleId = newId;
          }
        }
        S.modal = null;
        render();
      });

      bind('[data-confirm-delete]', () => {
        const { target } = S.modal;
        if (target.type === 'directorate') {
          S.directorates = S.directorates.filter(d => d.id !== target.id);
          if (S.activeDirectorateId === target.id && S.directorates.length) {
            S.activeDirectorateId = S.directorates[0].id;
          }
        } else if (target.type === 'division') {
          for (const d of S.directorates) {
            d.divisions = d.divisions.filter(v => v.id !== target.id);
          }
        } else if (target.type === 'department') {
          for (const d of S.directorates) {
            for (const v of d.divisions) {
              v.departments = v.departments.filter(dep => dep.id !== target.id);
            }
          }
        } else if (target.type === 'role') {
          for (const d of S.directorates) {
            for (const v of d.divisions) {
              for (const dep of v.departments) {
                dep.jobRoles = dep.jobRoles.filter(r => r.id !== target.id);
                if (dep.headOfDepartmentJobRoleId === target.id) dep.headOfDepartmentJobRoleId = null;
              }
            }
          }
        } else if (target.type === 'hod') {
          const v = App.findDivision(target.id);
          if (v) v.headOfDivisionJobRoleId = null;
        }
        S.modal = null;
        render();
      });
    }
  };
})(window);
