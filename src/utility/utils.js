export const aggregateTable = (data) => {
  let result = {};
  const b = data.budget;
  const s = data.spending;
  for (let i = 0; i < b.length; i++) {
    result[b[i][0]] = [b[i][1], b[i][2]];
  }
  for (let i = 0; i < s[0].length; i++) {
    if (s[0][i][0] in result) {
      result[s[0][i][0]] = [...result[s[0][i][0]], s[0][i][1]];
    }
  }
  return result
};
