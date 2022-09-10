import React, { useState, useEffect } from "react";
import styles from './GuessingGame.module.css'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";

function GuessingGame(){

  const [rightguess, setRightGuess] = useState (""); //luckynumber
  const [guess, setGuess] = useState("");
  const [guessNum, setGuessNum] = useState (0); //number of times user guessed
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!localStorage.getItem('guess')) {
        luckyNumber();
    } 
    else{
        setRightGuess(localStorage.getItem('guess'));
        setGuessNum(localStorage.getItem('guessNumber'))
    }
  }, [])

 
  function luckyNumber (){
  let ranNum = Math.floor(Math.random()*100)
  setRightGuess(ranNum)
  localStorage.setItem("guess", ranNum)
  //console.log(ranNum)
  }

  function handleChange(event){
  setGuess(event.target.value)
  //console.log(event.target.value)
  }

  function guessClick(){
  
    setGuessNum(guessNum+1)
    localStorage.setItem("guessNumber", guessNum+1)
    if(guess == rightguess){
        setMessage("You guessed the Lucky Number!")
    }
    else if (guess > rightguess){
        setMessage("Your guess is too high!")
    }
    else {
        setMessage("Your guess is too low")
    }   
  }

  function handleReset(){
    luckyNumber();
    setGuess("");
    setGuessNum(0);
    setMessage("Guess another lucky number")
    localStorage.setItem('guessNumber',0)
  }


  return(
    <div className={styles.template}>
        <p> I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
        <p>You have made {guessNum} guesses.</p>
    <Form>
        <Form.Control onChange={handleChange} type="number" placeholder="Enter your guess" />
        <br/>
        <Button onClick={guessClick} className="button1" variant="primary">Guess</Button>{' '}
    </Form>
        <p>{message}</p>
        <Button onClick={handleReset} variant="primary">Reset</Button>{' '}
    </div>
    
)
    
}
export default GuessingGame
