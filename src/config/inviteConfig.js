const withBase = (path) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;

export const inviteConfig = {
  couple: {
    title: "SS Wedding",
    titleLogo: "assets/images/Wedding.png",
    groomName: "Sravanth",
    brideName: "Samaikya",
    heroMessage: "PLEASE JOIN US IN THE CELEBRATION\\nOF OUR WEDDING",
  },
  home: {
    time: "night 12:15",
    dateLabel: "03 May 2026",
    locationLabel: "Babu and Babu Convention",
  },
  brideAndGroom: {
    groom: {
      name: "Sravanth Baratam",
      details: "Younger Son of Mr. & Mrs. Nagaraju and Bharathi",
      image: withBase("assets/images/sravanth.jpeg"),
    },
    bride: {
      name: "Samaikya Gudla",
      details: "Only daughter of Mr. & Mrs. Srinivasa Rao and Subhashini",
      image: withBase("assets/images/samaikya.png"),
    },
  },
  events: [
    {
      title: "Reception",
      venue: "Babu and Babu Convention",
      time: "7:00 PM",
      date: "3 May 2026",
      address: "Alamuru, road, beside Ayyapa swamy temple, Mandapeta, Andhra Pradesh 533308",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.4072051304192!2d81.92278379999999!3d16.8557393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37973906aeba39%3A0xe1e87f4e036f508a!2sBabu%20%26%20Babu%20Convention%20and%20Rooms!5e0!3m2!1sen!2sin!4v1777195169177!5m2!1sen!2sin",
      mapLink: "https://maps.app.goo.gl/X36ZR7wZhNXcdV8j9",
    },
    // {
    //   title: "Wedding",
    //   venue: "Chakravarthy Lalitha A/C Marriage Hall",
    //   time: "10:30 - 12:00 AM",
    //   date: "10 February 2027",
    //   address: "Alamuru, road, beside Ayyapa swamy temple, Mandapeta, Andhra Pradesh 533308",
    //   mapEmbed:
    //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.4072051304192!2d81.92278379999999!3d16.8557393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37973906aeba39%3A0xe1e87f4e036f508a!2sBabu%20%26%20Babu%20Convention%20and%20Rooms!5e0!3m2!1sen!2sin!4v1777195169177!5m2!1sen!2sin",
    //   mapLink: "https://maps.app.goo.gl/X36ZR7wZhNXcdV8j9",
    // },
  ],
  countdown: {
    heading: "We Are Getting Married",
    subheading: "On Sunday 3rd May 2026",
    targetDateTime: "2026-05-03T00:00:00+05:30",
  },
  invitationText: {
    heading: "Dear Family & Friends",
    body: "We are delighted to announce our marriage and invite you to celebrate this special moment with us. Your love and support mean the world to us, and your presence will make our day complete. Join us for an evening of joy, laughter, and cherished memories as we begin our journey together. We look forward to sharing this unforgettable day with you!",
    signoff: "With love and excitement,",
    family: "Sravanth & Samaikya Family",
  },
  gallery: {
    title: "Happy Moments",
    carouselOne: [
      withBase("assets/images/slide4.jpg"),
      withBase("assets/images/slide5.jpg"),
      withBase("assets/images/slide6.jpg"),
    ],
    carouselTwo: [
      withBase("assets/images/slide1.jpg"),
      withBase("assets/images/slide2.jpg"),
      withBase("assets/images/slide3.jpg"),
    ],
  },
  closing: {
    lead: "Your love and support mean the world to us.",
    title: "Join us as we celebrate the beginning of a beautiful journey together.",
    sub: "Save the date and celebrate with us!",
  },
  media: {
    musicUrl: withBase("assets/music/sound.mp3"),
    welcomeImage: withBase("assets/images/welcome.png"),
    decorations: {
      left: withBase("assets/images/left.png"),
      right: withBase("assets/images/right.png"),
      topLeft: withBase("assets/images/topLeft.png"),
      topRight: withBase("assets/images/topRight.png"),
      center: withBase("assets/images/center.png"),
      bgPattern: withBase("assets/images/bg.png"),
    },
  },
};
