import apoloClient from "../GrafpQL";
import { useQuery } from "@apollo/client";

class Api {
  async call(query) {
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