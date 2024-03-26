import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Constants } from '../../utils/Constants';
import dayjs from 'dayjs';
import { APIService } from '../../utils/APIService';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';

export const NomorSuratTable = ({ data, isAdmin = false }) => {
  if (data == null) return null;

  const [loading, setLoading] = useState(false);
  const [currentSurat, setCurrentSurat] = useState(null);
  const [status, setStatus] = useState('0');
  const [proker, setProker] = useState('');
  const [komentar, setKomentar] = useState('');

  const handleSelectSurat = (item) => {
    setStatus(item.status_surat.id);
    setKomentar(item.komentar);
    setProker(item.program_kerja);
    console.log(item.minta_ttd);
    setCurrentSurat(item);
  };

  const handleUnselectSurat = () => {
    setStatus('0');
    setKomentar('');
    setProker('');
    setCurrentSurat(null);
  };

  const handleChangeStatus = (id, data) => {
    setLoading(true);
    APIService.admin.patch
      .change_status_nomor_surat(id, data)
      .then((reply) => {
        Swal.fire({
          title: 'Sukses',
          text: 'Status surat telah berhasil diubah',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
        }).finally(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAjukanUlang = (id) => {
    setLoading(true);
    APIService.user.patch
      .ajukan_ulang_nomor_surat(id)
      .then((reply) => {
        Swal.fire({
          title: 'Sukses',
          text: 'Surat telah berhasil diajukan ulang',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
        }).finally(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Pagination

  const [tableData, setTableData] = useState(data);
  const rowPerPages = 5;
  const [totalPages, setTotalPages] = useState(tableData.length < rowPerPages ? 1 : Math.ceil(tableData.length / rowPerPages));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(tableData);

  const goToPage = (step) => {
    if (step === -1) setCurrentPage(Math.max(1, currentPage + step));
    else setCurrentPage(Math.min(totalPages, currentPage + step));
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    let start = rowPerPages * (currentPage - 1);
    let end = rowPerPages * currentPage;
    if (start < 0) start = 0;
    if (end > tableData.length) end = tableData.length;
    setCurrentData(tableData.slice(start, end));
  }, [currentPage, rowPerPages, tableData]);

  useEffect(() => {
    setCurrentPage(1);
    if (tableData.length < rowPerPages) setTotalPages(1);
    else setTotalPages(Math.ceil(tableData.length / rowPerPages));
  }, [rowPerPages]);

  if (data.length === 0) {
    return (
      <div className="w-full text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500 mt-16">Belum ada permintaan.</div>
    );
  }

  return (
    <>
      <div className="shadow-md overflow-auto w-full min-h-full mb-12">
        <table className="min-w-max w-full table-auto bg-white">
          {/*NomorSuratTable Head*/}
          <thead>
            <tr className="bg-gray-200 text-gray-600 h-16 uppercase text-sm leading-normal text-left">
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Status</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Tanggal</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Nomor Surat</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Pengaju</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Kementerian / Proker</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Tujuan / Penerima</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Jenis Surat</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Perihal</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Komentar</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Minta Tanda Tangan</th>
            </tr>
          </thead>

          {/*NomorSuratTable Body*/}
          <tbody className="text-gray-600 text-sm">
            {currentData.map((item, idx) => (
              <tr onClick={() => handleSelectSurat(item)} key={idx} className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer">
                {/*Status column*/}
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className={`py-1 px-3 rounded-full font-semibold text-xs ${Constants.getColorSurat(item.status_surat.id)}`}>
                    {item.status_surat.nama}
                  </div>
                  {isAdmin && (
                    <div className="mt-4 space-x-1 flex flex-row justify-center content-center w-full">
                      <button onClick={() => handleSelectSurat(item)} className="block w-6 transform hover:cursor-pointer text-red-400 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <a
                        href={item.berkas}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-6 transform hover:cursor-pointer text-blue-400 hover:scale-110"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </td>

                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">
                  {dayjs(item.waktu_pengajuan).format('DD MMM YYYY')}
                  <br />
                  {dayjs(item.waktu_pengajuan).format('HH:mm:ss')}
                </td>

                {/*Nomor*/}
                <td className="py-3 px-6 text-left w-64 font-semibold break-all text-xs leading-loose">
                  <span className="decoration-clone bg-purple-200 text-purple-600 py-0.5 px-2 rounded-full font-semibold text-xs">{item.jumlah} x</span>
                  <br />
                  {item.nomor_surat.length > 0 ? (
                    <div className="mt-1">
                      <span className="decoration-clone bg-green-200 text-green-600 py-0.5 px-2 rounded-full mr-1">
                        {Math.min(...item.nomor_surat.map((o) => o.nomor))
                          .toString()
                          .padStart(4, '0')}
                        {item.nomor_surat.length > 1 &&
                          ' - ' +
                            Math.max(...item.nomor_surat.map((o) => o.nomor))
                              .toString()
                              .padStart(4, '0')}
                      </span>
                      {item.nomor_surat[0].format_nomor_surat.substring(item.nomor_surat[0].format_nomor_surat.indexOf('/'))}
                    </div>
                  ) : (
                    <span className="decoration-clone bg-yellow-200 text-yellow-600 py-0.5 px-2 rounded-full font-semibold text-xs">{item.kode}</span>
                  )}
                </td>

                {/*Nama kontak pengaju*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">
                  {/*<span className="bg-blue-200 text-blue-600 py-0.5 px-2 rounded-full font-semibold text-xs">{item.kontak}</span>*/}
                  {/*<br />*/}
                  {item.nama}
                </td>

                {/*Proker dan kementerian*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">
                  <span className="bg-yellow-200 text-yellow-600 py-0.5 px-2 rounded-full font-semibold text-xs mr-2">{item.kementerian.kode}</span>
                  {item.program_kerja}
                </td>

                {/*Tujuan/penerima*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">
                  <span className="bg-green-200 text-green-600 py-0.5 px-2 rounded-full font-semibold text-xs mr-2">{item.tujuan_surat.nama}</span>
                  {item.penerima}
                </td>

                {/*Jenis surat*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">
                  <span className="bg-purple-200 text-purple-600 py-0.5 px-2 rounded-full font-semibold text-xs mr-2">{item.jenis_surat.kode}</span>
                  {item.jenis_surat.nama}
                </td>

                {/*Perihal*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">{item.perihal}</td>

                {/*Komentar*/}
                <td className="py-3 px-6 text-left w-64 max-w-xs">
                  <div
                    className="overflow-hidden whitespace-pre-wrap leading-loose"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.komentar}
                  </div>
                </td>
                {/*Perihal*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">{item.minta_ttd ? 'Ya' : 'Tidak'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Pagination*/}
      <div className="relative rounded w-full min-h-full max-h-screen">
        <div className="flex flex-row content-center justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(-1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="relative inline-flex flex-row items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              {rowPerPages * (currentPage - 1) + 1} - {Math.min(rowPerPages * currentPage, tableData.length)} dari {tableData.length} ({totalPages} hal)
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(1)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/*Dialog Info Surat for User*/}
      {!isAdmin && currentSurat != null && (
        <div
          onClick={(e) => e.target === e.currentTarget && handleUnselectSurat()}
          className="fixed w-full h-full mt-0 top-0 left-0 bg-gray-900 bg-opacity-70 p-4 md:p-16 flex z-50 justify-center items-start overflow-y-scroll backdrop-filter backdrop-blur"
        >
          <div className="bg-white w-full max-w-xl rounded shadow-lg z-50 opacity-100">
            <div className="flex flex-col p-8">
              <div className="w-6 self-end cursor-pointer" onClick={() => handleUnselectSurat()}>
                <svg className="self-center fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

              <div className="flex flex-col text-sm leading-relaxed space-y-4">
                <div className="font-bold text-md">Kode / Status</div>
                <div className="space-x-2">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full font-semibold">{currentSurat.kode}</span>
                  <span className={`py-1 px-3 rounded-full font-semibold ${Constants.getColorSurat(currentSurat.status_surat.id)}`}>
                    {currentSurat.status_surat.nama}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Nomor Surat</div>
                  <div className="leading-loose">
                    <span className="decoration-clone bg-purple-200 text-purple-600 py-1 px-3 rounded-full font-semibold text-xs">{currentSurat.jumlah} x</span>
                    <br />
                    {currentSurat.nomor_surat.length > 0 &&
                      currentSurat.nomor_surat.map((item) => (
                        <>
                          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full font-semibold text-xs">{item.format_nomor_surat}</span>
                          <br />
                        </>
                      ))}
                    {currentSurat.nomor_surat.length === 0 && '-'}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Berkas</div>
                  <a
                    href={currentSurat.berkas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row h-5 text-xl font-bold hover:cursor-pointer text-blue-400 hover:text-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Link Berkas &rarr;
                  </a>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Komentar</div>
                  <div className="whitespace-pre-wrap">{currentSurat.komentar}</div>
                </div>

                {/*Sedang diulas*/}
                {currentSurat.status_surat.id === 1 && (
                  <>
                    <hr />
                    <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                      <span className="text-xs text-gray-700 font-normal w-full">
                        Mohon sabar menunggu. Surat sedang dalam antrian untuk di-review Adkeu BEM FILKOM
                      </span>
                    </div>
                  </>
                )}

                {/*Sedang revisi*/}
                {currentSurat.status_surat.id === 2 && (
                  <>
                    <hr />
                    <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                      <span className="text-xs text-gray-700 font-normal w-64">
                        {loading ? 'Loading...' : 'Jika sudah melakukan revisi sesuai komentar dari reviewer, silakan lakukan pengajuan ulang'}
                      </span>
                      <Button disabled={loading} text="Ajukan ulang" onClick={() => handleAjukanUlang(currentSurat.id)} />
                    </div>
                  </>
                )}

                {/*Surat ditolak*/}
                {currentSurat.status_surat.id === 3 && (
                  <>
                    <hr />
                    <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                      <span className="text-xs text-gray-700 font-normal w-full">
                        Permintaan nomor surat ditolak. Untuk info lebih lanjut dan pengajuan kembali, hubungi Adkeu BEM FILKOM
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/*Dialog Info Surat for Admin*/}
      {isAdmin && currentSurat != null && (
        <div
          onClick={(e) => e.target === e.currentTarget && handleUnselectSurat()}
          className="fixed w-full h-full mt-0 top-0 left-0 bg-gray-900 bg-opacity-70 p-4 md:p-16 flex z-50 justify-center items-start overflow-y-scroll backdrop-filter backdrop-blur"
        >
          <div className="bg-white w-full max-w-xl rounded shadow-lg z-50 opacity-100">
            <div className="flex flex-col p-8">
              <div className="w-6 self-end cursor-pointer" onClick={() => handleUnselectSurat()}>
                <svg className="self-center fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

              <div className="flex flex-col text-sm leading-relaxed space-y-4">
                <div className="font-bold text-md">Kode / Status</div>
                <div className="space-x-2">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full font-semibold">{currentSurat.kode}</span>
                  <span className={`py-1 px-3 rounded-full font-semibold ${Constants.getColorSurat(currentSurat.status_surat.id)}`}>
                    {currentSurat.status_surat.nama}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Nomor Surat</div>
                  <div className="leading-loose">
                    <span className="decoration-clone bg-purple-200 text-purple-600 py-1 px-3 rounded-full font-semibold text-xs">{currentSurat.jumlah} x</span>
                    <br />
                    {currentSurat.nomor_surat.length > 0 &&
                      currentSurat.nomor_surat.map((item) => (
                        <>
                          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full font-semibold text-xs">{item.format_nomor_surat}</span>
                          <br />
                        </>
                      ))}
                    {currentSurat.nomor_surat.length === 0 && '-'}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Berkas</div>
                  <a
                    href={currentSurat.berkas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row h-5 text-xl font-bold hover:cursor-pointer text-blue-400 hover:text-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Link Berkas &rarr;
                  </a>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Waktu Pengajuan</div>
                  {dayjs(currentSurat.waktu_pengajuan).format('DD MMM YYYY HH:mm:ss')}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Nama Pengaju / Kontak</div>
                  <div className="leading-loose">
                    {currentSurat.nama} ({currentSurat.program_studi} / {currentSurat.nim})
                    <br />
                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full font-semibold text-xs mr-2">{currentSurat.kontak}</span>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Kementerian / Proker</div>
                  <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full font-semibold text-xs mr-2">{currentSurat.kementerian.kode}</span>
                  {currentSurat.program_kerja}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Tujuan / Penerima</div>
                  <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full font-semibold text-xs mr-2">{currentSurat.tujuan_surat.nama}</span>
                  {currentSurat.penerima}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Jenis Surat</div>
                  {currentSurat.jenis_surat.nama} ({currentSurat.jenis_surat.kode})
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Perihal</div>
                  {currentSurat.perihal}
                </div>
                <div>
                  <div className="font-bold text-md mb-2">Minta Tanda Tangan</div>
                  {currentSurat.minta_ttd ? 'Ya' : 'Tidak'}
                </div>

                <hr />

                {currentSurat.minta_ttd === false && <div>
                  <div className="font-bold text-md mb-2">Ubah Status</div>
                  <div className="relative shadow border rounded-md w-full pl-3 pr-4 bg-white focus:shadow-lg" onChange={() => false}>
                    <select
                      disabled={currentSurat.status_surat.id === 4 && !currentSurat.minta_ttd}
                      className="py-3 w-full focus:outline-none focus:ring-0 disabled:opacity-50"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {Constants.status_surat.map((item, idx) => (
                        idx < 4 ? <option key={idx + 1} value={idx + 1}>
                          {item.nama}
                        </option> : null
                      ))}
                    </select>
                  </div>
                </div>}

                {currentSurat.minta_ttd === true && <div>
                  <div className="font-bold text-md mb-2">Ubah Status</div>
                  <div className="relative shadow border rounded-md w-full pl-3 pr-4 bg-white focus:shadow-lg" onChange={() => false}>
                    <select
                      disabled={currentSurat.status_surat.id === 6}
                      className="py-3 w-full focus:outline-none focus:ring-0 disabled:opacity-50"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {Constants.status_surat.map((item, idx) => (
                        currentSurat.status_surat.id === 5 ?  (idx > 4 ? <option key={idx + 1} value={idx + 1}> {item.nama} </option> : null) : ((idx !== 3 && idx !== 5) ? <option key={idx + 1} value={idx + 1}> {item.nama} </option> : null)
                      ))}
                    </select>
                  </div>
                </div>}

                {/*<div>*/}
                {/*  <div className="font-bold text-md mb-2">Ubah Nama Proker</div>*/}
                {/*  <input*/}
                {/*    className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg disabled:opacity-50"*/}
                {/*    name="proker"*/}
                {/*    placeholder="Proker..."*/}
                {/*    disabled={currentSurat.status_surat.id === 4}*/}
                {/*    value={proker}*/}
                {/*    onChange={(e) => setProker(e.target.value)}*/}
                {/*  />*/}
                {/*</div>*/}

                <div>
                  <div className="font-bold text-md mb-2">Ubah Komentar</div>
                  <textarea
                    className="shadow appearance-none border rounded-md w-full h-24 px-4 py-3 focus:outline-none focus:shadow-lg disabled:opacity-50"
                    name="komentar"
                    placeholder="Komentar..."
                    disabled={currentSurat.status_surat.id === 4 || currentSurat.status_surat.id === 5 || currentSurat.status_surat.id === 6}
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                  <span className="text-xs text-gray-700 font-normal w-56">
                    {loading ? 'Loading...' : 'Nomor akan otomatis ter-assign ketika surat diubah menjadi diterima'}
                  </span>
                  <Button
                    disabled={loading || (currentSurat.status_surat.id === 4 && currentSurat.minta_ttd == false) || currentSurat.status_surat.id === 6}
                    text={currentSurat.status_surat.id === 5 ? "Surat di TTD" : "Ubah status"}
                    onClick={() =>
                      handleChangeStatus(currentSurat.id, {
                        status_surat_id: Number(status),
                        komentar: komentar,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
