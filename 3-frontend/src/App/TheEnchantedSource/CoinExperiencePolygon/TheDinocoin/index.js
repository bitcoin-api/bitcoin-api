import { createElement as e } from 'react';
import './dinocoin.css';



export default () => {

    return e(
        'div',
        {
            className: 'TheDinocoin-Scene'
        },
        e(
            'div',
            {
                className: 'TheDinocoin-Box'
            },
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--front'
                },
                '🐲'
            ),
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--back'
                },
                '🐉'
            ),
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--right'
                }
            ),
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--left'
                }
            ),
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--top'
                }
            ),
            e(
                'div',
                {
                    className: 'TheDinocoin-BoxFace TheDinocoin-BoxFace--bottom'
                }
            )
        )
    );
};
