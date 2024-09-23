// import React, { useEffect, useState } from 'react';
// import { useAddCarouselMutation, useDeleteCarouselMutation, useUpdateCarouselMutation } from '../redux/apis/adminApi';
// import { toast } from 'sonner';
// import { useGetCArouselQuery } from '../redux/apis/openApi';
// import Sidebar from './Sidebar';

// const AddCarousel = () => {
//     const [deleteCarousel, { isSuccess: carouselDelete, error: deleteError }] = useDeleteCarouselMutation();
//     const { data, refetch } = useGetCArouselQuery();
//     const [addCarousel, { isSuccess, isLoading }] = useAddCarouselMutation();
//     const [updateCarousel, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateCarouselMutation();
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [imagePreview, setImagePreview] = useState('');
//     const [carouselDetails, setCarouselDetails] = useState({
//         mainHeading: '',
//         paragraph: '',
//         selectedCarousel: {}
//     });

//     const handleFileChange = (event) => {
//         const files = event.target.files;
//         const imageArray = Array.from(files);
//         setSelectedImages(imageArray);
//         if (imageArray.length > 0) {
//             setImagePreview(URL.createObjectURL(imageArray[0]));
//         }
//     };

//     const handleAdd = () => {
//         if (selectedImages.length === 0) {
//             toast.error("No images selected");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('mainHeading', carouselDetails.mainHeading);
//         formData.append('paragraph', carouselDetails.paragraph);
//         selectedImages.forEach(image => {
//             formData.append('image', image);
//         });

//         addCarousel(formData).catch(() => {
//             toast.error("Failed to add carousel");
//         });
//     };

//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Carousel Added Successfully");
//             resetForm();
//             refetch();
//         }
//     }, [isSuccess]);

//     useEffect(() => {
//         if (updateSuccess) {
//             toast.success("Carousel Updated Successfully");
//             refetch();
//         }
//         if (carouselDelete) {
//             toast.success("Carousel Deleted Successfully");
//             refetch();
//         }
//         if (deleteError) {
//             toast.error("Failed to delete carousel");
//         }
//     }, [updateSuccess, carouselDelete, deleteError]);

//     const resetForm = () => {
//         setSelectedImages([]);
//         setImagePreview('');
//         setCarouselDetails({ mainHeading: '', paragraph: '', selectedCarousel: {} });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCarouselDetails(prevDetails => ({
//             ...prevDetails,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="flex bg-light-golden">
//             {/* <Sidebar /> */}

//             <div className="flex-1 p-4 lg:ml-64">
//                 <div className="text-end mb-4">
//                     <button
//                         className="mr-7 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
//                         onClick={() => document.getElementById('add').showModal()}
//                     >
//                         Add Carousel
//                     </button>
//                 </div>

//                 {/* Add Carousel Dialog */}
//                 <dialog id="add" className="modal border-yellow-400 rounded-lg">
//                     <div className="modal-box max-w-4xl relative">
//                         <h3 className="text-xl font-bold text-yellow-600">Add Carousel Image</h3>
//                         <input type="file" accept="image/*" onChange={handleFileChange} className="file-input w-full mt-4" />
//                         {selectedImages.length > 0 && (
//                             <div className="mt-4 max-h-[60vh] overflow-y-auto relative">
//                                 <img src={imagePreview} alt="Selected" className="w-full max-w-full h-auto object-cover" />
//                             </div>
//                         )}
//                         <div className="mt-4">
//                             <input
//                                 type="text"
//                                 name="mainHeading"
//                                 placeholder="Main Heading"
//                                 value={carouselDetails.mainHeading}
//                                 onChange={handleInputChange}
//                                 className="input input-bordered w-full mb-4"
//                             />
//                             <textarea
//                                 name="paragraph"
//                                 placeholder="Paragraph"
//                                 value={carouselDetails.paragraph}
//                                 onChange={handleInputChange}
//                                 className="textarea textarea-bordered w-full"
//                             />
//                         </div>
//                         <div className="modal-action">
//                             <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500" onClick={() => document.getElementById('add').close()}>
//                                 Close
//                             </button>
//                             <button onClick={handleAdd} className="bg-amber-500 mx-3 text-white px-4 py-2 rounded-lg hover:bg-yellow-500">
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </dialog>

