import './Home.css';
import usePageTitle from "../../../hooks/usePageTitle";
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import Workflow from './components/hiworks/Workflow';
import PowerOfAi from './components/power/PowerOfAi';
import AppGallery from './components/gallery/AppGallery';
import AppFeedbacks from './components/feedbacks/AppFeedbacks';

const Home = () => {
    usePageTitle("Home | AISerbisyosStudio");

    return (
        <>
            <Hero />
            <Features />
            <Workflow />
            <PowerOfAi />
            <AppGallery />
            <AppFeedbacks />
        </>
    );
}

export default Home;