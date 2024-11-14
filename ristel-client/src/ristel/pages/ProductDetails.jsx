// import ProductSingleV2 from '../../components/dashboard/ecommerce/products/ProductSingleV2'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Col, Row, Accordion, useAccordionButton, AccordionContext, ListGroup, Image, ProgressBar, Card, FormSelect } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiStar } from '@mdi/js'
import Slider from 'react-slick'
import RatingsBiIcon from './../../components/marketing/common/ratings/RatingsBiIcon'
import ReviewImage1 from './../../assets/images/ecommerce/ecommerce-img-1.jpg'
import ReviewImage2 from './../../assets/images/ecommerce/ecommerce-img-2.jpg'
import ReviewImage3 from './../../assets/images/ecommerce/ecommerce-img-3.jpg'
import { useGetDetailsQuery, useGetTaxesQuery } from '../../redux/apis/publicApi'
import { useAddCartMutation, useGetReviewsQuery, useLikeMutation } from '../../redux/apis/userApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = () => {
    // const { data: schedules } = useGetScheduleQuery()
    // const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const { id } = useParams()
    const { data, isLoading } = useGetDetailsQuery(id)


    // const [addView] = useAddViewMutation()
    // const [postHistory] = usePostHistoryMutation()
    // const { id } = useParams();
    const { data: reviews } = useGetReviewsQuery(id);
    // const { data, isError: isDetailError, error: detailsError } = useGetDetailsQuery(id);
    // console.log("schedules", schedules && schedules[0].pId);

    const { data: taxes } = useGetTaxesQuery();


    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const [currentImage, setCurrentImage] = useState(data?.images[0] || 'default-image-url');
    const [selectedVariant, setSelectedVariant] = useState(data?.varient[0] || {});
    // const [selectedVariant, setSelectedVariant] = useState()

    useEffect(() => {
        if (data && data.images.length > 0) {
            setCurrentImage(data.images[0]);
        }
    }, [data]);

    // useEffect(() => {
    //     addView({ type: "details" })
    // }, [])
    useEffect(() => {
        if (data) {
            setSelectedVariant(data.varient[0]);
        }
    }, [data]);








    const discountedPrice = (price) => {
        let discountedPrice = price;
        const discountTax = taxes?.find((tax) => tax.taxName === "Discount");
        if (discountTax) {
            const discountPercent = discountTax.percent;
            discountedPrice -= discountedPrice * (discountPercent / 100);
        }
        return discountedPrice;
    };

    const calculateRating = () => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const renderStars = (rating) => {
        const maxRating = 5;
        let stars = [];

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i <= Math.floor(rating) ? "#fbbf24" : "none"}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                </svg>
            );
        }

        return stars;
    };



    const handleVariantChange = (variantId) => {
        const selected = data.varient.find((variant) => variant._id === variantId);
        setSelectedVariant(selected);

    };


    // const schedule = schedules?.find((sch) => sch.pId._id === data?._id);
    // const start = new Date(schedule?.startTimeAndDate);
    // const end = new Date(schedule?.endTimeAndDate);

    // useEffect(() => {
    //     const updateTimer = () => {
    //         const now = new Date().getTime();
    //         const startTime = start.getTime();
    //         const endTime = end.getTime();

    //         if (now < startTime) {
    //             const distanceToStart = startTime - now;
    //             const days = Math.floor(distanceToStart / (1000 * 60 * 60 * 24));
    //             const hours = Math.floor((distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //             const minutes = Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60));
    //             const seconds = Math.floor((distanceToStart % (1000 * 60)) / 1000);

    //             setTimeLeft({ days, hours, minutes, seconds });
    //         } else if (now >= startTime && now <= endTime) {
    //             const distanceToEnd = endTime - now;
    //             const days = Math.floor(distanceToEnd / (1000 * 60 * 60 * 24));
    //             const hours = Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //             const minutes = Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60));
    //             const seconds = Math.floor((distanceToEnd % (1000 * 60)) / 1000);

    //             setTimeLeft({ days, hours, minutes, seconds });
    //         } else {
    //             setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    //         }
    //     };

    //     const interval = setInterval(updateTimer, 1000);

    //     return () => clearInterval(interval);
    // }, [start, end]);

    // -----------------


    return <>
        {
            isLoading
                ? <><div class="spinner-border text-primary"></div></>
                : <Card>
                    <Card.Body className="p-5">
                        <Row>
                            <Col lg={6} xs={12}>
                                <ProductGallery2 sliderImages={data.images} />
                            </Col>
                            <Col lg={6} xs={12}>
                                <div className="my-5 mx-lg-10">

                                    {/* Product's brief information */}
                                    <ProductBriefInfo data={data} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />

                                    <p className="mt-4 mb-2"></p>

                                    {/* Product Details in Accordion */}
                                    <ProductDetailsAccordion data={data} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
                                    <p className="mt-4 mb-2"></p>
                                    {/* Product's Review */}
                                    <RatingsReviews />

                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
        }

    </>
}



