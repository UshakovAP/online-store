export const categories = {
    processors: { _id: 1, name: 'процессоры' },
    motherboards: { _id: 2, name: 'материнские платы' },
    videocards: { _id: 3, name: 'видеокарты' },
    hdd: { _id: 4, name: 'HDD' },
    ssd: { _id: 5, name: 'SSD' },
    ram: { _id: 6, name: 'оперативная память' },
    cases: { _id: 7, name: 'корпуса' },
    powersupplies: { _id: 8, name: 'блоки питания' },
    coolingsystems: { _id: 9, name: 'системы охлаждения' },
    monitors: { _id: 10, name: 'мониторы' },
};

const fetchAll = () =>
    new Promise(resolve => {
        window.setTimeout(function () {
            resolve(categories);
        }, 1000);
    });

export default {
    fetchAll,
};
