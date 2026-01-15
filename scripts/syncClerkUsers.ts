// scripts/syncClerkUsers.ts

import { PrismaClient } from "@prisma/client";
import { Clerk } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY! });

async function syncUsers() {
  try {
    // Fetch all users from Clerk
    const clerkUsers = await clerk.users.getUserList();
    console.log(`Found ${clerkUsers.length} users in Clerk.`);

    for (const u of clerkUsers) {
      // Handle missing fields safely
      const email = u.emailAddresses?.[0]?.emailAddress || "no-email@example.com";
      const name = u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : "No Name";
      const profileImage = u.imageUrl || "";

      // Insert into Prisma DB or skip if exists
      await prisma.user.upsert({
        where: { clerkId: u.id },
        update: {}, // do not update existing users
        create: {
          clerkId: u.id,
          email,
          name,
          profileImage,
        },
      });
    }

    console.log("✅ All Clerk users synced to Prisma DB!");
  } catch (err) {
    console.error("❌ Error syncing users:", err);
  } finally {
    await prisma.$disconnect();
  }
}

syncUsers();
