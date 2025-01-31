import { rest } from 'msw';
import team from '../data/team.json';
import position from '../data/position.json';

export const handlers = [
  rest.get('/api/team', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(team));
  }),

  rest.get('/api/position', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(position));
  }),
];
