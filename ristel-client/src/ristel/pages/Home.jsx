import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Button, Carousel, Col, Row, Tab, Nav, Card, Badge, Pagination } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

import MentorHeroGlow from './../../assets/images/mentor/mentor-glow.svg'
import Avatar1 from './../../assets/images/avatar/avatar-1.jpg'
import Avatar2 from './../../assets/images/avatar/avatar-2.jpg'
import Avatar3 from './../../assets/images/avatar/avatar-3.jpg'
import Avatar4 from './../../assets/images/avatar/avatar-4.jpg'
import Avatar5 from './../../assets/images/avatar/avatar-5.jpg'
import Avatar6 from './../../assets/images/avatar/avatar-6.jpg'
import Avatar7 from './../../assets/images/avatar/avatar-7.jpg'
import Avatar8 from './../../assets/images/avatar/avatar-8.jpg'
import Avatar9 from './../../assets/images/avatar/avatar-9.jpg'
import Avatar10 from './../../assets/images/avatar/avatar-10.jpg'
import Course from './../../assets/images/education/course.png'
import { numberWithCommas } from './../../helper/utils'

import Icon from '@mdi/react'
import { mdiStar, mdiStarOutline, mdiStarHalfFull } from '@mdi/js'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { useGetAllGalleryImagesQuery, useGetAllProductsQuery, useGetAllScrollCardsQuery, useGetCArouselQuery, useGetPublicProductMaterialQuery, useLazyGetAllProductsQuery, useLazyGetFilteredDataQuery } from '../../redux/apis/publicApi'
import { useAddCartMutation } from '../../redux/apis/userApi'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'react-feather'
import CourseCard from '../../components/marketing/pages/courses/CourseCard'
// import { useGetAllScrollCardsQuery } from '../../../../client/src/redux/apis/openApi'
const Home = () => {


    return <>

        <Hero />
        <ProductMarquee />
        <MostPopularProducts />
        {/* <Fragment> */}
        {/* <Row>
                {displayRecords.length > 0 ? (
                    displayRecords
                ) : (
                    <Col>No matching records found.</Col>
                )}
            </Row> */}


        {/* </Fragment> */}
        <WhatCustomersSay />
        <FindRightjewellery />

    </>
}

