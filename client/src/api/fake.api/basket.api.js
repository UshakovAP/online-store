const basket = [];

if (!localStorage.getItem('basket')) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

const fetchAll = () => {
    return JSON.parse(localStorage.getItem('basket'));
};

export default {
    fetchAll,
};
