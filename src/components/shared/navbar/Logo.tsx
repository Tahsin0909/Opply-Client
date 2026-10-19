import React from 'react';
import logo from "@/assets/logo/logo.png"
import Image from 'next/image';
import Link from 'next/link';


const Logo = () => {
    return (
        <Link href={"/"}>
            <Image alt='' src={logo} width={200} height={200} className='w-48 h-16 object-cover ' />
        </Link>
    );
};

export default Logo;