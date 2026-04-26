import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import confetti from "canvas-confetti";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { inviteConfig } from "./config/inviteConfig";

function Countdown({ targetDateTime }) {
  const calculate = () => {
    const target = new Date(targetDateTime).getTime();
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      return { day: 0, hour: "00", minute: "00", second: "00" };
    }

    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hour = String(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ).padStart(2, "0");
    const minute = String(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    ).padStart(2, "0");
    const second = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
      2,
      "0",
    );

    return { day, hour, minute, second };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [targetDateTime]);

  return (
    <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4 countdown-shell">
      <div className="row justify-content-center" id="count-down">
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.day}</h2>
          <small>Day</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.hour}</h2>
          <small>Hours</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.minute}</h2>
          <small>Minutes</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.second}</h2>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
}

function GalleryCarousel({ id, images }) {
  return (
    <div id={id} className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={`${id}-indicator-${index + 1}`}
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner rounded-4">
        {images.map((image, index) => (
          <div key={`${id}-image-${index + 1}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={image} alt={`Moment ${index + 1}`} className="d-block w-100" />
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

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
      audio.pause();
    };
  }, [isInviteOpen, audio]);

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
      <nav id="navbar-menu" className="navbar navbar-expand fixed-bottom rounded-top-4 border-top p-0 bottom-menu">
        <ul className="navbar-nav nav-justified w-100 align-items-center">
          <li className="nav-item"><a className="nav-link" href="#home"><i className="fa-solid fa-house" /><span>Home</span></a></li>
          <li className="nav-item"><a className="nav-link" href="#bride"><i className="fa-solid fa-user-group" /><span>Bride</span></a></li>
          <li className="nav-item"><a className="nav-link" href="#wedding-date"><i className="fa-solid fa-calendar-check" /><span>Date</span></a></li>
          <li className="nav-item"><a className="nav-link" href="#gallery"><i className="fa-solid fa-images" /><span>Gallery</span></a></li>
        </ul>
      </nav>

      <main data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-smooth-scroll="true" tabIndex="0">
        <header className="wrap" id="home">
          <img src={inviteConfig.media.decorations.left} className="corner-image bottom-left-corner" alt="Bottom Left Decoration" />
          <img src={inviteConfig.media.decorations.right} className="corner-image bottom-right-corner" alt="Bottom Right Decoration" />
          <img src={inviteConfig.media.decorations.topLeft} className="corner-image top-left-corner" alt="Top Left Decoration" />
          <img src={inviteConfig.media.decorations.topRight} className="corner-image top-right-corner" alt="Top Right Decoration" />

          <div className="title main">
            <img src={inviteConfig.media.welcomeImage} className="welcome-icon" alt="Welcome" />
            <p className="intro-text">{inviteConfig.couple.heroMessage.split("\\n").map((line) => <span key={line}>{line}<br /></span>)}</p>

            <div className="title-section" style={{ "--center-bg-url": `url('${inviteConfig.media.decorations.center}')` }}>
              <div className="inner-title-section">
                <p className="name">{inviteConfig.couple.groomName}</p>
                <p className="name and">&amp;</p>
                <p className="name">{inviteConfig.couple.brideName}</p>
              </div>
            </div>

            <div className="wrap-details">
              <div className="main-date">
                <p>{inviteConfig.home.time}</p>
                <p>{inviteConfig.home.dateLabel}</p>
              </div>
              <div className="wrap-location">
                <p>{inviteConfig.home.locationLabel.split("\\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
              </div>
            </div>

            <div className="scroll-section">
              <a href="#bride" aria-label="Scroll to bride and groom section"><div className="scroll-down" /></a>
            </div>
          </div>
        </header>

        <section className="brideandgroom text-center px-2" id="bride" style={{ "--section-bg-pattern": `url('${inviteConfig.media.decorations.bgPattern}')` }}>
          <h2 className="font-esthetic py-4 m-0 section-heading">Bride &amp; Groom</h2>
          <div className="overflow-x-hidden pb-4">
            <div data-aos="fade-right" data-aos-duration="1800">
              <img src={inviteConfig.brideAndGroom.groom.image} alt="Groom" className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto" />
              <h2 className="font-esthetic m-0 person-name">{inviteConfig.brideAndGroom.groom.name}</h2>
              <p className="mt-3 mb-1 subtext">{inviteConfig.brideAndGroom.groom.details}</p>
            </div>

            <h2 className="font-esthetic my-4 amp">&amp;</h2>

            <div data-aos="fade-left" data-aos-duration="1800">
              <img src={inviteConfig.brideAndGroom.bride.image} alt="Bride" className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto" />
              <h2 className="font-esthetic m-0 person-name">{inviteConfig.brideAndGroom.bride.name}</h2>
              <p className="mt-3 mb-1 subtext">{inviteConfig.brideAndGroom.bride.details}</p>
            </div>
          </div>
        </section>

        <section className="venue-details pb-4" id="venue">
          <div className="container text-center">
            <h2 className="font-esthetic py-2 m-0 section-heading">Venue Details</h2>
            {inviteConfig.events.map((event, index) => (
              <article
                key={event.title}
                className="mt-4 p-3 shadow rounded-4 venue-card"
                data-aos="fade-up"
                data-aos-duration={1200 + index * 200}
              >
                <h2 className="font-esthetic m-0 py-2">{event.title}</h2>
                <p>{event.venue}</p>
                <p><i className="fa-regular fa-clock" /> {event.time}</p>
                <p><i className="fa-solid fa-calendar-days" /> {event.date}</p>
                <small className="d-block my-1">{event.address}</small>
                <iframe src={event.mapEmbed} width="300" height="250" loading="lazy" className="venue-map" title={`${event.title} map`} />
                <br />
                <a href={event.mapLink} target="_blank" className="btn btn-sm rounded-pill shadow mb-2 px-3 map-btn" rel="noopener noreferrer">
                  <i className="fa-solid fa-map-location-dot me-2" />View Google Maps
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="text-center pb-2 wedding-date" id="wedding-date">
          <div className="container">
            <h3 className="font-esthetic py-4 m-0 section-heading">{inviteConfig.countdown.heading}</h3>
            <p>{inviteConfig.countdown.subheading}</p>

            <Countdown targetDateTime={inviteConfig.countdown.targetDateTime} />

            <div className="py-2" data-aos="fade-down" data-aos-duration="1200">
              <h4 className="m-0 py-2 text-start">{inviteConfig.invitationText.heading}</h4>
              <p className="d-block my-1 text-start invitation-copy">
                {inviteConfig.invitationText.body}
                <br />
                <br />
                {inviteConfig.invitationText.signoff}
                <br />
                {inviteConfig.invitationText.family}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-5 pt-4 gallery" id="gallery">
          <div className="container">
            <div className="border rounded-5 shadow p-3">
              <h2 className="font-esthetic text-center py-2 m-0 section-heading">{inviteConfig.gallery.title}</h2>
              <GalleryCarousel id="carousel-image-one" images={inviteConfig.gallery.carouselOne} />
              <GalleryCarousel id="carousel-image-two" images={inviteConfig.gallery.carouselTwo} />
            </div>
          </div>
        </section>

        <section className="text-center pb-4 end-section">
          <div className="container">
            <p className="pb-2 pt-4 closing-lead">{inviteConfig.closing.lead}</p>
            <h2 className="font-esthetic closing-title">{inviteConfig.closing.title}</h2>
            <h2 className="font-arabic pt-4 closing-sub">{inviteConfig.closing.sub}</h2>
            <br /><br /><br />
          </div>
        </section>
      </main>

      <div className={`loading-page welcome-page ${isInviteOpen ? "welcome-hidden" : ""}`} id="welcome">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center">
            <img src={inviteConfig.media.welcomeImage} className="img-center-crop mb-4 mx-auto" alt="Welcome emblem" />
            {inviteConfig.couple.titleLogo ? (
              <img
                src={inviteConfig.couple.titleLogo}
                className="overlay-logo mx-auto"
                alt={inviteConfig.couple.title}
              />
            ) : (
              <h2 className="font-esthetic overlay-title">{inviteConfig.couple.title}</h2>
            )}
            {/* <h2 className="font-esthetic overlay-names">{inviteConfig.couple.groomName} &amp; {inviteConfig.couple.brideName}</h2> */}
            <button type="button" className="btn btn-light shadow rounded-4 mt-3" onClick={openInvite}>
              <i className="fa-solid fa-envelope-open me-2" />Open Invitation
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="button-music"
        className="btn btn-sm rounded-circle btn-music"
        aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
        title={isMusicPlaying ? "Pause background music" : "Play background music"}
        hidden={!isInviteOpen}
        onClick={toggleMusic}
      >
        <i className={`fa-solid ${isMusicPlaying ? "fa-circle-pause" : "fa-circle-play"}`} />
      </button>
    </>
  );
}
