// Action Handlers: Kuartal & Pencapaian Branch Module
(function (window) {
  "use strict";

  window.ActionKuartal = {
    attach: function (root, S, render) {
      if (S.page !== 'kuartal') return;

      // Top Tab Navigation
      const tabPencapaian = document.getElementById('tab-btn-pencapaian');
      if (tabPencapaian) {
        tabPencapaian.onclick = function () {
          S.kuartalMainTab = 'pencapaian';
          S.activeKuartalDetailBranch = null;
          render();
        };
      }

      const tabKelola = document.getElementById('tab-btn-kelolatarget');
      if (tabKelola) {
        tabKelola.onclick = function () {
          S.kuartalMainTab = 'kelolaTarget';
          S.activeKuartalDetailBranch = null;
          render();
        };
      }

      // Sub-view Tab Navigation (Bulanan, Kuartal, Tahunan)
      const btnViewBulanan = document.getElementById('btn-view-bulanan');
      if (btnViewBulanan) {
        btnViewBulanan.onclick = function () {
          S.kuartalView = 'bulanan';
          render();
        };
      }
      const btnViewTriwulan = document.getElementById('btn-view-triwulan');
      if (btnViewTriwulan) {
        btnViewTriwulan.onclick = function () {
          S.kuartalView = 'triwulan';
          render();
        };
      }
      const btnViewTahunan = document.getElementById('btn-view-tahunan');
      if (btnViewTahunan) {
        btnViewTahunan.onclick = function () {
          S.kuartalView = 'tahunan';
          render();
        };
      }

      // Filter Handlers
      const fMonth = document.getElementById('fMonth');
      if (fMonth) {
        fMonth.onchange = function (e) {
          S.kuartalMonth = parseInt(e.target.value, 10);
          render();
        };
      }
      const fYear = document.getElementById('fYear');
      if (fYear) {
        fYear.onchange = function (e) {
          S.kuartalYear = parseInt(e.target.value, 10);
          render();
        };
      }
      const fBranch = document.getElementById('fBranch');
      if (fBranch) {
        fBranch.onchange = function (e) {
          S.kuartalBranch = e.target.value;
          render();
        };
      }
      const fStatus = document.getElementById('fStatus');
      if (fStatus) {
        fStatus.onchange = function (e) {
          S.kuartalStatus = e.target.value;
          render();
        };
      }
      const btnReset = document.getElementById('btnResetFilter');
      if (btnReset) {
        btnReset.onclick = function () {
          S.kuartalView = 'bulanan';
          S.kuartalYear = 2026;
          S.kuartalMonth = 8;
          S.kuartalBranch = 'all';
          S.kuartalStatus = 'all';
          render();
        };
      }

      // Kelola Filters
      const kelolaYearSelect = document.getElementById('kelolaYearSelect');
      if (kelolaYearSelect) {
        kelolaYearSelect.onchange = function (e) {
          S.kelolaYear = parseInt(e.target.value, 10);
          render();
        };
      }
      const kelolaBranchFilter = document.getElementById('kelolaBranchFilter');
      if (kelolaBranchFilter) {
        kelolaBranchFilter.onchange = function (e) {
          S.kelolaBranch = e.target.value;
          render();
        };
      }
      const kelolaBtnReset = document.getElementById('kelolaBtnReset');
      if (kelolaBtnReset) {
        kelolaBtnReset.onclick = function () {
          S.kelolaYear = 2026;
          S.kelolaBranch = 'all';
          render();
        };
      }

      // Detail Branch trigger
      root.querySelectorAll('[data-open-branch-detail]').forEach(function (el) {
        el.onclick = function () {
          S.activeKuartalDetailBranch = el.dataset.openBranchDetail;
          render();
        };
      });

      const btnBackDetail = document.getElementById('btn-back-branch-detail');
      if (btnBackDetail) {
        btnBackDetail.onclick = function () {
          S.activeKuartalDetailBranch = null;
          render();
        };
      }

      // Modal Tambah Target Trigger
      const btnTambahTarget = document.getElementById('btn-tambah-target');
      if (btnTambahTarget) {
        btnTambahTarget.onclick = function () {
          S.modal = { kind: 'kuartalTarget', branchId: S.branches[0] ? S.branches[0].id : 'BR01', isNew: true };
          render();
        };
      }

      // Modal Edit Target Trigger per Branch
      root.querySelectorAll('[data-edit-target-branch]').forEach(function (el) {
        el.onclick = function () {
          S.modal = { kind: 'kuartalTarget', branchId: el.dataset.editTargetBranch, isNew: false };
          render();
        };
      });

      // Modal Atur Fase & Kuartal Trigger
      root.querySelectorAll('[data-edit-fase-branch]').forEach(function (el) {
        el.onclick = function () {
          S.modal = { kind: 'kuartalFase', branchId: el.dataset.editFaseBranch };
          render();
        };
      });

      // Modal Target Mode Toggle inside Modal
      const mModeTarget = document.getElementById('mModeTarget');
      if (mModeTarget) {
        mModeTarget.onchange = function (e) {
          const mode = e.target.value;
          const wUniform = document.getElementById('wrapUniformInput');
          const wCustom = document.getElementById('wrapCustomInput');
          if (wUniform) wUniform.style.display = mode === 'uniform' ? 'block' : 'none';
          if (wCustom) wCustom.style.display = mode === 'custom' ? 'block' : 'none';
        };
      }

      // Modal Save Target Action
      const btnSaveTarget = document.getElementById('btn-save-target-modal');
      if (btnSaveTarget) {
        btnSaveTarget.onclick = function () {
          const branchId = (document.getElementById('mBranch') || {}).value;
          const year = parseInt((document.getElementById('mYear') || {}).value || S.kelolaYear, 10);
          const mode = (document.getElementById('mModeTarget') || {}).value || 'custom';

          if (!branchId) {
            alert('Pilih branch terlebih dahulu.');
            return;
          }

          if (!S.kuartalData.records[branchId]) {
            S.kuartalData.records[branchId] = {};
          }

          if (mode === 'uniform') {
            const uVal = parseInt((document.getElementById('mTargetUniform') || {}).value || 0, 10);
            const splitVal = Math.round(uVal / 12);
            for (let m = 1; m <= 12; m++) {
              const idx = year * 12 + (m - 1);
              const ex = S.kuartalData.records[branchId][idx] || { onlyAdmin: 5, onlyFasum: 2, erp: 7, ae: 100 };
              ex.target = splitVal;
              S.kuartalData.records[branchId][idx] = ex;
            }
          } else {
            document.querySelectorAll('.m-month-input').forEach(function (inp) {
              const m = parseInt(inp.dataset.month, 10);
              const val = parseInt(inp.value, 10) || 0;
              const idx = year * 12 + (m - 1);
              const ex = S.kuartalData.records[branchId][idx] || { onlyAdmin: 5, onlyFasum: 2, erp: 7, ae: 100 };
              ex.target = val;
              S.kuartalData.records[branchId][idx] = ex;
            });
          }

          S.modal = null;
          render();
        };
      }

      // Modal Save Fase Action
      const btnSaveFase = document.getElementById('btn-save-fase-modal');
      if (btnSaveFase) {
        btnSaveFase.onclick = function () {
          const branchId = (document.getElementById('fNewId') || {}).value;
          const q1s = parseInt((document.getElementById('q1Start') || {}).value || 1, 10);
          const q1e = parseInt((document.getElementById('q1End') || {}).value || 4, 10);
          const q1sy = parseInt((document.getElementById('q1StartYear') || {}).value || S.kelolaYear, 10);
          const q1ey = parseInt((document.getElementById('q1EndYear') || {}).value || S.kelolaYear, 10);

          const b = S.kuartalData.branches.find(x => x.id === branchId);
          if (b) {
            b.customQ1 = { start: q1s, end: q1e, startYear: q1sy, endYear: q1ey };
          }

          S.modal = null;
          render();
        };
      }

      // CSV Export
      const btnExport = document.getElementById('btn-export-kuartal-csv');
      if (btnExport) {
        btnExport.onclick = function () {
          let csv = "data:text/csv;charset=utf-8,";
          csv += "No,Branch,Target,Closing,Status\r\n";
          (S.kuartalData.branches || []).forEach(function (b, i) {
            const rec = (S.kuartalData.records[b.id] || {})[S.kuartalYear * 12 + (S.kuartalMonth - 1)] || { target: 0, onlyAdmin: 0, ae: 0 };
            const tot = (rec.onlyAdmin || 0) + (rec.ae || 0);
            const st = tot >= rec.target ? "Tercapai" : "Tidak Tercapai";
            csv += `${i + 1},"${b.name}",${rec.target},${tot},"${st}"\r\n`;
          });
          const uri = encodeURI(csv);
          const link = document.createElement("a");
          link.setAttribute("href", uri);
          link.setAttribute("download", `pencapaian_branch_${S.kuartalYear}_${S.kuartalMonth}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      }
    }
  };
})(window);
