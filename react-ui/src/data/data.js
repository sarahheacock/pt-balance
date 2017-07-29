
//================page info=======================================================
export const blogID = "593d5eca1e17e126ddff6d0a";
export const cloudName = "dhd1eov8v";

//================possible error messages=======================================
export const errorStatus = {
  expError: "Session expired. Log back in again to continue.",
  deleteError: "You cannot delete all entries. Deleting all entries will cause errors",
  messageError: 'Unable to send message',
  formError: '* Fill out required fields',
  loadError: "Unable to load data",
  loginError: "Username and/or password not found.",
  messageSuccess: 'Message Sent! I will get back to you as soon as I can.'
}

//================page initial state when loaded==================================
export const initialData = {
  home: [],
  authors: [],
  publications: [],
  news: []
};
export const initialMessage = '';
export const initialUser = {
  username: '',
  password: '',
  admin: false,
  token: ""
};
export const initialEdit = {
	modalTitle: '',
	url: '',
	dataObj: {} // will be copy of data we want to edit
};


// export const pageRoutes = [...Object.keys(initialData), 'login'];

//===============info on user message form=========================================
export const formData = {
  // carousel: {
  //   type: 'file',
  //   placeholder: 'Upload Rotating Image',
  //   componentClass: 'input'
  // },
  summary: {
    type: 'text',
    placeholder: 'Summary',
    componentClass: 'textarea'
  },
  // image: {
  //   type: 'file',
  //   placeholder: 'Upload Image',
  //   componentClass: 'input'
  // },
  education: {
    type: 'text',
    placeholder: 'Education (Bold Text)',
    componentClass: 'input'
  },
  name: {
    type: 'text',
    placeholder: 'Full Name',
    componentClass: 'input'
  },
  title: {
    type: 'text',
    placeholder: 'Section Title',
    componentClass: 'input'
  },
  description: {
    type: 'text',
    placeholder: 'Summary',
    componentClass: 'textarea'
  },
  authors: {
    type: 'text',
    placeholder: 'Published Author',
    componentClass: 'input'
  },
  link: {
    type: 'text',
    placeholder: 'Link to Article',
    componentClass: 'input'
  },
  date: {
    type: 'text',
    placeholder: 'Date Published',
    componentClass: 'input'
  }
}

export const loginData = {
  username: {
    type: 'text',
    placeholder: 'Admin Username',
    componentClass: 'input'
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    componentClass: 'input'
  },
}

export const messageData = {
  name: {
    type: 'text',
    placeholder: 'Your Name',
    componentClass: 'input'
  },
  email: {
    type: 'email',
    placeholder: 'Email Address',
    componentClass: 'input'
  },
  phone: {
    type: 'text',
    placeholder: 'Phone Number',
    componentClass: 'input'
  },
  message: {
    type: 'text',
    placeholder: 'Message',
    componentClass: 'textarea'
  }
};


export const links = {
  github: 'https://github.com/sarahheacock',
  fcc: 'https://www.freecodecamp.org/sarahheacock',
  linkedin: 'https://www.linkedin.com/in/sarah-heacock-ab8677126'
};

// 593151
// created_at
// :
// "2017-07-28T22:28:51Z"
// etag
// :
// "b65c387e2553cab3e3a0002160b1f114"
// format
// :
// "jpg"
// height
// :
// 1146
// original_filename
// :
// "f476489ad953409944a6e18d546475e8"
// public_id
// :
// "ai6mxgidqv4d4ovphz9p"
// resource_type
// :
// "image"
// secure_url
// :
// "https://res.cloudinary.com/dhd1eov8v/image/upload/v1501280931/ai6mxgidqv4d4ovphz9p.jpg"
// signature
// :
// "636b93dc8b45425228fa9269912c6efda48c7292"
// tags
// :
// Array(0)
// type
// :
// "upload"
// url
// :
// "http://res.cloudinary.com/dhd1eov8v/image/upload/v1501280931/ai6mxgidqv4d4ovphz9p.jpg"
// version
// :
// 1501280931
// width
// :
// 1721
