const getSalePrice = (full_price, sale) => {
    return full_price * (1 - sale * 0.01).toFixed(2)
}

export default getSalePrice