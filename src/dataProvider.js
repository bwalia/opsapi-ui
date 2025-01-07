import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';


const httpClient = fetchUtils.fetchJson;

const headerOptions = () => {
    const options = {}
    const token = localStorage.getItem('auth');

    const customHeaders = (options.headers ||
        new Headers({
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }));
    options.headers = customHeaders;
    return options;
}

const dataProvider = (apiUrl) => {

    return {
        getList: async (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify({ field: field, order: order }),
                range: JSON.stringify({ offset: (page - 1) * perPage, limit: page * perPage - 1 }),
                filter: JSON.stringify(params.filter),
            };
            const options = headerOptions();
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const { json, headers } = await httpClient(url, { method: 'GET', ...options });
            for (const pair of headers.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            console.log({ json });

            return json;
        },

        getOne: async (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`
            const options = headerOptions();
            const { json } = await httpClient(url, options);
            return { data: json };
        },

        getMany: async (resource, params) => {
            const query = {
                filter: JSON.stringify({ ids: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const options = headerOptions();
            const { json } = await httpClient(url, options);
            return { data: json };
        },

        getManyReference: async (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            };
            const options = headerOptions();
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const { json, headers } = await httpClient(url, options);
            return {
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        },

        create: async (resource, params) => {
            const options = headerOptions();
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
                ...options
            })
            return json;
        },

        update: async (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            const options = headerOptions();
            const { json, status } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(params.data),
                ...options
            })

            return json;
        },

        updateMany: async (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const options = headerOptions();
            const { json } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(params.data),
                ...options
            })
            return { data: json };
        },

        delete: async (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            const options = headerOptions();
            const { json } = await httpClient(url, {
                method: 'DELETE',
                ...options
            });
            return { data: json };
        },

        deleteMany: async (resource, params) => {
            const query = {
                ids: JSON.stringify({ id: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const options = headerOptions();
            const { json } = await httpClient(url, {
                method: 'DELETE',
                body: JSON.stringify(params.data),
                ...options
            });
            return { data: json };
        },
    }
};

export default dataProvider;