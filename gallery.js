(() => {
  const cardGalleries = [
    {
      match: "stainforth-bedroom-1",
      slides: [
        { base: "stainforth-bedroom-2", alt: "Twin bedroom in Stainforth, Doncaster group accommodation", width: 2000, height: 1335 },
        { base: "stainforth-bedroom-3", alt: "Bedroom setup for the Stainforth, Doncaster sleeps 10 house", width: 2000, height: 1335 },
        { base: "hero-dining", alt: "Dining space for CHJB Short Stays guests in Doncaster", width: 2000, height: 1335 },
        { base: "hero-kitchen", alt: "Kitchen space for longer group stays in Doncaster accommodation", width: 2000, height: 1335 }
      ]
    },
    {
      match: "city-bedroom-1",
      slides: [
        { base: "city-bedroom-2", alt: "Second bedroom in Wheatley, Doncaster sleeps 6 house", width: 1438, height: 1917 }
      ]
    },
    {
      match: "east-lane-kitchen",
      slides: [
        { base: "east-lane-dining", alt: "Dining area and kitchen at the Stainforth, Doncaster M18 house", width: 2000, height: 1126 },
        { base: "east-lane-bedroom-orange", alt: "Bedroom with orange bedding at the Stainforth, Doncaster M18 house", width: 2000, height: 1126 },
        { base: "east-lane-living-room", alt: "Living room at the Stainforth, Doncaster M18 contractor house", width: 2000, height: 1126 },
        { base: "east-lane-bathroom", alt: "Bathroom at the Stainforth, Doncaster M18 house", width: 2000, height: 1126 },
        { base: "east-lane-exterior-wide", alt: "Exterior and parking at the Stainforth, Doncaster M18 house", width: 2000, height: 1126 }
      ]
    }
  ];

  const sizes = [400, 800, 1200, 2000];

  function getPrefix(src, match) {
    const clean = src.split(/[?#]/)[0];
    const index = clean.lastIndexOf(match);
    return index >= 0 ? clean.slice(0, index) : "";
  }

  function buildPicture(prefix, slide, imageClass) {
    const picture = document.createElement("picture");
    picture.className = "media-slide";

    const source = document.createElement("source");
    source.type = "image/webp";
    source.srcset = sizes.map((size) => `${prefix}${slide.base}-${size}.webp ${size}w`).join(", ");
    source.sizes = "(min-width: 900px) 33vw, 100vw";

    const image = document.createElement("img");
    image.className = imageClass;
    image.src = `${prefix}${slide.base}.jpg`;
    image.alt = slide.alt;
    image.width = slide.width;
    image.height = slide.height;
    image.loading = "lazy";

    picture.append(source, image);
    return picture;
  }

  function addGalleryControls(container, track) {
    if (container.querySelector("[data-gallery-next]")) return;

    const prev = document.createElement("button");
    prev.className = "gallery-btn gallery-prev";
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous photo");
    prev.setAttribute("data-gallery-prev", "");
    prev.textContent = "\u2039";

    const next = document.createElement("button");
    next.className = "gallery-btn gallery-next";
    next.type = "button";
    next.setAttribute("aria-label", "Next photo");
    next.setAttribute("data-gallery-next", "");
    next.textContent = "\u203a";

    container.append(prev, next);

    const step = () => {
      const firstSlide = track.querySelector(":scope > picture, :scope > .media-slide");
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return (firstSlide ? firstSlide.getBoundingClientRect().width : track.clientWidth) + gap;
    };

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 4;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= maxScroll;
    };

    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  document.querySelectorAll(".prop-img-wrap").forEach((wrap) => {
    const existingPicture = wrap.querySelector(":scope > picture");
    const existingImage = existingPicture?.querySelector("img");
    if (!existingPicture || !existingImage || wrap.querySelector(".media-scroller")) return;

    const src = existingImage.getAttribute("src") || "";
    const gallery = cardGalleries.find((item) => src.includes(item.match));
    if (!gallery) return;

    const prefix = getPrefix(src, gallery.match);
    const track = document.createElement("div");
    track.className = "media-scroller";
    track.setAttribute("data-gallery-track", "");
    track.setAttribute("tabindex", "0");
    track.setAttribute("aria-label", existingImage.alt ? `${existingImage.alt} photos` : "Property photos");

    existingPicture.classList.add("media-slide");
    wrap.insertBefore(track, existingPicture);
    track.append(existingPicture);
    gallery.slides.forEach((slide) => track.append(buildPicture(prefix, slide, "prop-img")));

    wrap.classList.add("gallery-enhanced");
    addGalleryControls(wrap, track);
  });

  document.querySelectorAll(".photo-grid").forEach((grid) => {
    if (grid.closest(".photo-grid-scroller")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "photo-grid-scroller";
    grid.parentNode.insertBefore(wrapper, grid);
    wrapper.append(grid);

    grid.setAttribute("data-gallery-track", "");
    grid.setAttribute("tabindex", "0");
    grid.setAttribute("aria-label", "Scrollable property photo gallery");
    addGalleryControls(wrapper, grid);
  });
})();
