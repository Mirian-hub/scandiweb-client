import apoloClient from "../graphQl";

class Api {
  async call(query) {
    try {
      const response = await apoloClient.query({
        query: query,
        fetchPolicy: 'no-cache'
      })
      if (!response || !response.data)
        throw new Error("Cannot get data!");

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new Api();