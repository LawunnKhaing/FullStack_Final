import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Make sure to include a fallback for the database URL in case it's not set in the .env file
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/fullstack', {
  dialect: 'postgres',
  logging: false, // Turn off logging or customize it as needed
});

// Define your Activity model
const Activity = sequelize.define('Activity', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true, // Allows the URL to be optional
  },
}, {
  // Other model options go here
});

// Define your Task model
const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  // Other model options go here
});

const getStats = async () => {
  const activitiesCount = await Activity.count();
  const tasksCount = await Task.count();

  return {
    activities: activitiesCount,
    tasks: tasksCount,
  };
};

// const getStats = async () => {
//   const lastMonth = new Date();
//   lastMonth.setMonth(lastMonth.getMonth() - 1);

//   const activitiesCount = await Activity.count({
//     where: {
//       createdAt: {
//         [Sequelize.Op.gte]: lastMonth
//       }
//     }
//   });

//   const tasksCount = await Task.count({
//     where: {
//       createdAt: {
//         [Sequelize.Op.gte]: lastMonth
//       }
//     }
//   });

//   return {
//     activities: activitiesCount,
//     tasks: tasksCount,
//   };
// };


// Function to establish database connection and synchronize models
const connectAndSyncDb = async () => {
  try {
    await sequelize.authenticate(); // Try to authenticate with the database
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync(); // Synchronize all models with the database
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Execute the function to ensure the database is ready to be used
connectAndSyncDb();

export { sequelize, Activity, Task, getStats };
