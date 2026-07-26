"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import SectionTitle from "./shared/sectionTitle/SectionTitle";

interface TestimonialCardProps {
    quote: string;
    author: string;
    company: string;
    imageSrc: string;
}

const testimonials: TestimonialCardProps[] = [
    {
        quote:
            "This service completely transformed our workflow! From scheduling tasks to streamlining communication, everything has become more efficient. Highly recommend to anyone looking for a solution that prioritizes productivity and ease of use.",
        author: "John Doe",
        company: "Tech Innovations",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
    {
        quote:
            "The support team is outstanding, and the product exceeded all our expectations. Every query we raised was handled promptly, and the results have been nothing short of transformative.",
        author: "Jane Smith",
        company: "Creative Solutions",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
    {
        quote:
            "Seamless integration and exceptional performance. Our systems had never worked together so smoothly before using this product. We’re thrilled with the results.",
        author: "Michael Johnson",
        company: "Future Enterprises",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
    {
        quote:
            "Our team productivity has skyrocketed since we adopted this tool. From managing multiple projects to ensuring deadlines are met, this tool has been a lifesaver.",
        author: "Emily Davis",
        company: "Bright Ideas Co.",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
    {
        quote:
            "A truly remarkable experience from start to finish. The customer support was attentive, the features are innovative, and the results exceeded our expectations.",
        author: "David Wilson",
        company: "NextGen Labs",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
    {
        quote:
            "Magura Property Management has transformed how I manage my rentals. Their professional team handles everything from tenant communication to property maintenance, allowing me to focus on other priorities.",
        author: "Anonymous",
        company: "Magura Property Management",
        imageSrc:
            "https://img.freepik.com/free-photo/portrait-smiling-young-businesswoman-standing-with-her-arm-crossed-against-gray-wall_23-2147943827.jpg",
    },
];

const Testimonials = () => {
    const [swiperInstance, setSwiperInstance] =
        useState<SwiperType | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden bg-transparent"
        >
            <div className="container section-gap">
                <div className="mb-10 md:mb-14">
                    <SectionTitle
                        miniTitle="Testimonials"
                        title="What Our Clients Say"
                        subtitle="Hear from our satisfied clients and discover how we’ve helped them achieve their goals."
                    />
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={1}
                        spaceBetween={24}
                        loop
                        speed={700}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        onSwiper={setSwiperInstance}
                        className="mySwiper"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={`${testimonial.author}-${index}`}>
                                <TestimonialCard {...testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-8 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            aria-label="Previous testimonial"
                            onClick={() => swiperInstance?.slidePrev()}
                            className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <ChevronLeft
                                size={20}
                                className="transition-transform group-hover:-translate-x-0.5"
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Next testimonial"
                            onClick={() => swiperInstance?.slideNext()}
                            className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            <ChevronRight
                                size={20}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Testimonials;

export function TestimonialCard({
    quote,
    author,
    company,
    imageSrc,
}: TestimonialCardProps) {
    return (
        <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            <Quote
                aria-hidden="true"
                className="absolute right-6 top-6 h-16 w-16 text-primary/10 md:h-24 md:w-24"
            />

            <div className="relative z-10">
                <blockquote className="max-w-5xl text-lg leading-8 text-gray-700 sm:text-xl md:text-2xl md:leading-10">
                    “{quote}”
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-4 ring-primary/10">
                        <Image
                            src={imageSrc}
                            alt={`${author} profile`}
                            fill
                            sizes="56px"
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900">{author}</p>
                        <p className="mt-1 text-sm text-gray-500">{company}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}