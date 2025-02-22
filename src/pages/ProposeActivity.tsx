import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import Checkbox from "../components/CheckBox";
import Button from "../components/Button";
import Logo from "../../public/logo1.png";
import bot from "../assets/images/bot3.svg";
import ChatbotMini from "./chatbot/chatbotmini.js";

const ProposeActivity: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [activite, setActivite] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

    const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

    // Dummy data for suggestions (replace with API fetch logic)
    const allActivities = [
        "Prédictions météorologiques",
        "Conseil en management",
        "Formation continue en informatique",
        "Développement web",
        "Analyse de données",
    ];

    // Update suggestions as user types
    useEffect(() => {
        if (activite) {
            const filtered = allActivities.filter((activity) =>
                activity.toLowerCase().includes(activite.toLowerCase())
            );
            setSuggestions(filtered);
            console.log("filtered", filtered);
        } else {
            setSuggestions([]);
        }
    }, [activite]);

    // Handle activity selection
    const handleSelectActivity = (activity: string) => {
        if (!selectedActivities.includes(activity) && selectedActivities.length < 5) {
            setSelectedActivities((prev) => [...prev, activity]);
            setActivite(""); // Clear input after selection
            setSuggestions([]);
            console.log("selectedActivities", selectedActivities);
        }
    };

    return (
        <div className="relative w-screen min-h-screen bg-gray-100">
            <Navbar />

            <div className="py-12 text-center text-white bg-green-800">
                <img src={Logo} alt="logo" className="w-40 h-40 mx-auto mb-6" />
                <h1 className="mb-2 text-3xl font-bold">PROPOSER UNE ACTIVITÉ</h1>
                <p className="text-xl">اقترح نشاط</p>
            </div>

            <div className="w-full max-w-5xl px-4 mx-auto -mt-10">
                <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-6 text-2xl font-semibold text-center">
                        Proposer une activité - اقترح نشاط
                    </h2>

                    <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <InputField
                            label="Nom / اللقب"
                            name="nom"
                            placeholder="Entrez votre nom"
                            required
                        />
                        <InputField
                            label="Prénom / الاسم"
                            name="prenom"
                            placeholder="Entrez votre prénom"
                            required
                        />

                        <InputField
                            label="Tél / رقم الهاتف"
                            name="tel"
                            type="tel"
                            placeholder="Entrez votre numéro de téléphone"
                            required
                        />
                        <InputField
                            label="Email / البريد الإلكتروني"
                            name="email"
                            type="email"
                            placeholder="Entrez votre email"
                        />

                        <SelectField
                            label="Wilaya / الولاية"
                            name="wilaya"
                            options={["Alger", "Oran", "Constantine"]}
                            required
                        />
                        <SelectField
                            label="Domaine d'activité / مجال النشاط"
                            name="domaine"
                            options={["Technologie", "Agriculture", "Santé"]}
                            required
                        />

                        <div className="relative">
                            <InputField
                                label="Activité proposée / النشاط المقترح"
                                name="activite"
                                placeholder="Décrivez l'activité"
                                value={activite}
                                onChange={(e) => setActivite(e.target.value)}
                                required
                            />
                            {suggestions.length > 0 && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                    {suggestions.map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSelectActivity(s)}
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <TextArea
                            label="Description de l'activité proposée / وصف النشاط المقترح"
                            name="description"
                            placeholder="Dites-nous en plus..."
                            required
                        />

                        <div className="flex flex-col gap-3 md:col-span-2">
                            <Checkbox label="Je ne suis pas un robot" name="captcha" />
                            <Checkbox
                                label="J’accepte le traitement des données personnelles"
                                name="consent"
                            />
                        </div>

                        <div className="flex justify-center md:col-span-2">
                            <Button text="Envoyer / إرسال" />
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3 className="mb-2 font-semibold">Activités sélectionnées :</h3>
                        <ul>
                            {selectedActivities.map((activity, index) => (
                                <li key={index} className="p-1">{activity}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <img
                src={bot}
                alt="Bot"
                onClick={toggleChatbot}
                className="fixed w-16 h-16 cursor-pointer md:w-32 md:h-32 bottom-4 right-4"
            />

            {isChatbotOpen && (
                <div className="fixed bottom-0 right-4 z-[9999]">
                    <ChatbotMini onClose={toggleChatbot} />
                </div>
            )}
        </div>
    );
};

export default ProposeActivity;
