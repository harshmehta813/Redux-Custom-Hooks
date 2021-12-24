import useTimer from "./hook/useTimer";
import Counter from "./Counter/Counter";
import useFetch from "./hook/useFetch";
import { useState } from "react";
import "./styles.css";

export default function App() {
	const { value, startTimer, pauseTimer, resetTimer } = useTimer({
		initialValue: 20
	});

	const [page, setPage] = useState(1);
	const [url, setUrl] = useState("https://api.github.com/search/users?q=masai");
	const { loading, data, isError, fetchRequest } = useFetch(
		url + `&page=${page}`
	);
	return (
		<div className="App">
			<div className="timer">
				<h1>Timer</h1>
				<h2>{value}!</h2>
				<button onClick={startTimer}>START</button>
				<button onClick={pauseTimer}>PAUSE</button>
				<button onClick={resetTimer}>RESET</button>
			</div>
			<hr />
			<Counter />
			<hr />
			<div className="usefetch">
				<h1>Use Fetch</h1>
				{loading && "...LOADING"}
				<ul>
					{!loading &&
						data?.items?.map((item) => <li key={item.login}>{item.login}</li>)}
				</ul>
				<div>
					<button onClick={() => setPage((prev) => prev + 1)}>NEXT</button>
				</div>
			</div>
		</div>
	);
}
