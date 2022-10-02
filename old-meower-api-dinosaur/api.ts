import { Router } from 'https://esm.run/itty-router@2.3.10';
import { Router as RouterType } from 'https://cdn.jsdelivr.net/npm/itty-router@2.3.10/dist/itty-router.d.ts';
const router = Router() as RouterType;
import { JSONResponse } from './utils.ts';
import v0 from './v0/index.ts';

router.get('/', () => {
  return new Response('Welcome to Meower API written in fun dinosaur thingy!');
});

router.get('/status', async () => {
  let status = await configdb.findOne({ _id: 'status' });
  if (status) status._id = undefined;
  return JSONResponse(status);
});

router.all('/v0/*', v0.handle);

router.all('*', (request) => {
  return JSONResponse({ error: `Route ${request.url} not found.` }, { status: 404 });
})

export default router;
