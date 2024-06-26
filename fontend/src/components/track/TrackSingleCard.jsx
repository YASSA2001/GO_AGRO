import React, { useState } from 'react'; // Import React and useState
import { Link } from "react-router-dom";
import { IoLocationOutline } from 'react-icons/io5';
import { BiShow, BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai"; // Corrected import
import { MdDeleteOutline } from "react-icons/md"; // Corrected import
import TrackModal from "./TrackModal";

const TrackSingleCard = ({ track }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={track._id} // Changed from item._id to track._id
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {track.OrderId}
      </h2>
      <h4 className="my-2 text-gray-500">{track._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className='text-red-300 text-2xl'/> {/* Updated icon */}
        <h2 className="my-1">{track.OrderId}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <IoLocationOutline className='text-red-300 text-2xl'/> {/* Updated icon */}
        <h2 className="my-1">{track.address}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.525 4.477 10 10 10s10-4.475 10-10c0-5.523-4.477-10-10-10zm0 18.75c-4.566 0-8.25-3.683-8.25-8.25S5.434 2.25 10 2.25s8.25 3.684 8.25 8.25-3.684 8.25-8.25 8.25zm0-14a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0V5.5a.75.75 0 00-.75-.75zM9.5 13a1 1 0 11-2 0 1 1 0 012 0zm1.75 0a1 1 0 11-2 0 1 1 0 012 0zm1.75 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
  </svg>
  <h2 className="my-1">{track.status}</h2>
</div>


      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />

        <Link to={`/tracks/details/${track._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/tracks/Edit/${track._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" /> {/* Corrected icon */}
        </Link>
        <Link to={`/tracks/Delete/${track._id}`}>
          <MdDeleteOutline className="text-2xl text-red-600 hover:text-black" /> {/* Corrected icon */}
        </Link>
      </div>

      {showModal && (
        <TrackModal track={track} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TrackSingleCard;
