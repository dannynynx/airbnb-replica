import React, { useState, useEffect } from 'react';
import LandingCard from '../components/LandingCard';
import search from '../assets/search.svg';
import { getAllListings, getListing } from '../helpers/helpers';

const Landing = () => {
  const [listings, setListings] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    allListings();
  }, []);

  const allListings = async () => {
    try {
      const data = await getAllListings();
      if (data.error) {
        console.error(data.error);
      } else {
        const allListingsWithData = await Promise.all(
          data.listings.map(async (listing) => {
            const listingData = await getListing(listing.id);
            const listingWithId = { ...listingData.listing, id: listing.id };
            return listingWithId;
          })
        );

        const sortedListings = allListingsWithData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setListings(sortedListings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredListings = listings.filter((listing) => {
    const lowerCaseInput = inputValue.toLowerCase();
    return (
      listing.title.toLowerCase().includes(lowerCaseInput) ||
      listing.address.city.toLowerCase().includes(lowerCaseInput)
    );
  });

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (inputValue.trim() === '') {
      setInputValue('');
    }
  };

  return (
    <>
      {isInputFocused && (
        <div
          className={`absolute inset-0 w-full h-full z-[-1] bg-black backdrop-blur-sm transition-opacity duration-1000 ease-in-out ${
            isInputFocused ? 'opacity-20' : 'opacity-0'
          }`}
          onClick={handleInputBlur}
        />
      )}
      <div className="relative">
        <div className="flex flex-col items-center h-full mt-[88px] px-4 md:px-20 py-8 gap-8 transition-all duration-500 relative">
          <div className={`flex flex-row self-center p-2 rounded-full border-2 border-black/10 bg-white gap-2 max-w-2xl w-full transition-all duration-500 ${isInputFocused ? 'max-w-full' : 'max-w-2xl'}`}>
            <input
              type="text"
              className="flex grow rounded-full px-4 outline-none transition-all duration-500"
              placeholder="Search for listing places/locations"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={() => {
                if (inputValue.trim() === '') {
                  handleInputBlur();
                }
              }}
            />
            <button
              className="rounded-full p-2 bg-[#FE375B] text-white border border-[#FE375B] hover:bg-[#D52E49] transition-all duration-500 font-bold text-sm"
            >
              <img src={search} alt="Search Icon" />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {filteredListings.map((listing) => (
              <LandingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
