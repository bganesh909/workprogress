import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { month: "Oct", projected: 5, actual: 4.3 },
    { month: "Nov", projected: 7, actual: 6.5 },
    { month: "Dec", projected: 6, actual: 5.9 },
    { month: "Jan", projected: 3, actual: 4.6 },
    { month: "Feb", projected: 7, actual: 8.2 },
    { month: "Mar", projected: 3, actual: 7.7 },
];

function ExpenseChart () {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 10}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{value: "(₹ crores)", angle: -90}} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line type="monotone" dataKey="projected" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ExpenseChart;