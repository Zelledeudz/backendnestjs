import { DomainError } from "src/core/errors/domain.errors";


export class UsernameExistError extends DomainError {
    constructor(
        fields?: Record<string, string[]>
    ) {
        super({
            code: "USERNAME_ALREADY_EXIST",
            message: "Username déjà lié a un compte",
            statusCode: 400,
            fields: fields ?? {
                username: ["Username already exists"]
            },
            details: {}
        })
    }
}


export class AuthReferralCodeNotFoundError extends DomainError {
    constructor(
      details?: { referralCode?: string },
      fields?: Record<string, string[]>,
    ) {
      super({
        code: 'AUTH_REFERRAL_CODE_NOT_FOUND',
        message: 'Referral code not found',
        statusCode: 404,
        fields: fields ?? { referralCode: ['Referral code not found'] },
        details: details ?? {},
      });
    }
  }

  export class InvalidCredentialsError extends DomainError {
    constructor() {
      super({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid username or password',
        statusCode: 401,
        fields: {
          credentials: ['Invalid username or password'],
        },
        details: {},
      });
    }
  }
  
  