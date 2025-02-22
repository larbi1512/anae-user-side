import React, { useEffect, useState } from 'react';
import bot3 from '../../assets/images/bot3.svg';
import send from '../../assets/images/send.svg';
import Voice from '../../assets/images/mingcute_mic-fill.svg';
import botmini from '../../assets/images/botminimized.svg';
import QuestionCard from './QuestionCard';

import '../../index.css';

interface ChatMessage {
    text: string;
    type: 'bot' | 'user';
}

const questions: string[] = [
    'What is your name?',
    'Calculate expenses',
    'Analyse data',
    'summarize',
    'give me a report',
];

const Chatbot: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            text: 'Hello, how can I help you?',
            type: 'bot',
        },
        {
            text: 'I can help you with your queries regarding our products, services, and more.',
            type: 'bot',
        },
    ]);
    const [showInitialView, setShowInitialView] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendClick = () => {
        if (message.trim() === '') return;
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, type: 'user' },
        ]);
        setMessage('');
        setShowInitialView(false);
        setLoading(true);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: 'Here’s a random response from the bot for testing purposes!',
                    type: 'bot',
                },
            ]);
            setLoading(false);
        }, 1000);
    };

    const handleQuestionClick = (question: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: question, type: 'user' },
        ]);
        setShowInitialView(false);
        setLoading(true);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: 'Here’s a random response from the bot for testing purposes!',
                    type: 'bot',
                },
            ]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <div className="flex flex-col items-center w-screen min-h-screen gap-8 py-8 bg-white">
            
            {/* Initial Bot Welcome */}
    {
        showInitialView && (
            <div className="flex flex-col items-center w-full p-4">
                <img
                    src={bot3}
                    alt="Bot"
                    className="w-16 h-16 cursor-pointer md:w-32 md:h-32"
                />
                <h1 className="font-semibold text-[#262626] text-[24px] md:text-[36px] text-center">
                    How can I help you?
                </h1>
            </div>
        )
    }

    {/* Chat Area Container */ }
    <div className="flex flex-col w-full max-w-[900px] max-h-[70vh] border border-gray-300 rounded-lg">
        {/* Messages Display Area */}
        <div
            id="chat-container"
            className="flex-1 px-4 py-2 space-y-2 overflow-y-auto"
        >
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'
                        } my-2`}
                >
                    {msg.type === 'bot' && (
                        <img src={botmini} alt="bot" className="w-6 h-6 mr-2" />
                    )}
                    <div
                        className={`p-3 rounded-xl text-[12px] md:text-[16px] ${msg.type === 'bot'
                                ? 'bg-[#262626] text-white'
                                : 'bg-green-500 text-white'
                            }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}

            {loading && (
                <div className="flex justify-start my-2">
                    <img src={botmini} alt="bot" className="w-6 h-6 mr-2" />
                    <div className="p-3 text-gray-900 bg-gray-200 rounded-lg text-[16px]">
                        Typing...
                    </div>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="flex flex-row items-center p-2 border-t border-gray-300">
            <div className="flex items-center bg-[#262626E5] rounded-xl w-full">
                <input
                    type="text"
                    placeholder="Ask anything..."
                    className="w-full px-4 py-2 text-white bg-transparent outline-none text-[16px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <img
                    src={Voice}
                    alt="Voice"
                    className="w-8 h-8 ml-2 cursor-pointer"
                />
            </div>
            <div
                className="ml-2 bg-white rounded-lg cursor-pointer"
                style={{
                    background:
                        'linear-gradient(228deg, #027A48 40.05%, #1CD88AFF 89.57%)',
                }}
                onClick={handleSendClick}
            >
                <img src={send} alt="send" className="p-2" />
            </div>
        </div>
    </div>

    {/* Predefined Questions */ }
    {
        showInitialView && (
            <div className="grid grid-cols-2 gap-2 space-x-1 md:grid-cols-4">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="cursor-pointer"
                    >
                        <QuestionCard question={question} />
                    </div>
                ))}
            </div>
        )
    }
    
    </div>
    
  );
};

export default Chatbot;
