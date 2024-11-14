import CourseFilterPage from '../../components/marketing/pages/courses/course-filter-page/CourseFilterPage'


// import React, { Fragment } from 'react';
// import { Col, Row, Container, Tab, Nav, Form, Card } from 'react-bootstrap'
// import PropTypes from 'prop-types';
// import Icon from '@mdi/react';
// import { mdiStar, mdiStarOutline, mdiStarHalfFull } from '@mdi/js';
// import ReactPaginate from 'react-paginate';
// import { ChevronLeft, ChevronRight } from 'react-feather';
// // import custom components

// // import sub components
// import FilterOptions from './FilterOptions'
// import CourseGridView from './CourseGridView'
// import CourseListView from './CourseListView'
const FilterJewellery = () => {
    return <>
        <CourseFilterPage />
    </>
}
// const CourseFilterPage = () => {
//     const sortByOptions = [
//         { value: 'newest', label: 'Newest' },
//         { value: 'most-popular', label: 'Most Popular' },
//         { value: 'highest-rated', label: 'Highest Rated' }
//     ];

//     return (
//         <Fragment>
//             {/* Page header */}
//             <PageHeading pagetitle="Find Best Jewellery" />

//             {/* Content */}
//             <section className="py-6">
//                 <Container>
//                     <Tab.Container defaultActiveKey="grid">
//                         <Row>
//                             <Col lg={12} md={12} sm={12} className="mb-4">
//                                 <Row className="d-lg-flex justify-content-between align-items-center">
//                                     <Col md={6} lg={8} xl={9}>
//                                         <h4 className="mb-3 mb-lg-0">
//                                             Displaying 9 out of 68 Jewellery
//                                         </h4>
//                                     </Col>
//                                     <Col md={6} lg={4} xl={3} className="d-inline-flex">
//                                         <div className="me-2">
//                                             <GridListViewButton keyGrid="grid" keyList="list" />
//                                         </div>
//                                         <FormSelect options={sortByOptions} placeholder="Sort by" />
//                                     </Col>
//                                 </Row>
//                             </Col>
//                             <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
//                                 <FilterOptions />
//                             </Col>
//                             {/* Tab content */}
//                             <Col xl={9} lg={9} md={8} sm={12}>
//                                 <Tab.Content>
//                                     <Tab.Pane eventKey="grid" className="pb-4 px-0">
//                                         <CourseGridView />
//                                     </Tab.Pane>
//                                     <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
//                                         <CourseListView />
//                                     </Tab.Pane>
//                                 </Tab.Content>
//                             </Col>
//                         </Row>
//                     </Tab.Container>
//                 </Container>
//             </section>
//         </Fragment>
//     );
// };

// export const FormSelect = ({
//     placeholder = '',
//     defaultselected = 'Select',
//     options = [],
//     id = '',
//     name = '',
//     style = '',
//     onChange,
//     required = false,
// }) => {
//     return (
//         <Fragment>
//             <Form.Select
//                 defaultValue={defaultselected}
//                 id={id}
//                 name={name}
//                 onChange={onChange}
//                 required={required}
//                 style={style ? style : {}}
//             >
//                 {placeholder ? (
//                     <option value="" className="text-muted">
//                         {placeholder}
//                     </option>
//                 ) : (
//                     ''
//                 )}
//                 {options.map((item, index) => {
//                     return (
//                         <option key={index} value={item.value} className="text-dark">
//                             {item.label}
//                         </option>
//                     );
//                 })}
//             </Form.Select>
//         </Fragment>
//     );
// };

// FormSelect.propTypes = {
//     placeholder: PropTypes.string,
//     defaultselected: PropTypes.string,
//     id: PropTypes.string,
//     name: PropTypes.string,
//     required: PropTypes.bool
// };

// const GridListViewButton = ({ keyGrid, keyList }) => {
//     return (
//         <Nav className="flex-nowrap btn-group me-2" role="tablist">
//             <Nav.Link
//                 eventKey={keyGrid}
//                 className="btn btn-outline-secondary btn-icon d-flex align-items-center"
//                 bsPrefix=" "
//             >
//                 <span className="fe fe-grid"></span>
//             </Nav.Link>
//             <Nav.Link
//                 eventKey={keyList}
//                 className="btn btn-outline-secondary btn-icon d-flex align-items-center"
//                 bsPrefix=" "
//             >
//                 <span className="fe fe-list"></span>
//             </Nav.Link>
//         </Nav>
//     );
// };

// const PageHeading = ({ pagetitle }) => {
//     return (
//         <section className="bg-primary py-4 py-lg-6">
//             <Container>
//                 <Row className="align-items-center">
//                     <Col xl={12} lg={12} md={12} sm={12}>
//                         <div>
//                             <h1 className="mb-0 text-white display-4">{pagetitle}</h1>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </section>
//     );
// };

// options
// const FilterOptions = () => {
//     return (
//         <Card>
//             {/* Card header */}
//             <Card.Header>
//                 <h4 className="mb-0">Filter</h4>
//             </Card.Header>
//             {/* Card body */}
//             <Card.Body>
//                 <span className="dropdown-header px-0 mb-2"> Category</span>
//                 <Form>
//                     {/* Checkboxes for Courses */}

