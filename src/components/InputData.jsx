import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faRobot } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Spinner from "./Spinner"

const InputData = ({ input, setInput }) => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

    const navigatePage = () => {
        window.open('https://github.com/NatureSon22', '_blank')
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const checkError = () => {
        if (!input.trim()) {
            return "Input some values";
        }
    
        const array = input.trim().split(",");
    
        if (array.some(num => Number.isNaN(Number(num)))) {
            return "Please verify your inputted values";
        }

        if (array.length < 20) {
            return "Values must be greater than or equal to 20";
        }
    
        return null;
    };    

    const handleClick = () => {
        let message = checkError();
        if(message) {
            alert(message);
            return;
        }

        setClick(!click);

        setTimeout(() => {
            setClick(!click);
            navigate('/table');
        }, 2000)
    }

    return (
        <div className="main-container">
            <div className="nav-container">
                <FontAwesomeIcon className="nav-icon" icon={faRobot}></FontAwesomeIcon>
                <FontAwesomeIcon className="nav-icon" icon={faGithub} onClick={navigatePage} ></FontAwesomeIcon>
            </div>
            
            <h1 className="container-title" >Statistical Measures for Grouped Data</h1>

            <div className="input-container">
                <textarea className="main-input" placeholder="Please input the data you wish to analyze, ensuring each value is strictly separated by a comma. For example: 12, 22, 45, 68" cols="30" rows="10" onChange={handleInput} ></textarea>
                
                {
                    !click ? 
                        <div className="btn-submit">
                            <button onClick={handleClick} >Submit</button>
                        </div> 
                        :
                        <Spinner></Spinner>
                }
            </div>
        </div>
    )
}

export default InputData