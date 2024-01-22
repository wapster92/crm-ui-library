import Ajv from 'ajv';

const ajv = new Ajv();

const confirmationSchema = {
  anyOf: [
    { type: 'boolean' },
    { type: 'object', properties: { type: { type: ['string', 'null'] } }, required: ['type'] },
  ],
};

const SchemaMFASession = {
  type: 'object',
  properties: {
    session_id: {
      type: 'string',
    },
    confirmations: {
      type: 'object',
      minProperties: 1,
      patternProperties: {
        '.*': confirmationSchema,
      },
    },
  },
  required: ['confirmations', 'session_id'],
};

const validate = ajv.compile(SchemaMFASession);

export const isMFASession = (possibleSession: unknown): boolean => {
  return validate(possibleSession);
};
