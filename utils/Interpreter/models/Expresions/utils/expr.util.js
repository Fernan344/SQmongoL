export const convertPipelineExpr = (op, values) => {
    return { $expr: { [op]: values }}
}

export const convertAlreadyPipelineExpr = (op, values) => {
    return { [op]: values }
}

export const convertNormalExpr = (op, values) => {
    return { [values[0]]: { [op]: values[1] } }
}