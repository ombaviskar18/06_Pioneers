import { useState } from "react";
import logo from "../assets/logo.png";
import { RiCloseFill, RiMenu3Line } from "@remixicon/react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <nav className="fixed top-4 left-0 right-0 z-50 m-2 ">
           <div className="text-neutral-500 bg-black/60 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center rounded-xl border border-neutral-800">
            <Link to='/'><img src={logo} alt="Logo" width={120} height={24} /></Link>
            <div className="hidden md:flex mr-32 items-center justify-center flex-grow space-x-6">
                <a href='/' className="hover:text-neutral-200">Home</a>
                <Link to='/' className="hover:text-neutral-200">Detect Fraud</Link> 
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label={isOpen ? "Close Menu" : "Open Menu"}>
                    {isOpen ? <RiCloseFill/> : <RiMenu3Line/> }
                </button>
            </div>
        </div>
            {isOpen && (
                <div className="md:hidden bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 rounded-xl mt-2">
                    <div className="flex flex-col space-y-4">
                        <a href='/' className="hover:text-neutral-200">Home</a>
                        <Link to='/' className="hover:text-neutral-200">Detect Fraud</Link> 
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
