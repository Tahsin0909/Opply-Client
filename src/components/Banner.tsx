/* eslint-disable @next/next/no-img-element */
"use client"

import banner from "@/assets/banner/banner.png";
import { Search, Star } from 'lucide-react';
import Image from 'next/image';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { RiProjectorLine, RiUserLine } from 'react-icons/ri';
import PrimaryButton from './shared/primaryButton/PrimaryButton';
import { AnimatePresence, motion } from 'framer-motion';




function Banner() {
    return (
        <AnimatePresence >
            <div className=" bg-primary/10 ">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-end ">
                        {/* Left Column - Content */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: .3 }}
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-bold leading-tight md:my-0 my-4">
                                Empower Your Career,{' '}
                                <span className="block text-primary">
                                    One Connection
                                    <br />
                                    at a Time!
                                </span>
                            </h1>

                            <p className="text-gray-600 lg:text-lg">
                                Connect with top talents, offer your expertise, and unlock endless opportunities in one
                                seamless platform.
                            </p>

                            {/* Search Bar */}
                            <div className="flex items-center gap-2 bg-white rounded-full  p-1 lg:p-2 shadow-sm max-w-xl">
                                <Search className="w-5 h-5 text-gray-400 ml-2" />
                                <input
                                    type="text"
                                    placeholder="Search work"
                                    className="flex-1 outline-none px-2"
                                />
                                <PrimaryButton onClick={() => { }} text='Search' />
                            </div>

                            {/* Rating Section */}
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full  border-white overflow-hidden"
                                        >
                                            <img
                                                src={`https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_authors_boost`}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-white rounded-full p-3 aspect-square">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <div className="flex flex-col items-start gap-[2px]">
                                        <span className="font-semibold text-lg">4.8 / 5.0</span>
                                        <span className="text-text_shadow text-sm">12.5K Reviews</span>
                                    </div>
                                </div>


                            </div>
                        </motion.div>

                        {/* Right Column - Image */}
                        <motion.div
                            className="relative  flex items-center lg:items-end justify-center lg:justify-end z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: .4, duration: 1 }}
                        >
                            <Image
                                src={banner}
                                width={2000}
                                height={1000}
                                alt="Professional woman"
                                className="2xl:w-[600px] 2xl:h-[820px] xl:w-[529px] xl:h-[786px] lg:w-[400px] lg:h-[586px] sm:w-[400px] sm:h-[580px] md:w-[400px] md:h-[580px] w-[300px] h-[450px]"
                            />

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute max-w-[160px] xl:max-w-[230px] w-full top-1/3 sm:top-1/2 2xl:-right-6 xl:-right-20 right-1 bg-white/80 backdrop-blur-lg rounded-xl p-3 shadow-lg flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: .6, duration: 1 }}
                            >
                                <div className="bg-primary p-2 rounded-lg">
                                    <RiUserLine className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold">Total Talent</div>
                                    <div className="text-gray-500 text-sm">1200+</div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: .7, duration: 1 }}
                                className="absolute  max-w-[200px] xl:max-w-[230px] w-full top-1/2 sm:top-2/3 2xl:left-40 xl:left-7 lg:left-0 left-0 bg-white/80 backdrop-blur-lg rounded-xl p-3 shadow-lg flex items-center gap-3">
                                <div className="bg-primary p-2 rounded-lg">
                                    <IoBriefcaseOutline className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold">Available Jobs</div>
                                    <div className="text-gray-500 text-sm">350+</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: .8, duration: 1 }}
                                className="absolute   w-fit md:bottom-36 bottom-32 md:-right-2 sm:right-28 right-12 bg-white/80 backdrop-blur-lg rounded-full p-1 shadow-lg flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M26.4999 11.6797C26.4097 11.6854 26.3199 11.6959 26.2309 11.7113C25.5355 9.54449 24.17 7.6544 22.3313 6.31347C20.4926 4.97253 18.2757 4.25 16 4.25C13.7242 4.25 11.5073 4.97253 9.66861 6.31347C7.82992 7.6544 6.46446 9.54449 5.769 11.7113C5.67998 11.6959 5.59018 11.6854 5.5 11.6797C3.67773 11.6797 2.25 13.5772 2.25 16C2.25 18.4224 3.67773 20.3199 5.5 20.3199C6.19423 20.3123 6.85897 20.038 7.35645 19.5537C7.46837 19.4474 7.54475 19.3091 7.57516 19.1578C7.60557 19.0064 7.58853 18.8494 7.52637 18.708C6.86824 17.2169 6.62181 15.5767 6.81274 13.958C6.82349 13.8627 6.84229 13.77 6.85596 13.6756C6.89404 13.4148 6.93872 13.1558 6.99927 12.9016C7.47105 10.8681 8.61755 9.05424 10.252 7.75559C11.8864 6.45693 13.9124 5.75002 16 5.75002C18.0876 5.75002 20.1136 6.45693 21.748 7.75559C23.3825 9.05424 24.529 10.8681 25.0007 12.9016C25.0613 13.1558 25.106 13.4148 25.144 13.6756C25.1577 13.7701 25.1765 13.8627 25.1873 13.958C25.2278 14.3039 25.2487 14.6518 25.2499 15C25.2498 15.3169 25.2336 15.6335 25.2013 15.9488C25.1896 16.063 25.1657 16.1734 25.1498 16.2864C25.1222 16.4839 25.0981 16.6822 25.0578 16.877C25.0351 16.9861 25.0014 17.0909 24.9751 17.1985C24.9267 17.3943 24.8813 17.5908 24.8203 17.7835C24.7888 17.8834 24.7475 17.9786 24.7129 18.077C24.6435 18.2718 24.5752 18.4671 24.4924 18.6583C23.7765 20.3171 22.5911 21.7303 21.0822 22.7239C19.5732 23.7174 17.8066 24.2479 15.9999 24.25H15.4999C15.0358 24.25 14.5907 24.4344 14.2625 24.7626C13.9343 25.0908 13.7499 25.5359 13.7499 26C13.7499 26.4642 13.9343 26.9093 14.2625 27.2375C14.5907 27.5657 15.0358 27.75 15.4999 27.75H17.4999C17.7916 27.751 18.0789 27.6788 18.3355 27.54C18.5921 27.4013 18.8098 27.2003 18.9686 26.9557C19.1275 26.711 19.2224 26.4304 19.2448 26.1395C19.2672 25.8487 19.2162 25.5569 19.0966 25.2908C21.8205 24.4656 24.1084 22.5983 25.4626 20.095C25.7891 20.2409 26.1423 20.3175 26.4999 20.3199C28.3222 20.3199 29.7499 18.4224 29.7499 16C29.7499 13.5772 28.3222 11.6797 26.4999 11.6797Z" fill="#1F90FF" />
                                    <path d="M9.62508 22.5002H15.7848C17.7232 22.521 19.5972 21.8045 21.0272 20.4957C22.4572 19.1868 23.3365 17.3835 23.4869 15.4507C23.5653 14.1808 23.3193 12.9118 22.7722 11.7631C22.2251 10.6144 21.3947 9.62375 20.3593 8.88435C19.3238 8.14495 18.1173 7.6811 16.8532 7.53644C15.5891 7.39177 14.3089 7.57104 13.1332 8.05739C11.9575 8.54373 10.9248 9.32116 10.1323 10.3166C9.33976 11.3119 8.81348 12.4926 8.60293 13.7474C8.39238 15.0022 8.50448 16.2899 8.9287 17.4895C9.35292 18.689 10.0753 19.761 11.0279 20.6044L9.39999 21.8252C9.33707 21.8724 9.29061 21.9383 9.26718 22.0134C9.24375 22.0885 9.24454 22.1691 9.26943 22.2437C9.29432 22.3184 9.34206 22.3833 9.40589 22.4293C9.46971 22.4754 9.5464 22.5001 9.62508 22.5002ZM19.0001 14.0002C19.1979 14.0002 19.3912 14.0588 19.5557 14.1687C19.7201 14.2786 19.8483 14.4348 19.924 14.6175C19.9997 14.8002 20.0195 15.0013 19.9809 15.1953C19.9423 15.3892 19.847 15.5674 19.7072 15.7073C19.5673 15.8471 19.3892 15.9424 19.1952 15.981C19.0012 16.0195 18.8001 15.9997 18.6174 15.924C18.4347 15.8484 18.2785 15.7202 18.1686 15.5557C18.0587 15.3913 18.0001 15.198 18.0001 15.0002C18.0001 14.735 18.1054 14.4806 18.293 14.2931C18.4805 14.1055 18.7349 14.0002 19.0001 14.0002ZM16.0001 14.0002C16.1979 14.0002 16.3912 14.0588 16.5557 14.1687C16.7201 14.2786 16.8483 14.4348 16.924 14.6175C16.9997 14.8002 17.0195 15.0013 16.9809 15.1953C16.9423 15.3892 16.847 15.5674 16.7072 15.7073C16.5673 15.8471 16.3892 15.9424 16.1952 15.981C16.0012 16.0195 15.8001 15.9997 15.6174 15.924C15.4347 15.8484 15.2785 15.7202 15.1686 15.5557C15.0587 15.3913 15.0001 15.198 15.0001 15.0002C15.0001 14.735 15.1054 14.4806 15.293 14.2931C15.4805 14.1055 15.7349 14.0002 16.0001 14.0002ZM13.0001 14.0002C13.1979 14.0002 13.3912 14.0588 13.5557 14.1687C13.7201 14.2786 13.8483 14.4348 13.924 14.6175C13.9997 14.8002 14.0195 15.0013 13.9809 15.1953C13.9423 15.3892 13.847 15.5674 13.7072 15.7073C13.5673 15.8471 13.3892 15.9424 13.1952 15.981C13.0012 16.0195 12.8001 15.9997 12.6174 15.924C12.4347 15.8484 12.2785 15.7202 12.1686 15.5557C12.0587 15.3913 12.0001 15.198 12.0001 15.0002C12.0001 14.735 12.1054 14.4806 12.293 14.2931C12.4805 14.1055 12.7349 14.0002 13.0001 14.0002Z" fill="#1F90FF" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="absolute  max-w-[200px] xl:max-w-[230px] w-full bottom-4 right-4 bg-white/80 backdrop-blur-lg rounded-xl p-3 shadow-lg flex items-center gap-3">
                                <div className="bg-primary p-2 rounded-lg">
                                    <RiProjectorLine className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold">Available Project</div>
                                    <div className="text-gray-500 text-sm">120+</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}

export default Banner;