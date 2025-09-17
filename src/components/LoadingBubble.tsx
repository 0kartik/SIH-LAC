import React from 'react';

const LoadingBubble: React.FC = () => {
  return (
    <div className="message-container bot">
      <div className="message-bubble bot-bubble loading-bubble">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBubble;