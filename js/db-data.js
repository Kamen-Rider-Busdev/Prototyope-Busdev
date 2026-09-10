const DB_MODEL = {
  type: "MySQL",
  databases: [
    { name: "griya_company", peruntukan: ["Sistem HRIS", "Operasional Lapangan"], tables: [
      { name: "branches", full: "griya_company.branches", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"regional",type:"varchar",pk:false,fk:false}, {name:"prefix_radius_gateway",type:"varchar",pk:false,fk:false}, {name:"branch_name",type:"varchar",pk:false,fk:false}, {name:"kode_branch",type:"varchar",pk:false,fk:false}, {name:"address",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"ip_host",type:"varchar",pk:false,fk:false}, {name:"is_nas_juniper",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "divisions", full: "griya_company.divisions", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"nama_divisi",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"datetime",pk:false,fk:false}, {name:"updated_at",type:"datetime",pk:false,fk:false}], fkCols: [] },
      { name: "users", full: "griya_company.users", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"sales_salary_schema_id",type:"int",pk:false,fk:true}, {name:"is_admin",type:"boolean",pk:false,fk:false}, {name:"role",type:"varchar",pk:false,fk:false}, {name:"status_pegawai",type:"varchar",pk:false,fk:false}, {name:"nama_lengkap",type:"varchar",pk:false,fk:false}, {name:"full_name",type:"varchar",pk:false,fk:false}, {name:"karyawan_nip",type:"int",pk:false,fk:false}, {name:"division_id",type:"int",pk:false,fk:true}, {name:"password",type:"varchar",pk:false,fk:false}, {name:"remember_token",type:"varchar",pk:false,fk:false}, {name:"refresh_token_expiry",type:"datetime",pk:false,fk:false}, {name:"created_at",type:"datetime",pk:false,fk:false}, {name:"updated_at",type:"datetime",pk:false,fk:false}], fkCols: ["branch_id", "division_id", "sales_salary_schema_id"] },
      { name: "service_packages", full: "griya_company.service_packages", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"nama_layanan",type:"varchar",pk:false,fk:false}, {name:"speed",type:"int",pk:false,fk:false}, {name:"slug",type:"varchar",pk:false,fk:false}, {name:"harga",type:"double",pk:false,fk:false}, {name:"tag",type:"json",pk:false,fk:false}, {name:"formulir",type:"boolean",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "sales_salary_schemas", full: "griya_company.sales_salary_schemas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"schema_name",type:"varchar",pk:false,fk:false}, {name:"base_salary",type:"decimal",pk:false,fk:false}, {name:"survey_rate",type:"decimal",pk:false,fk:false}, {name:"schema_type",type:"varchar",pk:false,fk:false}, {name:"effective_from",type:"date",pk:false,fk:false}, {name:"document_url",type:"varchar",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "sales_salary_schema_assignments", full: "griya_company.sales_salary_schema_assignments", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"sales_nip",type:"int",pk:false,fk:true}, {name:"sales_salary_schema_id",type:"int",pk:false,fk:true}, {name:"assigned_from",type:"date",pk:false,fk:false}, {name:"assigned_until",type:"date",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sales_salary_schema_id", "sales_nip"] },
      { name: "tier_schemas", full: "griya_company.tier_schemas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"sales_scheme_id",type:"int",pk:false,fk:true}, {name:"min_value",type:"int",pk:false,fk:false}, {name:"max_value",type:"int",pk:false,fk:false}, {name:"amount",type:"decimal",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sales_scheme_id"] },
      { name: "cashback_schemas", full: "griya_company.cashback_schemas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"sales_scheme_id",type:"int",pk:false,fk:true}, {name:"category",type:"varchar",pk:false,fk:false}, {name:"max_value_static",type:"int",pk:false,fk:false}, {name:"percentage",type:"tinyint",pk:false,fk:false}, {name:"amount",type:"decimal",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sales_scheme_id"] },
      { name: "performance_schemas", full: "griya_company.performance_schemas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"sales_scheme_id",type:"int",pk:false,fk:true}, {name:"component",type:"varchar",pk:false,fk:false}, {name:"mode",type:"varchar",pk:false,fk:false}, {name:"min_threshold_closing",type:"int",pk:false,fk:false}, {name:"max_threshold_closing",type:"int",pk:false,fk:false}, {name:"percentage",type:"tinyint",pk:false,fk:false}, {name:"is_threshold",type:"tinyint",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sales_scheme_id"] },
      { name: "growth_reward_schemas", full: "griya_company.growth_reward_schemas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"sales_scheme_id",type:"int",pk:false,fk:true}, {name:"amount",type:"decimal",pk:false,fk:false}, {name:"closing_max",type:"int",pk:false,fk:false}, {name:"is_active",type:"tinyint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sales_scheme_id"] },
      { name: "kategori_customer_terminates", full: "griya_company.kategori_customer_terminates", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"kategori",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
    ] },
    { name: "griya_sales", peruntukan: ["Sistem SPVR", "Customer & Billing"], tables: [
      { name: "cold_prospects", full: "griya_sales.cold_prospects", attrs: [{name:"id_cold_prospect",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"input_by",type:"int",pk:false,fk:true}, {name:"own_by",type:"int",pk:false,fk:true}, {name:"lat_sales",type:"decimal",pk:false,fk:false}, {name:"lng_sales",type:"decimal",pk:false,fk:false}, {name:"history_status_id",type:"int",pk:false,fk:false}, {name:"status_id_now",type:"int",pk:false,fk:true}, {name:"status_id_awal",type:"int",pk:false,fk:true}, {name:"nama",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"alamat",type:"varchar",pk:false,fk:false}, {name:"rt",type:"varchar",pk:false,fk:false}, {name:"rw",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"is_lost",type:"tinyint",pk:false,fk:false}, {name:"have_formulir",type:"boolean",pk:false,fk:false}, {name:"created_at_lost_prospect",type:"timestamp",pk:false,fk:false}, {name:"flag_perfom_periode",type:"date",pk:false,fk:false}, {name:"flag_perfom_ke",type:"int",pk:false,fk:false}, {name:"flag_perfom_status",type:"int",pk:false,fk:false}, {name:"flag_perfom_created_at",type:"date",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "input_by", "own_by", "status_id_now", "status_id_awal"] },
      { name: "prospects", full: "griya_sales.prospects", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"cold_prospect_id",type:"int",pk:false,fk:true}, {name:"sales_nip_head",type:"int",pk:false,fk:true}, {name:"role",type:"varchar",pk:false,fk:false}, {name:"sales_nip",type:"int",pk:false,fk:true}, {name:"sales_phones_id",type:"int",pk:false,fk:true}, {name:"sales_nip_survey",type:"int",pk:false,fk:true}, {name:"type_customer",type:"int",pk:false,fk:false}, {name:"status_lokasi_id",type:"int",pk:false,fk:true}, {name:"migrasi_user",type:"boolean",pk:false,fk:false}, {name:"reason_use_id",type:"int",pk:false,fk:true}, {name:"nama",type:"varchar",pk:false,fk:false}, {name:"alamat",type:"varchar",pk:false,fk:false}, {name:"rt",type:"varchar",pk:false,fk:false}, {name:"rw",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"service_packages_id",type:"varchar",pk:false,fk:true}, {name:"metodes_id",type:"varchar",pk:false,fk:true}, {name:"input_by",type:"varchar",pk:false,fk:false}, {name:"input_sales_nip",type:"int",pk:false,fk:false}, {name:"status_awal",type:"varchar",pk:false,fk:false}, {name:"status_akhir",type:"varchar",pk:false,fk:false}, {name:"status_proggres",type:"varchar",pk:false,fk:false}, {name:"m_type",type:"varchar",pk:false,fk:false}, {name:"m_no",type:"varchar",pk:false,fk:false}, {name:"m_jln",type:"varchar",pk:false,fk:false}, {name:"m_kel",type:"varchar",pk:false,fk:false}, {name:"m_kec",type:"varchar",pk:false,fk:false}, {name:"m_kota",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"coverage_areas_id",type:"varchar",pk:false,fk:true}, {name:"url_ktp",type:"varchar",pk:false,fk:false}, {name:"url_home",type:"varchar",pk:false,fk:false}, {name:"url_modem",type:"varchar",pk:false,fk:false}, {name:"spliter_id",type:"varchar",pk:false,fk:true}, {name:"cashback_receiver_id",type:"int",pk:false,fk:false}, {name:"status_cashback",type:"varchar",pk:false,fk:false}, {name:"invalid_reason",type:"text",pk:false,fk:false}, {name:"is_uncover",type:"boolean",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "cold_prospect_id", "sales_nip", "sales_nip_head", "sales_nip_survey", "sales_phones_id", "service_packages_id", "metodes_id", "reason_use_id", "status_lokasi_id", "coverage_areas_id", "spliter_id"] },
      { name: "ddl_status", full: "griya_sales.ddl_status", attrs: [{name:"id_status",type:"int",pk:true,fk:false}, {name:"nama_status",type:"varchar",pk:false,fk:false}, {name:"is_ddl",type:"boolean",pk:false,fk:false}, {name:"is_ddl_sales",type:"boolean",pk:false,fk:false}], fkCols: [] },
      { name: "history_status", full: "griya_sales.history_status", attrs: [{name:"id_history_status",type:"int",pk:true,fk:false}, {name:"cold_prospect_id",type:"int",pk:false,fk:true}, {name:"status_id",type:"int",pk:false,fk:true}, {name:"status_ke",type:"int",pk:false,fk:false}, {name:"follow_up_ke",type:"int",pk:false,fk:false}, {name:"message_send",type:"timestamp",pk:false,fk:false}, {name:"message_read",type:"timestamp",pk:false,fk:false}, {name:"message_replay",type:"timestamp",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["cold_prospect_id", "status_id"] },
      { name: "history_messages", full: "griya_sales.history_messages", attrs: [{name:"id_history_message",type:"int",pk:true,fk:false}, {name:"history_status_id",type:"int",pk:false,fk:true}, {name:"from_me",type:"boolean",pk:false,fk:false}, {name:"message",type:"text",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["history_status_id"] },
      { name: "template_follow_ups", full: "griya_sales.template_follow_ups", attrs: [{name:"id_follow_up",type:"int",pk:true,fk:false}, {name:"status_id",type:"int",pk:false,fk:true}, {name:"no_follow_ups",type:"int",pk:false,fk:false}, {name:"keterangan",type:"varchar",pk:false,fk:false}, {name:"message",type:"text",pk:false,fk:false}], fkCols: ["status_id"] },
      { name: "formulir_urls", full: "griya_sales.formulir_urls", attrs: [{name:"id_formulir_url",type:"char",pk:true,fk:false}, {name:"cold_prospect_id",type:"int",pk:false,fk:true}], fkCols: ["cold_prospect_id"] },
      { name: "history_formulirs", full: "griya_sales.history_formulirs", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"url_id",type:"char",pk:false,fk:true}, {name:"nama",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"ip_address",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"is_complete",type:"boolean",pk:false,fk:false}, {name:"no_tlp_use_source",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["url_id"] },
      { name: "formulirs_one_steps", full: "griya_sales.formulirs_one_steps", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"is_used_before",type:"boolean",pk:false,fk:false}, {name:"prospect_id",type:"int",pk:false,fk:true}, {name:"nama_step_one",type:"varchar",pk:false,fk:false}, {name:"ip_address",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["prospect_id"] },
      { name: "sales_phones", full: "griya_sales.sales_phones", attrs: [{name:"id_sales_phones",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"provider",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"sales_nip",type:"int",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "sales_nip"] },
      { name: "metodes", full: "griya_sales.metodes", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"metode",type:"varchar",pk:false,fk:false}, {name:"used",type:"boolean",pk:false,fk:false}, {name:"formulir",type:"boolean",pk:false,fk:false}, {name:"sales",type:"boolean",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "providers", full: "griya_sales.providers", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"provider",type:"varchar",pk:false,fk:false}], fkCols: [] },
      { name: "reason_uses", full: "griya_sales.reason_uses", attrs: [{name:"id_reason_use",type:"int",pk:true,fk:false}, {name:"alasan",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "status_lokasi_dipasangs", full: "griya_sales.status_lokasi_dipasangs", attrs: [{name:"id_status_lokasi_dipasang",type:"int",pk:true,fk:false}, {name:"nama_status",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "cold_prospects_charts", full: "griya_sales.cold_prospects_charts", attrs: [{name:"id_cold_prospect_chart",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"branch_name",type:"varchar",pk:false,fk:false}, {name:"karyawan_nip",type:"int",pk:false,fk:true}, {name:"periode_date",type:"date",pk:false,fk:false}, {name:"periode",type:"varchar",pk:false,fk:false}, {name:"rekap_pagi",type:"int",pk:false,fk:false}, {name:"rekap_malam",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "karyawan_nip"] },
    ] },
    { name: "griya_coverage", peruntukan: ["Coverage & Infra", "Operasional Lapangan"], tables: [
      { name: "routers", full: "griya_coverage.routers", attrs: [{name:"id_router",type:"int",pk:true,fk:false}, {name:"router_ke",type:"int",pk:false,fk:false}, {name:"lokasipop",type:"varchar",pk:false,fk:false}, {name:"ip_address",type:"varchar",pk:false,fk:false}, {name:"port_snmp_router",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "routers_vlans", full: "griya_coverage.routers_vlans", attrs: [{name:"id_router_vlan",type:"int",pk:true,fk:false}, {name:"router_id",type:"int",pk:false,fk:true}, {name:"pppoe_vlan_id",type:"int",pk:false,fk:false}, {name:"hotspot_vlan_id",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["router_id"] },
      { name: "olts", full: "griya_coverage.olts", attrs: [{name:"id_olt",type:"int",pk:true,fk:false}, {name:"olt_ke",type:"int",pk:false,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"router_id",type:"int",pk:false,fk:true}, {name:"type",type:"varchar",pk:false,fk:false}, {name:"host_backup",type:"varchar",pk:false,fk:false}, {name:"host_local_backup",type:"varchar",pk:false,fk:false}, {name:"port_snmp",type:"int",pk:false,fk:false}, {name:"port_telnet",type:"int",pk:false,fk:false}, {name:"community_ro",type:"varchar",pk:false,fk:false}, {name:"remote_vlan_id_backup",type:"int",pk:false,fk:false}, {name:"pppoe_vlan_id_backup",type:"int",pk:false,fk:false}, {name:"hotspot_vlan_id_backup",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["router_id", "branch_id"] },
      { name: "olts_ports", full: "griya_coverage.olts_ports", attrs: [{name:"id_olt_port",type:"int",pk:true,fk:false}, {name:"olt_id",type:"int",pk:false,fk:true}, {name:"router_id",type:"int",pk:false,fk:true}, {name:"router_vlan_id",type:"int",pk:false,fk:true}, {name:"slot_ke",type:"int",pk:false,fk:false}, {name:"port_ke",type:"int",pk:false,fk:false}, {name:"kode_olt",type:"int",pk:false,fk:false}, {name:"olt",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["olt_id", "router_id", "router_vlan_id"] },
      { name: "coverage_areas", full: "griya_coverage.coverage_areas", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"polygon",type:"json",pk:false,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"olt_id",type:"int",pk:false,fk:true}, {name:"olt_port_id",type:"int",pk:false,fk:true}, {name:"nama_area",type:"varchar",pk:false,fk:false}, {name:"kode_area",type:"varchar",pk:false,fk:false}, {name:"olt_backup",type:"varchar",pk:false,fk:false}, {name:"kode_olt_backup",type:"varchar",pk:false,fk:false}, {name:"open_area",type:"date",pk:false,fk:false}, {name:"penanggung_jawab",type:"varchar",pk:false,fk:false}, {name:"no_tlpn",type:"varchar",pk:false,fk:false}, {name:"file_proposal",type:"varchar",pk:false,fk:false}, {name:"file_bak",type:"varchar",pk:false,fk:false}, {name:"area_primary_id",type:"int",pk:false,fk:true}, {name:"old_name_area",type:"varchar",pk:false,fk:false}, {name:"is_primary",type:"boolean",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "olt_id", "olt_port_id", "area_primary_id"] },
      { name: "placements", full: "griya_coverage.placements", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"area_id",type:"int",pk:false,fk:true}, {name:"nama_tempat",type:"varchar",pk:false,fk:false}, {name:"tiang_id",type:"int",pk:false,fk:true}, {name:"jenis_tempat",type:"varchar",pk:false,fk:false}, {name:"alamat",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "area_id", "tiang_id"] },
      { name: "pole", full: "griya_coverage.pole", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"persediaan_id",type:"int",pk:false,fk:true}, {name:"ref",type:"varchar",pk:false,fk:false}, {name:"vendor",type:"varchar",pk:false,fk:false}, {name:"tinggi",type:"varchar",pk:false,fk:false}, {name:"ukuran",type:"varchar",pk:false,fk:false}, {name:"tebal",type:"varchar",pk:false,fk:false}, {name:"harga",type:"varchar",pk:false,fk:false}, {name:"nama_tiang",type:"varchar",pk:false,fk:false}, {name:"area_id",type:"varchar",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "persediaan_id", "area_id"] },
      { name: "spliters", full: "griya_coverage.spliters", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"coverage_areas_primary_id",type:"int",pk:false,fk:true}, {name:"coverage_areas_id",type:"varchar",pk:false,fk:true}, {name:"type_spliter",type:"varchar",pk:false,fk:false}, {name:"parent_id",type:"varchar",pk:false,fk:true}, {name:"area_ke",type:"int",pk:false,fk:false}, {name:"parent_ke",type:"varchar",pk:false,fk:false}, {name:"spliter_ke",type:"int",pk:false,fk:false}, {name:"jumlah_output",type:"int",pk:false,fk:false}, {name:"placement_id",type:"bigint",pk:false,fk:true}, {name:"is_ready",type:"boolean",pk:false,fk:false}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"family_status",type:"varchar",pk:false,fk:false}, {name:"parent_access_id",type:"int",pk:false,fk:false}, {name:"is_show",type:"tinyint",pk:false,fk:false}, {name:"status_route",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["coverage_areas_id", "coverage_areas_primary_id", "placement_id", "parent_id"] },
      { name: "spliters_dampings", full: "griya_coverage.spliters_dampings", attrs: [{name:"spliters_dampings_id",type:"int",pk:true,fk:false}, {name:"spliters_id",type:"int",pk:false,fk:true}, {name:"input",type:"float",pk:false,fk:false}, {name:"p1",type:"float",pk:false,fk:false}, {name:"p2",type:"float",pk:false,fk:false}, {name:"p3",type:"float",pk:false,fk:false}, {name:"p4",type:"float",pk:false,fk:false}, {name:"p5",type:"float",pk:false,fk:false}, {name:"p6",type:"float",pk:false,fk:false}, {name:"p7",type:"float",pk:false,fk:false}, {name:"p8",type:"float",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["spliters_id"] },
      { name: "spliters_route", full: "griya_coverage.spliters_route", attrs: [{name:"id_route",type:"int",pk:true,fk:false}, {name:"spliters_id",type:"int",pk:false,fk:true}, {name:"length",type:"varchar",pk:false,fk:false}, {name:"length_text",type:"varchar",pk:false,fk:false}, {name:"info",type:"varchar",pk:false,fk:false}, {name:"points",type:"json",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["spliters_id"] },
      { name: "splitter_documents", full: "griya_coverage.splitter_documents", attrs: [{name:"id_document",type:"int",pk:true,fk:false}, {name:"wo_id",type:"int",pk:false,fk:true}, {name:"port_ke",type:"int",pk:false,fk:false}, {name:"category",type:"varchar",pk:false,fk:false}, {name:"url",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["wo_id"] },
      { name: "splitter_installations", full: "griya_coverage.splitter_installations", attrs: [{name:"id_installation",type:"int",pk:true,fk:false}, {name:"wo_id",type:"int",pk:false,fk:true}, {name:"category",type:"varchar",pk:false,fk:false}, {name:"url",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["wo_id"] },
    ] },
    { name: "griya_customers", peruntukan: ["Customer & Billing", "Sistem SPVR"], tables: [
      { name: "customers", full: "griya_customers.customers", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"prospects_id",type:"int",pk:false,fk:true}, {name:"sales_nip_head",type:"int",pk:false,fk:true}, {name:"role",type:"varchar",pk:false,fk:false}, {name:"sales_nip",type:"int",pk:false,fk:true}, {name:"sales_phones_id",type:"int",pk:false,fk:true}, {name:"sales_nip_survey",type:"int",pk:false,fk:true}, {name:"type_customer",type:"int",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:false}, {name:"nama",type:"varchar",pk:false,fk:false}, {name:"no_tlp",type:"varchar",pk:false,fk:false}, {name:"resourcename",type:"varchar",pk:false,fk:false}, {name:"service_packages_id",type:"int",pk:false,fk:true}, {name:"coverage_areas_id",type:"int",pk:false,fk:true}, {name:"spliter_id",type:"int",pk:false,fk:true}, {name:"port_access",type:"int",pk:false,fk:false}, {name:"sn_modem",type:"varchar",pk:false,fk:false}, {name:"no_onu",type:"int",pk:false,fk:false}, {name:"pppoe_vlan_id",type:"int",pk:false,fk:false}, {name:"hotspot_vlan_id",type:"int",pk:false,fk:false}, {name:"olt_rx",type:"float",pk:false,fk:false}, {name:"onu_rx",type:"float",pk:false,fk:false}, {name:"va",type:"varchar",pk:false,fk:false}, {name:"subscribe_start",type:"date",pk:false,fk:false}, {name:"subscribe_expired",type:"date",pk:false,fk:false}, {name:"subscribe_status",type:"varchar",pk:false,fk:false}, {name:"cashback_receiver_id",type:"int",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "prospects_id", "service_packages_id", "coverage_areas_id", "spliter_id", "sales_nip", "sales_nip_head", "sales_nip_survey", "sales_phones_id", "cashback_receiver_id"] },
      { name: "customers_alamat_maps", full: "griya_customers.customers_alamat_maps", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"m_type",type:"varchar",pk:false,fk:false}, {name:"m_no",type:"varchar",pk:false,fk:false}, {name:"m_jln",type:"varchar",pk:false,fk:false}, {name:"m_kel",type:"varchar",pk:false,fk:false}, {name:"m_kec",type:"varchar",pk:false,fk:false}, {name:"m_kota",type:"varchar",pk:false,fk:false}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret"] },
      { name: "customers_alamat_terpasang", full: "griya_customers.customers_alamat_terpasang", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"alamat",type:"varchar",pk:false,fk:false}, {name:"rt",type:"varchar",pk:false,fk:false}, {name:"rw",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret"] },
      { name: "customers_places", full: "griya_customers.customers_places", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"prospect_id",type:"bigint",pk:false,fk:true}, {name:"length",type:"varchar",pk:false,fk:false}, {name:"length_text",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["prospect_id"] },
      { name: "customers_points", full: "griya_customers.customers_points", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"place_id",type:"bigint",pk:false,fk:true}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["place_id"] },
      { name: "customer_document_details", full: "griya_customers.customer_document_details", attrs: [{name:"id_detail_dokumen",type:"int",pk:true,fk:false}, {name:"customer_id",type:"int",pk:false,fk:true}, {name:"url",type:"varchar",pk:false,fk:false}, {name:"category",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["customer_id"] },
      { name: "customer_banks", full: "griya_customers.customer_banks", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"customer_id",type:"int",pk:false,fk:true}, {name:"inactived_by",type:"int",pk:false,fk:true}, {name:"input_by",type:"int",pk:false,fk:true}, {name:"inquiry_key",type:"text",pk:false,fk:false}, {name:"bank_code",type:"varchar",pk:false,fk:false}, {name:"bank_name",type:"varchar",pk:false,fk:false}, {name:"fee_transfer",type:"double",pk:false,fk:false}, {name:"account_holder",type:"varchar",pk:false,fk:false}, {name:"account_number",type:"varchar",pk:false,fk:false}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"account_status",type:"varchar",pk:false,fk:false}, {name:"is_blocked",type:"boolean",pk:false,fk:false}, {name:"approve_datetime",type:"timestamp",pk:false,fk:false}, {name:"inactive_reason",type:"varchar",pk:false,fk:false}, {name:"inactive_datetime",type:"varchar",pk:false,fk:false}, {name:"last_chat_datetime",type:"timestamp",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["customer_id", "input_by", "inactived_by"] },
      { name: "customers_terminates", full: "griya_customers.customers_terminates", attrs: [{name:"id_terminate",type:"int",pk:true,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"status_berlangganan",type:"varchar",pk:false,fk:false}, {name:"spliter_id",type:"int",pk:false,fk:true}, {name:"port_access",type:"int",pk:false,fk:false}, {name:"no_onu",type:"int",pk:false,fk:false}, {name:"path_bukti_chat",type:"varchar",pk:false,fk:false}, {name:"date_terminate",type:"date",pk:false,fk:false}, {name:"kategori_id",type:"varchar",pk:false,fk:true}, {name:"keterangan",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret", "spliter_id", "kategori_id"] },
      { name: "customer_aktifs", full: "griya_customers.customer_aktifs", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"total_customer",type:"int",pk:false,fk:false}, {name:"periode",type:"date",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "history_customer_isolirs", full: "griya_customers.history_customer_isolirs", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"personal_id",type:"int",pk:false,fk:true}, {name:"date_isolir",type:"date",pk:false,fk:false}, {name:"time",type:"time",pk:false,fk:false}, {name:"is_isolir",type:"boolean",pk:false,fk:false}, {name:"is_hm2_msg",type:"boolean",pk:false,fk:false}, {name:"is_hm0_msg",type:"boolean",pk:false,fk:false}, {name:"is_hp7_msg",type:"boolean",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["personal_id"] },
      { name: "history_layanans", full: "griya_customers.history_layanans", attrs: [{name:"id_history_layanans",type:"int",pk:true,fk:false}, {name:"va",type:"varchar",pk:false,fk:true}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"subscribe_expired",type:"date",pk:false,fk:false}, {name:"from_pakets_id",type:"int",pk:false,fk:true}, {name:"to_pakets_id",type:"int",pk:false,fk:true}, {name:"is_apply",type:"boolean",pk:false,fk:false}, {name:"apply_time",type:"timestamp",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["va", "from_pakets_id", "to_pakets_id"] },
      { name: "history_paids", full: "griya_customers.history_paids", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"trx_id",type:"varchar",pk:false,fk:false}, {name:"merchant_id",type:"varchar",pk:false,fk:false}, {name:"merchant",type:"varchar",pk:false,fk:false}, {name:"chanel",type:"varchar",pk:false,fk:false}, {name:"va",type:"varchar",pk:false,fk:true}, {name:"payment_reff",type:"varchar",pk:false,fk:false}, {name:"payment_date",type:"datetime",pk:false,fk:false}, {name:"payment_status_code",type:"varchar",pk:false,fk:false}, {name:"payment_status_desc",type:"varchar",pk:false,fk:false}, {name:"bill_total",type:"varchar",pk:false,fk:false}, {name:"payment_total",type:"varchar",pk:false,fk:false}, {name:"payment_channel_uid",type:"varchar",pk:false,fk:false}, {name:"payment_channel",type:"varchar",pk:false,fk:false}, {name:"signature",type:"varchar",pk:false,fk:false}, {name:"subscribe_status",type:"varchar",pk:false,fk:false}, {name:"messages_id",type:"int",pk:false,fk:true}, {name:"diffBayar",type:"smallint",pk:false,fk:false}, {name:"kirim_accounting",type:"boolean",pk:false,fk:false}, {name:"kirim_accounting_griya",type:"boolean",pk:false,fk:false}, {name:"kirim_wa",type:"boolean",pk:false,fk:false}, {name:"hidupkan_radius",type:"boolean",pk:false,fk:false}, {name:"tipe_transaksi",type:"varchar",pk:false,fk:false}, {name:"exp_date",type:"date",pk:false,fk:false}, {name:"tgl_jatuh_tempo_sebelumnya",type:"date",pk:false,fk:false}, {name:"tgl_jatuh_tempo_selanjutnya",type:"date",pk:false,fk:false}, {name:"nominal_discount",type:"int",pk:false,fk:false}, {name:"slug_paket",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}], fkCols: ["va", "messages_id"] },
      { name: "recurring_billings", full: "griya_customers.recurring_billings", attrs: [{name:"id_recurring_billing",type:"int",pk:true,fk:false}, {name:"va",type:"varchar",pk:false,fk:true}, {name:"service_packages_id",type:"int",pk:false,fk:true}, {name:"subscribe_status",type:"varchar",pk:false,fk:false}, {name:"exp_date",type:"date",pk:false,fk:false}, {name:"amount",type:"double",pk:false,fk:false}, {name:"terbayar",type:"tinyint",pk:false,fk:false}, {name:"history_paids_id",type:"int",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"modified",type:"datetime",pk:false,fk:false}], fkCols: ["va", "service_packages_id", "history_paids_id"] },
      { name: "recuiring_billings_errors", full: "griya_customers.recuiring_billings_errors", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"history_paids_id",type:"int",pk:false,fk:true}, {name:"keterangan",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}], fkCols: ["history_paids_id"] },
      { name: "messages", full: "griya_customers.messages", attrs: [{name:"id_messages",type:"int",pk:true,fk:false}, {name:"error",type:"tinyint",pk:false,fk:false}, {name:"error_tmstamp",type:"timestamp",pk:false,fk:false}, {name:"status_pesan",type:"varchar",pk:false,fk:false}, {name:"subscribe_expired_messages",type:"date",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"terbayar",type:"boolean",pk:false,fk:false}, {name:"pesan_terkirim",type:"boolean",pk:false,fk:false}, {name:"pesan_terkirim_tmstamp",type:"timestamp",pk:false,fk:false}, {name:"radius_off",type:"boolean",pk:false,fk:false}, {name:"radius_off_tmstamp",type:"timestamp",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret"] },
      { name: "messages_error_logs", full: "griya_customers.messages_error_logs", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"pos",type:"varchar",pk:false,fk:false}, {name:"couse",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "modem_replaces", full: "griya_customers.modem_replaces", attrs: [{name:"id_modem_replace",type:"int",pk:true,fk:false}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"status_progress",type:"varchar",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"sn_lama",type:"varchar",pk:false,fk:false}, {name:"sn_baru",type:"varchar",pk:false,fk:false}, {name:"keterangan",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret"] },
    ] },
    { name: "griya_oprasional", peruntukan: ["Operasional Lapangan", "Coverage & Infra"], tables: [
      { name: "psb_work_orders", full: "griya_oprasional.psb_work_orders", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"status_wo",type:"varchar",pk:false,fk:false}, {name:"status_proggres",type:"varchar",pk:false,fk:false}, {name:"is_active",type:"boolean",pk:false,fk:false}, {name:"is_regist",type:"boolean",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"team_id",type:"int",pk:false,fk:true}, {name:"katim_nip",type:"int",pk:false,fk:true}, {name:"helper_primary_nip",type:"int",pk:false,fk:true}, {name:"helper_secondary_nip",type:"int",pk:false,fk:true}, {name:"tgl_jadwal",type:"date",pk:false,fk:false}, {name:"phase",type:"int",pk:false,fk:false}, {name:"start",type:"datetime",pk:false,fk:false}, {name:"end",type:"datetime",pk:false,fk:false}, {name:"total_waktu_penarikan",type:"smallint",pk:false,fk:false}, {name:"status_kabel",type:"varchar",pk:false,fk:false}, {name:"kabel_history_id",type:"int",pk:false,fk:true}, {name:"kabel_detail_history_id",type:"int",pk:false,fk:true}, {name:"start_dropcore",type:"smallint",pk:false,fk:false}, {name:"end_dropcore",type:"smallint",pk:false,fk:false}, {name:"total_dropcore",type:"smallint",pk:false,fk:false}, {name:"lepas_port",type:"boolean",pk:false,fk:false}, {name:"pppoe_secret_cabut",type:"varchar",pk:false,fk:false}, {name:"is_abnormal",type:"boolean",pk:false,fk:false}, {name:"is_abnormal_modem",type:"boolean",pk:false,fk:false}, {name:"keterangan_abnormal_modem",type:"varchar",pk:false,fk:false}, {name:"kategori_abnormal_durasi",type:"text",pk:false,fk:false}, {name:"keterangan_abnormal_durasi",type:"text",pk:false,fk:false}, {name:"kategori_abnormal_jalur",type:"text",pk:false,fk:false}, {name:"keterangan_abnormal_jalur",type:"text",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "pppoe_secret", "team_id", "katim_nip", "helper_primary_nip", "helper_secondary_nip", "kabel_history_id", "kabel_detail_history_id"] },
      { name: "distri_work_orders", full: "griya_oprasional.distri_work_orders", attrs: [{name:"distri_work_orders_id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"spliters_id",type:"int",pk:false,fk:true}, {name:"req_by",type:"varchar",pk:false,fk:false}, {name:"proggress",type:"varchar",pk:false,fk:false}, {name:"status_akhir",type:"varchar",pk:false,fk:false}, {name:"team_id",type:"int",pk:false,fk:true}, {name:"katim_id",type:"int",pk:false,fk:true}, {name:"tgl_jadwal",type:"date",pk:false,fk:false}, {name:"phase",type:"int",pk:false,fk:false}, {name:"start",type:"datetime",pk:false,fk:false}, {name:"end",type:"datetime",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "spliters_id", "team_id", "katim_id"] },
      { name: "distri_spliters_route", full: "griya_oprasional.distri_spliters_route", attrs: [{name:"id_route",type:"int",pk:true,fk:false}, {name:"spliters_id",type:"int",pk:false,fk:true}, {name:"length",type:"varchar",pk:false,fk:false}, {name:"length_text",type:"varchar",pk:false,fk:false}, {name:"info",type:"varchar",pk:false,fk:false}, {name:"points",type:"json",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["spliters_id"] },
      { name: "technician_teams", full: "griya_oprasional.technician_teams", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_company_id",type:"int",pk:false,fk:true}, {name:"nama_team",type:"varchar",pk:false,fk:false}, {name:"kategori_team",type:"varchar",pk:false,fk:false}, {name:"leader_nip",type:"int",pk:false,fk:true}, {name:"support_a",type:"int",pk:false,fk:true}, {name:"support_b",type:"int",pk:false,fk:true}, {name:"is_active",type:"boolean",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_company_id", "leader_nip", "support_a", "support_b"] },
      { name: "wo_dismantles", full: "griya_oprasional.wo_dismantles", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"sales_nip",type:"bigint",pk:false,fk:true}, {name:"assign_by",type:"bigint",pk:false,fk:true}, {name:"verification_by",type:"bigint",pk:false,fk:true}, {name:"wo_dismantle_number",type:"varchar",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"chance_ae",type:"int",pk:false,fk:false}, {name:"accuracy_ae",type:"varchar",pk:false,fk:false}, {name:"wo_dismantle_date",type:"date",pk:false,fk:false}, {name:"wo_suggest_time",type:"time",pk:false,fk:false}, {name:"wo_close_date",type:"date",pk:false,fk:false}, {name:"wo_reschedule_date",type:"date",pk:false,fk:false}, {name:"wo_reschedule_reason",type:"text",pk:false,fk:false}, {name:"wo_reschedule_proof_path",type:"varchar",pk:false,fk:false}, {name:"result_wo_dismantle",type:"varchar",pk:false,fk:false}, {name:"decision_wo_dismantle",type:"varchar",pk:false,fk:false}, {name:"status_wo_dismantle",type:"varchar",pk:false,fk:false}, {name:"wo_information",type:"text",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret", "sales_nip", "assign_by", "verification_by"] },
      { name: "wo_dismantle_documents", full: "griya_oprasional.wo_dismantle_documents", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"wo_dismantle_number",type:"varchar",pk:false,fk:true}, {name:"path",type:"varchar",pk:false,fk:false}, {name:"type",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["wo_dismantle_number"] },
      { name: "wo_dismantle_logs", full: "griya_oprasional.wo_dismantle_logs", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"wo_dismantle_number",type:"varchar",pk:false,fk:true}, {name:"old_status",type:"varchar",pk:false,fk:false}, {name:"new_status",type:"varchar",pk:false,fk:false}, {name:"created_log",type:"datetime",pk:false,fk:false}, {name:"change_by",type:"bigint",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["wo_dismantle_number", "change_by"] },
      { name: "wo_terminates", full: "griya_oprasional.wo_terminates", attrs: [{name:"id",type:"bigint",pk:true,fk:false}, {name:"created_by",type:"bigint",pk:false,fk:true}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"sn_modem",type:"varchar",pk:false,fk:true}, {name:"suggest_date",type:"date",pk:false,fk:false}, {name:"suggest_time",type:"time",pk:false,fk:false}, {name:"completion_date",type:"date",pk:false,fk:false}, {name:"decision_wo_terminate",type:"varchar",pk:false,fk:false}, {name:"status_wo_terminate",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["pppoe_secret", "sn_modem", "created_by"] },
      { name: "prospects_places", full: "griya_oprasional.prospects_places", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"prospect_id",type:"bigint",pk:false,fk:true}, {name:"length",type:"varchar",pk:false,fk:false}, {name:"length_text",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["prospect_id"] },
      { name: "prospects_points", full: "griya_oprasional.prospects_points", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"place_id",type:"bigint",pk:false,fk:true}, {name:"lat",type:"varchar",pk:false,fk:false}, {name:"lng",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["place_id"] },
      { name: "splitter_requests", full: "griya_oprasional.splitter_requests", attrs: [{name:"id_splitter_request",type:"int",pk:true,fk:false}, {name:"warning_type",type:"varchar",pk:false,fk:false}, {name:"splitter_id",type:"int",pk:false,fk:true}, {name:"prospect_id",type:"int",pk:false,fk:true}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["splitter_id", "prospect_id"] },
    ] },
    { name: "griya_warehouse", peruntukan: ["Warehouse & Logistik", "Operasional Lapangan"], tables: [
      { name: "persediaans", full: "griya_warehouse.persediaans", attrs: [{name:"id_persediaan",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"reff",type:"varchar",pk:false,fk:false}, {name:"jenis",type:"varchar",pk:false,fk:false}, {name:"merek",type:"varchar",pk:false,fk:false}, {name:"type",type:"varchar",pk:false,fk:false}, {name:"spesifikasi",type:"varchar",pk:false,fk:false}, {name:"total_harga",type:"int",pk:false,fk:false}, {name:"banyaknya",type:"mediumint",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id"] },
      { name: "kabels", full: "griya_warehouse.kabels", attrs: [{name:"id_kabel",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"persediaan_id",type:"int",pk:false,fk:true}, {name:"no_urut",type:"int",pk:false,fk:false}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"panjang_kabel",type:"mediumint",pk:false,fk:false}, {name:"start",type:"smallint",pk:false,fk:false}, {name:"end",type:"mediumint",pk:false,fk:false}, {name:"harga_per_hasbel",type:"varchar",pk:false,fk:false}, {name:"harga_per_meter",type:"varchar",pk:false,fk:false}, {name:"date_start",type:"datetime",pk:false,fk:false}, {name:"date_end",type:"datetime",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "persediaan_id"] },
      { name: "kabel_historys", full: "griya_warehouse.kabel_historys", attrs: [{name:"id_kabel_history",type:"int",pk:true,fk:false}, {name:"kabel_id",type:"int",pk:false,fk:true}, {name:"type_transaksi",type:"varchar",pk:false,fk:false}, {name:"is_active",type:"boolean",pk:false,fk:false}, {name:"is_wo_active",type:"boolean",pk:false,fk:false}, {name:"panjang_kabel_h",type:"int",pk:false,fk:false}, {name:"start_h",type:"int",pk:false,fk:false}, {name:"end_h",type:"int",pk:false,fk:false}, {name:"keterangan",type:"varchar",pk:false,fk:false}, {name:"karyawan_nip",type:"bigint",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["kabel_id", "karyawan_nip"] },
      { name: "kabel_history_details", full: "griya_warehouse.kabel_history_details", attrs: [{name:"id_kabel_detail_history",type:"int",pk:true,fk:false}, {name:"history_kabel_id",type:"int",pk:false,fk:true}, {name:"status_pemakaian",type:"varchar",pk:false,fk:false}, {name:"start_d",type:"int",pk:false,fk:false}, {name:"end_d",type:"int",pk:false,fk:false}, {name:"is_kabel_sisa",type:"tinyint",pk:false,fk:false}, {name:"karyawan_nip_use_kabel_sisa",type:"varchar",pk:false,fk:false}, {name:"is_printed",type:"tinyint",pk:false,fk:false}, {name:"panjang_terpakai",type:"int",pk:false,fk:false}, {name:"panjang_tidak_terpakai",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["history_kabel_id"] },
      { name: "cable_brands", full: "griya_warehouse.cable_brands", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"nama_brand",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
      { name: "modems", full: "griya_warehouse.modems", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"return_batch_id",type:"int",pk:false,fk:true}, {name:"persediaan_id",type:"int",pk:false,fk:true}, {name:"ref",type:"varchar",pk:false,fk:false}, {name:"supplier",type:"varchar",pk:false,fk:false}, {name:"brand",type:"varchar",pk:false,fk:false}, {name:"type",type:"varchar",pk:false,fk:false}, {name:"connector",type:"varchar",pk:false,fk:false}, {name:"sn",type:"varchar",pk:false,fk:false}, {name:"harga",type:"int",pk:false,fk:false}, {name:"tanggal_belanja",type:"date",pk:false,fk:false}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"action_modem_date",type:"date",pk:false,fk:false}, {name:"scanned_modem_date",type:"date",pk:false,fk:false}, {name:"deleted_at",type:"timestamp",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "persediaan_id", "return_batch_id", "pppoe_secret"] },
      { name: "modems_historys", full: "griya_warehouse.modems_historys", attrs: [{name:"id_modem_history",type:"int",pk:true,fk:false}, {name:"sn_modem",type:"varchar",pk:false,fk:true}, {name:"pppoe_secret",type:"varchar",pk:false,fk:true}, {name:"start_using",type:"date",pk:false,fk:false}, {name:"end_using",type:"date",pk:false,fk:false}, {name:"couse_stop",type:"varchar",pk:false,fk:false}, {name:"modem_replace_id",type:"varchar",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["sn_modem", "pppoe_secret", "modem_replace_id"] },
      { name: "modem_return_batches", full: "griya_warehouse.modem_return_batches", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"batch_code",type:"varchar",pk:false,fk:false}, {name:"branch_id",type:"int",pk:false,fk:true}, {name:"batch_date",type:"date",pk:false,fk:false}, {name:"total_terminate",type:"int",pk:false,fk:false}, {name:"total_replace",type:"int",pk:false,fk:false}, {name:"total_lost",type:"int",pk:false,fk:false}, {name:"total",type:"int",pk:false,fk:false}, {name:"created_by",type:"int",pk:false,fk:true}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["branch_id", "created_by"] },
      { name: "modem_return_batch_details", full: "griya_warehouse.modem_return_batch_details", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"batch_id",type:"int",pk:false,fk:true}, {name:"sn_modem",type:"char",pk:false,fk:true}, {name:"status_before",type:"char",pk:false,fk:false}, {name:"status_after",type:"char",pk:false,fk:false}, {name:"scan_type",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["batch_id", "sn_modem"] },
      { name: "modem_must_return", full: "griya_warehouse.modem_must_return", attrs: [{name:"id",type:"int",pk:true,fk:false}, {name:"batch_must_id",type:"int",pk:false,fk:true}, {name:"batch_now_id",type:"int",pk:false,fk:true}, {name:"sn_modem",type:"varchar",pk:false,fk:true}, {name:"status",type:"varchar",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: ["batch_must_id", "batch_now_id", "sn_modem"] },
      { name: "qc_belanja", full: "griya_warehouse.qc_belanja", attrs: [{name:"id_qc_belanja",type:"int",pk:true,fk:false}, {name:"nama_vendor",type:"int",pk:false,fk:false}, {name:"created_at",type:"timestamp",pk:false,fk:false}, {name:"updated_at",type:"timestamp",pk:false,fk:false}], fkCols: [] },
    ] },
  ]
};
const DB_STATS = { dbs: 6, tables: 77, attrs: 810, fks: 145 };

const DB_REFS = [
  {
    "from": "griya_company.users.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_company.users",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_company.users.division_id",
    "to": "griya_company.divisions.id",
    "srcDbTbl": "griya_company.users",
    "srcCol": "division_id",
    "dstDbTbl": "griya_company.divisions",
    "dstCol": "id"
  },
  {
    "from": "griya_company.users.sales_salary_schema_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.users",
    "srcCol": "sales_salary_schema_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_company.sales_salary_schema_assignments.sales_salary_schema_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.sales_salary_schema_assignments",
    "srcCol": "sales_salary_schema_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_company.sales_salary_schema_assignments.sales_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_company.sales_salary_schema_assignments",
    "srcCol": "sales_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_company.tier_schemas.sales_scheme_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.tier_schemas",
    "srcCol": "sales_scheme_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_company.cashback_schemas.sales_scheme_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.cashback_schemas",
    "srcCol": "sales_scheme_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_company.performance_schemas.sales_scheme_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.performance_schemas",
    "srcCol": "sales_scheme_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_company.growth_reward_schemas.sales_scheme_id",
    "to": "griya_company.sales_salary_schemas.id",
    "srcDbTbl": "griya_company.growth_reward_schemas",
    "srcCol": "sales_scheme_id",
    "dstDbTbl": "griya_company.sales_salary_schemas",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_sales.cold_prospects",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects.input_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_sales.cold_prospects",
    "srcCol": "input_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects.own_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_sales.cold_prospects",
    "srcCol": "own_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects.status_id_now",
    "to": "griya_sales.ddl_status.id_status",
    "srcDbTbl": "griya_sales.cold_prospects",
    "srcCol": "status_id_now",
    "dstDbTbl": "griya_sales.ddl_status",
    "dstCol": "id_status"
  },
  {
    "from": "griya_sales.cold_prospects.status_id_awal",
    "to": "griya_sales.ddl_status.id_status",
    "srcDbTbl": "griya_sales.cold_prospects",
    "srcCol": "status_id_awal",
    "dstDbTbl": "griya_sales.ddl_status",
    "dstCol": "id_status"
  },
  {
    "from": "griya_sales.history_status.cold_prospect_id",
    "to": "griya_sales.cold_prospects.id_cold_prospect",
    "srcDbTbl": "griya_sales.history_status",
    "srcCol": "cold_prospect_id",
    "dstDbTbl": "griya_sales.cold_prospects",
    "dstCol": "id_cold_prospect"
  },
  {
    "from": "griya_sales.history_status.status_id",
    "to": "griya_sales.ddl_status.id_status",
    "srcDbTbl": "griya_sales.history_status",
    "srcCol": "status_id",
    "dstDbTbl": "griya_sales.ddl_status",
    "dstCol": "id_status"
  },
  {
    "from": "griya_sales.history_messages.history_status_id",
    "to": "griya_sales.history_status.id_history_status",
    "srcDbTbl": "griya_sales.history_messages",
    "srcCol": "history_status_id",
    "dstDbTbl": "griya_sales.history_status",
    "dstCol": "id_history_status"
  },
  {
    "from": "griya_sales.template_follow_ups.status_id",
    "to": "griya_sales.ddl_status.id_status",
    "srcDbTbl": "griya_sales.template_follow_ups",
    "srcCol": "status_id",
    "dstDbTbl": "griya_sales.ddl_status",
    "dstCol": "id_status"
  },
  {
    "from": "griya_sales.formulir_urls.cold_prospect_id",
    "to": "griya_sales.cold_prospects.id_cold_prospect",
    "srcDbTbl": "griya_sales.formulir_urls",
    "srcCol": "cold_prospect_id",
    "dstDbTbl": "griya_sales.cold_prospects",
    "dstCol": "id_cold_prospect"
  },
  {
    "from": "griya_sales.history_formulirs.url_id",
    "to": "griya_sales.formulir_urls.id_formulir_url",
    "srcDbTbl": "griya_sales.history_formulirs",
    "srcCol": "url_id",
    "dstDbTbl": "griya_sales.formulir_urls",
    "dstCol": "id_formulir_url"
  },
  {
    "from": "griya_sales.formulirs_one_steps.prospect_id",
    "to": "griya_sales.prospects.id",
    "srcDbTbl": "griya_sales.formulirs_one_steps",
    "srcCol": "prospect_id",
    "dstDbTbl": "griya_sales.prospects",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects_charts.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_sales.cold_prospects_charts",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.cold_prospects_charts.karyawan_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_sales.cold_prospects_charts",
    "srcCol": "karyawan_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_sales.sales_phones.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_sales.sales_phones",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.sales_phones.sales_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_sales.sales_phones",
    "srcCol": "sales_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_sales.prospects.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.prospects.cold_prospect_id",
    "to": "griya_sales.cold_prospects.id_cold_prospect",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "cold_prospect_id",
    "dstDbTbl": "griya_sales.cold_prospects",
    "dstCol": "id_cold_prospect"
  },
  {
    "from": "griya_sales.prospects.sales_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "sales_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_sales.prospects.sales_nip_head",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "sales_nip_head",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_sales.prospects.sales_nip_survey",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "sales_nip_survey",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_sales.prospects.sales_phones_id",
    "to": "griya_sales.sales_phones.id_sales_phones",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "sales_phones_id",
    "dstDbTbl": "griya_sales.sales_phones",
    "dstCol": "id_sales_phones"
  },
  {
    "from": "griya_sales.prospects.service_packages_id",
    "to": "griya_company.service_packages.id",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "service_packages_id",
    "dstDbTbl": "griya_company.service_packages",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.prospects.metodes_id",
    "to": "griya_sales.metodes.id",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "metodes_id",
    "dstDbTbl": "griya_sales.metodes",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.prospects.reason_use_id",
    "to": "griya_sales.reason_uses.id_reason_use",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "reason_use_id",
    "dstDbTbl": "griya_sales.reason_uses",
    "dstCol": "id_reason_use"
  },
  {
    "from": "griya_sales.prospects.status_lokasi_id",
    "to": "griya_sales.status_lokasi_dipasangs.id_status_lokasi_dipasang",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "status_lokasi_id",
    "dstDbTbl": "griya_sales.status_lokasi_dipasangs",
    "dstCol": "id_status_lokasi_dipasang"
  },
  {
    "from": "griya_sales.prospects.coverage_areas_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "coverage_areas_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_sales.prospects.spliter_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_sales.prospects",
    "srcCol": "spliter_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.prospects_places.prospect_id",
    "to": "griya_sales.prospects.id",
    "srcDbTbl": "griya_oprasional.prospects_places",
    "srcCol": "prospect_id",
    "dstDbTbl": "griya_sales.prospects",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.prospects_points.place_id",
    "to": "griya_oprasional.prospects_places.id",
    "srcDbTbl": "griya_oprasional.prospects_points",
    "srcCol": "place_id",
    "dstDbTbl": "griya_oprasional.prospects_places",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.routers_vlans.router_id",
    "to": "griya_coverage.routers.id_router",
    "srcDbTbl": "griya_coverage.routers_vlans",
    "srcCol": "router_id",
    "dstDbTbl": "griya_coverage.routers",
    "dstCol": "id_router"
  },
  {
    "from": "griya_coverage.olts.router_id",
    "to": "griya_coverage.routers.id_router",
    "srcDbTbl": "griya_coverage.olts",
    "srcCol": "router_id",
    "dstDbTbl": "griya_coverage.routers",
    "dstCol": "id_router"
  },
  {
    "from": "griya_coverage.olts.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_coverage.olts",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.olts_ports.olt_id",
    "to": "griya_coverage.olts.id_olt",
    "srcDbTbl": "griya_coverage.olts_ports",
    "srcCol": "olt_id",
    "dstDbTbl": "griya_coverage.olts",
    "dstCol": "id_olt"
  },
  {
    "from": "griya_coverage.olts_ports.router_id",
    "to": "griya_coverage.routers.id_router",
    "srcDbTbl": "griya_coverage.olts_ports",
    "srcCol": "router_id",
    "dstDbTbl": "griya_coverage.routers",
    "dstCol": "id_router"
  },
  {
    "from": "griya_coverage.olts_ports.router_vlan_id",
    "to": "griya_coverage.routers_vlans.id_router_vlan",
    "srcDbTbl": "griya_coverage.olts_ports",
    "srcCol": "router_vlan_id",
    "dstDbTbl": "griya_coverage.routers_vlans",
    "dstCol": "id_router_vlan"
  },
  {
    "from": "griya_coverage.coverage_areas.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_coverage.coverage_areas",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.coverage_areas.olt_id",
    "to": "griya_coverage.olts.id_olt",
    "srcDbTbl": "griya_coverage.coverage_areas",
    "srcCol": "olt_id",
    "dstDbTbl": "griya_coverage.olts",
    "dstCol": "id_olt"
  },
  {
    "from": "griya_coverage.coverage_areas.olt_port_id",
    "to": "griya_coverage.olts_ports.id_olt_port",
    "srcDbTbl": "griya_coverage.coverage_areas",
    "srcCol": "olt_port_id",
    "dstDbTbl": "griya_coverage.olts_ports",
    "dstCol": "id_olt_port"
  },
  {
    "from": "griya_coverage.coverage_areas.area_primary_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_coverage.coverage_areas",
    "srcCol": "area_primary_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.placements.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_coverage.placements",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.placements.area_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_coverage.placements",
    "srcCol": "area_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.placements.tiang_id",
    "to": "griya_coverage.pole.id",
    "srcDbTbl": "griya_coverage.placements",
    "srcCol": "tiang_id",
    "dstDbTbl": "griya_coverage.pole",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.pole.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_coverage.pole",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.pole.persediaan_id",
    "to": "griya_warehouse.persediaans.id_persediaan",
    "srcDbTbl": "griya_coverage.pole",
    "srcCol": "persediaan_id",
    "dstDbTbl": "griya_warehouse.persediaans",
    "dstCol": "id_persediaan"
  },
  {
    "from": "griya_coverage.pole.area_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_coverage.pole",
    "srcCol": "area_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters.coverage_areas_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_coverage.spliters",
    "srcCol": "coverage_areas_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters.coverage_areas_primary_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_coverage.spliters",
    "srcCol": "coverage_areas_primary_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters.placement_id",
    "to": "griya_coverage.placements.id",
    "srcDbTbl": "griya_coverage.spliters",
    "srcCol": "placement_id",
    "dstDbTbl": "griya_coverage.placements",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters.parent_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_coverage.spliters",
    "srcCol": "parent_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters_dampings.spliters_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_coverage.spliters_dampings",
    "srcCol": "spliters_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.spliters_route.spliters_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_coverage.spliters_route",
    "srcCol": "spliters_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_coverage.splitter_documents.wo_id",
    "to": "griya_oprasional.distri_work_orders.distri_work_orders_id",
    "srcDbTbl": "griya_coverage.splitter_documents",
    "srcCol": "wo_id",
    "dstDbTbl": "griya_oprasional.distri_work_orders",
    "dstCol": "distri_work_orders_id"
  },
  {
    "from": "griya_coverage.splitter_installations.wo_id",
    "to": "griya_oprasional.distri_work_orders.distri_work_orders_id",
    "srcDbTbl": "griya_coverage.splitter_installations",
    "srcCol": "wo_id",
    "dstDbTbl": "griya_oprasional.distri_work_orders",
    "dstCol": "distri_work_orders_id"
  },
  {
    "from": "griya_customers.customers.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers.prospects_id",
    "to": "griya_sales.prospects.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "prospects_id",
    "dstDbTbl": "griya_sales.prospects",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers.service_packages_id",
    "to": "griya_company.service_packages.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "service_packages_id",
    "dstDbTbl": "griya_company.service_packages",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers.coverage_areas_id",
    "to": "griya_coverage.coverage_areas.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "coverage_areas_id",
    "dstDbTbl": "griya_coverage.coverage_areas",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers.spliter_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "spliter_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers.sales_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "sales_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_customers.customers.sales_nip_head",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "sales_nip_head",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_customers.customers.sales_nip_survey",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "sales_nip_survey",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_customers.customers.sales_phones_id",
    "to": "griya_sales.sales_phones.id_sales_phones",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "sales_phones_id",
    "dstDbTbl": "griya_sales.sales_phones",
    "dstCol": "id_sales_phones"
  },
  {
    "from": "griya_customers.customers.cashback_receiver_id",
    "to": "griya_customers.customer_banks.id",
    "srcDbTbl": "griya_customers.customers",
    "srcCol": "cashback_receiver_id",
    "dstDbTbl": "griya_customers.customer_banks",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers_alamat_maps.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_customers.customers_alamat_maps",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_customers.customers_alamat_terpasang.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_customers.customers_alamat_terpasang",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_customers.customers_places.prospect_id",
    "to": "griya_sales.prospects.id",
    "srcDbTbl": "griya_customers.customers_places",
    "srcCol": "prospect_id",
    "dstDbTbl": "griya_sales.prospects",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers_points.place_id",
    "to": "griya_customers.customers_places.id",
    "srcDbTbl": "griya_customers.customers_points",
    "srcCol": "place_id",
    "dstDbTbl": "griya_customers.customers_places",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customer_document_details.customer_id",
    "to": "griya_customers.customers.id",
    "srcDbTbl": "griya_customers.customer_document_details",
    "srcCol": "customer_id",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customer_banks.customer_id",
    "to": "griya_customers.customers.id",
    "srcDbTbl": "griya_customers.customer_banks",
    "srcCol": "customer_id",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customer_banks.input_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_customers.customer_banks",
    "srcCol": "input_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customer_banks.inactived_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_customers.customer_banks",
    "srcCol": "inactived_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers_terminates.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_customers.customers_terminates",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_customers.customers_terminates.spliter_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_customers.customers_terminates",
    "srcCol": "spliter_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.customers_terminates.kategori_id",
    "to": "griya_company.kategori_customer_terminates.id",
    "srcDbTbl": "griya_customers.customers_terminates",
    "srcCol": "kategori_id",
    "dstDbTbl": "griya_company.kategori_customer_terminates",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.history_customer_isolirs.personal_id",
    "to": "griya_customers.customers.id",
    "srcDbTbl": "griya_customers.history_customer_isolirs",
    "srcCol": "personal_id",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.history_layanans.va",
    "to": "griya_customers.customers.va",
    "srcDbTbl": "griya_customers.history_layanans",
    "srcCol": "va",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "va"
  },
  {
    "from": "griya_customers.history_layanans.from_pakets_id",
    "to": "griya_company.service_packages.id",
    "srcDbTbl": "griya_customers.history_layanans",
    "srcCol": "from_pakets_id",
    "dstDbTbl": "griya_company.service_packages",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.history_layanans.to_pakets_id",
    "to": "griya_company.service_packages.id",
    "srcDbTbl": "griya_customers.history_layanans",
    "srcCol": "to_pakets_id",
    "dstDbTbl": "griya_company.service_packages",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.history_paids.va",
    "to": "griya_customers.customers.va",
    "srcDbTbl": "griya_customers.history_paids",
    "srcCol": "va",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "va"
  },
  {
    "from": "griya_customers.history_paids.messages_id",
    "to": "griya_customers.messages.id_messages",
    "srcDbTbl": "griya_customers.history_paids",
    "srcCol": "messages_id",
    "dstDbTbl": "griya_customers.messages",
    "dstCol": "id_messages"
  },
  {
    "from": "griya_customers.recurring_billings.va",
    "to": "griya_customers.customers.va",
    "srcDbTbl": "griya_customers.recurring_billings",
    "srcCol": "va",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "va"
  },
  {
    "from": "griya_customers.recurring_billings.service_packages_id",
    "to": "griya_company.service_packages.id",
    "srcDbTbl": "griya_customers.recurring_billings",
    "srcCol": "service_packages_id",
    "dstDbTbl": "griya_company.service_packages",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.recurring_billings.history_paids_id",
    "to": "griya_customers.history_paids.id",
    "srcDbTbl": "griya_customers.recurring_billings",
    "srcCol": "history_paids_id",
    "dstDbTbl": "griya_customers.history_paids",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.recuiring_billings_errors.history_paids_id",
    "to": "griya_customers.history_paids.id",
    "srcDbTbl": "griya_customers.recuiring_billings_errors",
    "srcCol": "history_paids_id",
    "dstDbTbl": "griya_customers.history_paids",
    "dstCol": "id"
  },
  {
    "from": "griya_customers.messages.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_customers.messages",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_customers.modem_replaces.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_customers.modem_replaces",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_oprasional.psb_work_orders.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.psb_work_orders.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_oprasional.psb_work_orders.team_id",
    "to": "griya_oprasional.technician_teams.id",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "team_id",
    "dstDbTbl": "griya_oprasional.technician_teams",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.psb_work_orders.katim_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "katim_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.psb_work_orders.helper_primary_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "helper_primary_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.psb_work_orders.helper_secondary_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "helper_secondary_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.psb_work_orders.kabel_history_id",
    "to": "griya_warehouse.kabel_historys.id_kabel_history",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "kabel_history_id",
    "dstDbTbl": "griya_warehouse.kabel_historys",
    "dstCol": "id_kabel_history"
  },
  {
    "from": "griya_oprasional.psb_work_orders.kabel_detail_history_id",
    "to": "griya_warehouse.kabel_history_details.id_kabel_detail_history",
    "srcDbTbl": "griya_oprasional.psb_work_orders",
    "srcCol": "kabel_detail_history_id",
    "dstDbTbl": "griya_warehouse.kabel_history_details",
    "dstCol": "id_kabel_detail_history"
  },
  {
    "from": "griya_oprasional.distri_work_orders.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_oprasional.distri_work_orders",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.distri_work_orders.spliters_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_oprasional.distri_work_orders",
    "srcCol": "spliters_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.distri_work_orders.team_id",
    "to": "griya_oprasional.technician_teams.id",
    "srcDbTbl": "griya_oprasional.distri_work_orders",
    "srcCol": "team_id",
    "dstDbTbl": "griya_oprasional.technician_teams",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.distri_work_orders.katim_id",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.distri_work_orders",
    "srcCol": "katim_id",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.distri_spliters_route.spliters_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_oprasional.distri_spliters_route",
    "srcCol": "spliters_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.technician_teams.branch_company_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_oprasional.technician_teams",
    "srcCol": "branch_company_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.technician_teams.leader_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.technician_teams",
    "srcCol": "leader_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.technician_teams.support_a",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.technician_teams",
    "srcCol": "support_a",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.technician_teams.support_b",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.technician_teams",
    "srcCol": "support_b",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.splitter_requests.splitter_id",
    "to": "griya_coverage.spliters.id",
    "srcDbTbl": "griya_oprasional.splitter_requests",
    "srcCol": "splitter_id",
    "dstDbTbl": "griya_coverage.spliters",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.splitter_requests.prospect_id",
    "to": "griya_sales.prospects.id",
    "srcDbTbl": "griya_oprasional.splitter_requests",
    "srcCol": "prospect_id",
    "dstDbTbl": "griya_sales.prospects",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.wo_dismantles.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_oprasional.wo_dismantles",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_oprasional.wo_dismantles.sales_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_oprasional.wo_dismantles",
    "srcCol": "sales_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_oprasional.wo_dismantles.assign_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_oprasional.wo_dismantles",
    "srcCol": "assign_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.wo_dismantles.verification_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_oprasional.wo_dismantles",
    "srcCol": "verification_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.wo_dismantle_documents.wo_dismantle_number",
    "to": "griya_oprasional.wo_dismantles.wo_dismantle_number",
    "srcDbTbl": "griya_oprasional.wo_dismantle_documents",
    "srcCol": "wo_dismantle_number",
    "dstDbTbl": "griya_oprasional.wo_dismantles",
    "dstCol": "wo_dismantle_number"
  },
  {
    "from": "griya_oprasional.wo_dismantle_logs.wo_dismantle_number",
    "to": "griya_oprasional.wo_dismantles.wo_dismantle_number",
    "srcDbTbl": "griya_oprasional.wo_dismantle_logs",
    "srcCol": "wo_dismantle_number",
    "dstDbTbl": "griya_oprasional.wo_dismantles",
    "dstCol": "wo_dismantle_number"
  },
  {
    "from": "griya_oprasional.wo_dismantle_logs.change_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_oprasional.wo_dismantle_logs",
    "srcCol": "change_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_oprasional.wo_terminates.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_oprasional.wo_terminates",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_oprasional.wo_terminates.sn_modem",
    "to": "griya_warehouse.modems.sn",
    "srcDbTbl": "griya_oprasional.wo_terminates",
    "srcCol": "sn_modem",
    "dstDbTbl": "griya_warehouse.modems",
    "dstCol": "sn"
  },
  {
    "from": "griya_oprasional.wo_terminates.created_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_oprasional.wo_terminates",
    "srcCol": "created_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.persediaans.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_warehouse.persediaans",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.kabels.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_warehouse.kabels",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.kabels.persediaan_id",
    "to": "griya_warehouse.persediaans.id_persediaan",
    "srcDbTbl": "griya_warehouse.kabels",
    "srcCol": "persediaan_id",
    "dstDbTbl": "griya_warehouse.persediaans",
    "dstCol": "id_persediaan"
  },
  {
    "from": "griya_warehouse.kabel_historys.kabel_id",
    "to": "griya_warehouse.kabels.id_kabel",
    "srcDbTbl": "griya_warehouse.kabel_historys",
    "srcCol": "kabel_id",
    "dstDbTbl": "griya_warehouse.kabels",
    "dstCol": "id_kabel"
  },
  {
    "from": "griya_warehouse.kabel_historys.karyawan_nip",
    "to": "griya_company.users.karyawan_nip",
    "srcDbTbl": "griya_warehouse.kabel_historys",
    "srcCol": "karyawan_nip",
    "dstDbTbl": "griya_company.users",
    "dstCol": "karyawan_nip"
  },
  {
    "from": "griya_warehouse.kabel_history_details.history_kabel_id",
    "to": "griya_warehouse.kabel_historys.id_kabel_history",
    "srcDbTbl": "griya_warehouse.kabel_history_details",
    "srcCol": "history_kabel_id",
    "dstDbTbl": "griya_warehouse.kabel_historys",
    "dstCol": "id_kabel_history"
  },
  {
    "from": "griya_warehouse.modems.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_warehouse.modems",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modems.persediaan_id",
    "to": "griya_warehouse.persediaans.id_persediaan",
    "srcDbTbl": "griya_warehouse.modems",
    "srcCol": "persediaan_id",
    "dstDbTbl": "griya_warehouse.persediaans",
    "dstCol": "id_persediaan"
  },
  {
    "from": "griya_warehouse.modems.return_batch_id",
    "to": "griya_warehouse.modem_return_batches.id",
    "srcDbTbl": "griya_warehouse.modems",
    "srcCol": "return_batch_id",
    "dstDbTbl": "griya_warehouse.modem_return_batches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modems.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_warehouse.modems",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_warehouse.modems_historys.sn_modem",
    "to": "griya_warehouse.modems.sn",
    "srcDbTbl": "griya_warehouse.modems_historys",
    "srcCol": "sn_modem",
    "dstDbTbl": "griya_warehouse.modems",
    "dstCol": "sn"
  },
  {
    "from": "griya_warehouse.modems_historys.pppoe_secret",
    "to": "griya_customers.customers.pppoe_secret",
    "srcDbTbl": "griya_warehouse.modems_historys",
    "srcCol": "pppoe_secret",
    "dstDbTbl": "griya_customers.customers",
    "dstCol": "pppoe_secret"
  },
  {
    "from": "griya_warehouse.modems_historys.modem_replace_id",
    "to": "griya_customers.modem_replaces.id_modem_replace",
    "srcDbTbl": "griya_warehouse.modems_historys",
    "srcCol": "modem_replace_id",
    "dstDbTbl": "griya_customers.modem_replaces",
    "dstCol": "id_modem_replace"
  },
  {
    "from": "griya_warehouse.modem_return_batches.branch_id",
    "to": "griya_company.branches.id",
    "srcDbTbl": "griya_warehouse.modem_return_batches",
    "srcCol": "branch_id",
    "dstDbTbl": "griya_company.branches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modem_return_batches.created_by",
    "to": "griya_company.users.id",
    "srcDbTbl": "griya_warehouse.modem_return_batches",
    "srcCol": "created_by",
    "dstDbTbl": "griya_company.users",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modem_return_batch_details.batch_id",
    "to": "griya_warehouse.modem_return_batches.id",
    "srcDbTbl": "griya_warehouse.modem_return_batch_details",
    "srcCol": "batch_id",
    "dstDbTbl": "griya_warehouse.modem_return_batches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modem_return_batch_details.sn_modem",
    "to": "griya_warehouse.modems.sn",
    "srcDbTbl": "griya_warehouse.modem_return_batch_details",
    "srcCol": "sn_modem",
    "dstDbTbl": "griya_warehouse.modems",
    "dstCol": "sn"
  },
  {
    "from": "griya_warehouse.modem_must_return.batch_must_id",
    "to": "griya_warehouse.modem_return_batches.id",
    "srcDbTbl": "griya_warehouse.modem_must_return",
    "srcCol": "batch_must_id",
    "dstDbTbl": "griya_warehouse.modem_return_batches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modem_must_return.batch_now_id",
    "to": "griya_warehouse.modem_return_batches.id",
    "srcDbTbl": "griya_warehouse.modem_must_return",
    "srcCol": "batch_now_id",
    "dstDbTbl": "griya_warehouse.modem_return_batches",
    "dstCol": "id"
  },
  {
    "from": "griya_warehouse.modem_must_return.sn_modem",
    "to": "griya_warehouse.modems.sn",
    "srcDbTbl": "griya_warehouse.modem_must_return",
    "srcCol": "sn_modem",
    "dstDbTbl": "griya_warehouse.modems",
    "dstCol": "sn"
  }
];
