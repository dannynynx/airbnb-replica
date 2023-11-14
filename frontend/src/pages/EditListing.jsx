import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import HostedListingsCard from '../components/HostedListingsCard';

import x from '../assets/x.svg';

import { postNewListing, getAllListings, getListing } from '../helpers/helpers';
import { useContext, Context } from '../helpers/context';

const EditListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setStreet('');
    setCity('');
    setState('');
    setPostcode('');
    setCountry('');
    setPrice('');
    setThumbnail('');
    setPropertyType('');
    setBeds('');
    setBedrooms('');
    setBathrooms('');
    setAmenities('');
    setError('');
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
  const [beds, setBeds] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [amenities, setAmenities] = useState('');
  const [images] = useState([]);
  const [error, setError] = useState('');
  const [listings, setListings] = useState([]);
  const { getters } = useContext(Context);

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
    beds,
    bedrooms,
    amenities,
    images,
  };

  const newListing = async () => {
    if (title === '') {
      setError('A valid title is required in order to create a listing');
      return;
    }
    if (street === '' || city === '' || state === '' || postcode === '' || country === '') {
      setError('A valid address is required in order to create a listing');
      return;
    }
    if (price === '') {
      setError('A valid price is required in order to create a listing');
      return;
    }
    if (propertyType === '') {
      setError('A valid property type is required in order to create a listing');
      return;
    }
    if (bathrooms === '') {
      setError('A valid number of bathrooms is required in order to create a listing');
      return;
    }
    if (beds === '') {
      setError('A valid number of beds is required in order to create a listing');
      return;
    }
    if (bedrooms === '') {
      setError('A valid number of bedrooms is required in order to create a listing');
      return;
    }
    if (!thumbnail) {
      setError('A thumbnail is required in order to create a listing');
      return;
    }
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
      await allListings();
    }
  };

  const allListings = async () => {
    try {
      const data = await getAllListings();
      if (data.error) {
        console.error(data.error);
      } else {
        console.log(id);
        const userOwnedListings = data.listings.filter(listing => listing.owner === getters.userEmail);
        const userOwnedListingsWithData = await Promise.all(
          userOwnedListings.map(async (listing) => {
            const userOwnedListingData = await getListing(listing.id);
            const userOwnedListingWithId = { ...userOwnedListingData.listing, id: listing.id };
            console.log(userOwnedListingWithId);
            return userOwnedListingWithId;
          })
        );
        setListings(userOwnedListingsWithData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col mt-[88px] px-20 py-8 gap-8'>
      <div className='flex flex-row justify-between'>
        <b className='text-3xl'>EDIT LISTING ID {id}</b>
        <div className='flex flex-col w-36'>
          <Button label='+ Create Listing' onClick={openModal} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {listings.map((listing) => (
          <HostedListingsCard
            key={listing.id}
            listing={listing}
            refresh={allListings}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
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
              <Input id='Title' type='text' setId={setTitle} />
              <Input id='Street' type='text' setId={setStreet} />
              <Input id='Price' type='text' setId={setPrice} />
              <Input id='City' type='text' setId={setCity} />
              <Input id='Property Type' type='text' setId={setPropertyType} />
              <Input id='State' type='text' setId={setState} />
              <Input id='Amenities' type='text' setId={setAmenities} />
              <Input id='Postcode' type='text' setId={setPostcode} />
              <Input id='Bathroom(s)' type='text' setId={setBathrooms} />
              <Input id='Country' type='text' setId={setCountry} />
              <Input id='Bed(s)' type='text' setId={setBeds} />
              <Input id='Bedroom(s)' type='text' setId={setBedrooms} />
            </div>
            <ImageUpload onImageUpload={setThumbnail} />
            <hr className='my-1' />
            {error && (
              <div className='bg-red-100 px-4 py-2 text-sm rounded-md'>
                <p className='text-red-500'>{error}</p>
              </div>
            )}
            <Button label='CREATE' onClick={newListing} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditListing;
