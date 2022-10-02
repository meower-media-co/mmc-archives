import { Router } from 'https://esm.run/itty-router@2.3.10';
import { Router as RouterType } from 'https://cdn.jsdelivr.net/npm/itty-router@2.3.10/dist/itty-router.d.ts';
const router = Router({ base: '/v0' }) as RouterType;
import { JSONResponse } from '../utils.ts';
import v0_oauth from './oauth.ts';
import v0_users from './users.ts';

// register all modules of API v0
router.all('/oauth/*', v0_oauth.handle);
router.all('/users/*', v0_users.handle);

export default router;