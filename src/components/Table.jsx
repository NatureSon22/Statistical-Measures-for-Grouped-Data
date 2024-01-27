import "../table.css"
import TableColumn from "./TableColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Table = ({ input, setInput }) => {
    const array = input.split(',').map(Number);
    const highest = Math.max(...array);
    const lowest = Math.min(...array);
    const range = highest - lowest;
    const interval = Math.round(1 + (3.322 * Math.log10(array.length)));
    const size = Math.ceil(range / interval);
    const intervalArr = [];
    const midMean = [];
    const frequencyMid = [];
    const navigate = useNavigate();

    for (let i = 0; i < size; i++) {
        const firstVal = lowest + (i * interval);
        const secondVal = firstVal + (interval - 1);
        intervalArr[i] = { firstVal, secondVal, count: 0, position: i };
    }

    const findRange = (num) => {
        intervalArr.forEach((range) => {
            const { firstVal, secondVal, position } = range;

            if (num >= firstVal && num <= secondVal) {
                intervalArr[position] = { ...intervalArr[position], count: intervalArr[position].count + 1 };
            }
        });
    };

    array.forEach((num) => {
        findRange(num);
    });

    const midArr = intervalArr.map(({ firstVal, secondVal }) => ((firstVal + secondVal) / 2));
    const mean = midArr.reduce((acc, val, index) => acc + val * intervalArr[index].count, 0) / array.length;

    for(let i = 0; i < size ; i++) {
        midMean[i] = (midArr[i] - mean).toFixed(2);
        frequencyMid[i] = Number((intervalArr[i].count * midArr[i]).toFixed(2));
    }
    
    const variance = (midArr.reduce((acc, val, index) => acc + Math.pow(val - mean, 2) * intervalArr[index].count, 0) / array.length).toFixed(2);

    const standardDeviation = Math.sqrt(variance);

    const handleInput = () => {
        setInput('');
        navigate('/');
    }
    
    return (
        <div className="table-container">
            <div className="container-initial">
                <div className="container">
                    <p>Range: <span>{highest} - {lowest} =  {range}</span></p>
                </div>
                <div className="container">
                    <p>Interval: <span> 1 + (3.322)(log{array.length}) ≈ {interval}</span></p>
                </div>
                <div className="container">
                    <p>Size: <span> {range} / {interval} ≈ {size} </span></p>
                </div>
            </div>

            <div className="container-initial frequency-table">
                <h2>FREQUENCY TABLE</h2>
                <div className="main-table" >
                    <TableColumn 
                        label="x"
                        data = {
                            intervalArr.map((item) => `${item.firstVal} - ${item.secondVal} `)
                        }
                    >
                    </TableColumn>

                    <TableColumn 
                        label="f"
                        data = {
                            intervalArr.map((item) => item.count )
                        }
                    >
                    </TableColumn>

                    <TableColumn 
                        label="m"
                        data = {midArr}
                    >
                    </TableColumn>

                    <TableColumn 
                        label="f &middot; m"
                        data = {frequencyMid}
                    >
                    </TableColumn>

                    <TableColumn 
                        label="m - x̄"
                        data = {midMean}
                    >
                    </TableColumn>

                    <TableColumn 
                        label="( m - x̄ )²"
                        data = {
                            midMean.map(num => Math.pow(num, 2).toFixed(2))
                        }
                    >
                    </TableColumn>

                    <TableColumn 
                        label="f &middot; ( m - x̄ )²"
                        data = {
                            midMean.map((num, i) => ((Math.pow(num, 2).toFixed(2)) * intervalArr[i].count).toFixed(2))
                        }
                    >
                    </TableColumn>
                </div>
            </div>

            <div className="container-initial">
                <div className="container">
                    <p>Mean: 
                        <span>
                            {frequencyMid.reduce((acc, num) => acc + num, 0)} / {array.length} = {mean}
                        </span>
                    </p>
                </div>

                <div className="container">
                    <p>Variance: 
                        <span>
                            { midArr.reduce((acc, val, index) => acc + Math.pow(val - mean, 2) * intervalArr[index].count, 0) } / {array.length} = {variance}
                        </span>
                    </p>
                </div>
                
                <div className="container">
                    <p>Standard Deviation: 
                        <span> 
                            √({variance}) = {standardDeviation.toFixed(2)}
                        </span>
                    </p>
                </div>
            </div>

            <div className="container-btn">
                <button onClick={handleInput} >
                    <FontAwesomeIcon className="calculate-icon" icon={faRepeat} ></FontAwesomeIcon>
                </button>
            </div>
        </div>
    )
}

export default Table