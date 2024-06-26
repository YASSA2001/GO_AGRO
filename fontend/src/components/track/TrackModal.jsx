import { AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5'; // Example import from another icon library

const TrackModal = ({ track, onClose }) => {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'>
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose} />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {track.address}
        </h2>
        <h4 className="my-2 text-gray-500">{track._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <IoLocationOutline className='text-red-300 text-2xl' /> {/* Example icon */}
          <h2 className="my-1">{track.OrderId}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <IoLocationOutline className='text-red-300 text-2xl' /> {/* Example icon */}
          <h2 className="my-1">{track.address}</h2>
        </div>
        <p className='mt-4'>Anything you want to show</p>
        <p className='my-2'></p>
      </div>
    </div>
  )
}

export default TrackModal
