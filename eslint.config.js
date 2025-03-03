import js from '@eslint/js';
import globals from 'globals';

import { FlatCompat } from '@eslint/eslintrc'; // (추가)

import react from 'eslint-plugin-react';
import reactPlugin from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import tseslint from 'typescript-eslint';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import * as tanstackQueryPlugin from '@tanstack/eslint-plugin-query'; // (추가)

const compat = new FlatCompat();

export default tseslint.config(
	js.configs.recommended,
	/** @see https://github.com/standard/eslint-config-standard/issues/411 */
	...compat.extends('eslint-config-standard'),
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	jsxA11y.flatConfigs.recommended,
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
	{
		ignores: ['dist'],
	},
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				tsconfigRootDir: import.meta.dirname,
				/** @see https://github.com/vitejs/vite/issues/13747#issuecomment-1636870022 */
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
			},
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@tanstack/query': tanstackQueryPlugin,
		},
		settings: {
			react: {
				version: '18',
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...reactPlugin.configs['recommended'].rules,
			...reactPlugin.configs['jsx-runtime'].rules,
			...tanstackQueryPlugin.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'react-refresh/only-export-components': 'warn',
			'prettier/prettier': 'warn',
		},
	},
);
