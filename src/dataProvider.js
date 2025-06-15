import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { isEmpty } from "lodash";

const httpClient = fetchUtils.fetchJson;

const headerOptions = () => {
  const options = {};
  const token = localStorage.getItem("auth");

  const customHeaders =
    options.headers ||
    new Headers({
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    });
  options.headers = customHeaders;
  return options;
};

const dataProvider = (apiUrl) => {
  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify({ field: field, order: order }),
        range: JSON.stringify({
          offset: (page - 1) * perPage,
          limit: page * perPage - 1,
        }),
        filter: JSON.stringify(params.filter),
      };
      const options = headerOptions();
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const { json, headers } = await httpClient(url, {
        method: "GET",
        ...options,
      });

      return !isEmpty(json.data) ? json : { data: [], total: 0 };
    },

    getOne: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
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
      return json;
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
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    },

    create: async (resource, params) => {
      const options = headerOptions();

      const formData = new FormData();
      for (const key in params.data) {
        if (key === "cover_image" && params.data[key].rawFile) {
          formData.append(
            "cover_image",
            params.data[key].rawFile,
            params.data[key].title
          );
        } else {
          formData.append(key, params.data[key]);
        }
      }

      if (resource == "documents") {
        const userObj = localStorage.getItem("user");
        if (userObj) {
          const user = JSON.parse(userObj);
          formData.append("user_id", user.sub);
        }
      }
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
        ...options,
      });
      return json;
    },

    update: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const options = headerOptions();
      const { json, status } = await httpClient(url, {
        method: "PUT",
        body: new URLSearchParams({ data: JSON.stringify(params.data) }),
        ...options,
      });

      return json;
    },

    updateMany: async (resource, params) => {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const options = headerOptions();
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
        ...options,
      });
      return { data: json };
    },

    delete: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const options = headerOptions();
      const { json } = await httpClient(url, {
        method: "DELETE",
        ...options,
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
        method: "DELETE",
        body: JSON.stringify(params.data),
        ...options,
      });
      return json;
    },
  };
};

export default dataProvider;
