import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'showman',
        email: 'showman.sh.ahmed@gmail.com',
        password: 'secret',
      },
      {
        username: 'saeed',
        email: 'Saeed.eldeeb@gmail.com',
        password: 'supersecret',
      },
    ])
  }
}
