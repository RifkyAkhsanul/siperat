const flipKeys = (obj) => {
  return Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
};

export const Constants = {
  // Urutan array (jenis_surat[x]) sesuai id yang ada di DB SIPERAT. SAMAKAN!
  jenis_surat: [
    { kode: 'U', nama: 'Undangan' },
    { kode: 'PH', nama: 'Permohonan' },
    { kode: 'Ket', nama: 'Keterangan' },
    { kode: 'MoU', nama: 'Kerjasama' },
    { kode: 'ST', nama: 'Surat Tugas' },
    { kode: 'P', nama: 'Pengumuman' },
    { kode: 'SR', nama: 'Rekomendasi' },
    { kode: 'SP', nama: 'Peringatan' },
    { kode: 'SB', nama: 'Surat Balasan' },
    { kode: 'Ket', nama: 'Surat Keputusan' },
    { kode: 'Ket', nama: 'Surat Aktif Organisasi' },
    { kode: 'Ket', nama: 'Sertifikat' },
  ],

  // Urutan array (kementerian[x]) sesuai id yang ada di DB SIPERAT. SAMAKAN!
  kementerian: [
    { kode: 'PSDM', nama: 'Pengembangan Sumber Daya Manusia' },
    { kode: 'KMB', nama: 'Karir, Minat, dan Bakat' },
    { kode: 'EKRAF', nama: 'Ekonomi Kreatif' },
    { kode: 'SOSLING', nama: 'Sosial dan Lingkungan' },
    { kode: 'KASTRAT', nama: 'Kajian dan Aksi Strategis' },
    { kode: 'ADVO', nama: 'Advokasi dan Kesejahteraan Mahasiswa' },
    { kode: 'ADKEU', nama: 'Administrasi dan Keuangan' },
    { kode: 'MEDINKRAF', nama: 'Media Informasi dan Kreatif' },
    { kode: 'PIT', nama: 'Pengembangan Informasi dan Teknologi' },
    { kode: 'PRES', nama: 'Presiden' },
    { kode: 'PSDI', nama: 'Pengembangan Sumber Daya Internal' },
  ],

  status_surat: [
    { kode: 1, nama: 'Diulas', color: 'bg-blue-200 text-blue-700' },
    { kode: 2, nama: 'Revisi', color: 'bg-yellow-200 text-yellow-700' },
    { kode: 3, nama: 'Ditolak', color: 'bg-red-200 text-red-700' },
    { kode: 4, nama: 'Diterima', color: 'bg-green-200 text-green-700' },
    { kode: 5, nama: 'Diterima (Proses TTD)', color: 'bg-green-200 text-green-700' },
    { kode: 6, nama: 'Diterima (Sudah TTD)', color: 'bg-green-200 text-green-700' },
  ],

  tujuan_surat: [
    { kode: 'I', nama: 'Internal' },
    { kode: 'E', nama: 'Eksternal' },
  ],
  ttd: {
    status: [
      { kode: 1, nama: 'Pertama Kali submit', color: 'bg-blue-200 text-blue-700' },
      { kode: 2, nama: 'TTD', color: 'bg-green-200 text-green-700' },
      { kode: 3, nama: 'Ditolak', color: 'bg-red-200 text-red-700' },
    ],
    jenis_berkas: [
      {
        kode: 'S',
        nama: 'Surat',
      },
      {
        kode: 'Stf',
        nama: 'Sertifikat',
      },
    ],
  },

  getColorSurat: function (kode) {
    return this.status_surat[kode - 1].color;
  },
  getColorTTD: (id) => {
    return id === 1 ? 'bg-blue-200 text-blue-700' : (id === 2 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700');
  },
};
