"use client"

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SwiperCore from "swiper";
import "swiper/css"; // Import base styles
import "swiper/css/autoplay"; // Import autoplay styles
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules

import { blogs } from "./fakeData";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = blogs.slice(0, 4).map((item) => ({
  id: item.id,
  title: item.title,
  date: new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  image: item.image,
  slug: item.slug,
}));

const BlogsSlider = () => {
  const [currentImage, setCurrentImage] = useState<number>(0)
  SwiperCore.use([Autoplay])
  return (

    <motion.div
      initial={{ opacity: 0 }} // Start slightly below
      animate
      whileInView={{ opacity: 1 }} // Animate when in viewport
      viewport={{ once: true, amount: 0.2, }} // Trigger once when 20% visible
      transition={{ duration: 0.7, ease: "easeIn" }}
      className="container">
      <div className="xl:grid lg:grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 ">
        <div className="xl:col-span-2">
          <Swiper
            direction={"vertical"}
            className="mySwiper w-full xl:max-h-[640px] lg:max-h-[450px] md:max-h-[500px] max-h-[400px] "
            slidesPerView={1}
            modules={[Autoplay]} // Include modules here
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              stopOnLastSlide: false,
            }}
            loop={true}
            onSlideChange={(swiper) => setCurrentImage(swiper.realIndex)}
          >
            {blogPosts.map((post, index) => (
              <SwiperSlide key={index} className="rounded-lg group ">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={1200}
                    height={900}
                    className="object-cover group-hover:scale-110 transition-all duration-300 w-full xl:min-h-[640px] lg:min-h-[450px] md:min-h-[500px] h-[400px] rounded-lg"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-black/10 rounded-lg" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 space-y-2 ">
                    <time className="text-sm text-gray-200 font-medium">{post.date}</time>
                    <h2 className="text-2xl lg:text-2xl xl:text-4xl font-bold text-white max-w-2xl">{post.title}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="xl:max-w-2xl xl:mx-auto xl:space-y-8 lg:flex-col md:flex hidden">
          {blogPosts.slice(0, 3).map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex group items-center justify-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors ${currentImage === idx ? "bg-gray-100" : ""}`}
            >
              <div className="relative xl:w-40 lg:w-28 w-20 h-20 lg:h-28 xl:h-40 shrink-0 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="rounded-lg object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="xl:text-xl lg:text-base text-sm font-semibold text-gray-900 mb-1">{post.title}</h3>
                <time className="text-sm text-gray-500">{post.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BlogsSlider
