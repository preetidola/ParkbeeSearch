module.exports = {
  default: {
    requireModule: [
      'ts-node/register'
    ],
    paths: ['tests/features/**/*.feature'],
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'steps/**/*.ts'
    ],
    format: ['json:reports/cucumber_report.json']
  }
};
