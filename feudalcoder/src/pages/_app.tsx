/**
 * _app.tsx
 *
 * Descripción breve...
*/
import App from '../App';
interface MyAppProps {
  children: React.ReactNode;
}
const MyApp: React.FC<MyAppProps> = ({ children }) => {
  return (
    <App>
      {children}
    </App>
  );
};
export default MyApp;