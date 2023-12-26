import httpService from './http.service';

const basketEndpoint = 'basket/';

const basketService = {
    createBasketItem: async payload => {
        const { data } = await httpService.post(basketEndpoint, payload);
        return data;
    },
    getBasketItems: async () => {
        const { data } = await httpService.get(basketEndpoint);
        return data;
    },
    removeBasketItem: async basketItemId => {
        const { data } = await httpService.delete(
            basketEndpoint + basketItemId
        );
        return data;
    },
    updateBasketItem: async payload => {
        const { data } = await httpService.patch(
            basketEndpoint + payload._id,
            payload
        );
        return data;
    },
};

export default basketService;
