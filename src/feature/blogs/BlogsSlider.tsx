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

interface BlogPost {
  id: string
  title: string
  date: string
  image: string
  slug: string
}

const blogPosts: BlogPost[] = [{ id: "1", title: "Understanding Menopause: What You Need to Know", date: "Nov 25, 2024", image: "https://img.freepik.com/free-photo/creative-people-working-office_23-2147656715.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost", slug: "understanding-menopause", }, { id: "2", title: "How to Choose the Right Birth Control for Your Lifestyle", date: "Nov 23, 2024", image: "https://img.freepik.com/free-photo/young-doctors-team-hospital_23-2147763832.jpg?t=st=1739610301~exp=1739613901~hmac=a8fc5d270fa56af40f0dc69bc032829b78d11b9be47ea33db0718136546bcbcb&w=1380", slug: "birth-control-guide", }, { id: "3", title: "5 Myths About Women's Health You Need to Stop Believing", date: "Nov 20, 2024", image: "https://img.freepik.com/free-photo/close-up-scientist-with-coats_23-2148969992.jpg?t=st=1739610348~exp=1739613948~hmac=41b4567fd5d261da9e0c7311289c4de320e7e99a6657c36be6956a1122dcb204&w=1380", slug: "womens-health-myths", },]

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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 rounded-lg" />
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
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex group items-center justify-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors ${currentImage === (Number.parseInt(post.id) - 1) ? "bg-gray-100" : ""}`}
            >
              <div className="relative xl:w-40 lg:w-28 w-20 h-20 lg:h-28 xl:h-40 flex-shrink-0 overflow-hidden">
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