//                 {/* Carousel Table */}
//                 <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4">
//                     <table className="w-full text-sm text-left text-gray-500">
//                         <thead className="text-xs text-gray-700 uppercase bg-light-golden">
//                             <tr>
//                                 <th className="p-3">#</th>
//                                 <th className="p-3">Image</th>
//                                 <th className="p-3">Main Heading</th>
//                                 <th className="p-3">Paragraph</th>
//                                 <th className="p-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data && data.map((item, i) => (
//                                 <tr key={item.id}>
//                                     <td className="p-3 text-gray-800">{i + 1}</td>
//                                     <td className="p-3 text-gray-800">
//                                         <img src={item.image} alt="Carousel" className="w-48 h-48 object-cover rounded" />
//                                     </td>
//                                     <td className="p-3 text-gray-800">{item.mainHeading}</td>
//                                     <td className="p-3 text-gray-800">{item.paragraph}</td>
//                                     <td className="p-3 text-gray-800">
//                                         <button onClick={() => { setCarouselDetails(item); setImagePreview(item.image); document.getElementById('update').showModal(); }} className="btn bg-green-300">Edit</button>
//                                         <button onClick={() => deleteCarousel(item._id)} className="btn bg-red-500">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Mobile sidebar toggle */}
//             <div className="lg:hidden fixed bottom-5 left-5 z-40">
//                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-yellow-400 p-3 rounded-full shadow-lg">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddCarousel;







