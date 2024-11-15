"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from "axios";
import Loading from "./../../Loading.js"; // Keep the component name as Loading here

export default function Artworks() {
  const { id } = useParams();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [artwork, setArtwork] = useState<any>(null);
  const [recommend, setRecommend] = useState([]);
  const [iiifUrl, setIiifUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch artwork details and recommendations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworkResponse, recommendResponse] = await Promise.all([
          axios.get(`https://api.artic.edu/api/v1/artworks/${id}`),
          axios.get('https://api.artic.edu/api/v1/artworks', {
            params: { limit: 8, page: 2 },
          }),
        ]);

        setArtwork(artworkResponse.data.data);
        setIiifUrl(artworkResponse.data.config.iiif_url);
        setRecommend(recommendResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Scroll to top when `id` changes
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [id]);

  // Show loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle case where artwork is not found
  if (!artwork) {
    return <div className="text-center text-gray-500">Artwork not found.</div>;
  }

  return (
    <div ref={ref} className="mx-auto bg-white mb-4 min-h-full">
      <div className="container px-4">
        <div key={artwork.id}>
          <div className="bg-white p-4 text-center shadow">
            <img 
              src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.thumbnail?.alt_text || 'Artwork image'}
              className="w-full h-80 object-contain mb-2"
            />
            <h3 className="text-2xl font-semibold italic text-gray-800">{artwork.title}</h3>
            <p className="text-md text-gray-600 mt-1">{artwork.artist_display}</p>
            <p className="text-md text-gray-500 mt-1">{artwork.date_display}</p>
            <h2 className="mt-3 text-xl">{artwork.short_description}</h2>
          </div>
        </div>

        <h1 className='mt-5 text-2xl'>You Might Also Like:</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {recommend.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                router.push(`/dashboard/ItemDetails/${item.id}`);
                if (ref.current) {
                  ref.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white p-4 rounded-lg border-2 shadow cursor-pointer"
            >
              <img 
                src={`${iiifUrl}/${item.image_id}/full/843,/0/default.jpg`}
                alt={item.thumbnail?.alt_text || 'Artwork image'}
                className="w-full h-80 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold italic text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.artist_display}</p>
              <p className="text-xs text-gray-500 mt-1">{item.date_display}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
































// "use client"
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import axios from "axios";

// export default function Artworks() {
//   const { id } = useParams();
//   const ref = useRef<HTMLDivElement>(null);
//   const [artwork, setArtwork] = useState<any>(null);
//   const [recommend, setRecommend] = useState([]);
//   const [iiifUrl, setIiifUrl] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.artic.edu/api/v1/artworks', {
//           params: {
//             limit: 8,  // Adjust limit as needed
//             page: 2     // Adjust page as needed
//           }
//         });
//         setRecommend(response.data.data);
//         setIiifUrl(response.data.config.iiif_url); // Set the iiif_url from config
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [id]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
//         setArtwork(response.data.data);
//         setIiifUrl(response.data.config.iiif_url);
//       } catch (error) {
//         console.error("Error fetching artwork:", error);
//       }
//     };
//     fetchData();
//   }, [id]);
  

//   if (!artwork) return <div>Loading...</div>;

//   return (
//     <div ref={ref} className="mx-auto bg-white mb-4 min-h-full">
//       <div className="container px-4">
//         <div key={artwork.id}>
//           <div className="bg-white p-4 text-center shadow">
//             <img 
//               src={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
//               alt={artwork.thumbnail?.alt_text || 'Artwork image'}
//               className="w-full h-80 object-contain mb-2"
//             />
//             <h3 className="text-2xl font-semibold italic text-gray-800">{artwork.title}</h3>
//             <p className="text-lg text-gray-600 mt-1">{artwork.artist_display}</p>
//             <p className="text-lg text-gray-500 mt-1">{artwork.date_display}</p>
//           </div>
//         </div>


//         <h1 className='mt-5 text-2xl'>You Might Also Like:</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {recommend.map((item) => (
//             <div key={item.id} className="bg-white p-4 rounded-lg shadow">
//               <img 
//                 src={`${iiifUrl}/${item.image_id}/full/843,/0/default.jpg`} // Construct IIIF image URL
//                 alt={item.thumbnail?.alt_text || 'Artwork image'} 
//                 className="w-full h-80 object-cover mb-2"
//               />
//               <h3 className="text-xl font-semibold italic text-gray-800">{item.title}</h3>
//               <p className="text-sm text-gray-600 mt-1">{item.artist_display}</p>
//               <p className="text-xs text-gray-500 mt-1">{item.date_display}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
