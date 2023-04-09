import axios from 'axios';
import moment from 'moment';
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
						timestamp: moment(dataPoint[0]).format('M/D/YYYY h:mm A'),
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

	return;
}

export default App;

[
	{ timestamp: '4/8/2023 1:45 AM', price: 27940.316849290357 },
	{ timestamp: '4/8/2023 1:51 AM', price: 27937.746214330138 },
	{ timestamp: '4/8/2023 1:55 AM', price: 27945.530505731716 },
	{ timestamp: '4/8/2023 1:59 AM', price: 27934.43871284895 },
];
