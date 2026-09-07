// Action Handlers: Management Schedule Submenu (Absensi, Izin & Cuti, Jadwal Libur)
(function (window) {
  "use strict";

  window.ActionSchedule = {
    attach: function (root, S, render, App) {
      if (S.page !== 'schedule-management') return;

      const bind = (sel, fn) => {
        root.querySelectorAll(sel).forEach(el => {
          el.onclick = (e) => { e.stopPropagation(); fn(el, e); };
        });
      };

      // Tab switcher: absensi | leave | holidays
      bind('[data-schedule-tab]', el => {
        S.scheduleTab = el.dataset.scheduleTab;
        render();
      });

      // Filter Handlers - Attendance
      const attDateInp = document.getElementById('att-filter-date');
      if (attDateInp) {
        attDateInp.onchange = e => {
          S.attendanceFilterDate = e.target.value;
          render();
        };
      }

      const attDivSel = document.getElementById('att-filter-division');
      if (attDivSel) {
        attDivSel.onchange = e => {
          S.attendanceFilterDivision = e.target.value;
          render();
        };
      }

      const attSearchInp = document.getElementById('att-search-input');
      if (attSearchInp) {
        attSearchInp.oninput = e => {
          S.attendanceSearchQuery = e.target.value;
          render();
        };
      }

      // Filter Handlers - Leave
      const leaveStatusSel = document.getElementById('leave-filter-status');
      if (leaveStatusSel) {
        leaveStatusSel.onchange = e => {
          S.leaveFilterStatus = e.target.value;
          render();
        };
      }

      const leaveSearchInp = document.getElementById('leave-search-input');
      if (leaveSearchInp) {
        leaveSearchInp.oninput = e => {
          S.leaveSearchQuery = e.target.value;
          render();
        };
      }

      // Filter Handlers - Holidays / Calendar Roster
      const rosterMonthSel = document.getElementById('roster-filter-month');
      if (rosterMonthSel) {
        rosterMonthSel.onchange = e => {
          S.holidayMonth = parseInt(e.target.value, 10);
          render();
        };
      }

      const rosterYearSel = document.getElementById('roster-filter-year');
      if (rosterYearSel) {
        rosterYearSel.onchange = e => {
          S.holidayYear = parseInt(e.target.value, 10);
          S.holidayFilterYear = e.target.value;
          render();
        };
      }

      const rosterDivSel = document.getElementById('roster-filter-division');
      if (rosterDivSel) {
        rosterDivSel.onchange = e => {
          S.holidayDivision = e.target.value;
          render();
        };
      }

      const rosterSearchInp = document.getElementById('roster-search-input');
      if (rosterSearchInp) {
        rosterSearchInp.oninput = e => {
          S.scheduleRosterSearch = e.target.value;
          render();
        };
      }

      const holYearSel = document.getElementById('hol-filter-year');
      if (holYearSel) {
        holYearSel.onchange = e => {
          S.holidayFilterYear = e.target.value;
          render();
        };
      }

      const holTypeSel = document.getElementById('hol-filter-type');
      if (holTypeSel) {
        holTypeSel.onchange = e => {
          S.holidayFilterType = e.target.value;
          render();
        };
      }

      // Modal Triggers
      bind('#btn-clock-in', () => {
        S.modal = { kind: 'clockInModal' };
        render();
      });

      bind('#btn-add-leave-request', () => {
        S.modal = { kind: 'addLeaveModal' };
        render();
      });

      bind('#btn-add-holiday', () => {
        S.modal = { kind: 'addHolidayModal' };
        render();
      });

      // Leave Approval Action
      bind('[data-approve-leave]', el => {
        const id = el.dataset.approveLeave;
        const req = (S.scheduleData.leaveRequests || []).find(x => x.id === id);
        if (req) {
          req.status = 'Disetujui';
          req.approver = 'Budi Santoso (Head)';
          render();
        }
      });

      bind('[data-reject-leave]', el => {
        const id = el.dataset.rejectLeave;
        const req = (S.scheduleData.leaveRequests || []).find(x => x.id === id);
        if (req) {
          req.status = 'Ditolak';
          req.approver = 'Budi Santoso (Head)';
          render();
        }
      });

      // Save Clock-In
      const saveClockInBtn = document.getElementById('btn-save-clock-in');
      if (saveClockInBtn) {
        saveClockInBtn.onclick = () => {
          const empName = (document.getElementById('cin-name') || {}).value || 'Budi Santoso';
          const empId = (document.getElementById('cin-empid') || {}).value || 'EMP-001';
          const div = (document.getElementById('cin-div') || {}).value || 'Business Quality & Governance';
          const loc = (document.getElementById('cin-loc') || {}).value || 'Head Office - Malang';
          const status = (document.getElementById('cin-status') || {}).value || 'Hadir Tepat Waktu';
          const notes = (document.getElementById('cin-notes') || {}).value || '';

          const d = new Date();
          const pad = n => n.toString().padStart(2, '0');
          const todayStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
          const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

          if (!S.scheduleData.attendance) S.scheduleData.attendance = [];
          S.scheduleData.attendance.unshift({
            id: 'att-' + Date.now(),
            employeeName: empName,
            employeeId: empId,
            division: div,
            role: 'Staf Operasional',
            date: todayStr,
            clockIn: timeStr,
            clockOut: '-',
            location: loc,
            status: status,
            notes: notes
          });

          S.modal = null;
          render();
        };
      }

      // Save Leave Request
      const saveLeaveBtn = document.getElementById('btn-save-leave');
      if (saveLeaveBtn) {
        saveLeaveBtn.onclick = () => {
          const empName = (document.getElementById('lev-name') || {}).value || '';
          const empId = (document.getElementById('lev-empid') || {}).value || 'EMP-009';
          const div = (document.getElementById('lev-div') || {}).value || 'Strategic Growth & Product';
          const type = (document.getElementById('lev-type') || {}).value || 'Cuti Tahunan';
          const start = (document.getElementById('lev-start') || {}).value || '';
          const end = (document.getElementById('lev-end') || {}).value || '';
          const days = parseFloat((document.getElementById('lev-days') || {}).value) || 1;
          const reason = (document.getElementById('lev-reason') || {}).value || '';
          const attach = (document.getElementById('lev-attach') || {}).value || '';

          if (!empName.trim() || !start || !end) {
            alert('Nama pemohon dan rentang tanggal cuti wajib diisi.');
            return;
          }

          if (!S.scheduleData.leaveRequests) S.scheduleData.leaveRequests = [];
          S.scheduleData.leaveRequests.unshift({
            id: 'lreq-' + Date.now(),
            employeeName: empName,
            employeeId: empId,
            division: div,
            type: type,
            startDate: start,
            endDate: end,
            totalDays: days,
            reason: reason,
            status: 'Menunggu Persetujuan',
            approver: 'Menunggu Review Atasan',
            appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            attachment: attach
          });

          S.modal = null;
          render();
        };
      }

      // Save Holiday
      const saveHolBtn = document.getElementById('btn-save-holiday');
      if (saveHolBtn) {
        saveHolBtn.onclick = () => {
          const name = (document.getElementById('hol-name') || {}).value || '';
          const date = (document.getElementById('hol-date') || {}).value || '';
          const type = (document.getElementById('hol-type') || {}).value || 'Libur Khusus Perusahaan';
          const scope = (document.getElementById('hol-scope') || {}).value || 'Internal Dasaria';
          const desc = (document.getElementById('hol-desc') || {}).value || '';

          if (!name.trim() || !date) {
            alert('Nama hari libur dan tanggal wajib diisi.');
            return;
          }

          if (!S.scheduleData.holidays) S.scheduleData.holidays = [];
          S.scheduleData.holidays.push({
            id: 'hol-' + Date.now(),
            name: name,
            date: date,
            type: type,
            scope: scope,
            desc: desc
          });

          // Sort holidays by date
          S.scheduleData.holidays.sort((a, b) => (a.date || '').localeCompare(b.date || ''));

          S.modal = null;
          render();
        };
      }
    }
  };
})(window);
