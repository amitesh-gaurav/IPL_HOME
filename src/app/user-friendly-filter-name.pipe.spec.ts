import { UserFriendlyFilterNamePipe } from './user-friendly-filter-name.pipe';

describe('UserFriendlyFilterNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserFriendlyFilterNamePipe();
    expect(pipe).toBeTruthy();
  });
});
