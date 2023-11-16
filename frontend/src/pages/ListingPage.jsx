import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import x from '../assets/x.svg';

import { getListing } from '../helpers/helpers';

const ListingPage = () => {
  const [listingInfo, setListingInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIfLoggedOpen, setIsIfLoggedOpen] = useState(false);
  const [reservedStartDate, setReservedStartDate] = useState(null);
  const [reservedEndDate, setReservedEndDate] = useState(null);
  console.log(listingInfo);
  const { id } = useParams();
  // const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openIfLogged = () => {
    setIsIfLoggedOpen(true);
  };

  const closeIfLogged = () => {
    setIsIfLoggedOpen(false);
  };

  useEffect(() => {
    const fetchListingInfo = async () => {
      try {
        const data = await getListing(id);
        if (data.error) {
          console.log(data.error);
        } else {
          setListingInfo(data.listing);
        }
      } catch (error) {
        console.error('Error fetching listing information:', error);
      }
    };

    fetchListingInfo();
  }, [id]);

  if (!listingInfo) {
    return <div>Error: Couldnt Find the page you were looking for</div>
  }

  const reserveDate = async () => {
    console.log('going through');
    if (token === null) {
      openIfLogged();
    } else {
      openModal();
    }
  };

  const addReservation = () => {
    if (reservedStartDate && reservedEndDate) {
      // not sure how to add this section
      console.log('checking')
    }
  };

  return (
    <div className='flex flex-col mt-[88px] px-20 py-8 gap-2'>
      <p>ID: { id }</p>
      <p>Title: { listingInfo.title }</p>
      <p>Owner: { listingInfo.owner }</p>
      <p>Street: { listingInfo.address.street }</p>
      <p>City: { listingInfo.address.city }</p>
      <p>State: { listingInfo.address.state }</p>
      <p>Postcode: { listingInfo.address.postcode }</p>
      <p>Country: { listingInfo.address.country }</p>
      <p>Price: { listingInfo.price }</p>
      <p>Thumbnail: { listingInfo.thumbnail }</p>
      <p>Property Type: { listingInfo.metadata.propertyType }</p>
      <p>Bathrooms: { listingInfo.metadata.bathrooms }</p>
      <p>Beds: { listingInfo.metadata.beds }</p>
      <p>Bedrooms: { listingInfo.metadata.bedrooms }</p>
      <p>Amenities: { listingInfo.metadata.amenities }</p>
      <p>Images: { listingInfo.metadata.images }</p>
      <p>Reviews: { listingInfo.reviews }</p>
      {/* <p>Availability: { listingInfo.availability[0].start }</p>
      <p>Availability: { listingInfo.availability[0].end }</p> */}
      <p>Published: { listingInfo.published }</p>
      <p>Posted On: { listingInfo.postedOn }</p>
      <Button label='Reserve' onClick={reserveDate} />
      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Select Reservation Dates</b>
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
                <Input id='Start Date (YYYY-MM-DD)' type='text' setId={setReservedStartDate} />
                <Input id='End Date (YYYY-MM-DD)' type='text' setId={setReservedEndDate}/>
            </div>
            <hr className='my-1' />
            <Button label="Add Reservation" onClick={addReservation} />
          </div>
        </div>
      )}
      {isIfLoggedOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Please Log-in before reserving</b>
              </div>
              <div className='flex flex-1 justify-end'>
                <button
                  className='grid rounded-md w-6 h-6 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] place-items-center transition-all duration-300'
                  onClick={closeIfLogged}>
                  <img className='w-4/5 h-4/5' src={x} alt='Close Button' />
                </button>
              </div>
            </div>
            <Button label="Close" onClick={closeIfLogged} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
