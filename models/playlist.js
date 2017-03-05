module.exports = function(sequelize, DataTypes) {
  var PlayList = sequelize.define("PlayList", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Song: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UpVote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DownVote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Duration: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return PlayList;
};