import React, { useEffect, useState } from 'react';
import { useAddCarouselMutation, useDeleteCarouselMutation, useUpdateCarouselMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { useGetCArouselQuery } from '../redux/apis/openApi';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
// import { useGetCArouselQuery } from '../redux/apis/userApi';

const AddCarousel = () => {
    const [deleteCarousel, { isSuccess: carouselDelete, error: deleteError }] = useDeleteCarouselMutation();
    const { data, refetch } = useGetCArouselQuery();
    const [addCarousel, { isSuccess, isLoading }] = useAddCarouselMutation();
    const [updateCarousel, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateCarouselMutation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

    const [carouselDetails, setCarouselDetails] = useState({
        mainHeading: '',
        paragraph: '',
        selectedCarousel: {}
    });

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files);
        setSelectedImages(imageArray);
        if (imageArray.length > 0) {
            setImagePreview(URL.createObjectURL(imageArray[0]));
        }
    };

    const handleAdd = () => {
        if (selectedImages.length === 0) {
            toast.error("No images selected");
            return;
        }

        const formData = new FormData();
        formData.append('mainHeading', carouselDetails.mainHeading);
        formData.append('paragraph', carouselDetails.paragraph);
        selectedImages.forEach(image => {
            formData.append('image', image);
        });

        try {
            addCarousel(formData);
        } catch (error) {
            toast.error("Failed to add carousel");
        }
    };

    // const handleUpdate = () => ;

    useEffect(() => {
        if (isSuccess) {
            toast.success("Carousel Added Successfully");
            document.getElementById("add").close();

            setSelectedImages([]);
            setImagePreview('');
            setCarouselDetails({
                mainHeading: '',
                paragraph: '',
                selectedCarousel: {}
            });
            refetch();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Carousel Updated Successfully");
            document.getElementById("update").close();
            refetch();
        }
        if (carouselDelete) {
            toast.success("Carousel Deleted Successfully");
            refetch();
        }
        if (deleteError) {
            toast.error("Failed to delete carousel");
        }
    }, [isSuccess, updateSuccess, carouselDelete, deleteError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarouselDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };


    useEffect(() => {
        if (updateSuccess) {
            toast.success("Carousel Update success")
            document.getElementById("update").close()
        }
    }, [updateSuccess])

    return (
        <>
            <div className='bg-light-golden  '>
                {/* <Outlet /> */}
                <div className='p-4'>
                    <div className="text-end mb-4">
                        <button
                            className="mr-7 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                            onClick={() => document.getElementById('add').showModal()}
                        >
                            Add Carousel
                        </button>
                    </div>

                    {/* Add Carousel */}
                    <dialog id="add" className="modal border-yellow-400 rounded-lg">
                        <div className="modal-box max-w-4xl relative">
                            <h3 className="text-xl font-bold text-yellow-600">Add Carousel Image</h3>

                            {isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                                    <div className="text-white text-lg">Loading...</div>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input w-full mt-4"
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="mt-4 max-h-[60vh] overflow-y-auto relative">
                                            <div className="flex flex-col items-start justify-center absolute inset-0 p-8">
                                                <h2 className="text-2xl font-bold text-white">{carouselDetails.mainHeading}</h2>
                                                <p className="text-lg mt-2 text-white">{carouselDetails.paragraph}</p>
                                            </div>
                                            <img
                                                src={URL.createObjectURL(selectedImages[0])}
                                                alt="Selected"
                                                className="w-full max-w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="mainHeading"
                                            placeholder="Main Heading"
                                            value={carouselDetails.mainHeading}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full mb-4"
                                        />
                                        <textarea
                                            name="paragraph"
                                            placeholder="Paragraph"
                                            value={carouselDetails.paragraph}
                                            onChange={handleInputChange}
                                            className="textarea textarea-bordered w-full"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="modal-action">
                                <button
                                    className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                    onClick={() => document.getElementById('add').close()}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="bg-amber-500 mx-3 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </dialog>

                    {/* update carousel */}
                    <dialog id="update" className="modal border-yellow-400 rounded-lg">
                        <div className="modal-box max-w-4xl relative">
                            <h3 className="text-xl font-bold text-yellow-600">Update Carousel Image</h3>

                            {updateLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                                    <div className="text-white text-lg">Loading...</div>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input w-full mt-4"
                                    />
                                    {imagePreview && (
                                        <div className="mt-4 max-h-[60vh] overflow-y-auto relative">
                                            <div className="flex flex-col items-start justify-center absolute inset-0 p-8">
                                                <h2 className="text-2xl font-bold text-white">{carouselDetails.mainHeading}</h2>
                                                <p className="text-lg mt-2 text-white">{carouselDetails.paragraph}</p>
                                            </div>
                                            <img
                                                src={imagePreview}
                                                alt="Selected"
                                                className="w-full max-w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="mainHeading"
                                            placeholder="Main Heading"
                                            value={carouselDetails.mainHeading}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full mb-4"
                                        />
                                        <textarea
                                            name="paragraph"
                                            placeholder="Paragraph"
                                            value={carouselDetails.paragraph}
                                            onChange={handleInputChange}
                                            className="textarea textarea-bordered w-full"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="modal-action">
                                <button
                                    className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                    onClick={() => document.getElementById('update').close()}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={e => {
                                        const formData = new FormData();
                                        formData.append('carouselId', carouselDetails._id);
                                        formData.append('mainHeading', carouselDetails.mainHeading);
                                        formData.append('paragraph', carouselDetails.paragraph);
                                        if (selectedImages.length > 0) {
                                            formData.append('image', selectedImages[0]);
                                        }

                                        // updateCarousel(formData);
                                    }}
                                    className="bg-amber-500 mx-3 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </dialog>

                    {/* Table for larger screens */}
                    <div className="hidden lg:block overflow-x-auto shadow-md sm:rounded-lg mb-4">
                        <table className="w-full text-sm text-left text-gray-500 border-spacing-2">
                            <thead className="text-xs text-gray-700 uppercase bg-light-golden">
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden uppercase border-b border-gray-600">
                                    <th className="p-3 font-bold uppercase text-gray-600">#</th>
                                    <th className="p-3 font-bold uppercase text-gray-600">Image</th>
                                    <th className="p-3 font-bold uppercase text-gray-600">Main Heading</th>
                                    <th className="p-3 font-bold uppercase text-gray-600">Paragraph</th>
                                    <th className="p-3 font-bold uppercase text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item, i) => (
                                    <tr key={item.id} className="hover:bg-light-golden transition">
                                        <td className="p-3 text-gray-800 text-center border-b">{i + 1}</td>
                                        <td className="p-3 text-gray-800 text-center border-b">
                                            <img
                                                src={item.image} // Replace with appropriate image URL
                                                alt="Carousel"
                                                className="w-60  object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-3 text-gray-800 text-center border-b">{item.mainHeading}</td>
                                        <td className="p-3 text-gray-800 text-center border-b">{item.paragraph}</td>
                                        <td className="p-3 text-gray-800 text-center border-b">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCarouselDetails(item);
                                                    setImagePreview(item.image);
                                                    document.getElementById('update').showModal();
                                                }}
                                                className="btn bg-green-300 hover:bg-green-400 transition mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteCarousel(item._id)}
                                                className="btn bg-red-500 hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for small screens */}
                    <div className="lg:hidden grid grid-cols-1 gap-4">
                        {data && data.map((item, i) => (
                            <div key={item.id} className="bg-light-golden shadow-lg rounded-lg p-4">
                                <img
                                    src={item.image} // Replace with appropriate image URL
                                    alt="Carousel"
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-lg font-bold text-gray-800 mb-2">{item.mainHeading}</h4>
                                <p className="text-gray-600">{item.paragraph}</p>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCarouselDetails(item);
                                            setImagePreview(item.image);
                                            document.getElementById('update').showModal();
                                        }}
                                        className="bg-green-300 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteCarousel(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCarousel;
