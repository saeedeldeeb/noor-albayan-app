import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
      rules.maxLength(50),
      rules.unique({
        table: 'users',
        column: 'username',
        whereNot: { id: this.ctx.auth.user?.id },
      }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.auth.user?.id } }),
    ]),
  })

  public messages = {
    'username.required': 'The username field is required.',
    'username.maxLength': 'The username must not exceed 50 characters.',
    'username.unique': 'The username has already been taken.',
    'email.required': 'The email field is required.',
    'email.email': 'The email must be a valid email address.',
    'email.unique': 'The email has already been taken.',
  }
}
