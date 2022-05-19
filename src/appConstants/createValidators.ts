/* eslint-disable no-useless-escape */
interface ICreateValidator {
  name: { min: number; max: number };
  description: { min: number; max: number };
  properties: { name: number; type: number; max: number };
  symbol: { min: number; max: number };
  quantity: number;
}

export const createValidator: ICreateValidator = {
  name: { min: 2, max: 20 },
  description: { min: 0, max: 500 },
  properties: { name: 1, type: 1, max: 20 },
  symbol: { min: 2, max: 6 },
  quantity: 1,
};

interface IEditProfileValidator {
  name: { min: number; max: number };
  address: { min: number };
  description: { min: number; max: number };
  socials: {
    email: { reg: RegExp };
    site: { reg: RegExp };
    twitter: { reg: RegExp };
    instagram: { reg: RegExp };
  };
}

export const editProfileValidator: IEditProfileValidator = {
  name: { min: 2, max: 50 },
  address: { min: 42 },
  description: { min: 0, max: 500 },
  socials: {
    email: {
      reg: new RegExp(
        /^[^@]+@\w+(\.\w+)+\w$/,
      ),
    },
    site: {
      // eslint-disable-next-line no-control-regex
      reg: new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    },
    twitter: {
      reg: new RegExp(
        /^@{1}(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i,
      ),
    },
    instagram: {
      reg: new RegExp(
        /^@{1}(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i,
      ),
    },
  },
};
