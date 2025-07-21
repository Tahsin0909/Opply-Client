"use client"
import React, { useState } from 'react';
import { Modal } from '../../../components/modal/Modal';
import { Button } from '../../../components/ui/button';
import OrderModal from './OrderModal';

const Demo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                Open
            </Button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <OrderModal />
            </Modal>
        </div>
    );
};

export default Demo;