module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
		'@vue/typescript/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		semi: [
			'error',
			'never',
		],
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-console': 'warn',
		'no-debugger': 'warn',
		'eol-last': ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'max-len': 'off',
		'no-await-in-loop': 'off',
		'no-param-reassign': [
			'error',
			{
				props: false,
			},
		],
		'no-plusplus': [
			'error',
			{
				allowForLoopAfterthoughts: true,
			},
		],
		'import/prefer-default-export': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
	},
};
