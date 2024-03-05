import { Pie } from 'react-chartjs-2';

// Generate random 1-2 digit numbers
const num1 = Math.floor(Math.random() * 100);
const num2 = Math.floor(Math.random() * 100);
const num3 = Math.floor(Math.random() * 100);

const data = {
  labels: [num1.toString(), num2.toString(), num3.toString()],
  datasets: [
    {
      data: [1, 1, 1], // Equal segments
      backgroundColor: ['red', 'green', 'blue'],
    },
  ],
};

function PieChart() {
  return <Pie data={data} />;
}

export default PieChart;