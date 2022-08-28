import { User, UsersModel } from '../../models/user';

const model = new UsersModel();

describe('Test Users Model', () => {
  const user = {
    email: 'test3@test.com',
    first_name: 'test',
    last_name: 'user',
    password: 'test123',
  } as unknown as User;

  it('Creates new user from model', async () => {
    const newUser = await model.create(user);
    expect(newUser.email).toEqual('test3@test.com');
    expect(newUser.first_name).toEqual('test');
    expect(newUser.last_name).toEqual('user');
  });

  it('Shows all users from model', async () => {
    const users = await model.index();
    expect(users.length).toBe(3);
  });

  it('Shows a specific user from model', async () => {
    const user = await model.show(3);
    expect(user.email).toEqual('test3@test.com');
    expect(user.first_name).toEqual('test');
    expect(user.last_name).toEqual('user');
  });
});
