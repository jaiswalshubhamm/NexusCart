'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'userId'
    });
  };

  return User;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlck1vZGVsLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZXF1ZWxpemUiLCJEYXRhVHlwZXMiLCJVc2VyIiwiZGVmaW5lIiwibmFtZSIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJpc0FkbWluIiwiQk9PTEVBTiIsImFzc29jaWF0ZSIsIm1vZGVscyIsImhhc01hbnkiLCJPcmRlciIsImFzIiwiZm9yZWlnbktleSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFDQyxTQUFELEVBQVlDLFNBQVosRUFBMEI7QUFDekMsTUFBTUMsSUFBSSxHQUFHRixTQUFTLENBQUNHLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUI7QUFDcENDLElBQUFBLElBQUksRUFBRUgsU0FBUyxDQUFDSSxNQURvQjtBQUVwQ0MsSUFBQUEsS0FBSyxFQUFFTCxTQUFTLENBQUNJLE1BRm1CO0FBR3BDRSxJQUFBQSxRQUFRLEVBQUVOLFNBQVMsQ0FBQ0ksTUFIZ0I7QUFJcENHLElBQUFBLE9BQU8sRUFBRVAsU0FBUyxDQUFDUTtBQUppQixHQUF6QixFQUtWLEVBTFUsQ0FBYjs7QUFNQVAsRUFBQUEsSUFBSSxDQUFDUSxTQUFMLEdBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFDakM7QUFDQUEsSUFBQUEsTUFBTSxDQUFDVCxJQUFQLENBQVlVLE9BQVosQ0FBb0JELE1BQU0sQ0FBQ0UsS0FBM0IsRUFBa0M7QUFBRUMsTUFBQUEsRUFBRSxFQUFFLFFBQU47QUFBZ0JDLE1BQUFBLFVBQVUsRUFBRTtBQUE1QixLQUFsQztBQUNELEdBSEQ7O0FBSUEsU0FBT2IsSUFBUDtBQUNELENBWkQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIERhdGFUeXBlcykgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZSgnVXNlcicsIHtcbiAgICBuYW1lOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGVtYWlsOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIHBhc3N3b3JkOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGlzQWRtaW46IERhdGFUeXBlcy5CT09MRUFOLFxuICB9LCB7fSk7XG4gIFVzZXIuYXNzb2NpYXRlID0gZnVuY3Rpb24gKG1vZGVscykge1xuICAgIC8vIGFzc29jaWF0aW9ucyBjYW4gYmUgZGVmaW5lZCBoZXJlXG4gICAgbW9kZWxzLlVzZXIuaGFzTWFueShtb2RlbHMuT3JkZXIsIHsgYXM6ICdvcmRlcnMnLCBmb3JlaWduS2V5OiAndXNlcklkJyB9KTtcbiAgfTtcbiAgcmV0dXJuIFVzZXI7XG59OyJdfQ==