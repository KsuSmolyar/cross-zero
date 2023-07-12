import "./App.css";
import React, { useState } from "react";
import "./style.css";
import ReactDOM from "react-dom";

function App() {
	//1 С помощью useState возвращаем массив squares, — он будет хранить клетки игрового поля:
	//squares будет инициализироваться в начале игры как массив из девяти пустых элементов,
	//а его состояние при необходимости будет изменять функция setSquares.

	const [squares, setSquares] = useState(Array(9).fill(null)); //то же самое (Array.from({length: 9}, (item, index) => null))

	//2 Создадим второй хук для хранения очереди (кто ходит следующим: X или 0):
	//По умолчанию состояние устан-ся в true — это значит, что первыми будут ходить крестики. Ф-я setXIsNext переключает очереди игроков.
	const [xIsNext, setXIsNext] = useState(true);

	// 3 шаг внизу
	//4 Значение calculateWinner хранится в переменной winner:
	const winner = calculateWinner(squares);

	//5 Взаимод-е игроков с интерфейсом б. происх. ч/з ф-ю handleClick, кот. выз-ся при клике на игровое поле. Она создаёт копию массива квадратов,
	// проверяет, м. ли текущий игрок сделать ход в выбранный квадрат, и изменяет массив квадратов и сос-е игрока (чередует ходы), если ход был возможен.

	const handleClick = (i) => {
		const squaresCopy = [...squares];
		if (winner || squaresCopy[i]) return;
		squaresCopy[i] = xIsNext ? "X" : "O";
		setSquares(squaresCopy);
		setXIsNext((prev) => !prev);
	};

	//6 След. ф-я б. рисовать клетки поля, кот. на самом деле яв-ся обыкновенными HTML-кнопками. renderSquare принимает номер квадрата и возвращает кнопку,
	//на которую можно кликнуть и сделать ход:

	const renderSquare = (i) => {
		return (
			<button className='square' onClick={() => handleClick(i)}>
				{squares[i]}
			</button>
		);
	};

	//7 Пусть программа выводит статус игры над полем. Если есть победитель, то статус будет «Победитель: X» или «Победитель: 0».
	//Если же победителя нет — «Следующий игрок: X» или «Следующий игрок: 0» или если все ходы закончились, то GameOver

	let status = "";
	if (winner) {
		status = `Winner: ${winner}`;
	} else if (!winner) {
		for (let i = 0; i < squares.length; i++) {
			if (typeof squares[i] != "string") {
				status = `Next player: ${xIsNext ? "X" : "O"}`;
				break;
			} else {
				status = `Game Over`;
			}
		}
	}

	//8 Теперь пропишем JSX-элементы, которые будет возвращать функция App, — они и будут отображаться на странице:

	return (
		<div className='game-field'>
			<div className='status'>{status}</div>
			<div className='board-row flex flex_1'>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className='board-row flex flex_2'>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className='board-row flex flex_3'>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	);
}

//3 На каждом ходе надо проверять, не определился ли победитель. Для этого напишем функцию calculateWinner:
// В calculateWinner передаётся массив с текущими значениями клеток игрового поля. Во внутреннем массиве lines содержатся выигрышные комбинации полей.
//Ф-я перебирает их, подставляя на место индексов входного массива, и, если все три значения совпадут, возвращает победителя (X или 0) или null, если победителя нет.
const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};
export default App;
