import { Link } from "react-router-dom";
import { IoLocationOutline } from 'react-icons/io5'; // Correct import
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import TrackSingleCard from "./TrackSingleCard";


const TracksCard = ({tracks}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tracks.map((item) => (
        <TrackSingleCard key = {item._id} track={item}/>
        
      ))}
    </div>
  )
}

export default TracksCard
