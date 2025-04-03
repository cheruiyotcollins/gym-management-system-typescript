import Axios, { AxiosInstance } from "axios";

class Api {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = Axios.create({
      baseURL: "http://localhost:9001/api/v1",
      // baseURL: "https://fakestoreapi.com",
      timeout: 45000,
    });
  }

  get(endpoint, query = {}) {
    this.setAuthToken();
    return this.http.get(endpoint, {
      params: query,
    });
  }

  post(endpoint, data) {
    this.setAuthToken();
    return this.http.post(endpoint, data);
  }
  postNoData(endpoint) {
    this.setAuthToken();
    return this.http.post(endpoint);
  }
  patch(
    endpoint,
    data,
    p0: { headers: { Authorization: string; "Content-Type": string } }
  ) {
    this.setAuthToken();
    return this.http.patch(endpoint, data);
  }

  setAuthToken() {
    this.http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }
  delete(endpoint, query = {}) {
    this.setAuthToken();
    return this.http.delete(endpoint, {
      params: query,
    });
  }
}

export default new Api();
