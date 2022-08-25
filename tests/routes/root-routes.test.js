const build = require('../../src/app');

let app;
describe('Root route', () => {
  beforeEach(() => {
    // Ini manggil api
    app = build();
  });

  afterEach(() => {
    // mematikan api
    app.close();
  });

  it('shoul return 200 when root route called', async () => {
    // inject ini sepertinya feature dari fastify untuk mencoba api
    const res = await app.inject({
      url: '/',
    });

    // toBe itu untuk value
    expect(res.statusCode).toBe(200);

    // toEqual untuk object
    expect(res.json()).toEqual({ hello: 'world - test!' });
  });
});
