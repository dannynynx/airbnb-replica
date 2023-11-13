import React, { useState, useEffect } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';

import x from '../assets/x.svg';

import { postNewListing, getAllListings } from '../helpers/helpers';

const HostedListings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError();
  };

  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [amenities, setAmenities] = useState('');
  const [error, setError] = React.useState('');

  const [listings, setListings] = useState([]);

  useEffect(() => {
    allListings();
  }, []);

  const address = {
    street,
    city,
    state,
    postcode,
    country,
  };

  const metadata = {
    propertyType,
    bathrooms,
    amenities,
  }

  const newListing = async () => {
    const body = {
      title,
      address,
      price,
      thumbnail,
      metadata,
    };
    const data = await postNewListing(body);
    if (data.error) {
      setError(data.error);
    } else {
      closeModal();
    }
  };

  const allListings = async () => {
    const data = await getAllListings();
    if (data.error) {
      console.log(data.error);
    } else {
      setListings(data.listings);
      console.log(data.listings);
    }
  };

  return (
    <div className='flex flex-col mt-[88px] px-20 py-8 gap-8'>
      <div className='flex flex-row justify-between'>
        <b className='text-3xl'>Your Hosted Listings</b>
        <div className='flex flex-col w-36'>
          <Button label="+ Create Listing" onClick={openModal} />
        </div>
      </div>
      <div id='hostedListings'></div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm">
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Create Listing</b>
              </div>
              <div className='flex flex-1 justify-end'>
                <button
                  className='grid rounded-md w-6 h-6 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] place-items-center transition-all duration-300'
                  onClick={closeModal}>
                  <img className='w-4/5 h-4/5' src={x} alt='Close Button' />
                </button>
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-2 gap-4'>
              <Input id="Title" type="text" setId={setTitle} />
              <Input id="Street" type="text" setId={setStreet} />
              <Input id="Price" type="text" setId={setPrice} />
              <Input id="City" type="text" setId={setCity} />
              <Input id="Property Type" type="text" setId={setPropertyType} />
              <Input id="State" type="text" setId={setState} />
              <Input id="Bathrooms" type="text" setId={setBathrooms} />
              <Input id="Postcode" type="text" setId={setPostcode} />
              <Input id="Amenities" type="text" setId={setAmenities} />
              <Input id="Country" type="text" setId={setCountry} />
            </div>
            <Input id="Thumbnail(s)" type="image" setId={setThumbnail} />
            <ImageUpload/>
            <hr className="my-1" />
            {error && (
              <div className="bg-red-100 px-4 py-2 text-sm rounded-md">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <Button label="CREATE" onClick={newListing} />
          </div>
        </div>
      )}

      <div id='hostedListings'>
        {listings.map((listing) => (
          <div key={listing.id} className="border p-4 rounded-md mb-4">
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p>Address: {listing.address.street}, {listing.address.city} {listing.address.state} {listing.address.postcode}, {listing.address.country}</p>
            <p>Price: ${listing.price}</p>
            {/* Display the first uploaded image as a thumbnail */}
            {listing.thumbnail && <img src={listing.thumbnail} alt={listing.title} className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostedListings;
