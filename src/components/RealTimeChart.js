import React from 'react';
import { Line } from 'react-chartjs-2';

const RealTimeChart = ({ data }) => {
    const chartData = {
        labels: data.map((_, index) => index + 1), 
        datasets: [
            {
                label: 'Real-Time Data',
                data: data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default RealTimeChart;