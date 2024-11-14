<Fragment>
<section className="pb-lg-14 pb-8 bg-white pt-5 mt-0 overflow-hidden">
    <hr />
    <Container className='mt-5'>
        <Row>
            <Col xs={12}>
                <div className="mb-6">
                    <h2 className="mb-1 h1">Most Popular Jewellery</h2>
                    <p>
                        These are the most popular Jewellery.
                    </p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Tab.Container defaultActiveKey="Diamond">
                    <Nav className="nav-lb-tab  mb-6 bg-gray-200 px-5 rounded-3 ">
                        {tabs.map((tab, index) => (
                            <Nav.Item key={index} className={index === 0 ? 'ms-0' : ''}>
                                <Nav.Link eventKey={tab} className="mb-sm-3 mb-md-0">
                                    {tab}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Tab.Content>
                        {tabs.map((tab, index) => (
                            <Tab.Pane eventKey={tab} className="pb-4 p-4 ps-0 pe-0" key={index}>
                                <Row className="d-flex justify-content-start">
                                    {data && data.map((item, index) => (
                                        <Col lg={3} md={4} sm={6} xs={6} key={index}>
                                            <div className="d-flex">
                                                <ProductCard item={item} />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </Col>
        </Row>
    </Container>
</section>
</Fragment>