//                     {[
//                         'Rings',
//                         'Earrings',
//                         'Pendant',
//                         'Necklaces',
//                         'Bracelets and Bangles',
//                         'Mangalsutra',
//                         'Cufflinks',
//                         'Chain',
//                         'Nath',
//                     ].map((item, index) => (
//                         <Form.Check
//                             type="checkbox"
//                             className="mb-1"
//                             label={item}
//                             key={index}
//                         />
//                     ))}
//                 </Form>
//             </Card.Body>
//             {/* Card body */}
//             <Card.Body className="border-top">
//                 <span className="dropdown-header px-0 mb-2"> Ratings</span>
//                 {/* Radio for Ratings */}
//                 <Form>
//                     {[4.5, 4.0, 3.5, 3.0].map((item, index) => (
//                         <Form.Check
//                             type="radio"
//                             id={`formRating${item}`}
//                             className="mb-1"
//                             key={index}
//                         >
//                             <Form.Check.Input type="radio" name="customRadio" />
//                             <Form.Check.Label>
//                                 <span className="text-warning">
//                                     <Ratings rating={item} />
//                                 </span>{' '}
//                                 <span className="fs-6 pt-1">{item} & UP</span>
//                             </Form.Check.Label>
//                         </Form.Check>
//                     ))}
//                 </Form>
//             </Card.Body>
//             {/* Card body */}
//             <Card.Body className="border-top">
//                 <span className="dropdown-header px-0 mb-2"> Skill Level</span>
//                 <Form>
//                     {/* Checkboxes for Level */}
//                     {['All', 'Diamond', 'Gold', 'Silver'].map(
//                         (item, index) => (
//                             <Form.Check
//                                 type="checkbox"
//                                 className="mb-1"
//                                 label={item}
//                                 key={index}
//                             />
//                         )
//                     )}
//                 </Form>
//             </Card.Body>
//         </Card>
//     );
// };

// const Ratings = ({ rating, className, size }) => {
//     rating = Math.abs(rating);
//     let integer = Math.floor(rating);
//     let decimal = rating - integer;
//     let starsize = size ? size : '0.875rem';

//     const PrintFilledStar = (repeatValue) => {
//         const stars = [];
//         for (let i = 1; i <= repeatValue; i++) {
//             stars.push(
//                 <Icon key={i} path={mdiStar} size={starsize} className={className} />
//             );
//         }
//         return stars;
//     };
//     const PrintHalfStar = (repeatValue) => {
//         return repeatValue > 0 ? (
//             <Icon path={mdiStarHalfFull} size={starsize} className={className} />
//         ) : (
//             ''
//         );
//     };
//     const PrintBlankStar = (repeatValue) => {
//         const blankstars = [];
//         for (let i = 1; i <= repeatValue; i++) {
//             blankstars.push(
//                 <Icon
//                     key={i}
//                     path={mdiStarOutline}
//                     size={starsize}
//                     className={className}
//                 />
//             );
//         }
//         return blankstars;
//     };
//     return (
//         <Fragment>
//             {PrintFilledStar(integer)}
//             {PrintHalfStar(decimal)}
//             {PrintBlankStar(5 - integer - (decimal > 0 ? 1 : 0))}
//         </Fragment>
//     );
// };

// const CourseGridView = () => {
//     const [Records] = useState(AllCoursesData.slice(0, 500));

//     //------paging start----------
//     const [pageNumber, setPageNumber] = useState(0);
//     const RecordsPerPage = 9;
//     const pagesVisited = pageNumber * RecordsPerPage;
//     const pageCount = Math.ceil(Records.length / RecordsPerPage);
//     const changePage = ({ selected }) => {
//         setPageNumber(selected);
//     };
//     const displayRecords = Records.slice(
//         pagesVisited,
//         pagesVisited + RecordsPerPage
//     ).map((Records, index) => {
//         return (
//             <Col lg={4} md={6} sm={12} key={index}>
//                 <CourseCard item={Records} />
//             </Col>
//         );
//     });
//     //---end of paging start----------

//     return (
//         <Fragment>
//             <Row>
//                 {displayRecords.length > 0 ? (
//                     displayRecords
//                 ) : (
//                     <Col>No matching records found.</Col>
//                 )}
//             </Row>

//             <ReactPaginate
//                 previousLabel={<ChevronLeft size="14px" />}
//                 nextLabel={<ChevronRight size="14px" />}
//                 pageCount={pageCount}
//                 onPageChange={changePage}
//                 containerClassName={'justify-content-center mb-0 pagination'}
//                 previousLinkClassName={'page-link mx-1 rounded'}
//                 nextLinkClassName={'page-link mx-1 rounded'}
//                 pageClassName={'page-item'}
//                 pageLinkClassName={'page-link mx-1 rounded'}
//                 disabledClassName={'paginationDisabled'}
//                 activeClassName={'active'}
//             />
//         </Fragment>
//     );
// };

export default FilterJewellery