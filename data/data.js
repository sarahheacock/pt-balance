var initialData = {
  home: [],
  authors: [],
  publications: [],
  news: []
};
var initialMessage = '';
var initialUser = {
  token: ""
};
var initialEdit = {
	modalTitle: '',
	url: '',
	dataObj: {} // will be copy of data we want to edit
};

var messages = {
  inputError: "*Fill out required fields.",
  tokenError: 'You are unauthorized. Sign in to continue.',
  expError: 'Session expired. Log back in to continue.',
  phoneError: "Invalid phone number.",
  emailError: "Invalid email address.",
  authError: "You are not authorized to access this account.",
  usernameError: 'Username not found.',
  passError: 'Incorrect password for given username.',
  messageSent: "Message sent! We will get back to you as soon as possible. Thank you!"
};

var notRequired = ['createdAt', 'image'];

//===============FORMS FIELDS=========================================
var formData = {
  login: ['username', 'password'],
  message: ['name', 'email', 'phone', 'message'],
  home: ['carousel', 'summary'],
  authors: ['image', 'summary', 'education', 'name'],
  publications: ['title', 'description', 'authors', 'link', 'date'],
  news: ['title', 'description', 'image', 'createdAt']
}

module.exports = {
  initialData: initialData,
  initialMessage: initialMessage,
  initialUser: initialUser,
  initialEdit: initialEdit,
  messages: messages,
  notRequired: notRequired,
  formData: formData
}
