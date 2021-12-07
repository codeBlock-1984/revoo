class MakeRequest {
  static async send(payload) {
    let response = { data: null, error: null };
    try {
      const { url, method, headers, body } = payload;
      const options = MakeRequest.getOptions(method, headers, body);
      const res = await fetch(url, options);
      response.data = await res.json();
      return response;
    } catch (error) {
      response.error = error;
      return response;
    }
  }

  static getOptions(method, headers = {}, body = null) {
    if (!body) {
      return {
        method,
        headers
      };
    } else {
      return {
        method,
        headers,
        body
      };
    }
  }
}

export default MakeRequest;
