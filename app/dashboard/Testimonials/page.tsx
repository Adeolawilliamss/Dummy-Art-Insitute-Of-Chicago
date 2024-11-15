"use client"
import { useState, useEffect } from 'react';
import { UilClockNine } from "@iconscout/react-unicons";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Art enables us to find ourselves and lose ourselves at the same time.",
      author: "Thomas Merton",
      role: "Author & Philosopher",
    },
    {
      quote: "Creativity takes courage, and there’s nothing quite like expressing it through art.",
      author: "Henri Matisse",
      role: "Artist",
    },
    {
      quote: "Every artist dips their brush in their own soul, and paints their own nature into their pictures.",
      author: "Henry Ward Beecher",
      role: "Clergyman & Social Reformer",
    },
    {
      quote: "Art is the only way to run away without leaving home.",
      author: "Twyla Tharp",
      role: "Dancer & Choreographer",
    },
    {
      quote: "Art washes away from the soul the dust of everyday life.",
      author: "Pablo Picasso",
      role: "Artist",
    },
  ];
  

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true); // To control fade effect

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setFade(false);
    }, 7000);

    const changeContentTimeout = setTimeout(() => {
      setFade(true);
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 9000);
    return () => {
      clearTimeout(fadeOutTimeout)
      clearTimeout(changeContentTimeout)
    };
  }, [current, testimonials.length]);

  return (
    <div className='mb-4 min-h-full'>
        <div className='container mx-auto px-4'>
            <div className='flex flex-row gap-2'>
            <UilClockNine
            className="mt-5"/>
            <h2 className='text-xl mt-5'>Open Today</h2>
            </div>
        <section className="text-center p-6">
      <div>
      <article className="mt-10 md:mt-8 text-2xl md:text-4xl">
        <blockquote className={`transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          &ldquo;{testimonials[current].quote}&rdquo;
          <div className="mt-4 text-lg md:text-2xl text-gray-600">
            &mdash; {testimonials[current].author}, <span className='text-red-700'>{testimonials[current].role}</span>
          </div>
        </blockquote>
      </article>
      </div>
    </section>
        </div>
    </div>
  );
}
