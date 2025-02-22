import React from 'react';
import BotIcon from '../../assets/images/botminimized.svg';

interface MessageProps {
    text: string;
    type: 'bot' | 'user';
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
    return (
        <div className={`flex items-start ${type === 'bot' ? 'justify-start' : 'justify-end'}`}>
            {type === 'bot' && <img src={BotIcon} className="w-8 mr-2" alt="Bot Icon" />}
            <div className={`px-4 py-2 rounded-lg ${type === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                {text}
            </div>
        </div>
    );
};

export default Message;
