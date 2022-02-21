({
  snakeToCamel: str =>
    str.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', '')),

  isObject: obj => typeof obj === 'object' && obj !== null && !Array.isArray(obj),

  objectToCamel(object) {
    const entries = Object.entries(object);
    const camelEntries = entries.map(([key, value]) => {
      const val = lib.util.isObject(value) ? lib.util.objectToCamel(value) : value;
      return [lib.util.snakeToCamel(key), val];
    });
    return Object.fromEntries(camelEntries);
  },
});
