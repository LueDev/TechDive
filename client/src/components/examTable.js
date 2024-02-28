import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import '../styles/examtable.css';
import HeatMap from 'react-heatmap-grid';

const calculateBMI = (weight, height) => {
  return weight / (height * height);
};

function HeatMapTable() {
  // Creating 2D grid of weights X heights
  const weights = Array.from({ length: 10 }, (_, i) => 50 + i * 10); // 50kg to 140kg
  const heights = Array.from({ length: 10 }, (_, i) => 150 + i * 10); // 150cm to 240cm

  // Setting Labels for our axis
  const xLabels = weights.map((weight) => `${weight} kg`);
  const yLabels = heights.map((height) => `${height}cm`);

  // Creating data
  const data = heights.map((height) =>
    weights.map((weight) => {
      const bmi = calculateBMI(weight, height / 100); // Convert height to meters
      return bmi;
    }),
  );

  const cellStyle = (background, value, min, max, data, x, y) => ({
    background: getColor(value),
    fontSize: '10px',
    border: '1px solid #fff',
    boxSizing: 'border-box',
  });

  const getColor = (bmi) => {
    if (bmi < 18.5)
      return '#fc8d62'; // Under weight : orange
    else if (bmi >= 18.5 && bmi < 25)
      return '#66c2a5'; // Normal : green
    else if (bmi >= 25 && bmi < 30)
      return '#FDDA0D'; // Overweight : yellow
    else return '#e78ac3'; // Obese : pink
  };

  return (
    <div>
      <div className="info-container">
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          data={data}
          xLabelsStyle={{ fontSize: '10px' }}
          yLabelWidth={60}
          cellStyle={cellStyle}
          onClick={(x, y) => ({})}
          onMouseEnterCell={(x, y) => ({})}
        />
      </div>
    </div>
  );
}

const ExamTable = ({ records }) => {
  const generatedImageUrl = 'https://thispersondoesnotexist.com/';

  return (
    <div>
      <div className="container">
        <div className="info-container">
          {/* Patient Information */}
          <div className="profile-container">
            {/* Profile Picture */}
            {records.map((record, index) => (
              <div key={index}>
                <img
                  className="profile-image"
                  src={generatedImageUrl}
                  alt="Patient"
                />
                <p>{record.examId}</p>
              </div>
            ))}
            {/* Profile Information */}
            <div className="profile-info">
              {records.map((record, index) => (
                <div className="profile-info" key={index}>
                  <div className="profile-info-row">
                    <div className="profile-info-item">
                      <h3>Age</h3>
                      <p>{record.age}</p>
                    </div>
                    <div className="profile-info-item">
                      <h3>Sex</h3>
                      <p>{record.sex}</p>
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-item">
                      <h3>Status</h3>
                      <p>{record.status}</p>
                    </div>

                    <div className="profile-info-item">
                      <h3>BMI</h3>
                      <p>{record.bmi}</p>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-item">
                      <h3>Brixia</h3>
                      <p>{record.brixiaScores}</p>
                    </div>

                    <div className="profile-info-item">
                      <h3>ZipCode</h3>
                      <p>{record.zipCode}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="example-div">
          <div className="image-container">
            {records.map((item, index) => (
              <img key={index} style={{ width: '300px' }} src={item.imageURL} />
            ))}
          </div>

          {records.map((record, index) => (
            <div className="findings-div">
              <div>
                <h3>Key Findings:</h3>
                <p>{record.keyFindings}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="example-div"
          style={{ marginTop: '440px', zIndex: '99', marginLeft: '-40px' }}
        >
          <div>
            <h2 style={{ marginLeft: '200px' }}>Body Mass Index</h2>
            <HeatMapTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTable;
