export default amount => Number(
    
    (Math.round( Number(amount) * 100000000 ) / 100000000).toFixed(8)
);