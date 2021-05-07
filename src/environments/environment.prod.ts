import {SERVICE_ID, TEMPLATE_ID, USER_ID} from '../../emailconfig.json'

export const environment = {
  production: true,
  emailCofig: {
    ...{SERVICE_ID,
    TEMPLATE_ID,
    USER_ID}
  }
};
