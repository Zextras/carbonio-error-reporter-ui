/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, lazy, Suspense } from 'react';

import {
	registerAppData,
	Spinner,
	getBridgedFunctions,
	registerFunctions
} from '@zextras/carbonio-shell-ui';
import { ErrorReporter } from './error-reporter';
import FeedbackButton from './ui/feedback-button';

const reporter = new ErrorReporter();

const LazyFeedbackView = lazy(() => import(/* webpackChunkName: 'feedback' */ './ui/feedback'));

const Feedback = () => (
	<Suspense fallback={<Spinner />}>
		<LazyFeedbackView reporter={reporter} />
	</Suspense>
);
export default function App() {
	// eslint-disable-next-line no-console
	console.log(
		'%c ERROR REPORTER LOADED',
		'color: white; background: #8bc34a;padding: 4px 8px 2px 4px; font-family: sans-serif; border-radius: 12px; width: 100%'
	);
	useEffect(() => {
		registerAppData({
			views: {
				board: Feedback
			},
			context: { disabled: false, reporter },
			newButton: {
				primary: [
					{
						id: 'feedback',
						label: 'Feedback',
						icon: 'MessageSquareOutline',
						click: () => {
							getBridgedFunctions().addBoard('/');
						}
					}
				]
			}
		});
	}, []);

	useEffect(() => {
		registerFunctions({
			id: 'report-error',
			fn: reporter.reportException
		});
	}, []);

	return <FeedbackButton reporter={reporter} />;
}
