import React from 'react';
import ReactApexChart from 'react-apexcharts';

const FunnelChart = () => {

  const malePopulation = [3, 152, 1695, 9786, 33327, 74390, 125729, 199195, 290773, 413537, 562182, 716607, 866041, 1101542, 1454850, 1844292, 2221739, 2523580, 2795003, 3160775, 3489767];
  const femalePopulation = [15, 398, 3471, 16560, 49956, 109998, 168073, 252326, 348896, 460023, 584814, 719642, 859676, 1091993, 1440686, 1811328, 2139420, 2403386, 2664125, 3020870, 3342338];
  const categories = ['100+', '95-99', '90-94', '85-89', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'];

  // Total population of males and females
  const totalMalePopulation = malePopulation.reduce((acc, val) => acc + val, 0);
  const totalFemalePopulation = femalePopulation.reduce((acc, val) => acc + val, 0);

  // Total population
  const totalPopulation = totalMalePopulation + totalFemalePopulation;

  // Calculate percentage of each age category for males and females
  const malePercentage = malePopulation.map(value => (-(value / totalPopulation) * 100).toFixed(2));
  const femalePercentage = femalePopulation.map(value => ((value / totalPopulation) * 100).toFixed(2));

  const options = {
    chart: {
      type: 'bar',
      height: 440,
      stacked: true
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    yaxis: {
      min: -10,
      max: 10,
      title: {},
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val
        }
      },
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          const population = seriesIndex === 0 ? malePopulation[dataPointIndex] : femalePopulation[dataPointIndex];
          return `${Math.abs(val)}% (Pop: ${population})`;
        }
      }
    },
    title: {
      text: 'Afghanistan Population (2024)'
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Percent'
      },
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + "%"
        }
      }
    },
  };

  const series = [
  {
    name: 'Males',
    data: malePercentage
  },
  {
    name: 'Females',
    data: femalePercentage
  }];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={500} />
      </div>
      <div>
        <h2>Total Population</h2>
        <p>Total Population: {totalPopulation}</p>
        <p>Total Male Population: {totalMalePopulation}</p>
        <p>Total Female Population: {totalFemalePopulation}</p>
      </div>
    </div>
  );
};

export default FunnelChart;
