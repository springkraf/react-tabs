export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // severity: 0 = off, 1 = warning, 2 = error
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'init',
      ],
    ],
  },
};
