export const apiPath = {
  auth: {
    LOGIN: '/auth',
    LOGOUT: '/auth/logout',
  },

  appointment: {
    GET_BY_CONVERSATION_ID: '/appointments/conversation/{conversation_id}',
    PUT: '/appointments',
  },
  user: {
    PUT: '/user',
    GET_CURRENT_USER: '/user/current-user',
    GET_LIST_DOCTOR: '/user/doctors',
  },
  response: {
    GET: '/response',
    POST: '/response',
    DELETE: '/response',
    GET_RESULT: '/response/result',
  },
  question: {
    GET: '/question',
    GET_BY_ID: '/question',
    GET_STRESS_SURVEY: '/question/getQuestionsOfStressSurvey',
    GET_UNREST_SURVEY: 'question/getQuestionsOfUnrestSurvey',
  },
  conversation: {
    GET_ID: '/conversation/{conversation_id}',
    GET_CONTENT: '/conversation/{conversation_id}/content',
    POST_ENCRYPT_KEY: '/conversation/{conversation_id}/encrypt-key',
  },
};
