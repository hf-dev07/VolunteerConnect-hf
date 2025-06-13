import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Create new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create project" });
      }
    }
  });

  // Create application and update project status
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      
      // Create the application
      const application = await storage.createApplication(validatedData);
      
      // Update project status to accepted
      await storage.updateProjectStatus(validatedData.projectId, "accepted");
      
      // Simulate email confirmation
      console.log("📧 Email notification sent to:", validatedData.volunteerEmail);
      console.log("✅ Application accepted for project ID:", validatedData.projectId);
      
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create application" });
      }
    }
  });

  // Get all applications (for admin)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getAllApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
