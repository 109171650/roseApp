

module.exports = {
  get TabViewAnimated() {
    return require('./TabViewAnimated').default;
  },
  get TabViewPagerPan() {
    return require('./TabViewPagerPan').default;
  },
  get TabViewPagerScroll() {
    return require('./TabViewPagerScroll').default;
  },
  get TabViewPagerAndroid() {
    return require('./TabViewPagerAndroid').default;
  },
  get TabBar() {
    return require('./TabBar').default;
  }
};