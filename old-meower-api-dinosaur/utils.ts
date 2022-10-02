export function JSONResponse(data: any, init?: ResponseInit | undefined): Response {
  return new Response(
    JSON.stringify(data),
    Object.assign({}, { headers: { 'Content-Type': 'application/json' } }, init)
  );
}
