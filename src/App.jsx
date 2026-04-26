import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import confetti from "canvas-confetti";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BottomNav,
  BrideAndGroomSection,
  ClosingSection,
  GallerySection,
  HeroSection,
  MusicButton,
  VenueSection,
  WelcomeOverlay,
  WeddingDateSection,
} from "./components/InviteSections";
import { inviteConfig } from "./config/inviteConfig";

export default function App() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audio = useMemo(() => {
    const music = new Audio(inviteConfig.media.musicUrl);
    music.loop = true;
    music.preload = "auto";
    return music;
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    document.body.style.overflow = isInviteOpen ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isInviteOpen, audio]);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const openInvite = () => {
    setIsInviteOpen(true);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.62 },
      colors: ["#2d5b44", "#d9a86c", "#f3d8b1", "#f7ebda"],
    });

    audio.play().then(() => {
      setIsMusicPlaying(true);
    }).catch(() => {
      setIsMusicPlaying(false);
    });
  };

  const toggleMusic = () => {
    if (audio.paused) {
      audio.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => {
        setIsMusicPlaying(false);
      });
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  return (
    <>
      <BottomNav />

      <main data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-smooth-scroll="true" tabIndex="0">
        <HeroSection />
        <BrideAndGroomSection />
        <VenueSection />
        <WeddingDateSection />
        <GallerySection />
        <ClosingSection />
      </main>

      <WelcomeOverlay isInviteOpen={isInviteOpen} onOpenInvite={openInvite} />
      <MusicButton isInviteOpen={isInviteOpen} isMusicPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />
    </>
  );
}
