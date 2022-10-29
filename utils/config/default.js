export const textDefaultNewTab = `// Type here your SQML queries

/*** Query examples ***/

SELECT campo1 FROM tabla1;

SELECT campo1, campo2 FROM tabla1;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5
ORDER BY campo1, campo2 ASC, campo3 DESC;

SELECT campo1, campo2 FROM tabla1
WHERE campo1 = false 
        AND campo2 > 5 
        AND campo3 < 5
ORDER BY campo1, campo2 ASC, campo3 DESC
limit 10;`

export const makeData = (number) => {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push({
        title: `New File *`,
        content: textDefaultNewTab
      });
    }
    return data;
}

export const translateModes = {
    OnlyTranslate: false,
    TranslateAndRun: true
}