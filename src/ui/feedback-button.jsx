/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button, useScreenMode } from '@zextras/carbonio-design-system';
import { useAddBoardCallback, useAppContext } from '@zextras/zapp-shell';

const Portal = ({ children }) => {
	const el = useMemo(() => window.top.document.createElement('div'), []);

	useEffect(() => {
		const mount = window.top.document.getElementById('app');
		mount.appendChild(el);
		return () => mount.removeChild(el);
	}, [el]);

	return createPortal(children, el);
};

export default function Feedback() {
	const appCtxt = useAppContext();
	const addBoard = useAddBoardCallback();
	const screen = useScreenMode(window.top);
	const addFeedbackBoard = useCallback(() => {
		addBoard('/');
	}, [addBoard]);
	if (screen === 'desktop') {
		return (
			<Portal>
				<Button
					label="Feedback"
					id="reporter-ui"
					disabled={appCtxt?.disabled}
					onClick={addFeedbackBoard}
					icon="MessageSquareOutline"
					style={{ position: 'absolute', bottom: '16px', right: '16px' }}
				/>
			</Portal>
		);
	}
	return null;
}
