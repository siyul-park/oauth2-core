/* eslint-disable no-undef */
const createEndPoint = require('../../../lib/http/end-point/create-end-point');
const joinEndPoints = require('../../../lib/http/end-point/join-end-points');

const requestMethod = require('../../../lib/http/request/request-method');
const Request = require('../../../lib/http/request/request');

const createJoinEndPoint = require('../../mock/create-join-end-point');

describe('Join End Points', () => {
  beforeAll(() => {
  });

  test('Success Join End Points By Promise', async () => {
    const postState = Math.random();
    const getState = Math.random();

    // eslint-disable-next-line max-len
    const endPointWithPostMethod = createEndPoint(requestMethod.POST, 201, createJoinEndPoint(postState));
    // eslint-disable-next-line max-len
    const endPointWithGetMethod = createEndPoint(requestMethod.GET, 200, createJoinEndPoint(getState));

    const endPoint = joinEndPoints([endPointWithGetMethod, endPointWithPostMethod]);

    let response = await endPoint(new Request({ method: requestMethod.POST }));

    expect(response.status).toEqual(201);
    expect(response.body.state).toEqual(postState);

    response = await endPoint(new Request({ method: requestMethod.GET }));

    expect(response.status).toEqual(200);
    expect(response.body.state).toEqual(getState);
  });
});

/* eslint-enable no-undef */
