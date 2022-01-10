/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
//
// SPDX-License-Identifier: AGPL-3.0-only

import { BrowserClient, Event, EventHint, Hub, Severity } from '@sentry/browser';
import { DSNS } from './sentry-dsns';

export class ErrorReporter {
	private _clientCache: { [key: string]: Hub } = {};

	private _getClientForApp(pkgName: string, pkgVersion: string): Hub {
		if (!this._clientCache[pkgName] && DSNS[pkgName]) {
			this._clientCache[pkgName] = new Hub(
				new BrowserClient({
					dsn: DSNS[pkgName],
					release: pkgVersion,
					maxValueLength: 500
				})
			);
		}
		return this._clientCache[pkgName];
	}

	public reportException(
		error: Error,
		app: { name: string; version: string },
		hint?: EventHint
	): string | null {
		const client = this._getClientForApp(app.name, app.version);
		if (client) {
			return client.captureException(error, { ...hint });
		}
		return null;
	}

	public reportFeedback(event: Event): string | null {
		const client = this._getClientForApp('feedbacks', '');
		if (client) {
			return client.captureEvent({ ...event, level: Severity.Info });
		}
		return null;
	}
}
