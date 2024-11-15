"use client"
import { useState, useEffect, useRef } from 'react';
import { UilAngleDown, UilSearch,UilAngleRight,UilBars,UilTimes } from "@iconscout/react-unicons";
import { motion } from 'framer-motion';
import Testimonials from '../Testimonials/page';
import Intro from '../shortIntro/page';
import Exhibitions from '../Exhibitions/page';
import Newsletter from '../Newsletter/page';
import './Homepage.css';

export default function Homepage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const videoRef = useRef(null);
  const testimonialRef = useRef(null);
  const [currentOpenMenu, setCurrentOpenMenu] = useState(null);
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const admissionRef = useRef(null);
  const visitingRef = useRef(null);
  const visitsRef = useRef(null);
  const exhibitionsRef = useRef(null);
  const ArtistsRef = useRef(null);
  const eventsRef = useRef(null);


  const handleMenuToggle = () => {
    setMenu(prev => !prev);
};

const navbarClasses = `transition-all z-20 mb-4 duration-300 ${
  navbarFixed ? 'fixed top-0 w-full bg-white' : 'absolute w-full bg-transparent'
}`;

const textColor = navbarFixed ? 'text-black' : 'text-white';

const dropdownClasses = dropdownMenu ? 'bg-white text-black' : textColor;


// Variants for the red background drop-down animation
const backgroundVariants = {
  hidden: { height: 0 },
  visible: { height: '100vh', transition: { duration: 0.5, ease: 'easeInOut' } }
};

// Variants for the menu items to animate sequentially
const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3, ease: 'easeOut' }
  })
};


