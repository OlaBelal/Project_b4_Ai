import React from 'react';

const Events = () => {
  const events = [
    {
      name: 'Abu Simbel Sun Festival',
      date: 'February 22 & October 22',
      description: 'A remarkable event where the sun illuminates the inner sanctuary of the Abu Simbel temple.',
      travelTips: 'Book accommodations in advance. Arrive early to secure a good viewing spot.',
      image: 'https://example.com/abu-simbel.jpg', // Replace with actual image URL
    },
    {
      name: 'Cairo International Film Festival',
      date: 'November/December',
      description: 'One of the oldest and most prestigious film festivals in the Middle East.',
      travelTips: 'Check the festival schedule for screenings and events. Purchase tickets in advance.',
      image: 'https://example.com/cairo-film.jpg', // Replace with actual image URL
    },
    {
      name: 'Wafaa Al-Nil Festival',
      date: 'August',
      description: 'An ancient festival celebrating the Nile River, featuring cultural performances and traditional rituals.',
      travelTips: 'Experience local traditions and enjoy the festive atmosphere along the Nile.',
      image: 'https://example.com/wafaa-al-nil.jpg', // Replace with actual image URL
    },
    {
      name: 'Pharaonic Wedding Festival',
      date: 'Varies',
      description: 'A reenactment of an ancient Egyptian wedding, showcasing traditional costumes and ceremonies.',
      travelTips: 'Inquire about the festival dates and locations. Enjoy the vibrant cultural displays.',
      image: 'https://example.com/pharaonic-wedding.jpg', // Replace with actual image URL
    },
    {
      name: 'International Festival for Drums and Traditional Arts',
      date: 'April/May',
      description: 'A celebration of drumming and traditional arts from around the world, held in Cairo.',
      travelTips: 'Attend the diverse performances and workshops. Explore the cultural exchange.',
      image: 'https://example.com/drums-festival.jpg', // Replace with actual image URL
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Famous Events in Egypt</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-6 p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover mb-4" />
            <p className="text-gray-600">{event.date}</p>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2">
              <strong>Travel Tips:</strong> {event.travelTips}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;