

import { useEffect, useState } from 'react';
import { fetchGraphQLData } from '../utils/api';
import { Voucher } from '../utils/types';
import { VOUCHERS_QUERY } from '../utils/queries';

const Vouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hexToString = (hex: string) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await fetchGraphQLData<{ vouchers: { edges: { node: Voucher }[] } }>(VOUCHERS_QUERY);
        setVouchers(data.vouchers.edges.map(edge => edge.node));
      } catch (err) {
        setError('Error fetching vouchers.');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#000000' }}>Vouchers</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">Input Index</th>
            <th className="px-4 py-2">Destination</th>
            <th className="px-4 py-2">Payload</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher, idx) => (
            <tr key={idx} className="hover:bg-purple-700 transition-colors duration-300">
              <td className="px-4 py-2">{voucher.index}</td>
              <td className="px-4 py-2">{voucher.input.index}</td>
              <td className="px-4 py-2">{voucher.destination}</td>
              <td className="px-4 py-2">{hexToString(voucher.payload)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vouchers;