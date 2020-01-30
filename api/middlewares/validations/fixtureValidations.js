import { checkSchema } from 'express-validator';

const fixtureSchema = checkSchema({
  homeTeam: {
    in: 'body',
    customSanitizer: {
      options: (homeTeam) => (typeof homeTeam === 'string' ? homeTeam.trim() : homeTeam),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'homeTeam cannot be empty',
    },
  },
  awayTeam: {
    in: 'body',
    customSanitizer: {
      options: (awayTeam) => (typeof awayTeam === 'string' ? awayTeam.trim() : awayTeam),
    },
    isEmpty: {
      negated: true,
      errorMessage: 'awayTeam cannot be empty',
    },
  },
  matchDate: {
    in: 'body',
    toDate: true,
    isEmpty: {
      negated: true,
      errorMessage: 'match date cannot be empty',
    },
  },
});

export default fixtureSchema;
