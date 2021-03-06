/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as os from 'os';
import * as path from 'path';
import * as tmp from 'tmp';

import * as ts from 'vscode-chrome-debug-core-testsupport';
import { DebugProtocol } from 'vscode-debugprotocol';
import { DebugClient } from 'vscode-debugadapter-testsupport';

const DEBUG_ADAPTER = './out/src/legacyEdge/edgeDebug.js';

let testLaunchProps: any;

function formLaunchArgs(launchArgs: any): void {
    launchArgs.trace = 'verbose';

    if (testLaunchProps) {
        for (let key in testLaunchProps) {
            launchArgs[key] = testLaunchProps[key];
        }
        testLaunchProps = undefined;
    }
}

function patchLaunchArgs(launchArgs: any): void {
    formLaunchArgs(launchArgs);
}

export const lowercaseDriveLetterDirname = __dirname.charAt(0).toLowerCase() + __dirname.substr(1);
export const PROJECT_ROOT = path.join(lowercaseDriveLetterDirname, '../../../../../');
export const DATA_ROOT = path.join(PROJECT_ROOT, 'test/legacyEdge/testdata/');

export function setup(port?: number, launchProps?: any) {
    if (launchProps) {
        testLaunchProps = launchProps;
    }
    return ts.setup({entryPoint: DEBUG_ADAPTER, type: 'edge', patchLaunchArgs: patchLaunchArgs, port: port});
}

export function teardown() {
    return ts.teardown();
}