const ProductBriefInfo = ({ data, selectedVariant, setSelectedVariant }) => {
    const [addToCart, { isSuccess, isError: isAddError, error: addError }] = useAddCartMutation();
    const { id } = useParams()

    const getFormattedPrice = amount => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount)
    const getFormattedDiscount = (mrp, price) => (((mrp - price) / mrp) * 100).toFixed(0)
    useEffect(() => {
        setSelectedVariant(data.varient[0])
    }, [])
    const { user } = useSelector((state) => state.user);
    // console.log("user from redux", user);

    const [like, { isSuccess: likeSuccesss, isError, error }] = useLikeMutation();
    const [liked, setLiked] = useState(false);

    const handleLikeClick = async () => {
        // console.log("------------");
        if (user) {

            setLiked((prevLiked) => !prevLiked);
            await like({ uId: user && user._id, pId: id, varientId: selectedVariant._id });
        } else if (!user) {
            toast.success("Please Login First")
        }
        // toast.success("Please Login First")
    };
    useEffect(() => {
        if (likeSuccesss) {
            toast.success("Liked Success");
        }
    }, [likeSuccesss]);
    useEffect(() => {
        if (isError) {
            toast.error(JSON.stringify(error.data.message));
        }
    }, [isError]);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Cart Added Success", {
                style: {
                    backgroundColor: 'white',
                    color: 'blue',
                    border: '1px solid blue',
                },
                icon: (
                    <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>
                ),
                progressStyle: {
                    backgroundColor: 'blue',
                }
            });
        }
    }, [isSuccess]);


    return <>
        {
            selectedVariant && <Fragment>
                <div>
                    <h1>{data.name} ({data.purity}) ({selectedVariant.prductWeight})</h1>
                    <div>
                        <span><span className="me-1 text-dark fw-semibold">{data.rating} <Icon path={mdiStar} size={0.6} className="text-success" />
                        </span>592 Customer Reviews</span>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="mb-5">
                    <h4 className="mb-1">
                        <span className="text-danger  me-2 fs-3 fw-light">-{getFormattedDiscount(selectedVariant.mrp, selectedVariant.price)}%</span>
                        <span className='me-2 fs-3'>₹{getFormattedPrice(selectedVariant.price)}</span>
                        MRP <span className="text-muted text-decoration-line-through ">₹{getFormattedPrice(selectedVariant.mrp)}</span>
                    </h4>
                    <span>inclusive of all taxes</span>

                    <p className='pt-3'>Varients</p>
                    <div className='d-flex gap-2 overflow-x-auto'>
                        {data.varient && data.varient.map((item, i) => <div onClick={e => setSelectedVariant(item)} className={`alert border border-2 ${selectedVariant._id === item._id && " alert-success"}`} style={{ cursor: "pointer" }}>
                            <h5 className='d-flex justify-content-between'>{data.name} {item.prductWeight}  <span className='text-danger fs-5 fw-medium'>-{getFormattedDiscount(item.mrp, item.price)}%</span></h5>

                            <p className='m-0'> <strong>₹{getFormattedPrice(item.price)}</strong> MRP: <del>₹{getFormattedPrice(item.mrp)}</del>

                            </p>
                        </div>)}
                    </div>
                </div>

                <Row>
                    <Col md={6}>
                        <div className="d-grid mb-2 mb-md-0">
                            <button onClick={e => {
                                if (user) {
                                    addToCart({ pId: data._id, uId: user?._id, varientId: selectedVariant._id })
                                }
                                // toast.success("Please Login First")
                            }} className="btn btn-success"><i className="fe fe-shopping-cart me-2"></i>Add
                                To Cart</button>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="d-grid">
                            <button onClick={handleLikeClick} className="btn btn-outline-secondary"><i className="fe fe-heart me-2"></i>Wishlist</button>
                        </div>
                    </Col>
                </Row>
            </Fragment >
        }
    </>
}
const ProductDetailsAccordion = ({ data, selectedVariant, setSelectedVariant }) => {
    return <>
        {
            selectedVariant && <>
                <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0" className='border-end-0 border-start-0'>
                        <Accordion.Header ><span className='fw-bold'>Product Details</span></Accordion.Header>
                        <Accordion.Body>
                            {selectedVariant.desc}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className='border-end-0 border-start-0'>
                        <Accordion.Header ><span className='fw-bold'>Specifications</span></Accordion.Header>
                        <Accordion.Body>
                            {data.specification}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className='border-end-0 border-start-0'>
                        <Accordion.Header ><span className='fw-bold'>Free Shipping Policy</span></Accordion.Header>
                        <Accordion.Body>
                            {data.freeShippingPolicy}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className='border-end-0 border-start-0'>
                        <Accordion.Header ><span className='fw-bold'>Refund Policy</span></Accordion.Header>
                        <Accordion.Body>
                            {data.refundPolicy}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        }
    </>
}
// data 👇
const PDetails = [
    {
        id: 1,
        title: 'Product Details',
        content: `<div>
			<div class="d-flex gap-2">
				<span>Product Code </span>
				<b>076974-27515605</b>
			</div>
			<div class="d-flex gap-2">
				<span>Height</span>
				<b>20.2 mm</b>
			</div>
			<div class="d-flex gap-2">
				<span>Width</span>
				<b>8.8 mm</b>
			</div>
			<div class="d-flex gap-2">
				<span>Product Weight</span>
				<b>2.96 gram</b>
			</div>
			<div class="d-flex gap-2">
				<span>Total Weight</span>
				<b>0.506 Ct</b>
			</div>
			<div class="d-flex gap-2">
				<span>Total No. Of Diamonds</span>
				<b>44</b>
			</div>
		</div>`
    },
    {
        id: 2,
        title: 'Specifications',
        content: `<p>We'll dive into GraphQL, the fundamentals of GraphQL. 
        We're only gonna use the pieces of it that we need to build in Gatsby. 
        We're not gonna be doing a deep dive into what GraphQL is or the language specifics. 
        We're also gonna get into MDX. MDX is a way to write React components in your markdown.</p>`
    },
    {
        id: 3,
        title: 'Free Shipping Policy',
        content: `<p>We'll dive into GraphQL, the fundamentals of GraphQL. 
        We're only gonna use the pieces of it that we need to build in Gatsby. 
        We're not gonna be doing a deep dive into what GraphQL is or the language specifics.
        We're also gonna get into MDX. MDX is a way to write React components in your markdown.</p>`
    },
    {
        id: 4,
        title: 'Refund Policy',
        content: `<p>
        We'll dive into GraphQL, the fundamentals of GraphQL. We're only gonna use the pieces of it that we need to build in Gatsby. We're not gonna be doing a deep dive into what GraphQL is or the language specifics. We're also gonna get into MDX. MDX is a way
        to write React components in your markdown.</p>
        <p>We'll dive into GraphQL, the fundamentals of GraphQL. We're only gonna use the pieces of it that we need to build in Gatsby. We're not gonna be doing a deep dive into what GraphQL is or the language specifics. We're also gonna get into MDX. MDX is a way
            to write React components in your markdown.</p>`
    }
]

