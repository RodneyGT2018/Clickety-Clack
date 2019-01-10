import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import BallCard from "./components/BallCard";
import Footer from "./components/Footer";
import balls from "./balls.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    balls,
    clickedBall: [],
    score: 0
  };

//When you click on a card, the ball is taken out of the array
  imageClick = event => {
    const currentBall = event.target.alt;
    const BallAlreadyClicked =
      this.state.clickedBall.indexOf(currentBall) > -1;

//If you click on a ball that has already been selected, the game is reset and cards reordered.
    if (BallAlreadyClicked) {
      this.setState({
        ball: this.state.balls.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedBall: [],
        score: 0
      });
        alert("Sorry - you dropped the ball...play again?");

//If you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          balls: this.state.balls.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedBall: this.state.clickedBall.concat(
            currentBall
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Great Job - You Win!");
            this.setState({
              balls: this.state.balls.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedBall: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.balls.map(balls => (
            <BallCard
              imageClick={this.imageClick}
              id={balls.id}
              key={balls.id}
              image={balls.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;