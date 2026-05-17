import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface PostAttributes {
  id: number;
  content: string;
  userId: number;
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1, 280] },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'posts' }
);

export default Post;
