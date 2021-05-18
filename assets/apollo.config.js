const token = process.env.GITHUB_TOKEN;

module.exports = {
  client: {
    service: {
      name: 'github',
      url: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  },
};
