exports.success = (res, message, data) => 
  res.json({ success: true, message, data });

exports.error = (res, message, code = 400, errors = []) => 
  res.status(code).json({ success: false, message, errors });