export const templates = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u={url}&quote={title}",
  twitter: "https://twitter.com/intent/tweet?url={url}&text={content}",
  linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={content}&source={url}",
};

export const shareUrl = (id, { url = window.location, title = document.title, description = document.querySelector("meta[name=description]")?.content ?? "" }) => {
  const template = templates[id];
  const content = description ? `${title} - ${description}` : title;
  const args = { url, title, description, content };

  return Object.entries(args).reduce((str, [key, replace]) => {
    return str.replace(new RegExp(`\{${key}\}`, "g"), encodeURI(replace));
  }, template);
};

export const openWindow = (url, { width = 600, height = 400 } = {}) => {
  const dualScreenLeft = window.screenLeft ?? screen.left;
  const dualScreenTop = window.screenTop ?? screen.top;
  const screenWidth = window.innerWidth ?? d.documentElement.clientWidth ?? screen.width;
  const screenHeight = window.innerHeight ?? d.documentElement.clientHeight ?? screen.height;
  const left = screenWidth / 2 - width / 2 + dualScreenLeft;
  const top = screenHeight / 3 - height / 3 + dualScreenTop;
  const windowFormat = `resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width=${width},height=${height},top=${top},left=${left}`;
  const newWindow = window.open(url, "", windowFormat);

  if (newWindow !== null && newWindow.focus) {
    newWindow.focus();
  }

  return newWindow;
};

export default (id, shareParams, winParams) => {
  return openWindow(shareUrl(id, shareParams), winParams);
};
