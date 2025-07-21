/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OrderModal from "./orderModal/OrderModal";

interface Notification {
    notifications: any;
}

const NotificationModal = ({ notifications }: Notification) => {
    console.log(notifications);
    if (notifications.types === "delivery") {
        return <OrderModal />
    }
};

export default NotificationModal;
