const proxy = [
    {
      context: '/api',
      target: 'http://192.168.10.10',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;
