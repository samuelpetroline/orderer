import { OrdererPage } from './app.po';

describe('orderer App', () => {
  let page: OrdererPage;

  beforeEach(() => {
    page = new OrdererPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
