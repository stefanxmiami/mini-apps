import { useState } from 'react';

export function useCalculator() {

    const [state, setState] = useState({
        sign: '',
        num: 0,
        res: 0,
    });

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(state.num).length < 16) {
            setState({
                ...state,
                num:
                    state.num === 0 && value === '0'
                        ? '0'
                        : removeSpaces(state.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(state.num + value)))
                            : toLocaleString(state.num + value),
                res: !state.sign ? 0 : state.res,
            });
        }
    };

    const equalsClickHandler = () => {
        if (state.sign && state.num) {
            const math = (a, b, sign) =>
                sign === '+'
                    ? a + b
                    : sign === '-'
                        ? a - b
                        : sign === 'X'
                            ? a * b
                            : a / b;

            setState({
                ...state,
                res:
                    state.num === '0' && state.sign === '/'
                        ? "Can't divide with 0"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(state.res)),
                                Number(removeSpaces(state.num)),
                                state.sign
                            )
                        ),
                sign: '',
                num: 0,
            });
        }
    };

    const percentClickHandler = () => {
        let num = state.num ? parseFloat(state.num) : 0;
        let res = state.res ? parseFloat(state.res) : 0;

        setState({
            ...state,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: '',
        });
    };

    const invertClickHandler = () => {
        setState({
            ...state,
            num: state.num ? toLocaleString(removeSpaces(state.num) * -1) : 0,
            res: state.res ? toLocaleString(removeSpaces(state.res) * -1) : 0,
            sign: '',
        });
    };

    const resetClickHandler = () => {
        setState({
            ...state,
            sign: '',
            num: 0,
            res: 0,
        });
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setState({
            ...state,
            sign: value,
            res: !state.res && state.num ? state.num : state.res,
            num: 0,
        });
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setState({
            ...state,
            num: !state.num.toString().includes('.') ? state.num + value : state.num,
        });
    };


    const toLocaleString = (num) =>
        String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');
    const removeSpaces = (num) => num.toString().replace(/\s/g, '');

    return {
        state,
        commaClickHandler,
        numClickHandler,
        equalsClickHandler,
        percentClickHandler,
        invertClickHandler,
        resetClickHandler,
        signClickHandler,
    };
}