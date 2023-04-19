import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: "http://aa1d4b16f91e4771a72c6e45ecd85ea4@sentry.kpm.codes:9000/2",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
