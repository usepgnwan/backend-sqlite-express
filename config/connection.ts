import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./database/bhisa.db", // Pastikan path relatif terhadap root project
      logging: false,
    });

    this.testConnection();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async testConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("DB connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the DB:", error);
      throw error;
    }
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async closeConnection(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("DB connection closed.");
    } catch (error) {
      console.error("Error closing DB connection:", error);
      throw error;
    }
  }

  public async syncModels(options = {}): Promise<void> {
    try {
      await this.sequelize.sync(options);
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing models:", error);
      throw error;
    }
  }
}

export default Database.getInstance();
