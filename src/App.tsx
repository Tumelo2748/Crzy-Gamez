import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout } from './layouts/PageLayout';
import { LandingPage } from './pages/LandingPage';
import { ProfilePage } from './pages/ProfilePage';
import { UncatchablePage } from './components/UncatchablePage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { RoastChatPage } from './pages/RoastChatPage';
import GravityFormPage  from './pages/GravityFormPage';
import GuessWrongPage from './pages/GuessWrongPage';
import ImpossibleMazePage from './pages/ImpossibleMazePage';

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/uncatchable" element={<UncatchablePage />} />
          <Route path="/social" element={<SocialMediaPage />} />
          <Route path="/roast" element={<RoastChatPage />} />
          <Route path="/gravity-form" element={<GravityFormPage />} />
          <Route path="/guess-wrong" element={<GuessWrongPage />} />
          <Route path="/impossible-maze" element={<ImpossibleMazePage />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
