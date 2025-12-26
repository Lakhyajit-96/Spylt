import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SpyltFlavorsPage from './pages/SpyltFlavorsPage';
import ChugClubPage from './pages/ChugClubPage';
import StudentMarketingPage from './pages/StudentMarketingPage';
import DairyDealersPage from './pages/DairyDealersPage';
import CompanyPage from './pages/CompanyPage';
import ContactsPage from './pages/ContactsPage';
import TastyTalkPage from './pages/TastyTalkPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/spylt-flavors" element={<SpyltFlavorsPage />} />
        <Route path="/chug-club" element={<ChugClubPage />} />
        <Route path="/student-marketing" element={<StudentMarketingPage />} />
        <Route path="/dairy-dealers" element={<DairyDealersPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/tasty-talk" element={<TastyTalkPage />} />
      </Routes>
    </Router>
  );
};

export default App;
