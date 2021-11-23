export const isAlpha = /^[a-z ]+$/g;

/**
 * A subreddit is valid when the following conditions match:
 * - no spaces
 * - 3-21 char long
 * - underscore only special char allowed (cannot be first char)
 */
export const validSubreddit = /^[a-z0-9][a-z0-9_]{2,20}$/i;
