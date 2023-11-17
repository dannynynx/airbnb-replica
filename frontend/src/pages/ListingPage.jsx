import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';

import x from '../assets/x.svg';

import { getListing, postNewBooking, getAllBookings, putNewListingReview } from '../helpers/helpers';
import { useContext, Context } from '../helpers/context';

const ListingPage = () => {
  const [listingInfo, setListingInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIfLoggedOpen, setIsIfLoggedOpen] = useState(false);
  const [reservedStartDate, setReservedStartDate] = useState(null);
  const [reservedEndDate, setReservedEndDate] = useState(null);
  const [isConfirmationScreenOpen, setIsConfirmationScreenOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [reviewComment, setReviewComment] = useState('');
  const [ifBookingAccepted, setIfBookingAccepted] = useState(false);
  const [acceptedBookingId, setAcceptedBookingId] = useState(null);
  const { getters } = useContext(Context);
  // console.log(listingInfo);
  const { id } = useParams();
  // const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const token = localStorage.getItem('token');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmationScreen = () => {
    setIsConfirmationScreenOpen(true);
  };

  const closeConfirmationScreen = () => {
    setIsConfirmationScreenOpen(false);
  };

  const openCreateReview = () => {
    setRating(1);
    setIsCreateReviewOpen(true);
  };

  const closeCreateReview = () => {
    setError('')
    setIsCreateReviewOpen(false);
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

    const allBookings = async () => {
      try {
        const data = await getAllBookings();
        if (data.error) {
          console.error(data.error);
        } else {
          const userOwnedBookings = data.bookings.filter(booking => booking.owner === getters.userEmail);
          setBookings(userOwnedBookings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    allBookings();
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

  const addReview = async () => {
    if (reviewComment === '') {
      setError('A comment is required in order to make a review to the listing')
      return
    }
    if (reviewComment === null) {
      setError('A comment is required in order to make a review to the listing')
      return
    }
    if (token === null) {
      setError('Please log in before adding a review to this listing')
    } else {
      const newReview = { comment: reviewComment, rating };
      const body = {
        review: newReview,
      };
      console.log(body)
      checkIfBookingAccepted();
      if (ifBookingAccepted) {
        putNewListingReview(id, acceptedBookingId, body)
        setError('')
        setReviewComment('');
        setRating(1)
        closeCreateReview();
      } else {
        setError('No reservations have been accepted yet')
      }
    }
  }

  const checkIfBookingAccepted = () => {
    bookings.forEach((booking) => {
      if (booking.listingId === id && booking.status === 'accepted') {
        setIfBookingAccepted(true)
        setAcceptedBookingId(booking.id)
      }
    })
  }

  const addReservation = () => {
    if (!reservedStartDate) {
      setError('A valid start date is required in order to make a booking');
      return
    }
    if (!reservedEndDate) {
      setError('A valid end date is required in order to make a booking');
      return
    }
    if (reservedStartDate && reservedEndDate) {
      if (reservedStartDate < reservedEndDate) {
        const range = { start: reservedStartDate, end: reservedEndDate }
        const start = new Date(reservedStartDate)
        const end = new Date(reservedEndDate)
        const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        const price = nights * listingInfo.price;
        console.log(price)

        postBooking(range, price);
      } else {
        setError('Start date is after end date');
      }
    }
  };

  const postBooking = async (range, price) => {
    const body = {
      dateRange: range,
      totalPrice: price,
    };
    console.log(body)
    try {
      const data = await postNewBooking(id, body);
      if (data.error) {
        setError(data.error)
        console.log(data.error);
      } else {
        setError('');
        closeModal();
        openConfirmationScreen();
      }
    } catch (error) {
      console.error('Error Booking:', error);
    }
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
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
      <Button label="Write a Review" onClick={openCreateReview} />
      <div className='grid grid-cols-4 gap-4'>
        {bookings.map((booking, index) => (
          <div key={index} className='flex flex-row justify-between'>
            { booking.listingId === id
              ? (<><p className='flex flex-col'><b>Booking:</b> {booking.dateRange.start} to {booking.dateRange.end}</p><p className='flex flex-col'><b>Status:</b> {booking.status}</p></>)
              : ('') }
          </div>
        ))}
      </div>
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
                <Input id='Start Date' type='date' setId={setReservedStartDate} />
                <Input id='End Date' type='date' setId={setReservedEndDate}/>
            </div>
            {error && <ErrorMessage message={error} />}
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
              </div>
            </div>
            <Button label="Close" onClick={closeIfLogged} />
          </div>
        </div>
      )}
      {isConfirmationScreenOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Booking Complete</b>
              </div>
              <div className='flex flex-1 justify-end'>
                <button
                  className='grid rounded-md w-6 h-6 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] place-items-center transition-all duration-300'
                  onClick={closeConfirmationScreen}>
                  <img className='w-4/5 h-4/5' src={x} alt='Close Button' />
                </button>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <p>Booking is now accepted, and is currently under review</p>
            </div>
            <Button label="Close" onClick={closeConfirmationScreen} />
          </div>
        </div>
      )}
      {isCreateReviewOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-30 bg-black/20 backdrop-blur-sm'>
          <div className='flex flex-col px-6 py-4 w-[56rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm'>
            <div className='flex flex-row'>
              <div className='flex flex-1'/>
              <div className='flex justify-items-center items-center'>
                <b className='text-center text-base'>Write a Review</b>
              </div>
              <div className='flex flex-1 justify-end'>
                <button
                  className='grid rounded-md w-6 h-6 bg-white text-[#FE375B] border border-[#FE375B] hover:bg-[#ffe1e6] place-items-center transition-all duration-300'
                  onClick={closeCreateReview}>
                  <img className='w-4/5 h-4/5' src={x} alt='Close Button' />
                </button>
              </div>
            </div>
            <hr/>
            <div className='grid grid-cols-1 gap-4'>
                <Input id='Comment' type='text' setId={setReviewComment} />
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span
                      key={index}
                      className={`text-3xl cursor-pointer ${
                        index <= rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      onClick={() => handleStarClick(index)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
            </div>
            {error && <ErrorMessage message={error} />}
            <hr className='my-1' />
            <Button label="Publish Review" onClick={addReview} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
