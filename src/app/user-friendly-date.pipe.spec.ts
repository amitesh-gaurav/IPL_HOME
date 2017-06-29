import { UserFriendlyDatePipe } from './user-friendly-date.pipe';

describe('UserFriendlyDatePipe', () => {
  it('create an instance', () => {
    const pipe = new UserFriendlyDatePipe();
    expect(pipe).toBeTruthy();
  });
});
