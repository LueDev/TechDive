import React from 'react';

const DashboardChart = () => {
    return (
        <div className='main-content'>
            <h1>Dashboard</h1>
            <h1></h1>
        <div style={{ width: '80vw', height: '100vh' }}>
            
            <iframe
                style={{
                    background: '#F1F5F4',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                    width: '100%',
                    height: '100%'
                }}
                src="https://charts.mongodb.com/charts-techdive-cdjed/embed/dashboards?id=f535b006-8638-4543-8f3c-832bd74f962a&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
                title="DashboardChart"
                allowFullScreen={true}
            ></iframe>
        </div>
        </div>
    );
};

export default DashboardChart;
