import React from "react";
import Board from "./Board";

class Game extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         history: [{
            squares: Array(9).fill(null)
         }],
         xIsNext: true,
         stepNumber: 0
      };
      calculateWinner = calculateWinner.bind(this);
   }

   handleClick(i) {
      const locations = [
         [1, 1],
         [2, 1],
         [3, 1],
         [1, 2],
         [2, 2],
         [3, 2],
         [1, 3],
         [2, 3],
         [3, 3]
      ];

      const history =  this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];

      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
         return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
         history: [...history, {squares, location: locations[i] } ],
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext
      });

   }

   jumpTo(step){
      this.setState({
         stepNumber: step,
         xIsNext: (step % 2) === 0,
      });
   }

   render() {
      const {history, stepNumber } = this.state;
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
         const description = move ?
            'Go to move #' + move+ " @ " + history[move].location :
            'Go to the beginning';

         return (
            <li key={move}>
               <button onClick={() => this.jumpTo(move)}>
                  {(this.state.stepNumber === move) ? <b>{description}</b> : description}
               </button>
            </li>
         )
      });

      let status = '';

      if(winner){
         status = 'Winner: ' + winner.player;
      }
      else if(!current.squares.includes(null)){
         status = <i><b>WAS A DRAW. Reset</b></i>;
      }
      else{
         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
         <div className="game">
            <div className="game-board">
               <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                  winner={winner ? winner.line : []}
               />
            </div>
            <div className="game-info">
               <div>{ status }</div>
               <ol>{ moves }</ol>
            </div>
         </div>
      );
   }
}

export default Game;

function calculateWinner(squares) {
   console.log(squares);
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
         return {
            player: squares[a],
            line: [a,b,c],
         };
      }
   }
   return null;
}


