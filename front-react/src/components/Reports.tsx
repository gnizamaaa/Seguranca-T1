

import { useEffect, useState } from 'react';
import { fetchGraphQLData } from '../utils/api';
import { Report } from '../utils/types';
import { REPORTS_QUERY } from '../utils/queries';


const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await fetchGraphQLData<{ reports: { edges: { node: Report }[] } }>(REPORTS_QUERY);
        setReports(data.reports.edges.map(edge => edge.node));
      } catch (err) {
        setError('Error fetching reports.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Reports</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">Input Index</th>
            <th className="px-4 py-2">Payload</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, idx) => (
            <tr key={idx} className="hover:bg-purple-700 transition-colors duration-300">
              <td className="px-4 py-2">{report.index}</td>
              <td className="px-4 py-2">{report.input.index}</td>
              <td className="px-4 py-2">{report.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;