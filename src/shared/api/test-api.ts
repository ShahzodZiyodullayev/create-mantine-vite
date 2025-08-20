import { api } from "./base";

class TestApi {
  async postTestData(value: any) {
    return await api.post("test", value);
  }
}

export const testApi = new TestApi();
