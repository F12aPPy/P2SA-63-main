import { createPlugin } from '@backstage/core';
import WelcomePage from './components/WelcomePage';
import CreateUser from './components/Users';
import Login from './components/Logins';
 
export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/welcomepage', WelcomePage);
    router.registerRoute('/user', CreateUser);
    router.registerRoute('/', Login);
  },
});