useEffect(() => {
  const handleScroll = () => {
    const scrollThreshold = 500;

    // Get current scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Get the current positions of the video and testimonial sections
    const videoTop = videoRef.current?.getBoundingClientRect().top || 0;
    const testimonialTop = testimonialRef.current?.getBoundingClientRect().top || 0;

    // Check if user has scrolled past the threshold and reached Testimonial section
    if (scrollTop > scrollThreshold && testimonialTop <= 0) {
      setNavbarFixed(true); // Fix the navbar with white background
    }
    // Check if user scrolled back up above threshold and into Video area
    else if (scrollTop <= scrollThreshold || videoTop >= 0) {
      setNavbarFixed(false); // Return to transparent background
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



useEffect(() => {
  if (menu) {
    // Wait until the background animation is complete before showing items
    const timer = setTimeout(() => setShowItems(true), 500); // Adjust to match background animation duration
    return () => clearTimeout(timer);
  } else {
    setShowItems(false);
  }
}, [menu]);

  useEffect(() => {
    function handleDropdown(event) {
      if (
        !visitsRef.current?.contains(event.target) &&
        !exhibitionsRef.current?.contains(event.target) &&
        !ArtistsRef.current?.contains(event.target) &&
        !eventsRef.current?.contains(event.target)
      ) {
        setDropdownMenu(null);
      }
    }
    document.addEventListener("mousedown", handleDropdown);
    return () => document.removeEventListener("mousedown", handleDropdown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !admissionRef.current?.contains(event.target) &&
        !visitingRef.current?.contains(event.target)
      ) {
        setCurrentOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen">
       {showOverlay && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm  z-10 pointer-events-none"></div>
)}
      <div
      className="mx-auto relative h-[35rem] md:h-[45rem]">
        <video
          src="/ArtInstituteOfChicagovideo.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full z-10 h-full bg-gradient-to-b from-black/80 to-transparent"></div>

        {/* DarkMode component centered */}
        {/* <div className="absolute z-10 inset-0 flex justify-center items-center">
          <DarkMode />
        </div> */}

        {/* Top Navigation Menu */}
        <nav className={navbarClasses}>
<div
    className={`transition-all duration-300 z-20 relative ${
      dropdownMenu ? 'bg-white text-black': 'text-white'
    }`}
  >
        <div className="flex flex-row justify-between">
          <div className="px-4 relative z-50 py-3">
            <img
              className="w-full md:w-24 h-24"
              src="/images/ArtInstitutelogo.png"
              alt="Art Institute Of Chicago Logo"
            />
          </div>


          <div className="flex mr-4 mt-5 flex-col">

          {/* Menu Page */}
          <div className="flex items-center w-full relative">
      <div className="ml-auto md:hidden flex items-center space-x-2">
        <span className="text-lg mr-4 -mt-2">Menu</span>
        <button className={menu ? 'menu-btn active' : 'menu-btn'} onClick={handleMenuToggle}>
        {menu ? <UilTimes className="fixed right-3 bg-white text-black" /> : <UilBars className="fixed right-3 -mt-4 bg-black text-white" />}
        </button>
      </div>

      {/* Animated full-screen red background */}
      {menu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backgroundVariants}
          className="fixed md:hidden top-0 left-0 w-full h-full bg-red-500 text-white z-40 flex justify-center items-center"
        />
      )}

      {/* Centered Menu items */}
      {showItems && (
        <motion.ul
          className="flex flex-col md:hidden items-center justify-center space-y-8 text-white mt-12 absolute top-16 z-40"
          initial="hidden"
          animate="visible"
        >
           <ul className="flex relative items-center justify-center space-x-4"></ul>
          {['Home', 'Collection', 'New Products', 'Trending', 'Top Products'].map((item, index) => (
            <motion.li
              key={item}
              custom={index}
              variants={listVariants}
              className="text-xl"
            >
              <a href="#" onClick={handleMenuToggle}>{item}</a>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>



            <div className='overflow-visible mt-5'>
            <ul
  className={`flex justify-end gap-10 text-lg md:text-xl relative ${dropdownClasses}`}
>
     <li>
     <span className="hover:underline underline-offset-4 hidden md:block">Become A Member</span>
       </li>
        <li>
        <span className="hover:underline underline-offset-4 hidden md:block">Shop</span>
        </li>
        <li>
          <span className="hover:underline underline-offset-4">Buy Tickets</span>
        </li>
        <li>
          <span className="hover:underline underline-offset-4 md:hidden">Visit</span>
        </li>
      </ul>
  </div>


        <div className='hidden md:block'>
        <ul 
  onMouseEnter={() => setShowOverlay(true)}
  onMouseLeave={() => {
    setDropdownMenu(null);
    setShowOverlay(false);
  }}
          className={`flex flex-row mt-10 font-medium text-2xl gap-7 relative ${dropdownClasses}`}>
          {/* Navigation Items */}

                {/**Visits Lists */}
              <li
  onMouseEnter={() => setDropdownMenu("visits")}
  ref={visitsRef}
  className={`relative flex flex-row items-center group hover:text-red-500`}
>
  
  <span className='z-20'>Visits</span>
  <UilAngleDown
     className="ml-2 transform transition-transform z-20 text-sm md:text-xl duration-300 ease-in-out group-hover:rotate-180"
  />
  {dropdownMenu === "visits" && (
    <div className="visits bg-white w-screen h-[19rem] md:h-[30rem] absolute right-0 -left-36 transform -translate-x-1/2 top-0 flex">
        {/* Left side (50%) with vertical split */}
    <div className="w-1/3 md:w-1/2 flex flex-col">
        <div className="h-1/3 flex"></div>

        <div className="bg-gray-200 w-full h-96 flex">
          <div className="mt-10 px-10 hidden md:block">
            <img
              className="w-88 h-88"
              src="/About-End.jpeg"
              alt="Art Institute of Chicago"
            />
          </div>
          <div className="mt-5 ml-3 p-4">
            <h2 className="text-3xl font-medium">Visit</h2>
            <p className="text-sm md:mt-4 md:text-base">
              Find all the information you need — plus helpful
              <br />
              tips to plan your visit.
            </p>
          </div>
        </div>
      </div>

      {/* Right side (50%) */}
    <div className="w-1/2 bg-white mt-20 md:mt-32 p-4 md:p-10 flex">
      <div className="w-1/2 pr-5 border-r border-black h-[10rem] md:h-[15rem] flex flex-col justify-center">
      <ul className="text-lg md:text-xl font-medium space-y-2 md:space-y-4">
      <li
        onMouseEnter={() => setCurrentOpenMenu(null)}
      >
        <span className="whitespace-nowrap hover:opacity-50">Hours</span>
      </li>

      <li
        className="relative flex items-center"
        onMouseEnter={() => setCurrentOpenMenu("admission")}
        ref={admissionRef}
      >
        <span className="whitespace-nowrap hover:opacity-50">Admission</span>
        <UilAngleRight  className="ml-2" />
        <div className={`visits-admissons absolute left-96 -top-7 w-full ${currentOpenMenu === "admission" ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ul className="text-lg md:text-xl ml-5 md:font-medium whitespace-nowrap space-y-2 md:space-y-4">
            <li className="opacity-100 hover:opacity-50"><a href="#">Museum Map</a></li>
            <li className="opacity-100 hover:opacity-50"><a href="#">Free Daily Tours</a></li>
            <li className="opacity-100 hover:opacity-50"><a href="#">My Museum Tour</a></li>
            <li className="opacity-100 hover:opacity-50"><a href="#">What To See In An Hour</a></li>
            <li className="opacity-100 hover:opacity-50"><a href="#">Shopping and Dining</a></li>
            <li className="opacity-100 hover:opacity-50"><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </li>

      <li
        onMouseEnter={() => setCurrentOpenMenu(null)}
      >
        <span className="whitespace-nowrap hover:opacity-50">Plan Your Visit</span>
      </li>

      <li
        className="relative flex items-center"
        onMouseEnter={() => setCurrentOpenMenu("visiting")}
        ref={visitingRef}
      >
        <span className="whitespace-nowrap hover:opacity-50">Who's Visiting?</span>
        <UilAngleRight  className="md:ml-2" />
        <div className={`visits-admissons absolute left-44 md:left-96 md:-top-32 w-full ${currentOpenMenu === "visiting" ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ul className="text-lg md:text-xl whitespace-nowrap ml-5 font-medium space-y-2 md:space-y-4">
            <li className="opacity-100 hover:opacity-50">First-Time Visitors</li>
            <li className="opacity-100 hover:opacity-50">Families</li>
            <li className="opacity-100 hover:opacity-50">Members</li>
            <li className="opacity-100 hover:opacity-50">Teens</li>
            <li className="opacity-100 hover:opacity-50">Educators</li>
            <li className="opacity-100 hover:opacity-50">Group Visits</li>
          </ul>
        </div>
      </li>

      <li
        onMouseEnter={() => setCurrentOpenMenu(null)}
      >
        <span className="whitespace-nowrap hover:opacity-50">Mobile App</span>
      </li>

      <li
        onMouseEnter={() => setCurrentOpenMenu(null)}
      >
        <span className="hover:opacity-50">Ryan Learning Center</span>
      </li>
    </ul>
  </div>
</div>
    </div>
  )}
</li>






                         {/**Exhibitons Lists */}
<li
  onMouseEnter={() => setDropdownMenu("exhibitions")}
  ref={exhibitionsRef}
  className={`relative flex flex-row items-center group hover:text-red-500`}
>

  <span className="z-20">Exhibitions</span>
  <UilAngleDown
    className="ml-2 transform transition-transform z-20 text-sm md:text-xl duration-300 ease-in-out group-hover:rotate-180"
  />
  {dropdownMenu === "exhibitions" && (
    <div className="exhibitions bg-white w-screen h-[19rem] md:h-[30rem] absolute -left-64 right-0 transform -translate-x-1/2 top-0 flex">
      {/* Left Side */}
      <div className="w-1/2 md:w-1/2 flex flex-col">
      <div className="h-1/3 flex"></div>

      <div className="bg-gray-200 w-full h-96 flex">
          <div className="mt-10 px-10 hidden md:block">
            <img
              className="w-88 h-88"
              src="/About-End.jpeg"
              alt="Art Institute of Chicago"
            />
          </div>
          <div className="mt-5 ml-3 p-4">
            <h2 className="text-3xl font-medium">I Am Me</h2>
            <p className="text-sm md:mt-4 md:text-base">
              Find all the information you need — plus helpful
              <br />
              tips to plan your visit.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-white mt-10 md:mt-36 p-4 md:p-10 flex">
        <div className="w-full md:w-1/2 pr-0 md:pr-5 border-t md:border-t-0 md:border-r border-black h-full md:h-[15rem] flex flex-col justify-center">
          <ul className="text-lg md:text-xl font-medium space-y-2 md:space-y-4">
            <li>
              <span className="hover:opacity-50">Current</span>
            </li>
            <li>
              <span className="hover:opacity-50">Upcoming</span>
            </li>
            <li>
              <span className="hover:opacity-50">Archive</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )}
</li>



                      {/**Artists Lists */}

              <li 
              onMouseEnter={() => setDropdownMenu("Artists")}
              ref={ArtistsRef}
              className={`relative flex flex-row items-center hover:text-red-500 group`}
              >
               <span className='z-20'>Art & Artist</span>
                <UilAngleDown
                   className="md:ml-2 transform z-20 transition-transform text-sm md:text-xl duration-300 ease-in-out group-hover:rotate-180"
                />
                {dropdownMenu === "Artists" && (
          <div className="art bg-white w-screen h-[19rem] md:h-[30rem] absolute -left-[27rem] right-0 transform -translate-x-1/2 top-0 flex">
             {/*Left side (50%) */}
             <div className="w-1/3 md:w-1/2 flex flex-col">
      <div className="h-1/3 flex"></div>
         <div className="bg-gray-200 w-full h-96 flex">
          <div className="mt-10 px-10 hidden md:block">
               <img
                 className="w-88 h-88"
                 src="/About-End.jpeg"
                 alt="Art Institute of Chicago"
               />
             </div>
             <div className="mt-5 ml-3 p-4">
            <h2 className="text-3xl font-medium">Art & Artists</h2>
            <p className="text-sm md:mt-4 md:text-base">
                Explore the works in our collection and
                 <br />
                 delve deeper in our stories.
               </p>
             </div>
           </div>
         </div>

         {/* Right side (50%) */}
         <div className="w-1/2 bg-white mt-12 md:mt-32 p-4 md:p-10 flex">
      <div className="w-1/2 pr-5 border-r border-black h-[10rem] md:h-[15rem] flex flex-col justify-center">
      <ul className="text-lg md:text-xl font-medium space-y-2 md:space-y-4">
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Artworks</span>
               </li>
   
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Articles & Videos</span>
               </li>

               <li
                 className="relative flex items-center"
                 onMouseEnter={() => setCurrentOpenMenu("admission")}
                 ref={admissionRef}
               >
                 <span className="hover:opacity-50">Research</span>
                 <UilAngleRight  className="ml-2" />
                 {currentOpenMenu === "admission" && (
                   <div
                     className="art-admissions absolute left-96 -top-20 w-full pl-5 transition-all duration-300 opacity-100"
                   >
                     <ul className="text-lg md:text-xl ml-10 whitespace-nowrap md:ml-2 md:font-medium space-y-2 md:space-y-4">
                       <li className="opacity-100 hover:opacity-50"><a href="#">Library</a></li>
                       <li className="opacity-100 hover:opacity-50"><a href="#">Archival Collections</a></li>
                       <li className="opacity-100 hover:opacity-50"><a href="#">Collection Information</a></li>
                       <li className="opacity-100 hover:opacity-50"><a href="#">Conservation & Science</a></li>
                     </ul>
                   </div>
                 )}
               </li>
   
               <li
                 className="relative flex items-center"
                 onMouseEnter={() => setCurrentOpenMenu("visiting")}
                 ref={visitingRef}
               >
                 <span className="hover:opacity-50">Publications</span>
                 <UilAngleRight  className="md:ml-2" />
                 {currentOpenMenu === "visiting" && (
                   <div
                     className="art-admissions absolute left-32 md:left-96 -top-28 w-full pl-5 transition-all duration-300 opacity-100"
                   >
                       <ul className="text-lg md:text-xl ml-10 whitespace-nowrap md:ml-2 md:font-medium space-y-2 md:space-y-4">
                       <li className="opacity-100 hover:opacity-50">Print Catalogues</li>
                       <li className="opacity-100 hover:opacity-50">Digital Information</li>
                     </ul>
                   </div>
                 )}
               </li>
             </ul>
           </div>
         </div>
       </div>
        
        )}
              </li>





                              {/**Events Lists */}
              <li 
               onMouseEnter={() => setDropdownMenu("Events")}
              ref={eventsRef}
              className={`relative flex flex-row items-center hover:text-red-500 group`}
              >
              <span className='z-20'>Events</span>
                <UilAngleDown
                   className="md:ml-2 transform z-20 transition-transform duration-300 text-sm md:text-xl ease-in-out group-hover:rotate-180"
                />
                 {dropdownMenu === "Events" && (
                 <div className="events bg-white w-screen h-[19rem] md:h-[30rem] absolute -left-[38rem] right-0 transform -translate-x-1/2 top-0 flex">
         {/* Left side (50%) with vertical split */}
         <div className="w-1/2 md:w-1/2 flex flex-col">
      <div className="h-1/3 flex"></div>

      <div className="bg-gray-200 w-full h-96 flex">
          <div className="mt-10 px-10 hidden md:block">
               <img
                 className="w-88 h-88"
                 src="/About-End.jpeg"
                 alt="Art Institute of Chicago"
               />
             </div>
             <div className="mt-5 ml-3 p-4">
               <h2 className="text-3xl font-medium">Events</h2>
               <p className="text-sm md:mt-4 md:text-base">
                 Join Us for a wide Range of programs--
                 <br />
                 there's something for visitors of all ages.
               </p>
             </div>
           </div>
         </div>
   
         {/* Right side (50%) */}
         <div className="w-full md:w-1/2 bg-white mt-10 md:mt-36 p-4 md:p-10 flex">
        <div className="w-full md:w-1/2 pr-0 md:pr-5 border-t md:border-t-0 md:border-r border-black h-full md:h-[15rem] flex flex-col justify-center">
          <ul className="text-lg md:text-xl font-medium space-y-2 md:space-y-4">
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Calendar</span>
               </li>
   
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Daily Tours</span>
               </li>
   
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Talks</span>
               </li>
   
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Art-Making</span>
               </li>
   
               <li
                 onMouseEnter={() => setCurrentOpenMenu(null)} // Close all menus
               >
                 <span className="hover:opacity-50">Member Programs</span>
               </li>
             </ul>
           </div>
         </div>
       </div>
        
        )}
              </li>




              {/* Search Icon */}
              <li
              className="relative flex flex-row z-30 items-center hover:text-red-500 group"
              >
                <span className='z-20'>
                <UilSearch className="hover:text-red-500 text-sm z-30 md:text-xl" />
                </span>
              </li>
            </ul>
            </div>
          </div>
        </div>
        </div>
        </nav>

        <div className="relative flex flex-col z-10 items-center justify-center h-full text-white dark:text-red-500 p-4">
          <h2 className="text-center text-3xl md:text-5xl lg:text-6xl">
            Welcome To The Art Institute Of Chicago
          </h2>
          <button
            className="bg-white mt-3 text-red-500 border-black border-1 p-2 md:p-4"
          >
            Plan Your Visit
          </button>
        </div>
      </div>
    <Testimonials />
    <Intro />
    <Exhibitions />
    <Newsletter />
    </div>
  );
}