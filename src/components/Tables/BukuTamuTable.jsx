import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const BukuTamuTable = ({ data, isAdmin = false }) => {
  if (data == null) return null;

  // Pagination
  const [tableData, setTableData] = useState(data);
  const [rowPerPages, setRowPerPages] = useState(10);
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
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Nomor</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Tanggal</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Nama / Kontak Pengaju</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Instansi</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Keperluan</th>
              <th className="sticky top-0 bg-gray-200 z-20 py-3 px-6">Berkas</th>
            </tr>
          </thead>

          {/*NomorSuratTable Body*/}
          <tbody className="text-gray-600 text-sm">
            {currentData.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                {/*Status column*/}
                <td className="py-3 px-6 text-center whitespace-nowrap">{idx + 1}</td>

                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">{dayjs(item.waktu_pengajuan).format('DD MMM YYYY')}</td>

                {/*Nama kontak pengaju*/}
                <td className="py-3 px-6 text-left break-word w-64 max-w-xs leading-loose">
                  {item.nama}
                  <br />
                  <span className="bg-yellow-200 text-yellow-600 py-0.5 px-2 rounded-full font-semibold text-xs">{item.kontak}</span>
                </td>

                {/*Instansi*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">{item.instansi}</td>

                {/*Keperluan*/}
                <td className="py-3 px-6 text-left break-word max-w-xs leading-loose">{item.keperluan}</td>

                {/*Berkas*/}
                <td className="py-3 px-6 text-left break-all w-64 max-w-xs leading-loose">
                  {item.berkas === '' ? (
                    '-'
                  ) : (
                    <a
                      href={item.berkas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row h-7 text-md font-bold hover:cursor-pointer text-blue-400 hover:text-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Link Berkas
                    </a>
                  )}
                </td>
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
    </>
  );
};
