import React, { useState } from 'react';
import {Search } from "lucide-react";
import NavBar from "../components/Navbar";


function SearchPage() {
    return (
        <div className="flex max-w-screen">
            <div className="bg-gray-800 h-screen fixed left-0 top-0">
                <NavBar />
            </div>
            
            <div className="w-5/6 ml-auto bg-gray-200 p-12">
                
            </div>
        </div>
    );
}

export default SearchPage;
