import { Router } from 'express';
import { addUsers, deleteUserById, getUsers, getUsersById, updateUserById } from './user.controller.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUsersById);
userRoutes.post('/add', addUsers);
userRoutes.delete('/:id', deleteUserById);
userRoutes.patch('/:id', updateUserById);

export default userRoutes;