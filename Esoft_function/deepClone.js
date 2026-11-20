function deepClone(value, seen = new WeakMap()) {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  if (value instanceof Map) {
    const copy = new Map();
    seen.set(value, copy);
    value.forEach(function (item, key) {
      copy.set(deepClone(key, seen), deepClone(item, seen));
    });
    return copy;
  }

  if (value instanceof Set) {
    const copy = new Set();
    seen.set(value, copy);
    value.forEach(function (item) {
      copy.add(deepClone(item, seen));
    });
    return copy;
  }

  const copy = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));

  seen.set(value, copy);

  Reflect.ownKeys(value).forEach(function (key) {
    copy[key] = deepClone(value[key], seen);
  });

  return copy;
}
