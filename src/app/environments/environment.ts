export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  uploadMaxSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
  testimonialConfig: {
    requireApproval: true,
    allowAnonymous: false,
    maxMessageLength: 1000,
    minMessageLength: 50,
  },
  feedbackConfig: {
    allowAnonymous: true,
    maxMessageLength: 2000,
    minMessageLength: 20,
    categories: [
      'academics',
      'facilities',
      'staff',
      'extracurricular',
      'communication',
      'other',
    ],
  },
};
