import { useEffect, useState } from 'react';
import { Button, getUserData, Input, PageTitle } from '../../components';
import { APIService } from '../../utils/APIService';
import { useHistory } from 'react-router';
import { Constants } from '../../utils/Constants';

const NewRequestTTD = () => {
  const history = useHistory();

  // Payload
  const [kontak, setKontak] = useState('');
  const [kementerian, setKementerian] = useState('0');
  const [proker, setProker] = useState('');
  const [jenis, setJenis] = useState('0');
  const [perihal, setPerihal] = useState('');
  const [berkas, setBerkas] = useState('');
  const nama = getUserData.nama;
  const nim = getUserData.nim;
  const prodi = getUserData.prodi;

  // Form-related states
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');

  // Submit button handler
  const handleSubmit = () => {
    setLoading(true);

    APIService.user.post
      .request_ttd({
        nama: nama,
        nim: nim,
        prodi: prodi,
        kontak: kontak,
        proker: proker,
        perihal: perihal,
        link_berkas: berkas,
        jenis_berkas_id: Number(jenis),
        kementerian_id: Number(kementerian),
      })
      .then((reply) => {
        if (reply.status == 201) {
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
    if (proker.length > 20 || proker.trim().split(' ').length > 2) {
      pass = false;
    }
    // Check other string fields
    if (!kontak || !perihal) {
      pass = false;
    }
    // Check number fields
    if (jenis === '0' || kementerian === '0') {
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
  }, [kontak, berkas, perihal, proker, jenis, kementerian]);

  return (
    <main className="self-center w-full max-w-4xl mt-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="self-center text-center md:text-left w-full text-gray-900 space-y-4"
      >
        <Input label="Nama Pengaju*" name="name" type="text" required placeholder="Nama..." value={nama} disabled={true} />

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
            <label className="block font-semibold text-rose-900 text-md mb-2">Kementerian/Kebiroan*</label>
            <select
              required
              name="kementerian"
              className="shadow border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
              value={kementerian}
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
              onChange={(e) => setProker(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <label className="block text-gray-500 text-sm mb-2">*Nama proker max 20 karakter DAN max 2 kata (1 kali spasi). Penjelasan lihat di bawah form</label>

        <div>
          <label className="block font-semibold text-rose-900 text-md mb-2">Jenis Berkas*</label>
          <select
            required
            name="jenis"
            className="shadow border border-gray-200 rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="0">Pilih...</option>
            {Constants.ttd.jenis_berkas.map((item, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {item.nama} ({item.kode})
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Perihal*"
          name="perihal"
          type="text"
          required
          placeholder="Permohonan Peminjaman XXXXX, dsb..."
          value={perihal}
          onChange={(e) => setPerihal(e.target.value)}
        />
        <Input
          label="Link Drive Folder Berkas* (wajib: set access Editor untuk email UB!)"
          name="berkas"
          type="text"
          required
          placeholder="https://drive.google.com/xxxxxxxxxx"
          value={berkas}
          onChange={(e) => setBerkas(e.target.value)}
        />

        <label className="block text-gray-500 text-sm mb-2">
          *Bila Surat/Sertifikat &gt; 1 harap menggunakan format .pdf dan dimasukkan dalam folder yang sama
        </label>

        {/*Submit section*/}
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

        <label className="block font-semibold text-rose-900 text-md mb-2">*Permission folder drive</label>
        <img
          className="self-center flex rounded-md border-2 border-rose-200"
          src={`${import.meta.env.BASE_URL}assets/images/editdrive.png`}
          alt="Permission file/folder Surat"
        />
      </div>
    </main>
  );
};

export default NewRequestTTD;
