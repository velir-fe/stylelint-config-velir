'use strict';

const config = require('../');
const fs = require('fs');
const stylelint = require('stylelint');

describe('flags no warnings with valid css', () => {
	const validCss = fs.readFileSync('./__tests__/valid.css', 'utf-8');
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			code: validCss,
			config,
		});
	});

	it('did not error', () => {
		expect(result.errored).toBe(false);
	});

	it('flags no warnings', () => {
		expect(result.results[0].warnings).toHaveLength(0);
	});
});

describe('flags warnings with invalid css', () => {
	const invalidCss = fs.readFileSync('./__tests__/invalid.css', 'utf-8');
	let result;

	beforeEach(async () => {
		result = await stylelint.lint({
			code: invalidCss,
			config,
		});
	});

	it('did error', () => {
		expect(result.errored).toBe(true);
	});

	it('flags warnings', () => {
		expect(result.results[0].warnings).toHaveLength(5);
	});

	it('correct warning text', () => {
		expect(result.results[0].warnings.map((w) => w.text)).toEqual([
			'Expected custom media query name "--FOO" to be kebab-case',
			'Expected custom property name "--FOO" to be kebab-case',
			'Expected keyframe name "FOO" to be kebab-case',
			'Expected class selector ".FOO" to be kebab-case',
			'Expected id selector "#FOO" to be kebab-case',
		]);
	});

	it('correct rule flagged', () => {
		expect(result.results[0].warnings.map((w) => w.rule)).toEqual([
			'custom-media-pattern',
			'custom-property-pattern',
			'keyframes-name-pattern',
			'selector-class-pattern',
			'selector-id-pattern',
		]);
	});

	it('correct severity flagged', () => {
		expect(result.results[0].warnings[0].severity).toBe('error');
	});

	it('correct line number', () => {
		expect(result.results[0].warnings[0].line).toBe(1);
	});

	it('correct column number', () => {
		expect(result.results[0].warnings[0].column).toBe(15);
	});
});

describe('deprecated rules', () => {
	const deprecatedRuleNames = Object.values(stylelint.rules)
		.filter((rule) => rule.meta.deprecated)
		.map((rule) => rule.ruleName);

	const testFn = deprecatedRuleNames.length === 0 ? it.skip : it;

	testFn('exclude deprecate rules', () => {
		// eslint-disable-next-line jest/no-standalone-expect -- If not using `it` directly, false positives occur.
		expect(Object.keys(config.rules)).toEqual(expect.not.arrayContaining(deprecatedRuleNames));
	});
});
