import { useEffect, useState } from 'react';

import { APIService } from '../../utils/APIService';

import { NomorSuratTable } from '../../components';

const ListNomorSurat = () => {
  const [isLoading, setLoading] = useState(true);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    APIService.user.get.nomor_surat_all().then((reply) => {
      setTableData(reply.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex flex-col content-center justify-center flex-grow">
      {isLoading ? (
        <div className="w-full text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-500 animate-pulse mt-16">
          Memuat data...
        </div>
      ) : (
        <div>
          <NomorSuratTable data={tableData} />
        </div>
      )}
    </main>
  );
};

export default ListNomorSurat;
