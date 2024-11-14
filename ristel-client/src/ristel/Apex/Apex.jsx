import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import Chart from 'react-apexcharts';
// import { useGetAllOrdersQuery, useGetProductsCountByMaterialQuery, useGetUserStaticsQuery } from '../../../redux/apis/adminApi';
// import { toWords } from 'number-to-words';
import { useGetAllOrdersOnStatQuery, useGetProductsCountByMaterialQuery, useGetUserStaticsQuery } from '../../redux/apis/adminApi';







const Apex = () => {

    const { data, error, isLoading } = useGetAllOrdersOnStatQuery();


    const [chartData, setChartData] = useState({
        orders: [],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                title: {
                    text: '₹ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        const formattedValue = new Intl.NumberFormat('en-IN').format(val);
                        return `₹ ${formattedValue}`;
                    }
                }
            }
        }
    });

    useEffect(() => {
        if (data && data.orders) {
            const orderCounts = data.orders.map(order => order.orderCount);
            const totalRevenues = data.orders.map(order => order.totalRevenue);
            const months = data.orders.map(order => order.month);


            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            const filteredMonths = [];
            const filteredOrderCounts = [];
            const filteredTotalRevenues = [];

            months.forEach((month, index) => {

                const monthIndex = new Date(`${month} 1, ${currentYear}`).getMonth();
                if (monthIndex <= currentMonth) {
                    filteredMonths.push(month);
                    filteredOrderCounts.push(orderCounts[index]);
                    filteredTotalRevenues.push(totalRevenues[index]);
                }
            });

            setChartData({
                orders: [
                    { name: 'Order Count', data: filteredOrderCounts },
                    { name: 'Total Revenue', data: filteredTotalRevenues }
                ],
                options: {
                    ...chartData.options,
                    xaxis: {
                        categories: filteredMonths
                    }
                }
            });
        }
    }, [data]);

    if (isLoading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">Error occurred: {error.message}</Alert>;

    return (
        <Container>
            {/* Financial Overview */}
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <Card style={{ padding: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card.Header style={{ backgroundColor: '#15B392', color: '#fff', textAlign: 'center', fontSize: '1.12rem' }}>
                            Financial Overview
                        </Card.Header>
                        <Card.Body>
                            <Chart
                                options={chartData.options}
                                series={chartData.orders}
                                type="bar"
                                height={350}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Additional Charts */}
            <Row>
                <Col md={6}>
                    <PieChart />
                </Col>
                <Col md={6}>
                    <RadialBarChart />
                </Col>
            </Row>
        </Container>
    );
};













const PieChart = () => {
    const { data: userStatics, error, isLoading } = useGetUserStaticsQuery();
    const totalUsers = userStatics?.totalUsers || 0;
    const deletedUsers = userStatics?.deletedUsers || 0;
    const blockedUsers = userStatics?.blockedUsers || 0;
    const usersLoggedInLast30Days = userStatics?.usersLoggedInLast30Days || 0;


    const options = {

        series: [
            deletedUsers,
            totalUsers,
            usersLoggedInLast30Days,
            blockedUsers,
        ],
        chart: {
            width: "95%",

            type: 'pie',
        },
        labels: ['Deleted Users', 'Total Users', 'Logged In Last 30 Days', 'Blocked Users',],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 400,

                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data.</div>;

    return (
        <Row>
            <Col>
                <Card className="shadow-lg" style={{ margin: '20px', marginTop: "10", borderRadius: '16px' }}>
                    <Card.Body>
                        <Card.Title className="text-center text-primary" style={{ fontSize: '1.30rem', fontWeight: 'bold', minHeight: "90px" }}>
                            User Statistics
                        </Card.Title>
                        <Chart options={options} series={options.series} type="pie" width={options.chart.width} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};












const RadialBarChart = () => {
    const { data, error, isLoading } = useGetProductsCountByMaterialQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    console.log(data)
    if (!data) {
        return <div>No data </div>;
    }




    const materialLabels = Array.isArray(data) ? data && data.map(item => item.material) : [];
    const materialCounts = Array.isArray(data) ? data && data.map(item => item.count || 0) : [];




    console.log(materialCounts);
    console.log(materialLabels);


    const options = {
        series: materialCounts,
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    show: true,
                    name: {
                        fontSize: '10px',
                        color: '#333',
                    },
                    value: {
                        fontSize: '16px',
                        color: '#333',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function () {
                            return materialCounts.reduce((acc, count) => acc + count, 0);
                        },
                    },
                },
            },
        },
        labels: materialLabels,
        theme: {
            mode: 'light',
        },
        stroke: {
            lineCap: 'round',
        },
    };

    return (
        <Row className="justify-content-center">
            <Col>
                <Card className="shadow-lg" style={{ margin: '20px', borderRadius: '15px' }}>
                    <Card.Body>
                        <Card.Title className="text-center text-primary" style={{ fontSize: '1.50rem', fontWeight: 'bold' }}>
                            Material Distribution
                        </Card.Title>
                        <div id="chart">
                            <Chart options={options} series={options.series} type="radialBar" height={options.chart.height} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};















export default Apex;





























































