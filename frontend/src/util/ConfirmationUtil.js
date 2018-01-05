import i18n from "../i18n/i18n";
import {addNotification as notify} from 'reapop';

export const showConfirmation = (dispatch, message, params={}, isActionYesPrimary=false, actionYes = f => f,
  isActionNoPrimary=false, actionNo = f => f) =>
dispatch(notify({
  message: i18n.t(message, params),
  status: 'warning',
  position: 'tc',
  dismissible: true,
  dismissAfter: 60000,
  buttons: [{
    name: i18n.t('Yes'),
    primary: isActionYesPrimary,
    onClick: () => {
      actionYes();
    }
  },
    {
      name: i18n.t('No'),
      primary: isActionNoPrimary,
      onClick: () => {
        actionNo();
      }
    }]
}));