const Hero = () => {
    const { data } = useGetCArouselQuery();
    const [imageSize, setImageSize] = useState({ height: '550px' });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setImageSize({ height: '300px' }); // Adjust for mobile devices
            } else {
                setImageSize({ height: '550px' }); // Default for larger screens
            }
        };

        // Call the function on mount and resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        <Carousel interval={3000} controls={true} indicators={true} fade={true}>
            {data && data.map((item, i) => (
                <Carousel.Item key={i}>
                    <img
                        style={{
                            height: imageSize.height, // Dynamically set height
                            width: '100%',
                            objectFit: 'cover'
                        }}
                        src={item.image}
                        alt={`Carousel image ${i + 1}`}
                    />
                    <Carousel.Caption>
                        <h3 className='text-light'>Diamond Collections</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
            {/* <Carousel.Item>
                <img src="https://images.unsplash.com/photo-1665159882686-3d4fc7b036a4?q=80&w=2641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "600px", width: "100%", objectFit: "cover" }} alt="" />
                <Carousel.Caption>
                    <h3 className='text-light' >Diamond Collections</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://images.unsplash.com/photo-1695050049047-54e27a908898?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "600px", width: "100%", objectFit: "cover" }} alt="" />
                <Carousel.Caption>
                    <h3 className='text-light' >Gold Collections</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://images.unsplash.com/photo-1659095141570-be8b9aff59ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ height: "600px", width: "100%", objectFit: "cover" }} alt="" />
                <Carousel.Caption>
                    <h3 className='text-light' >Silver Collections</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    </>

}

const ProductMarquee = () => {
    const { data } = useGetAllScrollCardsQuery()
    // console.log("product marquee", data);

    return (

        <section className="py-md-8 py-6 bg-white"
            style={{
                backgroundImage: `url(${MentorHeroGlow})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >

            <div>
                <Container>
                    <div className='text-end'>
                        <Link to="/filter" variant='outline-primary'>View All</Link>
                    </div>
                </Container>
                <div className="position-relative d-flex overflow-x-hidden py-lg-4 pt-4">
                    <div className="animate-marquee d-flex gap-3">
                        {data && data.map((item, index) => {
                            return (
                                <Link key={index} to="#" className="bg-white text-center shadow-sm text-wrap rounded-4 w-100 border card-lift border mentor-card">
                                    <div className="p-3">
                                        <Image src={item.image} alt="mentor 1" className="avatar avatar-xl rounded-circle" />
                                        <div className="mt-3 text-center">
                                            <h4 className="mb-0 ">{item.title}</h4>
                                            <span className="text-gray-800">{item.desc}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Container fluid className='p-5 d-none d-md-block'>
                <JustifiedGallery />
            </Container>
        </section >
    )
}

const MentorListData = [
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/solitaires.png",
        mentorName: 'Solitaires',
        mentorRole: 'Quality Assurance Engineer',

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/watch-jewellery.png",
        mentorName: 'Mangalsutras',
        mentorRole: 'Senior Business Analyst',

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/mens_v1.png",
        mentorName: "Men's Jewellery",
        mentorRole: 'Senior Data Engineer',

    },

    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/mangalsutras.png",
        mentorName: "Solitaires",
        mentorRole: "Solitaires",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/nose-pins.png",
        mentorName: "Mangalsutras",
        mentorRole: "Mangalsutras",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/coins.png",
        mentorName: "Men's Jewellery",
        mentorRole: "Men's Jewellery",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/anklets.png",
        mentorName: "Kids Jewellery",
        mentorRole: "Kids Jewellery",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/nose-pins.png",
        mentorName: "Nose Pins",
        mentorRole: "Nose Pins",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/kids.png",
        mentorName: "Anklets",
        mentorRole: "Anklets",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/nose-pins.png",
        mentorName: "Gold Coins",
        mentorRole: "Gold Coins",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/pendants.png",
        mentorName: "Rings",
        mentorRole: "Rings",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/rings_v1.png",
        mentorName: "Pendants",
        mentorRole: "Pendants",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/necklaces.png",
        mentorName: "Earrings",
        mentorRole: "Earrings",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/earrings.png",
        mentorName: "Necklaces",
        mentorRole: "Necklaces",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/bangles.png",
        mentorName: "Bracelets",
        mentorRole: "Bracelets",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/bracelets.png",
        mentorName: "Bangles",
        mentorRole: "Bangles",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/chains.png",
        mentorName: "Kada",
        mentorRole: "Kada",

    },
    {
        id: uuid(),
        image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/kada.png",
        mentorName: "Gold Chains",
        mentorRole: "Gold Chains",

    }
]


const JustifiedGallery = () => {
    const { data: images } = useGetAllGalleryImagesQuery();
    const [isHover, setIsHover] = useState({
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
    })

    const defaultStyle = { overflow: 'hidden', transition: "0.5s" }
    const hoverStyle = {
        transform: "scale(1.2)"
    }
    const GalleryImages = [
        {
            id: 1,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/dl-3.png"
        },
        {
            id: 2,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/dl-1.png"
        },
        {
            id: 3,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/dl-2.png"
        },
        {
            id: 4,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/e9.png"
        },
        {
            id: 5,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/e2.png"
        },
        {
            id: 6,
            image: "https://kinclimg5.bluestone.com/f_webp/static/hp/d/e6.png"
        }
    ];
    return (
        <div className="gallery " >
            {images && images.map((item, index) => {
                return (
                    <figure
                        className={`gallery__item gallery__item--${index + 1} mb-0`}
                        key={index}
                        style={{ overflow: "hidden", }}
                    >
                        <Image
                            onMouseEnter={e => setIsHover({ ...isHover, [index]: true })}
                            onMouseLeave={e => setIsHover({ ...isHover, [index]: false })}
                            style={isHover[index] ? { ...defaultStyle, ...hoverStyle } : defaultStyle}
                            src={item.image}
                            alt="Gallery image 1"
                            className="gallery__img rounded-3"
                        />
                    </figure>
                );
            })}
        </div>
    );
}

// popular products
const MostPopularProducts = () => {
    const [selectedMaterial, setSelectedMaterial] = useState(null); // Selected material
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const productsPerPage = 4; // Items per page
    const [allProducts, setAllProducts] = useState([]); // Final products to display
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
    const [filterPage, setfilterPage] = useState(1)
    // Lazy query hooks for filtering and fetching products
    const [filter, {
        data: filteredData,
        isSuccess: isFilterSuccess,
        isError: isFilterError,
        error: filterError
    }] = useLazyGetFilteredDataQuery();

    const [fetchProducts, { data: productsData, isSuccess: isProductsSuccess }] = useLazyGetAllProductsQuery();

    const { data: materials } = useGetPublicProductMaterialQuery();

    useEffect(() => {
        if (selectedMaterial) {
            filter({ material: selectedMaterial, page: filterPage, limit: productsPerPage });
        }
    }, [selectedMaterial, currentPage, filter]);

    useEffect(() => {
        if (isFilterSuccess && filteredData) {
            setAllProducts(filteredData.result);
            setTotalPages(filteredData.pagination?.totalPages || 1);
        }
    }, [isFilterSuccess, filteredData]);

    useEffect(() => {
        if (!selectedMaterial) {
            fetchProducts({ page: currentPage, limit: productsPerPage });
        }
    }, [fetchProducts, currentPage, selectedMaterial]);

    useEffect(() => {
        if (isProductsSuccess && productsData) {
            setAllProducts(productsData.result);
            setTotalPages(productsData.pagination?.totalPages || 1);
        }
    }, [isProductsSuccess, productsData, selectedMaterial === null]);

    useEffect(() => {
        if (isFilterError) {
            toast.error(filterError?.message || 'An error occurred while filtering products.');
        }
    }, [isFilterError, filterError]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <section className="pb-lg-14 pb-8 bg-white pt-5 mt-0 overflow-hidden">
                <hr />
                <Container className="mt-5">
                    <Row>
                        <Col xs={12}>
                            <div className="mb-6">
                                <h2 className="mb-1 h1">Most Popular Jewellery</h2>
                                <p>These are the most popular Jewellery.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tab.Container defaultActiveKey="Diamond">
                                <Nav className="nav-lb-tab mb-6 bg-gray-200 px-5 rounded-3">
                                    {materials && materials.map((tab, index) => (
                                        <Nav.Item key={index} className={index === 0 ? 'ms-0' : ''}>
                                            <Nav.Link
                                                onClick={() => setSelectedMaterial(tab.name)}
                                                eventKey={tab.name}
                                                className="mb-sm-3 mb-md-0 bg-gray-200"
                                            >
                                                {tab.name}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                    <Nav.Item>
                                        <Nav.Link
                                            onClick={() => setSelectedMaterial(null)}
                                            className="mb-sm-3 mb-md-0 bg-gray-200"
                                        >
                                            All
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Row className="d-flex justify-content-start">
                                        {allProducts && allProducts.map((item, index) => (
                                            <Col lg={3} md={4} sm={6} xs={6} key={index}>
                                                <div className="d-flex">
                                                    <ProductCard item={item} />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
                <div className="d-flex justify-content-center">
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination>
                            {/* Previous Button */}
                            <Pagination.Prev
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </Pagination.Prev>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index}
                                    active={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}

                            {/* Next Button */}
                            <Pagination.Next
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </Pagination.Next>
                        </Pagination>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

const AllCoursesData = [
    {
        id: 1,
        category: 'Diamond',
        image: "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPM0025R22_YAA22XXXXXXXXXXXX_ABCD00-PICS-00001-1024-2701.jpg",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 7 July, 2020',
        instructor_name: 'Jenny Wilson',
        instructor_image: Avatar7,
        status: 'Pending',
        level: ' ',
        duration: '1h 46m',
        price: "1,00,144",
        discount: 50,
        rating: 2.0,
        ratingby: 16500,
        recommended: false,
        popular: false,
        trending: true,
        progress: 45
    },
    {
        id: 2,
        category: 'graphql',
        image: "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAR0097R08_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66185.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 6 July, 2021',
        instructor_name: 'Brooklyn Simmons',
        instructor_image: Avatar6,
        status: 'Pending',
        level: ' ',
        duration: '2h 40m',
        price: "1,00,144",
        discount: 100,
        rating: 2.5,
        ratingby: 1500,
        recommended: true,
        popular: false,
        trending: false,
        progress: 95
    },
    {
        id: 3,
        category: 'html',
        image: "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAR0097R08_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66185.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Miston Wilson',
        instructor_image: Avatar5,
        status: 'Pending',
        level: ' ',
        duration: '3h 16m',
        price: "1,00,144",
        discount: 150,
        rating: 3.0,
        ratingby: 1600,
        recommended: false,
        popular: true,
        trending: true,
        progress: 55
    },
    {
        id: 4,
        category: 'javascript',
        image: "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAR0097R08_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66185.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Jenny Wilson',
        instructor_image: Avatar1,
        status: 'Live',
        level: ' ',
        duration: '4h 10m',
        price: "1,00,144",
        discount: 150,
        rating: 3.5,
        ratingby: 7500,
        recommended: true,
        popular: true,
        trending: false,
        progress: 50
    },
    {
        id: 5,
        category: 'nodejs',
        image: "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAR0097R08_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66185.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sina Ray',
        instructor_image: Avatar3,
        status: 'Live',
        level: ' ',
        duration: '2h 00m',
        price: "1,00,144",
        discount: 150,
        rating: 4.0,
        ratingby: 15700,
        recommended: true,
        popular: true,
        trending: true,
        progress: 45
    },
    {
        id: 6,
        category: 'laravel',
        image: "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BICM0449R15_RAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-70491.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sobo Rikhan',
        instructor_image: Avatar9,
        status: 'Live',
        level: ' ',
        duration: '1h 00m',
        price: "1,00,144",
        discount: 50,
        rating: 4.5,
        ratingby: 2500,
        recommended: true,
        popular: false,
        trending: true,
        progress: 65
    },
    {
        id: 7,
        category: 'react',
        image: "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISP0419R21_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66188.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 4 July, 2021',
        instructor_name: 'April Noms',
        instructor_image: Avatar2,
        status: 'Live',
        level: ' ',
        duration: '3h 55m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 1500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 75
    },
    {
        id: 8,
        category: 'angular',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAV0741S04_RAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-53716.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 3 July, 2021',
        instructor_name: 'Jacob Jones',
        instructor_image: Avatar4,
        status: 'Pending',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 1600,
        recommended: true,
        popular: true,
        trending: true,
        progress: 45
    },
    {
        id: 9,
        category: 'laravel',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAV0741S04_RAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-53716.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sobo Rikhan',
        instructor_image: Avatar9,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 11500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 59
    },
    {
        id: 10,
        category: 'nodejs',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAV0741S04_RAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-53716.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sina Ray',
        instructor_image: Avatar3,
        status: 'Live',
        level: ' ',
        duration: '2h 40m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 13500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 95
    },
    {
        id: 11,
        category: 'python',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIAV0741S04_RAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-53716.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Ted Hawkins',
        instructor_image: Avatar10,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 7800,
        recommended: true,
        popular: true,
        trending: true,
        progress: 45
    },
    {
        id: 12,
        category: 'laravel',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPR0723P51_YAA18DIG6XXXXXXXX_ABCD00-PICS-00004-1024-56257.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sobo Rikhan',
        instructor_image: Avatar9,
        status: 'Live',
        level: ' ',
        duration: '1h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 3600,
        recommended: true,
        popular: true,
        trending: true,
        progress: 95
    },
    {
        id: 13,
        category: 'react',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINS0799R11_YAA18DIG6SOG60015_ABCD00-PICS-00001-1024-66182.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 4 July, 2021',
        instructor_name: 'April Noms',
        instructor_image: Avatar2,
        status: 'Live',
        level: ' ',
        duration: '2h 40m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 16500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 65
    },
    {
        id: 14,
        category: 'angular',
        image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIRS0680R21_YAA18DIG6SOG60020_ABCD00-PICS-00001-1024-64627.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 3 July, 2021',
        instructor_name: 'Jacob Jones',
        instructor_image: Avatar4,
        status: 'Pending',
        level: ' ',
        duration: '6h 00m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 1500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 85
    },
    {
        id: 15,
        category: 'gatsby',
        image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINS0799R08_YAA18DIG6SOG60030_ABCD00-PICS-00001-1024-67122.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 7 July, 2020',
        instructor_name: 'Jenny Wilson',
        instructor_image: Avatar7,
        status: 'Pending',
        level: ' ',
        duration: '6h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 3.0,
        ratingby: 1653,
        recommended: true,
        popular: true,
        trending: true,
        progress: 45
    },
    {
        id: 16,
        category: 'graphql',
        image: "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPM0025R22_YAA22XXXXXXXXXXXX_ABCD00-PICS-00001-1024-2701.jpg",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 6 July, 2021',
        instructor_name: 'Brooklyn Simmons',
        instructor_image: Avatar6,
        status: 'Pending',
        level: ' ',
        duration: '5h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 5.0,
        ratingby: 16500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 55
    },
    {
        id: 17,
        category: 'angular',
        image: "https://kinclimg9.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66194.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 3 July, 2021',
        instructor_name: 'Jenny Wilson',
        instructor_image: Avatar4,
        status: 'Pending',
        level: ' ',
        duration: '3h 30m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 1800,
        recommended: true,
        popular: true,
        trending: true,
        progress: 88
    },
    {
        id: 18,
        category: 'laravel',
        image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66176.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sobo Rikhan',
        instructor_image: Avatar9,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 1200,
        recommended: true,
        popular: true,
        trending: true,
        progress: 45
    },
    {
        id: 19,
        category: 'nodejs',
        image: "https://kinclimg9.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVUN0180R20_WAA18DIG6SOG60050_ABCD00-PICS-00001-1024-65652.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Sina Ray',
        instructor_image: Avatar3,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 3.5,
        ratingby: 16800,
        recommended: true,
        popular: true,
        trending: true,
        progress: 55
    },
    {
        id: 20,
        category: 'javascript',
        image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVGC0661B01_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-55413.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Guy Hawkins',
        instructor_image: Avatar10,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 2.5,
        ratingby: 19500,
        recommended: true,
        popular: true,
        trending: true,
        progress: 95
    },
    {
        id: 21,
        category: 'javascript',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPB0293O26_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-22215.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Juanita Bell',
        instructor_image: Avatar10,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 9300,
        recommended: false,
        popular: false,
        trending: false,
        progress: 55
    },
    {
        id: 22,
        category: 'javascript',
        image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIIP0503B11_YAA22XXXXXXXXXXXX_ABCD00-PICS-00002-1024-42027.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Ted Hawkins',
        instructor_image: Avatar10,
        status: 'Live',
        level: ' ',
        duration: '2h 46m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 7800,
        recommended: false,
        popular: false,
        trending: false,
        progress: 45
    },
    {
        id: 23,
        category: 'css',
        image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPB0293O25_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-22216.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Juanita Bell',
        instructor_image: Avatar7,
        status: 'Live',
        level: ' ',
        duration: '1h 30m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 17000,
        recommended: true,
        popular: false,
        trending: false,
        progress: 95
    },
    {
        id: 24,
        category: 'css',
        image: "https://kinclimg0.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVOR0758B06_YAA22XXXXXXXXXXXX_ABCD00-PICS-00002-1024-53507.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Claire Robertson',
        instructor_image: Avatar8,
        status: 'Live',
        level: ' ',
        duration: '1h 30m',
        price: "1,00,144",
        discount: 150,
        rating: 4.5,
        ratingby: 17000,
        recommended: true,
        popular: false,
        trending: false,
        progress: 95
    },
    {
        id: 25,
        category: 'javascript',
        image: "https://kinclimg2.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINS0804B16_RAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-64493.png",
        title: "The Ganiru Oval Bangle",
        date_added: 'Added on 5 July, 2021',
        instructor_name: 'Guy Robertson',
        instructor_image: Avatar1,
        status: 'Live',
        level: ' ',
        duration: '4h 10m',
        price: "1,00,144",
        discount: 150,
        rating: 3.5,
        ratingby: 7500,
        recommended: false,
        popular: false,
        trending: false,
        progress: 95
    }
]
const ProductCard = ({ item }) => {
    // console.log("item", item);

    return (
        <Link to={`/product-details/${item._id}`}>
            <Card className="mb-4 card-hover" >
                {/* Card Image */}
                <Link to="#" className="card-img-top">
                    <Image
                        data-aos="flip-up"
                        src={item.images[0]}
                        alt=""
                        style={{ height: "200px", objectFit: "cover" }}
                        className="card-img-top rounded-top-md"
                    />
                </Link>
                {/* Card Body */}
                <Card.Body>
                    <div className="d-flex justify-content-end align-items-center mb-3">

                        <Link to="#" className="text-muted fs-5">
                            <i className="fe fe-heart align-middle"></i>
                        </Link>
                    </div>
                    <h4 className="mb-2 text-truncate-line-2 ">
                        <div className="text-inherit">
                            {item.name}
                        </div>
                    </h4>
                    {/* <small>By: {item.instructor_name}</small> */}
                    <div className="lh-1 mt-3">
                        <span className="text-warning me-1">
                            <Ratings rating={item.rating} />
                        </span>
                        <span className="text-warning me-1">{item.rating.toFixed(1)}</span>
                        <span className="fs-6 text-muted">
                            {/* ({numberWithCommas(item.ratingby)}) */}
                        </span>
                    </div>
                </Card.Body>
                {/* Card Footer */}
                <Card.Footer>
                    <Row className="align-items-center g-0">
                        <Col className="col">
                            <h5 className="mb-0"> <span className='text-muted text-sm'>Starting from</span> <span>₹ {item.varient[0].price}</span></h5>
                        </Col>
                        <Col xs="auto">

                            <Link to="#" className="text-inherit">
                                <i className="fe fe-shopping-cart text-primary align-middle me-2"></i>
                                Add To Cart
                            </Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Link>
    );
}
const Ratings = ({ rating, className, size }) => {
    rating = Math.abs(rating);
    let integer = Math.floor(rating);
    let decimal = rating - integer;
    let starsize = size ? size : '0.875rem';

    const PrintFilledStar = (repeatValue) => {
        const stars = [];
        for (let i = 1; i <= repeatValue; i++) {
            stars.push(
                <Icon key={i} path={mdiStar} size={starsize} className={className} />
            );
        }
        return stars;
    };
    const PrintHalfStar = (repeatValue) => {
        return repeatValue > 0 ? (
            <Icon path={mdiStarHalfFull} size={starsize} className={className} />
        ) : (
            ''
        );
    };
    const PrintBlankStar = (repeatValue) => {
        const blankstars = [];
        for (let i = 1; i <= repeatValue; i++) {
            blankstars.push(
                <Icon
                    key={i}
                    path={mdiStarOutline}
                    size={starsize}
                    className={className}
                />
            );
        }
        return blankstars;
    };
    return (
        <Fragment>
            {PrintFilledStar(integer)}
            {PrintHalfStar(decimal)}
            {PrintBlankStar(5 - integer - (decimal > 0 ? 1 : 0))}
        </Fragment>
    );
}

// WhatCustomersSay
const WhatCustomersSay = () => {
    return (
        <section className="bg-gray-200 pt-14 pb-16">
            <Container className="">
                <Row className="mb-10">
                    <Col xs={12}>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <div className="">
                                    <div className="mb-3">
                                        <span className="text-dark fw-semi-bold">4.5/5.0</span>{' '}
                                        <span className="text-warning">
                                            <Ratings rating={4.5} />
                                        </span>{' '}
                                        <span className="ms-2">(Based on 3265 ratings)</span>
                                    </div>
                                    <h2 className="h1">What our customers say</h2>
                                    <p className="mb-0">
                                        {' '}
                                        Hear from <span className="text-dark">teachers</span>,{' '}
                                        <span className="text-dark">trainers</span>, and{' '}
                                        <span className="text-dark">leaders</span> in the learning
                                        space about how Geeks empowers them to provide quality
                                        online learning experiences.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} className="text-md-end mt-4 mt-md-0">
                                <Link to="#" className="btn btn-primary">
                                    View Reviews
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="position-relative">
                            {/*  Testimonial slider */}
                            <TestimonialsSlider />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

const TestimonialsList = [
    {
        id: 1,
        name: 'Barry Watson',
        designation: 'Engineering Architect',
        image: Avatar1,
        content:
            'The generated lorem Ipsum is therefore always free from repetition, injected humour, or words etc generate lorem Ipsum which looks racteristic reasonable.',
        rating: 5.0,
        color: 'primary'
    },
    {
        id: 2,
        name: 'Linda Shenoy',
        designation: 'Engineering Architect',
        image: Avatar2,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipi scing elit. Sed vel felis imperdiet, lacinia metus malesuada diamamus rutrum turpis leo, id tincidunt magna sodales.',
        rating: 5.0,
        color: 'info'
    },
    {
        id: 3,
        name: 'Jean Watson',
        designation: 'Engineering Architect',
        image: Avatar3,
        content:
            'Sed pretium risus magna, ac efficitur nunc rutrum imperdiet. Vivamus sed ante sed mi fermentum tempus. Nullam finibus augue eget felis efficitur semper.',
        rating: 5.0,
        color: 'danger'
    },

    {
        id: 4,
        name: 'John Deo',
        designation: 'Engineering Architect',
        image: Avatar4,
        content:
            'Morbi quis posuere lacus. Morbi et metus sit amet tellus dapibus aliquam. Morbi consectetur magna vel turpis lobortis lorem iopsum dolor sit commodo.',
        rating: 4.5,
        color: 'success'
    },
    {
        id: 5,
        name: 'Rubik Nanda',
        designation: 'Engineering Architect',
        image: Avatar5,
        content:
            'Curabitur sollicitudin mi et sagittis egestas. Curabitur pellentesque nibh id enim hendrerit, at mollis neque rutrum. Sed nibh velit, tristique et dolor vitae.',
        rating: 4.5,
        color: 'secondary'
    },
    {
        id: 6,
        name: 'Barry Watson',
        designation: 'Engineering Architect',
        image: Avatar6,
        content:
            'Vestibulum in lobortis purus. Quisque sem turpis, hendrerit quis lacinia nec, rutrum nec velit. Nullam lobortis rhoncus tincidunt lorem ispun dnascetur ridiculus mus.',
        rating: 4.5,
        color: 'info'
    },
    {
        id: 7,
        name: 'Jean Watson',
        designation: 'Engineering Architect',
        image: Avatar7,
        content:
            'Praesent sit amet ornare magna, vitae consequat arcu. Vestibulum at dictum erat, a fringilla ante. Nam et nibh ut nunc rutrum suscipit quis non neque. Nulla facilisi.',
        rating: 4.5,
        color: 'warning'
    },
    {
        id: 8,
        name: 'Barry Watson',
        designation: 'Engineering Architect',
        image: Avatar8,
        content:
            'Sed pretium risus magna, ac efficitur nunc rutrum imperdiet. Vivamus sed ante sed mi fermentum tempus. Nullam finibus augue eget felis efficitur semper.',
        rating: 4.5,
        color: 'dark'
    }
]
const TestimonialCard = ({ item }) => {
    return (
        <Card className="border shadow-none">
            <Card.Body className="p-5">
                <div className="mb-2">
                    <span className="fs-4 text-warning">
                        <Ratings rating={item.rating} />
                    </span>
                </div>
                <p className="lead text-dark font-italic fw-medium mb-0">
                    "{item.content}"
                </p>
            </Card.Body>
            <Card.Footer className="px-5 py-4">
                <div className="d-flex align-items-center">
                    <Image
                        src={item.image}
                        alt=""
                        className="avatar avatar-md rounded-circle"
                    />
                    <div className="ms-3">
                        <h4 className="mb-0">{item.name}</h4>
                        <p className="mb-0 small">{item.designation}</p>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
}

// Typechecking With PropTypes
TestimonialCard.propTypes = {
    item: PropTypes.object.isRequired
}

const TestimonialsSlider = () => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Fragment>
            <Slider {...settings} className="pb-5 mb-5 testimonials">
                {TestimonialsList.map((item, index) => (
                    <div className="item p-2" key={item.id}>
                        <TestimonialCard key={index} item={item} />
                    </div>
                ))}
            </Slider>
        </Fragment>
    );
}

// Find Right jewellery
const FindRightjewellery = () => {
    return (
        <section className="p-10">
            <Container>
                <div className="bg-primary py-6 px-6 px-xl-0 rounded-4 ">
                    <Row className="align-items-center">
                        <Col xl={{ offset: 1, span: 5 }} md={6} xs={12}>
                            <div>
                                <h2 className="h1 text-white mb-3">Let’s find the right Jwellery for you!</h2>
                                <p className="text-white fs-4">…and achieve their learning goals. With our expert tutors, your goals are  closer  than ever!</p>
                                <Button variant='light'>Start Shopping</Button>
                            </div>
                        </Col>
                        <Col xl={6} md={6} xs={12}>
                            <div className="text-center">
                                <Image src={Course} alt="learning" className="img-fluid" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Home