import axios from 'axios';
import moment from 'moment';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
} from 'recharts';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [bitcoinData, setBitcoinData] = useState([]);
	const [preparedData, setPreparedData] = useState([]);

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'
			)
			.then((response) => {
				setBitcoinData(response.data);
				const prepareData = response.data.prices.map((dataPoint) => {
					return {
						timestamp: moment(dataPoint[0]).format('M/D/YYYY'),
						price: dataPoint[1],
					};
				});
				setPreparedData(prepareData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="mt-5">
			<h1 className="text-center text-4xl font-bold">
				Bitcoin 24 hour Price Chart
			</h1>
			<LineChart
				className="mx-auto pt-5"
				width={900}
				height={450}
				data={preparedData}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<Line
					dataKey={'price'}
					stroke="#48BB78"
					strokeWidth={3}
					dot={{ r: 1 }}
				/>
				<XAxis
					dataKey={'timestamp'}
					tick={{ fontSize: '14px', fill: '#718096' }}
				/>
				<YAxis
					domain={[27000, 28500]}
					tick={{ fontSize: '14px', fill: '#718096' }}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						border: 'none',
						borderRadius: '8px',
						boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
						color: '#1A202C',
						fontSize: '14px',
						fontWeight: 'bold',
						padding: '12px',
					}}
					labelStyle={{ fontWeight: 'bold' }}
					cursor={{ stroke: '#718096', strokeWidth: 2 }}
				/>
				<Legend
					verticalAlign="top"
					height={36}
					iconType="circle"
					wrapperStyle={{
						fontSize: '14px',
						fontWeight: 'bold',
						color: '#4A5568',
					}}
				/>
			</LineChart>
		</div>
	);
}

export default App;
