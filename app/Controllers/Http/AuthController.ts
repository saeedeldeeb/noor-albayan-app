import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    // create validation schema for expected user form data
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })
    // get validated data by validating our userSchema
    // if validation fails the request will be automatically redirected back to the form
    const data = await request.validate({ schema: userSchema })
    // create a user record with the validated data
    const user = await User.create(data)
    // login the user using the user model record
    await auth.login(user)
    // redirect to the login page
    return response.ok(user)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    let token
    // grab uid and password values off request body
    const { uid, password } = request.only(['uid', 'password'])
    try {
      // attempt to login
      token = await auth.attempt(uid, password)
    } catch (error) {
      // if login fails, return vague form message and redirect back
      return response.unauthorized({ message: 'Email or password not correct' })
    }
    // otherwise, redirect to home page
    return response.ok({ token: token })
  }

  public async logout({ response, auth }: HttpContextContract) {
    // logout the user
    await auth.logout()
    // redirect to login page
    return response.noContent()
  }
}
