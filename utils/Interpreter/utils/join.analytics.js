export const analyzeKey = (key, foreign) => {
    const parts = key.split('.');
    const table = parts[0];
    if(table === foreign) {
        return { foreign: true, variable: `$${parts[parts.length - 1]}`}
    } else {
        return parts.length != 1 ? { foreign: false, local: table, variable: `$$${parts[parts.length - 1]}`, let: { [parts[parts.length - 1]]: `$${parts[parts.length - 1]}` }} : {};
    }
}

