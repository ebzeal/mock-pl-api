import { checkSchema } from 'express-validator';

const signUpSchema = checkSchema({
  fullName: {
    in: 'body',
    customSanitizer: {
      options: fullName => (typeof fullName === 'string' ? fullName.trim() : 1)
    },
    isEmpty: {
      negated: true,
      errorMessage: 'fullname cannot be empty'
    },
    isString: {
      errorMessage: 'fullname has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'fullname is too short'
    }
  },
  userName: {
    in: 'body',
    customSanitizer: {
      options: userName => (typeof userName === 'string' ? userName.trim() : 1)
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Username cannot be empty'
    },
    isString: {
      errorMessage: 'Username has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Username is too short'
    }
  },
  email: {
    in: 'body',
    customSanitizer: {
      options: email => (typeof email === 'string' ? email.trim() : 1)
    },
    isString: {
      errorMessage: 'Email has to be a string'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email cannot be empty'
    },
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    errorMessage: 'email is too short'
  },
  password: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/i,
      errorMessage:
        'Password should not be empty, minimum six characters, at least one letter, one number and one special character'
    }
  },
  confirmPassword: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        } else {
          return value;
        }
      }
    }
  }
});

const logInSchema = checkSchema({
  user: {
    in: 'body',
    customSanitizer: {
      options: user => (typeof user === 'string' ? user.trim() : 1)
    },
    isString: {
      errorMessage: 'Username or Email has to be a string'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Username or Email field cannot be empty'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Username or Email is too short'
    }
  },
  password: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Password cannot be less than 6 Characters'
    }
  }
});

export { signUpSchema, logInSchema };
