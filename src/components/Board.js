import React from "react";
import Square from './Square'

class Board extends React.Component {
   renderSquare(i) {
      return (
         <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            winnerLine={this.props.winner}
            key={i}
            i={i}
         />
      );
   }

   renderSquares(n) {
      let i;
      let row = [];

      for(i = n; i < n+3; i++){
         row.push(this.renderSquare(i));
      }

      return row;
   }

   renderRow(i){
      return (
         <div className="board-row" key={i}>{this.renderSquares(i)}</div>
      )
   }

   renderBoard() {
      let i;
      let board = [];
      let rows = [0,3,6];

      for(i = 0; i < 3; i++){
         board.push(this.renderRow(rows[i]));
      }

      return board;
   }

   render() {
      return (
         <div>
            {this.renderBoard()}
         {/*   <div className="board-row">*/}
         {/*      {this.renderSquare(0)}*/}
         {/*      {this.renderSquare(1)}*/}
         {/*      {this.renderSquare(2)}*/}
         {/*   </div>*/}
         {/*   <div className="board-row">*/}
         {/*      {this.renderSquare(3)}*/}
         {/*      {this.renderSquare(4)}*/}
         {/*      {this.renderSquare(5)}*/}
         {/*   </div>*/}
         {/*   <div className="board-row">*/}
         {/*      {this.renderSquare(6)}*/}
         {/*      {this.renderSquare(7)}*/}
         {/*      {this.renderSquare(8)}*/}
         {/*   </div>*/}
         </div>
      );
   }
}
export default Board;