const ProductGallery2 = ({ sliderImages = [] }) => {
    const [active, setActive] = useState(0)
    const carousel = useRef(null)
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleClick = (index) => {
        carousel.current.slickGoTo(index)
        setActive(index)
    }
    // const sliderImages = [
    //     "https://kinclimg9.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66194.png",
    //     "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00002-1024-66194.png",
    //     "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00003-1024-66194.png",
    //     "https://kinclimg4.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-BP-PICS-00001-1024-66194.png"
    // ]

    return (
        <Row>
            <Col xs={12}>
                <div>
                    <div id="product-mw" >
                        <div id="product-iw">
                            <div className="product" id="product" >
                                <Slider {...settings} ref={carousel}>
                                    {sliderImages.map((image, index) => {
                                        return (
                                            <div key={index}>
                                                <Image src={image} alt='Product 1' className='rounded-2 ' style={{ height: "70vh", width: "100%", objectFit: "cover" }} />
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-tools">
                    <Row className="thumbnails g-3" id="product-thumbnails" aria-label="Carousel Pagination">
                        {sliderImages.map((image, index) => {
                            return (
                                <Col key={index} xs={3} className={active === index ? 'nav-active' : ''} data-nav={index} aria-controls="product">
                                    <div className="thumbnails-img">
                                        <Image src={image} alt={'Product ' + index} className='w-100' onClick={() => handleClick(index)} />
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

const RatingsReviews = () => {
    return (
        <div className="mb-4">
            <h3 className="mb-4">Ratings &amp; Reviews</h3>
            <Row className="align-items-center mb-4">
                <Col md={4} className="mb-4 mb-md-0">
                    {/* rating */}
                    <h3 className="display-2 fw-bold">4.5</h3>
                    <RatingsBiIcon className="text-success" rating={4.4} />
                    <p className="mb-0">595 Verified Buyers</p>
                </Col>
                <Col lg={{ span: 7, offset: 1 }} md={8}>
                    {/* progress */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">5</span>
                            <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-muted" />
                        </div>
                        <div className="w-100">
                            <ProgressBar variant="success" now={60} style={{ height: '6px' }} />
                        </div>
                        <span className="text-muted ms-3">420</span>
                    </div>
                    {/* progress */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">4</span>
                            <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-muted" />
                        </div>
                        <div className="w-100">
                            <ProgressBar variant="success" now={50} style={{ height: '6px' }} />
                        </div><span className="text-muted ms-3">90</span>
                    </div>
                    {/* progress */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">3</span>
                            <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-muted" />
                        </div>
                        <div className="w-100">
                            <ProgressBar variant="success" now={35} style={{ height: '6px' }} />
                        </div><span className="text-muted ms-3">33</span>
                    </div>
                    {/* progress */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">2</span>
                            <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-muted" />
                        </div>
                        <div className="w-100">
                            <ProgressBar variant="warning" now={22} style={{ height: '6px' }} />
                        </div><span className="text-muted ms-3">12</span>
                    </div>
                    {/* progress */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="text-nowrap me-3 text-muted"><span className="d-inline-block align-middle text-muted">1</span>
                            <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-muted" />
                        </div>
                        <div className="w-100">
                            <ProgressBar variant="danger" now={14} style={{ height: '6px' }} />
                        </div><span className="text-muted ms-3">40</span>
                    </div>
                </Col>
            </Row>
            <div>
                {/* review 1 */}
                <div className="border-top py-4 mt-4">
                    <div className="border d-inline-block px-2 py-1 rounded-pill mb-3">
                        <span className="text-dark fw-semibold ">4.4 <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-success" /></span>
                    </div>
                    <p>It's awesome , I never thought about geeks that awesome shoes.very pretty.</p>
                    <div>
                        <span>James Ennis</span>
                        <span className="ms-4">28 Nov 2022</span>
                    </div>
                </div>
                {/* review 2 */}
                <div className="border-top py-4">
                    <div className="border d-inline-block px-2 py-1 rounded-pill mb-3">
                        <span className="text-dark fw-semibold ">5.0 <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-success" /></span>
                    </div>
                    <p>Quality is more than good that I was expected for buying. I first time
                        purchase Geeks shoes &amp; this brand is good. Thanks to Geeks UI delivery
                        was faster than fast ...Love Geeks UI</p>
                    <div>
                        <span>Bradley Mouton</span>
                        <span className="ms-4">21 Apr 2022
                        </span>
                    </div>
                </div>
                {/* review 3 */}
                <div className="border-top py-4 border-bottom">
                    <div className="border d-inline-block px-2 py-1 rounded-pill mb-3">
                        <span className="text-dark fw-semibold ">4.4 <Icon path={mdiStar} size={0.6} className="ms-1 fs-6 text-success" /></span>
                    </div>
                    <p>Excellent shoes with original logo , Thanks Geeks UI , Buy these shoes
                        without any tension</p>
                    <div className="mb-5">
                        <Image src={ReviewImage1} alt="" className="avatar-md rounded-2 me-1" />
                        <Image src={ReviewImage2} alt="" className="avatar-md rounded-2 me-1" />
                        <Image src={ReviewImage3} alt="" className="avatar-md rounded-2 me-1" />
                    </div>
                    <div>
                        {/* text */}
                        <span>Kieth J. Watson </span>
                        <span className="ms-4">21 May 2022</span>
                    </div>
                </div>
                <div className="my-3">
                    {/* btn link */}
                    <Link to="#" className="fw-semibold">View all 89 reviews</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
