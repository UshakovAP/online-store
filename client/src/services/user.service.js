import httpService from './http.service';

const userEndpoint = 'user/';

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async payload => {
        const { data } = await httpService.post(userEndpoint, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
};

export default userService;
