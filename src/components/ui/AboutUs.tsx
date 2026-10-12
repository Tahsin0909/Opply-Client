import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import PrimaryButton from "../shared/primaryButton/PrimaryButton";

export default function AboutUs() {
    return (
        <div id="about" className="bg-[#F8F8F8]">
            <div className="container section-gap">
                <div className="flex flex-col md:flex-row items-center gap-10 px-6 max-w-6xl mx-auto">
                    {/* Left - Image */}
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/about.png"
                            alt="About Opply"
                            className="w-full rounded-lg object-cover shadow-sm"
                            height={793}
                            width={674}
                        />
                    </div>

                    {/* Right - Text Content */}
                    <div className="w-full md:w-1/2 space-y-3 md:space-y-6">
                        <h2 className="text-2xl md:text-5xl font-semibold">About Opply</h2>
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                            The Modern Service Marketplace Connecting Talent, Clients & Businesses
                        </h3>

                        {/* Description Paragraphs */}
                        <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                            <p>
                                Opply is an all-in-one service marketplace designed to bridge
                                the gap between clients, companies, freelancers, and industry
                                professionals. We bring together job listings, custom project
                                bidding, and paid 1-on-1 consultations into a unified, seamless
                                platform.
                            </p>
                            <p>
                                <strong className="text-gray-900 font-semibold">For Clients &amp; Companies:</strong> Post job
                                vacancies, launch projects for competitive bidding, and hire
                                vetted specialists. Create and manage clear agreements, track
                                project delivery milestones, and make safe payments with Stripe
                                protection.
                            </p>
                            <p>
                                <strong className="text-gray-900 font-semibold">For Freelancers &amp; Experts:</strong> Explore curated
                                job postings, submit bids on high-value projects, and offer paid
                                consultation sessions. Showcase your portfolio and credentials,
                                communicate in real time, and receive guaranteed payouts with
                                Stripe Connect.
                            </p>
                        </div>

                        {/* Our Values / Key Pillars */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-900">Our Core Pillars:</h4>
                            <ul className="list-disc list-inside text-gray-600 leading-relaxed text-sm md:text-base space-y-1">
                                <li>
                                    <strong className="text-gray-900 font-medium">Versatile Marketplace:</strong> Full-time jobs, project bidding, and 1-on-1 consultations under a single roof.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-medium">Trust &amp; Security:</strong> Milestone agreements, transparent reviews, and protected Stripe payments.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-medium">Seamless Collaboration:</strong> Real-time messaging, instant notifications, and end-to-end delivery tracking.
                                </li>
                            </ul>
                        </div>

                        {/* Button */}
                        <div>
                            <Link href="/signUp" className="inline-block group">
                                <PrimaryButton>
                                    <span className="flex items-center justify-center px-4 py-1">
                                        Join Us Today{" "}
                                        <BsArrowRight className="text-xl ml-2 mt-1 transition-transform duration-300 group-hover:translate-x-2" />
                                    </span>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

