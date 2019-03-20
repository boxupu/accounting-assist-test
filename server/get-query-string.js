module.exports = function(path, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = path.match(reg);
  if (r != null) {
      return unescape(r[2]);
  }
  return null;
}
