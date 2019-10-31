import App from "./app";

const app = new App(process.env.PORT || 8082);

// start the Express server
app.listen();

process.on('SIGINT', () => {
    process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});