export const convertFilters = (filters) => {
  return Object.entries(filters)
    .filter(([_, value]) => value !== "") 
    .map(([key, value]) => ({
      fieldname: key,
      fieldop: "LIKE",
      fieldvalue: value,
    }));
};
