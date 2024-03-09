import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

import { APIService } from '../../utils/APIService';

import { Button, getUserData, Input, PageTitle } from '../../components';

const NewBukuTamu = () => {
  const history = useHistory();

  // Payload
  const [nama, setNama] = useState(getUserData.nama || '');
  const [kontak, setKontak] = useState('');
  const [instansi, setInstansi] = useState('');
  const [keperluan, setKeperluan] = useState('');
  const [berkas, setBerkas] = useState('');

  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({});
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const handleSubmit = () => {
    setLoading(true);

    if (Number(captchaAnswer.trim()) !== captchaQuestion.ans) {
      Swal.fire({
        title: 'Captcha salah!',
        text: 'Periksa jawaban captcha anda!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#28a745',
        confirmButtonText: 'OK',
      });
      setLoading(false);
      return;
    }

    APIService.public.post
      .buku_tamu({
        nama: nama,
        kontak: kontak,
        instansi: instansi,
        keperluan: keperluan,
        berkas: berkas,
        // waktu_pengajuan: waktu,
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

  // Generate captcha question
  useEffect(() => {
    const genInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const x = genInt(1, 16);
    const y = genInt(2, 13);
    const opcode = genInt(0, 100);

    setCaptchaQuestion({
      x: x,
      y: y,
      ans: opcode % 2 === 0 ? x + y : x - y,
      op: opcode % 2 === 0 ? '+' : '-',
    });
  }, []);

  useEffect(() => {
    if (nama && kontak && instansi && keperluan && captchaAnswer) {
      setValid(true);
      setMessage('✅ Isian sudah lengkap. Cek ulang bila perlu.');
    } else {
      setValid(false);
      setMessage('❌ Lengkapi isian form.');
    }
  }, [nama, kontak, instansi, keperluan, captchaAnswer]);

  return (
    <>
      <PageTitle title="Buku Tamu" description="Untuk undangan, surat, poster, dsb yang ditujukan kepada BEM FILKOM" icon="📓" />

      <section id="menu" className="relative flex flex-col flex-grow px-12 py-24 bg-gray-100 pattern-circuitry">
        <main className="self-center w-full max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(true);
            }}
            className="self-center text-center md:text-left w-full text-gray-900 space-y-4"
          >
            <Input
              label="Nama Pengaju*"
              name="name"
              type="text"
              required
              autoFocus
              placeholder="Nama..."
              value={nama}
              disabled={getUserData.nama != null}
              onChange={(e) => setNama(e.target.value)}
            />
            <Input
              label="Kontak Pengaju* (ID Line/Nomor HP)"
              name="kontak"
              type="text"
              required
              placeholder="Kontak..."
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
            />
            <Input
              label="Asal Organisasi/Instansi/Komunitas*"
              name="asal"
              type="text"
              required
              placeholder="Asal..."
              value={instansi}
              onChange={(e) => setInstansi(e.target.value)}
            />
            <Input
              label="Keperluan*"
              name="keperluan"
              type="text"
              required
              placeholder="Jika undangan, tuliskan juga tanggal/waktu"
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
            />
            <Input
              label="Link berkas pendukung (opsional)"
              name="berkas"
              type="text"
              placeholder="Link drive, docs, dll..."
              value={berkas}
              onChange={(e) => setBerkas(e.target.value)}
            />
            <Input
              label={`${captchaQuestion.x} ${captchaQuestion.op} ${captchaQuestion.y} = ...?`}
              name="kode"
              type="text"
              placeholder="Jawab pertanyaan ini..."
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
            />

            {/*Submit section*/}
            <div className="flex flex-col space-y-4 md:space-y-0 pt-4 md:pt-6 md:flex-row items-center justify-between">
              <span className="text-sm text-gray-700 font-normal">{message}</span>
              <Button disabled={!valid || loading} submit text={loading ? 'Loading...' : 'Submit'} />
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default NewBukuTamu;
