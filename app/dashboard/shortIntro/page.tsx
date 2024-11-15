"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Intro() {
  const [artwork, setArtwork] = useState(null);
  const [iiifUrl, setIiifUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.artic.edu/api/v1/artworks/129884");
        setArtwork(response.data.data);
        setIiifUrl(response.data.config.iiif_url); // Set the iiif_url from config
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!artwork) return <div>Loading...</div>;
  
  return (
    <div className="bg-slate-100 mx-auto mb-4 p-4 max-w-screen-xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        
        {/* Artwork Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start overflow-hidden">
          {artwork.thumbnail && (
            <img 
              src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.thumbnail.alt_text}
              className="w-full h-auto max-w-md" // Responsive sizing for image
            />
          )}
        </div>

        {/* Artwork Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-sm md:text-lg font-italic tracking-wide text-gray-700">On View Through Jan 6</h2>
          
          <div className="mt-4">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">{artwork.title}</h1>
            <p className="mt-2 text-sm md:text-base text-gray-600"><strong>Artist:</strong> {artwork.artist_display}</p>
            <p className="text-sm md:text-base text-gray-600"><strong>Year:</strong> {artwork.date_display}</p>
            <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">{artwork.short_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
