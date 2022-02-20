({
  makeRequestOptions: (url, options = {}) => {
    const { hostname, port, pathname: path } = new URL(url);
    const result = { hostname, port, path, method: options.method ?? 'GET', headers: options.headers ?? {} };
    if (options.body) {
      result.body = JSON.stringify(options.body);
      result.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(result.body),
        ...result.headers,
      };
    }
    return result;
  },

  fetch: async (url, options = {}) => {
    const { http, https } = node;
    const transport = url.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
      const requestOptions = lib.network.makeRequestOptions(url, options);
      const req = transport.request(requestOptions, async (res) => {
        const code = res.statusCode;
        if (code >= 400) return reject(new Error(`HTTP status code ${code}`));
        res.on('error', reject);
        const chunks = [];
        try {
          for await (const chunk of res) chunks.push(chunk);
          const json = Buffer.concat(chunks).toString();
          const object = JSON.parse(json);
          resolve(object);
        } catch (error) {
          return reject(error);
        }
      });
      req.write(requestOptions.body);
      req.end();
    });
  },
});
