import jwt from "jsonwebtoken";
import { UsersRepository } from "../repostitories/Users/implementations/sqlite/UsersRepository";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const userRepository = new UsersRepository();
  if (!authorization) {
    throw new Error('Não autorizado!')
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET)

  const user = await userRepository.findById(id)

  if (!user) {
    throw new Error('Não autorizado!')
  }

  const { password, ...usr } = user;

  req.user = usr

  next()
}