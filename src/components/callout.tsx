/** Originally from `nextra-theme-docs`
 * @link https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/components/callout.tsx
 */

import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { InformationCircleIcon } from 'nextra/icons';

const TypeToEmoji = {
  default: '💡',
  error: '🚫',
  info: <InformationCircleIcon className="mt-1" />,
  warning: '⚠️',
};

type CalloutType = keyof typeof TypeToEmoji;

const classes: Record<CalloutType, string> = {
  default: clsx(
    'border-orange-100 bg-orange-50 text-orange-800 dark:border-orange-400/30 dark:bg-orange-400/20 dark:text-orange-300',
  ),
  error: clsx(
    'border-red-200 bg-red-100 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-200',
  ),
  info: clsx(
    'border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-200',
  ),
  warning: clsx(
    'border-yellow-100 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-700/30 dark:text-yellow-200',
  ),
};

interface CalloutProps {
  type?: CalloutType;
  emoji?: string | ReactElement;
  children: ReactNode;
}

export function Callout({
  children,
  type = 'default',
  emoji = TypeToEmoji[type],
}: CalloutProps): ReactElement {
  return (
    <div
      className={clsx(
        'mt-6 flex rounded-lg border py-2 pr-4',
        'contrast-more:border-current contrast-more:dark:border-current',
        classes[type],
      )}
    >
      <div
        className="select-none pl-3 pr-2 text-xl"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        {emoji}
      </div>
      <div className="w-full min-w-0 leading-7">{children}</div>
    </div>
  );
}
