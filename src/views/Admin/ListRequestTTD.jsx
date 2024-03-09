import { useEffect, useState } from 'react';
import { RequestTTDTable } from '../../components/Tables/RequestTTDTable';
import { APIService } from '../../utils/APIService';

const ListRequestTTD = () => {
  const [isLoading, setLoading] = useState(true);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    APIService.admin.get.request_ttd_all().then((reply) => {
      setTableData(reply.data);
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
          <RequestTTDTable isAdmin data={tableData} />
        </div>
      )}
    </main>
  );
};

export default ListRequestTTD;
