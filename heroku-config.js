const fs = require('fs');

const targetPath = './src/environments/environment.heroku.ts';
const herokuEnv = `export const environment = {
  production: true,
  youtubeApiKey: "${process.env.YT_API_KEY}"
};
`;

fs.writeFile(targetPath, herokuEnv);
