module.exports = function(sequelize, DataTypes) {
  var ChatMessage = sequelize.define("ChatMessage", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    User: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return ChatMessage;
};
