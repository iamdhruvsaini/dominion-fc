const formatPrice = (price) => {
    return (price / 1000000).toFixed(2) + ' M';
};

export default formatPrice;