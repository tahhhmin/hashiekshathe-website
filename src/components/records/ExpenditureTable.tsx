import React, { useEffect, useState } from 'react';

function ExpenditureTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://opensheet.vercel.app/1SIgCAMpZhHtNM3p0HgKjO3-9Lsk6KUiyc2Zn7Lya9qM/Sheet2')
      .then(res => res.json())
      .then(data => {
        setRows([...data].reverse()); // ✅ Ensures newest entries appear at the top
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sheet data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading data...</p>;

  return (
    <div className="records-container">
      <table className="records-table">
        <thead>
          <tr>
            {rows.length > 0 &&
              Object.keys(rows[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenditureTable;