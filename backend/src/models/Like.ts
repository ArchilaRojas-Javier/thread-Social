import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface LikeAttributes {
  id: number;
  userId: number;
  postId: number;
}

type LikeCreationAttributes = Optional<LikeAttributes, 'id'>;

class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'likes',
    indexes: [{ unique: true, fields: ['userId', 'postId'] }],
  }
);

export default Like;
