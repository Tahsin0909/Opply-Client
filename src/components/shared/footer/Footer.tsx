import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import Logo from "../navbar/Logo"

export default function Footer() {
    return (
        <footer className="bg-primary/20 py-8 ">
            <div className="container space-y-8">
                {/* Logo and Contact Info */}
                <div className="md:space-y-12 space-y-10">
                    <Logo />

                    <div className="space-y-[9px]">
                        <p className="text-text_shadow">(270) 555-0117</p>
                        <p className="text-black text-3xl md:text-4xl  font-bold">info@Marketplace.com</p>
                        <p className="text-text_shadow">3891 Ranchview Dr. Richardson, California 62639</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <Link href="#" className="bg-primary md:w-12 w-10 h-10 md:h-12 p-2 rounded-full hover:opacity-90 transition-opacity">
                            <Facebook className="W-7 md:w-8 h-7 md:h-8 text-white" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="bg-primary md:w-12 w-10 h-10 md:h-12 p-2 rounded-full hover:opacity-90 transition-opacity">
                            <Twitter className="W-7 md:w-8 h-7 md:h-8 text-white" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="bg-primary md:w-12 w-10 h-10 md:h-12 p-2 rounded-full hover:opacity-90 transition-opacity">
                            <Instagram className="W-7 md:w-8 h-7 md:h-8 text-white" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <nav>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            <li>
                                <Link href="/" className="text-gray-900 hover:text-black">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace" className="text-gray-900 hover:text-black">
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="text-gray-900 hover:text-black">
                                    Job Listing
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-900 hover:text-black">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <nav>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            <li>
                                <Link href="/privacy" className="text-gray-900 hover:text-black">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-900 hover:text-black">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-200">
                    <p className="text-vlack text-sm">Copyright © 2025 Opply All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

