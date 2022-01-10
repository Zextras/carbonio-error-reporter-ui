/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

type DsnsContainer = {
	[pkgName: string]: string | undefined;
};

export const DSNS: DsnsContainer = {
	'carbonio-shell-ui': 'https://0ce2448c05b94f0182c47ae52c7ff52c@feedback.zextras.tools/6',
	'carbonio-contacts-ui': 'https://a8c4ac88e95b49f1b7313b307499fc4f@feedback.zextras.tools/10',
	'carbonio-mails-ui': 'https://90672cc95a43460485b50717c4be69ab@feedback.zextras.tools/7',
	'carbonio-calendars-ui': 'https://dfa8afc4c2d9489a94a7e77fd8c70e36@feedback.zextras.tools/9',
	'carbonio-files-ui': 'https://733fc9332b0e48f1a39b595296fc2280@feedback.zextras.tools/11',
	feedbacks: 'https://1b6b3e2bbdc64a73bf45c72b725c56b4@feedback.zextras.tools/8'
};
