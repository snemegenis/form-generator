import i18n from "../i18n/i18n"

export const TREATMENTS = [
  {label: i18n.t('Ambulatoric'), value: 'AMBULATORIC'},
  {label: i18n.t('Medicaments'), value: 'MEDICAMENTS'},
  {label: i18n.t('Stationary'), value: 'STATIONARY'},
  {label: i18n.t('Surgery'), value: 'SURGERY'},
  {label: i18n.t('Reabilitation'), value: 'REABILITATION'},
  {label: i18n.t('Other'), value: 'OTHER'}
];

export const DISABILITY_TYPES = [
  {label: i18n.t('Working Capacity Level'), value: 'WORKING_CAPACITY_LEVEL'},
  {label: i18n.t('First Time'), value: 'FIRST_TIME'},
  {label: i18n.t('Disability Level'), value: 'DISABILITY_LEVEL'},
  {label: i18n.t('Expired'), value: 'EXPIRED'},
  {label: i18n.t('Special Requirement'), value: 'SPECIAL_REQUIREMENT'},
  {label: i18n.t('Health Condition Changed'), value: 'HEALTH_COND_CHANGED'},
  {label: i18n.t('Ordered By Person'), value: 'REQUIRED_BY_PERSON'}
];
