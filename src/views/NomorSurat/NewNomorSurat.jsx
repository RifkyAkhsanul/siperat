import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { APIService } from '../../utils/APIService';
import { Constants } from '../../utils/Constants';

import { Button, getUserData, Input } from '../../components';

const NewNomorSurat = () => {
  const history = useHistory();

  // Payload
  const [kontak, setKontak] = useState('');
  const [kementerian, setKementerian] = useState('0');
  const [proker, setProker] = useState('');
  const [jenis, setJenis] = useState('0');
  const [tujuan, setTujuan] = useState('0');
  const [penerima, setPenerima] = useState('');
  const [perihal, setPerihal] = useState('');
  const [berkas, setBerkas] = useState('');
  const [jumlah, setJumlah] = useState('1');
  const [mintaTTD, setmintaTTD] = useState(false);

  // Form-related states
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');

  // check surat aktif
  const isSuratAktif = () => {
    return jenis === '11';
  };

  // Submit button handler
  const handleSubmit = () => {
    setLoading(true);

    APIService.user.post
      .nomor_surat({
        kontak: kontak,
        berkas: berkas,
        perihal: perihal,
        penerima: penerima,
        program_kerja: proker,
        jumlah: Number(jumlah),
        jenis_surat_id: Number(jenis),
        kementerian_id: Number(kementerian),
        tujuan_surat_id: Number(tujuan),
        minta_ttd: mintaTTD,
      })
      .then((reply) => {
        if (reply.data.success) {
          history.push('/success');
        }
        setLoading(false);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  // Form validation
  useEffect(() => {
    let pass = true;

    let isValidURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/gm;
    let isGoogleDrive = /(drive.google.com)/g;

    // Check berkas string
    if (!isValidURL.test(berkas) || !isGoogleDrive.test(berkas)) {
      pass = false;
    }
    // Check proker string
    if (proker.length > 20 || proker.trim().split(' ').length > 2 || !proker) {
      pass = false;
    }
    // Check other string fields
    if (!kontak || !perihal || !penerima) {
      pass = false;
    }
    // Check number fields
    if (Number(jumlah) > 20 || Number(jumlah) < 1 || jenis === '0' || kementerian === '0' || tujuan === '0') {
      pass = false;
    }

    // Set message and validation status
    if (!pass) {
      setValid(false);
      setMessage('❌ Periksa format pengisian!');
    } else {
      setValid(true);
      setMessage('✅ Jangan lupa periksa kembali isian form.');
    }
  }, [kontak, berkas, perihal, penerima, proker, jumlah, jenis, kementerian, tujuan, mintaTTD]);

  useEffect(() => {
    if (isSuratAktif()) {
      setKementerian('11');
      setProker('-');
      setPerihal('Surat Aktif Organisasi');
    }
  }, [jenis]);

  return (
    <main className="self-center w-full max-w-4xl mt-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(true);
        }}
        className="self-center text-center md:text-left w-full text-gray-900 space-y-4"
      >
        <Input label="Nama Pengaju*" name="name" type="text" required placeholder="Nama..." value={getUserData.nama} disabled={true} />

        <Input
          label="Kontak Pengaju* (ID Line/Nomor HP)"
          name="kontak"
          type="text"
          required
          autoFocus
          placeholder="Kontak pengaju..."
          value={kontak}
          onChange={(e) => setKontak(e.target.value)}
        />

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label className="block font-semibold text-rose-900 text-md mb-2">Kementerian*</label>
            <select
              required
              name="kementerian"
              className="shadow border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
              value={kementerian}
              disabled={isSuratAktif()}
              onChange={(e) => setKementerian(e.target.value)}
            >
              <option value="0">Pilih...</option>
              {Constants.kementerian.map((item, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {item.nama} ({item.kode})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <Input
              label="Proker*"
              name="proker"
              type="text"
              required
              placeholder="Nama program kerja..."
              value={proker}
              disabled={isSuratAktif()}
              onChange={(e) => setProker(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <label className="block text-gray-500 text-sm mb-2">*Nama proker max 20 karakter DAN max 2 kata (1 kali spasi). Penjelasan lihat di bawah form</label>
        <label className="block text-gray-500 text-sm mb-2">
          *Jika mengajukan sertifikat atau surat keterangan aktif kepanitiaan/organisasi, isi proker dengan {'"-"'}
        </label>

        <div>
          <label className="block font-semibold text-rose-900 text-md mb-2">Jenis Surat*</label>
          <select
            required
            name="jenis"
            className="shadow border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="0">Pilih...</option>
            {Constants.jenis_surat.map((item, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {item.nama} ({item.kode})
              </option>
            ))}
          </select>
        </div>

        <label className="block text-gray-500 text-sm mb-2">*Untuk sertifikat, menggunakan jenis Surat Keterangan (Ket)</label>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label className="block font-semibold text-rose-900 text-md mb-2">Tujuan Surat*</label>
            <select
              required
              name="kementerian"
              className="shadow border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
            >
              <option value="0">Pilih...</option>
              {Constants.tujuan_surat.map((item, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {item.nama} ({item.kode})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <Input
              label="Penerima* (bila sertif: Sebagai...)"
              name="penerima"
              type="text"
              required
              placeholder="Dekan Fakultas Ilmu Komputer, Peserta XXXX, dsb..."
              value={penerima}
              onChange={(e) => setPenerima(e.target.value)}
            />
          </div>
        </div>

        <label className="block text-gray-500 text-sm mb-2">*Internal FILKOM (cth: dekan, lembaga, dll). Eksternal FILKOM (cth: FKG, EM, BEM UI, dll)</label>

        <Input
          label="Perihal*"
          name="perihal"
          type="text"
          required
          placeholder="Permohonan Peminjaman XXXXX, dsb..."
          value={perihal}
          disabled={isSuratAktif()}
          onChange={(e) => setPerihal(e.target.value)}
        />

        <Input
          label="Link Folder/Berkas* (wajib: set access Commenter untuk email UB!)"
          name="berkas"
          type="text"
          required
          placeholder="https://drive.google.com/xxxxxxxxxx"
          value={berkas}
          onChange={(e) => setBerkas(e.target.value)}
        />

        <label className="block text-gray-500 text-sm mb-2">*Bila Surat &gt; 1 harap dimasukkan dalam link drive folder yang sama</label>

        <div>
          <label className="block font-semibold text-rose-900 text-md mb-2">Jumlah nomor surat (atau sertif)*</label>
          <div className="flex flex-row w-full content-center justify-center space-x-4">
            <span className="self-center flex font-semibold text-rose-900 text-lg">{jumlah}</span>
            <input
              className="w-full px-4 py-3 focus:outline-none"
              name="jumlah"
              type="range"
              min="1"
              max="20"
              step="1"
              required
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>
        </div>

        <label className="block text-gray-500 text-sm mb-2">
          * Bila butuh &gt; 20 nomor, lakukan submit dengan data yang sama sampai sebanyak jumlah yang diinginkan dan hubungi narahubung SIPERAT untuk
          konfirmasi.
        </label>

        {/*Submit section*/}
        <div className="flex justify-start">
          <label className="block text-gray-500 text-sm mb-2 pr-2 pt-2">* Ajukan permintaan tanda tangan</label>
          <input type="checkbox" id="mintaTTD" name="testing" checked={mintaTTD} className="pt-2 w-4" onChange={(e) => setmintaTTD(e.target.checked)}></input>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-0 pt-4 md:pt-6 md:flex-row items-center justify-between">
          <span className="text-sm text-gray-700 font-normal">{message}</span>
          <Button disabled={!valid || loading} submit text="Submit" />
        </div>
      </form>

      <div className="mt-12 pt-12 border-t-4 border-gray-300">
        <label className="block font-semibold text-rose-900 text-md mb-2">*Contoh ketentuan nama proker</label>
        <ul className="block text-gray-600 text-sm mb-2">
          <li>
            PK2MABA & STARTUP ACADEMY &rarr; <b>PK2MABA</b>
          </li>
          <li>
            LEADERS OF TOMORROW &rarr; <b>LOT</b>
          </li>
          <li>
            LOKAKARYA KADERISASI &rarr; <b>LOKAKARYA KADERISASI</b>
          </li>
          <li>
            TREE FOR LIFE &rarr; <b>TREEFORLIFE</b>
          </li>
          <li>
            LEMBAGA D-DAY &rarr; <b>LEMBAGA DDAY</b>
          </li>
        </ul>

        <br />

        <label className="block font-semibold text-rose-900 text-md mb-2">*Permission folder/file drive</label>
        <img
          className="self-center flex rounded-md border-2 border-rose-200"
          src={`${import.meta.env.BASE_URL}assets/images/driveaccess.png`}
          alt="Permission file/folder Surat"
        />
      </div>
    </main>
  );
};

export default NewNomorSurat;
