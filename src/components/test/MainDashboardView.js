import { STATE_LOGIN, STATE_SIGNUP } from '../AdminView/AuthForm';
import GAListener from '../AdminView/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from '../AdminView/Layout';
import PageSpinner from '../AdminView/PageSpinner';
import AuthPage from '../../reductcomponents/pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import '../../reductcomponents/styles/reduction.scss';

const AlertPage = React.lazy(() => import('../../reductcomponents/pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('../../reductcomponents/pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('../../reductcomponents/pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('../../reductcomponents/pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('../../reductcomponents/pages/ButtonPage'));
const UserApprovalPage = React.lazy(() => import('../usermanagement/NewUserList'));
const SearchUser = React.lazy(() => import('../../reductcomponents/pages/SearchUser'));
const ManageUser = React.lazy(() => import('../../reductcomponents/pages/ManageUser'));


const IssueBook = React.lazy(() => import('../../reductcomponents/pages/IssueBook'));
const ChartPage = React.lazy(() => import('../../reductcomponents/pages/ChartPage'));
const DashboardPage = React.lazy(() => import('../../reductcomponents/pages/DashboardPage'));
const DashboardTest = React.lazy(() => import('../../reductcomponents/pages/DashboardTest'));
const DropdownPage = React.lazy(() => import('../../reductcomponents/pages/DropdownPage'));
const AddBook = React.lazy(() => import('../../reductcomponents/pages/AddBook'));
const EditBook = React.lazy(() => import('../../reductcomponents/pages/EditBook'));
const RemoveBook = React.lazy(() => import('../../reductcomponents/pages/RemoveBook'));
const InputGroupPage = React.lazy(() => import('../../reductcomponents/pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('../../reductcomponents/pages/ModalPage'));
const ProgressPage = React.lazy(() => import('../../reductcomponents/pages/ProgressPage'));  
const TablePage = React.lazy(() => import('../../reductcomponents/pages/TablePage'));
const TypographyPage = React.lazy(() => import('../../reductcomponents/pages/TypographyPage'));
const ReturnBook = React.lazy(() => import('../../reductcomponents/pages/ReturnBook'));
const WorkProg = React.lazy(() => import('./WorkinProgress'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class MainDashboardView extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/dashboard" component={DashboardTest} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/UserApprovalPage" component={UserApprovalPage} />
                <Route exact path="/usersearch" component={SearchUser} />
                <Route exact path="/manageuser" component={ManageUser} />


                <Route exact path="/issue" component={IssueBook} />
                <Route exact path="/return" component={ReturnBook} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/workprog" component={WorkProg} />
                
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/button-groups" component={ButtonGroupPage}/>
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/addbook" component={AddBook} />
                <Route exact path="/editbook" component={EditBook} />
                <Route exact path="/removebook" component={RemoveBook} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/dashboard" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(MainDashboardView);
