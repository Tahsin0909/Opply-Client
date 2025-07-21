/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import banner from "@/assets/consultation/banner.png";
import Loading from "@/components/others/Loading";
import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/api/booking/bookingApi";
import { useGetConsultationByIdQuery } from "@/redux/api/consultation/consultationApi";
import { useCreatePaymentBookingMutation } from "@/redux/api/payment/paymentApi";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface PricingOption {
  duration: number; // in minutes
  price: number;
}

export default function ConsultationDetailsPage() {
  const path = usePathname();
  const id = path.split("/")[2];

  const [selectedOption, setSelectedOption] = useState<PricingOption | null>(
    null
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);

  const router = useRouter();
  const handleOptionSelect = (option: PricingOption) => {
    // Validate duration (example: must be at least 30 minutes)
    if (option.duration < 30) {
      setValidationError("Minimum consultation duration is 30 minutes");
      return;
    }

    setSelectedOption(option);
    setValidationError(null);
  };

  const { data } = useGetConsultationByIdQuery(id);
  const consultationData = data?.data;

  const [createBooking] = useCreateBookingMutation();
  const [makeBookingPayment] = useCreatePaymentBookingMutation();
  // Transform the available days data into the format expected by the component
  const transformAvailableData = (availableDays: any[]) => {
    return availableDays.map((day) => ({
      day: day.dayOfWeek,
      appointments: day.timeSlots.map((slot: any) => ({
        time: `${slot.startTime} - ${slot.endTime}`,
        status: "Available", // Assuming all slots are available since they're provided
      })),
    }));
  };

  const scheduleData = consultationData?.available
    ? transformAvailableData(consultationData.available)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === scheduleData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? scheduleData.length - 1 : prevIndex - 1
    );
  };

  if (!consultationData) {
    return <Loading title="Fetching Consultation Data" />;
  }

  const handleBooking = async () => {
    console.log(id);
    if (!id) {
      setValidationError("Can Not Find Id");
    } else if (!startTime) {
      setValidationError("Please Select A Time");
    } else if (!selectedOption) {
      setValidationError("Please Select Price and Duration");
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Add 1 day

      // Format as YYYY-MM-DD
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(tomorrow.getDate()).padStart(2, "0");

      const tomorrowFormatted = `${year}-${month}-${day}`;
      const res = await createBooking({
        consultationId: id,
        date: tomorrowFormatted,
        startTime: startTime?.split("-")[0],
        durationInMinutes: selectedOption.duration,
      });
      if (res.data?.success) {
        let bookingId: string;

        // If data is a single Booking
        if ("id" in res.data.data) {
          bookingId = res.data.data.id;
        }
        // If data is an array of Bookings (take first one)
        else if (Array.isArray(res.data.data)) {
          bookingId = res.data.data[0].id;
        }
        // If data is an object with booking property
        else if ("booking" in res.data.data) {
          bookingId = res.data.data.booking.id;
        } else {
          throw new Error("Invalid booking data structure");
        }
        const responce = await makeBookingPayment({ bookingId: bookingId });
        if (responce.data?.data.clientSecret) {
          router.push(
            `/make-payment?clientSecret=${responce.data?.data.clientSecret}`
          );
        }
      }
    }
  };

  return (
    <div className="container section-gap flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          {consultationData.title} by {consultationData?.user?.firstName}{" "}
          {consultationData?.user?.lastName}
        </h1>

        <h2 className="text-lg font-medium mb-2">Consultation Description</h2>
        <p className="mb-4 text-sm">{consultationData.description}</p>

        {consultationData.adviceOn && consultationData.adviceOn.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium">Advice On:</p>
            <ul className="mb-4 list-disc list-inside">
              {consultationData.adviceOn.map((topic: string, index: number) => (
                <li key={index} className="text-sm">
                  {topic}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="max-w-[300px]">
          {consultationData.pricing && consultationData.pricing.length > 0 && (
            <>
              <p className="mb-4 text-sm font-medium text-primary">
                Pricing Options (Select Options):
              </p>
              <ul className="mb-4">
                {consultationData.pricing.map((option, idx) => (
                  <li
                    key={idx}
                    className={`text-sm p-2 cursor-pointer rounded ${
                      selectedOption?.duration === option.duration
                        ? "bg-blue-100 border border-blue-300"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.duration} minutes - ${option.price}
                  </li>
                ))}
              </ul>

              {selectedOption && (
                <div className="p-3 bg-blue-50 rounded mb-4">
                  <p className="text-sm font-medium">Selected Option:</p>
                  <p className="text-sm">
                    {selectedOption.duration} minutes - ${selectedOption.price}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6">
          {consultationData.image ? (
            <Image
              src={consultationData.image}
              alt={consultationData.title}
              width={320}
              height={180}
              className="rounded-md"
            />
          ) : (
            <Image
              src={banner}
              alt={consultationData.title}
              width={320}
              height={180}
              className="rounded-md"
            />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[420px] border border-primary/70 shadow-lg rounded-lg p-4 flex flex-col relative">
        <div className="w-full max-w-md mb-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Available Time
                </h2>
                {scheduleData.length > 0 && (
                  <div className="text-sm opacity-80">
                    {currentIndex + 1} of {scheduleData.length}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {scheduleData.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={goToPrevious}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                      aria-label="Previous day"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <h3 className="text-lg font-medium text-gray-800">
                      {scheduleData[currentIndex].day}
                    </h3>

                    <button
                      onClick={goToNext}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                      aria-label="Next day"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="relative h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <ul className="space-y-3">
                          {scheduleData[currentIndex].appointments.map(
                            (appointment: any, i: number) => (
                              <li
                                key={i}
                                className={`${
                                  appointment.time === startTime ? "" : ""
                                }flex items-center`}
                              >
                                <div className="w-24 text-sm font-medium text-gray-600">
                                  {appointment.time}
                                </div>
                                <div
                                  className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                                    appointment.status === "Booked"
                                      ? "bg-red-50 border-red-200 text-red-800"
                                      : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {appointment.status}
                                    </span>
                                    {appointment.status === "Available" && (
                                      <button
                                        onClick={() =>
                                          setStartTime(appointment.time)
                                        }
                                        className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full"
                                      >
                                        {appointment.time === startTime
                                          ? "Selected"
                                          : "Book Now"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-gray-500">
                  No available time slots
                </div>
              )}
            </div>

            {/* Footer */}
            {scheduleData.length > 0 && (
              <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-sm text-gray-500">
                Click on any available slot to book your appointment
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {consultationData.pricing && consultationData.pricing.length > 0 && (
          <div className="mt-auto space-y-2">
            <Button
              onClick={() => handleBooking()}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Continue
            </Button>
            <Button variant="outline" className="w-full hidden">
              Message {consultationData?.user?.firstName}
            </Button>
            <div>
              {validationError && (
                <p className="text-red-500 text-sm mb-4">*{validationError}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
