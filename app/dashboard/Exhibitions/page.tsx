"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { UilAngleRight } from "@iconscout/react-unicons";
import Loading from "../Loading.js"; // Keep the component name as Loading here

export default function Exhibitions() {
    const [artworks, setArtworks] = useState([]);
    const [iiifUrl, setIiifUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Renamed state variable

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('https://api.artic.edu/api/v1/artworks', {
                params: {
                  limit: 3,  // Adjust limit as needed
                  page: 3     // Adjust page as needed
                }
              });
              setIsLoading(false); // Set loading to false once data is fetched
              setArtworks(response.data.data);
              setIiifUrl(response.data.config.iiif_url);
            } catch (error) {
              console.error("Error fetching data:", error);
              setIsLoading(false);
            }
          };
      
          fetchData();
    }, []);

    // Display loading component while data is being fetched
    if (isLoading) {  // Updated this check to use isLoading
        return <Loading />;
    }

    return (
        <div className="mx-auto mb-4 min-h-screen">
            <div className="container px-4">
                <div className="mt-5 flex justify-between">
                    <h1 className='text-xl md:text-3xl text-slate-700'>EXHIBITIONS</h1>
                    <Link href={'/dashboard/Artworks'}>
                    <div className="flex flex-row">
                        <p className='text-md md:text-lg font-medium'>See all current Exhibitions</p>
                        <UilAngleRight />
                    </div>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 p-4">
                    {artworks.map((artwork) => (
                        <Link
                            key={artwork.id}
                            href={`/dashboard/ItemDetails/${artwork.id}`}  // Use artwork.id here
                            className="bg-white border-slate-500 border-l border-t"
                        >
                            <div className="bg-white p-4">
                                <img 
                                  src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
                                  alt={artwork.thumbnail?.alt_text || 'Artwork image'}
                                  className="w-full h-96 object-contain mb-2"
                                />
                                <h3 className="text-2xl font-semibold italic text-gray-800">{artwork.title}</h3>
                                <p className="text-lg text-gray-600 mt-1">{artwork.artist_display}</p>
                                <p className="text-lg text-gray-500 mt-1">{artwork.date_display}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
