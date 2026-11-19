import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ProgressProvider, useProgressContext } from './contexts/ProgressContext';
import Welcome from './pages/Welcome';
import AdventureMap from './pages/AdventureMap';
import GamePage from './pages/GamePage';
import FinalEnding from './pages/FinalEnding';

function ProtectedGame() {
  const { checkpointId } = useParams();
  const { isUnlocked } = useProgressContext();
  const id = parseInt(checkpointId, 10);
  if (isNaN(id) || !isUnlocked(id)) return <Navigate to="/map" replace />;
  return <GamePage checkpointId={id} />;
}

function ProtectedEnding() {
  const { isAllCompleted } = useProgressContext();
  if (!isAllCompleted) return <Navigate to="/map" replace />;
  return <FinalEnding />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/map" element={<AdventureMap />} />
          <Route path="/game/:checkpointId" element={<ProtectedGame />} />
          <Route path="/ending" element={<ProtectedEnding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProgressProvider>
    </BrowserRouter>
  );
}
