import React, { useState } from "react";
import Navbar from "../components/NavBar";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import Checkbox from "../components/CheckBox";
import Button from "../components/Button";
import Logo from "../../public/logo1.png";
import bot from '../assets/images/bot3.svg';
import ChatbotMini from './chatbot/chatbotmini.js';

const ProposeActivity: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };
    return (
        <div className="relative w-screen min-h-screen bg-gray-100 ">
            {/* Top Navigation */}
            <Navbar />

            {/* Hero Header */}
            <div className="py-12 text-center text-white bg-green-800">
                <img src={Logo} alt="logo" className="w-40 h-40 mx-auto mb-6" />
                <h1 className="mb-2 text-3xl font-bold">PROPOSER UNE ACTIVITÉ</h1>
                <p className="text-xl">اقترح نشاط</p>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-5xl px-4 mx-auto -mt-10">
                <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg">
                    
                    <h2 className="mb-6 text-2xl font-semibold text-center">
                        Proposer une activité - اقترح نشاط
                    </h2>

                    <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Row 1 */}
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

                        {/* Row 2 */}
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

                        {/* Row 3 */}
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

                        {/* Row 4 */}
                        <InputField
                            label="Activité proposée / النشاط المقترح"
                            name="activite"
                            placeholder="Décrivez l'activité"
                            required
                        />

                        {/* Row 5 (TextArea spans 2 columns) */}
                        <TextArea
                            label="Description de l'activité proposée / وصف النشاط المقترح"
                            name="description"
                            placeholder="Dites-nous en plus..."
                            required
                        />

                        {/* Row 6 (Checkboxes - also can be combined into a single row) */}
                        <div className="flex flex-col gap-3 md:col-span-2">
                            <Checkbox label="Je ne suis pas un robot" name="captcha" />
                            <Checkbox
                                label="J’accepte le traitement des données personnelles"
                                name="consent"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center md:col-span-2">
                            <Button text="Envoyer / إرسال" />
                        </div>
                    </form>
                </div>
            </div>

            {/* Chatbot Toggle Button */}<img
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
