import { Router } from 'express';
import multer from 'multer';
import uploadConfigs from '../config/upload';

import ensureAuthenticated from '../midlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

const upload = multer(uploadConfigs);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);
    const { filename } = request.file;
    return response.json({ ok: true });
  },
);

export default usersRouter;
