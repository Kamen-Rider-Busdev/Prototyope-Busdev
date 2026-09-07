// Action Handlers: Project Management Submenu (BQG & SGP Unified)
(function (window) {
  "use strict";

  window.ActionProjectManagement = {
    attach: function (root, S, render) {
      if (S.page !== 'project-management') return;

      // View toggle
      const btnBoard = document.getElementById('pm-view-board');
      if (btnBoard) {
        btnBoard.onclick = function () {
          S.pmViewMode = 'board';
          render();
        };
      }
      const btnTable = document.getElementById('pm-view-table');
      if (btnTable) {
        btnTable.onclick = function () {
          S.pmViewMode = 'table';
          render();
        };
      }

      // Search input
      const searchInp = document.getElementById('pm-search-input');
      if (searchInp) {
        searchInp.oninput = function (e) {
          S.pmSearchQuery = e.target.value;
          render();
        };
      }

      // Category Scope filter
      const filterCatType = document.getElementById('pm-filter-category-type');
      if (filterCatType) {
        filterCatType.onchange = function (e) {
          S.pmFilterCategoryType = e.target.value;
          render();
        };
      }

      // Division filter
      const filterDiv = document.getElementById('pm-filter-division');
      if (filterDiv) {
        filterDiv.onchange = function (e) {
          S.pmFilterDivision = e.target.value;
          render();
        };
      }

      // Department filter
      const filterDept = document.getElementById('pm-filter-department');
      if (filterDept) {
        filterDept.onchange = function (e) {
          S.pmFilterDepartment = e.target.value;
          render();
        };
      }

      // Priority filter
      const filterPrio = document.getElementById('pm-filter-priority');
      if (filterPrio) {
        filterPrio.onchange = function (e) {
          S.pmFilterPriority = e.target.value;
          render();
        };
      }

      // Dynamic Department Dropdown & Category Type toggle in Modal
      const modalCatType = document.getElementById('pm-form-cattype');
      const modalDiv = document.getElementById('pm-form-division');
      const modalDeptGroup = document.getElementById('pm-form-dept-group');
      const modalDeptSelect = document.getElementById('pm-form-department');

      const updateDeptOptions = function () {
        if (!modalDiv || !modalDeptSelect) return;
        const valDiv = modalDiv.value;
        const deptListBqg = ['Regulatory Compliance', 'Internal Audit', 'Standardization & SOP', 'Talent Acquisition', 'People Development'];
        const deptListSgp = ['Branch Expansion', 'Product Engineering', 'Strategic Partnerships', 'Market Intelligence'];
        const deptListOther = ['Finance & Accounting', 'IT Infrastructure', 'Operations'];
        
        let depts = [];
        if (valDiv === 'Business Quality & Governance' || valDiv === 'BQG') depts = deptListBqg;
        else if (valDiv === 'Strategic Growth & Product' || valDiv === 'SGP') depts = deptListSgp;
        else depts = [...deptListBqg, ...deptListSgp, ...deptListOther];

        const currentVal = modalDeptSelect.value;
        modalDeptSelect.innerHTML = '<option value="">-- Pilih Departemen --</option>' + 
          depts.map(d => `<option value="${d}" ${d === currentVal ? 'selected' : ''}>${d}</option>`).join('');
      };

      if (modalCatType && modalDeptGroup) {
        modalCatType.onchange = function () {
          if (modalCatType.value === 'department') {
            modalDeptGroup.style.display = 'block';
            updateDeptOptions();
          } else {
            modalDeptGroup.style.display = 'none';
          }
        };
      }

      if (modalDiv) {
        modalDiv.onchange = function () {
          updateDeptOptions();
        };
      }

      // Open Add Project Modal
      const btnAdd = document.getElementById('btn-add-project');
      if (btnAdd) {
        btnAdd.onclick = function () {
          S.modal = { kind: 'addProject' };
          render();
        };
      }

      // Edit Project Trigger
      root.querySelectorAll('[data-pm-edit]').forEach(function (el) {
        el.onclick = function (e) {
          e.stopPropagation();
          const id = el.dataset.pmEdit;
          S.modal = { kind: 'editProject', id: id };
          render();
        };
      });

      // Delete Project Trigger
      root.querySelectorAll('[data-pm-delete]').forEach(function (el) {
        el.onclick = function (e) {
          e.stopPropagation();
          const id = el.dataset.pmDelete;
          const p = S.projects.find(function (x) { return x.id === id; });
          if (p) {
            S.modal = { kind: 'deleteConfirm', entityLabel: 'Proyek', entityName: p.title, confirmAction: 'deleteProject', id: id };
            render();
          }
        };
      });

      // View Project Detail Modal
      root.querySelectorAll('[data-pm-card]').forEach(function (el) {
        el.onclick = function () {
          const id = el.dataset.pmCard;
          S.modal = { kind: 'viewProject', id: id };
          render();
        };
      });

      // Toggle Task Done in View Modal
      root.querySelectorAll('[data-pm-toggle-task]').forEach(function (el) {
        el.onchange = function () {
          const prjId = el.dataset.prjId;
          const taskId = el.dataset.taskId;
          const prj = S.projects.find(function (x) { return x.id === prjId; });
          if (prj && prj.tasks) {
            const task = prj.tasks.find(function (t) { return t.id === taskId; });
            if (task) {
              task.done = el.checked;
              render();
            }
          }
        };
      });

      // Add Task within Modal
      const btnAddTask = document.getElementById('pm-btn-add-task');
      if (btnAddTask) {
        btnAddTask.onclick = function () {
          const prjId = btnAddTask.dataset.prjId;
          const inp = document.getElementById('pm-new-task-title');
          if (inp && inp.value.trim()) {
            const prj = S.projects.find(function (x) { return x.id === prjId; });
            if (prj) {
              if (!prj.tasks) prj.tasks = [];
              prj.tasks.push({
                id: 't-' + Date.now(),
                title: inp.value.trim(),
                done: false
              });
              render();
            }
          }
        };
      }

      // Drag and drop for Kanban cards
      let draggedId = null;
      root.querySelectorAll('.pm-card[draggable="true"]').forEach(function (card) {
        card.ondragstart = function (e) {
          draggedId = card.dataset.pmCard;
          card.classList.add('dragging');
          e.dataTransfer.setData('text/plain', draggedId);
        };
        card.ondragend = function () {
          card.classList.remove('dragging');
        };
      });

      root.querySelectorAll('.pm-col-body[data-status]').forEach(function (col) {
        col.ondragover = function (e) {
          e.preventDefault();
          col.classList.add('drag-over');
        };
        col.ondragleave = function () {
          col.classList.remove('drag-over');
        };
        col.ondrop = function (e) {
          e.preventDefault();
          col.classList.remove('drag-over');
          const id = e.dataTransfer.getData('text/plain') || draggedId;
          const targetStatus = col.dataset.status;
          if (id && targetStatus) {
            const p = S.projects.find(function (x) { return x.id === id; });
            if (p && p.status !== targetStatus) {
              p.status = targetStatus;
              render();
            }
          }
        };
      });
    }
  };
})(window);
