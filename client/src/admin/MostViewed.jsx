import React from 'react';
import { useGetMostViewedQuery } from '../redux/apis/adminApi';

const MostViewed = () => {
    const { data } = useGetMostViewedQuery();
    // console.log(data);

    return (
        <div className="bg-light-golden text-gray-800 p-6 rounded-lg w-3/4 mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Most Viewed Pages</h2>
            <ul className="list-none p-0">
                {data?.map((item, index) => (
                    <li
                        key={index}
                        className="bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center"
                    >
                        <span className="text-lg">
                            Page: <strong>{item._id}</strong>
                        </span>
                        <span className="text-lg font-semibold text-golden-text">
                            {item.numberOfUsers} users
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostViewed;
