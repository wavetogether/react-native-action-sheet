import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import PropTypes from 'prop-types';

export default function connectActionSheet(WrappedComponent) {
  const ConnectedActionSheet = (props, context) => {
    const { forwardedRef, ...rest } = props
    return (
      <WrappedComponent
        ref={forwardedRef}
        {...rest}
        showActionSheetWithOptions={context.showActionSheetWithOptions}
      />
    );
  };

  ConnectedActionSheet.contextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  const ForwardedComponent = React.forwardRef((props, ref) => {
    return <ConnectedActionSheet {...props} forwardedRef={ref} />;
  })

  return hoistStatics(ForwardedComponent, WrappedComponent);
}
