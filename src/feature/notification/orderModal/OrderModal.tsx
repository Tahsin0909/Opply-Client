import { useState } from 'react';
import { InfoModal } from './InfoModal';
import CancelOrder from './CancelOrder';
import { ModalTransition } from '../../../components/modal/ModalTransition';
import ConfirmModal from './ConfirmModal';

const samplePost = {
    name: "Dr. Olivia Adams",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    title: "Medical Researcher Needed",
    postedTime: "2 days ago",
    tags: [
        { name: "Medical Research" },
        { name: "Clinical Trials" },
        { name: "Data Analysis" },
    ],
    priceMin: 100,
    priceMax: 150,
    priceType: "Fixed-price",
    deadline: "10/05/2025",
    description:
        "Seeking a researcher to analyze clinical trial data for a pharmaceutical study. The ideal candidate should have experience in statistical analysis, medical research, and report writing. Responsibilities include data interpretation, compiling reports, and ensuring accuracy of findings. Knowledge of FDA guidelines is a plus.",
    scopeOfWork:
        "Analyze clinical trial data, interpret results, compile comprehensive reports, and ensure compliance with regulatory standards.",
    location: "New York, USA",
    availability: true,
    hourlyRate: 120,
    rating: 4.8,
};


const OrderModal = () => {
    const [modalState, setModalState] = useState("infoModal")
    return (
        <div className='overflow-hidden'>
            {
                modalState === "infoModal" && <ModalTransition><InfoModal samplePost={samplePost} setModalState={setModalState} /></ModalTransition>
            }
            {
                modalState === "CancelOrder" && <ModalTransition><CancelOrder samplePost={samplePost} setModalState={setModalState} /></ModalTransition>
            }
            {
                modalState === "confirmOrder" && <ModalTransition><ConfirmModal samplePost={samplePost} setModalState={setModalState} /></ModalTransition>
            }

        </div>
    );
};

export default OrderModal;