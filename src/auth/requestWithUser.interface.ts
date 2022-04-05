import { Request } from 'express';
import { User } from './auth.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
