import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateProfileRequest from 'App/Requests/updateProfilrRequest'
export default class ProfileController{
    public async view({auth, response}:HttpContextContract)
    {
        const user = auth.user
        if (!user) {
            return response.status(401).json({
              error: 'Unauthorized',
            })
          }

        return response.status(200).json({
           data: {
             username: user.username,
             email: user.email
           }
        })
    }

    public async update({auth, request, response}: HttpContextContract)
    {
        const user = auth.user
        if(!user){
            return response.status(401).json({
                error: 'Unauthorized',
            })
        }
       const data = await request.validate(UpdateProfileRequest)
       const {username, email} = data
        user.username = username
        user.email = email
        await user.save()
  
        return response.json({
          message: 'Profile updated successfully',
          data: {
            username: user.username,
            email: user.email,
          },
        })
    }

}