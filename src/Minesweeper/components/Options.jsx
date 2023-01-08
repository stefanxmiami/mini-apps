import React from 'react';
import '../style/style.css'

const BOARD_SIZES = [
    {
        rows: 9,
        cols: 9,
        mines: 10,
    },
    {
        rows: 16,
        cols: 16,
        mines: 40,
    },
    {
        rows: 30,
        cols: 30,
        mines: 200,
    },
];

const Options = ({ onChange, value }) => (
    <div>
        <label>
            <span className="options-label-text">Board size:</span>
            <select onChange={onChange} value={value}>
                {BOARD_SIZES.map((size, i) => (
                    <option key={i} value={i}>
                        {size.rows} x {size.cols}
                    </option>
                ))}
            </select>
        </label>
    </div>
);

export default Options;