/**
 * Create a session before initialize routes
 */
app.use((req, res, next) => {
   if (!mcache.get('clientId')) {
      (require('../external/clientWA')).then((client) => client.initialize());
   }

   return next();
});