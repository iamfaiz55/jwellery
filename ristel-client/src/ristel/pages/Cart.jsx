// dependancy
import { convertToCurrency } from '../../helper/utils';
import useCartOperations from '../../hooks/useCartOperations';
// import { CartContext } from '../../context/Context';
import Product2 from './../../assets/images/ecommerce/product-shoe-02.jpg';
import Product4 from './../../assets/images/ecommerce/product-shoe-04.jpg';
import Product5 from './../../assets/images/ecommerce/product-shoe-05.jpg';
import Product6 from './../../assets/images/ecommerce/product-shoe-06.jpg';
import Product7 from './../../assets/images/ecommerce/product-shoe-07.jpg';
import Product8 from './../../assets/images/ecommerce/product-shoe-08.jpg';
import EcommerceImg1 from './../../assets/images/ecommerce/ecommerce-img-1.jpg';
import EcommerceImg4 from './../../assets/images/ecommerce/ecommerce-img-4.jpg';
import EcommerceImg9 from './../../assets/images/ecommerce/ecommerce-img-9.jpg';
// dependancy end

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { InputGroup, Alert, Form, Container, Card, Col, Row, Table, Button, ListGroup, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetTaxesQuery } from '../../redux/apis/publicApi';
import { useDeleteCArtItemMutation, useGetAllCartItemsQuery } from '../../redux/apis/userApi';
import { toast } from 'react-toastify';
import { CartContext } from '../../layouts/AllRoutes';

const Cart = () => {
    return <>
        <Container className='my-5'>
            <ShoppingCart />
        </Container>
    </>
}


