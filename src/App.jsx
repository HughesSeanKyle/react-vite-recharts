// *Add
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
	// * Add
	const [bitcoinData, setBitcoinData] = useState([]);

	// * Add
	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'
			)
			.then((response) => {
				setBitcoinData(response.data);
				console.log('bitcoinData', bitcoinData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return;
}

export default App;
