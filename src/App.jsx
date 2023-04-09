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
				console.log('bitcoinData', bitcoinData);
				const prepareData = response.data.prices.map((dataPoint) => {
					return {
						timestamp: moment(dataPoint[0]).format('M/D/YYYY'),
						price: dataPoint[1],
					};
				});
				setPreparedData(prepareData);
				console.log('preparedData', preparedData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<LineChart width={900} height={450} data={preparedData}>
				<CartesianGrid strokeDasharray="3 3" />
				<Line dataKey={'price'} stroke="#8884d8" strokeWidth={2} />
				<XAxis dataKey={'timestamp'} />
				<YAxis domain={[27500, 28500]} dataKey={'price'} />
				<Tooltip />
				<Legend />
			</LineChart>
		</>
	);
}

export default App;
