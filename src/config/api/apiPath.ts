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
    GET_LIST_BY_ID: '/question/getQuestionsBySurveyId/{id}',
    GET_DEPRESSION_SURVEY: '/question/getQuestionsOfDepressionSurvey',
    GET_PTSD_SURVEY: '/question/getQuestionsOfPTSDSurvey',
    GET_SLEEP_SURVEY: '/question/getQuestionsOfSleepSurvey',
    GET_STRESS_SURVEY: '/question/getQuestionsOfStressSurvey',
    GET_UNREST_SURVEY: 'question/getQuestionsOfUnrestSurvey',
  },
  survey: {
    GET_BY_ID: '/survey/{id}',
  },
  conversation: {
    GET_ID: '/conversation/{conversation_id}',
    GET_CONTENT: '/conversation/{conversation_id}/content',
    POST_ENCRYPT_KEY: '/conversation/{conversation_id}/encrypt-key',
  },
  specialized_response_controller: {
    SAVE: '/specialized-responses/save',
    GET_LATEST_RESULT: '/specialized-responses/latestResultDetail',
  },
};
