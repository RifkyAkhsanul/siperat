import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Constants } from '../../utils/Constants';
import dayjs from 'dayjs';
import { APIService } from '../../utils/APIService';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';

export const RequestTTDTable = ({ data, isAdmin = false }) => {
  if (data == null) return null;

  const [loading, setLoading] = useState(false);
  const [currentTTD, setCurrentTTD] = useState(null);
  const [status, setStatus] = useState('0');

  const handleSelectTTD = (item) => {
    setStatus(item.status_ttd_id);
    setCurrentTTD(item);
  };

  const handleUnselectTTD = () => {
    setStatus('0');
    setCurrentTTD(null);
  };

  const handleChangeStatus = (id, data) => {
    setLoading(true);
    APIService.admin.patch
      .change_status_ttd(id, data)
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
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Jenis Berkas</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Pengaju</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Kementerian / Proker</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Perihal</th>
            </tr>
          </thead>

          {/*NomorSuratTable Body*/}
          <tbody className="text-gray-600 text-sm">
            {currentData.map((item, idx) => (
              <tr onClick={() => handleSelectTTD(item)} key={idx} className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer">
                {/*Status column*/}
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className={`py-1 px-3 rounded-full font-semibold text-xs w-min mx-auto ${Constants.getColorTTD(item.status_ttd_id)} `}>
                    {item.status_ttd.status}
                  </div>
                  {isAdmin && (
                    <div className="mt-4 space-x-1 flex flex-row justify-center content-center w-full">
                      <button onClick={() => handleSelectTTD(item)} className="block w-6 transform hover:cursor-pointer text-red-400 hover:scale-110">
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
                        href={item.link_berkas}
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

                {/* Tanggal */}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">
                  {dayjs(item.tanggal).format('DD MMM YYYY')}
                  <br />
                  {dayjs(item.tanggal).format('HH:mm:ss')}
                </td>

                {/*Jenis Berkas TTD*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">{item.jenis_berkas_ttd.jenis}</td>

                {/*Nama pengaju*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">{item.nama}</td>

                {/*Proker dan kementerian*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">
                  <span className="bg-yellow-200 text-yellow-600 py-0.5 px-2 rounded-full font-semibold text-xs mr-2">{item.kementerian.kode}</span>
                  {item.proker}
                </td>

                {/*Perihal*/}
                <td className="py-3 px-6 text-left whitespace-nowrap leading-loose">{item.perihal}</td>
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
      {!isAdmin && currentTTD != null && (
        <div
          onClick={(e) => e.target === e.currentTarget && handleUnselectTTD()}
          className="fixed w-full h-full mt-0 top-0 left-0 bg-gray-900 bg-opacity-70 p-4 md:p-16 flex z-50 justify-center items-start overflow-y-scroll backdrop-filter backdrop-blur"
        >
          <div className="bg-white w-full max-w-xl rounded shadow-lg z-50 opacity-100">
            <div className="flex flex-col p-8">
              <div className="w-6 self-end cursor-pointer" onClick={() => handleUnselectTTD()}>
                <svg className="self-center fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

              <div className="flex flex-col text-sm leading-relaxed space-y-4">
                <div className="font-bold text-md">Status</div>
                <div className="space-x-2">
                  <span className={`py-1 px-3 rounded-full font-semibold ${Constants.getColorTTD(currentTTD.status_ttd_id)}`}>
                    {currentTTD.status_ttd.status}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Berkas</div>
                  <a
                    href={currentTTD.link_berkas}
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

                {/*Sedang diulas*/}
                {currentTTD.status_ttd_id === 1 && (
                  <>
                    <hr />
                    <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                      <span className="text-xs text-gray-700 font-normal w-full">
                        Mohon sabar menunggu. Surat/Sertifikat sedang dalam antrian untuk penandatanganan.
                      </span>
                    </div>
                  </>
                )}

                {/*Surat telah ttd*/}
                {currentTTD.status_ttd_id === 2 && (
                  <>
                    <hr />
                    <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                      <span className="text-xs text-gray-700 font-normal w-full">Surat/Sertifikat telah ditanda tangani.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/*Dialog Info Surat for Admin*/}
      {isAdmin && currentTTD != null && (
        <div
          onClick={(e) => e.target === e.currentTarget && handleUnselectTTD()}
          className="fixed w-full h-full mt-0 top-0 left-0 bg-gray-900 bg-opacity-70 p-4 md:p-16 flex z-50 justify-center items-start overflow-y-scroll backdrop-filter backdrop-blur"
        >
          <div className="bg-white w-full max-w-xl rounded shadow-lg z-50 opacity-100">
            <div className="flex flex-col p-8">
              <div className="w-6 self-end cursor-pointer" onClick={() => handleUnselectTTD()}>
                <svg className="self-center fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

              <div className="flex flex-col text-sm leading-relaxed space-y-4">
                <div className="font-bold text-md">Status</div>
                <div className="space-x-2">
                  <span className={`py-1 px-3 rounded-full font-semibold ${Constants.getColorTTD(currentTTD.status_ttd_id)}`}>
                    {currentTTD.status_ttd.status}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Jenis Berkas</div>
                  {currentTTD.jenis_berkas_ttd.jenis}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Berkas</div>
                  <a
                    href={currentTTD.link_berkas}
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
                  {dayjs(currentTTD.tanggal).format('DD MMM YYYY HH:mm:ss')}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Nama Pengaju / Kontak</div>
                  <div className="leading-loose">
                    {currentTTD.nama} ({currentTTD.prodi} / {currentTTD.nim})
                    <br />
                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full font-semibold text-xs mr-2">{currentTTD.kontak}</span>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Kementerian / Proker</div>
                  <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full font-semibold text-xs mr-2">{currentTTD.kementerian.kode}</span>
                  {currentTTD.proker}
                </div>

                <div>
                  <div className="font-bold text-md mb-2">Perihal</div>
                  {currentTTD.perihal}
                </div>

                <hr />

                <div>
                  <div className="font-bold text-md mb-2">Ubah Status</div>
                  <div className="relative shadow border rounded-md w-full pl-3 pr-4 bg-white focus:shadow-lg" onChange={() => false}>
                    <select
                      disabled={currentTTD.status_ttd_id === 2}
                      className="py-3 w-full focus:outline-none focus:ring-0 disabled:opacity-50"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {Constants.ttd.status.map((item, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 mt-4 md:flex-row items-center justify-between">
                  <span className="text-xs text-gray-700 font-normal w-56">{loading ? 'Loading...' : ''}</span>
                  <Button
                    disabled={loading || currentTTD.status_ttd_id === 2}
                    text="Ubah status"
                    onClick={() =>
                      handleChangeStatus(currentTTD.id, {
                        status_ttd_id: Number(status),
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
