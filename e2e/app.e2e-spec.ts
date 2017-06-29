import { IplHomePage } from './app.po';

describe('ipl-home App', () => {
  let page: IplHomePage;

  beforeEach(() => {
    page = new IplHomePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
