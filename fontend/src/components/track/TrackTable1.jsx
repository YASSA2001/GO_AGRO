import React from 'react'
import { Link } from 'react-router-dom';

export const TrackTable1 = ({tracks}) => {
    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md text-center">No</th>
                    <th className="border border-slate-600 rounded-mdtext-center">Order ID</th>
                    <th className="border border-slate-600 rounded-md text-center">Address</th>
                    <th className="border border-slate-600 rounded-md text-center">Status</th>
                    <th className="border border-slate-600 rounded-md text-center">Operations</th>

                </tr>

            </thead>
            <tbody>
                {tracks.map((track, index) => (
                    <tr key={track._id} className='h-8'>
                        <td className="border border-slate-700 rounded-md text-center">
                            {index + 1}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {track.OrderId}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {track.address}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {track.status}
                        </td>

                        <td className="border border-slate-700 rounded-md text-center">
                            <div className="flex justify-center gap-x-4">
                                
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}
