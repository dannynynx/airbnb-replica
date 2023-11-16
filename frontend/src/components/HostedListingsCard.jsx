import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import beds from '../assets/beds.svg';
import bathroom from '../assets/bathroom.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/trash.svg';

import Button from '../components/Button';
import Input from '../components/Input';
import x from '../assets/x.svg';

import { deleteDeleteListing, putUpdateListingAvails } from '../helpers/helpers';

const HostedListingsCard = ({ listing, refresh }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [availabilityDates, setAvailabilityDates] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refresh();
  };

  const deleteListing = async () => {
    const data = await deleteDeleteListing(token, listing.id);
    if (data.error) {
      console.log(data.error);
    } else {
      refresh();
    }
  };

  const addAvailability = () => {
    if (selectedStartDate && selectedEndDate) {
      console.log(selectedStartDate)
      console.log(selectedEndDate)
      const range = { start: selectedStartDate, end: selectedEndDate }
      updateAvails(range);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  const isLive = () => {
    return (listing.availability.length > 0)
  }

  const updateAvails = async (range) => {
    const body = {
      availability: [
        range
      ],
    };
    console.log(body)
    try {
      const data = await putUpdateListingAvails(token, listing.id, body);
      if (data.error) {
        console.log(data.error);
      } else {
        closeModal();
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  return (
    <div className='flex flex-row border-2 border-black/10 p-4 gap-4 rounded-lg items-center'>
      <img
        src={listing.thumbnail}
        alt={`${listing.title} Thumbnail`}
        className='rounded-md object-cover w-[21rem] h-[14rem] mr-2'
      />
      <div className='flex flex-col gap-4 grow justify-center'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>{listing.title}</h2>
            <i>{listing.metadata.propertyType}</i>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col w-[38px]'>
              <button
                className='rounded-md p-2 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] transition-all duration-300'
                onClick={() => deleteListing(listing.id)}>
                <img src={deleteIcon} alt='Delete Icon' />
              </button>
            </div>
            <div className='flex flex-col w-[38px]'>
                <button
                  className='rounded-md p-2 bg-[#FE375B] text-white border border-[#FE375B] hover:bg-[#D52E49] transition-all duration-300'
                  onClick={() => navigate(`/my-listings/${listing.id}`)}>
                  <img src={editIcon} alt='Edit Icon' />
                </button>
            </div>
          </div>
        </div>
        <p>Reviews: {listing.reviews.length}</p>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-row gap-2 border border-[#FE375B] text-[#FE375B] p-2 rounded-md whitespace-no-wrap'>
            <img src={beds} alt="Bed Logo" />
            <p>
              {listing.metadata.beds} {listing.metadata.beds === '1' ? 'Bed' : 'Beds'}
            </p>
          </div>
          <div className='flex flex-row gap-2 border border-[#FE375B] text-[#FE375B] p-2 rounded-md'>
            <img src={bathroom} alt="Bathroom Logo" />
            <p>
              {listing.metadata.bathrooms} {listing.metadata.bathrooms === '1' ? 'Bathroom' : 'Bathrooms'}
            </p>
          </div>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <b className='text-2xl'>${listing.price}</b>
          <p className='text-black/75'>AUD per night</p>
        </div>
        <button
          className={`rounded-md py-2 px-4 ${
            isLive() ? 'bg-white text-[#FE375B] border border-[#FE375B] pointer-events-none' : 'bg-[#FE375B] text-white border border-[#FE375B] hover:bg-[#D52E49]'
          } transition-all duration-300 font-bold text-sm`}
          type='button'
          onClick={openModal}
        >
          {isLive() ? 'LIVE' : 'GO LIVE'}
        </button>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Select Dates</b>
              </div>
              <div className='flex flex-1 justify-end'>
                <button
                  className='grid rounded-md w-6 h-6 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] place-items-center transition-all duration-300'
                  onClick={closeModal}>
                  <img className='w-4/5 h-4/5' src={x} alt='Close Button' />
                </button>
              </div>
            </div>
            <hr/>
            <div className='grid grid-cols-2 gap-4'>
                <Input id='Start Date (YYYY-MM-DD)' type='text' setId={setSelectedStartDate} />
                <Input id='End Date (YYYY-MM-DD)' type='text' setId={setSelectedEndDate}/>
            </div>
            <hr className='my-1' />
            <Button label="Add Availability" onClick={addAvailability} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HostedListingsCard;
