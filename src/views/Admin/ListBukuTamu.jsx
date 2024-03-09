import { useEffect, useState } from 'react';
import { BukuTamuTable } from '../../components';
import { APIService } from '../../utils/APIService';

const ListBukuTamu = () => {
  const [isLoading, setLoading] = useState(true);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    APIService.admin.get.buku_tamu_all().then((reply) => {
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
          <BukuTamuTable isAdmin data={tableData} />
        </div>
      )}
    </main>
  );
};

export default ListBukuTamu;
