/* eslint-disable max-len */
import { errorStatuses, validStatuses } from 'appConstants';

export const validateStatus = (status: number) => [...validStatuses, ...errorStatuses].includes(status);
