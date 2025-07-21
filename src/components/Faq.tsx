"use client"
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import SectionTitle from './shared/sectionTitle/SectionTitle';
import { motion } from 'framer-motion';
interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: 'What is this platform about?',
        answer: 'Our platform is a comprehensive solution designed to connect professionals, facilitate learning, and enable growth opportunities in a digital environment.',
    },
    {
        question: 'Who can use this platform?',
        answer: 'Anyone! Whether you\'re a freelancer, coach, mentor, or employer, our platform is tailored to meet your needs.',
    },
    {
        question: 'Is it free to sign up?',
        answer: 'Yes, basic registration is completely free. We also offer premium features for enhanced functionality and opportunities.',
    },
    {
        question: 'Is Their Any Other Payment Options.',
        answer: 'Yes, we accept all major credit cards, PayPal, and bank transfers. Contact our support team for more information about payment methods.',
    },
];

const FaqItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({
    item,
    isOpen,
    onClick
}) => {
    return (
        <div className={`border-b px-4 rounded-md border-gray-200 last:border-0 ${isOpen ? "bg-gray-100" : ""}`}>
            <button
                className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={onClick}
            >
                <span className="md:text-xl text-lg lg:text-2xl font-medium text-gray-900">{item.question}</span>
                <span className="ml-6 flex-shrink-0 transition-all duration-300">
                    {isOpen ? (
                        <div className='text-white bg-primary p-2 rounded-full'>
                            <Minus className={`w-6 h-6   ${isOpen ? "" : ""}`} />
                        </div>
                    ) : (
                        <div>
                            <Plus className={`w-6 h-6 text-primary ${isOpen ? "" : ""}`} />
                        </div>
                    )}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 ' : 'max-h-0'
                    }`}
            >
                <p className="text-gray-600 md:text-lg sm:text-base text-sm lg:text-xl">{item.answer}</p>
            </div>
        </div>
    );
};




const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number>(1); // Second item open by default

    return (
        <div className="container section-gap">
            <SectionTitle
                miniTitle="FAQs"
                title="Frequently Asked Questions"
                subtitle="Have questions? We've got answers! Find everything you need to know about using our platform."
            />

            <div className="bg-white rounded-xl shadow-sm">
                {faqData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }} // Start slightly below
                        animate
                        whileInView={{ opacity: 1 }} // Animate when in viewport
                        viewport={{ once: true, amount: 0.2, }} // Trigger once when 20% visible
                        transition={{ duration: 0.4 * (index + 1), ease: "easeIn" }}>
                        <FaqItem
                            item={item}
                            isOpen={index === openIndex}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    </motion.div>

                ))}
            </div>
        </div >
    );
};

export default Faq;