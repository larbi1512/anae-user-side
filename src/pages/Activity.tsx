import React, { useState } from "react";
import Button from "../components/Button";
import bot from '../assets/images/bot3.svg';
import ChatbotMini from './chatbot/chatbotmini.js';

const Activity: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [domain, setDomain] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [activities] = useState<string[]>([
        "11108 - Prédictions météorologiques",
        "11115 - Practicien aéronautique en météorologie",
        "20010 - Conseil en management",
        "20011 - Conseil en marketing",
        "30005 - Formation continue en informatique",
    ]);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDomain(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredActivities = activities.filter((activity) =>
        activity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddActivity = (activity: string) => {
        if (!selectedActivities.includes(activity) && selectedActivities.length < 5) {
            setSelectedActivities((prev) => [...prev, activity]);
        }
    };

    const handleRemoveActivity = (activity: string) => {
        setSelectedActivities((prev) => prev.filter((a) => a !== activity));
    };

    return (
        <div className="w-screen ">
            <div className="w-full min-h-screen px-4 bg-gray-100">
                <div className="w-full p-4 pt-20 mx-auto">
                    <h2 className="mb-4 text-xl font-semibold text-gray-600">Votre activité</h2>
                    <p className="mb-6 text-gray-700">
                        Veuillez fournir des détails relatifs à l'activité ou aux activités que
                        vous souhaitez exercer en tant qu'auto-entrepreneur.
                    </p>

                    {/* Domaine d'activité */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-700">
                            Domaine d'activité
                        </label>
                        <select
                            value={domain}
                            onChange={handleDomainChange}
                            className="w-full p-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">-- Sélectionnez un domaine --</option>
                            <option value="10000 - Conseil, Expertise et formation">
                                10000 - Conseil, Expertise et formation (الخدمات الاستشارية والخبرات والتكوين)
                            </option>
                            <option value="20000 - Autre domaine 1">20000 - Autre domaine 1</option>
                            <option value="30000 - Autre domaine 2">30000 - Autre domaine 2</option>
                        </select>
                    </div>

                    {/* Choix de l'Activité (two-column layout on larger screens) */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Left side: "Liste des activités" + search bar */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Rechercher
                            </label>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full p-2 mb-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            {/* Scrollable list of filtered activities */}
                            <div className="h-64 overflow-y-auto text-gray-600 border border-gray-300 rounded-md">
                                {filteredActivities.map((activity) => (
                                    <div
                                        key={activity}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleAddActivity(activity)}
                                    >
                                        {activity}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Button text="Liste des activités" />
                            </div>
                        </div>

                        {/* Right side: "Activités sélectionnées" */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Activités sélectionnées (Max: 05)
                            </label>
                            <div className="h-64 overflow-y-auto text-gray-700 border border-gray-300 rounded-md">
                                {selectedActivities.map((activity) => (
                                    <div
                                        key={activity}
                                        className="flex items-center justify-between p-2 hover:bg-gray-100"
                                    >
                                        <span>{activity}</span>
                                        <button
                                            onClick={() => handleRemoveActivity(activity)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <Button text="Précédent" />
                        <Button text="Suivant" />
                    </div>
                </div>
            </div>

            {/* Chatbot Toggle Button */}<img
                src={bot}
                alt="Bot"
                onClick={toggleChatbot}
                className="fixed w-16 h-16 cursor-pointer md:w-32 md:h-32 bottom-4 right-4"
            />

            {isChatbotOpen && (
                <div className="fixed bottom-0 right-4">
                    <ChatbotMini onClose={toggleChatbot} />
                </div>
            )}
        </div>
    );
};

export default Activity;