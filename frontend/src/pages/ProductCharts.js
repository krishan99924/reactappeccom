import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const ProductChart = ({ products }) => {
  const { Products } = useSelector((state) => state.products);
  // Function to transform data into the format expected by Recharts
  const prepareChartData = (products) => {
    // Initialize an empty object to store category counts
    const categoryCounts = {};

    // Count occurrences of each category
    Products.forEach((product) => {
      const { category } = product;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    // Transform category counts into an array of objects with 'name' and 'value' properties
    const chartData = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
    }));

    return chartData;
  };

  // Prepare chart data
  const chartData = prepareChartData(Products);

  // Define custom colors for pie chart slices
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF2A19",
    "#19FF35",
    "#FF1984",
    "#1984FF",
    "#8A8A8A",
  ];

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ProductChart;
