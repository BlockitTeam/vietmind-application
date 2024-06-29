export const apiPath = {
  AUTH: '/auth',
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
  },
  conversation: {
    GET_ID: '/conversation/{conversation_id}',
    GET_CONTENT: '/conversation/{conversation_id}/content',
    POST_ENCRYPT_KEY: '/conversation/{conversation_id}/encrypt-key',
  },
};
