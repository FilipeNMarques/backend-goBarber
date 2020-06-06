import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersRpository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import uploadeConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadeConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRpository = new UsersRpository();
  const createUser = new CreateUserService(usersRpository);
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRpository = new UsersRpository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRpository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
