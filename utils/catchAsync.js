// eslint-disable-next-line no-multi-assign, no-undef, arrow-body-style
module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
