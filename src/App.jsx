import axios from 'axios';
// * Add
import moment from 'moment';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [bitcoinData, setBitcoinData] = useState([]);
	// * Add
	const [preparedData, setPreparedData] = useState([]);

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'
			)
			.then((response) => {
				setBitcoinData(response.data);
				console.log('bitcoinData', bitcoinData);
				// * Add
				const prepareData = response.data.prices.map((dataPoint) => {
					return {
						timestamp: moment(dataPoint[0]).format('M/D/YYYY h:mm A'),
						price: dataPoint[1],
					};
				});
				// * Add
				setPreparedData(prepareData);
				// * Add
				console.log('preparedData', preparedData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return;
}

export default App;
