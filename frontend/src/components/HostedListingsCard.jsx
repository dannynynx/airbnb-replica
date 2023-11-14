import React from 'react';

import beds from '../assets/beds.svg';
import bathroom from '../assets/bathroom.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/trash.svg';

import { deleteDeleteListing } from '../helpers/helpers';

const HostedListingsCard = ({ listing, refresh, openEditModal }) => {
  const token = localStorage.getItem('token');

  const deleteListing = async () => {
    const data = await deleteDeleteListing(token, listing.id);
    if (data.error) {
      console.log(data.error);
    } else {
      refresh();
    }
  };

  return (
    <div className='flex flex-row border-2 p-4 gap-4 rounded-lg items-center'>
      <img
        src={listing.thumbnail}
        alt={`${listing.title} Thumbnail`}
        className='rounded-md object-cover w-[21rem] h-[14rem] mr-2'
      />
      <div className='flex flex-col gap-4 grow justify-center'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <i>{listing.metadata.propertyType}</i>
            <h2 className='text-2xl font-bold'>{listing.title}</h2>
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
              {/* Edit Button */}
              <button
                className='rounded-md p-2 bg-[#FE375B] text-white border border-[#FE375B] hover:bg-[#D52E49] transition-all duration-300'
                onClick={() => openEditModal(listing)}>
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
      </div>
    </div>
  );
};

export default HostedListingsCard;
