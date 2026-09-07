// Action Handlers: Open Branch Submenu
(function (window) {
  window.ActionOpenBranch = {
    attach: function (root, S, render, App) {
      if (!S.page.startsWith('open-branch')) return;

      const bind = (sel, fn) => {
        root.querySelectorAll(sel).forEach(el => {
          el.onclick = (e) => { e.stopPropagation(); fn(el, e); };
        });
      };

      // Search Branch
      const obSearchInp = document.getElementById('ob-search-input');
      if (obSearchInp) {
        obSearchInp.oninput = e => {
          S.obSearchQuery = e.target.value;
          render();
        };
      }

      // Lifecycle Filter
      const obLfFilter = document.getElementById('ob-lifecycle-filter');
      if (obLfFilter) {
        obLfFilter.onchange = e => {
          S.obLifecycleFilter = e.target.value;
          render();
        };
      }

      // Detail Rancangan Program Tab Navigation
      bind('[data-ob-tab]', el => {
        S.obDetailTab = el.dataset.obTab;
        render();
      });

      // Readiness Checklist Item Toggle
      root.querySelectorAll('[data-ob-readiness-toggle]').forEach(el => {
        el.onchange = () => {
          const category = el.dataset.obReadinessToggle;
          const itemId = el.dataset.itemId;
          const b = S.branches.find(x => x.id === S.activeBranchId);
          if (b) {
            if (!b.readinessChecklist) {
              b.readinessChecklist = { operational: [], technical: [], commercial: [], launch: [] };
            }
            const list = b.readinessChecklist[category] || [];
            const item = list.find(x => x.id === itemId);
            if (item) {
              item.done = el.checked;
              b.lastUpdated = App.getCurrentDateTime();
              render();
            }
          }
        };
      });

      // Branch Navigation
      bind('[data-add-branch]', () => { S.modal = { kind: 'addBranch' }; render(); });
      bind('[data-edit-branch]', el => {
        S.modal = { kind: 'editBranch', id: el.dataset.editBranch };
        S.openKebab = null;
        render();
      });
      bind('[data-delete-branch]', el => {
        const b = S.branches.find(x => x.id === el.dataset.deleteBranch);
        if (!b) return;
        S.modal = { kind: 'deleteBranch', id: b.id, entityName: b.name };
        S.openKebab = null;
        render();
      });
      bind('[data-toggle-branch]', el => {
        const b = S.branches.find(x => x.id === el.dataset.toggleBranch);
        if (b) {
          b.status = b.status === 'Aktif' ? 'Non-aktif' : 'Aktif';
          b.lastUpdated = App.getCurrentDateTime();
        }
        S.openKebab = null;
        render();
      });
      bind('[data-view-branch]', el => {
        S.activeBranchId = el.dataset.viewBranch;
        S.page = 'open-branch-detail';
        S.openKebab = null;
        render();
      });
      bind('[data-view-monitor]', el => {
        S.activeMonitorId = el.dataset.viewMonitor;
        S.page = 'open-branch-monitor';
        render();
      });
      bind('[data-nav-ob-home]', () => {
        S.page = 'open-branch';
        S.activeBranchId = null;
        S.activeMonitorId = null;
        render();
      });
      bind('[data-nav-ob-branch]', () => {
        S.page = 'open-branch-detail';
        S.activeMonitorId = null;
        render();
      });

      // Save Branch Modal
      bind('[data-save-branch]', el => {
        const isEdit = el.dataset.saveBranch === 'edit';
        const name = (document.getElementById('modal-branch-name').value || '').trim();
        const fullName = (document.getElementById('modal-branch-fullname') ? document.getElementById('modal-branch-fullname').value : '').trim() || name;
        const loc = (document.getElementById('modal-branch-loc').value || '').trim();
        const leader = (document.getElementById('modal-branch-leader') ? document.getElementById('modal-branch-leader').value : '').trim();
        const targetOpenDate = (document.getElementById('modal-branch-target-date') ? document.getElementById('modal-branch-target-date').value : '').trim();
        const lifecycleStatus = (document.getElementById('modal-branch-lifecycle') ? document.getElementById('modal-branch-lifecycle').value : 'Draft');
        const status = document.getElementById('modal-branch-status').value;
        if (!name) return;
        if (isEdit) {
          const b = S.branches.find(x => x.id === S.modal.id);
          if (b) {
            b.name = name;
            b.fullName = fullName;
            b.location = loc;
            b.projectLeader = leader;
            b.targetOpenDate = targetOpenDate;
            b.lifecycleStatus = lifecycleStatus;
            b.status = status;
            b.lastUpdated = App.getCurrentDateTime();
          }
        } else {
          S.branches.unshift({
            id: 'br-' + App.uid(),
            name,
            fullName,
            location: loc,
            projectLeader: leader,
            targetOpenDate,
            lifecycleStatus,
            status,
            progress: 0,
            lastUpdated: App.getCurrentDateTime(),
            monitors: App.createStandardMonitors()
          });
        }
        S.modal = null;
        render();
      });

      bind('[data-confirm-delete-branch]', () => {
        S.branches = S.branches.filter(x => x.id !== S.modal.id);
        if (S.activeBranchId === S.modal.id) {
          S.activeBranchId = null;
          S.page = 'open-branch';
        }
        S.modal = null;
        render();
      });

      // FASUM CRUD
      bind('[data-add-fasum]', () => { S.modal = { kind: 'addFasum' }; render(); });
      bind('[data-edit-fasum]', el => { S.modal = { kind: 'editFasum', idx: +el.dataset.editFasum }; render(); });
      bind('[data-delete-fasum]', el => { S.modal = { kind: 'deleteFasumConfirm', idx: +el.dataset.deleteFasum }; render(); });
      bind('[data-save-fasum]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newF = {
          id: 'fsm-' + App.uid(),
          no: g('fsm-no'), namaArea: g('fsm-nama'), kelurahan: g('fsm-kel'),
          rw: g('fsm-rw'), rt: g('fsm-rt'), lokasiFasum: g('fsm-lokasi'),
          pemohon: g('fsm-pemohon'), status: g('fsm-status'),
          titikKoordinat: g('fsm-koordinat'), linkDokumentasi: g('fsm-linkdok')
        };
        const idx = el.dataset.saveFasum;
        if (!mon.fasumData) mon.fasumData = [];
        if (idx === 'new') {
          mon.fasumData.push(newF);
        } else {
          newF.id = mon.fasumData[+idx].id;
          mon.fasumData[+idx] = newF;
        }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-fasum]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.fasumData.splice(+el.dataset.confirmDeleteFasum, 1);
        S.modal = null; render();
      });

      // PEMASANGAN TIANG CRUD
      bind('[data-add-tiang]', () => { S.modal = { kind: 'addTiang' }; render(); });
      bind('[data-edit-tiang]', el => { S.modal = { kind: 'editTiang', idx: +el.dataset.editTiang }; render(); });
      bind('[data-delete-tiang]', el => { S.modal = { kind: 'deleteTiangConfirm', idx: +el.dataset.deleteTiang }; render(); });
      bind('[data-save-tiang]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newT = {
          id: 'ptg-' + App.uid(),
          no: g('tg-no'), idTiang: g('tg-id'), lokasi: g('tg-lokasi'),
          linkGmaps: g('tg-gmaps'), jenisTiang: g('tg-jenis'),
          statusPekerjaan: g('tg-status-kerja'), statusQC: g('tg-status-qc'),
          linkDokumentasi: g('tg-linkdok'), catatan: g('tg-catatan'),
          lampiranFormQC: g('tg-formqc'), lampiranFormTanam: g('tg-formtanam')
        };
        const idx = el.dataset.saveTiang;
        if (!mon.pemasanganTiangData) mon.pemasanganTiangData = [];
        if (idx === 'new') mon.pemasanganTiangData.push(newT);
        else { newT.id = mon.pemasanganTiangData[+idx].id; mon.pemasanganTiangData[+idx] = newT; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-tiang]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.pemasanganTiangData.splice(+el.dataset.confirmDeleteTiang, 1);
        S.modal = null; render();
      });

      // PEMBANGUNAN POP CRUD
      bind('[data-add-ppop]', () => { S.modal = { kind: 'addPpop' }; render(); });
      bind('[data-edit-ppop]', el => { S.modal = { kind: 'editPpop', idx: +el.dataset.editPpop }; render(); });
      bind('[data-delete-ppop]', el => { S.modal = { kind: 'deletePpopConfirm', idx: +el.dataset.deletePpop }; render(); });
      bind('[data-save-ppop]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newOpt = {
          id: 'ppop-' + App.uid(),
          no: g('ppop-no'), surveyor: g('ppop-surveyor'), date: g('ppop-date'),
          status: g('ppop-status'), recommendation: g('ppop-rec'),
          infoLokasi: { fotoLokasi: g('ppop-foto'), alamatLokasi: g('ppop-alamat'), linkGmaps: g('ppop-gmaps') },
          pembangunanODC: {
            statusRAB: g('ppop-rab'), statusPengadaan: g('ppop-pengadaan'),
            statusPembangunan: g('ppop-bangun'), statusInstalasi: g('ppop-instalasi'),
            statusUjiKelayakan: g('ppop-uji')
          },
          kelistrikanODC: {
            statusPengajuanPLN: g('ppop-pln'), statusInstalasiListrik: g('ppop-listrik'),
            statusListrikODC: g('ppop-listrik-odc')
          },
          aktivasiPerangkat: {
            statusPersiapan: g('ppop-persiapan'), statusKonfigurasi: g('ppop-konfig'),
            statusAktivasiODC: g('ppop-aktivasi')
          },
          dokumentasi: {
            targetODCReady: g('ppop-target'), aktualODCReady: g('ppop-aktual'),
            catatanKendala: g('ppop-kendala'), linkDokumentasi: g('ppop-linkdok')
          }
        };
        const idx = el.dataset.savePpop;
        if (!mon.pembangunanPopData) mon.pembangunanPopData = [];
        if (idx === 'new') mon.pembangunanPopData.push(newOpt);
        else { newOpt.id = mon.pembangunanPopData[+idx].id; mon.pembangunanPopData[+idx] = newOpt; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-ppop]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.pembangunanPopData.splice(+el.dataset.confirmDeletePpop, 1);
        S.modal = null; render();
      });

      // ROUTE CRUD
      bind('[data-add-route]', () => { S.modal = { kind: 'addRoute' }; render(); });
      bind('[data-edit-route]', el => { S.modal = { kind: 'editRoute', idx: +el.dataset.editRoute }; render(); });
      bind('[data-delete-route]', el => { S.modal = { kind: 'deleteRouteConfirm', idx: +el.dataset.deleteRoute }; render(); });
      bind('[data-save-route]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const getJ = n => ({ kabel: g(`rt-j${n}-kabel`), tube: g(`rt-j${n}-tube`), core: g(`rt-j${n}-core`), panjang: g(`rt-j${n}-panjang`) });
        const newR = {
          id: 'rta-' + App.uid(),
          no: g('rt-no'), batch: g('rt-batch'), warnaArea: g('rt-warna'), warnaHex: g('rt-warna-hex'),
          namaArea: g('rt-nama'), otb: g('rt-otb'),
          jalur1: getJ(1), cj1: g('rt-cj1'), jalur2: getJ(2), cj2: g('rt-cj2'),
          jalur3: getJ(3), cj3: g('rt-cj3'), jalur4: getJ(4), cj4: g('rt-cj4'),
          totalPanjang: g('rt-total'), statusRoute: g('rt-status'),
          linkDokumentasi: g('rt-linkdok'), catatan: g('rt-catatan')
        };
        const idx = el.dataset.saveRoute;
        if (!mon.routeAreaData) mon.routeAreaData = [];
        if (idx === 'new') mon.routeAreaData.push(newR);
        else { newR.id = mon.routeAreaData[+idx].id; mon.routeAreaData[+idx] = newR; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-route]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.routeAreaData.splice(+el.dataset.confirmDeleteRoute, 1);
        S.modal = null; render();
      });

      // OPSI POP ODC CRUD
      bind('[data-add-odc]', () => { S.modal = { kind: 'addOdc' }; render(); });
      bind('[data-edit-odc]', el => { S.modal = { kind: 'editOdc', idx: +el.dataset.editOdc }; render(); });
      bind('[data-delete-odc]', el => { S.modal = { kind: 'deleteOdcConfirm', idx: +el.dataset.deleteOdc }; render(); });
      bind('[data-save-odc]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newOpt = {
          id: 'opt-' + App.uid(),
          no: g('odc-no'), surveyor: g('odc-surveyor'), date: g('odc-date'),
          branchOption: g('odc-branch-opt'), status: g('odc-status'), recommendation: g('odc-rec'),
          location: { address: g('odc-address'), gmaps: g('odc-gmaps'), pic: g('odc-pic'), landStatus: g('odc-land-status') },
          environment: { pengawasan: g('odc-pengawasan'), akses: g('odc-akses'), terbuka: g('odc-terbuka'), matahari: g('odc-matahari'), banjir: g('odc-banjir') },
          documentation: { fileLink: g('odc-doc-link'), notes: g('odc-doc-notes') }
        };
        const idx = el.dataset.saveOdc;
        if (!mon.popOdcOptions) mon.popOdcOptions = [];
        if (idx === 'new') mon.popOdcOptions.push(newOpt);
        else { newOpt.id = mon.popOdcOptions[+idx].id; mon.popOdcOptions[+idx] = newOpt; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-odc]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.popOdcOptions.splice(+el.dataset.confirmDeleteOdc, 1);
        S.modal = null; render();
      });

      // PERMIT CRUD
      bind('[data-add-permit]', () => { S.modal = { kind: 'addPermit' }; render(); });
      bind('[data-edit-permit]', el => { S.modal = { kind: 'editPermit', idx: +el.dataset.editPermit }; render(); });
      bind('[data-delete-permit]', el => { S.modal = { kind: 'deletePermitConfirm', idx: +el.dataset.deletePermit }; render(); });
      bind('[data-save-permit]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newOpt = {
          id: 'pmt-' + App.uid(),
          no: g('pmt-no'), kecamatan: g('pmt-kec'), kelurahan: g('pmt-kel'), kodeArea: g('pmt-kda'),
          rw: g('pmt-rw'), rt: g('pmt-rt'), jenisPermit: g('pmt-jenis'),
          statusPlanner: g('pmt-st-planner'), picPlanner: g('pmt-pic-planner'),
          statusPermit: g('pmt-st-permit'), picPermit: g('pmt-pic-permit'),
          tglProposal: g('pmt-tgl-prop'), tglBak: g('pmt-tgl-bak'),
          targetSelesai: g('pmt-tgt-selesai'), tglSelesai: g('pmt-tgl-selesai'),
          jenisKompensasi: g('pmt-jenis-komp'), nilaiKompensasi: g('pmt-nilai-komp'),
          overallStatus: g('pmt-ovr-status'), linkProposal: g('pmt-link-prop'),
          linkBak: g('pmt-link-bak'), keterangan: g('pmt-ket')
        };
        const idx = el.dataset.savePermit;
        if (!mon.permitData) mon.permitData = [];
        if (idx === 'new') mon.permitData.push(newOpt);
        else { newOpt.id = mon.permitData[+idx].id; mon.permitData[+idx] = newOpt; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-permit]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.permitData.splice(+el.dataset.confirmDeletePermit, 1);
        S.modal = null; render();
      });

      // PLAN AREA CRUD
      bind('[data-add-plan-area]', () => { S.modal = { kind: 'addPlanArea' }; render(); });
      bind('[data-edit-plan-area]', el => { S.modal = { kind: 'editPlanArea', idx: +el.dataset.editPlanArea }; render(); });
      bind('[data-delete-plan-area]', el => { S.modal = { kind: 'deletePlanAreaConfirm', idx: +el.dataset.deletePlanArea }; render(); });
      bind('[data-save-plan-area]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newOpt = {
          id: 'pln-' + App.uid(),
          no: g('pln-no'), namaArea: g('pln-nama'), kodeArea: g('pln-kda'),
          kecamatan: g('pln-kec'), kelurahan: g('pln-kel'), rw: g('pln-rw'),
          totalLuasArea: g('pln-total-luas'), stdLuasArea: g('pln-std-luas'),
          statusArea: g('pln-status'), planRk: g('pln-plan-rk'),
          planOdp: g('pln-plan-odp'), jmlTiang: g('pln-jml-tiang'),
          sumberCj: g('pln-sumber-cj'), keterangan: g('pln-ket')
        };
        const idx = el.dataset.savePlanArea;
        if (!mon.planAreaData) mon.planAreaData = [];
        if (idx === 'new') mon.planAreaData.push(newOpt);
        else { newOpt.id = mon.planAreaData[+idx].id; mon.planAreaData[+idx] = newOpt; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-plan-area]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.planAreaData.splice(+el.dataset.confirmDeletePlanArea, 1);
        S.modal = null; render();
      });

      // BRANCH OFFICE CRUD
      bind('[data-add-bof]', () => { S.modal = { kind: 'addBof' }; render(); });
      bind('[data-edit-bof]', el => { S.modal = { kind: 'editBof', idx: +el.dataset.editBof }; render(); });
      bind('[data-delete-bof]', el => { S.modal = { kind: 'deleteBofConfirm', idx: +el.dataset.deleteBof }; render(); });
      bind('[data-save-bof]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        const g = id => (document.getElementById(id) ? document.getElementById(id).value : '');
        const newOpt = {
          id: 'bof-' + App.uid(),
          no: g('bof-no'), surveyor: g('bof-surveyor'), date: g('bof-date'),
          status: g('bof-status'), recommendation: g('bof-rec'),
          identitas: {
            fotoTampakDepan: g('bof-foto'), alamat: g('bof-alamat'), gmaps: g('bof-gmaps'),
            namaPemilik: g('bof-pemilik'), kontakPemilik: g('bof-kontak'),
            jenisBangunan: g('bof-jenis'), jumlahLantai: g('bof-lantai'), jumlahRuangan: g('bof-ruangan')
          },
          operasional: {
            jarakAreaPenjualan: g('bof-jarak'), aksesKendaraan: g('bof-akses'),
            areaParkir: g('bof-parkir'), kondisiLingkungan: g('bof-lingkungan'),
            keamananLingkungan: g('bof-keamanan')
          },
          standarBranch: {
            areaBrainstorming: g('bof-brainstorm'), areaMaterialFTTH: g('bof-material'),
            areaTiang: g('bof-tiang'), areaIstirahat: g('bof-istirahat'),
            pantry: g('bof-pantry'), kamarMandi: g('bof-km')
          },
          infoBangunan: {
            luasTanah: g('bof-luas-tanah'), luasBangunan: g('bof-luas-bangunan'),
            jumlahLantai: g('bof-lantai-info'), jumlahRuangan: g('bof-ruangan-info'),
            hargaSewa: g('bof-sewa')
          },
          kondisiBangunan: {
            kondisiBangunan: g('bof-kondisi-bangunan'), kondisiKelistrikan: g('bof-listrik'),
            dayaListrik: g('bof-daya'), kondisiAir: g('bof-air'),
            sumberAir: g('bof-sumber-air'), estimasiRenovasi: g('bof-renov')
          },
          dokumentasi: { linkDokumentasi: g('bof-linkdok') }
        };
        const idx = el.dataset.saveBof;
        if (!mon.branchOfficeOptions) mon.branchOfficeOptions = [];
        if (idx === 'new') mon.branchOfficeOptions.push(newOpt);
        else { newOpt.id = mon.branchOfficeOptions[+idx].id; mon.branchOfficeOptions[+idx] = newOpt; }
        S.modal = null; render();
      });
      bind('[data-confirm-delete-bof]', el => {
        const b = S.branches.find(x => x.id === S.activeBranchId);
        const mon = b.monitors.find(x => x.id === S.activeMonitorId);
        mon.branchOfficeOptions.splice(+el.dataset.confirmDeleteBof, 1);
        S.modal = null; render();
      });
    }
  };
})(window);
