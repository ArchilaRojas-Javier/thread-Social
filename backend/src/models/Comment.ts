import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface CommentAttributes {
  id: number;
  content: string;
  userId: number;
  postId: number;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public content!: string;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1, 500] },
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
  { sequelize, tableName: 'comments' }
);

export default Comment;
