import { Router } from 'express';
import { addUsers, deleteUserById, getUsers, getUsersById, updateUserById } from './user.controller.js';
import { protectedRoute } from '../../../middleware/auth.middleware.js';

const userRoutes = Router();

userRoutes.get('/', protectedRoute, getUsers);
userRoutes.get('/:id', protectedRoute, getUsersById);
userRoutes.post('/add', protectedRoute, addUsers);
userRoutes.delete('/:id', protectedRoute, deleteUserById);
userRoutes.patch('/:id', protectedRoute, updateUserById);

export default userRoutes;