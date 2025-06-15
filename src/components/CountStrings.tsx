import React, { useEffect, useState } from 'react';
import { cardService } from '../services/cardService';

interface CodeCount {
  code: string;
  count: number;
}

const CountStrings: React.FC = () => {
  const [codeCounts, setCodeCounts] = useState<CodeCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCount = async () => {
      setLoading(true);
      const cards = await cardService.getCards();
      const codeMap: Record<string, number> = {};
      cards.forEach(card => {
        card.codes.split(',').forEach(rawCode => {
          const code = rawCode.trim();
          if (code) {
            codeMap[code] = (codeMap[code] || 0) + 1;
          }
        });
      });
      const codeCountsArr = Object.entries(codeMap)
        .map(([code, count]) => ({ code, count }))
        .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
      setCodeCounts(codeCountsArr);
      setLoading(false);
    };
    fetchAndCount();
  }, []);

  return (
    <div className="app-content">
      <h2>Code Counts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Code</th>
              <th style={{ textAlign: 'right', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {codeCounts.map(({ code, count }) => (
              <tr key={code}>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{code}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CountStrings; 