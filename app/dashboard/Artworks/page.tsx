"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link.js';
import Loading from "../Loading.js"; // Keep the component name as Loading here

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [iiifUrl, setIiifUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Renamed state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.artic.edu/api/v1/artworks', {
          params: {
            limit: 12,  // Adjust limit as needed
            page: 1     // Adjust page as needed
          }
        });
        setIsLoading(false); // Set loading to false once data is fetched
        setArtworks(response.data.data);
        setIiifUrl(response.data.config.iiif_url); // Set the iiif_url from config
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
    <div className="mx-auto bg-slate-100 mb-4 min-h-full">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {artworks.map((artwork) => (
            <Link
            key={artwork.id}
            href={`/dashboard/ItemDetails/${artwork.id}`}  // Use artwork.id here
            className="bg-white border-slate-500 border-l border-t"
        >
            <div key={artwork.id} className="bg-white p-4 rounded-lg shadow">
              <img 
                src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`} // Construct IIIF image URL
                alt={artwork.thumbnail?.alt_text || 'Artwork image'} 
                className="w-full h-96 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold italic text-gray-800">{artwork.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{artwork.artist_display}</p>
              <p className="text-xs text-gray-500 mt-1">{artwork.date_display}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