const ShoppingCart = () => {
    // const [postHistory] = usePostHistoryMutation()
    // const [addView] = useAddViewMutation()
    const { user } = useSelector(state => state.user);
    const { data: taxes } = useGetTaxesQuery();
    const { data, isError, error } = useGetAllCartItemsQuery(user._id);

    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [makingCharges, setMakingCharges] = useState(0);
    const [salesTax, setSalesTax] = useState(0);

    const [deleteItem, { isSuccess }] = useDeleteCArtItemMutation();
    const { cartData, setCartData } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setCartItems(data);
            calculateSubtotal(data);
        }
    }, [data]);

    useEffect(() => {
        if (taxes) {
            setDiscount(taxes.find(tax => tax.taxName === 'Discount')?.percent || 0);
            setMakingCharges(taxes.find(tax => tax.taxName === 'Making Charges')?.percent || 0);
            setSalesTax(taxes.find(tax => tax.taxName === 'Sales Tax')?.percent || 0);
        }
    }, [taxes]);

    // useEffect(() => {
    //     addView({ type: "cart" })
    // }, [])

    const calculateSubtotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.productId.varient.find(v => v._id === item.varientId)?.price * item.quantity, 0);
        setSubtotal(total);
    };

    const calculateDiscount = (amount) => amount * (discount / 100);
    const calculateMakingCharges = (amount) => amount * (makingCharges / 100);
    const calculateSalesTax = (amount) => amount * (salesTax / 100);

    const totalAfterDiscount = subtotal - calculateDiscount(subtotal);
    const makingChargesAmount = calculateMakingCharges(totalAfterDiscount);
    const salesTaxAmount = calculateSalesTax(totalAfterDiscount);
    const totalWithTaxAndCharges = totalAfterDiscount + makingChargesAmount + salesTaxAmount;

    const handleQuantityChange = (productId, varientId, num) => {
        const updatedItems = cartItems.map(item => {
            if (item.productId._id === productId && item.varientId === varientId) {
                const newQuantity = item.quantity + num;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCartItems(updatedItems);
        calculateSubtotal(updatedItems);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cart Item Deleted Successfully");
        }
    }, [isSuccess]);



    // useEffect(() => {
    //     if (user) {
    //         postHistory({ userId: user._id, type: "cart", cartId: data && data._id })
    //     }
    // }, [])






    // //////////------------------
    const [couponCode, setCouponCode] = useState('');
    const [couponCodeFound, setCouponCodeFound] = useState(null);
    // const {
    //     getCartSubtotal,
    //     getDiscountAmount,
    //     getGrandTotal
    // } = useCartOperations();

    // const {
    //     CartState: { cartItems, cartSummary, couponCodes, totalQuantity },
    //     CartDispatch
    // } = useContext(CartContext);

    // useEffect(() => {
    //     setCartSubTotal(getCartSubtotal(cartItems));
    //     CartDispatch({
    //         type: 'UPDATE_QUANTITY',
    //         payload: cartItems.reduce((total, item) => total + item.quantity, 0)
    //     })
    // }, [cartItems]);

    const applyCouponCode = () => {
        const couponInfo = couponCodes.find(coupon => coupon.code === couponCode);
        setCouponCodeFound(couponInfo)
        if (couponInfo) {
            CartDispatch({
                type: 'APPLY_COUPON',
                payload: {
                    coupon: couponInfo.code,
                    discount: couponInfo.discount
                }
            });
        }
        setCouponCode('');
    };

    const isCartEmpty = cartItems.length === 0;

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div className="border-bottom pb-3 mb-3 ">
                        <div className="mb-2 mb-lg-0">
                            <h1 className="mb-0 h2 fw-bold">Shopping Cart </h1>
                        </div>
                    </div>
                </Col>
            </Row>
            {isCartEmpty ?
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <div className="d-flex ">
                                    <h4 className="mb-0">Shopping Cart </h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div>Opps !! You have no products in your shopping cart, start shopping now!</div>
                            </Card.Body>
                        </Card>
                        <div className="mt-4 d-flex justify-content-between">
                            <Link to="/dashboard/ecommerce/products/product-grid" className="btn btn-outline-primary">Continue Shopping</Link>
                        </div>
                    </Col>
                </Row>
                :
                <Row>
                    <Col xs={12} className="mb-2">
                        <Alert variant="success">
                            Use coupon code <strong>( RISTEL5 / RISTEL10 / RISTEL15 )</strong> and get discount !
                        </Alert>
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <Card.Header>
                                <div className="d-flex ">
                                    <h4 className="mb-0">Shopping Cart <span className="text-muted ">({subtotal} Items)</span> </h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive table-card">
                                    <Table className="table mb-0 text-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((product, index) => {
                                                return (
                                                    <CartItem
                                                        calculateSubtotal={calculateSubtotal}
                                                        key={index}
                                                        product={product}
                                                        cartItems={cartItems}
                                                        setCartItems={setCartItems}
                                                    />
                                                )
                                            })}
                                            <tr>
                                                <td className="align-middle border-top-0 border-bottom-0 ">
                                                </td>
                                                <td className="align-middle border-top-0 border-bottom-0 ">
                                                    <h4 className="mb-0">Total</h4>
                                                </td>
                                                <td className="align-middle border-top-0 border-bottom-0 text-center ">
                                                    <span className="fs-4">-- (items)</span>
                                                </td>
                                                <td>
                                                    <h4 className="mb-0">{subtotal.toFixed(2)}</h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="mt-4 d-flex justify-content-between">
                            <Link to="/dashboard/ecommerce/products/product-grid" className="btn btn-outline-primary">Continue Shopping</Link>
                            {!isCartEmpty && <button
                                onClick={e => {
                                    setCartData({ cartItems, subtotal: totalWithTaxAndCharges });
                                    navigate('/checkout');
                                }}
                                className="btn btn-primary">Checkout</button>}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card className="mb-4 mt-4 mt-lg-0">
                            <Card.Body>
                                <h4 className="mb-3">Have a promo code ?</h4>
                                <Row className="g-3">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter promo code here"
                                            autoComplete="off"
                                            value={couponCode}
                                            onChange={e => setCouponCode(e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            variant="dark"
                                            onClick={applyCouponCode}
                                        >
                                            Apply
                                        </Button>
                                    </Col>
                                </Row>
                                <div className='mt-2'>
                                    {couponCodeFound === null ? '' : couponCodeFound ?
                                        <Alert variant="success">
                                            {/* <strong>{cartSummary.coupon}</strong> Coupon code is applied successfully!!. */}
                                            <strong>carrt Summery. coupon</strong> Coupon code is applied successfully!!.
                                        </Alert>
                                        : <Alert variant="danger">
                                            Either <strong>carrt Summery. coupon</strong> coupon code is invalid or expired.
                                        </Alert>}
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4">
                            <Card.Body>
                                <h4 className="mb-3">Order Summary</h4>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Sub Total :</span>
                                        <span>{subtotal}</span>
                                    </ListGroup.Item>
                                    {/* {cartSummary.coupon && <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Discount <span className="text-muted">({cartSummary.coupon})</span>: </span>
                                        <span>-{getDiscountAmount(cartItems)}</span>
                                    </ListGroup.Item>} */}
                                    <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Shipping Charge :</span>
                                        {/* <span>{convertToCurrency(cartSummary.shipping)}</span> */}
                                        <span>FREE</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Discount {discount.toFixed(2)}%  :</span>
                                        <span>{totalAfterDiscount.toFixed(2)}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Sales Tax {salesTax.toFixed(2)}% (included) :</span>
                                        <span>{salesTaxAmount.toFixed(2)}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='px-0 d-flex justify-content-between fs-5 text-dark fw-medium'>
                                        <span>Making Charges {makingCharges.toFixed(2)}% (included) :</span>
                                        <span>{makingChargesAmount.toFixed(2)}</span>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Card.Body>
                            <Card.Footer>
                                <div className=" px-0 d-flex justify-content-between fs-5 text-dark fw-semibold">
                                    <span>Total (INR)</span>
                                    <span>{totalWithTaxAndCharges.toFixed(2)}</span>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            }
        </Fragment>
    )
}


