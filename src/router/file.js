const init = function (router, upload) {
  router.post(
    "/api/uploadfile",
    upload.single('config'),
    function (ctx) {
      // console.log('ctx.request', ctx.req)
      console.log('ctx.request.file', ctx.request.file);
      console.log('ctx.file', ctx.file);
      // console.log('ctx.request.body', ctx.request.body);
      ctx.body = 'done';
    }
  );
};
module.exports = init;
