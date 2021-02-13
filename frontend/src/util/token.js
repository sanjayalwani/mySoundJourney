export default function getAccessToken (document) {
  let { cookie } = document;
  if (cookie.includes("acc_tok")) {
    return cookie.split("=")[1];
  } else {
    return undefined;
  }
}