const CartItem = ({ product, cartItems, setCartItems, calculateSubtotal }) => {
    const { _id, quantity, totalPrice } = product;
    const [deleteCartItem, { isSuccess }] = useDeleteCArtItemMutation()
    // const { CartState, CartDispatch } = useContext(CartContext);

    // const isFoundInCart = id => !!CartState.cartItems.find(cartItem => cartItem.id === id);
    // const productInfo = ProductsData.filter((product) => product.id === id);
    // const handleAddToCart = (quantity, add) => {
    //     if (isFoundInCart(product.id)) {
    //         const cartProducts = CartState.cartItems.find(item => item.id === product.id);
    //         CartDispatch({
    //             type: 'UPDATE_CART_ITEM',
    //             payload: {
    //                 product: {
    //                     ...cartProducts,
    //                     quantity: add ? cartProducts.quantity + quantity : quantity,
    //                     totalPrice: quantity * product.price
    //                 },
    //                 quantity
    //             }
    //         });
    //     } else {
    //         CartDispatch({
    //             type: 'ADD_TO_CART',
    //             payload: {
    //                 product: {
    //                     ...product,
    //                     quantity,
    //                     totalPrice: quantity * product.price
    //                 }
    //             }
    //         });
    //     }
    // };

    const handleRemove = (id) => {
        toast.success("remove From Cart")
        deleteCartItem(id)
        // CartDispatch({
        //     type: 'REMOVE_CART_ITEM',
        //     payload: { id }
        // });
    };
    const handleQuantityChange = (productId, varientId, num) => {
        const updatedItems = cartItems.map(item => {
            if (item.productId._id === productId && item.varientId === varientId) {
                const newQuantity = item.quantity + num;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCartItems(updatedItems);
        calculateSubtotal(updatedItems);
    };

    // const handleIncrease = () => {
    //     // handleAddToCart(parseInt(quantity + 1));
    //     const updatedItems = cartItems.map(item => {
    //         if (product.productId._id === productId && product.varientId === varientId) {
    //             return { ...item, quantity: item.quantity + 1 };
    //         }
    //         return item;
    //     });
    //     setCartItems(updatedItems);
    //     calculateSubtotal(updatedItems);

    // };

    // const handleDecrease = () => {
    //     // if (quantity > 1) {
    //     //     // handleAddToCart(parseInt(quantity - 1));
    //     // }
    //     const updatedItems = cartItems.map(item => {
    //         if (item.productId._id === productId && item.varientId === varientId) {
    //             const newQuantity = item.quantity - 1;
    //             if (newQuantity > 0) {
    //                 return { ...item, quantity: newQuantity };
    //             }
    //         }
    //         return item;
    //     });
    //     setCartItems(updatedItems);
    //     calculateSubtotal(updatedItems);
    // };

    const handleChange = e => {
        handleAddToCart(parseInt(e.target.value < 1 ? 1 : e.target.value));
    };
    const variant = product.productId.varient.find(v => v._id === product.varientId);
    // console.log("varient", variant);

    return (
        <Fragment>
            <tr >
                <td>
                    <div className="d-flex">
                        <div>
                            <Image src={product.productId.images[0]} alt="" className="img-4by3-md rounded" />
                        </div>
                        <div className="ms-4 mt-2 mt-lg-0">
                            <h4 className="mb-1 text-primary-hover">
                                {/* {productInfo[0].name} */}
                            </h4>
                            <div>
                                <span>Color: <span className="text-dark fw-medium">Orange</span></span> ,
                                <span>Size: <span className="text-dark fw-medium"> 10</span></span>
                            </div>
                            <div className="mt-4">
                                <Link to="#" className="text-body">Edit</Link>
                                <Link to="#" className="text-body ms-3">Move to Wishlist</Link>
                                <Link to="#" className="text-body ms-3" onClick={() => handleRemove(_id)}>Remove</Link>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <h4 className="mb-0">{variant.price}</h4>
                </td>
                <td>
                    <InputGroup size="sm">
                        <Form.Control
                            className="button-minus text-center flex-xl-none w-xl-30 w-xxl-10 px-0 py-1 "
                            type="button"
                            min="1"
                            value="-"
                            onClick={e => handleQuantityChange(product.productId._id, product.varientId, -1)}
                        />
                        <Form.Control
                            className="quantity-field text-center flex-xl-none w-xl-30 w-xxl-10 px-0 py-1"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="button-plus text-center flex-xl-none w-xl-30 w-xxl-10 px-0 py-1 "
                            type="button"
                            value="+"
                            onClick={e => handleQuantityChange(product.productId._id, product.varientId, 1)}
                        />
                    </InputGroup>
                </td>
                <td>
                    <h4 className="mb-0">{(variant.price * product.quantity).toFixed(2)}</h4>
                </td>
            </tr>
        </Fragment>
    );
}

// const CartQuantity = ({
//     quantity,
//     handleChange,
//     handleIncrease,
//     handleDecrease,
// }) => {
//     return (

//     );
// }

// CartQuantity.propTypes = {
//     quantity: PropTypes.number.isRequired,
//     handleChange: PropTypes.func.isRequired,
//     handleIncrease: PropTypes.func.isRequired,
//     handleDecrease: PropTypes.func.isRequired,
// }

//   cart data
// const ProductsData = [
//     {
//         id: 1,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 74500.00,
//         mrp: 112500,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPM0025R22_YAA22XXXXXXXXXXXX_ABCD00-PICS-00001-1024-2701.jpg"
//             },
//             {
//                 id: 2,
//                 image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVGC0661B01_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-55413.png"
//             },
//             {
//                 id: 3,
//                 image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66176.png"
//             }
//         ],
//     },
//     {
//         id: 2,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'primary', 'dark'],
//         salePrice: 139.00,
//         mrp: 139.00,
//         sale: false,
//         rating: 4.6,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVGC0661B01_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-55413.png"
//             }
//         ],
//     },
//     {
//         id: 3,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 39.00,
//         mrp: 49.00,
//         sale: true,
//         rating: 3.6,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66176.png"
//             }
//         ],
//     },
//     {
//         id: 4,
//         name: 'Nike SuperRep Go',
//         colors: ['danger', 'warning', 'info'],
//         salePrice: 69.00,
//         mrp: 69.00,
//         sale: false,
//         rating: 3.6,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product4
//             }
//         ],
//     },
//     {
//         id: 5,
//         name: 'Unpaired maroon plimsoll',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 49.00,
//         mrp: 49.00,
//         sale: false,
//         rating: 4.2,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product5
//             }
//         ],
//     },
//     {
//         id: 6,
//         name: 'Nike Legend Essential 2',
//         colors: ['primary', 'dark'],
//         salePrice: 30.00,
//         mrp: 39.00,
//         sale: true,
//         rating: 3.8,
//         new: true,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product6
//             }
//         ],
//     },
//     {
//         id: 7,
//         name: 'Nike Black and White',
//         colors: ['danger', 'info', 'dark'],
//         salePrice: 239.00,
//         mrp: 239.00,
//         sale: false,
//         rating: 3.9,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product7
//             }
//         ],
//     },
//     {
//         id: 8,
//         name: 'Nike shoes Dark Brown',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 29.00,
//         mrp: 29.00,
//         sale: false,
//         rating: 2.9,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product8
//             }
//         ],
//     },
//     {
//         salePrice: 39.00,
//         id: 9,
//         name: 'Henry Saxton',
//         colors: ['danger', 'primary', 'dark'],
//         mrp: 39.00,
//         sale: false,
//         rating: 3.9,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product2
//             }
//         ],
//     },
//     {
//         id: 10,
//         name: 'Juanita Diener',
//         colors: ['primary', 'dark'],
//         salePrice: 29.00,
//         mrp: 29.00,
//         sale: false,
//         rating: 2.9,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product4
//             }
//         ],
//     },
//     {
//         id: 11,
//         name: 'Boris Ortiz',
//         colors: ['danger', 'warning', 'info'],
//         salePrice: 39.00,
//         mrp: 39.00,
//         sale: false,
//         rating: 4.9,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product6
//             }
//         ],
//     },
//     {
//         id: 12,
//         name: 'Mr. Stefan Jenkins',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 129.00,
//         mrp: 129.00,
//         sale: false,
//         rating: 3.8,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product8
//             }
//         ],
//     },
//     {
//         id: 13,
//         name: 'Wayfarer Styled Sunglasses',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 39.00,
//         mrp: 39.00,
//         sale: false,
//         rating: 3.8,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Glasses',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg4
//             }
//         ],
//     },
//     {
//         id: 14,
//         name: 'Nike Black and White',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 79.00,
//         mrp: 79.00,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg9
//             }
//         ],
//     },
//     ,
//     {
//         id: 15,
//         name: 'White & Red Nike Athletic Shoe',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 49.00,
//         mrp: 49.00,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg1
//             }
//         ],
//     },

// ]
export default Cart