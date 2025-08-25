import { HashRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { runDevChecks } from "./lib/devChecks";
import LandingPage from "./pages/LandingPage";
import KnowledgeSectionPage from "./pages/KnowledgeSectionPage";
import DownloadsPage from "./pages/DownloadsPage";
import QuizPage from "./pages/QuizPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { GeoBanner } from "./components/shared/GeoBanner";

export default function App() {
  useEffect(() => {
    runDevChecks();
  });
  return (
    <HashRouter>
      <div className="min-h-full flex flex-col">
        <Header />
        <GeoBanner />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/section/:slug" element={<KnowledgeSectionPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
