import React from 'react';
import { Download, MessageSquare } from 'lucide-react';
import { downloadLogs } from '../utils/csvLogger';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <MessageSquare size={24} />
          <h1>Verbo</h1>
        </div>
        <button onClick={downloadLogs} className="download-button">
          <Download size={16} />
          Download Logs
        </button>
      </div>
    </div>
  );
};

export default Header;