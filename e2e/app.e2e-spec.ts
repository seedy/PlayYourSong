import { PlayYourSongPage } from './app.po';

describe('play-your-song App', () => {
  let page: PlayYourSongPage;

  beforeEach(() => {
    page = new PlayYourSongPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
