import { checkSchema } from 'express-validator';

const teamSchema = checkSchema({
  name: {
    in: 'body',
    customSanitizer: {
      options: name => (typeof name === 'string' ? name.trim() : 1)
    },
    isEmpty: {
      negated: true,
      errorMessage: 'name cannot be empty'
    },
    isString: {
      errorMessage: 'name has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'name is too short'
    }
  },
  location: {
    in: 'body',
    customSanitizer: {
      options: location => (typeof location === 'string' ? location.trim() : 1)
    },
    isString: {
      errorMessage: 'location has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'location is too short'
    }
  },
  coach: {
    in: 'body',
    customSanitizer: {
      options: coach => (typeof coach === 'string' ? coach.trim() : 1)
    },
    isEmpty: {
      negated: true,
      errorMessage: 'coach name cannot be empty'
    },
    isString: {
      errorMessage: 'coach name has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'coach name is too short'
    }
  },
  image: {
    in: 'body',
    customSanitizer: {
      options: image => (typeof image === 'string' ? image.trim() : 1)
    },
    isString: {
      errorMessage: 'image link has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'image link is too short'
    }
  }
});

export default teamSchema;
