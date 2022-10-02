import { Router } from 'https://esm.run/itty-router@2.3.10';
import { Router as RouterType } from 'https://cdn.jsdelivr.net/npm/itty-router@2.3.10/dist/itty-router.d.ts';
const router = Router({ base: '/v0' }) as RouterType;
import { JSONResponse } from '../utils.ts';

router.get('/users/:id', async({ params }) => {
    let userdata = await usersdb.findOne({ _id: params?.id });
    console.log(`user data for ${params?.id}:\n`, userdata);
    if (userdata) {
      userdata.sensitiveData = undefined;
      return JSONResponse(userdata);
    } else {
      return JSONResponse({ error: `User ${params?.id} not found.` }, { status: 404 });
    }
});
  
router.get('/users/:id/posts', ({ params }) => {
    
});

export default router;