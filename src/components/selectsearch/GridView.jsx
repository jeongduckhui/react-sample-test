import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function GridView({ searchTrigger, conditions }) {
  const fetchGridData = async () => {
    const res = await axios.get('http://localhost:8000/gridData', {
      params: conditions,
    });
    return res.data;
  };

  const gridQuery = useQuery({
    queryKey: ['gridData', searchTrigger],
    queryFn: fetchGridData,
    enabled: searchTrigger > 0,
  });

  return (
    <div>
      <h3>조회결과</h3>
      {gridQuery.isLoading && <div>Loading...</div>}

      {gridQuery.data?.map(row => (
        <div key={row.id} style={{ border: '1px solid #aaa', margin: 5 }}>
          #{row.id} / value={row.value}
        </div>
      ))}
    </div>
  );
}
