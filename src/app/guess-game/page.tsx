'use client'
import React, { useState } from 'react';
import { fetchData } from '../actions';

const GuessGame = () => {
    const [userName, setUserName] = useState<string>(''); // User Name
    const [gameStarted, setGameStarted] = useState<boolean>(false); // Game Status
    const [userGuess, setUserGuess] = useState<string>(''); // User's guess
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1); // Random number
    const [feedback, setFeedback] = useState<string>(''); // Message to user
    const [attempts, setAttempts] = useState<number>(0); // Number of attempts

    // Name change handler
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    // Start of the game
    const startGame = () => {
        if (userName.trim()) {
            setGameStarted(true);
            setFeedback('Try to guess a number between 1 and 100!');
            setAttempts(0); // Resetting attempts for a new game
        } else {
            setFeedback('Please enter your name!');
        }
    };

    // Guess change handler
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserGuess(e.target.value);
    };

    // Checking a guess
    const checkGuess = () => {
        const guess = parseInt(userGuess, 10);
        if (isNaN(guess)) {
            setFeedback('Enter the correct number!');
            return;
        }

        setAttempts(attempts + 1); // Increase number of attempts

        if (guess < randomNumber) {
            setFeedback("It&quot;s too little!");
        } else if (guess > randomNumber) {
            setFeedback("It&quot;s too much!");
        } else {
            setFeedback(`Congratulations, ${userName} you guessed number: ${randomNumber} in ${attempts + 1} attempts.`);
            setGameStarted(false); // Resetting game
            fetchData(userName, attempts + 1)
            setUserGuess(''); // Clearing input field
            setRandomNumber(Math.floor(Math.random() * 100) + 1); // Generate a new number
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* If the game hasn't started */}
            {!gameStarted ? (
                <div>
                    <h1>Enter your name</h1>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={handleNameChange}
                        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
                    />
                    <button
                        onClick={startGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        Start game
                    </button>
                    {feedback && <p style={{ marginTop: '20px', color: 'red' }}>{feedback}</p>}
                </div>
            ) : (
                <div>
                    <h1>Hello, {userName}!</h1>
                    <p>{feedback}</p>
                    <input
                        type="number"
                        value={userGuess}
                        onChange={handleInputChange}
                        placeholder="Enter number"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            marginTop: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button
                        onClick={checkGuess}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#008CBA',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        Check
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuessGame;
