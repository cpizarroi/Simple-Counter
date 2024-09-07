import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "../styles/index.css";
import PropTypes from "prop-types";

function SimpleCounter({ digitSix, digitFive, digitFour, digitThree, digitTwo, digitOne }) {
    return (
        <div Class="Counter">
            <div Class="icono">
                <i Class="far fa-clock"></i>
            </div>
            <div Class="six">{digitSix % 10}</div>
            <div Class="five">{digitFive % 10}</div>
            <div Class="four">{digitFour % 10}</div>
            <div Class="three">{digitThree % 10}</div>
            <div Class="two">{digitTwo % 10}</div>
            <div Class="one">{digitOne % 10}</div>
        </div>
    );
}

SimpleCounter.propTypes = {
    digitSix: PropTypes.number.isRequired,
    digitFive: PropTypes.number.isRequired,
    digitFour: PropTypes.number.isRequired,
    digitThree: PropTypes.number.isRequired,
    digitTwo: PropTypes.number.isRequired,
    digitOne: PropTypes.number.isRequired,
};

function App() {
    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [targetTime, setTargetTime] = useState(0); 
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setCounter(prevCounter => {
                const newCounter = prevCounter + 1;
                if (newCounter === targetTime) {
                    alert(`¡Has alcanzado el objetivo de ${targetTime} segundos!`);
                }
                return newCounter;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, targetTime]);

    const six = Math.floor(counter / 100000);
    const five = Math.floor(counter / 10000);
    const four = Math.floor(counter / 1000);
    const three = Math.floor(counter / 100);
    const two = Math.floor(counter / 10);
    const one = Math.floor(counter / 1);

    const handleStop = () => setIsRunning(false);
    const handleStart = () => setIsRunning(true);
    const handleReset = () => {
        setCounter(0);
        setIsRunning(false);
    };

    return (
        <div>
            <SimpleCounter 
                digitOne={one} 
                digitTwo={two}  
                digitThree={three} 
                digitFour={four} 
                digitFive={five} 
                digitSix={six} 
            />
            <div Class="controls m-5 d-flex justify-content-center">
                <button onClick={handleStart} type="button" class="btn btn-outline-primary m-3">Start</button>
                <button onClick={handleStop} type="button" class="btn btn-outline-danger m-3">Stop</button>
                <button onClick={handleReset} type="button" class="btn btn-outline-primary m-3">Reset</button>
            </div>
            <div Class="target-time m-5 d-flex justify-content-center">
                <h6 htmlFor="targetTime" class="m-2">Set Target Time (seconds):</h6>
                <input 
                    id="targetTime"
                    type="number" 
                    value={targetTime} 
                    onChange={e => setTargetTime(Number(e.target.value))} 
                    Class="form-control w-25 mx-2"
                />
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#app")
);
