import apoloClient from "../GrafpQL";

class Api {
  async call(query) {
    console.log('api query', query)
    try {
      const response = await apoloClient.query({
        query: query,
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