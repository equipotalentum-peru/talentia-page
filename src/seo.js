const SITE_URL =
  "https://talentia-page.vercel.app";

function setMeta(name, content) {
  let element =
    document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setProperty(property, content) {
  let element =
    document.querySelector(
      `meta[property="${property}"]`
    );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let link =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

export function setSeo({
  title,
  description,
  path = "/"
}) {
  const url =
    `${SITE_URL}${path}`;

  document.title = title;

  setMeta(
    "description",
    description
  );

  setMeta(
    "robots",
    "index, follow"
  );

  setCanonical(url);

  setProperty(
    "og:title",
    title
  );

  setProperty(
    "og:description",
    description
  );

  setProperty(
    "og:url",
    url
  );

  setProperty(
    "og:type",
    "website"
  );
}