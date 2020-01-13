import { TeamUser } from './teamUser';

describe('User', () => {
  it('should create an instance', () => {
    expect(new TeamUser(1, 'test', 'test')).toBeTruthy();
  });
});
