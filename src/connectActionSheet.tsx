import * as React from 'react';
import { Consumer } from './context';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { ActionSheetProps } from './types';

interface WithForwardRefProps {
  forwardedRef: React.Ref<React.ComponentType<ActionSheetProps>>;
}

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & ActionSheetProps>
) {
  const ConnectedActionSheet = (props: WithForwardRefProps & OwnProps) => {
    const { forwardedRef } = props;
    return (
      <Consumer>
        {({ showActionSheetWithOptions }) => {
          return (
            <WrappedComponent
              ref={forwardedRef}
              {...props}
              showActionSheetWithOptions={showActionSheetWithOptions}
            />
          );
        }}
      </Consumer>
    );
  };

  const ForwardedComponent = React.forwardRef(
    (props: OwnProps & ActionSheetProps, ref: React.Ref<React.ComponentType<ActionSheetProps>>) => (
      <ConnectedActionSheet {...props} forwardedRef={ref} />
    )
  );

  return hoistNonReactStatic(ForwardedComponent, WrappedComponent);
}
