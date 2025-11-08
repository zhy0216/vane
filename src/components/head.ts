import { HeadPropsSchema, type HeadProps } from "./schema";

/**
 * Head component - HTML head with essential meta tags for email
 */
export function renderHead(props: HeadProps): string {
  const { children = "" } = props;
  
  return `<head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="x-apple-disable-message-reformatting" />
  ${children}
</head>`;
}
