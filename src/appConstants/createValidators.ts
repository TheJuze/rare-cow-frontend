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
      reg: new RegExp(/^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]+$/i),
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
