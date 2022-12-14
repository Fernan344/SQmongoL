import {
  isError, isObject, get, has
} from 'lodash';
import cleanDeep from 'clean-deep'
import { HttpStatusCodeError } from './HttpStatusCodeError';
import { StatusCodes } from "http-status-codes";

export default (
  err,
  req,
  res,
  next = undefined
) => {
  // eslint-disable-next-line no-param-reassign
  if (!isError(err)) {
    const message = err;
    // eslint-disable-next-line no-param-reassign
    err = new HttpStatusCodeError(StatusCodes.BAD_REQUEST);
    // eslint-disable-next-line no-param-reassign
    err.message = message;
  }

  if (has(err, 'response')) {
    // eslint-disable-next-line no-param-reassign
    err.status = get(err, 'response.status', get(err, 'response.data.status'));
    // eslint-disable-next-line no-param-reassign
    err.message = get(err, 'response.message', get(err, 'response.data.message'));
    // eslint-disable-next-line no-param-reassign
    err.errorCodes = get(err, 'response.message', get(err, 'response.data.errorCodes'));
  }
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 500;
  const message = isError(err) ? err.message : err;
  const {
    body, params, query, headers
  } = req;
  const messageObject = isObject(message) ? message : { message };
  console.log(JSON.stringify({
    ...messageObject, body, params, query, headers, status: err.status
  }));
  res.status(err.status).json(cleanDeep({
    status: err.status,
    message,
    errorCodes: get(err, 'errorCodes', get(err, 'code')),
    err
  }));
};