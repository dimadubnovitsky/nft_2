import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import appRoutes from '../routes';

class App extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    onInitialLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.onInitialLoad();
  }

  render() {
    return (
      <Switch>
        {appRoutes.map(({ path, exact, component }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </Switch>
    );
  }
}

export default App;
